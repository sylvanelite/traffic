
import { Renderer } from "./renderer.js";
import { AreaData } from "../data/AreaData.js";

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
	
	static render(G,ctx,context){//ctx here is canvas, not the G ctx
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
		
		if(context.activePlayers){//in a sub-stage
			return;
		}
		//visit/travel options:
		//could be loaded statically, move to top once all towns/areas have been finalised
		const areaName = G.area;
		const area = AreaData[areaName];
		const areaSprite = Renderer.getSprite(
			'./img.png',
			Math.floor(Renderer.width/2),120,132,32,
			0,0);
		ctx.fillStyle = '#000';
		ctx.fillText("current area:"+area.name, areaSprite.x, areaSprite.y+16);
		ctx.strokeStyle = '#000';
		x=0;
		for(const town of area.towns){
			const townSprite = Renderer.getSprite(
				'./img.png',
				x,150,132,32,
				0,0);
			ctx.fillStyle = '#ccc';
			if(G.visitDone){
				ctx.fillStyle = '#888';
			}
			ctx.fillRect(townSprite.x,townSprite.y,townSprite.width,townSprite.height);
			ctx.fillStyle = '#000';
			ctx.fillText("visit: "+town.name, townSprite.x, townSprite.y+16);
			if(Renderer.isMouseOver(townSprite)){
				if(G.visitDone){
					ctx.strokeStyle = 'red';
				}
				ctx.strokeRect(townSprite.x,townSprite.y,townSprite.width,townSprite.height);
			}
			x+=150;
		}
		x=0;
		for(const neighbour of area.neighbours){
			const neighbourSprite = Renderer.getSprite(
				'./img.png',
				x,186,132,32,
				0,0);
			ctx.fillStyle = '#ccc';
			ctx.fillRect(neighbourSprite.x,neighbourSprite.y,neighbourSprite.width,neighbourSprite.height);
			ctx.fillStyle = '#000';
			ctx.fillText("travel: "+neighbour.name, neighbourSprite.x, neighbourSprite.y+16);
			if(Renderer.isMouseOver(neighbourSprite)){
				ctx.strokeRect(neighbourSprite.x,neighbourSprite.y,neighbourSprite.width,neighbourSprite.height);
			}
			x+=150;
		}
	}
	
	static click(client,G,ctx){//ctx is the G ctx here
		//main click is going to happen always, need to filter out other states
		//TODO: here call click() for abilities, since they can happen any time
		if(ctx.activePlayers){//in a sub-stage, don't fire off clicks on map
			return;
		}
		//TODO: here call click() for visit, travel, since they can only happen in the gloabl state
		
		//visit/travel options:
		const areaName = G.area;
		const area = AreaData[areaName];
		let x=0;
		for(const town of area.towns){
			const townSprite = Renderer.getSprite(
				'./img.png',
				x,150,132,32,
				0,0);
			if(Renderer.isMouseOver(townSprite)&&!G.visitDone){
				client.moves.selectVisitTown(town.name);
			}
			x+=150;
		}
		x=0;
		for(const neighbour of area.neighbours){
			const neighbourSprite = Renderer.getSprite(
				'./img.png',
				x,186,132,32,
				0,0);
			if(Renderer.isMouseOver(neighbourSprite)){
				client.moves.selectTravelArea(neighbour.name);
			}
			x+=150;
		}
		
	}
}

export {RenderMain};
