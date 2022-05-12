
const ACTION_KIND = {
	DRAW:"draw",
	GAIN_KEYWORD:"gain_keyword",
	STAT:"stat",
};
const SCRIPT_KIND = {
	IF:"if",
	LABEL:"label",
	TEXT:"text",
	CHOICE:"choice",
	ACTION:"action",
	SKILL_CHECK:"skill_check",
	JUMP:"jump",
	PAUSE:"pause",
	SHOW:"show",
	DONE:"done",
};
import { Renderer } from "./ui/renderer.js";
import { UI } from "./ui/ui.js";
import { Audio } from "./audio/audio.js";
import { SFX } from "./data/AudioData.js";

class Script{
	static #renderLineIdx = 0;//when rendering text, which line is the current one to fade in
	static #renderIdx = 0;//which character within the line
	static #curScript = null;
	static #curScriptPosition = 0;
	static #isRunning = false;
	static #labelLookup = new Map();//label:index
	
	static #sprites = {show:Renderer.getSprite(//draw image, src will be overwritten
		'ui/window/dragon.png',
		0,50,180,260,
		0,0)
	};
		
	//goes from the curScriptPosition -> the next break in rendering, calling "callback" on each line
	//returns the index of the last line rendered
	static #scrollThroughLines(G,callback){
		const script = Script.#curScript;
		let lastLine = Script.#curScriptPosition;
		for(let i = Script.#curScriptPosition;i<script.length;i+=1){
			const line = script[i];
			const s = Script.parseLine(G,line);
			callback(s);
			//jumps 
			if(s.kind==SCRIPT_KIND.JUMP||(s.kind==SCRIPT_KIND.IF&&s.conditionMet)){
				const jumpLocation = Script.#labelLookup.get(s.label);
				//warn if jumping backwards, to avoid loops really only want to jump forward in the script
				//jumping back can work, but could easily cause spaghetti
				/*if(jumpLocation<i){//commented out becuase it's used in the tutorial to re-do options
					console.warn("jumping backwards",s);
				}*/
				i=jumpLocation;
			}
			if(s.stopRendering){
				return i;//should alway reach a break in rendering
			}
			lastLine = i;
		}
		console.warn("fell through script",lastLine);
		return lastLine;
	}
	
	static isRunning(){
		return Script.#isRunning;
	}
	
	static start(G,script){
		Script.#curScript = script;
		Script.#curScriptPosition = 0;
		Script.#isRunning = true;
		Script.#labelLookup = new Map();
		//build lookup list of labels for easier jumps later
		for(let i=0;i<script.length;i+=1){
			const line = script[i];
			const s = Script.parseLine(G,line);
			if(s.kind == SCRIPT_KIND.LABEL){
				Script.#labelLookup.set(s.label,i);
			}
		}
	}
	static parseLine(G,line){
		const [kind,data] = line.split("|");
		switch(kind){
			case SCRIPT_KIND.IF:
				const ifdata = JSON.parse(data);
				return {
					kind,
					label:ifdata.label,
					//retrun true or false if you have the keyword
					conditionMet:(G.quest_flags.hasOwnProperty(ifdata.keyword)?true:false),
					stopRendering:false,//flag to tell the renderer if this tag is the end of a block of text or not
					hasRender:false//flag to tell the renderer if it's got any visible effect
				};
				break;
			case SCRIPT_KIND.LABEL:
				return {
					kind,
					label:data,
					stopRendering:false,
					hasRender:false
				};
				break;
			case SCRIPT_KIND.TEXT:
				return {
					kind,
					text:data,
					stopRendering:false,
					hasRender:true
				};
				break;
			case SCRIPT_KIND.CHOICE:
				return {
					kind,
					choice:JSON.parse(data),//should be an array of:{text,label}
					stopRendering:true,
					hasRender:true
				};
				break;
			case SCRIPT_KIND.ACTION:
				return {
					kind,
					data:JSON.parse(data),
					stopRendering:true,
					hasRender:false
				};
				break;
			case SCRIPT_KIND.SKILL_CHECK:
				const check = JSON.parse(data);
				return {
					kind,
					amount:check.amount,   //value for skill check
					skill:check.skill,     //which skill to test
					success:check.success, //label of success condition
					fail:check.fail,       //label of fail condition
					stopRendering:true,
					hasRender:true
				};
				break;
			case SCRIPT_KIND.JUMP:
				return {
					kind,
					label:data,
					stopRendering:false,
					hasRender:false
				};
				break;
			case SCRIPT_KIND.PAUSE:
				return {
					kind,//no data for pause
					stopRendering:true,
					hasRender:false
				};
				break;
			case SCRIPT_KIND.SHOW:
				return {
					kind,
					data,
					stopRendering:false,
					hasRender:true
				};
				break;
			case SCRIPT_KIND.DONE:
				return {
					kind,//no data for done
					stopRendering:true,
					hasRender:false
				};
				break;
			default:
				console.warn("unknown script: ",line);
				return {kind:'unknown'};
		}
	}
	
	//render goes from the current position to the next script point that needs input 
	static render(G,ctx){//canvas context
		const textPos = {x:255,y:150};
		const lines = [];
		const callback = (s)=>{
			if(s.hasRender){
				const text = Script.#renderLine(ctx,s,textPos);
				for(const txt of text){
					lines.push(txt);
				}
			}
		};
		Script.#scrollThroughLines(G,callback);
		
		if(Script.#renderIdx==0&&Script.#renderLineIdx==0){
			//TODO: use this hash to ID audio snippets 
			const blockText = lines.map((x)=>{
				return x.text;
			}).join(' ');
			//jenkins hash
			//https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
			const hash=(b)=>{
				let a=0;
				let c=0;
				for(a=0,c=b.length;c--;){
					a+=b.charCodeAt(c);
					a+=a<<10,a^=a>>6;
					a+=a<<3;a^=a>>11;
				}
				return((a+(a<<15)&4294967295)>>>0).toString(16);
			};
			console.log("audio snippet text:",hash(blockText),blockText);
			Audio.PlayScriptLine(hash(blockText));
		}
		let line = lines[Script.#renderLineIdx];
		Script.#renderIdx+=0.5;
		if(Script.#renderIdx+1>=line.text.length){
			//since this is used for substring, it needs to go up to length, not len-1
			Script.#renderIdx = line.text.length;
			//reached end of a line, progress to next line
			Script.#renderLineIdx+=1;
			if(Script.#renderLineIdx>=lines.length){
				//don't go past end of all lines
				Script.#renderLineIdx=lines.length-1;
			}else{
				Script.#renderIdx=0;//moved to next line, reset position
			}
		}
		let lineIdx = 0;
		for(const line of lines){
			if(lineIdx>Script.#renderLineIdx){
				break;//not up to this line yet
			}
			if(lineIdx == Script.#renderLineIdx){
				let lineText = line.text.substring(0,Math.floor(Script.#renderIdx));
				UI.drawBitmapText(ctx,lineText, line.x, line.y);
				//bounce in the next character
				const linDim = UI.getBitmapTextDimensions(ctx,lineText);
				if(Math.floor(Script.#renderIdx)<line.text.length){
					const fract = Script.#renderIdx * 10 % 10 /10;
					UI.drawBitmapText(ctx,line.text.charAt(Math.floor(Script.#renderIdx)+1), line.x+linDim.width, line.y-6*(1-fract));
				}
			}
			if(lineIdx < Script.#renderLineIdx){
				UI.drawBitmapText(ctx,line.text, line.x, line.y);
			}
			lineIdx+=1;
		}
	}
	static #renderLine(ctx,s,textPos){
		let text = [];
		//text, choice, action, show
		switch(s.kind){
			case SCRIPT_KIND.TEXT:
				text.push({text:s.text,x:textPos.x,y:textPos.y});
				textPos.y+=15;
				break;
			case SCRIPT_KIND.CHOICE:
				//don't need to render here, since it's in the sprite
				break;
			case SCRIPT_KIND.SKILL_CHECK:
				text.push({text:"skill check: ",x:textPos.x,y:textPos.y});
				textPos.y+=15;
				text.push({text:"need, "+s.amount+" "+s.skill,x:textPos.x,y:textPos.y});
				textPos.y+=15;
				text.push({text:"<choose characters for 1 fatigue>",x:textPos.x,y:textPos.y});
				textPos.y+=15;
				break;
			
			case SCRIPT_KIND.SHOW:
				const spriteShow = Script.#sprites.show;
				spriteShow.url = s.data;
				Renderer.drawSprite(spriteShow,ctx);
				break;
			default:
				console.warn("cannot render script: ",s);
		}
		return text;
	}
	
	//when the script is waiting for input (stopRendering), return the script option at that spot
	static getCurrentWaitingAction(G){
		const waitingIdx =Script.#scrollThroughLines(G,()=>{});
		const line= Script.#curScript[waitingIdx];
		const s= Script.parseLine(G,line);
		return s;
	}
	//actions
	static actionContinue(G){
		//progress past pause
		Script.#renderLineIdx = 0;
		Script.#renderIdx = 0;
		Script.#curScriptPosition =Script.#scrollThroughLines(G,()=>{})+1;
		Audio.PlaySFX(SFX.click);
	}
	static actionJump(G,jumpLabel){
		//jump to the chosen position
		Script.#renderLineIdx = 0;
		Script.#renderIdx = 0;
		Script.#curScriptPosition = Script.#labelLookup.get(jumpLabel);
	}
	static actionDone(G){
		//end the script
		Script.#renderLineIdx = 0;
		Script.#renderIdx = 0;
		Script.#curScript = null;
		Script.#curScriptPosition = 0;
		Script.#isRunning = false;
		Script.#labelLookup = new Map();
		Audio.StopScriptLine();
		Audio.PlaySFX(SFX.receive);
	}
	
}

export {Script,SCRIPT_KIND,ACTION_KIND};
