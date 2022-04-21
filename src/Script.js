
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
class Script{
	static #curScript = null;
	static #curScriptPosition = 0;
	static #isRunning = false;
	static #labelLookup = new Map();//label:index
	
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
				if(jumpLocation<i){
					console.warn("jumping backwards",s);
				}
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
		//TODO: these internal vars could probably be stored in G? (for save/restore)
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
					data:JSON.parse(data),//TODO: define props
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
					data,//TODO: define props
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
	static render(ctx,G){//canvas context
		const textPos = {x:20,y:30};
		const callback = (s)=>{
			if(s.hasRender){
				Script.renderLine(ctx,s,textPos);
			}
		};
		Script.#scrollThroughLines(G,callback);
	}
	static renderLine(ctx,s,textPos){
		//text, choice, action, show
		switch(s.kind){
			case SCRIPT_KIND.TEXT:
				ctx.fillText(s.text, textPos.x, textPos.y);
				textPos.y+=10;
				break;
			case SCRIPT_KIND.CHOICE:
				for(const c of s.choice){
					ctx.fillText(c.text, textPos.x, textPos.y);
					textPos.y+=10;
				}
				break;
			case SCRIPT_KIND.SKILL_CHECK:
				ctx.fillText("skill check: ", textPos.x, textPos.y);
				textPos.y+=10;
				ctx.fillText("need, "+s.amount+" "+s.skill, textPos.x, textPos.y);
				textPos.y+=10;
				break;
			case SCRIPT_KIND.SHOW:
				//TODO: consume data
				break;
			default:
				console.warn("cannot render script: ",s);
		}
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
		Script.#curScriptPosition =Script.#scrollThroughLines(G,()=>{})+1;
	}
	static actionJump(G,jumpLabel){
		//jump to the chosen position
		Script.#curScriptPosition = Script.#labelLookup.get(jumpLabel);
	}
	static actionDone(G){
		//end the script
		Script.#curScript = null;
		Script.#curScriptPosition = 0;
		Script.#isRunning = false;
		Script.#labelLookup = new Map();
	}
	
}

export {Script,SCRIPT_KIND};
