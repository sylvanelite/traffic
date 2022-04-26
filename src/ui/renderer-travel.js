
import { Renderer } from "./renderer.js";

class RenderTravel {
	static #sprites = {
		ok:Renderer.getSprite(
		'./img.png',
		200,250,100,100,
		0,0),
		evtMarker:Renderer.getSprite(
		'./img.png',
		32,32,100,100,
		0,0),
	};
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
	
		//render the upcoming stages in G.events
		/*
		//events have a kind, and data, for now just render as generic objects
			kind:EVENT_TYPES.COMBAT,
			data:{
				mobs:[genEnemy(G,ctx),genEnemy(G,ctx)]
			}
		*/
		let x=32;
		for(const evt of G.events){
			const sprite = RenderTravel.#sprites.evtMarker;
			sprite.x=x;
			ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
			x+=170;
		}
		
		ctx.strokeStyle = 'orange';
		//'ok' button
		const sprite = RenderTravel.#sprites.ok;
		ctx.strokeRect(sprite.x,sprite.y,sprite.width,sprite.height);
		ctx.fillText("ok:", sprite.x+50, sprite.y+50);
		if(Renderer.isMouseOver(sprite)){
			ctx.fillStyle = '#DDD';
			ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
		}
	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		const sprite = RenderTravel.#sprites.ok;
		if(Renderer.isMouseOver(sprite)){
			client.moves.travel();
		}
	}
};

export {RenderTravel};
