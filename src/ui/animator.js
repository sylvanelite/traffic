
import { Renderer } from './renderer.js';
import { RenderSeatEffect } from './renderer-seatEffect.js';
import { RenderMain } from './renderer-main.js';
import { RenderAssignCharacter } from './renderer-assignCharacter.js';
import { RenderCombat } from './renderer-combat.js';
import { MobSprites,getMobSpriteByName } from '../data/MobSprites.js';

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
			animation.duration=55;
			animation.initialDuration=55;
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
	static #combatSprites = {
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
					combat:Renderer.getSprite(
						'pixelcarpack_kenney/PNG/Cars/suv_travel.png',
						250,320,32,16,0,0
					)
				},
				b:{
					portrait:Renderer.getSprite(
						'characters/characters_512.png',
						110,292,90,90,320,10
					),
					combat:Renderer.getSprite(
						'pixelcarpack_kenney/PNG/Cars/suv_travel.png',
						250,320,32,16,0,0
					)
				},
				c:{
					portrait:Renderer.getSprite(
						'characters/characters_512.png',
						110,292,90,90,600,0
					),
					combat:Renderer.getSprite(
						'pixelcarpack_kenney/PNG/Cars/suv_travel.png',
						250,320,32,16,0,0
					)
				},
				d:{
					portrait:Renderer.getSprite(
						'characters/characters_512.png',
						110,292,90,90,830,0
					),
					combat:Renderer.getSprite(
						'pixelcarpack_kenney/PNG/Cars/suv_travel.png',
						250,320,32,16,0,0
					)
				},
				e:{
					portrait:Renderer.getSprite(
						'characters/characters_512.png',
						110,292,90,90,1360,0
					),
					combat:Renderer.getSprite(
						'pixelcarpack_kenney/PNG/Cars/suv_travel.png',
						250,320,32,16,0,0
					)
				}
			},
			attack_fatigue:
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
			],
			attack_sanity:
				[
				Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle1.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle2.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle3.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle4.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle5.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle6.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle7.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle8.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle9.png',
					550,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_blue_circle/Explosion_blue_circle10.png',
					550,150,256,256,0,0
				)
			],
			attack_counter:
				[
				Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors1.png',
					250,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors2.png',
					250,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors3.png',
					250,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors4.png',
					250,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors5.png',
					250,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors6.png',
					250,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors7.png',
					250,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors8.png',
					250,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors9.png',
					250,150,256,256,0,0
				),Renderer.getSprite(
					'effects/PNG/Explosion_two_colors/Explosion_two_colors10.png',
					250,150,256,256,0,0
				)
			],
		};
	static #combat(G,animation,ctx,data){
		const sprites = Animator.#combatSprites;

		const lerp = (start, end, t)=> {
			return start * (1 - t) + end * t;
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
			let parallaxSpeed=0.5;
			//TODO: parallax scrolling
			const barrierX = Renderer.width/2;//480
			//left
			const rightParallax=[];
			for(const parallax of sprites.parallax){
				parallax.x-=parallaxSpeed;//shift off one side
				if(parallax.x+parallax.width<0){//if it's wrapped too far, shift back around
					parallax.x=parallax.width;
				}
				//adjust width/height/sx/sy to crop the parallax 
				const [width,sx]=[parallax.width,parallax.sx];
				if(parallax.x+parallax.width>barrierX){//off the right side
					parallax.width=barrierX-parallax.x;
				}
				Renderer.drawSprite(parallax,ctx);
				parallax.width=width;
				parallax.sx=sx;
				parallaxSpeed+=0.5;
				rightParallax.push({
					url:parallax.url,
					x:barrierX+(-parallax.x),
					y:parallax.y,width:parallax.width,height:parallax.height,
					sx:parallax.sx,sy:parallax.sy
				});
			}
			//right
			parallaxSpeed=sprites.parallax.length;
			for(const parallax of rightParallax){
				//adjust width/height/sx/sy to crop the parallax 
				if(parallax.x<barrierX){//off the right side
					parallax.sx=barrierX-parallax.x;
					parallax.x=barrierX;
				}
				Renderer.drawSprite(parallax,ctx);
			}
			//ui
			Renderer.drawSprite(sprites.ui,ctx);
			//ch sprite: TODO
			
			//enemy sprite TODO: bobbing motion?
			const mobSprite = getMobSpriteByName(animation.data.mob.name);
			const enemySprite = Renderer.getSprite(
				'aekashics_librarium/'+mobSprite.name,
				701-mobSprite.width/4,360-mobSprite.height/2,mobSprite.width,mobSprite.height,0,0
			);
			//flicker if in the take damage state
			if(animation.stage == stage_take_dmg){
				if(Math.floor(animation.data.damage*10)%2!=0){
					Renderer.drawSpriteScaled(enemySprite,mobSprite.width/2,mobSprite.height/2,ctx);
				}
				//when damage reaches 0 (thresholed because lerp) either draw them or don't
				//don't if their HP is 0
				if(animation.data.damage<0.1){
					if(animation.data.mob.hp>0){
						Renderer.drawSpriteScaled(enemySprite,mobSprite.width/2,mobSprite.height/2,ctx);
					}
				}
			}else{
				//todo: add slight movement to image?
				Renderer.drawSpriteScaled(enemySprite,mobSprite.width/2,mobSprite.height/2,ctx);
			}
			//TODO: should be their sprite, not their portrait
			const chSprite = sprites.characters[animation.data.character].combat;
			if(animation.stage == stage_take_counter_dmg){
				if(Math.floor(animation.data.counterDmg*10)%2!=0){
					Renderer.drawSprite(chSprite,ctx);
				}
				//when damage reaches 0 (thresholed because lerp) either draw them or don't
				//don't if their HP is 0
				if(animation.data.counterDmg<0.1){
					if(animation.data.mob.hp>0){
					Renderer.drawSprite(chSprite,ctx);
					}
				}
			}else{
				//todo: add slight movement to image?
					Renderer.drawSprite(chSprite,ctx);
			}
			//character portrait
			Renderer.drawSprite(sprites.characters[animation.data.character].portrait,ctx);//damage
			//character HP
			const ch = G.characters[animation.data.character];
			ctx.fillStyle="yellow";//draw damage behind
			ctx.fillRect(141,400,204*(Math.min(ch.hp_max,ch.hp+animation.data.counterDmg))/ch.hp_max,17);
			ctx.fillRect(629,400,204*(Math.min(animation.data.mob.hp_max,animation.data.mob.hp+animation.data.damage))/animation.data.mob.hp_max,17);
			ctx.fillStyle="red";//TODO:? draw the delimiters between each HP
			ctx.fillRect(141,400,204*ch.hp/ch.hp_max,17);
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
				animation.duration=33;
				animation.initialDuration=33;
				animation.stage=stage_attack;
			}
		};
		const attack = ()=>{
			renderCombat(animation,ctx);
			//render effect
			const donePercent = 0.99-animation.duration/animation.initialDuration;
			const fatigue = sprites.attack_fatigue[Math.floor(sprites.attack_fatigue.length*donePercent)];
			const sanity = sprites.attack_sanity[Math.floor(sprites.attack_sanity.length*donePercent)];
			const attack = (animation.data.sanity?sanity:fatigue);
			Renderer.drawSprite(attack,ctx);
			
			if(animation.duration<=1){//next stage
				animation.duration=55;
				animation.initialDuration=55;
				animation.stage=stage_take_dmg;
			}
		};
		const dmg = ()=>{
			renderCombat(animation,ctx);
			const donePercent = 1-animation.duration/animation.initialDuration;
			animation.data.damage=lerp(animation.data.damage,0,donePercent);
			if(animation.duration<=1){//next stage
				animation.data.damage=0;
				if(animation.data.counterDmg>0){
					animation.duration=33;
					animation.initialDuration=33;
					animation.stage=stage_counterattack;
				}else{
					animation.duration=33;
					animation.initialDuration=33;
					animation.stage=stage_wipe_out;
				}
			}
		};
		const counterAttack = ()=>{
			renderCombat(animation,ctx);
			//render effect
			const donePercent = 0.99-animation.duration/animation.initialDuration;
			const attack = sprites.attack_counter[Math.floor(sprites.attack_counter.length*donePercent)];
			Renderer.drawSprite(attack,ctx);
			if(animation.duration<=1){//next stage
				animation.duration=55;
				animation.initialDuration=55;
				animation.stage=stage_take_counter_dmg;
			}
		};
		const counterDmg = ()=>{
			renderCombat(animation,ctx);
			const donePercent = 1-animation.duration/animation.initialDuration;
			animation.data.counterDmg=lerp(animation.data.counterDmg,0,donePercent);
			if(animation.duration<=1){//next stage
				animation.data.counterDmg=0;
				animation.duration=33;
				animation.initialDuration=33;
				animation.stage=stage_wipe_out;
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
				counterAttack();
				break;
			case stage_take_counter_dmg:
				counterDmg();
				break;
			case stage_wipe_out:
				wipeOut();
				break;
			default:
				console.warn("unknown stage:",animation);
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