
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
		bg:Renderer.getSprite(
			'ui/3_visit_window_crop.png',
			200,110,411,253,//x,y,w,h
			0,0//sx.sy
		),
		characters:{
			a:Renderer.getSprite(
				'characters/characters_512.png',
				0,0,90,90,60,16
			),
			b:Renderer.getSprite(
				'characters/characters_512.png',
				196,0,90,90,320,10
			),
			c:Renderer.getSprite(
				'characters/characters_512.png',
				392,0,90,90,600,0
			),
			d:Renderer.getSprite(
				'characters/characters_512.png',
				588,0,90,90,830,0
			),
			e:Renderer.getSprite(
				'characters/characters_512.png',
				784,0,90,90,1360,0
			),
		},
		pause:Renderer.getSprite(//click to continue
		'ui/visit_btn_continue.png',
		457,350,158,70,
		0,0),
		done:Renderer.getSprite(//click to continue
		'ui/visit_btn_ok.png',
		457,350,158,70,
		0,0),
		action:Renderer.getSprite(//click to continue
		'ui/visit_btn_continue.png',
		457,350,158,70,
		0,0),
		skillCheck:Renderer.getSprite(//click to continue
		'ui/visit_btn_continue.png',
		457,350,158,70,
		0,0),
		choice:Renderer.getSprite(//many options
		'ui/visit_btn_choice.png',
		330,200,100,32,
		0,0)
	}
	static #selectedSkillCheck = [];
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		if(!Script.isRunning()){
			return;
		}
		//bg overlay
		ctx.fillStyle = 'rgba(200,200,200,0.7);';
		ctx.fillRect(89,95,710,Renderer.height-200);
		//window
		Renderer.drawSprite(RenderVisit.#sprites.bg,ctx);
		Script.render(G,ctx);
		const script = Script.getCurrentWaitingAction(G);
		switch(script.kind){
			case SCRIPT_KIND.PAUSE:
				const spritePause = RenderVisit.#sprites.pause;
				Renderer.drawSprite(spritePause,ctx);
				if(Renderer.isMouseOver(spritePause)){
					ctx.fillStyle = 'rgba(200,200,200,0.7)';
					ctx.fillRect(spritePause.x+19,spritePause.y+19,spritePause.width-38,spritePause.height-35);
				}
				break;
			case SCRIPT_KIND.CHOICE:
				let choiceY = 155;
				for(const choice of script.choice){
					const spriteChoice = RenderVisit.#sprites.choice;
					spriteChoice.y = choiceY;
					Renderer.drawSprite(spriteChoice,ctx);
					if(Renderer.isMouseOver(spriteChoice)){
						ctx.fillStyle = 'rgba(200,200,200,0.7)';
						ctx.fillRect(spriteChoice.x,spriteChoice.y,spriteChoice.width,spriteChoice.height);
					}
					ctx.fillStyle = '#000';
					ctx.fillText(choice.text, spriteChoice.x+8,spriteChoice.y+20);
					choiceY+=40;
				}
				break;
			case SCRIPT_KIND.ACTION:
				const spriteAction = RenderVisit.#sprites.action;
				Renderer.drawSprite(spriteAction,ctx);
				if(Renderer.isMouseOver(spriteAction)){
					ctx.fillStyle = 'rgba(200,200,200,0.7)';
					ctx.fillRect(spriteAction.x+19,spriteAction.y+19,spriteAction.width-38,spriteAction.height-35);
				}
				break;
			case SCRIPT_KIND.SKILL_CHECK:
				const spriteSkillCheck = RenderVisit.#sprites.skillCheck;
				Renderer.drawSprite(spriteSkillCheck,ctx);
				if(Renderer.isMouseOver(spriteSkillCheck)){
					ctx.fillStyle = 'rgba(200,200,200,0.7)';
					ctx.fillRect(spriteSkillCheck.x+19,spriteSkillCheck.y+19,spriteSkillCheck.width-38,spriteSkillCheck.height-35);
				}
				//render characters to skill check against
				ctx.strokeStyle = 'purple';
				for(const [name,ch] of Object.entries(G.characters)){
					const sprite = RenderVisit.#sprites.characters[name];
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
				}
				break;
			case SCRIPT_KIND.DONE:
				const spriteDone = RenderVisit.#sprites.done;
				Renderer.drawSprite(spriteDone,ctx);
				if(Renderer.isMouseOver(spriteDone)){
					ctx.fillStyle = 'rgba(200,200,200,0.7)';
					ctx.fillRect(spriteDone.x+19,spriteDone.y+19,spriteDone.width-38,spriteDone.height-35);
				}
				break;			
		}
	}
	static click(client,G,ctx){//ctx is the G ctx here
		if(!Script.isRunning()){
			return;
		}
		const script = Script.getCurrentWaitingAction(G);
		switch(script.kind){
			case SCRIPT_KIND.PAUSE:
				const spritePause = RenderVisit.#sprites.pause;
				if(Renderer.isMouseOver(spritePause)){
					client.moves.pause();
				}
				break;
			case SCRIPT_KIND.CHOICE:
				let choiceY = 200;
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
				for(const [name,ch] of Object.entries(G.characters)){
					const sprite = RenderVisit.#sprites.characters[name];
					if(Renderer.isMouseOver(sprite)){
						if(ch.fatigue<MAX_FATIGUE){//is valid
							if(RenderVisit.#selectedSkillCheck.indexOf(name)<0){
								RenderVisit.#selectedSkillCheck.push(name);
							}
						}
						//TODO: if not valid?
					}
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
