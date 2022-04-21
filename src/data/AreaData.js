
const AreaData = {};

const areaA = {
	towns:['townA'],
	neighbours:['areaB'],
};
const areaB = {
	towns:['townB'],
	neighbours:['areaA'],
};


AreaData.areaA = areaA;
AreaData.areaB = areaB;

export {AreaData};
