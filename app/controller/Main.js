
var gsContext;

var LOG_LEVEL = 10;


var myGlobals = {
	//myGameState:null,
	//noGC:null,
	globVar:null,
	myCounter:0,
	traceLevel:0,
	pushCount:0
}

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}

function lerp(v1, v2, perc) {
	return (v1*(1.0-perc) + v2*perc);
}

function doTrace(val,logLev) {
	var levelString = "";
	var i;
	
	for (i = 0; i < myGlobals.traceLevel; i++) {
		levelString += "|--"
	}
	levelString += val;
	
	if (logLev >= LOG_LEVEL) console.log(levelString);
}

function pushTrace(val, logLev) {
	
	doTrace(val, logLev);
	
	myGlobals.pushCount++;
	myGlobals.traceLevel++;
	
}
function popTrace(val, logLev) {
	var levelString = "";
	var i;
	
	myGlobals.traceLevel--;
	
	if (myGlobals.pushCount < 1) {
		for (i = 0; i < myGlobals.traceLevel; i++) {
			levelString += "|--"
		}
		levelString += "<END>";
		if (val == null || val == undefined) {
			
		}
		else {
			levelString += " Results: " + val; 
		}
		
		if (logLev >= LOG_LEVEL) {
			console.log(levelString);
		}
	}
	
	myGlobals.pushCount = 0;	
	
	
	
	
}
function doWarn(val) {
	console.log(">>>>> WARNING: "+ val + " >>>>>");
}


var getItemByName = function(items, n) {
	i = 0;
	while ( (items[i].name != n) && (i < items.length) ) {

		i++;
	}
	if (i >= items.length) {
		return undefined;
	}
	else {
		return items[i];
	}
}

function gup( name )
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ) {
		return "";
	}
	else {
		return results[1];
	}
}

