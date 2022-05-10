//

//https://boardgame.io/documentation/#/
import { INVALID_MOVE } from 'boardgame.io/core';
import { Script,SCRIPT_KIND,ACTION_KIND } from './Script.js';
import { Animator,ANIMATION_KIND} from '/ui/animator.js';
import { ScriptData } from './data/ScriptData.js';
import { AreaData } from './data/AreaData.js';
import { mobNames } from './data/MobSprites.js';

import {
	SKILLS,
	MAX_SANITY,
	MAX_FATIGUE,
	MAX_ABILITY_POINTS,
	EVENT_TYPES
} from './data/Consts.js';
//TODO: move to a different place that contains game logic
const changeHp = (ch,amount)=>{
	ch.hp+=amount;
	if(ch.hp>ch.hp_max){
		ch.hp = ch.hp_max;
	}
	if(ch.hp<=0){
		ch.hp = 0;
	}
};
let abilityId = 0;
const getAbility = (ctx)=>{//ctx is needed for RNG
	abilityId+=1;//used to equate ability cards (should probably be stored in G or ctx...)
	const res = {
		id:abilityId,
		cost:0,//have a cost (-1,0,1,2 ability point)
		stats:[],//stat to affect
		description:''//human-readable description
	};
	const stats = ctx.random.Shuffle(['hp', 'fatigue', 'sanity', 'skill_amount', 'attack']);
	const cost= ctx.random.D4()-2;
	res.cost = cost;
	const getAmount = ()=>{
		return 1+Math.round(ctx.random.Number());//1 or 2. This can make some abilities strictly better than other
	};
	switch(cost){
		case -1://bane (will gain AP)
			res.stats.push({
				name:stats[0],
				amount:-1*getAmount()
			});
		break;
		case 0://neutral (offset stat gain with stat cost for no AP)
			res.stats.push({
				name:stats[0],
				amount:-1*getAmount()
			});
			res.stats.push({
				name:stats[1],
				amount:getAmount()
			});
		break;
		case 1://increase one stat by small amount
			res.stats.push({
				name:stats[0],
				amount:getAmount()
			});
		break;
		case 2://buff more than 1 stat
			res.stats.push({
				name:stats[0],
				amount:getAmount()
			});
			res.stats.push({
				name:stats[1],
				amount:getAmount()
			});
		break;
	}
	for(const stat of res.stats){
		if(stat.name == "fatigue" ){//unlike other stats, lower fatigue is better
			stat.amount = -stat.amount;
		}
	}
	if(res.cost<0){
		res.description="Restore "+(Math.abs(res.cost))+" AP.\n";
	}else{
		res.cost+=1;
	}
	for(const stat of res.stats){
		const name = stat.name;
		const amount = stat.amount;
		if(res.cost>0){
			res.description += "("+res.cost+"AP)";
		}
		res.description += (amount>0?"Gain ":"Lose ");//amount is non-zero positive or negaive
		res.description += Math.abs(amount)+" ";
		switch(name){
			case 'hp':res.description+=" HP.";break;
			case 'hp_max':res.description+=" Max HP.";break;
			case 'fatigue':res.description+=" Fatigue.";break;
			case 'sanity':res.description+=" Sanity.";break;
			case 'skill_amount':res.description+=" Skill.";break;
			case 'attack':res.description+=" Attack.";break;
		}
		res.description+="\n";
	}
	
	return res;
}
const genEnemy = (G,ctx)=>{
	//TODO: use G to generate balanced mobs
	const hp = 3+ctx.random.D4();
	const attack = ctx.random.D4();
	const names = Object.keys(mobNames);
	const name = names[Math.floor(ctx.random.Number()*names.length)];
	return {
		hp,attack,name,hp_max:hp
	}
}

