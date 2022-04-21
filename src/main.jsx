import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { Canvas } from  './components/canvas.js';
import { Script } from './Script.js';
import  { GameState } from './Game.js';
import { Client } from 'boardgame.io/client';

const client = Client({ game: GameState,
numPlayers: 1//single player game. in theory could allow more than 1 player to take turns?
});
client.start();//TODO: call start() at some other time? when ready?
//TODO:     client.subscribe(state => update(state));
window.client = client;//TODO: remove when turning off debug

const App = () => {
	const draw = (canvas)=>{
		//TODO: render based on client.getState()
		const state = client.getState();
		const data = state.ctx;
		const G = state.G;
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		if(Script.isRunning()){
			Script.render(ctx,G);
			//how to know which inputs to allow:
			ctx.fillText("next action:"+Script.getCurrentWaitingAction(G).kind, 50, 20);
		}
		
		if(data.activePlayers){//in a sub-stage
			const stage = data.activePlayers[data.currentPlayer];
			ctx.fillText(stage, 20, 20);
			return;
		}
		//in the global stage
		ctx.fillText("global", 20, 20);
	};
	const click = (e)=>{
		console.log("here",e);
		client.moves.clickCell(e.clientX,e.clientY);
		//e.target...
	};
	
  return (
    <div>
	<Canvas draw={draw} onClick={click}  />
	</div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
/*
TODO: move this to a test class of some kind

client.moves.selectSeat('a','driver');
client.moves.selectSeat('b','navigator');
client.moves.selectSeat('c','resting');
client.moves.selectSeat('d','snacking');
client.moves.selectSeat('e','spotting');

client.moves.ok();

client.moves.ok();

client.moves.selectVisitTown('scriptA');

client.moves.pause();

client.moves.choice('script_a_choiceb');

client.moves.skillCheck(['a','d']);

client.moves.action();


client.moves.pause();

client.moves.pause();
client.moves.done();

*/