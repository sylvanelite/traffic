//

//https://boardgame.io/documentation/#/
import { INVALID_MOVE } from 'boardgame.io/core';
import { Script,SCRIPT_KIND,ACTION_KIND } from './Script.js';
import { ScriptData } from './data/ScriptData.js';
import { AreaData } from './data/AreaData.js';

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
const getAbility = (ctx)=>{//ctx is needed for RNG
	const res = {
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
	}
	for(const stat of res.stats){
		const name = stat.name;
		const amount = stat.amount;
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
	const hp = 2+ctx.random.D4();
	const attack = ctx.random.D4();
	const name = "generic mob";
	return {
		hp,attack,name
	}
}
//constants
const SKILLS = {
	STR:'STR',
	BRV:'BRV',
	INT:'INT'
};
const MAX_SANITY = 5;
const MAX_FATIGUE = 3;
const MAX_ABILITY_POINTS = 4;
const EVENT_TYPES = {
	COMBAT:"combat",
	//TODO: others? ambulance, construction, etc?
};

const GlobalMoves = {
	//TODO: put action card abilities here.	
	selectVisitTown: (G, ctx, town)=>{
		if(G.visitDone){
			return INVALID_MOVE;//cannot visit if already visited this turn
		}
		//TODO: some form of validation on town?
		G.town = town;
		Script.start(G, ScriptData[town]);
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
		G.travelDone=false;
	},
	selectSeat:(G, ctx, chName,seat) => {
		console.log(chName,seat);
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
			G.characters[G.seats.driver].fatigue = MAX_FATIGUE;//set limit
			//do damage to each character
			changeHp(G.characters.a,1);
			changeHp(G.characters.b,1);
			changeHp(G.characters.c,1);
			changeHp(G.characters.d,1);
			changeHp(G.characters.e,1);
		}
		if(G.characters[G.seats.driver].sanity <=0){
			//do damage to each character
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
	},
};
const DrawAbilityMoves = {
	ok:(G, ctx) => {
		//trigger when animation is done
		
		console.log(ctx);
		G.abilities.push(getAbility(ctx));
		
		ctx.events.endStage();
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
						console.log("drawing card");
						G.abilities.push(getAbility(ctx));
					}
					break;
				case ACTION_KIND.GAIN_KEYWORD:
					console.log("got word:"+action.value);
					G.quest_flags[action.value]=true;
					break;
				case ACTION_KIND.STAT:
					for(let i=0;i<action.value;i+=1){
						console.log(action);
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
					}
					break;
				default:
				console.warn("unknown action kind",action);
			}
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
			const ch = G.characters[chName];
			ch.fatigue+=1;
			if(ch.skill_type == s.skill){
				checkAmount+=ch.skill_amount;
			}
		}
		console.log("skill check, characters have a total of: "+checkAmount+" of "+s.skill);
		const rollBuff = ctx.random.D4();//TODO: push some animation for the roll
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
		if(ch.fatigue + fatigue>MAX_FATIGUE){return INVALID_MOVE;}
		if(ch.sanity - sanity<0){return INVALID_MOVE;}
		if(fatigue + sanity<=0){return INVALID_MOVE;}
		ch.sanity-=sanity;
		ch.fatigue+=fatigue;
		const evt = G.events[0];
		const mob = evt.data.mobs[0];
		const dmg = ch.attack + ((fatigue + sanity) -1);
		console.log("mob taking: ",dmg,mob.hp);
		mob.hp -= dmg;
		if(mob.hp>0){//counterattack
			console.log("counterattack, character taking: ",mob.attack);
			changeHp(ch,-mob.attack);
		}
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
	  area:'areaA',//which region the car is currently in (TODO: define regions containing a list of towns)
	  town:'townA',//which town within a region the car is at
	  quest_flags:{},//object containg accepted/completed quests
	  visitDone:false,//flag, only allow up to 1 visit per turn, then block
	  travelDone:false,//flag, only allow up to 1 travel per turn, then block
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
			next:"draw_ability_card"
		},
		draw_ability_card:{
			moves:{ok:DrawAbilityMoves.ok},
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
  
  moves: GlobalMoves
};





export { GameState };

