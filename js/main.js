/**
 * Created by pipo on 28.11.2014.
 */

input = $('#input').val() + '$';
buffer = ['xmldocument', '#'];
table = [
	{
		terminal: /<\?xml version=/,
		columns: [
			{   nonterminal: 'xmldocument',
				rule: [/<\?xml version=/, 'number', /\./, 'number', /\?\>/, 'element'],
				ruleNum: 1
			}
		]
	},
	{
		terminal: /\?>/,
		columns: [
			{   nonterminal: 'number1',
				rule: [],
				ruleNum: 4
			}
		]
	},
	{
		terminal: /\./,
		columns: [
			{   nonterminal: 'number1',
				rule: [],
				ruleNum: 4
			},
			{
				nonterminal: 'name1',
				rule: ['namechar', 'name1'],
				ruleNum: 24
			},
			{
				nonterminal: 'namechar',
				rule: [/\./],
				ruleNum: 28
			}
		]
	},
	{
		terminal: /</,
		columns: [
			{   nonterminal: 'xmldocument',
				rule: ['element'],
				ruleNum: 1
			},
			{
				nonterminal: 'element',
				rule: [/</, 'name', 'tag'],
				ruleNum: 6
			},
			{
				nonterminal: 'element1',
				rule: ['element2', 'endtag'],
				ruleNum: 7
			},
			{
				nonterminal: 'element2',
				rule: ['element'],
				ruleNum: 10
			}
		]
	},
	{
		terminal: /<\//,
		columns: [
			{   nonterminal: 'element1',
				rule: ['endtag'],
				ruleNum: 8
			},
			{
				nonterminal: 'endtag',
				rule: [/<\//, 'name', />/],
				ruleNum: 13
			},
			{
				nonterminal: 'word1',
				rule: [],
				ruleNum: 15
			}
		]
	},
	{
		terminal: />/,
		columns: [
			{   nonterminal: 'tag',
				rule: [/>/, 'element1'],
				ruleNum: 12
			},
			{
				nonterminal: 'name1',
				rule: [],
				ruleNum: 23
			}
		]
	},
	{
		terminal: /\/>/,
		columns: [
			{   nonterminal: 'tag',
				rule: [/\/>/],
				ruleNum: 11
			},
			{
				nonterminal: 'name1',
				rule: [],
				ruleNum: 23
			}
		]
	},
	{
		terminal: /[a-zA-Z]/,
		columns: [
			{   nonterminal: 'element1',
				rule: ['element2', 'endtag'],
				ruleNum: 7
			},
			{
				nonterminal: 'element2',
				rule: ['word'],
				ruleNum: 9
			},
			{
				nonterminal: 'word',
				rule: ['char', 'word1'],
				ruleNum: 14
			},
			{
				nonterminal: 'word1',
				rule: ['word'],
				ruleNum: 16
			},
			{
				nonterminal: 'char',
				rule: ['letter'],
				ruleNum: 17
			},
			{
				nonterminal: 'name',
				rule: ['letter', 'name1'],
				ruleNum: 20
			},
			{
				nonterminal: 'name1',
				rule: ['namechar', 'name1'],
				ruleNum: 24
			},
			{
				nonterminal: 'namechar',
				rule: ['letter'],
				ruleNum: 25
			},
			{
				nonterminal: 'letter',
				rule: [/[a-zA-Z]/],
				ruleNum: 29
			}
		]
	},
	{
		terminal: /[0-9]/,
		columns: [
			{   nonterminal: 'number',
				rule: ['digit', 'number1'],
				ruleNum: 3
			},
			{
				nonterminal: 'number1',
				rule: ['number'],
				ruleNum: 5
			},
			{
				nonterminal: 'element1',
				rule: ['element2', 'endtag'],
				ruleNum: 7
			},
			{
				nonterminal: 'element2',
				rule: ['word'],
				ruleNum: 9
			},
			{
				nonterminal: 'word',
				rule: ['char', 'word1'],
				ruleNum: 14
			},
			{
				nonterminal: 'word1',
				rule: ['word'],
				ruleNum: 16
			},
			{
				nonterminal: 'char',
				rule: ['digit'],
				ruleNum: 18
			},
			{
				nonterminal: 'name1',
				rule: ['namechar', 'name1'],
				ruleNum: 24
			},
			{
				nonterminal: 'namechar',
				rule: ['digit'],
				ruleNum: 26
			},
			{
				nonterminal: 'digit',
				rule: [/[0-9]/],
				ruleNum: 30
			}
		]
	},
	{
		terminal: /_/,
		columns: [
			{
				nonterminal: 'name',
				rule: [/_/, 'name1'],
				ruleNum: 21
			},
            {
				nonterminal: 'namechar',
				rule: [/_/],
				ruleNum: 27
			},
			{
				nonterminal: 'name1',
				rule: ['namechar', 'name1'],
				ruleNum: 24
			}


		]
	},
	{
		terminal: /:/,
		columns: [
			{
				nonterminal: 'name',
				rule: [/:/, 'name1'],
				ruleNum: 22
			},
            {
				nonterminal: 'namechar',
				rule: [/:/],
				ruleNum: 27
			},
			{
				nonterminal: 'name1',
				rule: ['namechar', 'name1'],
				ruleNum: 24
			}
		]
	},
	{
		terminal: /[@%!*§\s]/,
		columns: [
			{   nonterminal: 'element1',
				rule: ['element2', 'endtag'],
				ruleNum: 7
			},
			{
				nonterminal: 'element2',
				rule: ['word'],
				ruleNum: 9
			},
			{
				nonterminal: 'word',
				rule: ['char', 'word1'],
				ruleNum: 14
			},
			{
				nonterminal: 'word1',
				rule: ['word'],
				ruleNum: 16
			},
			{
				nonterminal: 'char',
				rule: [/[@%!*§\s]/],
				ruleNum: 19
			}
		]
	},
	{
		terminal: /-/,
		columns: [
			{
				nonterminal: 'name1',
				rule: ['namechar', 'name1'],
				ruleNum: 24
			},
			{
				nonterminal: 'namechar',
				rule: [/-/],
				ruleNum: 31
			}
		]
	}

];


$(function () {
	printStep(); // vypis prveho stavu

	$('.start').on('click', function () {
		analyze();
	});
	$('.step').on('click', function () {
		analyzeStep();
	});
	$('.reset').on('click', function () {
		$('#inputOutput').html('');
		$('#bufferOutput').html('');
		$('#rulesOutput').html('');
		$('#errorOutput').html('');
		$('#result').html('');
		$('#result').removeClass('fadeIn');
		input = $('#input').val() + '$';
		buffer = ['xmldocument', '#'];
		printStep();
	});
	$('.inputChoice').on('change',function(){
		$('#input').val(this.value);

		$('#inputOutput').html('');
		$('#bufferOutput').html('');
		$('#rulesOutput').html('');
		$('#errorOutput').html('');
		$('#result').html('');
		$('#result').removeClass('fadeIn');
		input = $('#input').val() + '$';
		buffer = ['xmldocument', '#'];
		printStep();
	});

	$('select[multiple]').scroll(function(e){
		$('select[multiple]').scrollTop($(this).scrollTop());
	});
});

function analyze() { // urobi az dokonca

	// hlavny cyklus
	while (input.length > 0) {
		if (analyzeStep()) break;
	}
}

function analyzeStep() { // urobi jeden krok

	if (exclude() == 'END') {
		$('#result').html('Prijaté')
		$('#result').addClass('fadeIn');

		return true;
	}
	var ruleCurrent;
	try {
		ruleCurrent = getRule(buffer[0]);
		if (!ruleCurrent) throw 'ruleNotFound';

		doStep(ruleCurrent); // daj do buffera to pravidlo

	} catch (err) {

		input = input.substr(1); // zotavenie take, ze teda kasleme na jeden znak na zaciatku inputu a ideme dalej
		ruleCurrent = { elements: 'RuleNotFound', num: 'ERR' };
		printErr(err);
	} finally {
		printStep(ruleCurrent);
	}
}


function exclude() { // vylucovanie, ak su zaciatok 'buffer' a 'input' rovnake
	try {
		var matching = (buffer[0]).exec(input);
		while (matching && matching.index == 0) {
			input = input.substr(matching[0].length);
			buffer.shift();

			printStep();

			matching = (buffer[0]).exec(input);
		}
	} catch (err) {
	}

	if (buffer[0] == '#' && input[0] == '$') return 'END';
	if (buffer[0] != '#' && input[0] == '$') printErr('Buffer still full, input empty');
	if (buffer[0] == '#' && input[0] != '$') printErr('Input still full, buffer empty');
}

function getRule(bufferCurrent) { // vrati pravidlo a cislo pravidla
	var ruleCurrent;
	for (var i = 0; i < table.length; i++) {
		var matching = (table[i].terminal).exec(input);
		if (matching && matching.index == 0) {
			for (var j = 0; j < table[i].columns.length; j++) {
				if (table[i].columns[j].nonterminal == bufferCurrent) {
					ruleCurrent = { elements: table[i].columns[j].rule, num: table[i].columns[j].ruleNum };
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
	$('#errorOutput').append('<option>' + err + '</option>')

}

function printStep(ruleCurrent) {
	var bufferStr = buffer.join(',');

	$('#inputOutput').append('<option>' + HtmlEncode(input) + '</option>');
	$('#bufferOutput').append('<option>' + HtmlEncode(bufferStr) + '</option>');
	if(ruleCurrent) {
		if(ruleCurrent.num == 'ERR')
			$('#rulesOutput').append('<option style="color: red;">' + ruleCurrent.elements + '</option>');
		else
			$('#rulesOutput').append('<option>' + HtmlEncode(ruleCurrent.elements.join(',')) + ', ' + ruleCurrent.num + '</option>');
	} else {
		$('#rulesOutput').append('<option>-</option>');
	}

	$('select[multiple]').animate({ scrollTop: 6000 }, 1);
}

function HtmlEncode(s) {
	var el = document.createElement("div");
	el.innerText = el.textContent = s;
	s = el.innerHTML;
	return s;
}