var GameState = function() {

	return {

		////////////////
		// properties //
		////////////////

		gameTable:null,
		players:null,
		maxPlayers:null,

		///////////////
		// functions //
		///////////////

		createGameTable:function(tID) {
			
			pushTrace("createGameTable()");
			
			var i;
			var j;
			var mystr;
			var wPer = (156.0*50/1024.0);
			var hPer = (219.0*50/768.0);

			gsContext.gameTable = {
				tableID: tID,
				physicalCards:[],
				deck: [],
				cards: [],
				suits:['S', 'C', 'D', 'H'],
				ranks:['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
				callCount:0,
				cardTargetStack:[],
				
				buttonCurPos:{x:50,y:-20},
				buttonTargetPos:{x:50,y:-20},
				buttonScale:{x:20,y:20},
				
				buttonInd: 9,
				smallBlindAmount: 25,
				minBet:50,
				smallBlindInd: 0,
				bigBlindInd: 0,
				activePlayer:0,
				deckPos:{x:50, y:-20},
				deckScale:{x:wPer,y:hPer},
				tablePos:{x:50, y:50}
				
			};
			for (i = 0; i < 13; i++) {
				for (j = 0; j < 4; j++) {
					mystr=gsContext.gameTable.ranks[i]+gsContext.gameTable.suits[j];
					gsContext.gameTable.physicalCards.push({
						id:i*4+j,
						stringVal:mystr,
						rank:i,
						suit:j,
						curPos:{x:gsContext.gameTable.deckPos.x, y:gsContext.gameTable.deckPos.y},
						targetPos:{x:gsContext.gameTable.deckPos.x, y:gsContext.gameTable.deckPos.y}
					});
					gsContext.gameTable.deck.push(i*4+j);
				}
			}
			popTrace();
		},

		shuffleDeck:function() {
			pushTrace("shuffleDeck()");
			
			
			var i;
			var numShuffles = 1000;
			var temp;

			var begSlice;
			var endSlice;
			var pos1;
			var pos2;
			var tvar;
			
			var myDeck = gsContext.gameTable.deck;

			if (myDeck.length < 52) {
				//not all cards were collected, dont shuffle
				doWarn("Attempted to shuffle non-full deck");
				
				popTrace();
				return;
			}
			else {
				for (i = 0; i < numShuffles; i++) {
					pos1 = Math.floor(Math.random()*52.0);
					pos2 = Math.floor(Math.random()*52.0);

					tvar = myDeck[pos1];
					myDeck[pos1] = myDeck[pos2];
					myDeck[pos2] = tvar;


					//begSlice = gsContext.gameTable.deck.slice(0,pos);
					//endSlice = gsContext.gameTable.deck.slice(pos);
					//gsContext.gameTable.deck = endSlice.concat(begSlice);
				}
			}

			popTrace();
		},

		createPlayers:function(mp) {
			pushTrace("createPlayers("+mp+")");
			
			
			var i;

			gsContext.maxPlayers = mp;

			gsContext.players = [];
			
			var ttop;
			var tleft;
			var j = 0;
			
			var tempPos = [];
			
			var tempArr = [
				//0,
				//1,
				2,
				//3,
				//4,
				5,
				//6,
				//7,
				8,
				//9,
				//10,
				11,
				//12,
				//13,
				14,
				//15,
				//16,
				17,
				//18,
				//19,
				20,
				//21,
				//22,
				23,
				//24,
				//25,
				26,
				//27,
				//28,
				29,
				//30,
				//31,
				
			];
			
			//var wPer = (156.0*50/1024.0);
			//var hPer = (219.0*50/768.0);
			
			//var wPer = 16;
			///var hPer = 20;
			
			var myrad;
			var xmod;
			
			for (i = 0; i < 32; i++) {
				
				if (j == 1 || j == 3 || j == 6 || j == 8 ) {
					myrad = 0.45;
				}
				else {
					myrad = 0.4;
				}
				
				xmod = 0;
				if (j == 0) {
					xmod = 0.05;
				}
				if (j == 9) {
					xmod = -0.05;
				}
				
				tleft = Math.floor((Math.cos(( (i+0.5 )*Math.PI)/16.0 - Math.PI/2.0)*myrad+0.5+xmod)*100.0);
				ttop = Math.floor((Math.sin(( (i+0.5 )*Math.PI)/16.0 - Math.PI/2.0)*myrad+0.5)*100.0);
				
				
				if ( tempArr.indexOf(i) > -1 ) {
					
					
					tempPos.push({x:tleft,y:ttop});
					
					//gsContext['getPlayer'+j]().setLeft(tleft+'%');
					//gsContext['getPlayer'+j]().setTop(ttop+'%');
					
					
					//gsContext['getPlayer'+j]().setWidth(wPer+'%');
					//gsContext['getPlayer'+j]().setHeight(hPer+'%');
					
					j++;
				}
			}

			var tempPlayers = [
				'Empty',
				'Bob',
				'John',
				'Sue',
				'Larry',
				'Joe',
				'Empty',
				'Ned',
				'Amy',
				'Zack'
				
			];
			
			var curChips;

			for (i = 0; i < gsContext.maxPlayers; i++) {
				if (tempPlayers[i] == 'Empty') {
					curChips = 0;
				}
				else {
					curChips = 1000;//500 + Math.floor(Math.random()*500.0);
				}
				
				gsContext.players.push(
					{
						playerNumber: i,
						playerName:tempPlayers[i],
						playerChips: curChips,
						playerBet:0,
						playerPos:{x:tempPos[i].x,y:tempPos[i].y},
						playerScale:{x:16,y:20},
						isFolded:false,
						betThisRound:false,
						cards:[]
					}
				);
			}
			popTrace();
		},


		genOffset2: function(cardNum,totalCards) {
			var buffer = gsContext.gameTable.deckScale.x/3.0;
			return ((cardNum*1.0)*(buffer)-(totalCards*1.0)*buffer/2.0) - buffer/2.0;
		},
		genOffset: function(cardNum,totalCards) {
			var buffer = gsContext.gameTable.deckScale.x+0.25;
			return ((cardNum*1.0)*(buffer)-(totalCards*1.0)*buffer/2.0) - buffer/2.0;
		},

		setCardTarget: function(cNum, xp, yp) {
			var gt = gsContext.gameTable;
			
			gt.cardTargetStack.unshift(
				{
					cardNum:cNum,
					targetPos:{x:xp,y:yp}
				}
			);
		},
		
		updateCardTargets: function() {
			//pushTrace("updateCardTargets()");
			
			var gt = gsContext.gameTable;
			var curCard;
			var ctInd = gt.cardTargetStack.length-1;
			var i;
			var cardReadyForMotion = false;
			
			if (ctInd > -1) {
				curCard = gt.cardTargetStack[ctInd].cardNum;
				if ( ( Math.abs(gt.physicalCards[curCard].curPos.x - gt.physicalCards[curCard].targetPos.x) < 0.01 || Math.abs(gt.physicalCards[curCard].curPos.y - gt.physicalCards[curCard].targetPos.y) < 0.01) ) {
					cardReadyForMotion = true;
				}
			}
			
			if (cardReadyForMotion) {
				gt.physicalCards[curCard].targetPos.x = gt.cardTargetStack[ctInd].targetPos.x;
				gt.physicalCards[curCard].targetPos.y = gt.cardTargetStack[ctInd].targetPos.y;
				gt.cardTargetStack.pop();
			}
			
			
			
			
			
			//popTrace();
		},

		dealPlayerCard:function(playerNumber) {
			pushTrace("dealPlayerCard("+playerNumber+")");
			
			var offVar;
			var negMod
			
			if (playerNumber < 5) {
				offVar = -15;
				negMod = 1;
			}
			else {
				offVar = 8;
				negMod = -1;
			}
			
			var actionCard = gsContext.gameTable.deck.pop();
			gsContext.players[playerNumber].cards.push(actionCard);
			
			gsContext.setCardTarget(
				actionCard,
				lerp(gsContext.players[playerNumber].playerPos.x,50,0.25) + gsContext.genOffset2(gsContext.players[playerNumber].cards.length,2),
				lerp(gsContext.players[playerNumber].playerPos.y,50,0.3) + gsContext.genOffset2(gsContext.players[playerNumber].cards.length,2)*negMod-5
			);
			
			
			popTrace();
		},
		dealTableCard:function() {
			pushTrace("dealTableCard()");
			
			var actionCard = gsContext.gameTable.deck.pop();
			gsContext.gameTable.cards.push(actionCard);
			
			gsContext.setCardTarget(
				actionCard,
				gsContext.gameTable.tablePos.x+gsContext.genOffset(gsContext.gameTable.cards.length,5),
				gsContext.gameTable.tablePos.y
			);
			
			popTrace();
		},
		collectPlayerCard:function(playerNumber) {
			pushTrace("collectPlayerCard("+playerNumber+")");
			
			var actionCard = gsContext.players[playerNumber].cards.pop();
			gsContext.gameTable.deck.push(actionCard);
			
			gsContext.setCardTarget(
				actionCard,
				gsContext.gameTable.deckPos.x,
				gsContext.gameTable.deckPos.y
			);
			
			popTrace();
		},
		collectTableCard:function() {
			pushTrace("collectTableCard()");
			
			var actionCard = gsContext.gameTable.cards.pop();
			gsContext.gameTable.deck.push(actionCard);
			
			gsContext.setCardTarget(
				actionCard,
				gsContext.gameTable.deckPos.x,
				gsContext.gameTable.deckPos.y
			);
			
			popTrace();
		},

		seatIsReady:function(val) {
			pushTrace("seatIsReady("+val+")");
			
			if (val >= gsContext.maxPlayers) {
				doWarn("Player index out of bounds in seatIsReady()");
				popTrace();
				return false;
			}
			else {
				popTrace();
				return ( (gsContext.players[val].playerName != 'Empty') && (gsContext.players[val].isFolded != true) );
			}

		},
		findNextAvailPlayer:function(pos) {
			
			pushTrace("findNextAvailPlayer("+pos+")");
			
			pos = pos + 1;
			if (pos >= gsContext.maxPlayers) {
				pos = 0;
			}

			

			var i;
			
			var curPos;
			var foundPos = -1;
			
			for (i = 0; i < gsContext.maxPlayers; i++) {
				curPos = (i+pos)%gsContext.maxPlayers;
				
				if ( gsContext.seatIsReady(curPos) ) {
					foundPos = curPos;
					break;
				}
				else {
					
				}
			}
			popTrace(foundPos + " " + "(searched "+i+" positions)");
			return foundPos;

		},

		collectAllCards:function() {
			pushTrace("collectAllCards()");
			
			var i;

			for (i = 0; i < gsContext.maxPlayers; i++) {
				
				while (gsContext.players[i].cards.length > 0) {
					gsContext.collectPlayerCard(i);
				}
			}
			while (gsContext.gameTable.cards.length > 0) {
				gsContext.collectTableCard();
			}
			
			popTrace();
		},
		
		

		dealAllCards:function() {
			pushTrace("dealAllCards()");
			
			var i;
			var j;
			var pos;
			

			for (j = 0; j < 2; j++) {
				for (i = 0; i < gsContext.maxPlayers; i++) {

					pos = (gsContext.gameTable.activePlayer + i)%gsContext.maxPlayers;

					if ( gsContext.seatIsReady(pos) ) {
						gsContext.dealPlayerCard(pos);
					}
				}
				
			}
			/*
			for (i = 0; i < 3; i++) {
				gsContext.dealTableCard();
			}
			*/
			
			popTrace();
		},

		countAvailPlayers: function() {
			var i;
			
			var pCount = 0;
			
			for (i = 0; i < gsContext.maxPlayers; i++) {
				if (gsContext.seatIsReady(i)) {
					pCount++;
				}
			}
			
			return pCount;
		},

		setActivePlayer: function(myPlayer) {
			pushTrace("setActivePlayer("+myPlayer+")");
			
			if (gsContext.seatIsReady(myPlayer)) {
				gsContext.gameTable.activePlayer = myPlayer;
			}
			else {
				gsContext.gameTable.activePlayer = gsContext.findNextAvailPlayer(myPlayer);
			}
			
			if (gsContext.countAvailPlayers() == 1) {
				//Only one player not folded, end the hand
				gsContext.endHand();
			}
			
			if (gsContext.gameTable.activePlayer == -1) {
				
			}
			myGlobals.globVar.updateSeats();
			
			popTrace();
		},
		
		rankAllHands: function() {
			var i;
			var j;
			var k;
			var temp;
			
			var handStrings = [
				"folded/out",
				"high card",
				"1-pair",
				"2-pair",
				"3-kind",
				"straight",
				"flush",
				"full house",
				"quads",
				"straight flush"
			];
			
			var handRanks = [];
			for (i = 0; i < gsContext.maxPlayers; i++) {
				
				handRanks.push(gsContext.findBestHand(i));
				
			}
			
			var rankings = [[]];
			
			
			
			var swapped = true;
			j = 0;
			
			while (swapped) {
			      swapped = false;
			      j++;
			      for (i = 0; i < handRanks.length - j; i++) {                                       
			            
						k = 0;

						while (k < 4 && (handRanks[i].bestTieBreaker[k] == handRanks[i+1].bestTieBreaker[k])) {
							k++;
						}

						if (k == 4) {
							
						}
						else {
							if ((handRanks[i].bestTieBreaker[k] > handRanks[i+1].bestTieBreaker[k])) {
								handRanks.swap(i,i+1);
								swapped = true;
							}
						}
			      }  
			}
			
			for (i = 0; i < handRanks.length-1; i++) {
				k = 0;
				
				while (k < 4 && (handRanks[i].bestTieBreaker[k] == handRanks[i+1].bestTieBreaker[k])) {
					k++;
				}
				
				rankings[rankings.length-1].push(handRanks[i]);
				
				if (k == 4) {
					//draw
				}
				else {
					rankings.push([]);
				}
				
			}
			rankings[rankings.length-1].push(handRanks[i]);
			
			rankings.reverse();
			
			var curRanking;
			var bet1;
			var bet2;
			
			//Sort ranks by bet amount
			for (k = 0; k < rankings.length; k++) {
				curRanking = rankings[k];
				
				if (curRanking.length == 1) {
					
				}
				else {
					if (curRanking.length == 2) {
						bet1 = gsContext.players[curRanking[0].ind].playerBet;
						bet2 = gsContext.players[curRanking[1].ind].playerBet;
						
						if (bet2 > bet1) {
							curRanking.swap(0,1);
						}
					}
					else {
						
						
						swapped = true;
						j = 0;

						while (swapped) {
						  	swapped = false;
							j++;
							for (i = 0; i < curRanking.length - j; i++) {                                       

								bet1 = gsContext.players[curRanking[i].ind].playerBet;
								bet2 = gsContext.players[curRanking[i+1].ind].playerBet;

								if (bet1 > bet2) {
									curRanking.swap(i,i+1);
									swapped = true;
								}
							}
						}
						  
					}	
						
				}
			}
			
			
			for (i = 0; i < rankings.length;i++) {
				
				for (j = 0; j < rankings[i].length;j++) {
					doTrace("## RANK " + i + " ##   " +
					gsContext.players[rankings[i][j].ind].playerName + ":" + //" Player ("+rankings[i][j].ind+"): " + 
					" " + rankings[i][j].bestHand +" ("+handStrings[rankings[i][j].bestTieBreaker[0]]+")" + //Hand: " + 
					//rankings[i][j].bestTieBreaker +
					" Bet: " +gsContext.players[rankings[i][j].ind].playerBet,10) ;
				}
			}
			
			doTrace("",10);
			doTrace("",10);
			
			
			
			var totalPot = 0;
			var amountToTake;
			var potDiv;
			
			for (i = 0; i < gsContext.maxPlayers; i++) {
				totalPot += gsContext.players[i].playerBet;
			}
			
			potDiv = totalPot/rankings[0].length;
			
			for (i = 0; i < rankings[0].length; i++) {
				gsContext.players[rankings[0][i].ind].playerChips += potDiv;
			}
			
			
			
			/*
			k = 0;
			while (totalPot > 0) {
				
				if (rankings[k].length == 1) {
					rankings[k][0].
					for (j = 0; j < gsContext.maxPlayers; j++) {
						amountToTake = Math.min(gsContext.players[rankings[k][0].ind].playerBet, )
						//gsContext.players[j].playerBet -= 
					}
					//gsContext.players[i].
					//gsContext.players[rankings[k][0].ind].playerBet
				}
				else {
					for (i = 0; i < rankings[k].length; i++) {
						

					}
				}
				
				
				k++;
			}
			*/
			
			
		},
		
		findBestHand: function(playerNum) {
			var i;
			var j;
			var k;
			var m;
			var allCards = [];
			
			//var tempArray;
			
			var temp;
			var tempCards = new Array(5);
			var tempRanks = new Array(5);
			var tempSuits = new Array(5);
			
			var hasStraight;
			var hasFlush;
			
			var handStrings = [
				"folded/out",
				"high card",
				"1-pair",
				"2-pair",
				"3-kind",
				"straight",
				"flush",
				"full house",
				"quads",
				"straight flush"
			];
			
			var difs = new Array(5);
			var difCount;
			var matches = new Array(5);
			var matchCount;
			var tieBreaker = [0,0,0,0];
			var ignoreNext;
			
			var tstr = "";
			
			var returnObj = {
				ind: playerNum,
				bestTieBreaker:[0,0,0,0],
				worstCards:[0,1],
				bestCards:[0,1,2,3,4],
				bestHand: "XX XX XX XX XX"
			};
			
			if ( gsContext.seatIsReady(playerNum) ) {
				
			}
			else {
				return returnObj;
			}
			
			
			
			for (i = 0; i < gsContext.players[playerNum].cards.length; i++) {
				allCards.push( gsContext.players[playerNum].cards[i] );
			}
			for (i = 0; i < gsContext.gameTable.cards.length; i++) {
				allCards.push( gsContext.gameTable.cards[i] );
			}
			
			

			var swapped = true;
			j = 0;
			
			while (swapped) {
			      swapped = false;
			      j++;
			      for (i = 0; i < allCards.length - j; i++) {                                       
			            if (allCards[i] > allCards[i + 1]) {                          
			                  allCards.swap(i,i+1)
			                  swapped = true;
			            }
			      }                
			}
			
			
			for (i = 0; i < 6; i++) {
				
				for (j = i+1; j < 7; j++) {
					
					tempCount = 0;
					for (k = 0; k < 7; k++) {
						if (k != i && k != j) {
							tempCards[tempCount] = allCards[k];
							tempRanks[tempCount] = Math.floor(allCards[k]/4);
							tempSuits[tempCount] = allCards[k]%4;
							tempCount++;
						}
					}
					
					hasStraight = true;
					hasFlush = true;
					
					
					
					//1 pair : AA.X.X.X X.AA.X.X X.X.AA.X X.X.X.AA 3 dif
					//2 pair : X.AA.BB AA.X.BB AA.BB.X 2 dif
					//3 kind : AAA.X.X X.AAA.X X.X.AAA 2 dif
					//full house: AAA.BB BB.AAA 1 dif
					//4 kind : AAAA.X X.AAAA 1 dif
					
					difCount = 0;
					matchCount = 0;
					
					
					
					
					for (k = 0; k < 4; k++) {
						if (tempRanks[k] != tempRanks[k+1]) {
							difs[difCount] = k;
							difCount++;
						}
						else {
							matches[matchCount] = k;
							matchCount++;
						}
						tieBreaker[k] = 0;
					}
					
					//Hand Values:
					//1 - high card
					//2 - 1-pair
					//3 - 2-pair
					//4 - 3-kind
					//5 - straight
					//6 - flush
					//7 - full hosue
					//8 - quads
					//9 - straight flush
					
					
					
					switch (difCount) {
						case 0: //5-kind, impossible
							doWarn("Five-of-a-Kind encountered");
						break;
						case 1: //4-kind or Full House
							if (difs[0] == 0 || difs[0] == 3) {
								//################################## 4-kind
								tieBreaker[0] = 8;
								
								
								temp = difs[0];
								if (temp == 3) temp = 4;
								
								tieBreaker[1] = tempRanks[2]; //since it is sorted, middle card is guaranteed to be a quad
								tieBreaker[2] = tempRanks[ temp ];
							}
							else {
								//################################## Full House
								tieBreaker[0] = 7; 
								
								if (difs[0] == 1) {
									//pair leads
									tieBreaker[1] = tempRanks[4];
									tieBreaker[2] = tempRanks[0];
								}
								else {
									//3-kind leads
									tieBreaker[1] = tempRanks[0];
									tieBreaker[2] = tempRanks[4];
								}
							}
						break;
						case 2: //3-kind or 2-pair
							if ( Math.abs(matches[0]-matches[1]) == 1 ) {
								//################################## 3-kind
								tieBreaker[0] = 4;
								
								tieBreaker[1] = tempRanks[2]; //since it is sorted, middle card is guaranteed to be 3-kind
								
								switch(matches[0]) {
									case 0:
										tieBreaker[2] = (1<<tempRanks[3])|(1<<tempRanks[4]);
									break;
									case 1:
										tieBreaker[2] = (1<<tempRanks[0])|(1<<tempRanks[4]);
									break;
									case 2:
										tieBreaker[2] = (1<<tempRanks[0])|(1<<tempRanks[1]);
									break;
								}
								
								
							}
							else {
								//################################## 2-pair
								tieBreaker[0] = 3;
								
								//cards are sorted, last pair is highest
								tieBreaker[1] = tempRanks[matches[1]];
								tieBreaker[2] = tempRanks[matches[0]];
								
								//2 pair : X.AA.BB AA.X.BB AA.BB.X 2 dif
								
								if (difs[0] == 0) {
									tieBreaker[3] = tempRanks[0];
								}
								else {
									if (difs[2] == 3) {
										tieBreaker[3] = tempRanks[4];
									}
									else {
										tieBreaker[3] = tempRanks[2];
									}
								}
								
							}
						break;
						case 3:
							//################################## 1-pair
							tieBreaker[0] = 2;
							
							tieBreaker[1] = tempRanks[matches[0]];
							
							
							for (k = 0; k < 5; k++) {
								if ( (k != matches[0]) && (k != (matches[0]+1)) ) {
									tieBreaker[2] = tieBreaker[2] | (1<<tempRanks[k]);
								}
							}
							
						break;
						case 4:
							//no pairs (high card), possible flush and/or straight
							
							
							for (k = 1; k < 5; k++) {
								
								if (tempSuits[0] != tempSuits[k]) {
									hasFlush = false;
								}
							}
							
							//bit-shifting all the ranks guarantees unique tie-breakers with no pairs
							
							ignoreNext = false;
							
							if (tempRanks[4] == 12) {
								//has an ace, check for the wheel (ace-low straight)
								tieBreaker[1] = 1<<3;
								for (k = 0; k < 4; k++) {
									if (tempRanks[k] != k) {
										hasStraight = false;
									}
									tieBreaker[1] = tieBreaker[1] | (1<<tempRanks[k]);
								}
								if (hasStraight) {
									ignoreNext = true;
								}
							}
							if (!ignoreNext) {
								tieBreaker[1] = 1<<tempRanks[4];
								hasStraight = true;
								for (k = 0; k < 4; k++) {
									tieBreaker[1] = tieBreaker[1] | (1<<tempRanks[k]);
									
									if ( (tempRanks[k+1]-tempRanks[k]) != 1 ) {
										hasStraight = false;
									}
								}
							}
							
							temp = 0;
							if (hasStraight) {
								temp += 1;
							}
							if (hasFlush) {
								temp += 2;
							}
							
							switch (temp) {
								case 0:
									//################################## high card
									tieBreaker[0] = 1;
								break;
								case 1:
									//################################## straight
									tieBreaker[0] = 5;
								break;
								case 2:
									//################################## flush
									tieBreaker[0] = 6;
								break;
								case 3:
									//################################## straight flush !
									tieBreaker[0] = 9;
								break;
							}
							
							
						break;
						
					}
					
					//Show-Down
					
					k = 0;
					
					while ( (k < 4) && (tieBreaker[k] == returnObj.bestTieBreaker[k]) ) {
						k++;
					}
					
					if (k == 4) {
						//draw
					}
					else {
						if (tieBreaker[k] > returnObj.bestTieBreaker[k]) {
							for (m = 0; m < 4; m++) {
								returnObj.bestTieBreaker[m] = tieBreaker[m];
							}
							returnObj.worstCards[0] = i;
							returnObj.worstCards[1] = j;
							returnObj.bestCards[0] = tempCards[0];
							returnObj.bestCards[1] = tempCards[1];
							returnObj.bestCards[2] = tempCards[2];
							returnObj.bestCards[3] = tempCards[3];
							returnObj.bestCards[4] = tempCards[4];
						}
					}
					
					
				}
			}
			
			tstr = "";
			tempCount = 0;
			for (k = 0; k < 5; k++) {
				tstr += gsContext.gameTable.physicalCards[returnObj.bestCards[k]].stringVal + " ";
			}
			returnObj.bestHand = tstr;
			
			//tstr += "---- Best Hand:" + handStrings[returnObj.bestTieBreaker[0]] + " ("+returnObj.bestTieBreaker[0]+")";

			return returnObj;
		},

		moveButtonForward: function() {
			pushTrace("moveButtonForward()");
			
			gsContext.gameTable.buttonInd = gsContext.findNextAvailPlayer(gsContext.gameTable.buttonInd);
			
			if (gsContext.gameTable.buttonInd == -1) {
				//all players out of chips, game over (this should not happen)
				doWarn("GAME OVER");
				popTrace();
				return;
			} 
			
			var xmod = 1;
			if (gsContext.gameTable.buttonInd > 4) {
				xmod = -1;
			}
			
			gsContext.gameTable.buttonTargetPos.x = (gsContext.players[gsContext.gameTable.buttonInd].playerPos.x)+xmod*10;// + xmod * 10;
			gsContext.gameTable.buttonTargetPos.y = gsContext.players[gsContext.gameTable.buttonInd].playerPos.y-5;// + 6;// - 5;
			
			gsContext.gameTable.smallBlindInd = gsContext.findNextAvailPlayer(gsContext.gameTable.buttonInd);
			gsContext.gameTable.bigBlindInd = gsContext.findNextAvailPlayer(gsContext.gameTable.smallBlindInd);
			
			gsContext.players[gsContext.gameTable.smallBlindInd].playerBet = gsContext.gameTable.smallBlindAmount;
			gsContext.players[gsContext.gameTable.bigBlindInd].playerBet = gsContext.gameTable.smallBlindAmount*2;
			gsContext.players[gsContext.gameTable.smallBlindInd].playerChips -= gsContext.gameTable.smallBlindAmount;
			gsContext.players[gsContext.gameTable.bigBlindInd].playerChips -= gsContext.gameTable.smallBlindAmount*2;
			
			
			gsContext.setActivePlayer( gsContext.findNextAvailPlayer(gsContext.gameTable.bigBlindInd) );
			
			
			
			popTrace();
			
		},

		initGame:function(tID) {
			pushTrace("initGame()");
			
			//gsContext = this;
			
			

			if (gsContext.players == null || gsContext.players == undefined) {
				gsContext.createPlayers(10);
			}
			if (gsContext.gameTable == null || gsContext.gameTable == undefined) {
				gsContext.createGameTable(tID);
			}
			
			
			popTrace();

		},
		
		resetFolds:function() {
			pushTrace("resetFolds()");
			
			var i;
			
			callCount = 0;
			
			gsContext.gameTable.minBet = gsContext.gameTable.smallBlindAmount*2;
			
			for (i = 0; i < gsContext.maxPlayers; i++) {
				if (gsContext.players[i].playerChips >= gsContext.gameTable.minBet) {
					gsContext.players[i].isFolded = false;
				}
				else {
					gsContext.players[i].isFolded = true;
				}
				gsContext.players[i].betThisRound = false;
				gsContext.players[i].playerBet = 0;
			}
			
			popTrace();
		},
		
		endHand: function() {
			pushTrace("endHand()");
			
			gsContext.rankAllHands();
			
			gsContext.beginDeal();
			popTrace();
		},
		
		
		beginDeal: function() {
			pushTrace("beginDeal()");
			gsContext.resetFolds();
			gsContext.collectAllCards();
			gsContext.moveButtonForward();
			gsContext.shuffleDeck();
			gsContext.dealAllCards();
			popTrace();
		},
		
		playerJoin: function(pName, pEmail) {
			pushTrace("playerJoin("+pName+", "+pEmail+")")
			var i;
			
			var emptySeat = -1;
			
			for (i = 0; i < gsContext.maxPlayers; i++) {
				if (!gsContext.seatIsReady(i)) {
					emptySeat = i;
					break;
				}
			}
			
			if (emptySeat == -1) {
				doWarn("No Open Slots to Join");
			}
			else {
				gsContext.players[emptySeat].playerName = pName;
				gsContext.players[emptySeat].playerChips = 1000;
			}
			popTrace();
		},
		
		invalidateBets: function() {
			pushTrace("invalidateBets()");
			var i;
			
			for (i = 0; i < gsContext.maxPlayers; i++) {
				gsContext.players[i].betThisRound = false;
			}
			popTrace();
		},
		
		checkAllBets: function() {
			pushTrace("checkAllBets()");
			var i;
			
			for (i = 0; i < gsContext.maxPlayers; i++) {
				if (gsContext.seatIsReady(i)) {
					if (gsContext.players[i].betThisRound == false) {
						popTrace();
						return false;
					}
				}
			}
			popTrace();
			return true;
		},
		
		addToBet: function(raiseAmount) {
			pushTrace("addToBet("+raiseAmount+")");
			var i;
			
			var curPlayer = gsContext.players[gsContext.gameTable.activePlayer];
			var minToCall = gsContext.gameTable.minBet-curPlayer.playerBet;
			var newBet = minToCall+raiseAmount;
			
			curPlayer.betThisRound = true;
			
			if ( (curPlayer.playerChips - (minToCall+raiseAmount) ) < (gsContext.gameTable.smallBlindAmount*2) ) {
				//player does not have enough chips left over for next round, should all-in by default
				newBet = curPlayer.playerChips;
				raiseAmount = Math.max(newBet - minToCall,0);
			}
			
			
			//Cannot bet more chips than any other player has
			var maxChips = 0;
			for (i = 0; i < gsContext.maxPlayers; i++) {
				if (i != gsContext.gameTable.activePlayer) {
					if (gsContext.players[i].playerChips > maxChips) {
						maxChips = gsContext.players[i].playerChips;
					}
				}
			}
			
			if ((gsContext.gameTable.minBet + raiseAmount) > maxChips) {
				raiseAmount = Math.max(0, maxChips - gsContext.gameTable.minBet);
				newBet = minToCall+raiseAmount;
			}
			
			gsContext.gameTable.minBet += raiseAmount;
			curPlayer.playerChips -= newBet;
			curPlayer.playerBet += newBet;
			
			
			
			if (raiseAmount > 0) {
				gsContext.invalidateBets();
			}
			
			
			if (gsContext.checkAllBets()) {
				//Every player has bet
				if (gsContext.gameTable.cards.length < 5) {
					
					
					if (gsContext.gameTable.cards.length == 0) {
						//Deal the Flop
						for (i = 0; i < 3; i++) {
							gsContext.dealTableCard();
						}
					}
					else {
						//Deal the Turn and River
						gsContext.dealTableCard();
					}
					
					
					gsContext.invalidateBets();
					gsContext.setActivePlayer( gsContext.findNextAvailPlayer(gsContext.gameTable.activePlayer) );
				}
				else {
					//show all cards, compare hands
					gsContext.endHand();
				}
			}
			else {
				//not all players have placed their bet
				gsContext.setActivePlayer( gsContext.findNextAvailPlayer(gsContext.gameTable.activePlayer) );
			}
			
			popTrace();
			
		},
		
		doFold: function() {
			pushTrace("doFold()");
			gsContext.players[gsContext.gameTable.activePlayer].isFolded = true;
			gsContext.gameTable.callCount++;
			gsContext.setActivePlayer( gsContext.findNextAvailPlayer(gsContext.gameTable.activePlayer) );
			popTrace();
		},
		doCall: function() {
			pushTrace("doCall()");
			gsContext.addToBet(0);
			popTrace();
		},
		doRaise: function(rAmount) {
			pushTrace("doRaise()");
			gsContext.addToBet(rAmount);
			popTrace();
			
			
			//if (gsContext.players[gsContext.gameTable.activePlayer].playerChips < rAmount ) {
				//myGlobals.globVar.getBetPanel().show();
			//}
			//else {
				
				
			//}
			
			
		}
		
		

	}

};


myGlobals.mainObj = {
    extend: 'Ext.app.Controller',

    config: {
		//phone,tablet,desktop
        //profile: Ext.os.deviceType.toLowerCase()//"tablet"://"phone"//Ext.os.deviceType.toLowerCase()

		profile: "phone",
		//profile: "tablet"
		
		//gameState: null
		

    },

    views : [
        'MainPlayer',
        'MainDealer'
    ],

    // stores: ['Searches'],
	
	preInit: function() {
		var thisObj = this;
		
		var i;
		
		for (i = 0; i < 10; i++) {
			thisObj.refs.push({
				ref:'player'+i,
				selector:'#player'+i,
			});
		}
		
		for (i = 0; i < 52; i++) {
			thisObj.refs.push({
				ref:'card'+i,
				selector:'#card'+i
			});
		}
	},
	
    refs: [
		{
			ref       : 'mainDealer',
			selector  : 'maindealer',
			xtype     : 'maindealer'
		},
		{
			ref       : 'mainPlayer',
			selector  : 'mainplayer',
			xtype     : 'mainplayer'
		},
		{
			ref       : 'joinButton',
			selector  : '#joinButton'
		},
		{
			ref       : 'startButton',
			selector  : '#startButton'
		},
		{
			ref: 'playerRegPopup',
			selector: '#playerRegPopup'
		},
		{
			ref: 'dealerRegPopup',
			selector: '#dealerRegPopup'
		},
		{
			ref: 'dealerRegForm',
			selector: '#dealerRegForm'
		},
		
		{
			ref: 'betBar',
			selector: '#betBar'
		},
		
		{
			ref: 'betPanel',
			selector: '#betPanel'
		},
		
		
		{
			ref: 'dealerRegName',
			selector: '#dealerRegName'
		},
		{
			ref: 'dealerRegEmail',
			selector: '#dealerRegEmail'
		},
		{
			ref: 'dealerRegTableNum',
			selector: '#dealerRegTableNum'
		},
		
		{
			ref: 'dealerButton',
			selector: '#dealerButton'
		},
		
		
		
		{
			ref: 'playerRegForm',
			selector: '#playerRegForm'
		},
		{
			ref: 'playerTable',
			selector: 'mainplayer > playertable'
		},
		{
			ref: 'dealerTable',
			selector: 'maindealer > dealertable'
		},
		
		{
			ref: 'betAmount',
			selector: '#betAmount'	
		}
		
		
	],

	launch: function() {
		pushTrace('Main Launch');
		popTrace();
	},
	
	
	
	
	updateSeats: function() {
		pushTrace("updateSeats()");
		
		var i;
		
		var gs = gsContext;
		
		var dvar;
		var curPlayer;
		
		for (i = 0; i < gs.maxPlayers; i++) {
			curPlayer = this['getPlayer'+i]();
			
			
			if (i < 5) {
				dvar = "DealerSeat";
				
			}
			else {
				dvar = "DealerSeatFlipped";
			}
			
			
			if (!gs.seatIsReady(i)) {
				dvar += "Inactive"
			}
			else {
				if (i == gs.gameTable.activePlayer) {
					dvar += "Active";
				}
				else {
					if (gs.players[i].betThisRound) {
						dvar += "HasBet";
					}
				}
			}
			
			curPlayer.setCls(dvar);
			curPlayer.setHtml(
				"<p class='"+dvar+"'>" + gs.players[i].playerName +
				"</br>Chips: " + gs.players[i].playerChips + 
				"</br>Bet: "+ parseInt(gs.players[i].playerBet,10) +
				"</p>"
			);
			
			curPlayer.setLeft( (gs.players[i].playerPos.x-gs.players[i].playerScale.x/2)+'%');
			curPlayer.setTop( (gs.players[i].playerPos.y-gs.players[i].playerScale.y/2)+'%');
			
			curPlayer.setWidth(gs.players[i].playerScale.x+'%');
			curPlayer.setHeight(gs.players[i].playerScale.y+'%');
			
			curPlayer.setZIndex(100+i);
			
		}
		
		popTrace();
	},
	
	doAnimate: function() {
		var xx = new Date();
		myGlobals.myCounter++;
		
		var i;
		var gt = gsContext.gameTable;
		var numCards = gt.physicalCards.length;
		var curCard;
		
		
		for (i = 0; i < numCards; i++) {
			if ( Math.abs(gt.physicalCards[i].curPos.x - gt.physicalCards[i].targetPos.x) > 0.01 || Math.abs(gt.physicalCards[i].curPos.y - gt.physicalCards[i].targetPos.y) > 0.01) {
				
				gt.physicalCards[i].curPos.x += (gt.physicalCards[i].targetPos.x-gt.physicalCards[i].curPos.x)/2.0;
				gt.physicalCards[i].curPos.y += (gt.physicalCards[i].targetPos.y-gt.physicalCards[i].curPos.y)/2.0;
				
				curCard = myGlobals.globVar['getCard'+i]();
				
				curCard.setLeft( (gt.physicalCards[i].curPos.x - gt.deckScale.x/2 )+'%');
				curCard.setTop( (gt.physicalCards[i].curPos.y - gt.deckScale.y/2 )+'%');

			}
		}
		
		gsContext.updateCardTargets();
		
		
		var myButton = myGlobals.globVar.getDealerButton();
		
		if ( Math.abs(gt.buttonCurPos.x - gt.buttonTargetPos.x) > 0.01 || Math.abs(gt.buttonCurPos.y - gt.buttonTargetPos.y) > 0.01) {
			gt.buttonCurPos.x += (gt.buttonTargetPos.x-gt.buttonCurPos.x)/4.0;
			gt.buttonCurPos.y += (gt.buttonTargetPos.y-gt.buttonCurPos.y)/4.0;
		
			myButton.setLeft( (gt.buttonCurPos.x - gt.buttonScale.x/2 )+'%');
			myButton.setTop( (gt.buttonCurPos.y - gt.buttonScale.y/2 )+'%');
		}
		
	},
	
	createButton: function() {
		var myButton = myGlobals.globVar.getDealerButton();
		
		
		myButton.setHtml(
			"<image src='resources/images/holdem/dealerElements/Dealer_button-01.png' width='100%' height='100%' ></image>"
		);
		var gt = gsContext.gameTable;
		
		myButton.setLeft( (gt.buttonCurPos.x - gt.buttonScale.x/2 )+'%');
		myButton.setTop( (gt.buttonCurPos.y - gt.buttonScale.y/2 )+'%');
		
		myButton.setWidth( gt.buttonScale.x + '%');
		myButton.setHeight( gt.buttonScale.y + '%');
		myButton.setZIndex(200);
	},
	

	createCards: function() {
		var i;
		var j;
		
		var myStr = "";
		
		var gt = gsContext.gameTable;
		var curCard;
		var numCards = gsContext.gameTable.physicalCards.length;
		
		for (i = 0; i < numCards; i++) {
			curCard = this['getCard'+i]();
			
			curCard.setHtml(
				"<image src='resources/images/holdem/playerPieces/cards/cards_30percent/" + gt.physicalCards[i].stringVal + ".png' width='100%' height='100%' ></image>"
			);
			
			curCard.setLeft( (gt.deckPos.x - gt.deckScale.x/2 )+'%');
			curCard.setTop( (gt.deckPos.y - gt.deckScale.y/2 )+'%');
			
			curCard.setWidth( gt.deckScale.x + '%');
			curCard.setHeight( gt.deckScale.y + '%');
			
			curCard.setZIndex(10+i);
		}
		
	},

	init: function() {
		pushTrace('Main Init');
		
		var profile = gup("pv"), view;//this.getProfile(), view;
		
		
		
		
		if (profile == "phone") {
			view = this.getMainPlayerView();
		} else {
			view = this.getMainDealerView();
		}
		
		view.create();
		
		this.control({
			'#joinButton': {
				//tap: this.onJoinButtonTap
				tap: function() {
					this.getPlayerRegPopup().show();
				}
			},
			'#startButton': {
				//tap: this.onStartButtonTap
				tap: function() {
					this.getDealerRegPopup().show();
				}
			},
			
			'#playerRegPopup button[text="Ok"]': {
				//tap: this.onPlayerRegPopupOk
				tap: function() {
					this.getMainPlayer().setActiveItem(this.getPlayerTable());
				}
			},
			'#dealerRegPopup button[text="Ok"]': {
				//tap: this.onDealerRegPopupOk
				tap: function() {

					myGlobals.globVar = this;
					gsContext = GameState();
					
					var myName = this.getDealerRegName().getValue();
					if (myName == "") {
						myName = "New Player";
					}
					var myEmail = this.getDealerRegEmail().getValue();
					
					this.getMainDealer().setActiveItem(this.getDealerTable());
					
					gsContext.initGame(this.getDealerRegTableNum().getValue());
					
					gsContext.playerJoin(myName, myEmail);
					
					this.createButton();
					this.createCards();
					
					gsContext.beginDeal();
					
					setInterval(this.doAnimate,100);

				}
			},
			
			'#playerRegPopup button[text="Cancel"]': {
				tap: function() {
					this.getPlayerRegPopup().hide();
				}
			},
			'#dealerRegPopup button[text="Cancel"]': {
				tap: function() {
					this.getDealerRegPopup().hide();
					
				}
			},
			
			
			'#betBar button[text="Fold"]': {
				tap: function() {
					gsContext.doFold();
				}
			},
			'#betBar button[text="Call/Check"]': {
				tap: function() {
					gsContext.doCall();
				}
			},
			'#betBar button[text="Raise"]': {
				tap: function() {
					var myRaise = parseInt(myGlobals.globVar.getBetAmount().getValue(),10);
					
					if (myRaise) {
						
					}
					else {
						myRaise = 0;
					}
					myRaise = Math.min( Math.max(myRaise,gsContext.gameTable.smallBlindAmount*2), gsContext.players[gsContext.gameTable.activePlayer].playerChips );
					
					gsContext.doRaise(myRaise);
				}
			}
			
		});
		
		popTrace();
	}
};

myGlobals.mainObj.preInit();

Ext.define('HoldEm.controller.Main', myGlobals.mainObj);
 