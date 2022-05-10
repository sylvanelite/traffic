
import { Renderer } from "./renderer.js";
import { UI } from "./ui.js";
import { Audio } from "../audio/audio.js";
import { SFX } from "../data/AudioData.js";

class RenderDrawAbility{
	
	static #sprites = {
		ok:Renderer.getSprite(
		'./img.png',
		200,150,100,100,
		0,0),
	};
	static render(G,ctx){//ctx here is canvas, not the G ctx
		//'ok' button
		const sprite = RenderDrawAbility.#sprites.ok;
			const spriteOk = RenderCombat.#sprites.ok;
			UI.drawClickableRect(ctx,UI.EFFECT.OK_BUTTON,
				sprite.x,sprite.y,sprite.width,sprite.height,
				true,false);
		UI.drawBitmapText(ctx,"ok:", spriteOk.x+50, spriteOk.y+50,UI.FONT.OK);
	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		const sprite = RenderDrawAbility.#sprites.ok;
		if(Renderer.isMouseOver(sprite)){
			Audio.PlaySFX(SFX.click);
			client.moves.ok();
		}
	}
};

export {RenderDrawAbility};
