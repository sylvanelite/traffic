
const STAR_NONE='<none>';

const AreaData = {};

const TRAVEL_LEFT={x:0,y:250};
const TRAVEL_RIGHT={x:650,y:250};
const TRAVEL_UP={x:200,y:100};
const TRAVEL_DOWN={x:325,y:390};

const areaA = {
	name:'areaA',//TODO: render data (x,y, icon,etc?)
	towns:[
	{name:'quest_18',display:'15',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:119,y:276
	},
	{name:'quest_17',display:'17',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:277,y:270
	},
	{name:'lesson_A',display:'DRAGON',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:277,y:330
	}
	],
	neighbours:[{display:'area B',
		name:'areaB',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y
	},{display:'area D',
		name:'areaD',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
};
const areaB = {
	name:'areaB',
	towns:[
		{name:'quest_16',display:'quest_16',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,
		y:0
		},
		{name:'hospital',display:'hospital',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'quest_15',display:'quest_15',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:200,
		y:200
		},
		{name:'lesson_B',display:'lesson_B',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:300,
		y:300
		}
	],
	neighbours:[{display:'area A',
		name:'areaA',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	},{display:'area C',
		name:'areaC',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y,
	},{display:'area E',
		name:'areaE',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
};
const areaC = {
	name:'areaC',
	towns:[
		{name:'quest_14',display:'quest_14',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,
		y:0
		},
		{name:'hotel',display:'hotel',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'quest_13',display:'quest_13',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:200,
		y:200
		},
		{name:'lesson_C',display:'lesson_C',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:250,
		y:250
		},
		{name:'quest_12',display:'quest_12',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:250,
		y:150
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
		{name:'quest_11',display:'quest_11',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,
		y:0
		},
		{name:'pub',display:'pub',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'quest_10',display:'quest_10',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:200,
		y:200
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
		{name:'quest_9',display:'quest_9',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,
		y:0
		},
		{name:'hotel',display:'hotel',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'quest_8',display:'quest_8',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:200,
		y:200
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
		{name:'quest_7',display:'quest_7',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,
		y:0
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
		x:300,
		y:300
		},
		{name:'quest_6',display:'quest_6',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:200,
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
		{name:'quest_5',display:'quest_5',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,
		y:0
		},
		{name:'quest_4',display:'quest_4',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:200,
		y:200
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
		{name:'quest_3',display:'quest_3',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,
		y:0
		},
		{name:'pub',display:'pub',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:100,
		y:100
		},
		{name:'quest_2',display:'quest_2',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:200,
		y:200
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
		{name:'quest_1',display:'quest_1',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,
		y:0
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
