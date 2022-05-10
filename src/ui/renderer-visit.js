
import { Renderer } from "./renderer.js";
import { Script,SCRIPT_KIND,ACTION_KIND } from "../Script.js";
import { UI } from "./ui.js";
import { Audio } from "../audio/audio.js";
import { SFX } from "../data/AudioData.js";

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
			175,110,600,253,//x,y,w,h
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
		'ui/visit_btn_choice_lrg.png',
		330,200,186,32,
		0,0),
	}
	static #selectedSkillCheck = [];
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		if(!Script.isRunning()){
			return;
		}
		//window
		Renderer.drawSprite(RenderVisit.#sprites.bg,ctx);
		Script.render(G,ctx);
		const script = Script.getCurrentWaitingAction(G);
		switch(script.kind){
			case SCRIPT_KIND.PAUSE:
				const spritePause = RenderVisit.#sprites.pause;
				Renderer.drawSprite(spritePause,ctx);
				UI.drawClickableRect(ctx,UI.EFFECT.GENERIC_HOVER,
					spritePause.x+19,spritePause.y+19,spritePause.width-38,spritePause.height-35,
					true,false);
				break;
			case SCRIPT_KIND.CHOICE:
				let choiceY = 155;
				for(const choice of script.choice){
					const spriteChoice = RenderVisit.#sprites.choice;
					spriteChoice.y = choiceY;
					Renderer.drawSprite(spriteChoice,ctx);
					UI.drawClickableRect(ctx,UI.EFFECT.GENERIC_HOVER,
						spriteChoice.x,spriteChoice.y,spriteChoice.width,spriteChoice.height,
						true,false);
					UI.drawBitmapText(ctx,choice.text, spriteChoice.x+25,spriteChoice.y+20);
					choiceY+=40;
				}
				break;
			case SCRIPT_KIND.ACTION:
				const spriteAction = RenderVisit.#sprites.action;
				Renderer.drawSprite(spriteAction,ctx);
				UI.drawClickableRect(ctx,UI.EFFECT.GENERIC_HOVER,
					spriteAction.x+19,spriteAction.y+19,spriteAction.width-38,spriteAction.height-35,
					true,false);
				break;
			case SCRIPT_KIND.SKILL_CHECK:
				const spriteSkillCheck = RenderVisit.#sprites.skillCheck;
				Renderer.drawSprite(spriteSkillCheck,ctx);
				UI.drawClickableRect(ctx,UI.EFFECT.GENERIC_HOVER,
					spriteSkillCheck.x+19,spriteSkillCheck.y+19,spriteSkillCheck.width-38,spriteAction.spriteSkillCheck-35,
					true,false);
				//render characters to skill check against
				ctx.strokeStyle = 'purple';
				for(const [name,ch] of Object.entries(G.characters)){
					const sprite = RenderVisit.#sprites.characters[name];
					if(RenderVisit.#selectedSkillCheck.indexOf(name)>-1){
						UI.drawClickableRect(ctx,UI.EFFECT.CHARACTER_SELECTED,
							sprite.x,sprite.y,sprite.width,sprite.height);
					}else{
						const isDisabled = (ch.fatigue<MAX_FATIGUE);
						UI.drawClickableRect(ctx,UI.EFFECT.CHARACTER_ABILITY,
							sprite.x,sprite.y,sprite.width,sprite.height,
							true,isDisabled);
					}
					//draw their stats
					let sklAmount = 1;
					if(ch.skill_type == script.skill){
						sklAmount+=ch.skill_amount;
					}
					ctx.fillStyle = '#000';
					ctx.font = '22pt monospace';
					ctx.fillText("+"+sklAmount , sprite.x+20, sprite.y+48);
					ctx.font = '12pt monospace';
				}
				break;
			case SCRIPT_KIND.DONE:
				const spriteDone = RenderVisit.#sprites.done;
				Renderer.drawSprite(spriteDone,ctx);
				UI.drawClickableRect(ctx,UI.EFFECT.GENERIC_HOVER,
					spriteDone.x+19,spriteDone.y+19,spriteDone.width-38,spriteDone.height-35,
					true,false);
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
				let choiceY = 155;
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
