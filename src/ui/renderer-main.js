
import { Renderer } from "./renderer.js";
import { AreaData } from "../data/AreaData.js";

import {
	SKILLS,
	MAX_SANITY,
	MAX_FATIGUE,
	MAX_ABILITY_POINTS,
	EVENT_TYPES
} from "../data/Consts.js";


class RenderMain{
	
	static #sprites = {
		
		ui:{
			sanity_full:Renderer.getSprite(
				'ui/ui_symbols.png',
				0,33,7,7,0,0
			),
			sanity_empty:Renderer.getSprite(
				'ui/ui_symbols.png',
				0,33,7,7,0,7
			),
			fatigue_full:Renderer.getSprite(
				'ui/ui_symbols.png',
				0,43,10,10,7,0
			),
			fatigue_empty:Renderer.getSprite(
				'ui/ui_symbols.png',
				0,43,10,10,17,0
			),
			ap_full:Renderer.getSprite(
				'ui/ui_symbols.png',
				0,54,15,12,27,0
			),
			ap_empty:Renderer.getSprite(
				'ui/ui_symbols.png',
				0,54,15,12,42,0
			),
			skil_int:Renderer.getSprite(
				'ui/ui_symbols.png',
				164,32,29,17,0,14
			),
			skil_brv:Renderer.getSprite(
				'ui/ui_symbols.png',
				164,32,29,17,31,14
			),
			skil_str:Renderer.getSprite(
				'ui/ui_symbols.png',
				164,32,29,17,0,32
			),
		},
		
