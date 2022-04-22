
import { Renderer } from "./renderer.js";


const RenderMain =(G,ctx)=>{//ctx here is canvas, not the G ctx
	
	ctx.strokeStyle = 'orange';
	ctx.fillStyle = 'red';
	let x = 0;
	for(const ch of Object.entries(G.characters)){
		const rect = {
			x:10+x,
			y:Renderer.height-120,
			width:100,
			height:100
		};
		ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
		if(Renderer.isMouseOver(rect)){
			console.log("a");
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		}
		x+=120;
	}
};

export {RenderMain};
