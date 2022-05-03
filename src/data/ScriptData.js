
const ScriptData = {};

//TODO: import/export individual scripts?
const townA = [
'label|start',
'text|this is a test',
'text|some more text',
'if|{"keyword":"script_a_complete","label":"end"}',

'label|first_visit',
'text|this is the first visit',
'pause|',


`choice|[
	{"text":"choose a?","label":"script_a_choicea"},
	{"text":"choose b?","label":"script_a_choiceb"}
	]`,

'label|script_a_choicea',
'text|this is choice A',
'pause|',


'label|script_a_choiceb',
'text|this is choice B',
'text|skill check, strength',
'skill_check|{"amount":"100","skill":"STR","success":"script_a_checkpass","fail":"script_a_checkfail"}',
'pause|',

'label|script_a_checkpass',
'text|you passed the skill check',
'pause|',

'label|script_a_checkfail',
'text|you failed the skill check',
'text|draw a card, ch b lose 1 sanity,',
'text|gain keyword "first_visit"',
`action|[
	{"kind":"draw","value":1},
	{"kind":"stat","stat":"sanity","value":-1,"character":"b"},
	{"kind":"gain_keyword","value":"script_a_complete"}
	]`,

'text|all complete',
'pause|',
'text|done now',
'done|'

];
const townB = [
'label|start',
'text|this is town B',
'done|'

];

const hospital = [
	'label|start',
	'text|select a character to heal (+3hp)',
	`choice|[
	{"text":"player 1","label":"script_choicea"},
	{"text":"player 2","label":"script_choiceb"},
	{"text":"player 3","label":"script_choicec"},
	{"text":"player 4","label":"script_choiced"},
	{"text":"player 5","label":"script_choicee"}
	]`,
	
	'label|script_choicea',
	'text|character 1 healing...',
	`action|[ {"kind":"stat","stat":"hp","value":3,"character":"a"} ]`,
	'jump|end',
	
	'label|script_choiceb',
	'text|character 2 healing...',
	`action|[ {"kind":"stat","stat":"hp","value":3,"character":"b"} ]`,
	'jump|end',
	
	'label|script_choicec',
	'text|character 3 healing...',
	`action|[ {"kind":"stat","stat":"hp","value":3,"character":"c"} ]`,
	'jump|end',
	
	'label|script_choiced',
	'text|character 4 healing...',
	`action|[ {"kind":"stat","stat":"hp","value":3,"character":"d"} ]`,
	'jump|end',
	
	'label|script_choicee',
	'text|character 5 healing...',
	`action|[ {"kind":"stat","stat":"hp","value":3,"character":"e"} ]`,
	'jump|end',
	
	'label|end',
	'text|Thank you!',
	'done|'
];
const hotel = [
'label|start',
'text|hotel',
'done|'
];
const pub = [
'label|start',
'text|pub',
'done|'
];

const quest_18 = [
'label|start',
'text|quest 18',
'done|'
];
const quest_17 = [
'label|start',
'text|quest 17',
'done|'
];

const quest_16 = [
'label|start',
'text|quest 16',
'done|'
];

const quest_15 = [
'label|start',
'text|quest 15',
'done|'
];

const quest_14 = [
'label|start',
'text|quest 14',
'done|'
];

const quest_13 = [
'label|start',
'text|quest 13',
'done|'
];

const quest_12 = [
'label|start',
'text|quest 12',
'done|'
];

const quest_11 = [
'label|start',
'text|quest 11',
'done|'
];

const quest_10 = [
'label|start',
'text|quest 10',
'done|'
];

const quest_9 = [
'label|start',
'text|quest 9',
'done|'
];

const quest_8 = [
'label|start',
'text|quest 8',
'done|'
];

const quest_7 = [
'label|start',
'text|quest 7',
'done|'
];

const quest_6 = [
'label|start',
'text|quest 6',
'done|'
];

const quest_5 = [
'label|start',
'text|quest 5',
'done|'
];

const quest_4 = [
'label|start',
'text|quest 4',
'done|'
];

const quest_3 = [
'label|start',
'text|quest 3',
'done|'
];

const quest_2 = [
'label|start',
'text|quest 2',
'done|'
];

const quest_1 = [
'label|start',
'text|quest 1',
'done|'
];

const lesson_A = [
'label|start',
'text|lesson A',
'done|'
];
const lesson_B = [
'label|start',
'text|lesson B',
'done|'
];
const lesson_C = [
'label|start',
'text|lesson C',
'done|'
];
const lesson_D = [
'label|start',
'text|lesson D',
'done|'
];
const lesson_E = [
'label|start',
'text|lesson E',
'done|'
];
const lesson_F = [
'label|start',
'text|lesson F',
'done|'
];
const lesson_G = [
'label|start',
'text|lesson G',
'done|'
];
const lesson_H = [
'label|start',
'text|lesson H',
'done|'
];
const lesson_I = [
'label|start',
'text|lesson I',
'done|'
];

ScriptData.townA = townA;
ScriptData.townB = townB;
ScriptData.quest_18 = quest_18;
ScriptData.quest_17 = quest_17;
ScriptData.quest_16 = quest_16;
ScriptData.quest_15 = quest_15;
ScriptData.quest_14 = quest_14;
ScriptData.quest_13 = quest_13;
ScriptData.quest_12 = quest_12;
ScriptData.quest_11 = quest_11;
ScriptData.quest_10 = quest_10;
ScriptData.quest_9 = quest_9;
ScriptData.quest_8 = quest_8;
ScriptData.quest_7 = quest_7;
ScriptData.quest_6 = quest_6;
ScriptData.quest_5 = quest_5;
ScriptData.quest_4 = quest_4;
ScriptData.quest_3 = quest_3;
ScriptData.quest_2 = quest_2;
ScriptData.quest_1 = quest_1;

ScriptData.lesson_A = lesson_A;
ScriptData.lesson_B = lesson_B;
ScriptData.lesson_C = lesson_C;
ScriptData.lesson_D = lesson_D;
ScriptData.lesson_E = lesson_E;
ScriptData.lesson_F = lesson_F;
ScriptData.lesson_G = lesson_G;
ScriptData.lesson_H = lesson_H;
ScriptData.lesson_I = lesson_I;

ScriptData.hospital = hospital;
ScriptData.hotel = hotel;
ScriptData.pub = pub;

export {ScriptData};