const PhaseMoves = {
	endPhase: (G, ctx)=>{
		ctx.events.endPhase();
	},
	done: (G,ctx)=> {
		Script.actionDone(G);
	}
};
const GlobalMoves = {
	doAbility:(G,ctx,ability,chName)=>{
		const ch = G.characters[chName];
		if(ch.ability_points<ability.cost){
			return INVALID_MOVE;
		}
		ch.ability_points-=ability.cost;
		if(ch.ability_points<0){ch.ability_points=0;}
		if(ch.ability_points>MAX_ABILITY_POINTS){ch.ability_points=MAX_ABILITY_POINTS;}
		//remove the card from hand
		for(let i=G.abilities.length-1;i>=0;i-=1){
			if(G.abilities[i].id == ability.id){
				G.abilities.splice(i,1);
				break;
			}
		}
		for(const stat of ability.stats){
			const name = stat.name;
			const amount = stat.amount;
			//['hp', 'fatigue', 'sanity', 'skill_amount', 'attack']
			switch(name){
			case 'hp':changeHp(ch,amount);break;
			case 'fatigue':
				ch.fatigue+=amount;
				if(ch.fatigue<0){ch.fatigue=0;}
				if(ch.fatigue>MAX_FATIGUE){ch.fatigue=MAX_FATIGUE;}
				break;
			case 'sanity':
				ch.sanity+=amount;
				if(ch.sanity<0){ch.sanity=0;}
				if(ch.sanity>MAX_SANITY){ch.sanity=MAX_SANITY;}
				break;
			case 'skill_amount':
				ch.skill_amount+=amount;
				if(ch.skill_amount<0){ch.skill_amount=0;}
				if(ch.skill_amount>MAX_ABILITY_POINTS){ch.skill_amount=MAX_ABILITY_POINTS;}
				break;
			case 'attack':
				ch.attack+=amount;
				if(ch.attack<1){
					ch.attack = 1;//1 is min, no max
				}
				break;
		}
		}
	},
	
	selectVisitTown: (G, ctx, town)=>{
		if(G.visitDone){
			return INVALID_MOVE;//cannot visit if already visited this turn
		}
		//TODO: some form of validation on town?
		G.town = town;
		const script = ScriptData[town];
		if(!script){
			console.warn("script not found:",town);
			return INVALID_MOVE;
		}
		Script.start(G, script);
		ctx.events.setActivePlayers({
			currentPlayer:'visit'
		});
	},
	selectTravelArea: (G, ctx, area)=>{
		//TODO: some form of validation on area?
		G.area = area;//move to the new area
		ctx.events.setActivePlayers({
			currentPlayer:'travel'
		});
		G.events.push({//TODO: generate events & fill with data
			kind:EVENT_TYPES.COMBAT,
			data:{
				mobs:[genEnemy(G,ctx)]
			}
		},{
			kind:EVENT_TYPES.COMBAT,
			data:{
				mobs:[genEnemy(G,ctx),genEnemy(G,ctx)]
			}
		});
	},
	endTurn:(G,ctx)=>{
		ctx.events.endTurn();
	}
};
const AssignCharacterMoves = {
	onBegin:(G,ctx)=>{//not a move, trigged by beginTurn event
		//can't call 'setStage' in onBegin, so have to call 'setActivePlayers' to do init on each turn
		ctx.events.setActivePlayers({
			currentPlayer:'assign_character'
		});
		//clear out old seats
		G.seats.driver=null;
		G.seats.navigator=null;
		G.seats.resting=null;
		G.seats.snacking=null;
		G.seats.spotting=null;
		G.characters.a.seat=null;
		G.characters.b.seat=null;
		G.characters.c.seat=null;
		G.characters.d.seat=null;
		G.characters.e.seat=null;
		G.visitDone=false;
	},
	selectSeat:(G, ctx, chName,seat) => {
		if(G.seats[seat]){
			console.warn("seat is occupied");
			return INVALID_MOVE;
		}
		if(G.characters[chName].seat){
			console.warn("character is already assigned");
			return INVALID_MOVE;
		}
		//move is valid, assign ch to seat
		G.seats[seat] = chName;
		G.characters[chName].seat = seat;
		//if all seats filled, change phase
		if(G.seats.driver && G.seats.navigator && G.seats.resting && 
		   G.seats.snacking && G.seats.spotting ){
			ctx.events.endStage();
			Animator.addAnimation(ANIMATION_KIND.SHOW_SEAT_EFFECT);
		}
	},
};
const SeatEffectMoves = {
	ok:(G, ctx, ) => {
		//trigger when animation is done
		
		//driver
		//add fatigue to driver
		G.characters[G.seats.driver].fatigue += 1;
		//if impaired (max fatigue or low sanity), fill damage to all party members
		if(G.characters[G.seats.driver].fatigue > MAX_FATIGUE){//if you're now over max fatigue
			alert("Driver has maximum fatigue!! Don't drive while tired");
			G.characters[G.seats.driver].fatigue = MAX_FATIGUE;//set limit
			//do damage to each character
			changeHp(G.characters.a,-10);
			changeHp(G.characters.b,-10);
			changeHp(G.characters.c,-10);
			changeHp(G.characters.d,-10);
			changeHp(G.characters.e,-10);
			changeHp(G.characters.a,1);
			changeHp(G.characters.b,1);
			changeHp(G.characters.c,1);
			changeHp(G.characters.d,1);
			changeHp(G.characters.e,1);
		}
		if(G.characters[G.seats.driver].sanity <=0){
			alert("Driver has low sanity!! Don't drive under the influence");
			//do damage to each character
			changeHp(G.characters.a,-10);
			changeHp(G.characters.b,-10);
			changeHp(G.characters.c,-10);
			changeHp(G.characters.d,-10);
			changeHp(G.characters.e,-10);
			changeHp(G.characters.a,1);
			changeHp(G.characters.b,1);
			changeHp(G.characters.c,1);
			changeHp(G.characters.d,1);
			changeHp(G.characters.e,1);
		}
		
		//navigator. -sanity, +ability point
		G.characters[G.seats.navigator].sanity -= 1;
		if(G.characters[G.seats.navigator].sanity<=0){
			G.characters[G.seats.navigator].sanity=0;
		}
		G.characters[G.seats.navigator].ability_points+=1;
		if(G.characters[G.seats.navigator].ability_points>MAX_ABILITY_POINTS){
			G.characters[G.seats.navigator].ability_points=MAX_ABILITY_POINTS;
		}
		
		//resting, recover fatigue
		G.characters[G.seats.resting].fatigue = 0;
		
		//snacking, recover HP
		changeHp(G.characters[G.seats.snacking],3);
		
		//spotting, recover sanity
		G.characters[G.seats.spotting].sanity = MAX_SANITY;
		
		//seat effects done, progress to next stage
		ctx.events.endStage();
		G.abilities.push(getAbility(ctx));
		Animator.addAnimation(ANIMATION_KIND.DRAW_CARD);
	},
};
const VisitMoves = {
	//event script processing
	
	//TODO: validate that the action chosen actually matches the current script line
	
	//how to progress past script lines that have 'stopRendering' set
	pause:(G, ctx) => {//if the event was a 'pause',continue
		const s= Script.getCurrentWaitingAction(G);
		if(s.kind!=SCRIPT_KIND.PAUSE){return INVALID_MOVE;}
		Script.actionContinue(G);
	},
	
	//commit to a choice and progress the script
	choice:(G,ctx,jumpLabel) => {
		const s= Script.getCurrentWaitingAction(G);
		if(s.kind!=SCRIPT_KIND.CHOICE){return INVALID_MOVE;}
		Script.actionJump(G,jumpLabel);
	},
	//action, change stats and progress
	action:(G,ctx)=>{
		const s= Script.getCurrentWaitingAction(G);//TODO: if not 'action', invalid move
		if(s.kind!=SCRIPT_KIND.ACTION){return INVALID_MOVE;}
		for(const action of s.data){
			switch(action.kind){
				case ACTION_KIND.DRAW:
					for(let i=0;i<action.value;i+=1){
						G.abilities.push(getAbility(ctx));
					}
					break;
				case ACTION_KIND.GAIN_KEYWORD:
					G.quest_flags[action.value]=true;
					break;
				case ACTION_KIND.STAT:
					switch(action.stat){
						case "fatigue":
							G.characters[action.character].fatigue+=action.value;
							if(G.characters[action.character].fatigue<0){G.characters[action.character].fatigue=0;}
							if(G.characters[action.character].fatigue>MAX_FATIGUE){G.characters[action.character].fatigue=MAX_FATIGUE;}
							break;
						case "sanity":
							G.characters[action.character].sanity+=action.value;
							if(G.characters[action.character].sanity<0){G.characters[action.character].sanity=0;}
							if(G.characters[action.character].sanity>MAX_SANITY){G.characters[action.character].sanity=MAX_SANITY;}
							break;
						break;
						case "hp":
							changeHp(G.characters[action.character],action.value);
							break;
						default:
						console.warn("unkonwn stat:",action);
					}
					break;
				default:
				console.warn("unknown action kind",action);
			}
			//Animator.addAnimation(ANIMATION_KIND.ACTION_EFFECT,action);//not inplemented
		}
		//progress past action
		Script.actionContinue(G);
	},
	//skill check, input is a list of characters to use for the check
	skillCheck:(G,ctx,characters)=>{
		/*
		kind,
		amount:check.amount,   //value for skill check
		skill:check.skill,     //which skill to test
		success:check.success, //label of success condition
		fail:check.fail,       //label of fail condition
		*/
		let checkAmount = 0;
		const s= Script.getCurrentWaitingAction(G);
		if(s.kind!=SCRIPT_KIND.SKILL_CHECK){return INVALID_MOVE;}
		//TODO: if character.skill != s.skill, invalid move
		//TODO: [characters] should be a set (no picking the same character twice)
		for(const chName of characters){
			checkAmount+=1;//at least 1 point, even if they don't have that skill
			const ch = G.characters[chName];
			ch.fatigue+=1;
			if(ch.skill_type == s.skill){
				checkAmount+=ch.skill_amount;
			}
		}
		const rollBuff = ctx.random.D6();
		//push an animation for the roll
		Animator.addAnimation(ANIMATION_KIND.DIE_ROLL,{
			amount:rollBuff,
			win:(checkAmount>=s.amount)
		});
		checkAmount+=rollBuff;
		if(checkAmount>=s.amount){
			Script.actionJump(G,s.success);
		}else{
			Script.actionJump(G,s.fail);
		}
	},
	done:(G, ctx) => {//end the script, back out of the current stage
		const s= Script.getCurrentWaitingAction(G);
		if(s.kind!=SCRIPT_KIND.DONE){return INVALID_MOVE;}
		Script.actionDone(G);
		G.visitDone = true;
		ctx.events.endStage();
	},
};
const TravelMoves = {
	travel:(G,ctx)=>{
		if(G.events.length){
			//todo: read from the event then set the stage to that evt
			const evt = G.events[0];
			if(evt.kind == "combat"){//TODO: change to const with switch statement.
				ctx.events.setActivePlayers({
					currentPlayer:'combat'
				});
			}
		}else{
			//no more events, finish travel & end turn
			ctx.events.endTurn();
		}
	},
};
const CombatMoves = {
	attack:(G,ctx,chName,fatigue,sanity)=>{
		const ch = G.characters[chName];
		if(ch.hp<=0){return INVALID_MOVE;}
		if(ch.fatigue + fatigue>MAX_FATIGUE){return INVALID_MOVE;}
		if(ch.sanity - sanity<0){return INVALID_MOVE;}
		if(fatigue + sanity<=0){return INVALID_MOVE;}
		const evt = G.events[0];
		const mob = evt.data.mobs[0];
		if(mob.hp<=0){return INVALID_MOVE;}//can't attack if last mob defeated
		ch.sanity-=sanity;
		ch.fatigue+=fatigue;
		const dmg = ch.attack + ((fatigue + sanity) -1);
		mob.hp -= dmg;
		if(mob.hp>0){//counterattack
			changeHp(ch,-mob.attack);
		}
		if(mob.hp<=0){
			mob.hp=0;
			if(evt.data.mobs.length>1){//if there's more left, move to next mob
				evt.data.mobs.shift();
			}
		}
		Animator.addAnimation(ANIMATION_KIND.ATTACK,{
			character:chName,
			damage:dmg,
			counterDmg:(mob.hp>0?mob.attack:0),
			mob: {//clone mob so that proxy is resolved
			hp:mob.hp,attack:mob.attack,name:mob.name,hp_max:mob.hp_max},
			fatigue,sanity
		});
	},
	//TODO: run?
	endCombat:(G,ctx)=>{//TODO: actual moves that are possible in combat...
		const evt = G.events[0];
		for(const mob of evt.data.mobs){
			if(mob.hp>0){return INVALID_MOVE;}
		}
		//TODO: success/failure?
		G.events.shift();//remove this event
		//move back into the travel state to see if we're done or not
		ctx.events.setActivePlayers({
			currentPlayer:'travel'
		});
	},
};

