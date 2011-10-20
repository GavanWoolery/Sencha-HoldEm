
Ext.define('HoldEm.view.dealer.DealerTable', {
	extend: 'Ext.Container',
	xtype: 'dealertable',
	
	config: {
		cls: 'DealerTable',
		
		
		
		defaults: {
			xtype: 'container',
			//styleHtmlContent:true,
			//width:'16%',
			//height:'20%',
			//align:'right',
			//pack:'center',
			floating:true,
			visible:true,
			zindex:10,
			cls:'DealerSeat'
			
			//x:20
			//x: 100,
			//y: 30
			//floating:true,
			//hidden:false,
			//zindex:100,
			//left:200,
			//top:200,
			//left:200
	    },
		
		/*
		seatTemplate: {
			xtype:'template'
		},
		*/
		
		
		items: [
			{
				id:'player0',
			},
			{
				id:'player1'
			},
			{
				id:'player2'
			},
			{
				id:'player3'
			},
			{
				id:'player4'
			},
			{
				id:'player5'
			},
			{
				id:'player6'
			},
			{
				id:'player7'
			},
			{
				id:'player8'
			},
			{
				id:'player9'
			},
			
			{
				id:'dealerButton'
			},
			
			{
				id: 'card0'
			},
			{
				id: 'card1'
			},
			{
				id: 'card2'
			},
			{
				id: 'card3'
			},
			{
				id: 'card4'
			},
			{
				id: 'card5'
			},
			{
				id: 'card6'
			},
			{
				id: 'card7'
			},
			{
				id: 'card8'
			},
			{
				id: 'card9'
			},




			{
				id: 'card10'
			},
			{
				id: 'card11'
			},
			{
				id: 'card12'
			},
			{
				id: 'card13'
			},
			{
				id: 'card14'
			},
			{
				id: 'card15'
			},
			{
				id: 'card16'
			},
			{
				id: 'card17'
			},
			{
				id: 'card18'
			},
			{
				id: 'card19'
			},




			{
				id: 'card20'
			},
			{
				id: 'card21'
			},
			{
				id: 'card22'
			},
			{
				id: 'card23'
			},
			{
				id: 'card24'
			},
			{
				id: 'card25'
			},
			{
				id: 'card26'
			},
			{
				id: 'card27'
			},
			{
				id: 'card28'
			},
			{
				id: 'card29'
			},



			{
				id: 'card30'
			},
			{
				id: 'card31'
			},
			{
				id: 'card32'
			},
			{
				id: 'card33'
			},
			{
				id: 'card34'
			},
			{
				id: 'card35'
			},
			{
				id: 'card36'
			},
			{
				id: 'card37'
			},
			{
				id: 'card38'
			},
			{
				id: 'card39'
			},



			{
				id: 'card40'
			},
			{
				id: 'card41'
			},
			{
				id: 'card42'
			},
			{
				id: 'card43'
			},
			{
				id: 'card44'
			},
			{
				id: 'card45'
			},
			{
				id: 'card46'
			},
			{
				id: 'card47'
			},
			{
				id: 'card48'
			},
			{
				id: 'card49'
			},



			{
				id: 'card50'
			},
			{
				id: 'card51'
			},
		

			{

				xtype:'container',
				floating:true,
				zindex:300,
				left:0,
				bottom:0,
				width:'100%',
				id: 'betBar',
				
				dockedItems: [{
			        dock: 'top',
			        xtype: 'toolbar',
					floating:false,
					zIndex:300,
					
					items: [
						{
							text: 'Fold',
							xtype: 'button',
						},
						{
							text: 'Call/Check',
							xtype: 'button'
						},
						{
							text: 'Raise',
							xtype: 'button'
						},
						{
							placeHolder: 'Bet Amount',
							xtype: 'textfield',
							id: 'betAmount'
							
						}
					]
					
			    }]
				
			},
			{
				id				: 'betPanel',
				xtype           : 'panel',
				cls				: '',
	            floating        : true,
	            modal           : true,
	            hidden          : true,
				centered		: true,
	            width           : 300,
	            height          : 200,
				zIndex          : 1000, 
	            styleHtmlContent: true,
	            html: '<p>Please enter a valid bet amount or fold.</p>',
	            items: [{
	                    docked: 'top',
	                    xtype : 'toolbar',
	                    title : 'Invalid Bet'
	            }],
	            scrollable: true
	        }

			
			
			
			
			
		]
		
		
	}
	
});