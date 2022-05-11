
import { Renderer } from "./renderer.js";
import { AreaData,STAR_NONE } from "../data/AreaData.js"; 
import { UI } from "./ui.js";
import { Audio } from "../audio/audio.js";
import { SFX } from "../data/AudioData.js";

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
	
	static #drawStats(ctx,ch,x,y){
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
		//draw attack value
		UI.drawBitmapText(ctx,ch.attack,x+175,y+64,UI.FONT.STAT_ATTACK);
		ctx.fillStyle="#CCC";
		
	}
	
	static #drawBG(G,ctx,context){
		
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
		
		
		
	}
	
	static #carPositions=0;
	static #drawCars(G,ctx,context){
		const cars = [
			{name:"ambulance.png" ,x:"59" ,y:"24" ,width:"38" ,height:"21"},
			{name:"buggy.png" ,x:"154" ,y:"160" ,width:"23" ,height:"14"},
			{name:"bus.png" ,x:"0" ,y:"113" ,width:"45" ,height:"21"},
			{name:"bus_school.png" ,x:"0" ,y:"92" ,width:"46" ,height:"21"},
			{name:"convertible.png" ,x:"122" ,y:"97" ,width:"32" ,height:"13"},
			{name:"cycle.png" ,x:"103" ,y:"12" ,width:"16" ,height:"10"},
			{name:"cycle_low.png" ,x:"66" ,y:"175" ,width:"16" ,height:"8"},
			{name:"firetruck.png" ,x:"44" ,y:"154" ,width:"44" ,height:"21"},
			{name:"formula.png" ,x:"97" ,y:"22" ,width:"33" ,height:"9"},
			{name:"hotdog.png" ,x:"47" ,y:"72" ,width:"40" ,height:"29"},
			{name:"kart.png" ,x:"44" ,y:"175" ,width:"22" ,height:"8"},
			{name:"police.png" ,x:"88" ,y:"147" ,width:"33" ,height:"14"},
			{name:"riot.png" ,x:"45" ,y:"113" ,width:"40" ,height:"21"},
			{name:"rounded_green.png" ,x:"122" ,y:"42" ,width:"32" ,height:"13"},
			{name:"rounded_red.png" ,x:"122" ,y:"110" ,width:"31" ,height:"12"},
			{name:"rounded_yellow.png" ,x:"118" ,y:"134" ,width:"33" ,height:"11"},
			{name:"scooter.png" ,x:"121" ,y:"174" ,width:"15" ,height:"9"},
			{name:"sedan.png" ,x:"130" ,y:"28" ,width:"29" ,height:"13"},
			{name:"sedan_blue.png" ,x:"153" ,y:"70" ,width:"29" ,height:"13"},
			{name:"sedan_vintage.png" ,x:"82" ,y:"134" ,width:"36" ,height:"13"},
			{name:"sports_convertible.png" ,x:"119" ,y:"122" ,width:"33" ,height:"11"},
			{name:"sports_green.png" ,x:"122" ,y:"70" ,width:"29" ,height:"11"},
			{name:"sports_race.png" ,x:"85" ,y:"122" ,width:"34" ,height:"12"},
			{name:"sports_red.png" ,x:"103" ,y:"0" ,width:"33" ,height:"12"},
			{name:"sports_yellow.png" ,x:"97" ,y:"31" ,width:"33" ,height:"11"},
			{name:"station.png" ,x:"87" ,y:"81" ,width:"34" ,height:"13"},
			{name:"suv.png" ,x:"122" ,y:"55" ,width:"31" ,height:"15"},
			{name:"suv_closed.png" ,x:"154" ,y:"83" ,width:"28" ,height:"15"},
			{name:"suv_green.png" ,x:"153" ,y:"55" ,width:"30" ,height:"15"},
			{name:"suv_large.png" ,x:"121" ,y:"159" ,width:"33" ,height:"15"},
			{name:"suv_military.png" ,x:"154" ,y:"98" ,width:"28" ,height:"14"},
			{name:"suv_travel.png" ,x:"121" ,y:"81" ,width:"32" ,height:"16"},
			{name:"taxi.png" ,x:"121" ,y:"145" ,width:"33" ,height:"14"},
			{name:"towtruck.png" ,x:"0" ,y:"134" ,width:"45" ,height:"20"},
			{name:"tractor.png" ,x:"154" ,y:"142" ,width:"24" ,height:"18"},
			{name:"transport.png" ,x:"87" ,y:"64" ,width:"35" ,height:"17"},
			{name:"truck.png" ,x:"0" ,y:"24" ,width:"59" ,height:"24"},
			{name:"truck_trailer.png" ,x:"0" ,y:"48" ,width:"48" ,height:"24"},
			{name:"truckcabin.png" ,x:"48" ,y:"48" ,width:"39" ,height:"24"},
			{name:"truckcabin_vintage.png" ,x:"152" ,y:"122" ,width:"30" ,height:"20"},
			{name:"truckdark.png" ,x:"85" ,y:"101" ,width:"37" ,height:"21"},
			{name:"truckdelivery.png" ,x:"0" ,y:"154" ,width:"44" ,height:"24"},
			{name:"trucktank.png" ,x:"0" ,y:"0" ,width:"65" ,height:"24"},
			{name:"trucktank_trailer.png" ,x:"0" ,y:"72" ,width:"47" ,height:"20"},
			{name:"van.png" ,x:"88" ,y:"161" ,width:"33" ,height:"17"},
			{name:"van_flat.png" ,x:"45" ,y:"134" ,width:"37" ,height:"17"},
			{name:"van_large.png" ,x:"87" ,y:"45" ,width:"35" ,height:"19"},
			{name:"van_small.png" ,x:"130" ,y:"12" ,width:"31" ,height:"16"},
			{name:"vendor.png" ,x:"65" ,y:"0" ,width:"38" ,height:"22"},
			{name:"vintage.png" ,x:"46" ,y:"101" ,width:"36" ,height:"12"}];
	
		const carSrc = 'pixelcarpack_kenney/Spritesheet/spritesheet_cars.png';
		
		const areaName = G.area;
		const area = AreaData[areaName];
		if(!area.roads){
			return;
		}
		const roads = area.roads;
		//"carPositions" is a number modulo 100
		//used to calculate how far along the path cars should be
		//e.g. 0=start position, 50=end, 100=start
		RenderMain.#carPositions+=0.2;
		RenderMain.#carPositions=RenderMain.#carPositions%100;
		const carsToDraw = [];
		let carId=0;
		for(const road of roads){
			//generate sprites with an offset
			carsToDraw.push(Renderer.getSprite(carSrc,
			0,0,cars[carId].width,cars[carId].height,cars[carId].x,cars[carId].y));
			carId+=1;
			carsToDraw.push(Renderer.getSprite(carSrc,
			20,0,cars[carId].width,cars[carId].height,cars[carId].x,cars[carId].y));
			carId+=1;
			carsToDraw.push(Renderer.getSprite(carSrc,
			30,0,cars[carId].width,cars[carId].height,cars[carId].x,cars[carId].y));
			carId+=1;
			carsToDraw.push(Renderer.getSprite(carSrc,
			80,0,cars[carId].width,cars[carId].height,cars[carId].x,cars[carId].y));
			carId+=1;
		}
		const numCarsPerRoad = 4;//should correspond with the num of car sprites inserted above;
		let i=0;
		for(const road of roads){
			const spacing = road.right-road.left;
			for(let j=0;j<numCarsPerRoad;j+=1){
				const car = carsToDraw[i+j];
				car.y=road.y+48;
				//update the sprite's to be a value between 0->100 
				//for it's position around the track
				car.x +=RenderMain.#carPositions
				car.x = car.x%100;
				//convert 0->100 to X position
				let isFlipped = false;
				if(car.x<45){//heading to the right
					car.x=road.left+spacing*(car.x/50);
				}else{//heading back to the left
					isFlipped=true;
					car.x=road.right-spacing*((car.x-50)/50);
					car.y+=16;
				}
				car.x+=96;
				//simulate bumps on the road
				if(Math.floor(car.x/20)%3==0){
					car.y+=2;
				}
				
				if(isFlipped){
					car.x *= -1;
					ctx.save();
					ctx.scale(-1, 1);
					Renderer.drawSprite(car,ctx);
					ctx.restore();
				}else{
					Renderer.drawSprite(car,ctx);
				}
			}
			i+=numCarsPerRoad;
		}
	}
	
	static #drawCards(G,ctx,context){
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
	}
	static #drawAbilities(G,ctx,context){
		if(RenderMain.#abilitySelect){//clicked on a card, show the card and wait for ch
			//bg cover
			ctx.fillStyle = 'rgba(200,200,200,0.7)';
			ctx.fillRect(0,100,Renderer.width,Renderer.height-100);
			//card image itself
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
				const canuse = (ch.ability_points<RenderMain.#abilitySelect.cost);
				UI.drawClickableRect(ctx,UI.EFFECT.CHARACTER_ABILITY,
					sprite.x,sprite.y,sprite.width,sprite.height,
					true,canuse);
					
			}			
		}
		const abilityHover = G.abilities;
		let x=abilityHover.length*49-24;
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
				const metrics = UI.getBitmapTextDimensions(ctx,a.description,UI.FONT.ABILITY_DESC);
				ctx.fillRect(sprite.x,sprite.y-20,metrics.width+4,20);
				UI.drawBitmapText(ctx,a.description,sprite.x+2,sprite.y-5,UI.FONT.ABILITY_DESC);
				break;
			}
			x-=49;
		}
	}
	static #drawVisit(G,ctx,context){
		
		//visit/travel options:
		//could be loaded statically, move to top once all towns/areas have been finalised
		const areaName = G.area;
		const area = AreaData[areaName];
		const areaSprite = Renderer.getSprite(
			'./img.png',
			Math.floor(Renderer.width/2),120,132,32,
			0,0);
		const basex = RenderMain.#sprites.area.areaA.x;
		const basey = RenderMain.#sprites.area.areaA.y;
		let townId = 1;
		for(const town of area.towns){
			const townSprite = RenderMain.#sprites.map.circle1;
			townSprite.x = basex+town.x-townSprite.width/2;
			townSprite.y = basey+town.y-townSprite.height/2;
			Renderer.drawSprite(townSprite,ctx);
			UI.drawClickableRect(ctx,UI.EFFECT.TOWN_LOGO,
				townSprite.x,townSprite.y,townSprite.width,townSprite.height,
				true,G.visitDone);
			UI.drawBitmapText(ctx,townId, townSprite.x+16, townSprite.y+22,UI.FONT.TOWN_LOGO);
			townId+=1;
			townSprite.y-=20;
			const tempW = townSprite.width;
			const tempH = townSprite.height;
			const metrics = UI.getBitmapTextDimensions(ctx,town.display,UI.FONT.TOWN_LABEL);
			townSprite.width = metrics.width+4;
			townSprite.height = 20;
			UI.drawClickableRect(ctx,UI.EFFECT.TOWN_LABEL,
				townSprite.x-townSprite.width/4,townSprite.y,townSprite.width+4,townSprite.height,
				true,G.visitDone);
			UI.drawBitmapText(ctx,town.display, townSprite.x+4-townSprite.width/4, townSprite.y+15,UI.FONT.TOWN_LABEL);
			
			townSprite.width = tempW;
			townSprite.height = tempH;
			
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
	}
	
	static #drawTravel(G,ctx,context){
		const areaName = G.area;
		const area = AreaData[areaName];
		for(const neighbour of area.neighbours){
			const neighbourSprite = Renderer.getSprite(
				'./img.png',
				neighbour.x,neighbour.y,132,32,
				0,0);
			UI.drawClickableRect(ctx,UI.EFFECT.NEIGHBOUR,
				neighbourSprite.x,neighbourSprite.y,neighbourSprite.width,neighbourSprite.height,
				true,false);
			UI.drawBitmapText(ctx,"travel: "+neighbour.display,  neighbourSprite.x+3, neighbourSprite.y+20,UI.FONT.NEIGHBOUR);
		}
		
	}
	static #abilitySelect = null;
	
	static render(G,ctx,context){//ctx here is canvas, not the G ctx
		RenderMain.#drawBG(G,ctx,context);
		RenderMain.#drawCars(G,ctx,context);
		RenderMain.#drawCards(G,ctx,context);
		
		if(context.activePlayers){//in a sub-stage
			return;
		}
		RenderMain.#drawAbilities(G,ctx,context);
		if(RenderMain.#abilitySelect){	
			return;
		}
		RenderMain.#drawVisit(G,ctx,context);
		RenderMain.#drawTravel(G,ctx,context);
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
					Audio.PlaySFX(SFX.click);
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
				Audio.PlaySFX(SFX.click);
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
				Audio.PlaySFX(SFX.menu1a);
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
				Audio.PlaySFX(SFX.menu1a);
				client.moves.selectTravelArea(neighbour.name);
				return;
			}
		}
		
		const endSprite = Renderer.getSprite(
				'./img.png',
				0,332,132,32,
				0,0);
		if(Renderer.isMouseOver(endSprite)){
				Audio.PlaySFX(SFX.menu1b);
				client.moves.endTurn();
		}
	}
}

export {RenderMain};
