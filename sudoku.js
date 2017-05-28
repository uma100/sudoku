window.onload = init;

function init() {
    var tableSize = 9;
    var board = document.getElementById("board");
    var tableDiv = document.createElement("div");
    tableDiv.setAttribute('class', 'table');
    tableDiv.setAttribute('id', 'createdbyme');
    board.appendChild(tableDiv);
    var square = 0;
    var num = 0;
    for (er = 0; er < 3; er++) {
        var erowDiv = document.createElement("div");
        erowDiv.setAttribute('class', 'erow');
        erowDiv.setAttribute('id', er + 1);
        tableDiv.appendChild(erowDiv);

        for (ec = 0; ec < 3; ec++) {
            square = square + 1;
            var ecellDiv = document.createElement("div");
            ecellDiv.setAttribute('class', 'ecell');
            ecellDiv.setAttribute('id', (er + 1) + '' + (ec + 1));
            erowDiv.appendChild(ecellDiv);
            var container = document.createElement("div");
            container.setAttribute('class', 'container');
            ecellDiv.appendChild(container);

            for (r = 0; r < 3; r++) {
                var rowDiv = document.createElement("div");

                rowDiv.setAttribute('class', 'row');
                rowDiv.setAttribute('id', r + 1);
                container.appendChild(rowDiv);

                for (c = 0; c < 3; c++) {
                    num = num + 1;
                    var gr;
                    var cellDiv = document.createElement("div");
                    cellDiv.setAttribute('class', 'cell');

                  
                    var input = document.createElement("div");
					var input = document.createElement('input');
                    input.setAttribute('class', 'input');
                    input.setAttribute('maxlength', '1');
                    input.setAttribute('type', 'text');
                    input.setAttribute('id', (er + 1) + ',' + (ec + 1) + ',' + (r + 1) + ',' + (c + 1));
                    cellDiv.appendChild(input);
                    rowDiv.appendChild(cellDiv);
                }
            }


        }
    }
    model.fillinBoard();
   // var selectedCellDiv = document.getElementById('21');
    //	console.log(geteRow(selectedCellDiv.getAttribute('id')));
    function geteRow(attribute) {
        return attribute.substr(0, 1);
    }

    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }


}
var model = {
    board: [],
    fillinBoard: function() {
        var counter = 0;
        for (er = 0; er < 3; er++) {
            for (ec = 0; ec < 3; ec++) {
                for (r = 0; r < 3; r++) {
                    for (c = 0; c < 3; c++) {
                        var obj = {
                            location: (er + 1) + ',' + (ec + 1) + ',' + (r + 1) + ',' + (c + 1),
                            value: 0
                        }
                        this["board"].push(obj);
                        counter = counter + 1;
                    }
                }
            }
        }
		
	
         addValue(this.board);          
        
        for (r = 0; r < counter; r++) {
            view.displayValues(this.board[r].location, this.board[r].value);
        }
    
    }
}
	
		var addValue= function(board, l){
			if(!l){
				l=0;
			}
			if(l==board.length){
				return;
			}
			var prohibitNumbers = getProhibitNumbers(board[l].location);
			var fvalue=createValue(board[l].location, prohibitNumbers);
			
			if (fvalue && fvalue!=-1 ){
					board[l].value = fvalue;
					addValue(board, l+1);
			
			}else{
				setZeros();
				addValue(board, 0);		
			}			
		}	
			
var createValue = function(location, prohibitNumbers, triedNumbers) {
		
	if(!triedNumbers){
		triedNumbers=[];
	}
    var num = Math.floor(Math.random() * 9) + 1;
	
	if(prohibitNumbers.indexOf(num) == -1){
		return num;
	}

	if (triedNumbers.indexOf(num)==-1){
		triedNumbers.push(num);
	}
		
	if(triedNumbers.length == 9){
		return -1;
	}
	return createValue(location, prohibitNumbers, triedNumbers);
	
}

var getRow = function(location) {
    return location.substr(0, 1) + ',' + location.substr(4, 1);
}
var getColumn = function(location) {
    return location.substr(2, 1) + ',' + location.substr(6, 1);
}
var getSquare = function(location) {
    return location.substr(0, 3);
}


var getProhibitNumbers= function(location){
	var thisColumn = getColumn(location);
	var thisSquare = getSquare(location);
	var thisRow = getRow(location);
	var prohibitArray=[];	
	
	for(e=0; e < 81; e++){
		
		locationInLoop = model.board[e].location;
		var columnInLoop = getColumn(locationInLoop);
		var rowInLoop= getRow(locationInLoop);
		var squareInLoop = getSquare(locationInLoop);
		
		if(columnInLoop == thisColumn && location != locationInLoop){
			prohibitArray.push(model.board[e].value);
		}else if(squareInLoop == thisSquare && location != locationInLoop) {
			prohibitArray.push(model.board[e].value);
		}else if(rowInLoop == thisRow && location != locationInLoop){
			prohibitArray.push(model.board[e].value);
		}
		
	}
	return prohibitArray;
}



var setZeros = function(){
	for(k=0;k<81;k++){
		model.board[k].value=0;
	}
}
var view = {

    displayValues: function(location, value) {

        var cell = document.getElementById(location);
        cell.setAttribute('value', value);

    }
}