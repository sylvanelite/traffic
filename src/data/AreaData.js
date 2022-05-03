
const STAR_NONE='<none>';

const AreaData = {};

const areaA = {
	name:'areaA',//TODO: render data (x,y, icon,etc?)
	towns:[
	{name:'hospital',display:'54',
	starA:'first_visit',starB:'script_a_complete',starC:STAR_NONE,
	x:421,y:144
	},
	{name:'a_15',display:'15',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:119,y:276
	},
	{name:'a_17',display:'17',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:277,y:270
	},
	{name:'a_16',display:'16',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:277,y:330
	},
	{name:'a_18',display:'18',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:409,y:274
	},
	{name:'a_19',display:'19',
	starA:STAR_NONE,starB:STAR_NONE,starC:STAR_NONE,
	x:554,y:337
	},
	
	
		{name:'townA',display:'townA',
		starA:STAR_NONE,//keyword to lock/unlock a star, or none to hide star completely
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,//location of the town icon
		y:0
		}//TODO: render data 
	],
	neighbours:[{display:'area B',
		name:'areaB',//TODO: render data (x,y, icon,etc?)
	}],
};
const areaB = {
	name:'areaB',//TODO: render data (x,y, icon,etc?)
	towns:[
		{name:'townB',display:'townB',
		starA:STAR_NONE,
		starB:STAR_NONE,
		starC:STAR_NONE,
		x:0,
		y:0
		}//TODO: render data (x,y, icon,etc?)
	],
	neighbours:[{display:'area A',
		name:'areaA',//TODO: render data (x,y, icon,etc?)
	}],
};


AreaData.areaA = areaA;
AreaData.areaB = areaB;

export {AreaData,STAR_NONE};
