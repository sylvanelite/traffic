
import { Renderer } from "./renderer.js";
import { AreaData } from "../data/AreaData.js";

class RenderMain{
	
	static #sprites = {
		bg:Renderer.getSprite(
			'ui/0_bg.png',
			0,0,980,540,0,0
		),
		map_towna:Renderer.getSprite(
			'ui/1_map_bg_crop.png',
			89,94,710,445,0,0
		),
		header:Renderer.getSprite(
			'ui/5_header_crop.png',
			0,0,980,100,0,0
		),
		card:Renderer.getSprite(
			'ui/7_cards_crop.png',
			24,444,64,93,0,0
		),
		characters:{
			a:Renderer.getSprite(
				'ui/6_stats_crop.png',
				0,0,196,90,0,0
			),
			b:Renderer.getSprite(
				'ui/6_stats_crop.png',
				196,0,196,90,0,0
			),
			c:Renderer.getSprite(
				'ui/6_stats_crop.png',
				392,0,196,90,0,0
			),
			d:Renderer.getSprite(
				'ui/6_stats_crop.png',
				588,0,196,90,0,0
			),
			e:Renderer.getSprite(
				'ui/6_stats_crop.png',
				784,0,196,90,0,0
			)
		},
	};
	
	static render(G,ctx,context){//ctx here is canvas, not the G ctx
		Renderer.drawSprite(RenderMain.#sprites.bg,ctx);
		Renderer.drawSprite(RenderMain.#sprites.map_towna,ctx);//TODO: read the town from the G data
		Renderer.drawSprite(RenderMain.#sprites.header,ctx);//TODO: read the town from the G data
		ctx.fillStyle = 'rgba(200,200,200,0.7)';
		for(const [name,ch] of Object.entries(G.characters)){
			const sprite = RenderMain.#sprites.characters[name];
			Renderer.drawSprite(sprite,ctx);
		}
		let x=24;
		let y=444;
		//TODO: descriptions for abilities
		//      or can generate on the fly
		ctx.strokeStyle = 'black';
		for(const a of Object.entries(G.abilities)){
			const sprite = RenderMain.#sprites.card;
			sprite.x=x;
			sprite.y=y;
			Renderer.drawSprite(sprite,ctx);
			if(Renderer.isMouseOver(sprite)){
				ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);
				//TODO: draw the sprite on top when hovered (iterate backwards?)
			}
			x+=49;
			if(x%2==0){
				y=444;
			}else{
				y=447;
			}
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
