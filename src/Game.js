//

//https://boardgame.io/documentation/#/
import { INVALID_MOVE } from 'boardgame.io/core';


const SKILLS = {
	STR:'STR',
	BRV:'BRV',
	INT:'INT'
};
const MAX_SANITY = 5;
const MAX_FATIGUE = 3;
const MAX_ABILITY_POINTS = 4;

const GlobalMoves = {
	//TODO: put action card abilities here.	
	clickCell: (G, ctx, x,y) => {
		//G.cells[id] = ctx.currentPlayer;
		console.log(x,y);
		return INVALID_MOVE;
	},
	selectVisitTown: (G, ctx, town)=>{
		//TODO: some form of validation on town?
		G.town = town;
		client.events.setStage('visit');
	},
	selectTravelArea: (G, ctx, area)=>{
		//TODO: some form of validation on area?
		G.area = area;
		client.events.setStage('travel');
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
		//essentially a no-op, trigger when animation is done
		ctx.events.endStage();
	},
};
const DrawAbilityMoves = {
	ok:(G, ctx, ) => {
		//essentially a no-op, trigger when animation is done
		ctx.events.endStage();
	},
};
const VisitMoves = {
	//TODO: event script processing
};

const GameState = {
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
	  area:1,//which region the car is currently in (TODO: define regions containing a list of towns)
	  town:1,//which town within a region the car is at
	  quest_flags:{}//object containg accepted/completed quests
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
		visit:{//DrawAbilityMoves
			//moves:{}
		},
		travel:{
			//moves:{}
		},
		combat:{
			//moves:{}
		},
		
	},
  },
  
  moves: GlobalMoves
};





export { GameState };

