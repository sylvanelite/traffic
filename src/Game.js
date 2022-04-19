//

//https://boardgame.io/documentation/#/

const INVALID_MOVE  = 'INVALID_MOVE';//TODO: this should be an import...

const SKILLS = {
	STR:'STR',
	BRV:'BRV',
	INT:'INT'
};
const MAX_SANITY = 5;
const MAX_FATIGUE = 3;
const MAX_ABILITY_POINTS = 4;

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
			  attack:1
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
			  attack:2
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
			  attack:3
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
			  attack:4
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
			  attack:5
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
    minMoves: 1,
    maxMoves: 1,//change each time a unit is set to wait? or just don't define at all
	//could use endTurn({ next: playerID }); instead
  },
  
  moves: {
    clickCell: (G, ctx, x,y) => {
      //G.cells[id] = ctx.currentPlayer;
	  console.log(x,y);
	  return INVALID_MOVE;
    },
  },
};





export { GameState };

