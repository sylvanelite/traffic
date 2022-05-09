
import {ScriptAudio} from '../data/ScriptAudio.js';

//https://github.com/goldfire/howler.js (MIT)
class Audio{
	static #scriptAudio = null;
	static PlayScriptLine(name){
		if(Audio.#scriptAudio){
			Audio.#scriptAudio.stop();
		}
		Audio.#scriptAudio =  new Howl({
			src: ['res/audio/script/'+ScriptAudio[name]]
		});
		Audio.#scriptAudio.play();
	}
};
//dfki-obadiah en_GB male uniselection general
//dfki-prudence en_GB male uniselection general

export { Audio }
