
import { Renderer } from "./renderer.js";

class RenderSeatEffect {
	
	static #sprites = {
		ok:Renderer.getSprite(
		'./img.png',
		200,150,100,100,
		0,0),
	};
	static render(G,ctx){//ctx here is canvas, not the G ctx
		ctx.strokeStyle = 'orange';
		//'ok' button
		const sprite = RenderSeatEffect.#sprites.ok;
		ctx.strokeRect(sprite.x,sprite.y,sprite.width,sprite.height);
		ctx.fillText("ok:", sprite.x+50, sprite.y+50);
		if(Renderer.isMouseOver(sprite)){
			ctx.fillStyle = '#DDD';
			ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
		}
	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		const sprite = RenderSeatEffect.#sprites.ok;
		if(Renderer.isMouseOver(sprite)){
			client.moves.ok();
		}
	}

};


export {RenderSeatEffect};
