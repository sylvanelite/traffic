
import { Renderer } from "./renderer.js";

class RenderPhase{
	static #sprites = {
		bg:Renderer.getSprite(
			'ui/cbt_bg.png',
			0,100,796,332,0,0
		),
		ok:Renderer.getSprite(
		'./img.png',
		200,250,100,100,
		0,0),
	};
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		ctx.strokeStyle = 'orange';
		//'ok' button
		const spriteOk = RenderPhase.#sprites.ok;
		ctx.strokeRect(spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height);
		ctx.fillText("ok:", spriteOk.x+50, spriteOk.y+50);
		if(Renderer.isMouseOver(spriteOk)){
			ctx.fillStyle = '#DDD';
			ctx.fillRect(spriteOk.x,spriteOk.y,spriteOk.width,spriteOk.height);
		}

	}
	static click(client,G,ctx){//ctx is the G ctx here
		ctx.strokeStyle = 'orange';
		//'ok' button
		const spriteOk = RenderPhase.#sprites.ok;
		if(Renderer.isMouseOver(spriteOk)){
			client.moves.endPhase();
		}
	}
};

export {RenderPhase};
