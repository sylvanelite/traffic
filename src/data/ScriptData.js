
const ScriptData = {};

const tutorial = [
'label|start',
'text|After a long day player Dungeons & Dragons',
'text|You find yourself bleary-eyed',
'text|You consider driving home...',
'pause|',
'show|ui/window/dragon.png',
'text|At that moment, a Dragon appears before you',
'text|"DO NOT DRIVE TIRED"',
"text|The Dragon's voice boomed ominously",
'pause|',
"text|Suddenly, the Dragon teleports you to a new realm!",
'text|"To earn the right to drive home, ',
'text|You must redeem yourself"',
'pause|',
"text|Lead a party of 5 and visit the 8 Dragons",
"text|Each day, assign your party to seats of your car",
"text|Then drive to a new area",
'pause|',
"text|While you may have fun exploring",
"text|You'll never clear this realm unless you drive safe",
"text|HP doesn't matter",
"text|Fatigue and Sanity are king",
'pause|',
'label|tutorial',
'text|tutorial:',
`choice|[
	{"text":"Fatigue?","label":"tutorial_fatigue"},
	{"text":"Sanity?","label":"tutorial_sanity"},
	{"text":"Skill Checks?","label":"tutorial_skill"},
	{"text":"Combat?","label":"tutorial_combat"},
	{"text":"-done-","label":"tutorial_end"}
	]`,
'pause|',
'label|tutorial_fatigue',
"text|Driving while tired is a serious danger",
"text|Not just in-game, but in real life too",
'pause|',
"text|Characters can gain fatigue when doing:",
"text|- Driving",
"text|- Combat",
"text|- Skill Checks",
'pause|',
"text|Fatigue can be restored by:",
"text|- Resting",
"text|- Staying at hotels",
'pause|',
"text|Fatigue has no negative effects, EXCEPT",
"text|to the character assigned to be a driver.",
'pause|',
"jump|tutorial",//NOTE: loop

'label|tutorial_sanity',
"text|Sanity reflects how perceptive you are",
"text|Low sanity indicates conditions similar to",
"text|Driving Under the Influence.",
'pause|',
"text|Characters can lose sanity doing arbitrary actions.",
"text|Alochol is a common loss of perception,",
"text|but many other causes exist.",
'pause|',
"text|Sanity can recover quickly.",
"text|But you must not drive when depleted.",
'pause|',
"jump|tutorial",//NOTE: loop

'label|tutorial_skill',
"text|Skill checks exist in the game",
"text|Each character has points in 1 of 3 skills:",
"text|- Bravery",
"text|- Intelligence",
"text|- Strength",
'pause|',
"text|If you are shown a skill check,",
"text|Click on a character to add them to the check",
"text|You get at least 1 point even if their skill doesn't match",
"text|Then a dice will be rolled to see if you pass or fail",
"text|Adding characters costs 1 Fatigue.",
'pause|',
"jump|tutorial",//NOTE: loop

'label|tutorial_combat',
"text|During combat, you can attack using",
"text|- Fatigue",
"text|- Sanity",
"text|If you run out, that character can't attack",
"pause|",
"text|If your attack doesn't defeat a foe, ",
"text|it will counterattack.",
"text|A character with 0 HP cannot attack,",
"text|But HP has no impact outside of combat",
'pause|',
"jump|tutorial",//NOTE: loop

'label|tutorial_end',
'text|Review turn order',
'done|'
];

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
'text|A large chest is buried in the ground',
'text|Can you dig it up?',
'text|skill check, 6 strength',
'skill_check|{"amount":"6","skill":"STR","success":"script_success","fail":"script_fail"}',
'pause|',
'label|script_success',
'text|you dug up the chest',
"text|<unlocked quest: buried treasure>",
`action|[
	{"kind":"gain_keyword","value":"buried_treasure"}
	]`,
