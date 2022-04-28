
import { Renderer } from './renderer.js';

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
			duration: 33//bit over 1/2 a second @ 60FPS//TODO: actual data @ fixed frame rate
		};
		Animator.#animations.push(animation);
	}
	
	static render(G,ctx){
		if(!Animator.isRunning()){
			return;
		}
		//progress the animation
		const animation = Animator.#animations[0];
		animation.duration-=1;
		if(animation.duration<=0){
			Animator.#animations.shift();
		}
		
		//TODO: actually render the animations
		console.log(animation.kind);
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