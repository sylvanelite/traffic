
import { Renderer } from "./renderer.js";
import { UI } from "./ui.js";

import {
	SKILLS,
	MAX_SANITY,
	MAX_FATIGUE,
	MAX_ABILITY_POINTS,
	EVENT_TYPES
} from '../data/Consts.js';
import { MobSprites,getMobSpriteByName } from '../data/MobSprites.js';


class RenderCombat{
	static #sprites = {
		bg:Renderer.getSprite(
			'ui/cbt_bg.png',
			0,100,796,332,0,0
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
			a_fatigue:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				196,100+45,48,48,//x,y,w,h
				48,0//sx.sy
			),
			b_fatigue:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				171,100+101,48,48,
				48,0),
			c_fatigue:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				170,100+194,48,48,
				48,0),
			d_fatigue:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				201,100+248,48,48,
				48,0),
			e_fatigue:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				286,100+148,48,48,
				48,0),
			a_sanity:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				147,100+45,48,48,//x,y,w,h
				0,0//sx.sy
			),
			b_sanity:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				122,100+101,48,48,
				0,0),
			c_sanity:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				121,100+194,48,48,
				0,0),
			d_sanity:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				152,100+248,48,48,
				0,0),
			e_sanity:Renderer.getSprite(
				'ui/cbt_stat_usage.png',
				237,100+148,48,48,
				0,0),
		},
		ok:Renderer.getSprite(
		'./img.png',
		200,250,100,100,
		0,0),
	};
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		//check for combat being over
		if(G.events.length&&G.events[0].data.mobs[0].hp<=0){
			//'ok' button
			const spriteOk = RenderCombat.#sprites.ok;
				UI.drawClickableRect(ctx,UI.EFFECT.OK_BUTTON,
					spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height,
					true,false);
			UI.drawBitmapText(ctx,"ok:", spriteOk.x+50, spriteOk.y+50,UI.FONT.OK);
			return;
		}
		//otherwise, render combat
		Renderer.drawSprite(RenderCombat.#sprites.bg,ctx);
		for(const [name,ch] of Object.entries(G.characters)){
			const ch_portrait = RenderCombat.#sprites.characters[name];
			const spriteFatigue = RenderCombat.#sprites.characters[name+"_fatigue"];
			UI.drawClickableRect(ctx,UI.EFFECT.COMBAT_ICON_FATIGUE,
				spriteFatigue.x,spriteFatigue.y,spriteFatigue.width,spriteFatigue.height,
				true,(ch.hp<=0||ch.fatigue>=MAX_FATIGUE));
			Renderer.drawSprite(spriteFatigue,ctx);
			if(Renderer.isMouseOver(spriteFatigue)){
				UI.drawClickableRect(ctx,UI.EFFECT.COMBAT_CHARACTER_FATIGUE,
					ch_portrait.x,ch_portrait.y,ch_portrait.width,ch_portrait.height,
					true,(ch.hp<=0||ch.fatigue>=MAX_FATIGUE));
			}
			const spriteSanity = RenderCombat.#sprites.characters[name+"_sanity"];
			Renderer.drawSprite(spriteSanity,ctx);
			UI.drawClickableRect(ctx,UI.EFFECT.COMBAT_ICON_SANITY,
				spriteSanity.x,spriteSanity.y,spriteSanity.width,spriteSanity.height,
				true,(ch.hp<=0||ch.sanity<=0));
			if(Renderer.isMouseOver(spriteSanity)){
				UI.drawClickableRect(ctx,UI.EFFECT.COMBAT_CHARACTER_SANITY,
					ch_portrait.x,ch_portrait.y,ch_portrait.width,ch_portrait.height,
					true,(ch.hp<=0||ch.fatigue>=MAX_FATIGUE));
			}
		}
		if(G.events.length){
			const evt = G.events[0];
			//render mobs back-to-front so back mobs sit behind front ones
			for(let i= evt.data.mobs.length-1;i>=0;i-=1){
				const mob = evt.data.mobs[i];
				const mobSprite = getMobSpriteByName(mob.name);
				const enemySprite = Renderer.getSprite(
					'aekashics_librarium/'+mobSprite.name,
					Renderer.width-300,Renderer.height/2-50,
					mobSprite.width,mobSprite.height,0,0
				);
				//draw slightly offset to look like a stack
				ctx.fillRect(enemySprite.x+i*4,enemySprite.y+i*4,100,100);
				ctx.strokeStyle = '1px solid black';
				ctx.strokeRect(enemySprite.x+i*4,enemySprite.y+i*4,100,100);
				if(i==0){
					const scaleFactor = (enemySprite.width>enemySprite.height?
						enemySprite.width/100
						:
						enemySprite.height/100
					);
					Renderer.drawSpriteScaled(enemySprite,mobSprite.width/scaleFactor,mobSprite.height/scaleFactor,ctx);
				}
			}
		}

	}
	static click(client,G,ctx){//ctx is the G ctx here
		//check for combat being over
		if(G.events.length&&G.events[0].data.mobs[0].hp<=0){
			ctx.strokeStyle = 'orange';
			//'ok' button
			const spriteOk = RenderCombat.#sprites.ok;
			if(Renderer.isMouseOver(spriteOk)){
				client.moves.endCombat();
			}
			return;
		}
		
		//TODO: implement some way to commit more than 1 fatigue/sanity?
		for(const [name,ch] of Object.entries(G.characters)){
			if(ch.hp<=0){continue;}
			const spriteFatigue = RenderCombat.#sprites.characters[name+"_fatigue"];
			if(Renderer.isMouseOver(spriteFatigue)&&ch.fatigue<MAX_FATIGUE){
				client.moves.attack(name,1,0);
			}
			const spriteSanity = RenderCombat.#sprites.characters[name+"_sanity"];
			if(Renderer.isMouseOver(spriteSanity)&&ch.sanity>0){
				client.moves.attack(name,0,1);
			}
		}
	}
};

export {RenderCombat};
