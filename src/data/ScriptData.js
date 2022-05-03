
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
	'label|start',
	'text|A nice inn to stay the night',
	'pause|',
	'text|Fatigue affects driving ability.',
	'text|It can impair as much as being intoxicated.',
	'text|You have made a good choice to rest.',
	'pause|',
	'text|select a character to remove fatigue (-3)',
	`choice|[
	{"text":"player 1","label":"script_choicea"},
	{"text":"player 2","label":"script_choiceb"},
	{"text":"player 3","label":"script_choicec"},
	{"text":"player 4","label":"script_choiced"},
	{"text":"player 5","label":"script_choicee"}
	]`,
	
	'label|script_choicea',
	'text|character 1 resting...',
	`action|[ {"kind":"stat","stat":"fatigue","value":-3,"character":"a"} ]`,
	'jump|end',
	
	'label|script_choiceb',
	'text|character 2 resting...',
	`action|[ {"kind":"stat","stat":"fatigue","value":-3,"character":"b"} ]`,
	'jump|end',
	
	'label|script_choicec',
	'text|character 3 resting...',
	`action|[ {"kind":"stat","stat":"fatigue","value":-3,"character":"c"} ]`,
	'jump|end',
	
	'label|script_choiced',
	'text|character 4 resting...',
	`action|[ {"kind":"stat","stat":"fatigue","value":-3,"character":"d"} ]`,
	'jump|end',
	
	'label|script_choicee',
	'text|character 5 resting...',
	`action|[ {"kind":"stat","stat":"fatigue","value":-3,"character":"e"} ]`,
	'jump|end',
	
	'label|end',
	'text|You feel refreshed!',
	'done|'
];
const pub = [
	'label|start',
	'text|You find yourself in a pub',
	"text|The barkeep offers a great selection of drinks",
	'pause|',
	"text|Why did you enter the pub knowing you have to drive after?",
	"text|Choose a character carefully,",
	"text|You better not ask them to drive!",
	'pause|',
	'text|select a character to drink (-10 sanity)',
	`choice|[
	{"text":"player 1","label":"script_choicea"},
	{"text":"player 2","label":"script_choiceb"},
	{"text":"player 3","label":"script_choicec"},
	{"text":"player 4","label":"script_choiced"},
	{"text":"player 5","label":"script_choicee"}
	]`,

	'label|script_choicea',
	'text|character 1 is at the limit...',
	`action|[ {"kind":"stat","stat":"sanity","value":-10,"character":"a"} ]`,
	'jump|end',

	'label|script_choiceb',
	'text|character 2 is at the limit...',
	`action|[ {"kind":"stat","stat":"sanity","value":-10,"character":"b"} ]`,
	'jump|end',

	'label|script_choicec',
	'text|character 3 is at the limit...',
	`action|[ {"kind":"stat","stat":"sanity","value":-10,"character":"c"} ]`,
	'jump|end',

	'label|script_choiced',
	'text|character 4 is at the limit...',
	`action|[ {"kind":"stat","stat":"sanity","value":-10,"character":"d"} ]`,
	'jump|end',

	'label|script_choicee',
	'text|character 5 is at the limit...',
	`action|[ {"kind":"stat","stat":"sanity","value":-10,"character":"e"} ]`,
	'jump|end',

	'label|end',
	'text|Warning:Pick your sober bob carefully!',
	'done|'
];

const quest_18 = [
'label|start',
'text|You find a solemn graveyard',
'text|The hundreds of graves reveal',
'text|the lives lost in this realm',
'text|A lone caretaker',
'text|looks over the graveyard',
'pause|',
'text|Approach the caretaker?',
`choice|[
	{"text":"Yes","label":"script_choiceyes"},
	{"text":"No","label":"script_choiceno"}
	]`,
	
'label|script_choiceyes',
'text|the caretaker is a kind person.',
'text|they offer your party some advice:',
'text|"defeating monsters is not ',
'text|what felled these people"',
'text|"it was the vechicle known as a *car*"',
'pause|',
'text|Your party is now the wiser',
"text|<unlocked quest: caretaker's advice>",
`action|[
	{"kind":"gain_keyword","value":"caretaker"}
	]`,
'jump|end',

'label|script_choiceno',
'text|You decide to leave the graveyard',
'jump|end',


'label|end',
"text|Over 400 tombstone are ",
"text|from cars in the last decade. ",
'done|'
];
const quest_17 = [
'label|start',
'text|A man resides in a hut.',
'text|On the wall, you can see a map.',
'text|This map would be invaluable to your progress.',
'pause|',
'text|Your party talks to the man:',
'text|"Another set of fools"',
'text|The man is clearly disgruntled',
'pause|',
'text|"Too many adventurers rely on those machines ',
'text|you call *cars*. I will not offer aid to you."',
'pause|',
'text|Your party tries to explain that you can help.',
'text|You just need the map on his wall.',
'pause|',
'if|{"keyword":"caretaker","label":"script_caretaker"}',
"text|You don't know the dangers of that machine.",
"text|The man pointed to his map.",
"text|Visit here and speak to the caretaker.",
"text|Then I might help.",
"jump|done",
'label|script_caretaker',
"text|I see you met with the caretaker.",
"text|If you think you understand the risks if driving",
"pause|",
"text|I suppose I can offer you this map.",
"text|<unlocked quest: hut's map>",
`action|[
	{"kind":"gain_keyword","value":"hut_map"}
	]`,

"label|done",
"text|Your party leaves the hut",
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
