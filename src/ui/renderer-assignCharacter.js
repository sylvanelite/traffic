
import { Renderer } from "./renderer.js";

class RenderAssignCharacter{
	
	static selectedCh = null;
	static selectedSeat = null;
	
	static #sprites = {
		characters:{
			a:Renderer.getSprite(
				'./img.png',
				0,0,100,100,//x,y,w,h
				0,0//sx.sy
			),
			b:Renderer.getSprite(
				'./img.png',
				0,0,100,100,
				0,0),
			c:Renderer.getSprite(
				'./img.png',
				0,0,100,100,
				0,0),
			d:Renderer.getSprite(
				'./img.png',
				0,0,100,100,
				0,0),
			e:Renderer.getSprite('./img.png',
				0,0,100,100,
				0,0)
		},
		seats:{
			driver:Renderer.getSprite(
				'./img.png',
				0,Renderer.height-120,100,100,
				0,0),
			navigator:Renderer.getSprite(
				'./img.png',
				0,Renderer.height-120,100,100,
				0,0),
			resting:Renderer.getSprite(
				'./img.png',
				0,Renderer.height-120,100,100,
				0,0),
			snacking:Renderer.getSprite(
				'./img.png',
				0,Renderer.height-120,100,100,
				0,0),
			spotting:Renderer.getSprite(
				'./img.png',
				0,Renderer.height-120,100,100,
				0,0),
		}
		
		
	};
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		ctx.strokeStyle = 'orange';
		let x = 0;
		for(const [name,ch] of Object.entries(G.characters)){
			const sprite = RenderAssignCharacter.#sprites.characters[name];
			sprite.x = x+10;
			ctx.strokeRect(sprite.x,sprite.y,sprite.width,sprite.height);
			
			if(Renderer.isMouseOver(sprite)||ch.seat){
				ctx.fillStyle = '#DDD';
				if(ch.seat){
					ctx.fillStyle = 'red';
				}
				ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
			}
			if(RenderAssignCharacter.selectedCh == name){
				ctx.fillStyle = 'green';
				ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
			}
			x+=120;
		}
		x=0;
		ctx.strokeStyle = 'black';
		const seats=['driver','navigator','resting','snacking','spotting'];
		for(const seatName of seats){
			const seat = G.seats[seatName];
			const sprite = RenderAssignCharacter.#sprites.seats[seatName];
			sprite.x = x+10;
			ctx.strokeRect(sprite.x,sprite.y,sprite.width,sprite.height);
			if(Renderer.isMouseOver(sprite)||seat){
				ctx.fillStyle = '#DDD';
				if(seat){
					ctx.fillStyle = 'red';
				}
				
				ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
			}
			x+=120;
		}

	}
	
	static click(client,G,ctx){//ctx is the G ctx here
	
		if(!RenderAssignCharacter.selectedCh){
			for(const [name,ch] of Object.entries(G.characters)){
				const sprite = RenderAssignCharacter.#sprites.characters[name];
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
