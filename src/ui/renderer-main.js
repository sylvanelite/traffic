
import { Renderer } from "./renderer.js";


class RenderMain{
	
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
	};
	
	static render(G,ctx){//ctx here is canvas, not the G ctx
		ctx.strokeStyle = 'orange';
		ctx.fillStyle = '#DDD';
		let x = 0;
		for(const [name,ch] of Object.entries(G.characters)){
			const sprite = RenderMain.#sprites.characters[name];
			sprite.x = x+10;
			ctx.strokeRect(sprite.x,sprite.y,sprite.width,sprite.height);
			x+=120;
		}
		x=0;
		//TODO: sprites for abilities, can either pre-load at the top (all possible abilities)
		//      or can generate on the fly
		ctx.strokeStyle = 'black';
		for(const a of Object.entries(G.abilities)){
			const rect = {
				x:10+x,
				y:Renderer.height-120,
				width:100,
				height:100
			};
			ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
			if(Renderer.isMouseOver(rect)){
				ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
			}
			x+=120;
		}

	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		//main click is going to happen always, need to filter out other states
		//TODO: here call click() for abilities, since they can happen any time
		if(ctx.activePlayers){//in a sub-stage, don't fire off clicks on map
			return;
		}
		//TODO: here call click() for visit, travel, since they can only happen in the gloabl state
	}
}

export {RenderMain};
