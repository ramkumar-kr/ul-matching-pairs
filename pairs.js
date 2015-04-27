/*
	JavaScript Pairs Game 

License: 
	GNU General Public License 3 (http://www.gnu.org/licenses/gpl-3.0.txt)

Copyright:
	Copyright (c) 2008 [Marco Stahl](http://javascriptpairs.sourceforge.net)

*/
var Card = new Class( {	
	pairsGame: null,
	imageSrc: null,
	hiddenImageSrc: null,
	image: null,
	cardImage: null,
	width: null,
	height: null,
	hidden: true,
	imageLoaded: false,
	hiddenImageLoaded: false,
	animRunning: false,
	
	initialize: function (pairsGame,imageSrc) {
		var self = this;
		this.pairsGame = pairsGame;
		this.imageSrc = imageSrc;
		this.hiddenImageSrc = pairsGame.hiddenImage;
		
		// loading cardImage
		this.cardImage = new Image();
		$(this.cardImage).addEvent('load',function(){
			if (this.imageLoaded) {
				return;
			}
			this.imageLoaded = true;
			this.width = this.cardImage.width;
			this.height = this.cardImage.height;
			this.pairsGame.onCardImageLoaded(this);
		}.bindWithEvent(this));
		this.cardImage.src = imageSrc;		
		
		/* init with hidden Image */ 
		this.image = new Image();
		this.image.width = pairsGame.cardWidth;
		this.image.height = pairsGame.cardHeight;
		$(this.image).addEvent('load',function(){
			if (this.hiddenImageLoaded) {
				return;
			}
			this.hiddenImageLoaded = true;
			this.image.width = pairsGame.cardWidth;
			this.image.height = pairsGame.cardHeight;
		}.bindWithEvent(this));
		this.image.src = this.hiddenImageSrc;		
		this.hidden = true;
		
		$(this.image).addEvent('click',function(){
			if (this.hidden && !this.animRunning) {
				if (! this.imageLoaded) {
					alert("Please try again after some seconds! Still loading image.");
					return;
				}
				this.show();
				pairsGame.clickedCards++;
				if (pairsGame.lastClickedCard != null) {
					if (this.equals(pairsGame.lastClickedCard)) {
						pairsGame.lastClickedCard = null;
						pairsGame.hiddenCards = pairsGame.hiddenCards-2;
					} else {
						pairsGame.lastClickedCard.hide();
						pairsGame.lastClickedCard = this;
					}
				} else {
					pairsGame.lastClickedCard = this;
				}						
			}
		}.bindWithEvent(this));	 
	},
	
	hide: function() {
		this.hidden = true;
		this.animRunning = true;
		var imageChanged = false;
		var exampleFx = new Fx.Morph(this.image, {
								duration: 500, 
								transition: Fx.Transitions.Sine.easeInOut			
						});
						
		exampleFx.addEvent('chainComplete', function() {
									if (imageChanged) {
										this.animRunning = false;										
										return;
									}									
									this.image.src = this.hiddenImageSrc;
									this.image.width = 1;
									imageChanged = true;
									exampleFx.start({
										'width':  this.pairsGame.cardWidth,
										'height': this.pairsGame.cardHeight
									});
								}.bindWithEvent(this));
		exampleFx.start.pass([{
			'width':  this.pairsGame.cardWidth,
			'height': 1
		}], exampleFx).delay(1000);
	},
	
	show: function() {
		this.image.height = this.pairsGame.cardHeight; 
		this.hidden = false;
		this.animRunning = true;
		var imageChanged = false;
		var exampleFx = new Fx.Morph(this.image, {
								duration: 250, 
								transition: Fx.Transitions.Sine.easeInOut			
						});
						
		exampleFx.addEvent('chainComplete', function() {
									if (imageChanged) {
										this.animRunning = false;
										this.pairsGame.onCardShown();
										return;
									}
									this.image.src = this.imageSrc;
									imageChanged = true;
									this.image.width = 1;
									exampleFx.start( {
										'width':  this.pairsGame.cardWidth,
										'height': this.pairsGame.cardWidth/this.width*this.height
									});
								}.bindWithEvent(this));
		exampleFx.start({
			'width':  1,
			'height': this.pairsGame.cardHeight
		});
	},
	
	equals: function(otherCard) {
		return this.imageSrc == otherCard.imageSrc;
	}
	
});