'text|inside is a simple pin with a yellow ribbon',
'text|this was a symbol of road safety.',
"text|you hold on to it, it's message is important.",
'jump|done',
'label|script_fail',
'text|you could not dig up the chest',
'label|done',
'text|your party leaves the dig site',
'done|'
];

const quest_15 = [
'label|start',
'text|A misty hill conceals a small house',
'text|Outside the house, a man works the yard',
'pause|',
'text|"hello!"',
'text|the man is eager to greet you',
'text|you approach the man',
'pause|',
"text|'I've been digging my yard for some time'",
"text|'but I can't remember where it's gone'",
"text|'... it must be this mist?'",
'pause|',
'text|the mist causes monsters to form',
'text|I once had a symbol that could dispell the mist',
'pause|',
'if|{"keyword":"buried_treasure","label":"script_buried_treasure"}',
'jump|done',
'label|script_buried_treasure',
'text|you show the man the pin you found',
'text|"yes, remember that"',
'text|the man if visibility relieved',
'text|I can now show you how to get through fog.',
'pause|',
'text|drive using headlights.',
'text|keep your distance from those in front.',
'text|As a rule of thumb. keep at least 3 sconds away',
'text|Keep your speed low',
"text|<unlocked quest: dispell mist>",
`action|[
	{"kind":"gain_keyword","value":"dispell_mist"}
	]`,
'label|done',
'text|you thank the man an leave',
'done|'
];

const quest_14 = [
'label|start',
'text|A stone tablet lies before you',
'text|SEEK THE TENENTS',
'pause|',
'text|The simple text was reassuring',
'text|It was advice about this realm.',
'text|If you gain the tenents, you can return.',
'pause|',
'text|perhaps there was more to this tablet?',
`choice|[
	{"text":"Investigate","label":"script_choiceyes"},
	{"text":"Leave","label":"script_choiceno"}
	]`,
'label|script_choiceyes',
'text|Can you dig it up?',
'text|skill check, 4 intelligence',
'skill_check|{"amount":"4","skill":"INT","success":"script_success","fail":"script_fail"}',
'label|script_success',
'text|your party finds the stone is cold',
'text|holding the tablet for a while warms it up',
'text|slowly, new words appear',
'pause|',
'text|THERE ARE 8 TENENTS',
'text|FIND THEM ALL',
'text|AND RETURN TO YOUR REALM',
"text|<unlocked quest: stone tablet>",
`action|[
	{"kind":"gain_keyword","value":"stone_tablet"}
	]`,
'pause|',
'jump|script_choiceno',
'label|script_fail',
'text|You find nothing of interest.',
'label|script_choiceno',
'text|You leave the area.',
'done|'
];

const quest_13 = [
'label|start',
'text|At the side of the road,',
'text|there is a small passageway.',
'text|Witches Hats shield the path from traffic.',
'pause|',
'text|With fast-flowing traffic nearby,',
'text|you need a bit of bravery to go inside',
'pause|',
'text|skill check, 5 bravery',
'skill_check|{"amount":"5","skill":"BRV","success":"script_success","fail":"script_fail"}',
'pause|',
'label|script_success',
'text|traffice spot you and slow down',
'text|if everyone acted like this, ',
"text|bravery wouldn't be needed at the roadside",
'pause|',
'text|Inside the passage is a set of spell runes',
"text|<unlocked quest: spell rules>",
`action|[
	{"kind":"gain_keyword","value":"spell_rules"}
	]`,
'jump|done',
'label|script_fail',
"text|cars see you, but don't slow down",
'text|if everyone was just a little more patient,',
'text|you would be able to clear this passage easily',
'pause|',
"text|due to the insanity of greedy drivers",
"text|your party suffers a debuff",
"text|<-1 sanity to party>",
`action|[
	{"kind":"stat","stat":"sanity","value":-1,"character":"a"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"b"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"c"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"d"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"e"}
	]`,

'label|done',
'text|You leave the area',
'done|'
];