		bg:Renderer.getSprite(
			'ui/0_bg.png',
			0,0,980,540,0,0
		),
		map_towna:Renderer.getSprite(
			'ui/1_map_bg_crop.png',
			89,94,710,445,0,0
		),
		header:Renderer.getSprite(
			'ui/5_header_crop.png',
			0,0,980,100,0,0
		),
		header_front:Renderer.getSprite(
			'ui/5_header_front_crop.png',
			0,0,980,100,0,0
		),
		card:Renderer.getSprite(
			'ui/7_cards_crop.png',
			24,444,64,93,0,0
		),
		characters:{
			a:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					0,0,90,90,60,16
				),
				stats:Renderer.getSprite(
					'ui/6_stats_crop.png',
					0,0,196,90,0,0
				),
			},
			b:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					196,0,90,90,320,10
				),
				stats:Renderer.getSprite(
					'ui/6_stats_crop.png',
					196,0,196,90,0,0
				),
			},
			c:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					392,-10,90,90,600,0
				),
				stats:Renderer.getSprite(
					'ui/6_stats_crop.png',
					392,0,196,90,0,0
				),
			},
			d:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					588,0,90,90,830,0
				),
				stats:Renderer.getSprite(
					'ui/6_stats_crop.png',
					588,0,196,90,0,0
				),
			},
			e:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					784,0,90,90,1360,0
				),
				stats:Renderer.getSprite(
					'ui/6_stats_crop.png',
					784,0,196,90,0,0
				),
			}
		},
	};
	
	static #drawStats = (ctx,ch,x,y)=>{
		for(let i=0;i<MAX_SANITY;i+=1){
			if(i<ch.sanity){
				//draw sprite sanity
				const spriteSanity = RenderMain.#sprites.ui.sanity_full;
				spriteSanity.x=x+119+spriteSanity.width*i;
				Renderer.drawSprite(spriteSanity,ctx);
			}else{
				//draw sprite sanity missing
				const spriteSanityEmpty = RenderMain.#sprites.ui.sanity_empty;
				spriteSanityEmpty.x=x+119+spriteSanityEmpty.width*i;
				Renderer.drawSprite(spriteSanityEmpty,ctx);
			}
		}
		for(let i=0;i<MAX_FATIGUE;i+=1){
			if(i<ch.fatigue){
				//draw sprite fatigue
				const spriteFatigue = RenderMain.#sprites.ui.fatigue_full;
				spriteFatigue.x=x+105+spriteFatigue.width*i;
				Renderer.drawSprite(spriteFatigue,ctx);
			}else{
				//draw sprite fatigue missing
				const spriteFatigueEmpty = RenderMain.#sprites.ui.fatigue_empty;
				spriteFatigueEmpty.x=x+105+spriteFatigueEmpty.width*i;
				Renderer.drawSprite(spriteFatigueEmpty,ctx);
			}
		}
		for(let i=0;i<MAX_ABILITY_POINTS;i+=1){
			if(i<ch.ability_points){
				//draw sprite ap
				const spriteAP = RenderMain.#sprites.ui.ap_full;
				spriteAP.x=x+105+spriteAP.width*i;
				Renderer.drawSprite(spriteAP,ctx);
			}else{
				//draw sprite ap missing
				const spriteAPEmpty = RenderMain.#sprites.ui.ap_empty;
				spriteAPEmpty.x=x+105+spriteAPEmpty.width*i;
				Renderer.drawSprite(spriteAPEmpty,ctx);
			}
		}
		//draw stat element
		switch(ch.skill_type){
			case SKILLS.STR:
				RenderMain.#sprites.ui.skil_str.x = 164+x;
				Renderer.drawSprite(RenderMain.#sprites.ui.skil_str,ctx);
				break;
			case SKILLS.INT:
				RenderMain.#sprites.ui.skil_int.x = 164+x;
				Renderer.drawSprite(RenderMain.#sprites.ui.skil_int,ctx);
				break;
			case SKILLS.BRV:
				RenderMain.#sprites.ui.skil_brv.x = 164+x;
				Renderer.drawSprite(RenderMain.#sprites.ui.skil_brv,ctx);
				break;
		}
		//TODO:
		//draw attack value
		//draw HP bar
		
	}
	
	static render(G,ctx,context){//ctx here is canvas, not the G ctx
		Renderer.drawSprite(RenderMain.#sprites.bg,ctx);
		Renderer.drawSprite(RenderMain.#sprites.map_towna,ctx);//TODO: read the town from the G data
		Renderer.drawSprite(RenderMain.#sprites.header,ctx);//TODO: read the town from the G data
		ctx.fillStyle = 'rgba(200,200,200,0.7)';
		for(const [name,ch] of Object.entries(G.characters)){
			const spriteStats = RenderMain.#sprites.characters[name].stats;
			Renderer.drawSprite(spriteStats,ctx);
			const spritePortrait = RenderMain.#sprites.characters[name].portrait;
			Renderer.drawSprite(spritePortrait,ctx);
			RenderMain.#drawStats(ctx,ch,spritePortrait.x,spritePortrait.y);
		}
		Renderer.drawSprite(RenderMain.#sprites.header_front,ctx);//TODO: read the town from the G data
		let x=24;
		let y=444;
		//TODO: descriptions for abilities
		//      or can generate on the fly
		ctx.strokeStyle = 'black';
		for(const a of Object.entries(G.abilities)){
			const sprite = RenderMain.#sprites.card;
			sprite.x=x;
			sprite.y=y;
			Renderer.drawSprite(sprite,ctx);
			if(Renderer.isMouseOver(sprite)){
				ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
				//TODO: draw the sprite on top when hovered (iterate backwards?)
			}
			x+=49;
			if(x%2==0){
				y=444;
			}else{
				y=447;
			}
		}
		
		if(context.activePlayers){//in a sub-stage
			return;
		}
		//visit/travel options:
		//could be loaded statically, move to top once all towns/areas have been finalised
		const areaName = G.area;
		const area = AreaData[areaName];
		const areaSprite = Renderer.getSprite(
			'./img.png',
			Math.floor(Renderer.width/2),120,132,32,
			0,0);
		ctx.fillStyle = '#000';
		ctx.fillText("current area:"+area.name, areaSprite.x, areaSprite.y+16);
		ctx.strokeStyle = '#000';
		x=0;
		for(const town of area.towns){
			const townSprite = Renderer.getSprite(
				'./img.png',
				x,150,132,32,
				0,0);
			ctx.fillStyle = '#ccc';
			if(G.visitDone){
				ctx.fillStyle = '#888';
			}
			ctx.fillRect(townSprite.x,townSprite.y,townSprite.width,townSprite.height);
			ctx.fillStyle = '#000';
			ctx.fillText("visit: "+town.name, townSprite.x, townSprite.y+16);
			if(Renderer.isMouseOver(townSprite)){
				if(G.visitDone){
					ctx.strokeStyle = 'red';
				}
				ctx.strokeRect(townSprite.x,townSprite.y,townSprite.width,townSprite.height);
			}
			x+=150;
		}
		x=0;
		for(const neighbour of area.neighbours){
			const neighbourSprite = Renderer.getSprite(
				'./img.png',
				x,186,132,32,
				0,0);
			ctx.fillStyle = '#ccc';
			ctx.fillRect(neighbourSprite.x,neighbourSprite.y,neighbourSprite.width,neighbourSprite.height);
			ctx.fillStyle = '#000';
			ctx.fillText("travel: "+neighbour.name, neighbourSprite.x, neighbourSprite.y+16);
			if(Renderer.isMouseOver(neighbourSprite)){
				ctx.strokeRect(neighbourSprite.x,neighbourSprite.y,neighbourSprite.width,neighbourSprite.height);
			}
			x+=150;
		}
	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		//main click is going to happen always, need to filter out other states
		//TODO: here call click() for abilities, since they can happen any time
		if(ctx.activePlayers){//in a sub-stage, don't fire off clicks on map
			return;
		}
		//TODO: here call click() for visit, travel, since they can only happen in the gloabl state
		
		//visit/travel options:
		const areaName = G.area;
		const area = AreaData[areaName];
		let x=0;
		for(const town of area.towns){
			const townSprite = Renderer.getSprite(
				'./img.png',
				x,150,132,32,
				0,0);
			if(Renderer.isMouseOver(townSprite)&&!G.visitDone){
				client.moves.selectVisitTown(town.name);
			}
			x+=150;
		}
		x=0;
		for(const neighbour of area.neighbours){
			const neighbourSprite = Renderer.getSprite(
				'./img.png',
				x,186,132,32,
				0,0);
			if(Renderer.isMouseOver(neighbourSprite)){
				client.moves.selectTravelArea(neighbour.name);
			}
			x+=150;
		}
		
	}
}

export {RenderMain};
