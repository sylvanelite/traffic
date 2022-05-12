
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
	x:259,y:122
	},
	{name:'lesson_A',display:'DRAGON',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:540,y:183
	}
	],
	neighbours:[{display:'area B',
		name:'areaB',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y
	},{display:'area D',
		name:'areaD',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
	roads:[
	{left:222,right:222+322,y:199},
	{left:222,right:222+361,y:360},
	]
};
const areaB = {
	name:'areaB',
	towns:[
	{name:'quest_17',display:'17',
		starA:'caretaker',
		starB:'hut_map',
		starC:STAR_NONE,
	x:262,y:119
	},
		{name:'hospital',display:'hospital',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:448,
		y:116
		},
		{name:'lesson_B',display:'lesson_B',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:483,
		y:298
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
	{left:201,right:556,y:325},
	{left:201,right:556,y:117},
	]
};
const areaC = {
	name:'areaC',
	towns:[
		{name:'quest_16',display:'16',
		starA:'buried_treasure',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:368,
		y:153
		},
		{name:'quest_8',display:'8',
		starA:'phone',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:544,
		y:145
		},
		{name:'hotel',display:'hotel',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:341,
		y:286
		},
		{name:'lesson_C',display:'lesson_C',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:582,
		y:288
		}
	],
	neighbours:[{display:'area B',
		name:'areaB',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	},{display:'area F',
		name:'areaF',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
	roads:[
	{left:298,right:298+368,y:246},
	]
};
const areaD = {
	name:'areaD',
	towns:[
		{name:'quest_15',display:'15',
		starA:'buried_treasure',
		starB:'dispell_mist',
		starC:STAR_NONE,
		x:373,
		y:196
		},
		{name:'pub',display:'pub',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:105,
		y:218
		},
		{name:'lesson_D',display:'lesson_D',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:450,
		y:263
		}
	],
	neighbours:[{display:'area A',
		name:'areaA',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area E',
		name:'areaE',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y,
	},{display:'area G',
		name:'areaG',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
	roads:[
	{left:187,right:187+335,y:341},
	{left:248,right:248+272,y:90},
	]
};
const areaE = {
	name:'areaE',
	towns:[
		{name:'quest_9',display:'9',
		starA:'rest_stop',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:395,
		y:92
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
		x:95,
		y:227
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
	roads:[
	{left:299,right:299+411,y:296}
	]
};
const areaF = {
	name:'areaF',
	towns:[
		{name:'quest_13',display:'13',
		starA:'spell_rules',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:544,
		y:90
		},
		{name:'hotel',display:'hotel',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:418,
		y:224
		},
		{name:'pub',display:'pub',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:194,
		y:289
		},
		{name:'lesson_F',display:'lesson_F',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:511,
		y:308
		}
	],
	neighbours:[{display:'area C',
		name:'areaC',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area E',
		name:'areaE',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	},{display:'area I',
		name:'areaI',x:TRAVEL_DOWN.x,y:TRAVEL_DOWN.y,
	}],
	roads:[
	{left:0,right:497,y:311}
	]
};
const areaG = {
	name:'areaG',
	towns:[
		{name:'quest_12',display:'12',
		starA:'fire',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:103,
		y:101
		},
		{name:'quest_14',display:'14',
		starA:'driveway',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:275,
		y:88
		},
		{name:'lesson_G',display:'lesson_G',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:632,
		y:231
		}
	],
	neighbours:[{display:'area D',
		name:'areaD',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area H',
		name:'areaH',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y,
	}],
	roads:[
	{left:215,right:215+339,y:70},
	{left:603,right:603+107,y:198},
	]
};
const areaH = {
	name:'areaH',
	towns:[
		{name:'quest_11',display:'11',
		starA:'wizard',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:334,
		y:180
		},
		{name:'pub',display:'pub',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:624,
		y:262
		},
		{name:'lesson_H',display:'lesson_H',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:109,
		y:162
		}
	],
	neighbours:[{display:'area E',
		name:'areaE',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area G',
		name:'areaG',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	},{display:'area I',
		name:'areaI',x:TRAVEL_RIGHT.x,y:TRAVEL_RIGHT.y,
	}],
	roads:[
	{left:235,right:235+154,y:181},
	{left:598,right:598+112,y:339},
	]
};
const areaI = {
	name:'areaI',
	towns:[
		{name:'quest_10',display:'10',
		starA:'magic_poition',
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:410,
		y:230
		},
		{name:'hotel',display:'hotel',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:278,
		y:111
		},
		{name:'hospital',display:'hospital',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:53,
		y:100
		},
		{name:'lesson_I',display:'lesson_I',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:132,
		y:181
		}
	],
	neighbours:[{display:'area F',
		name:'areaF',x:TRAVEL_UP.x,y:TRAVEL_UP.y,
	},{display:'area H',
		name:'areaH',x:TRAVEL_LEFT.x,y:TRAVEL_LEFT.y,
	}],
	roads:[
	{left:0,right:151,y:182},
	]
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
