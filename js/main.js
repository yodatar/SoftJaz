/**
 * Created by pipo on 28.11.2014.
 */

/*
 .unshift()  - Inserts an element at the first position of the array:
 .shift()   -  Removes the first element of an array
*/

//globalne premenne
input = ['a','x','b','$'];
output = [];
buffer = ['A','#'];
table = [
	{
		terminal:'a',
		columns: [
			{   nonterminal:'A',
				rule:['a','A'],
				ruleNum:1
			},
			{   nonterminal:'B',
				rule:['a','B'],
				ruleNum:2
			}
		]
	},
	{
		terminal:'[b-z]',
		columns: [
			{   nonterminal:'A',
				rule:['a'],
				ruleNum:3
			},
			{   nonterminal:'B',
				rule:['b'],
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
});

function analyze() { // urobi az dokonca

	// hlavny cyklus
	while(input.length > 1) {
		if(analyzeStep()) break;
	}
}

function analyzeStep() { // urobi jeden krok

	var inputCurrent,bufferCurrent;

	if(exclude() == 'END') { return true; }

	inputCurrent = input[0];
	bufferCurrent = buffer[0];

	try {
		var ruleCurrent = getRule(inputCurrent, bufferCurrent);
		if(! ruleCurrent) throw 'ruleNotFound';

		doStep(ruleCurrent); // daj do buffera to pravidlo

	} catch(err) {
		input.shift(); // zotavenie take, ze teda kasleme na tento input a ideme dalej
		printErr(err);
	} finally {
		printStep();
	}
}


function exclude() { // vylucovanie, ak su zaciatok 'buffer' a 'input' rovnake
	try {
		while(buffer[0].match(input[0])) {
			input.shift();
			buffer.shift();

			printStep();
		}
		if(buffer[0] == '#' && input[0] == '$') return 'END';
		if(buffer[0] != '#' && input[0] == '$') throw 'Buffer still full, input empty';

	} catch(err) {
		printErr(err);
	}

}

function getRule(inputCurrent, bufferCurrent) { // vrati pravidlo a cislo pravidla
	var ruleCurrent;
	for (var i=0; i < table.length ; i++) {
		if (inputCurrent.match(table[i].terminal)) {
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
	var inputStr = input.join('');
	var bufferStr = buffer.join('');
	$('#inputOutput').append('<option>'+inputStr+'</option>')
	$('#bufferOutput').append('<option>'+bufferStr+'</option>')
}

