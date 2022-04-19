import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { Canvas } from  './components/canvas.js';
import  { GameState } from './Game.js';
import { Client } from 'boardgame.io/client';

const client = Client({ game: GameState });
client.start();//TODO: call start() at some other time? when ready?
//TODO:     client.subscribe(state => update(state));
console.log(client);
client.events.setStage('assign_character');//use ctx.events past here
window.client = client;//TODO: remove when turning off debug

const App = () => {
	const draw = (ctx)=>{
		//TODO: render based on client.getState()
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
