
import { Renderer } from "./renderer.js";
import {
	SKILLS,
	MAX_SANITY,
	MAX_FATIGUE,
	MAX_ABILITY_POINTS,
	EVENT_TYPES
} from '../data/Consts.js';


class RenderCombat{
	static #sprites = {
		bg:Renderer.getSprite(
			'ui/cbt_bg.png',
			0,100,796,332,0,0
		),
		characters:{
			a_fatigue:Renderer.getSprite(
				'./img.png',
				196,100+45,48,48,//x,y,w,h
				0,0//sx.sy
			),
			b_fatigue:Renderer.getSprite(
				'./img.png',
				171,100+101,48,48,
				0,0),
			c_fatigue:Renderer.getSprite(
				'./img.png',
				170,100+194,48,48,
				0,0),
			d_fatigue:Renderer.getSprite(
				'./img.png',
				201,100+248,48,48,
				0,0),
			e_fatigue:Renderer.getSprite('./img.png',
				286,100+148,48,48,
				0,0),
			a_sanity:Renderer.getSprite(
				'./img.png',
				147,100+45,48,48,//x,y,w,h
				0,0//sx.sy
			),
			b_sanity:Renderer.getSprite(
				'./img.png',
				122,100+101,48,48,
				0,0),
			c_sanity:Renderer.getSprite(
				'./img.png',
				121,100+194,48,48,
				0,0),
			d_sanity:Renderer.getSprite(
				'./img.png',
				152,100+248,48,48,
				0,0),
			e_sanity:Renderer.getSprite('./img.png',
				237,100+148,48,48,
				0,0),
		},
		mobs:{
			generic_mob:Renderer.getSprite(
				'./img.png',
				Renderer.width-300,Renderer.height/2-50,100,100,
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
			ctx.strokeStyle = 'orange';
			//'ok' button
			const spriteOk = RenderCombat.#sprites.ok;
			ctx.strokeRect(spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height);
			ctx.fillText("ok:", spriteOk.x+50, spriteOk.y+50);
			if(Renderer.isMouseOver(spriteOk)){
				ctx.fillStyle = '#DDD';
				ctx.fillRect(spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height);
			}
			return;
		}
		//otherwise, render combat
		Renderer.drawSprite(RenderCombat.#sprites.bg,ctx);
		for(const [name,ch] of Object.entries(G.characters)){
			ctx.strokeStyle = 'orange';
			const spriteFatigue = RenderCombat.#sprites.characters[name+"_fatigue"];
			ctx.strokeRect(spriteFatigue.x,spriteFatigue.y,spriteFatigue.width,spriteFatigue.height);
			if(Renderer.isMouseOver(spriteFatigue)){
				ctx.fillStyle = '#DDD';
				if(ch.hp<=0||ch.fatigue>=MAX_FATIGUE){ctx.fillStyle = 'red';}
				ctx.fillRect(spriteFatigue.x,spriteFatigue.y,spriteFatigue.width,spriteFatigue.height);
			}
			ctx.strokeStyle = 'purple';
			const spriteSanity = RenderCombat.#sprites.characters[name+"_sanity"];
			ctx.strokeRect(spriteSanity.x,spriteSanity.y,spriteSanity.width,spriteSanity.height);
			if(Renderer.isMouseOver(spriteSanity)){
				ctx.fillStyle = '#DDD';
				if(ch.hp<=0||ch.sanity<=0){ctx.fillStyle = 'red';}
				ctx.fillRect(spriteSanity.x,spriteSanity.y,spriteSanity.width,spriteSanity.height);
			}
		}
		if(G.events.length){
			const evt = G.events[0];
			//render mobs back-to-front so back mobs sit behind front ones
			for(let i= evt.data.mobs.length-1;i>=0;i-=1){
				const mob = evt.data.mobs[i];
				const sprite = RenderCombat.#sprites.mobs[mob.name];
				//draw slightly offset to look like a stack
				ctx.fillRect(sprite.x+i*4,sprite.y+i*4,sprite.width,sprite.height);
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
