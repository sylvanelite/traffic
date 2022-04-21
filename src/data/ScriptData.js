
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
'pause|',


'label|end',
'text|all complete',
'pause|',
'text|done now',
'done|'

];
ScriptData.scriptA = scriptA;

export {ScriptData};
