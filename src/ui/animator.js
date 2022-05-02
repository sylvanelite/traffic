
import { Renderer } from './renderer.js';
import { RenderSeatEffect } from './renderer-seatEffect.js';
import { RenderMain } from './renderer-main.js';
import {RenderAssignCharacter} from './renderer-assignCharacter.js';
import {RenderCombat} from './renderer-combat.js';
import {MobSprites} from '../data/MobSprites.js';

const ANIMATION_KIND = {
	SHOW_SEAT_EFFECT:'SHOW_SEAT_EFFECT',
	DRAW_CARD:'DRAW_CARD',
	ACTION_EFFECT:'ACTION_EFFECT',
	ATTACK:'ATTACK',
	DIE_ROLL:'DIE_ROLL'
};

//class that handles rendering animations
//animations must have a well-defied start/stop criteria and do not change any game state
class Animator{
	static #animations = [];
	
	static isRunning(){
		return  Animator.#animations.length > 0;
	}
	
	//TODO: should this be to skip all of them, or just the top one that's playing?
	static skipAnimations(){
		Animator.#animations = [];
	}
	
	static addAnimation(kind,data){
		const animation = {
			kind,
			data,
			initialDuration:33,
			duration: 33//bit over 1/2 a second @ 60FPS//TODO: actual data @ fixed frame rate
		};
		if(animation.kind==ANIMATION_KIND.DRAW_CARD){
			animation.duration=100;
			animation.initialDuration=100;
		}
		if(animation.kind==ANIMATION_KIND.DIE_ROLL){
			animation.duration=200;
			animation.initialDuration=200;
		}
		Animator.#animations.push(animation);
	}
	
	static #screenTileWipe(animation,resultCtx,effectCanv,donePercent){
		const tileCount = 10;
		const tileW = Renderer.width/tileCount;
		for(let i=0;i<tileCount;i+=1){
			resultCtx.drawImage(effectCanv,
				i*tileW, 0,tileW*donePercent,Renderer.height,
				i*tileW, 0,tileW*donePercent,Renderer.height);
		}
	}
	
	static #drawCardAnimation(animation,ctx){
		const x=200;
		const y=50;
		const draw = [
		Renderer.getSprite(
				'ui/7_card_deck_draw.png',
				x,y,350,482,
				0,0
			),Renderer.getSprite(
				'ui/7_card_deck_draw.png',
				x,y,350,482,
				350,0
			),Renderer.getSprite(
				'ui/7_card_deck_draw.png',
				x,y,350,482,
				700,0
			),Renderer.getSprite(
				'ui/7_card_deck_draw.png',
				x,y,350,482,
				1050,0
			),Renderer.getSprite(
				'ui/7_card_deck_draw.png',
				x,y,350,482,
				1400,0
			)
		];
		const donePercent = .999-animation.duration/animation.initialDuration;
		Renderer.drawSprite(draw[Math.floor(draw.length*donePercent)],ctx);
		
	}
	
	static #diceRoll(animation,ctx){
		const startY=-68;
		const endY=600;
		const x=100;
		const dice = [
		Renderer.getSprite(
				'boardgamepack/PNG/Dice/dieWhite_border1.png',
				x,startY,68,68,
				0,0
			),Renderer.getSprite(
				'boardgamepack/PNG/Dice/dieWhite_border2.png',
				x+70,startY,68,68,
				0,0
			),Renderer.getSprite(
				'boardgamepack/PNG/Dice/dieWhite_border3.png',
				x+140,startY,68,68,
				0,0
			),Renderer.getSprite(
				'boardgamepack/PNG/Dice/dieWhite_border4.png',
				x+210,startY,68,68,
				0,0
			),Renderer.getSprite(
				'boardgamepack/PNG/Dice/dieWhite_border5.png',
				x+280,startY,68,68,
				0,0
			),Renderer.getSprite(
				'boardgamepack/PNG/Dice/dieWhite_border6.png',
				x+350,startY,68,68,
				0,0
			)
		];
		const lerp = (start, end, t)=> {
			return start * (1 - t) + end * t;
		};
		const donePercent = 1-animation.duration/animation.initialDuration;
		for(let i=0;i<dice.length;i+=1){
			const die = dice[i];
			die.y=lerp(startY,endY,donePercent);
			if(i==animation.data.amount){
				die.y=lerp(startY,endY,Math.min(0.5,donePercent));
			}
			Renderer.drawSprite(die,ctx);
		}
	}
	
	static #combat(G,animation,ctx,data){
		
