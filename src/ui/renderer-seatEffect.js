
import { Renderer } from "./renderer.js";

class RenderSeatEffect {
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		ctx.strokeStyle = 'orange';
		//'ok' button
		const rect = {
				x:200,
				y:150,
				width:100,
				height:100
		};
		ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
		ctx.fillText("ok:", rect.x+50, rect.y+50);
		if(Renderer.isMouseOver(rect)){
			ctx.fillStyle = '#DDD';
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		}
	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		const rect = {
				x:200,
				y:150,
				width:100,
				height:100
		};
		if(Renderer.isMouseOver(rect)){
			client.moves.ok();

		}
	}

};


export {RenderSeatEffect};
