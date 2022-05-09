
import {ScriptAudio} from '../data/ScriptAudio.js';

//https://github.com/goldfire/howler.js (MIT)
class Audio{
	static #scriptAudio = null;
	static PlayScriptLine(name){
		if(Audio.#scriptAudio){
			Audio.#scriptAudio.stop();
		}
		if(!Audio.hasOwnProperty(name)){
			console.warn('missing script:'+name);
			//return;
			if(Math.random()>0.5){
				name='tutorial';
			}else{
				name='hospital';
			}
		}
		Audio.#scriptAudio =  new Howl({
			src: ['res/audio/script/'+ScriptAudio[name]]
		});
		Audio.#scriptAudio.play();
	}
	static StopScriptLine(){
		if(Audio.#scriptAudio){
			Audio.#scriptAudio.stop();
		}
		Audio.#scriptAudio=null;
	}
};
//dfki-obadiah en_GB male uniselection general
//dfki-prudence en_GB male uniselection general

export { Audio }
