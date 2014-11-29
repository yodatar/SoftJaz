/**
 * Created by pipo on 28.11.2014.
 */

/*
 .unshift()  - Inserts an element at the first position of the array:
 .shift()   -  Removes the first element of an array
*/

//globalne premenne
input = 'ahojb$';
output = [];
buffer = ['A','#'];
table = [
	{
		terminal:/ahoj/,
		columns: [
			{   nonterminal:'A',
				rule:[/ahoj/,'A'],
				ruleNum:1
			},
			{   nonterminal:'B',
				rule:[/a/,'B'],
				ruleNum:2
			}
		]
	},
	{
		terminal:/b/,
		columns: [
			{   nonterminal:'A',
				rule:[/b/],
				ruleNum:3
			},
			{   nonterminal:'B',
				rule:[/b/],
				ruleNum:4
			}
		]
	}

];


$(function() {
	printStep(); // vypis prveho stavu

	$('.start').on('click',function() {
		analyze();
	});
	$('.step').on('click',function() {
		analyzeStep();
	});
	$('.reset').on('click',function() {
		$('#inputOutput').html('');
		$('#bufferOutput').html('');
		$('#rulesOutput').html('');
		$('#errorOutput').html('');
		input = $('#input').val();
		printStep();
	});
});

function analyze() { // urobi az dokonca

	// hlavny cyklus
	while(input.length > 0) {
		if(analyzeStep()) break;
	}
}

function analyzeStep() { // urobi jeden krok

	if(exclude() == 'END') { return true; }

	try {
		var ruleCurrent = getRule(buffer[0]);
		if(! ruleCurrent) throw 'ruleNotFound';

		doStep(ruleCurrent); // daj do buffera to pravidlo

	} catch(err) {
		input = input.substr(1); // zotavenie take, ze teda kasleme na jeden znak na zaciatku inputu a ideme dalej
		printErr(err);
	} finally {
		printStep();
	}
}


function exclude() { // vylucovanie, ak su zaciatok 'buffer' a 'input' rovnake
	try {
		var matching = (buffer[0]).exec(input);
		while(matching && matching.index == 0) {
			input = input.substr(matching[0].length);
			buffer.shift();

			printStep();

			matching = (buffer[0]).exec(input);
		}
	} catch(err) {
	}

	if(buffer[0] == '#' && input[0] == '$') return 'END';
	if(buffer[0] != '#' && input[0] == '$') return 'Buffer still full, input empty';
}

function getRule(bufferCurrent) { // vrati pravidlo a cislo pravidla
	var ruleCurrent;
	for (var i=0; i < table.length ; i++) {
		var matching = (table[i].terminal).exec(input);
		if (matching && matching.index == 0) {
			for (var j=0; j < table[i].columns.length ; j++) {
				if(table[i].columns[j].nonterminal == bufferCurrent) {
					ruleCurrent = { elements: table[i].columns[j].rule, num: table[i].columns[j].ruleNum };
					$('#rulesOutput').append('<option>'+ruleCurrent.elements.join('')+', '+ruleCurrent.num+'</option>');
					return ruleCurrent;
				}
			}
		}
	}
	return ruleCurrent;
}

function doStep(ruleCurrent) { // urobi nahradenie v bufferi za pravidlo
	buffer.shift();
	buffer = ruleCurrent.elements.concat(buffer);
}

function printErr(err) {
	$('#errorOutput').append(err + '\n');

}

function printStep() {
	var bufferStr = buffer.join('');
	$('#inputOutput').append('<option>'+input+'</option>')
	$('#bufferOutput').append('<option>'+bufferStr+'</option>')
}