const GameState = {
 // seed:42,
  setup: () => {
	  return { 
	  characters:{
		  'a':{
			  name:"ch -a ",
			  ability_points:MAX_ABILITY_POINTS-1,
			  hp:6,
			  hp_max:6,
			  fatigue:0,
			  sanity:MAX_SANITY,
			  skill_type:SKILLS.STR,
			  skill_amount:1,
			  attack:1,
			  seat:null
		  },
		  'b':{
			  name:"ch -b ",
			  ability_points:MAX_ABILITY_POINTS-1,
			  hp:5,
			  hp_max:5,
			  fatigue:0,
			  sanity:MAX_SANITY,
			  skill_type:SKILLS.INT,
			  skill_amount:1,
			  attack:2,
			  seat:null
		  },
		  'c':{
			  name:"ch -c ",
			  ability_points:MAX_ABILITY_POINTS-1,
			  hp:4,
			  hp_max:4,
			  fatigue:0,
			  sanity:MAX_SANITY,
			  skill_type:SKILLS.BRV,
			  skill_amount:1,
			  attack:3,
			  seat:null
		  },
		  'd':{
			  name:"ch -d ",
			  ability_points:MAX_ABILITY_POINTS-1,
			  hp:3,
			  hp_max:3,
			  fatigue:0,
			  sanity:MAX_SANITY,
			  skill_type:SKILLS.STR,
			  skill_amount:1,
			  attack:4,
			  seat:null
		  },
		  'e':{
			  name:"ch -e ",
			  ability_points:MAX_ABILITY_POINTS-1,
			  hp:2,
			  hp_max:2,
			  fatigue:0,
			  sanity:MAX_SANITY,
			  skill_type:SKILLS.INT,
			  skill_amount:1,
			  attack:5,
			  seat:null
		  },
	  },
	  seats:{//assign character names to seats
		  driver:null,
		  navigator:null,
		  resting:null,
		  snacking:null,
		  spotting:null
	  },
	  abilities:[],//cards in hand for use at any time, i.e. player inventory
	  events:[],//when travelling, populate and then do the events stored here
	  area:'areaE',//which region the car is currently in (TODO: define regions containing a list of towns)
	  town:'hotel',//which town within a region the car is at
	  quest_flags:{},//object containg accepted/completed quests
	  visitDone:false,//flag, only allow up to 1 visit per turn, then block
	  };
  
  },
  turn: {
	onBegin:AssignCharacterMoves.onBegin,
	stages:{
		assign_character:{
			moves:{selectSeat:AssignCharacterMoves.selectSeat},
			minMoves:5,
			maxMoves:5,
			next:'do_seat_effects'
		},
		do_seat_effects:{
			moves:{ok:SeatEffectMoves.ok},
			minMoves:1,
			maxMoves:1,
			//no 'next', drop to global stage
		},
		visit:{//script actions that can be taken
			moves:{
				pause:VisitMoves.pause,
				choice:VisitMoves.choice,
				action:VisitMoves.action,
				skillCheck:VisitMoves.skillCheck,
				done:VisitMoves.done
			}
		},
		travel:{
			moves:{travel:TravelMoves.travel}
		},
		combat:{
			moves:{
				attack:CombatMoves.attack,
				endCombat:CombatMoves.endCombat
			}
		},
		
	},
  },
  
  phases:{
	loading:{
		moves:{endPhase:PhaseMoves.endPhase},
		start:true,
		next:'tutorial',
		//custom empty turn so that the initial game state does not trigger until out of this stage
		turn: {
			stages:{},
		},
	},
	tutorial:{
		moves:{endPhase:PhaseMoves.endPhase,
			pause:VisitMoves.pause,
			choice:VisitMoves.choice,
			done:PhaseMoves.done
		},
		next:'playing',
		//custom empty turn so that the initial game state does not trigger until out of this stage
		turn: {
			stages:{},
		},
	},
	playing:{}//the actual game begins here, no specification on move/turn drops back to global definitions above
  },
  
  
  moves: GlobalMoves
};





export { GameState };

