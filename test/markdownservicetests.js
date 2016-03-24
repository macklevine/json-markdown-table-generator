'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('underscore');

var dummyInput1 = require('./dummyinputs/dummyinput1.json');
var dummyInput2 = require('./dummyinputs/dummyinput2.json');
var dummyInput3 = require('./dummyinputs/dummyinput3.json');

var jsonMarkdownService = require('../server/jsonmarkdownservice');

describe('jsonMarkdownService', function(){
	describe('.validateHeaders() method', function(){
		it('should validate ensure that the headers of a given input are all strings', function(done){
			jsonMarkdownService.validateHeaders(dummyInput1[0])
				.then(function(response){
					expect(response).to.equal("the headers look good.");
					done();
				});
		});
		it('should reject any set of headers where any of the cells do have JSON data', function(done){
			jsonMarkdownService.validateHeaders(dummyInput2[0])
				.catch(function(response){
					expect(response).to.equal('The headers must all be non-JSON, non-empty strings');
					done();
				});
		});
		it('should reject any set of headers where any of the cells contains an empty string', function(done){
			jsonMarkdownService.validateHeaders(dummyInput3[0])
				.catch(function(response){
					expect(response).to.equal('The headers must all be non-JSON, non-empty strings');
					done();
				});
		});
	});
	describe('.findColumnWidth() method', function(done){
		it('should find the widest cell in the column and send this value back as the column\'s max width', function(done){
			var columnObj = jsonMarkdownService.findColumnWidth(dummyInput3, 2);
			expect(columnObj.maxWidth).to.equal(19);
			expect(columnObj.columnValues.length).to.equal(2);
			done();
		});
	});
	describe('.findRowHeight() method', function(done){
		it('should find the tallest row in the fieldArray', function(done){
			var maxHeight = jsonMarkdownService.findRowHeight(dummyInput3, 1);
			expect(maxHeight).to.equal(4);
			done();
		});
	});
	describe('.createTableMap() method', function(){
		it('should create a map of values we can use to construct columns', function(){
			var tableMap = jsonMarkdownService.createTableMap(dummyInput1);
			expect(_.has(tableMap, 'columnObjects')).to.be.ok;
			var verdict;
			_.each(tableMap.objects, function(item){
				verdict = _.has(item, 'maxWidth');
				expect(verdict).to.be.ok;
				expect(item.maxWidth).to.be.ok;
			});
		});
	});
	describe('.renderColumn() method', function(){
		it('should give us a column rendered from the table map', function(){
			//TODO: add the expected object here.
			var expectedColumnObject1 = '|-------------------|\n' +
																	'|header3            |\n' +
																	'|-------------------|\n' +
																	'|{                  |\n' +
																	'|  "mack": "levine",|\n' +
																	'|  "sara": "fraley" |\n' +
																	'|}                  |\n' +
																	'|-------------------|\n';

			var tableMap = jsonMarkdownService.createTableMap(dummyInput1);
			var generatedColumnObject = jsonMarkdownService.renderColumn(tableMap.columnObjects[2], tableMap.rowHeights);
			expect(generatedColumnObject).to.equal(expectedColumnObject1);
			console.log(generatedColumnObject);
		});
		it('should give us a column with cells that correctly scale to height of cells in adjacent rows', function(){
			var expectedColumnObject2 = '|-------|\n'+
							                    '|header1|\n'+
							                    '|-------|\n'+
							                    '|value1 |\n'+
							                    '|       |\n'+
							                    '|       |\n'+
							                    '|       |\n'+
							                    '|-------|\n';

			var tableMap = jsonMarkdownService.createTableMap(dummyInput1);
			var generatedColumnObject = jsonMarkdownService.renderColumn(tableMap.columnObjects[0], tableMap.rowHeights);
			expect(generatedColumnObject).to.equal(expectedColumnObject2);
			console.log(generatedColumnObject);
		});
	});
	describe('.createJSONMarkdownTable() method', function(){
		it('should give us a complete JSON markdown table when invoked with data from the front end', function(done){
			var expectedTableObject =  '|-------|-------|-------------------|\n'+
																 '|header1|header2|header3            |\n'+
																 '|-------|-------|-------------------|\n'+
																 '|value1 |value2 |{                  |\n'+
																 '|       |       |  "mack": "levine",|\n'+
																 '|       |       |  "sara": "fraley" |\n'+
																 '|       |       |}                  |\n'+
																 '|-------|-------|-------------------|\n';
			jsonMarkdownService.createJSONMarkdownTable(dummyInput1)
				.then(function(response){
					console.log(response.tableString);
					expect(response.tableString).to.equal(expectedTableObject);
					done();
				});
		});
	});
});