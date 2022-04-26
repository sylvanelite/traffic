
const AreaData = {};

const areaA = {
	name:'areaA',//TODO: render data (x,y, icon,etc?)
	towns:[
		{name:'townA'}//TODO: render data (x,y, icon,etc?)
	],
	neighbours:[{
		name:'areaB',//TODO: render data (x,y, icon,etc?)
	}],
};
const areaB = {
	name:'areaB',//TODO: render data (x,y, icon,etc?)
	towns:[
		{name:'townB'}//TODO: render data (x,y, icon,etc?)
	],
	neighbours:[{
		name:'areaA',//TODO: render data (x,y, icon,etc?)
	}],
};


AreaData.areaA = areaA;
AreaData.areaB = areaB;

export {AreaData};