const quest_12 = [
'label|start',
'text|You pull up to a forest lookout',
'text|The scenery is nice and refreshing',
'pause|',
'text|something looks odd about the forest',
'text|You can either try and figure it out',
'text|by observing from the lookout',
'text|or wandering through on foot',
`choice|[
	{"text":"Yes","label":"script_choiceabove"},
	{"text":"No","label":"script_choicebelow"}
	]`,
'label|script_choiceabove',
'text|skill check: 3 intelligence',
'skill_check|{"amount":"3","skill":"INT","success":"script_success","fail":"script_fail"}',
'label|script_success',
'text|you figure out that the forest is cursed',
'text|if you had entered on foot,',
'text|it would have cost sanity.',
'pause|',
"text|<unlocked quest: forest>",
`action|[
	{"kind":"stat","stat":"sanity","value":-1,"character":"a"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"b"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"c"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"d"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"e"},
	{"kind":"gain_keyword","value":"forest"}
	]`,
'jump|done',
'label|script_fail',
'text|you figure nothing out',
'pause|',
'jump|done',
'label|script_choicebelow',
'text|the forest is creepy.',
'text|the forest is creepy..',
'text|the forest is creepy...',
'pause|',
'text|the forest is creepy...',
'text|the forest is creepy..',
'text|the forest is creepy.',
'pause|',
'text|the forest is creepy.',
"text|<unlocked quest: forest>",
"text|<debuff: -1 sanity to party>",
`action|[
	{"kind":"stat","stat":"sanity","value":-1,"character":"a"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"b"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"c"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"d"},
	{"kind":"stat","stat":"sanity","value":-1,"character":"e"},
	{"kind":"gain_keyword","value":"forest"}
	]`,
'label|done',
'text|You leave the forest.',
'done|'
];