function getRandomList(length,sourceList) {
	var sourceListCopy = [];
	sourceListCopy.extend(sourceList);
	shuffle(sourceListCopy);
	var resultList = [];
	var i = 0;
	while (i<length && i < sourceListCopy.length) {
		resultList.push(sourceListCopy[i]);		
		i++;
	}
	while (i<length) {
		resultList.push(sourceListCopy[$random(0,sourceList.length-1)]);	
		i++;
	}
	return resultList;
}

function shuffle(array) {	
	array.each(function(element,i) {
		var targetIndex = $random(0,array.length-1);
		array[i] = array[targetIndex];
		array[targetIndex] = element; 
	});
}


var PairsGame = new Class({
	hiddenImage: null,
	cardWidth: null,
	cardHeight: null,
	clickedCards: 0, 
	hiddencards: 0,
	numberOfCards: null,
	loadedCards: 0,
	loadProgressDisplay: null,
	
	initialize: function(options) {
		var self = this;
		var container =  $(options.containerId);
		this.cardWidth = options.cardWidth;
		this.cardHeight = options.cardHeight;
		var cols = options.cols;
		var rows = options.rows;
		var cells = cols*rows;
		
		self.hiddenImage = options.hiddenImage;
		var imageBase = options.imageBase;
		var imageSrcList = options.images.map(function(imageFilename){
			return imageBase+imageFilename;
		});
		
		// fill grid with random cards
		
		self.numberOfCards = cells;
		self.hiddenCards = cells;
		self.clickedCards = 0;
		self.loadedCards = 0;
		
		var randomImageSrcList = getRandomList(cells/2,imageSrcList);					
		var cards = [];		
		randomImageSrcList.each(function (randomImageSrc) {
			cards.push(new Card(self,randomImageSrc));
			cards.push(new Card(self,randomImageSrc));
		});
		shuffle(cards);
		
		var grid = [];
		cols.times (function(col) {
			grid[col] = []
			rows.times (function(row) {
				grid[col].push(cards.pop());
			});
		});
		
		// build the DOM Table
		var gridTable = new Element('table');
		gridTable.set('cellpadding',"0");
		gridTable.set('cellspacing',"0");
		gridTable.set('border',"0");
		var gridTableBody = new Element('tbody');
		gridTable.appendChild(gridTableBody);
		rows.times (function(row) {
			var tr = new Element('tr');
			gridTableBody.appendChild(tr)
			cols.times (function(col) {
				var card = grid[col][row];
				var td = new Element('td');
				tr.appendChild(td);
				td.appendChild(card.image);
			});
		});
		
		// build a Loading progress text
		self.loadProgressDisplay = new Element('div');
		
		container.empty()
		container.appendChild(self.loadProgressDisplay);						
		container.appendChild(gridTable);
		
		self.refreshLoadProgressDisplay();
		
	},

	onCardShown: function() {
		if (this.hiddenCards == 0) {
			alert("Finished with "+this.clickedCards+" Clicks");
			location.href="https://www.urbanladder.com"
		}
	},
	
	onCardImageLoaded: function() {
		this.loadedCards++;
		this.refreshLoadProgressDisplay();
		if (this.loadedCards >= this.numberOfCards) {		
			//this.loadProgressDisplay.set('visible',false);
			this.loadProgressDisplay.setStyle('display','none');
		}
	},
	
	refreshLoadProgressDisplay: function() {
		var percent = Math.round(this.loadedCards/this.numberOfCards*100); 
		this.loadProgressDisplay.set('html','Loading Images ('+percent+'%) ...');
	}
	


})

