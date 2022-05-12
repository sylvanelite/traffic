
import { Renderer } from "./renderer.js";
import { UI } from "./ui.js";
import { Audio } from "../audio/audio.js";
import { SFX } from "../data/AudioData.js";

class RenderTravel {
	static #sprites = {
		bg:Renderer.getSprite(
			'ui/mobs_remaining.png',
			0,0,980,540,0,0
		),
		ok:Renderer.getSprite(
		'./img.png',
		323,362,100,100,
		0,0),
		evtMarker:Renderer.getSprite(
		'./img.png',
		238,244,100,100,
		0,0),
	};
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		Renderer.drawSprite(RenderTravel.#sprites.bg,ctx);
		let x=238;
		for(const evt of G.events){
			ctx.fillStyle='rgba(200,200,200,0.7)';
			const sprite = RenderTravel.#sprites.evtMarker;
			sprite.x=x;
			ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
			UI.drawBitmapText(ctx,"Monster", sprite.x+10,sprite.y+50);
			x+=170;
		}
		
		//'ok' button
		const sprite = RenderTravel.#sprites.ok;
		UI.drawClickableRect(ctx,UI.EFFECT.OK_BUTTON,
			sprite.x,sprite.y,sprite.width,sprite.height,
			true,false);
		UI.drawBitmapText(ctx,"ok:", sprite.x+45,sprite.y+50);

	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		const sprite = RenderTravel.#sprites.ok;
		if(Renderer.isMouseOver(sprite)){
			client.moves.travel();
		}
	}
};

export {RenderTravel};
