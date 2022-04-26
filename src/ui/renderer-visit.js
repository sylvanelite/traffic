
import { Renderer } from "./renderer.js";
import { Script,SCRIPT_KIND,ACTION_KIND } from "../Script.js";
import {
	SKILLS,
	MAX_SANITY,
	MAX_FATIGUE,
	MAX_ABILITY_POINTS,
	EVENT_TYPES
} from '../data/Consts.js';

class RenderVisit {
	static #sprites = {
		characters:{
			a:Renderer.getSprite(
				'./img.png',
				0,0,100,100,//x,y,w,h
				0,0//sx.sy
			),
			b:Renderer.getSprite(
				'./img.png',
				0,0,100,100,
				0,0),
			c:Renderer.getSprite(
				'./img.png',
				0,0,100,100,
				0,0),
			d:Renderer.getSprite(
				'./img.png',
				0,0,100,100,
				0,0),
			e:Renderer.getSprite('./img.png',
				0,0,100,100,
				0,0)
		},
		pause:Renderer.getSprite(//click to continue
		'./img.png',
		200,250,100,100,
		0,0),
		done:Renderer.getSprite(//click to continue
		'./img.png',
		200,250,100,100,
		0,0),
		action:Renderer.getSprite(//click to continue
		'./img.png',
		200,250,100,100,
		0,0),
		skillCheck:Renderer.getSprite(//click to continue
		'./img.png',
		200,250,100,100,
		0,0),
		choice:Renderer.getSprite(//many options
		'./img.png',
		200,150,100,32,
		0,0)
	}
	static #selectedSkillCheck = [];
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		if(!Script.isRunning()){
			return;
		}
		ctx.fillStyle = '#ccc';
		Script.render(G,ctx);
		const script = Script.getCurrentWaitingAction(G);
		switch(script.kind){
			case SCRIPT_KIND.PAUSE:
				const spritePause = RenderVisit.#sprites.pause;
				ctx.fillRect(spritePause.x,spritePause.y,spritePause.width,spritePause.height);
				if(Renderer.isMouseOver(spritePause)){
					ctx.fillStyle = '#DDD';
					ctx.fillRect(spritePause.x,spritePause.y,spritePause.width,spritePause.height);
				}
				break;
			case SCRIPT_KIND.CHOICE:
				let choiceY = 160;
				for(const choice of script.choice){
					ctx.fillStyle = '#ccc';
					const spriteChoice = RenderVisit.#sprites.choice;
					spriteChoice.y = choiceY;
					ctx.fillRect(spriteChoice.x,spriteChoice.y,spriteChoice.width,spriteChoice.height);
					if(Renderer.isMouseOver(spriteChoice)){
						ctx.fillStyle = '#DDD';
						ctx.fillRect(spriteChoice.x,spriteChoice.y,spriteChoice.width,spriteChoice.height);
					}
					ctx.fillStyle = '#000';
					ctx.fillText(choice.text, spriteChoice.x,spriteChoice.y+16);
					choiceY+=40;
				}
				break;
			case SCRIPT_KIND.ACTION:
				const spriteAction = RenderVisit.#sprites.action;
				ctx.fillRect(spriteAction.x,spriteAction.y,spriteAction.width,spriteAction.height);
				if(Renderer.isMouseOver(spriteAction)){
					ctx.fillStyle = '#DDD';
					ctx.fillRect(spriteAction.x,spriteAction.y,spriteAction.width,spriteAction.height);
				}
				//render what the action does
				ctx.fillStyle = '#000';
				//ctx.fillText(s.data[0].kind ... , 20, 20);
				//TODO: render based on ACTION_KIND
				break;
			case SCRIPT_KIND.SKILL_CHECK:
				const spriteSkillCheck = RenderVisit.#sprites.skillCheck;
				ctx.fillRect(spriteSkillCheck.x,spriteSkillCheck.y,spriteSkillCheck.width,spriteSkillCheck.height);
				if(Renderer.isMouseOver(spriteSkillCheck)){
					ctx.fillStyle = '#DDD';
					ctx.fillRect(spriteSkillCheck.x,spriteSkillCheck.y,spriteSkillCheck.width,spriteSkillCheck.height);
				}
				//render the check to make
				ctx.fillStyle = '#000';
				ctx.fillText(script.skill+" "+script.amount , 200, 120);
				//render characters to skill check against
				ctx.strokeStyle = 'purple';
				let x = 0;
				for(const [name,ch] of Object.entries(G.characters)){
					const sprite = RenderVisit.#sprites.characters[name];
					sprite.x = x+10;
					if(RenderVisit.#selectedSkillCheck.indexOf(name)>-1){
						ctx.fillStyle = '#080';
						ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
					}
					ctx.strokeRect(sprite.x,sprite.y,sprite.width,sprite.height);
					if(Renderer.isMouseOver(sprite)){
						ctx.fillStyle = 'red';
						if(ch.fatigue<MAX_FATIGUE){
						ctx.fillStyle = 'green';
						}
						ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
					}
					//draw their stats
					let sklAmount = 1;
					if(ch.skill_type == script.skill){
						sklAmount+=ch.skill_amount;
					}
					ctx.fillStyle = '#000';
					ctx.fillText("+"+sklAmount , sprite.x, sprite.y+16);
					x+=120;
				}
				break;
			case SCRIPT_KIND.DONE:
				const spriteDone = RenderVisit.#sprites.done;
				ctx.fillRect(spriteDone.x,spriteDone.y,spriteDone.width,spriteDone.height);
				if(Renderer.isMouseOver(spriteDone)){
					ctx.fillStyle = '#DDD';
					ctx.fillRect(spriteDone.x,spriteDone.y,spriteDone.width,spriteDone.height);
				}
				break;			
		}
		
			/*
		kind,
		amount:check.amount,   //value for skill check
		skill:check.skill,     //which skill to test
		success:check.success, //label of success condition
		fail:check.fail,       //label of fail condition
		*/
		/*
			

	
	//commit to a choice and progress the script
	choice:(G,ctx,jumpLabel) => {
		const s= Script.getCurrentWaitingAction(G);
		if(s.kind!=SCRIPT_KIND.CHOICE){return INVALID_MOVE;}
		Script.actionJump(G,jumpLabel);
	},
	//action...{todo}
	action:(G,ctx)=>{
		const s= Script.getCurrentWaitingAction(G);//TODO: if not 'action', invalid move
		if(s.kind!=SCRIPT_KIND.ACTION){return INVALID_MOVE;}
		const ACTION_KIND = {
			DRAW:"draw",
			GAIN_KEYWORD:"gain_keyword",
			STAT:"stat",
		};
		for(const action of s.data){
			switch(action.kind){
				case ACTION_KIND.DRAW:
					for(let i=0;i<action.value;i+=1){
						console.log("drawing card");
						G.abilities.push(getAbility(ctx));
					}
					break;
				case ACTION_KIND.GAIN_KEYWORD:
					console.log("got word:"+action.value);
					G.quest_flags[action.value]=true;
					break;
				case ACTION_KIND.STAT:
					for(let i=0;i<action.value;i+=1){
						console.log(action);
						switch(action.stat){
							case "fatigue":
								G.characters[action.character].fatigue+=action.value;
								if(G.characters[action.character].fatigue<0){G.characters[action.character].fatigue=0;}
								if(G.characters[action.character].fatigue>MAX_FATIGUE){G.characters[action.character].fatigue=MAX_FATIGUE;}
								break;
							case "sanity":
								G.characters[action.character].sanity+=action.value;
								if(G.characters[action.character].sanity<0){G.characters[action.character].sanity=0;}
								if(G.characters[action.character].sanity>MAX_SANITY){G.characters[action.character].sanity=MAX_SANITY;}
								break;
							break;
							case "hp":
								changeHp(G.characters[action.character],action.value);
								break;
							default:
							console.warn("unkonwn stat:",action);
						}
					}
					break;
				default:
				console.warn("unknown action kind",action);
			}
		}
		//progress past action
		Script.actionContinue(G);
	},
	//skill check, input is a list of characters to use for the check
	skillCheck:(G,ctx,characters)=>{
	
		let checkAmount = 0;
		const s= Script.getCurrentWaitingAction(G);
		if(s.kind!=SCRIPT_KIND.SKILL_CHECK){return INVALID_MOVE;}
		//TODO: if character.skill != s.skill, invalid move
		//TODO: [characters] should be a set (no picking the same character twice)
		for(const chName of characters){
			const ch = G.characters[chName];
			ch.fatigue+=1;
			if(ch.skill_type == s.skill){
				checkAmount+=ch.skill_amount;
			}
		}
		console.log("skill check, characters have a total of: "+checkAmount+" of "+s.skill);
		const rollBuff = ctx.random.D4();//TODO: push some animation for the roll
		checkAmount+=rollBuff;
		if(checkAmount>=s.amount){
			Script.actionJump(G,s.success);
		}else{
			Script.actionJump(G,s.fail);
		}
	},
	
		
		*/
	}
	static click(client,G,ctx){//ctx is the G ctx here
		if(!Script.isRunning()){
			return;
		}
	/*
client.moves.skillCheck(['a','d']);
	*/
		const script = Script.getCurrentWaitingAction(G);
		switch(script.kind){
			case SCRIPT_KIND.PAUSE:
				const spritePause = RenderVisit.#sprites.pause;
				if(Renderer.isMouseOver(spritePause)){
					client.moves.pause();
				}
				break;
			case SCRIPT_KIND.CHOICE:
				let choiceY = 160;
				for(const choice of script.choice){
					const spriteChoice = RenderVisit.#sprites.choice;
					spriteChoice.y = choiceY;
					if(Renderer.isMouseOver(spriteChoice)){
					client.moves.choice(choice.label);
					}
					choiceY+=40;
				}
				break;
			case SCRIPT_KIND.ACTION:
				const spriteAction = RenderVisit.#sprites.action;
				if(Renderer.isMouseOver(spriteAction)){
					client.moves.action();
				}
				break;
			case SCRIPT_KIND.SKILL_CHECK:
				const spriteSkillCheck = RenderVisit.#sprites.skillCheck;
				if(Renderer.isMouseOver(spriteSkillCheck)){
					//TODO: commit the action
					console.log(RenderVisit.#selectedSkillCheck);
					client.moves.skillCheck(RenderVisit.#selectedSkillCheck);
					RenderVisit.#selectedSkillCheck=[];
				}
				let x = 0;
				for(const [name,ch] of Object.entries(G.characters)){
					const sprite = RenderVisit.#sprites.characters[name];
					sprite.x = x+10;
					if(Renderer.isMouseOver(sprite)){
						if(ch.fatigue<MAX_FATIGUE){//is valid
							if(RenderVisit.#selectedSkillCheck.indexOf(name)<0){
								RenderVisit.#selectedSkillCheck.push(name);
							}
						}
						//TODO: if not valid?
					}
					x+=120;
				}
				break;
			case SCRIPT_KIND.DONE:
				const spriteDone = RenderVisit.#sprites.done;
				if(Renderer.isMouseOver(spriteDone)){
					client.moves.done();
				}
				break;			
		}
	}
};

export {RenderVisit};
