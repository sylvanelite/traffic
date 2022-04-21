
const ScriptData = {};

//TODO: import/export individual scripts?
const scriptA = [
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
'text|draw a card, ch b lose 1 sanity, gain keyword "first_visit"',
`action|[
	{"kind":"draw","value":1},
	{"kind":"stat","stat":"sanity","value":1,"character":"b"},
	{"kind":"gain_keyword","value":"script_a_complete"}
	]`,
'pause|',




'label|end',
'text|all complete',
'pause|',
'text|done now',
'done|'

];
ScriptData.scriptA = scriptA;

export {ScriptData};
