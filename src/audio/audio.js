
import {Howl, Howler} from 'howler';
import {ScriptAudio} from '../data/ScriptAudio.js';
import {BGM,SFX} from '../data/AudioData.js';

//https://github.com/goldfire/howler.js (MIT)
class Audio{
	static #scriptAudio = null;
	static PlayScriptLine(name){
		if(Audio.#scriptAudio){
			Audio.#scriptAudio.stop();
		}
		if(!ScriptAudio.hasOwnProperty(name)){
			console.warn('missing script:'+name);
			return;
		}
		Audio.#scriptAudio =  new Howl({
			src: ['res/audio/script/'+ScriptAudio[name]]
		});
		Audio.#scriptAudio.play();
		//reduce BGM while script voiceover is playing
		if(Audio.#bgmAudio){
			Audio.#bgmAudio.fade(Audio.#bgmAudio.volume(),Audio.#bgmReducedVolume,100);
		}
	}
	static StopScriptLine(){
		if(Audio.#scriptAudio){
			Audio.#scriptAudio.stop();
		}
		Audio.#scriptAudio=null;
		if(Audio.#bgmAudio){
			Audio.#bgmAudio.fade(Audio.#bgmAudio.volume(),Audio.#bgmNormalVolume,100);
		}
	}
	
	static #bgmReducedVolume = 0.1;
	static #bgmNormalVolume = 0.1;
	
	static #bgmAudio = null;
	static StartBGM(){
		if(Audio.#bgmAudio){
			Audio.#bgmAudio.stop();
		}
		Audio.#bgmAudio =  new Howl({
			src: ['res/audio/'+BGM.songA],
			loop:true,
			volume:Audio.#bgmNormalVolume
		});
		Audio.#bgmAudio.play();
	}
	static StopBGM(){
		if(Audio.#bgmAudio){
			Audio.#bgmAudio.stop();
		}
		Audio.#bgmAudio=null;
	}
	
	static #sfxAudio = null;
	static PlaySFX(sound){
		if(Audio.#sfxAudio){
			Audio.#sfxAudio.stop();
		}
		Audio.#sfxAudio =  new Howl({
			src: ['res/audio/'+sound],
			volume:0.2
		});
		Audio.#sfxAudio.play();
	}
	static StopBGM(){
		if(Audio.#sfxAudio){
			Audio.#sfxAudio.stop();
		}
		Audio.#sfxAudio=null;
	}
	
	
};
//dfki-obadiah en_GB male uniselection general
//dfki-prudence en_GB male uniselection general

export { Audio }
