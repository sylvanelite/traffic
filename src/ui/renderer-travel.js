
import { Renderer } from "./renderer.js";
import { UI } from "./ui.js";

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
		let x=32;
		for(const evt of G.events){
			const sprite = RenderTravel.#sprites.evtMarker;
			sprite.x=x;
			ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
			x+=170;
		}
		
		//'ok' button
		const sprite = RenderTravel.#sprites.ok;
		UI.drawClickableRect(ctx,UI.EFFECT.OK_BUTTON,
			sprite.x,sprite.y,sprite.width,sprite.height,
			true,false);
		UI.drawBitmapText(ctx,"ok:", sprite.x+50,sprite.y+50);

	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		const sprite = RenderTravel.#sprites.ok;
		if(Renderer.isMouseOver(sprite)){
			client.moves.travel();
		}
	}
};

export {RenderTravel};
