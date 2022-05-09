
import { Renderer } from "./renderer.js";
import { UI } from "./ui.js";

class RenderAssignCharacter{
	
	static selectedCh = null;
	static selectedSeat = null;
	
	static #sprites = {
		bg:Renderer.getSprite(
			'ui/assign_cutout.png',
			0,0,980,540,0,0
		),
		characters:{//clickable region for characters. must match main header
			a:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					0,0,90,90,60,16
				),
			},
			b:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					196,0,90,90,320,10
				),
			},
			c:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					392,0,90,90,600,0
				),
			},
			d:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					588,0,90,90,830,0
				),
			},
			e:{
				portrait:Renderer.getSprite(
					'characters/characters_512.png',
					784,0,90,90,1360,0
				),
			}
		},
		seats:{
			driver:Renderer.getSprite(
				'./img.png',
				588,379,90,90,0,0),
			navigator:Renderer.getSprite(
				'./img.png',
				648,94,90,90,0,0),
			resting:Renderer.getSprite(
				'./img.png',
				240,95,90,90,0,0),
			snacking:Renderer.getSprite(
				'./img.png',
				49,175,90,90,0),
			spotting:Renderer.getSprite(
				'./img.png',
				169,365,90,90,0,0),
		}
	};
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		Renderer.drawSprite(RenderAssignCharacter.#sprites.bg,ctx);
		for(const [name,ch] of Object.entries(G.characters)){
			const sprite = RenderAssignCharacter.#sprites.characters[name].portrait;
			if(RenderAssignCharacter.selectedCh == name){
				UI.drawClickableRect(ctx,UI.EFFECT.CHARACTER_SELECTED,
					sprite.x,sprite.y,sprite.width,sprite.height);
					continue;
			}
			UI.drawClickableRect(ctx,UI.EFFECT.CHARACTER_HIGHLIGHT,
				sprite.x,sprite.y,sprite.width,sprite.height,
				true,ch.seat);
		}
		const seats=['driver','navigator','resting','snacking','spotting'];
		for(const seatName of seats){
			const seat = G.seats[seatName];
			const sprite = RenderAssignCharacter.#sprites.seats[seatName];
			//draw the character in the seat
			if(G.seats[seatName]){
				const spriteCharacter = RenderAssignCharacter.#sprites.characters[G.seats[seatName]].portrait;
				const pos = {x:spriteCharacter.x,y:spriteCharacter.y};
				spriteCharacter.x = sprite.x;//move to seat location
				spriteCharacter.y = sprite.y;
				Renderer.drawSprite(spriteCharacter,ctx);
				spriteCharacter.x=pos.x;
				spriteCharacter.y=pos.y;
			}
			UI.drawClickableRect(ctx,UI.EFFECT.SEAT_SELECT,
				sprite.x,sprite.y,sprite.width,sprite.height,
				true,seat);
		}

	}
	
	static click(client,G,ctx){//ctx is the G ctx here
	
		if(!RenderAssignCharacter.selectedCh){
			for(const [name,ch] of Object.entries(G.characters)){
				const sprite = RenderAssignCharacter.#sprites.characters[name].portrait;
				if(Renderer.isMouseOver(sprite)&&!ch.seat){
					RenderAssignCharacter.selectedCh = name;
					console.log("picked ch:"+name);
					break;
				}
			}
		}//TODO cancel? by clicking again? right click?
		
		if(RenderAssignCharacter.selectedCh){
			const seatNames=['driver','navigator','resting','snacking','spotting'];
			for(const seatName of seatNames){
				const sprite = RenderAssignCharacter.#sprites.seats[seatName];
				if(Renderer.isMouseOver(sprite)&&!G.seats[seatName]){
					RenderAssignCharacter.selectedSeat = seatName;
					console.log("picked seat:"+seatName);
					break;
				}
			}
		}
		if(RenderAssignCharacter.selectedSeat&&RenderAssignCharacter.selectedCh){
			client.moves.selectSeat(RenderAssignCharacter.selectedCh,RenderAssignCharacter.selectedSeat);
			RenderAssignCharacter.selectedSeat = null;
			RenderAssignCharacter.selectedCh = null;

		}
		
	}
};

export {RenderAssignCharacter};
