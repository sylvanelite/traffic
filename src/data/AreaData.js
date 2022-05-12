
const STAR_NONE='<none>';

const AreaData = {};

const TRAVEL_LEFT={x:0,y:259};
const TRAVEL_RIGHT={x:0,y:292};
const TRAVEL_UP={x:0,y:325};
const TRAVEL_DOWN={x:0,y:358};

const areaA = {
	name:'areaA',//TODO: render data (x,y, icon,etc?)
	towns:[
	{name:'quest_18',display:'15',
	starA:'caretaker',starB:STAR_NONE,starC:STAR_NONE,
	x:185,y:381
	},
	{name:'lesson_A',display:'DRAGON',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:538,y:250
	}
	],
	neighbours:[{display:'area B',
		name:'areaB',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y
	},{display:'area D',
		name:'areaD',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}]
};
const areaB = {
	name:'areaB',
	towns:[
	{name:'quest_17',display:'17',
		starA:'caretaker',
		starB:'hut_map',
		starC:STAR_NONE,
	x:340,y:116
	},
		{name:'hospital',display:'hospital',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:260,
		y:155
		},
		{name:'lesson_B',display:'lesson_B',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:201,
		y:357
		}
	],
	neighbours:[{display:'area A',
		name:'areaA',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	},{display:'area C',
		name:'areaC',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y,
	},{display:'area E',
		name:'areaE',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
	roads:[
	{left:201,right:556,y:357},
	{left:201,right:556,y:155},
	]
};
const areaC = {
	name:'areaC',
	towns:[
		{name:'quest_16',display:'16',
		starA:'buried_treasure',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:435,
		y:155
		},
		{name:'quest_8',display:'8',
		starA:'phone',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:456,
		y:357
		},
		{name:'hotel',display:'hotel',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:547,
		y:207
		},
		{name:'lesson_C',display:'lesson_C',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:255,
		y:279
		}
	],
	neighbours:[{display:'area B',
		name:'areaB',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	},{display:'area F',
		name:'areaF',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
};
const areaD = {
	name:'areaD',
	towns:[
		{name:'quest_15',display:'15',
		starA:'buried_treasure',
		starB:'dispell_mist',
		starC:STAR_NONE,
		x:556,
		y:357
		},
		{name:'pub',display:'pub',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'lesson_D',display:'lesson_D',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:250,
		y:250
		}
	],
	neighbours:[{display:'area A',
		name:'areaA',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area E',
		name:'areaE',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y,
	},{display:'area G',
		name:'areaG',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
};
const areaE = {
	name:'areaE',
	towns:[
		{name:'quest_9',display:'9',
		starA:'rest_stop',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:556,
		y:357
		},
		{name:'hotel',display:'hotel',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'lesson_E',display:'lesson_E',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:250,
		y:250
		}
	],
	neighbours:[{display:'area B',
		name:'areaB',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area F',
		name:'areaF',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y,
	},{display:'area D',
		name:'areaD',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	},{display:'area H',
		name:'areaH',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
};
const areaF = {
	name:'areaF',
	towns:[
		{name:'quest_13',display:'13',
		starA:'spell_rules',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:556,
		y:357
		},
		{name:'hotel',display:'hotel',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'pub',display:'pub',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:500,
		y:200
		},
		{name:'lesson_F',display:'lesson_F',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:250,
		y:250
		}
	],
	neighbours:[{display:'area C',
		name:'areaC',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area E',
		name:'areaE',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	},{display:'area I',
		name:'areaI',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
};
const areaG = {
	name:'areaG',
	towns:[
		{name:'quest_12',display:'12',
		starA:'fire',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:556,
		y:357
		},
		{name:'quest_14',display:'14',
		starA:'driveway',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:456,
		y:357
		},
		{name:'lesson_G',display:'lesson_G',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:250,
		y:250
		}
	],
	neighbours:[{display:'area D',
		name:'areaD',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area H',
		name:'areaH',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y,
	}],
};
const areaH = {
	name:'areaH',
	towns:[
		{name:'quest_11',display:'11',
		starA:'wizard',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:556,
		y:357
		},
		{name:'pub',display:'pub',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'lesson_H',display:'lesson_H',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:250,
		y:250
		}
	],
	neighbours:[{display:'area E',
		name:'areaE',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area G',
		name:'areaG',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	},{display:'area I',
		name:'areaI',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y,
	}],
};
const areaI = {
	name:'areaI',
	towns:[
		{name:'quest_10',display:'10',
		starA:'magic_poition',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:556,
		y:357
		},
		{name:'hotel',display:'hotel',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'hospital',display:'hospital',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:200,
		y:200
		},
		{name:'lesson_I',display:'lesson_I',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:250,
		y:250
		}
	],
	neighbours:[{display:'area F',
		name:'areaF',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area H',
		name:'areaH',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	}],
};




AreaData.areaA = areaA;
AreaData.areaB = areaB;
AreaData.areaC = areaC;
AreaData.areaD = areaD;
AreaData.areaE = areaE;
AreaData.areaF = areaF;
AreaData.areaG = areaG;
AreaData.areaH = areaH;
AreaData.areaI = areaI;


export {AreaData,STAR_NONE};
