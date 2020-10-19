var humanplayernumber = ("Yellow");
var player1Color = 'rgb(255, 255, 0)';

var AIplayernumber = ("White");
var player2Color = 'rgb(255, 255, 255)';
var game_on = true;

//credits for https://github.com/SethPipho/monte-carlo-tree-search-js for a snippet of Monte Carlo Search Tree code.
while (true){
    let p1_move = humanplayernumber.selectMove()
    game_on.playMove(p1_move)

    if (game.gameOver()) {break}

    let p2_move = player2.selectMove()
    game_on.playMove(p2_move)

    if (game_on.gameOver()) {break}
}

var table = $('table tr');

var rowNum; 
var colNum;

function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}


function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for(var row = 5; row >= 0; row--){
	colorReport = returnColor(row,colIndex);
	if(colorReport === 'rgb(128, 128, 128)'){
	  return row;
	}
  }
}

function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
	for (var col = 0; col < 4; col++) {
	  if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
		console.log('horiz');
		reportWin(row,col);
		return true;
	  }else {
		continue;
	  }
	}
  }
}

function verticalWinCheck() {
  for(var col=0; col<7; col++){
	for(var row = 0; row < 3; row++){
	  if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
		console.log('vertical');
		reportWin(row,col);
		return true;
	  } else {
		continue;
	  }
	}
  }
}


function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
	for (var row = 0; row < 7; row++) {
	  if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
		console.log('diagonal');
		reportWin(row,col);
		return true;
	  } else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
		console.log('diagonal');
		reportWin(row,col);
		return true;
	  }else {
		continue;
	  }
	}
  }
}

function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
	for (var row = 0; row < 7; row++) {
	  $('h3').fadeOut('fast');
	  $('h2').fadeOut('fast');
	  $('h1').text(winningPlayer+"Wins!").css("fontSize", "50px")
	}
  }
}

var currentPlayer =1;
var currentName = humanplayernumber;
var currentColor = player1Color;

$('h3').text(humanplayernumber+"'s TURN");
$('h3').text(humanplayernumber+"Yellow's turn");

$('.board button').on('click',function() {

  var col = $(this).closest("td").index();

  var bottomAvail = checkBottom(col);

  changeColor(bottomAvail,col,currentColor);

  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
	gameEnd(currentName);
  }

  currentPlayer = currentPlayer * -1;

  if(currentPlayer === 1){
	currentName = humanplayernumber;
	$('h3').text(currentName+" Yellow's TURN")
	currentColor = player1Color;
  } else {
	currentName = humanplayernumber;
	$('h3').text(currentName+"White's TURN");
	currentColor = player2Color;
  }

})
