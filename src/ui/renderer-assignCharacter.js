
import { Renderer } from "./renderer.js";

class RenderAssignCharacter{
	
	static selectedCh = null;
	static selectedSeat = null;
	
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		ctx.strokeStyle = 'orange';
		let x = 0;
		for(const [name,ch] of Object.entries(G.characters)){
			//TODO: draw CH
			const rect = {
				x:10+x,
				y:10,
				width:100,
				height:100
			};
			ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
			if(Renderer.isMouseOver(rect)||ch.seat){
				ctx.fillStyle = '#DDD';
				if(ch.seat){
					ctx.fillStyle = 'red';
				}
				ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
			}
			x+=120;
		}
		x=0;
		ctx.strokeStyle = 'black';
		const seats=[G.seats.driver,G.seats.navigator,G.seats.resting,G.seats.snacking,G.seats.spotting];
		for(const seat of seats){
			const rect = {
				x:10+x,
				y:Renderer.height-120,
				width:100,
				height:100
			};
			ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
			if(Renderer.isMouseOver(rect)||seat){
				ctx.fillStyle = '#DDD';
				if(seat){
					ctx.fillStyle = 'red';
				}
				
				ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
			}
			x+=120;
		}

	}
	
	static click(client,G,ctx){//ctx is the G ctx here
	
		if(!RenderAssignCharacter.selectedCh){
			let x = 0;
			for(const [name,ch] of Object.entries(G.characters)){
				//TODO: draw CH
				const rect = {
					x:10+x,
					y:10,
					width:100,
					height:100
				};
				if(Renderer.isMouseOver(rect)&&!ch.seat){
					RenderAssignCharacter.selectedCh = name;
			console.log("picked ch:"+name);
					break;
				}
				x+=120;
			}
		}//TODO cancel? by clicking again? right click?
		
		if(RenderAssignCharacter.selectedCh){
			let x = 0;
			const seatNames=['driver','navigator','resting','snacking','spotting'];
			for(const seat of seatNames){
				const rect = {
					x:10+x,
					y:Renderer.height-120,
					width:100,
					height:100
				};
				if(Renderer.isMouseOver(rect)&&!G.seats[seat]){
					RenderAssignCharacter.selectedSeat = seat;
			console.log("picked seat:"+seat);
					break;
				}
				x+=120;
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