const quest_11 = [
'label|start',
'text|a sign simply points ahead',
'text|it shows a picture of a forest',
'if|{"keyword":"forest","label":"script_forest"}',
'text|what could it mean?',
'jump|done',
'pause|',
'label|forest',
'text|having visited the cursed forest',
'text|your party works out the sign',
'label|done',
'text|You leave the area',
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



const lesson_E = [
'label|start',
'text|You find a Dragon!',
'if|{"keyword":"lesson_A","label":"script_a"}',
'jump|missing',
'label|script_a',
'if|{"keyword":"lesson_B","label":"script_b"}',
'jump|missing',
'label|script_b',
'if|{"keyword":"lesson_C","label":"script_c"}',
'jump|missing',
'label|script_c',
'if|{"keyword":"lesson_D","label":"script_d"}',
'jump|missing',
'label|script_d',
'if|{"keyword":"lesson_F","label":"script_f"}',
'jump|missing',
'label|script_f',
'if|{"keyword":"lesson_G","label":"script_g"}',
'jump|missing',
'label|script_g',
'if|{"keyword":"lesson_H","label":"script_h"}',
'jump|missing',
'label|script_h',
'if|{"keyword":"lesson_I","label":"script_i"}',
'jump|missing',
'label|script_i',
'text|CONGRATULATIONS!',
'text|You have cleared the game!',
'text|Thank you for playing',
'pause|',
'text|I hope you enjoyed the game',
'text|Please keep the road safety messages in mind',
'text|You can continue playing if you wish',
'pause|',
'jump|done',
'label|missing',
'text|you do not have all the tenents.',
'text|Return when you have them.',
'pause|',
'jump|done',
'label|done',
'text|you thank the Dragon and leave.',
'done|'
];


const lesson_A = [
'label|start',
'show|ui/window/dragon.png',
'if|{"keyword":"lesson_A","label":"script_firstvisit"}',
'text|You find a Dragon!',
'text|The Dragon looks at your party and says:',
'text|You have done well to look after your party,',
'text|But do not forget the others in this realm.',
'pause|',
'show|ui/window/dragon.png',
'text|While your party fights after travelling,',
'text|Other drivers are considerate and do not interfere',
'pause|',
'show|ui/window/dragon.png',
'text|Keep this lesson in mind:',
'label|script_firstvisit',
'text|I will protect all vulnerable road users,',
'text|especially those whose job places them in harm’s way',
'if|{"keyword":"lesson_A","label":"done"}',
'pause|',
'show|ui/window/dragon.png',
"text|!!unlocked tenent!!",
`action|[
	{"kind":"gain_keyword","value":"lesson_A"}
	]`,
'label|done',
'text|you thank the Dragon and leave.',
'done|'
];
const lesson_B = [
'label|start',
'show|ui/window/dragon.png',
'if|{"keyword":"lesson_B","label":"script_firstvisit"}',
'text|You find a Dragon!',
'text|The Dragon looks at your party and says:',
'text|You have done well to look after your party,',
'text|by not driving while tired.',
'pause|',
'show|ui/window/dragon.png',
'text|Do NOT "push through" fatigue',
'text|even if you only have a little way to go',
'text|Take a rest, even just a short one',
'text|If you find yourself yawning, rest IMMEDIATELY.',
'text|No excuses.',
'pause|',
'show|ui/window/dragon.png',
'text|Keep this lesson in mind:',
'label|script_firstvisit',
'text|I will not put other people at risk ',
'text|by driving while tired',
'if|{"keyword":"lesson_B","label":"done"}',
'pause|',
'show|ui/window/dragon.png',
"text|!!unlocked tenent!!",
`action|[
	{"kind":"gain_keyword","value":"lesson_B"}
	]`,
'label|done',
'text|you thank the Dragon and leave.',
'done|'
];
const lesson_C = [
'label|start',
'show|ui/window/dragon.png',
'if|{"keyword":"lesson_C","label":"script_firstvisit"}',
'text|You find a Dragon!',
'text|The Dragon looks at your party and says:',
'text|You have done well to look after your party,',
'text|But do not forget the others in this realm.',
'pause|',
'show|ui/window/dragon.png',
'text|While your party explores,',
'text|Others continue their jobs.',
'text|Keep this lesson in mind:',
'label|script_firstvisit',
'text|I will protect all vulnerable road users,',
'text|by slowing down',
'text|and giving them the space they need to be safe.',
'if|{"keyword":"lesson_C","label":"done"}',
'pause|',
'show|ui/window/dragon.png',
"text|!!unlocked tenent!!",
`action|[
	{"kind":"gain_keyword","value":"lesson_C"}
	]`,
'label|done',
'text|you thank the Dragon and leave.',
'done|'
];
const lesson_D = [
'label|start',
'show|ui/window/dragon.png',
'if|{"keyword":"lesson_D","label":"script_firstvisit"}',
'text|You find a Dragon!',
'text|The Dragon looks at your party and says:',
'text|You have done well to look after your party,',
'text|by not driving under the influence.',
'pause|',
'show|ui/window/dragon.png',
'text|Do NOT think you are "probably ok" to drive',
'text|Get a sober bob. ',
'text|And not just when visiting the pub',
'text|If you are having anesthetic or medication.',
'text|Organise another driver before going.',
'pause|',
'show|ui/window/dragon.png',
'text|Keep this lesson in mind:',
'label|script_firstvisit',
'text|I will not put other people at risk ',
'text|by driving under the influence of alcohol/drugs.',
'if|{"keyword":"lesson_D","label":"done"}',
'pause|',
'show|ui/window/dragon.png',
"text|!!unlocked tenent!!",
`action|[
	{"kind":"gain_keyword","value":"lesson_D"}
	]`,
'label|done',
'text|you thank the Dragon and leave.',
'done|'
];
const lesson_F = [
'label|start',
'show|ui/window/dragon.png',
'if|{"keyword":"lesson_F","label":"script_firstvisit"}',
'text|You find a Dragon!',
'text|The Dragon looks at your party and says:',
'text|You have done well to look after your party,',
'text|by not being distracted while driving',
'pause|',
'show|ui/window/dragon.png',
'text|No message you get is worth checking your phone',
'text|while behind the wheel.',
'text|Just pull up and check it later.',
'pause|',
'show|ui/window/dragon.png',
'text|Keep this lesson in mind:',
'label|script_firstvisit',
'text|I will never use my mobile phone while driving.',
'if|{"keyword":"lesson_F","label":"done"}',
'pause|',
'show|ui/window/dragon.png',
"text|!!unlocked tenent!!",
`action|[
	{"kind":"gain_keyword","value":"lesson_F"}
	]`,
'label|done',
'text|you thank the Dragon and leave.',
'done|'
];
const lesson_G = [
'label|start',
'show|ui/window/dragon.png',
'if|{"keyword":"lesson_G","label":"script_firstvisit"}',
'text|You find a Dragon!',
'text|The Dragon looks at your party and says:',
'text|You have done well to look after your party,',
'text|by not being distracted while driving',
'pause|',
'show|ui/window/dragon.png',
"text|Focus on the road. That's the driver's job.",
"text|It's easy for small distractions to cause big problems.",
'text|Even just "Rubbernecking" can needlessly excelate small incidents.',
'pause|',
'show|ui/window/dragon.png',
'text|Keep this lesson in mind:',
'label|script_firstvisit',
'text|I will remove all distractions while driving.',
'if|{"keyword":"lesson_G","label":"done"}',
'pause|',
'show|ui/window/dragon.png',
"text|!!unlocked tenent!!",
`action|[
	{"kind":"gain_keyword","value":"lesson_G"}
	]`,
'label|done',
'text|you thank the Dragon and leave.',
'done|'
];
const lesson_H = [
'label|start',
'show|ui/window/dragon.png',
'if|{"keyword":"lesson_H","label":"script_firstvisit"}',
'text|You find a Dragon!',
'text|The Dragon looks at your party and says:',
'text|You have done well to look after your party,',
'text|by not speeding',
'pause|',
'show|ui/window/dragon.png',
"text|Roads are rated for set speed.",
"text|Just obey it. It's not that hard.",
'text|Got cruise control? use it.',
'pause|',
'show|ui/window/dragon.png',
'text|Keep this lesson in mind:',
'label|script_firstvisit',
'text|I will not put other people at risk by speeding.',
'if|{"keyword":"lesson_H","label":"done"}',
'pause|',
'show|ui/window/dragon.png',
"text|!!unlocked tenent!!",
`action|[
	{"kind":"gain_keyword","value":"lesson_H"}
	]`,
'label|done',
'text|you thank the Dragon and leave.',
'done|'
];
const lesson_I = [
'label|start',
'show|ui/window/dragon.png',
'if|{"keyword":"lesson_I","label":"script_firstvisit"}',
'text|You find a Dragon!',
'text|The Dragon looks at your party and says:',
'text|You have done well to look after your party,',
'text|But do not forget the others in this realm.',
'pause|',
'show|ui/window/dragon.png',
"text|Roads are for everyone.",
"text|Instead of getting angry at other drivers.",
'text|Just take it easy. There are MUCH worse things',
'text|in the world recently',
'pause|',
'show|ui/window/dragon.png',
'text|Keep this lesson in mind:',
'label|script_firstvisit',
'text|I pledge to drive as if my loved ones are on the road ahead.',
'if|{"keyword":"lesson_I","label":"done"}',
'pause|',
'show|ui/window/dragon.png',
"text|!!unlocked tenent!!",
`action|[
	{"kind":"gain_keyword","value":"lesson_I"}
	]`,
'label|done',
'text|you thank the Dragon and leave.',
'done|'
];


ScriptData.tutorial = tutorial;

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
