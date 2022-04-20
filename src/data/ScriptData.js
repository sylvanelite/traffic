
const ScriptData = {};

//TODO: import/export individual scripts?
const scriptA = [
"label|start",
"text|this is a test",
"text|some more text",
'if|{"keyword":"script_a_complete","label":"end"}',

"label|first_visit",
"text|this is the first visit",
"pause|",



"label|end",
"text|all complete",
"pause|",
"text|done now",
"done|"

];
ScriptData.scriptA = scriptA;

export {ScriptData};
