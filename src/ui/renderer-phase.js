
import { Renderer } from "./renderer.js";
import { RenderVisit } from "./renderer-visit.js";
import { Script } from "../Script.js";
import { ScriptData } from "../data/ScriptData.js";
import { UI } from "./ui.js";
import { Audio } from  "../audio/audio.js";


class RenderPhase{
	static #preload = [
	//'ui/splash.png',
	//'ui/splah_8bit_animated.png',
	'ui/0_bg.png',
	'ui/2_visit_bg.png',
	'ui/3_visit_window_crop.png',
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
	'ui/cbt_stat_usage.png',
	'ui/tenent.png',
	//does not include mobs
	];
	
	static #sprites = {
		splash:Renderer.getSprite(
			'ui/splah_8bit_animated.png',
			0,0,245,135,0,0
		),
		splash_logo_a:Renderer.getSprite(
			'ui/splah_8bit_animated.png',
			0,0,245,135,245,0
		),
		splash_logo_b:Renderer.getSprite(
			'ui/splah_8bit_animated.png',
			0,0,245,135,490,0
		),
		splash_logo_c:Renderer.getSprite(
			'ui/splah_8bit_animated.png',
			0,0,245,135,735,0
		),
		tutorial:Renderer.getSprite(
			'ui/splash_tutorial.png',
			0,0,980,540,0,0
		),
		ok_splash:Renderer.getSprite(
		'./img.png',
		335,430,270,45,
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
	
	static #logoY=0;
	static #logoYdir = 1;
	static render(G,ctx,data){//ctx here is canvas, not the G ctx
	ctx.imageSmoothingEnabled=false;
		ctx.fillStyle = '#000';
		if(data.phase == "loading"){
			Renderer.drawSpriteScaled(RenderPhase.#sprites.splash,Renderer.width,Renderer.height,ctx);
			let logo = RenderPhase.#sprites.splash_logo_a;
			if(RenderPhase.#logoY>7){
				logo = RenderPhase.#sprites.splash_logo_b;
			}
			if(RenderPhase.#logoY>14){
				logo = RenderPhase.#sprites.splash_logo_c;
			}
			logo.y=RenderPhase.#logoY;
			
			const lerp = (start, end, t)=> {
				return start * (1 - t) + end * t;
			};
			if(RenderPhase.#logoYdir>0){
			RenderPhase.#logoY=lerp(RenderPhase.#logoY,30,0.01);
			}else{
			RenderPhase.#logoY=lerp(RenderPhase.#logoY,-5,0.01);
			}
			if(RenderPhase.#logoY>20){
				RenderPhase.#logoYdir=-1;
			}
			if(RenderPhase.#logoY<=0){
				RenderPhase.#logoYdir=1;
			}
			Renderer.drawSpriteScaled(logo,Renderer.width,Renderer.height,ctx);
			const spriteOk = RenderPhase.#sprites.ok_splash;
			const loadingAmount = ("loading: "+
			Math.floor(100*((RenderPhase.#numberToLoad-RenderPhase.#preload.length)/RenderPhase.#numberToLoad))+"% ("+
			(RenderPhase.#numberToLoad-RenderPhase.#preload.length)+"/"+RenderPhase.#numberToLoad+")");
			ctx.fillText(loadingAmount, spriteOk.x+50, spriteOk.y-10);
			
			if(Renderer.isMouseOver(spriteOk)){
				ctx.fillStyle = 'rgba(255,255,255,0.7)';
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
			UI.drawClickableRect(ctx,UI.EFFECT.OK_BUTTON,
				spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height,
				true,false);
			UI.drawBitmapText(ctx,"ok:", spriteOk.x+50, spriteOk.y+50,UI.FONT.OK);
		}

	}
	static click(client,G,ctx){//ctx is the G ctx here
		if(ctx.phase == "loading"){
			const spriteOk = RenderPhase.#sprites.ok_splash;
			if(Renderer.isMouseOver(spriteOk)){
				Audio.StartBGM();
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
