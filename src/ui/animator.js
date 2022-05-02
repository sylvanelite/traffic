
import { Renderer } from './renderer.js';
import { RenderSeatEffect } from './renderer-seatEffect.js';
import { RenderMain } from './renderer-main.js';


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
		Animator.#animations.push(animation);
	}
	
	static #screenTileWipe(animation,resultCtx,effectCanv){
		const donePercent = 1-animation.duration/animation.initialDuration;
		const tileCount = 10;
		const tileW = Renderer.width/tileCount;
		for(let i=0;i<tileCount;i+=1){
			resultCtx.drawImage(effectCanv,
				i*tileW, 0,tileW*donePercent,Renderer.height,
				i*tileW, 0,tileW*donePercent,Renderer.height);
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
			
			RenderMain.render(G,context,data);
			RenderSeatEffect.render(G,context);
			
			Animator.#screenTileWipe(animation,ctx,canv);
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