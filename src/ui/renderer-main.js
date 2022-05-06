
import { Renderer } from "./renderer.js";
import { AreaData,STAR_NONE } from "../data/AreaData.js"; 

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
		map:{
			star_filled:Renderer.getSprite(
				'level_map_pixel_artpng/3 UI/Star1.png',
				0,0,24,25,0,0
			),
			star_empty:Renderer.getSprite(
				'level_map_pixel_artpng/3 UI/Star2.png',
				0,0,24,25,0,0
			),
			circle1:Renderer.getSprite(
				'level_map_pixel_artpng/3 UI/circle1.png',
				0,0,38,38,0,0
			)
		},
		bg:Renderer.getSprite(
			'ui/0_bg.png',
			0,0,980,540,0,0
		),
		area:{
			areaA:Renderer.getSprite(
				'ui/map/A_map_bg_crop.png',
				89,94,710,445,0,0
			),
			areaB:Renderer.getSprite(
				'ui/map/B_map_bg_crop.png',
				89,94,710,445,0,0
			),
			areaC:Renderer.getSprite(
				'ui/map/C_map_bg_crop.png',
				89,94,710,445,0,0
			),
			areaD:Renderer.getSprite(
				'ui/map/D_map_bg_crop.png',
				89,94,710,445,0,0
			),
			areaE:Renderer.getSprite(
				'ui/map/E_map_bg_crop.png',
				89,94,710,445,0,0
			),
			areaF:Renderer.getSprite(
				'ui/map/F_map_bg_crop.png',
				89,94,710,445,0,0
			),
			areaG:Renderer.getSprite(
				'ui/map/G_map_bg_crop.png',
				89,94,710,445,0,0
			),
			areaH:Renderer.getSprite(
				'ui/map/H_map_bg_crop.png',
				89,94,710,445,0,0
			),
			areaI:Renderer.getSprite(
				'ui/map/I_map_bg_crop.png',
				89,94,710,445,0,0
			),
		},
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
		card_full:Renderer.getSprite(
			'quest_tcg_cards/PNG/Cards_color3/Civilian_card_version1/Civilian_card_version1.png',
			200,100,195,284,0,0
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
					392,0,90,90,600,0
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
		tenent:{
			bg:Renderer.getSprite(
				'ui/tenent.png',
				797,101,183,439,0,0
			),
			ribbon_shadow:Renderer.getSprite(
				'ui/tenent.png',
				797,101,183,439,183,0
			),
			ribbon:Renderer.getSprite(
				'ui/tenent.png',
				797,101,183,439,366,0
			),
			words:Renderer.getSprite(
				'ui/tenent.png',
				797,101,183,439,549,0
			),
			words_a:Renderer.getSprite(
				'ui/tenent.png',
				797,101+277,183,90,732,277
			),
			words_b:Renderer.getSprite(
				'ui/tenent.png',
				797,101+171,183,69,732,171
			),
			words_c:Renderer.getSprite(
				'ui/tenent.png',
				797,101+368,183,71,732,368
			),
			words_d:Renderer.getSprite(
				'ui/tenent.png',
				797,101+238,183,38,732,238
			),
			words_f:Renderer.getSprite(
				'ui/tenent.png',
				797,101+127,183,39,732,127
			),
			words_g:Renderer.getSprite(
				'ui/tenent.png',
				797,101+90,183,37,732,90
			),
			words_h:Renderer.getSprite(
				'ui/tenent.png',
				797,101+174,183,49,732,174
			),
			words_i:Renderer.getSprite(
				'ui/tenent.png',
				797,101+22,183,65,732,22
			),
		}
	};
	
	static #drawStats = (ctx,ch,x,y)=>{
		//draw HP bar
		ctx.fillStyle="red";//TODO:? draw the delimiters between each HP
		const amount = 91*ch.hp/ch.hp_max;
		ctx.fillRect(x+104,+23,amount,7);
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
		//TODO:175,60
		//draw attack value
		ctx.fillStyle="#000";
		ctx.fillText(ch.attack,x+175,y+64);
		
		ctx.fillStyle="#CCC";
		
	}
	
	static #abilitySelect = null;
	
	static render(G,ctx,context){//ctx here is canvas, not the G ctx
		Renderer.drawSprite(RenderMain.#sprites.bg,ctx);
		Renderer.drawSprite(RenderMain.#sprites.area[G.area],ctx);//read the town from the G data
		Renderer.drawSprite(RenderMain.#sprites.header,ctx);//TODO: read the town from the G data
		ctx.fillStyle = 'rgba(200,200,200,0.7)';
		for(const [name,ch] of Object.entries(G.characters)){
			const spritePortrait = RenderMain.#sprites.characters[name].portrait;
			Renderer.drawSprite(spritePortrait,ctx);
			const spriteStats = RenderMain.#sprites.characters[name].stats;
			Renderer.drawSprite(spriteStats,ctx);
			RenderMain.#drawStats(ctx,ch,spritePortrait.x,spritePortrait.y);
		}
		Renderer.drawSprite(RenderMain.#sprites.header_front,ctx);//TODO: read the town from the G data
		//draw tenents
		Renderer.drawSprite(RenderMain.#sprites.tenent.bg,ctx);
		Renderer.drawSprite(RenderMain.#sprites.tenent.ribbon_shadow,ctx);
		Renderer.drawSprite(RenderMain.#sprites.tenent.ribbon,ctx);
		Renderer.drawSprite(RenderMain.#sprites.tenent.words,ctx);
		if(G.quest_flags.lesson_A){
			Renderer.drawSprite(RenderMain.#sprites.tenent.words_a,ctx);
		}
		if(G.quest_flags.lesson_B){
			Renderer.drawSprite(RenderMain.#sprites.tenent.words_b,ctx);
		}
		if(G.quest_flags.lesson_C){
			Renderer.drawSprite(RenderMain.#sprites.tenent.words_c,ctx);
		}
		if(G.quest_flags.lesson_D){
			Renderer.drawSprite(RenderMain.#sprites.tenent.words_d,ctx);
		}
		if(G.quest_flags.lesson_F){
			Renderer.drawSprite(RenderMain.#sprites.tenent.words_f,ctx);
		}
		if(G.quest_flags.lesson_G){
			Renderer.drawSprite(RenderMain.#sprites.tenent.words_g,ctx);
		}
		if(G.quest_flags.lesson_H){
			Renderer.drawSprite(RenderMain.#sprites.tenent.words_h,ctx);
		}
		if(G.quest_flags.lesson_I){
			Renderer.drawSprite(RenderMain.#sprites.tenent.words_i,ctx);
		}
		
		
		let x=24;
		//TODO: descriptions for abilities
		//      or can generate on the fly
		ctx.strokeStyle = 'black';
		for(const a of G.abilities){
			const sprite = RenderMain.#sprites.card;
			sprite.x=x;
			Renderer.drawSprite(sprite,ctx);
			x+=49;
		}
		
		if(context.activePlayers){//in a sub-stage
			return;
		}
		
		if(RenderMain.#abilitySelect){//clicked on a card, show the card and wait for ch
			//bg cover
			ctx.fillStyle = 'rgba(200,200,200,0.7)';
			ctx.fillRect(0,100,Renderer.width,Renderer.height-100);
			//TODO: card image itself
			ctx.fillStyle = 'rgba(200,200,200,1)';
			ctx.fillRect(RenderMain.#sprites.card_full.x,
						RenderMain.#sprites.card_full.y,
						RenderMain.#sprites.card_full.width,
						RenderMain.#sprites.card_full.height);
			Renderer.drawSprite(RenderMain.#sprites.card_full,ctx);
			const desc = RenderMain.#abilitySelect.description;
			ctx.font = '8px monospace';

			ctx.fillStyle = '#000';
			ctx.fillText(desc,
				RenderMain.#sprites.card_full.x+30,
				RenderMain.#sprites.card_full.y+180);
			ctx.font = '12pt monospace';

			//render characters to use ability on
			ctx.strokeStyle = 'purple';
			for(const [name,ch] of Object.entries(G.characters)){
				const sprite = RenderMain.#sprites.characters[name].portrait;
				ctx.strokeRect(sprite.x,sprite.y,sprite.width,sprite.height);
				ctx.fillStyle = 'rgba(200,200,200,0.7)';
				ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
				if(Renderer.isMouseOver(sprite)){
					ctx.fillStyle = 'rgba(0,200,0,0.7)';
					ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
				}
			}			
			return;
		}
		const abilityHover = G.abilities;
		x=abilityHover.length*49-24;
		for(let i=abilityHover.length-1;i>=0;i-=1){
			const a = abilityHover[i];
			const sprite = RenderMain.#sprites.card;
			sprite.x=x;
			if(Renderer.isMouseOver(sprite)){
				//hover card rect
				ctx.fillStyle = 'rgba(200,200,200,0.7)';
				ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
				
				//bg for text rect
				ctx.fillStyle = 'rgba(200,200,200,1)';
				const metrics = ctx.measureText(a.description);
				ctx.fillRect(sprite.x,sprite.y-20,metrics.width+4,20);
				ctx.fillStyle = '#000';
				
				
				ctx.fillText(a.description,sprite.x+2,sprite.y-5);
				break;
			}
			x-=49;
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
		const basex = RenderMain.#sprites.area.areaA.x;
		const basey = RenderMain.#sprites.area.areaA.y;
		let townId = 1;
		for(const town of area.towns){
			const townSprite = RenderMain.#sprites.map.circle1;
			townSprite.x = basex+town.x-townSprite.width/2;
			townSprite.y = basey+town.y-townSprite.height/2;
			Renderer.drawSprite(townSprite,ctx);
			if(Renderer.isMouseOver(townSprite)){
				if(G.visitDone){
					ctx.strokeStyle = 'red';
				}
				ctx.strokeRect(townSprite.x,townSprite.y,townSprite.width,townSprite.height);
			};
			ctx.fillStyle = '#ccc';
			if(G.visitDone){
				ctx.fillStyle = '#888';
			}
			ctx.fillText(townId, townSprite.x+16, townSprite.y+22);
			townId+=1;
			townSprite.y-=16;
			const tempW = townSprite.width;
			const tempH = townSprite.height;
			const metrics = ctx.measureText(town.display);
			townSprite.width = metrics.width+4;
			townSprite.height = 20;
			ctx.fillRect(townSprite.x-townSprite.width/2+19,townSprite.y,townSprite.width,townSprite.height);
			ctx.fillStyle = '#000';
			ctx.fillText(town.display, townSprite.x-townSprite.width/2+21, townSprite.y+15);
			townSprite.width = tempW;
			townSprite.height = tempH
			
			const starA={x:0,y:0};
			const starB={x:23,y:8};
			const starC={x:46,y:0};
			const star_filled = RenderMain.#sprites.map.star_filled;
			const star_empty = RenderMain.#sprites.map.star_empty;
			const tw=townSprite.width;
			const th=-townSprite.height/2;
			if(town.starA!=STAR_NONE){
				if(G.quest_flags[town.starA]){
					star_filled.x = basex+town.x+starA.x-tw;
					star_filled.y = basey+town.y+starA.y-th;
					Renderer.drawSprite(star_filled,ctx);
				}else{
					star_empty.x = basex+town.x+starA.x-tw;
					star_empty.y = basey+town.y+starA.y-th;
					Renderer.drawSprite(star_empty,ctx);
				}
			}
			if(town.starB!=STAR_NONE){
				if(G.quest_flags[town.starB]){
					star_filled.x = basex+town.x+starB.x-tw;
					star_filled.y = basey+town.y+starB.y-th;
					Renderer.drawSprite(star_filled,ctx);
				}else{
					star_empty.x = basex+town.x+starB.x-tw;
					star_empty.y = basey+town.y+starB.y-th;
					Renderer.drawSprite(star_empty,ctx);
				}
			}
			if(town.starC!=STAR_NONE){
				if(G.quest_flags[town.starC]){
					star_filled.x = basex+town.x+starC.x-tw;
					star_filled.y = basey+town.y+starC.y-th;
					Renderer.drawSprite(star_filled,ctx);
				}else{
					star_empty.x = basex+town.x+starC.x-tw;
					star_empty.y = basey+town.y+starC.y-th;
					Renderer.drawSprite(star_empty,ctx);
				}
			}
		}
		for(const neighbour of area.neighbours){
			const neighbourSprite = Renderer.getSprite(
				'./img.png',
				neighbour.x,neighbour.y,132,32,
				0,0);
			ctx.fillStyle = '#b1d0ff';
			ctx.fillRect(neighbourSprite.x,neighbourSprite.y,neighbourSprite.width,neighbourSprite.height);
			ctx.fillStyle = '#000';
			ctx.fillText("travel: "+neighbour.display, neighbourSprite.x+3, neighbourSprite.y+20);
			if(Renderer.isMouseOver(neighbourSprite)){
				ctx.strokeRect(neighbourSprite.x,neighbourSprite.y,neighbourSprite.width,neighbourSprite.height);
			}
		}
		const endSprite = Renderer.getSprite(
				'./img.png',
				0,332,132,32,
				0,0);
		ctx.fillStyle = '#ccc';
		ctx.fillRect(endSprite.x,endSprite.y,endSprite.width,endSprite.height);
		ctx.fillStyle = '#000';
		ctx.fillText("end turn ", endSprite.x, endSprite.y+16);
		if(Renderer.isMouseOver(endSprite)){
			ctx.strokeRect(endSprite.x,endSprite.y,endSprite.width,endSprite.height);
		}
		
	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		//main click is going to happen always, need to filter out other states
		//TODO: here call click() for abilities, since they can happen any time
		if(ctx.activePlayers){//in a sub-stage, don't fire off clicks on map
			return;
		}
		//ability tigger
		if(RenderMain.#abilitySelect){//clicked on a card, show the card and wait for ch
			//select character and commit action
			for(const [name,ch] of Object.entries(G.characters)){
				const sprite = RenderMain.#sprites.characters[name].portrait;
				if(Renderer.isMouseOver(sprite)){
					client.moves.doAbility(RenderMain.#abilitySelect,name);
					RenderMain.#abilitySelect=null;
					return;
				}
			}
			return;
		}
		const abilityHover = G.abilities;
		let x=abilityHover.length*49-24;
		for(let i=abilityHover.length-1;i>=0;i-=1){
			const a = abilityHover[i];
			const sprite = RenderMain.#sprites.card;
			sprite.x=x;
			if(Renderer.isMouseOver(sprite)){
				RenderMain.#abilitySelect = a;
				return;
			}
			x-=49;
		}
		//visit/travel options:
		const areaName = G.area;
		const area = AreaData[areaName];
		const basex = RenderMain.#sprites.area.areaA.x;
		const basey = RenderMain.#sprites.area.areaA.y;
		for(const town of area.towns){
			const townSprite = RenderMain.#sprites.map.circle1;
			townSprite.x = basex+town.x-townSprite.width/2;
			townSprite.y = basey+town.y-townSprite.height/2;
			if(Renderer.isMouseOver(townSprite)&&!G.visitDone){
				client.moves.selectVisitTown(town.name);
				return;
			}
		}
		for(const neighbour of area.neighbours){
			const neighbourSprite = Renderer.getSprite(
				'./img.png',
				neighbour.x,neighbour.y,132,32,
				0,0);
			if(Renderer.isMouseOver(neighbourSprite)){
				client.moves.selectTravelArea(neighbour.name);
				return;
			}
		}
		
		const endSprite = Renderer.getSprite(
				'./img.png',
				0,332,132,32,
				0,0);
		if(Renderer.isMouseOver(endSprite)){
				client.moves.endTurn();
		}
	}
}

export {RenderMain};
