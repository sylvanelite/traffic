
import { Renderer } from "./renderer.js";
import { UI } from "./ui.js";
import { Audio } from "../audio/audio.js";
import { SFX } from "../data/AudioData.js";

class RenderSeatEffect {
	
	static #sprites = {
		bg:Renderer.getSprite(
			'ui/seat_effect.png',
			0,0,980,540,0,0
		),
		overlay:Renderer.getSprite(
			'ui/seat_effect_overlay.png',
			0,0,980,540,0,0
		),
		characters:{
			a:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					19,115,128,228,41,16
				),
			},
			b:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					174,115,128,228,301,10
				),
			},
			c:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					334,115,128,228,581,0
				),
			},
			d:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					493,115,128,228,811,0
				),
			},
			e:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					645,115,128,228,1341,0
				),
			}
		},
		ok:Renderer.getSprite(
		'./img.png',
		334,350,100,100,
		0,0),
	};
	static render(G,ctx){//ctx here is canvas, not the G ctx
		Renderer.drawSprite(RenderSeatEffect.#sprites.bg,ctx);
		//draw characters in order of seat so that overlay matches portraits
		const seats=['snacking','resting','navigator','spotting','driver'];
		const seatPositions={
			snacking:{x:19,y:115},
			resting:{x:174,y:115},
			navigator:{x:334,y:115},
			spotting:{x:493,y:115},
			driver:{x:645,y:115}
		};
		for(const seatName of seats){
			const seat = G.seats[seatName];
			if(seat){
				const spriteCharacter = RenderSeatEffect.#sprites.characters[seat].portrait;
				spriteCharacter.x=seatPositions[seatName].x;//y is the same for all, don't need to set
				Renderer.drawSprite(spriteCharacter,ctx);
			}
		}
		Renderer.drawSprite(RenderSeatEffect.#sprites.overlay,ctx);
		//'ok' button
		const sprite = RenderSeatEffect.#sprites.ok;
		UI.drawClickableRect(ctx,UI.EFFECT.OK_BUTTON,
			sprite.x,sprite.y,sprite.width,sprite.height,
			true,false);
		ctx.fillStyle = '#000';
		UI.drawBitmapText(ctx,"ok:", sprite.x+32, sprite.y+32,UI.FONT.OK);

	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		const sprite = RenderSeatEffect.#sprites.ok;
		if(Renderer.isMouseOver(sprite)){
			Audio.PlaySFX(SFX.click);
			client.moves.ok();
		}
	}

};


export {RenderSeatEffect};
