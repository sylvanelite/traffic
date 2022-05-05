
import { Renderer } from "./renderer.js";
import { RenderVisit } from "./renderer-visit.js";
import { Script } from "../Script.js";
import { ScriptData } from "../data/ScriptData.js";


class RenderPhase{
	static #preload = [
	'ui/0_bg.png',
	'ui/2_visit_bg.png',
	'ui/3_visit_window_crop.png',
	'ui/4_battle_overlay.png',
	'ui/5_header_crop.png',
	'ui/5_header_front_crop.png',
	'ui/6_stats_crop.png',
	'ui/7_card_deck_draw.png',
	'ui/7_cards_crop.png',
	'ui/assign_cutout.png',
	'ui/cbt_bg.png',
	'ui/seat_effect_overlay.png',
	'ui/seat_effect.png',
	'ui/splash_tutorial.png',
	'ui/ui_symbols.png',
	'ui/visit_btn_blank.png',
	'ui/visit_btn_choice.png',
	'ui/visit_btn_continue.png',
	'ui/visit_btn_ok.png',
	'ui/map/A_map_bg_crop.png',
	'ui/map/B_map_bg_crop.png',
	'ui/map/C_map_bg_crop.png',
	'ui/map/D_map_bg_crop.png',
	'ui/map/E_map_bg_crop.png',
	'ui/map/F_map_bg_crop.png',
	'ui/map/G_map_bg_crop.png',
	'ui/map/H_map_bg_crop.png',
	'ui/map/I_map_bg_crop.png',
	'ui/battle/parallax_crystals.png',
	'ui/battle/parallax_rocks.png',
	'ui/battle/bg.png',
	'ui/battle/parallax_trees1.png',
	'ui/battle/parallax_trees2.png',
	'ui/battle/parallax_trees3.png',
	'ui/battle/parallax_trees4.png',
	'ui/battle/ui_layer.png',
	'characters/characters_512.png',
	'level_map_pixel_artpng/3 UI/Star1.png',
	'level_map_pixel_artpng/3 UI/Star2.png',
	'level_map_pixel_artpng/3 UI/circle1.png',
	'quest_tcg_cards/PNG/Cards_color3/Civilian_card_version1/Civilian_card_version1.png',
	//does not include mobs
	];
	
	static #sprites = {
		splash:Renderer.getSprite(
			'ui/splash.png',
			0,0,980,540,0,0
		),
		tutorial:Renderer.getSprite(
			'ui/splash_tutorial.png',
			0,0,980,540,0,0
		),
		ok_splash:Renderer.getSprite(
		'./img.png',
		320,400,320,80,
		0,0),
		ok_tutorial:Renderer.getSprite(
		'./img.png',
		750,350,100,100,
		0,0),
	};
	
	static #numberToLoad=RenderPhase.#preload.length;
	static preload=()=>{
		const getBatch = ()=>{
			const res = [];
			const batchSize=4;
			for(let i=0;i<batchSize;i+=1){
				if(!RenderPhase.#preload.length){
					break;
				}
				res.push(RenderPhase.#preload.pop());
			}
			return res;
		};
		
		const batchLoaded = ()=>{
			if(RenderPhase.#preload.length){
				load();
			}
		};
		const load=()=>{
			const batch = getBatch();
			Renderer.preload(batch,batchLoaded);
		};
		load();
	};
	
	static render(G,ctx,data){//ctx here is canvas, not the G ctx
		ctx.strokeStyle = 'orange';
		ctx.fillStyle = '#000';
		if(data.phase == "loading"){
			Renderer.drawSprite(RenderPhase.#sprites.splash,ctx);
			const spriteOk = RenderPhase.#sprites.ok_splash;
			ctx.strokeRect(spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height);
			const loadingAmount = ("loading: "+
			Math.floor(100*((RenderPhase.#numberToLoad-RenderPhase.#preload.length)/RenderPhase.#numberToLoad))+"% ("+
			(RenderPhase.#numberToLoad-RenderPhase.#preload.length)+"/"+RenderPhase.#numberToLoad+")");
			ctx.fillText(loadingAmount, spriteOk.x+50, spriteOk.y-30);
			
			if(Renderer.isMouseOver(spriteOk)){
				ctx.fillStyle = 'rgba(200,200,200,0.7)';
				ctx.fillRect(spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height);
			}
		}
		if(data.phase == "tutorial"){
			if(Script.isRunning()){
				RenderVisit.render(G,ctx,data);
				return;
			}
			Renderer.drawSprite(RenderPhase.#sprites.tutorial,ctx);
			const spriteOk = RenderPhase.#sprites.ok_tutorial;
			ctx.strokeRect(spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height);
			ctx.fillText("ok", spriteOk.x+40, spriteOk.y+50);
			if(Renderer.isMouseOver(spriteOk)){
				ctx.fillStyle = 'rgba(200,200,200,0.7)';
				ctx.fillRect(spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height);
			}
		}

	}
	static click(client,G,ctx){//ctx is the G ctx here
		if(ctx.phase == "loading"){
			const spriteOk = RenderPhase.#sprites.ok_splash;
			if(Renderer.isMouseOver(spriteOk)){
				client.moves.endPhase();
				Script.start(G,ScriptData.tutorial);
			}
			
		}
		if(ctx.phase == "tutorial"){
			if(Script.isRunning()){
				RenderVisit.click(client,G,ctx);
				return;
			}
			const spriteOk = RenderPhase.#sprites.ok_tutorial;
			if(Renderer.isMouseOver(spriteOk)){
				client.moves.endPhase();
			}
		}
	}
};

export {RenderPhase};