/*

animation.data={
	character:ch,
	damage:dmg,
	mob,fatigue,sanity
}
attack:

wipe in

draw BG---
draw parallax layers:1-6---todo:scrolling
draw UI---
draw ch portrait--
draw HP bar--
draw damage--
draw ch sprite--no
draw enemy sprite--TODO: assign based on data
draw enemy damage effect, wait & drop HP bar
draw player damage, wait & drop HP bar

wipe out

*/
		
		const sprites = {
			bg:Renderer.getSprite(
				'ui/battle/bg.png',
				0,0,980,540,0,0
			),
			parallax:[
				Renderer.getSprite(
					'ui/battle/parallax_crystals.png',
					0,0,480,288,0,0
				),
				Renderer.getSprite(
					'ui/battle/parallax_rocks.png',
					0,0,480,288,0,0
				),
				Renderer.getSprite(
					'ui/battle/parallax_trees1.png',
					0,0,480,288,0,0
				),
				Renderer.getSprite(
					'ui/battle/parallax_trees2.png',
					0,0,480,288,0,0
				),
				Renderer.getSprite(
					'ui/battle/parallax_trees3.png',
					0,0,480,288,0,0
				),
				Renderer.getSprite(
					'ui/battle/parallax_trees4.png',
					0,0,480,288,0,0
				),
			],
			ui:Renderer.getSprite(
				'ui/battle/ui_layer.png',
				0,0,980,540,0,0
			),
			characters:{
				a:{
					portrait:Renderer.getSprite(
						'characters/characters_512.png',
						110,292,90,90,60,16
					),
				},
				b:{
					portrait:Renderer.getSprite(
						'characters/characters_512.png',
						110,292,90,90,320,10
					),
				},
				c:{
					portrait:Renderer.getSprite(
						'characters/characters_512.png',
						110,292,90,90,600,0
					),
				},
				d:{
					portrait:Renderer.getSprite(
						'characters/characters_512.png',
						110,292,90,90,830,0
					),
				},
				e:{
					portrait:Renderer.getSprite(
						'characters/characters_512.png',
						110,292,90,90,1360,0
					),
				}
			},
			attack:
				[
				Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion1.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion2.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion3.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion4.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion5.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion6.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion7.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion8.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion9.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Circle_explosion/Circle_explosion10.png',
					550,150,256,256,0,0
				)
			]
		};


		const stage_wipe_in=1;
		const stage_attack=2;
		const stage_take_dmg=3;
		const stage_counterattack=4;
		const stage_take_counter_dmg=5;
		const stage_wipe_out=6;
		if(!animation.hasOwnProperty("stage")){
			//custom init data for combat animation
			animation.stage = stage_wipe_in;
			animation.duration=33;
			animation.initialDuration=33;
		}
		const renderCombat = (animation,ctx)=>{
			const donePercent = 1-animation.duration/animation.initialDuration;
			Renderer.drawSprite(sprites.bg,ctx);
			let parallaxSpeed=sprites.parallax.length;
			//TODO: parallax scrolling
			//left
			for(const parallax of sprites.parallax){
				Renderer.drawSprite(parallax,ctx);
			}
			//right
			for(const parallax of sprites.parallax){
				const tempx=parallax.x;
				parallax.x=480;
				Renderer.drawSprite(parallax,ctx);
				parallax.x=tempx;
			}
			//ui
			Renderer.drawSprite(sprites.ui,ctx);
			//ch sprite: TODO
			
			//enemy sprite TODO: bobbing motion?
			const mobSprite = MobSprites[12]//TODO; mob sprite
			const enemySprite = Renderer.getSprite(
				'aekashics_librarium/'+mobSprite.name,
				701-mobSprite.width/4,360-mobSprite.height/2,mobSprite.width,mobSprite.height,0,0
			);
			Renderer.drawSpriteScaled(enemySprite,mobSprite.height/2,mobSprite.width/2,ctx);
			//character portrait
			Renderer.drawSprite(sprites.characters[animation.data.character].portrait,ctx);//damage
			//character HP
			const ch = G.characters[animation.data.character];
			ctx.fillStyle="yellow";//draw damage behind
			ctx.fillRect(114,400,204*(ch.hp+animation.data.counterDmg)/ch.hp_max,17);
			ctx.fillRect(629,400,204*(animation.data.mob.hp+animation.data.damage)/animation.data.mob.hp_max,17);
			ctx.fillStyle="red";//TODO:? draw the delimiters between each HP
			ctx.fillRect(114,400,204*ch.hp/ch.hp_max,17);
			//enemy HP
			ctx.fillRect(629,400,204*animation.data.mob.hp/animation.data.mob.hp_max,17);
		};
		const wipeIn = ()=>{
			const canv = document.createElement("canvas");
			canv.width = Renderer.width;
			canv.height = Renderer.height;
			const context=canv.getContext('2d');
			//draw screen to be wiped
			RenderMain.render(G,ctx,data);
			RenderCombat.render(G,ctx);
			//draw screen to show
			renderCombat(animation,context);
			const donePercent = 1-animation.duration/animation.initialDuration;
			Animator.#screenTileWipe(animation,ctx,canv,donePercent);
			if(animation.duration<=1){//next stage
				animation.duration=100;
				animation.initialDuration=100;
				animation.stage=stage_attack;
				console.log("next stage");
			}
		};
		const attack = ()=>{
			renderCombat(animation,ctx);
			//render effect
			const donePercent = 0.99-animation.duration/animation.initialDuration;
			const attack = sprites.attack[Math.floor(sprites.attack.length*donePercent)];
			Renderer.drawSprite(attack,ctx);
			
			if(animation.duration<=1){//next stage
				animation.duration=100;
				animation.initialDuration=100;
				animation.stage=stage_take_dmg;
			}
		};
		const dmg = ()=>{
			renderCombat(animation,ctx);
			if(animation.duration<=1){//next stage
				if(animation.counterDmg>0){
					animation.duration=100;
					animation.initialDuration=100;
					animation.stage=stage_counterattack;
				}else{
					animation.duration=33;
					animation.initialDuration=33;
					animation.stage=stage_wipe_out;
				}
			}
		};
		const wipeOut = ()=>{
			const canv = document.createElement("canvas");
			canv.width = Renderer.width;
			canv.height = Renderer.height;
			const context=canv.getContext('2d');
			//draw screen to be wiped
			renderCombat(animation,ctx);
			//draw screen to show
			RenderMain.render(G,context,data);
			RenderCombat.render(G,context);
			const donePercent = 1-animation.duration/animation.initialDuration;
			Animator.#screenTileWipe(animation,ctx,canv,donePercent);
		};
		switch(animation.stage){
			case stage_wipe_in:
				wipeIn();
				break;
			case stage_attack:
				attack();
				break;
			case stage_take_dmg:
				dmg();
				break;
			case stage_counterattack:
				break;
			case stage_take_counter_dmg:
				break;
			case stage_wipe_out:
				wipeOut();
				break;
			default:
				console.log("unknown stage:",animation);
		}
	}
	
	static render(G,ctx,data){
		if(!Animator.isRunning()){
			return;
		}
		//progress the animation
		const animation = Animator.#animations[0];
		animation.duration-=1;
		if(animation.duration<=0){
			Animator.#animations.shift();
		}
		console.log(animation.kind);
		
		if(animation.kind==ANIMATION_KIND.SHOW_SEAT_EFFECT){
			const canv = document.createElement("canvas");
			canv.width = Renderer.width;
			canv.height = Renderer.height;
			const context=canv.getContext('2d');
			//draw screen to be wiped
			RenderAssignCharacter.render(G,ctx);
			//draw screen to show
			RenderMain.render(G,context,data);
			RenderSeatEffect.render(G,context);
			const donePercent = 1-animation.duration/animation.initialDuration;
			Animator.#screenTileWipe(animation,ctx,canv,donePercent);
		}
		if(animation.kind==ANIMATION_KIND.DRAW_CARD){
			Animator.#drawCardAnimation(animation,ctx);
			
		}
		if(animation.kind==ANIMATION_KIND.DIE_ROLL){
			Animator.#diceRoll(animation,ctx);
		}
		if(animation.kind==ANIMATION_KIND.ATTACK){
			Animator.#combat(G,animation,ctx,data);
		}
	}
}

export {Animator,ANIMATION_KIND};

/*
async option:
class asyncRenderer{
	static TARGET_FPS = 15;//minimum amount of time between frames
	static animationFrame(renderFunc){
		const callTime = window.performance.now();
		const resolver = function(resolve){
			const renderLoop = function() {
				const delta = window.performance.now()-callTime;
				if(delta>asyncRenderer.TARGET_FPS){
					renderFunc();//could pass delta in here
					resolve();
				}else{
					console.log("wait");
					window.requestAnimationFrame(renderLoop);
				}
			};
			window.requestAnimationFrame(renderLoop);
		};
		return new Promise(resolver);
	}
}
//usage:
for(const frame of frames){
	await asyncRenderer.animationFrame(()=>{
		draw(frame);
	});
}

*/