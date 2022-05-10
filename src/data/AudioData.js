const BGM = {
	songA:'BGM/fiddle-de-dee.mp3'
	//flight-of-the-swift.mp3
	//give-a-little.mp3
};
const SFX = {
	arrive:'SFX/rrsounds/arrive.flac',
	click:'SFX/rrsounds/click.flac',
	leave:'SFX/rrsounds/leave.flac',
	lose:'SFX/rrsounds/lose.flac',
	receive:'SFX/rrsounds/receive.flac',
	send:'SFX/rrsounds/send.flac',
	starting:'SFX/rrsounds/starting.flac',
	win:'SFX/rrsounds/win.flac',
	item1a:'SFX/Menu FX example/Item1A.wav',
	item1b:'SFX/Menu FX example/Item1B.wav',
	menu1a:'SFX/Menu FX example/Menu1A.wav',
	menu1b:'SFX/Menu FX example/Menu1B.wav'
};



export {BGM,SFX};
/*
click = use for "continue"
receive = done
arrive = unlock keyword?
lose,win = skill check pass/fail
starting = assign character to seat

menu1a = click on overworld
menu1b = end turn

import { Audio } from "../audio/audio.js";
import { SFX } from "../data/AudioData.js";
Audio.PlaySFX(SFX.lose);


*/