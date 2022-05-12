import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { Canvas } from  './components/canvas.js';
import { Script } from './Script.js';
import { GameState } from './Game.js';
import { Client } from 'boardgame.io/client';

import { Renderer } from "./ui/renderer.js";
import { Animator } from '/ui/animator.js';
import { RenderMain } from "./ui/renderer-main.js";
import { RenderAssignCharacter } from "./ui/renderer-assignCharacter.js";
import { RenderCombat } from "./ui/renderer-combat.js";
import { RenderDrawAbility } from "./ui/renderer-drawAbility.js";
import { RenderSeatEffect } from "./ui/renderer-seatEffect.js";
import { RenderTravel } from "./ui/renderer-travel.js";
import { RenderVisit } from "./ui/renderer-visit.js";
import { RenderPhase } from "./ui/renderer-phase.js";

const client = Client({ game: GameState,debug:false,
numPlayers: 1//single player game. in theory could allow more than 1 player to take turns?
});
client.start();
//window.client = client;//for debug
RenderPhase.preload();

const App = () => {
	let lastRenderTime = performance.now();
	const draw = (canvas)=>{
		const frameDelta = performance.now()-lastRenderTime;
		if(frameDelta<15){
			return;//cap the frame rate at a max of ~60fps
		}
		lastRenderTime = performance.now();
		//render based on client.getState()
		const state = client.getState();
		const data = state.ctx;
		const G = state.G;
		const ctx = canvas.getContext('2d');
		ctx.font = '12pt monospace';
		ctx.clearRect(0,0,canvas.width,canvas.height);
		//draw BG
		Renderer.drawSpriteScaled(Renderer.getSprite(
				'ui/bg.png',
				0,0,245,125,
				0,0
			),Renderer.width,Renderer.height,ctx);

		if(data.phase!="playing"){
			RenderPhase.render(G,ctx,data);
			return;
		}
		if(Animator.isRunning()){//block the UI until animations done
			Animator.render(G,ctx,data);
			return;
		}
		
		RenderMain.render(G,ctx,data);
		
		if(data.activePlayers){//in a sub-stage
			const stage = data.activePlayers[data.currentPlayer];
			
			switch(stage){
				case "assign_character":
					RenderAssignCharacter.render(G,ctx);
				break;
				case "do_seat_effects":
					RenderSeatEffect.render(G,ctx);
				break;
				case "draw_ability_card":
					RenderDrawAbility.render(G,ctx);
				break;
				case "visit":
					RenderVisit.render(G,ctx);
				break;
				case "travel":
					RenderTravel.render(G,ctx);
				break;
				case "combat":
					RenderCombat.render(G,ctx);
				break;
			}
			return;
		}
	};
	const click = (e)=>{
		Renderer.mouseMove(e);//ensure mouse coord is up to date
		
		const state = client.getState();
		const ctx = state.ctx;
		const G = state.G;
		
		if(ctx.phase!="playing"){
			RenderPhase.click(client,G,ctx);
			return;
		}
		if(Animator.isRunning()){//block the UI until animations done
			return;//TODO: skip by calling skipAnimations?
		}
		
		RenderMain.click(client,G,ctx);
		
		if(ctx.activePlayers){//in a sub-stage
			const stage = ctx.activePlayers[ctx.currentPlayer];
			switch(stage){
				case "assign_character":
					RenderAssignCharacter.click(client,G,ctx);
				break;
				case "do_seat_effects":
					RenderSeatEffect.click(client,G,ctx);
				break;
				case "draw_ability_card":
					RenderDrawAbility.click(client,G,ctx);
				break;
				case "visit":
					RenderVisit.click(client,G,ctx);
				break;
				case "travel":
					RenderTravel.click(client,G,ctx);
				break;
				case "combat":
					RenderCombat.click(client,G,ctx);
				break;
			}
		}
	};
	
  return (
    <div>
	<Canvas draw={draw} onClick={click} 
                onMouseMove={Renderer.mouseMove}
                onMouseOut={Renderer.mouseOut}
			width={Renderer.width} 
			height={Renderer.height} 
			style={{width:Renderer.width/window.devicePixelRatio,height:Renderer.height/window.devicePixelRatio
			}}/>
	</div>
  );
}
window.onresize=()=>{
	const canvElems=document.getElementsByTagName('canvas');
	for(const c of canvElems){
		c.style.width=window.innerWidth+"px";
		c.style.height=window.innerHeight+"px";
	}
};
ReactDOM.render(<App />, document.getElementById("root"));
/*
TODO: move this to a test class of some kind

client.moves.selectSeat('a','driver');
client.moves.selectSeat('b','navigator');
client.moves.selectSeat('c','resting');
client.moves.selectSeat('d','snacking');
client.moves.selectSeat('e','spotting');
client.moves.ok();
//client.moves.ok();

client.moves.selectVisitTown('townA');
client.moves.pause();
client.moves.choice('script_a_choiceb');
client.moves.skillCheck(['a','d']);
client.moves.action();
client.moves.pause();
client.moves.pause();
client.moves.done();


client.moves.selectTravelArea('areaB');

client.moves.travel();

client.moves.attack('a',0,1);

client.moves.endCombat();
client.moves.travel();
client.moves.endCombat();
client.moves.travel();
//end of turn

*/