/*
Ext.define('HoldEm.view.player.PlayerTable', {
	extend: 'Ext.Container',
	xtype: 'playertable',
	
	config: {
		cls: 'PlayerTable'
		
	}
});
*/



var playerTableProps = {
	extend: 'Ext.Container',
	xtype: 'playertable',
	
	config: {
		cls: 'PlayerTable',
		
		
		
		defaults: {
			xtype: 'container',
			floating:true,
			visible:true,
			zindex:10
	    },
		
		preInit: function() {
			var thisObj = this;
			
			var i;
			
			/*
			for (i = 0; i < 10; i++) {
				thisObj.items.push({
					id:'player'+i
				});
			}
			*/
			
			for (i = 0; i < 52; i++) {
				thisObj.items.push({
					id:'card'+i
				});
			}
			
			thisObj.items.push(
				/*
				{
					id:'dealerButton'
				},
				*/
				{

					xtype:'container',
					floating:true,
					zindex:300,
					left:0,
					bottom:0,
					width:'100%',
					id: 'betBar',
					enabled:false,

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
								width:140,
								id: 'betAmount'
							}
						]

				    }]

				}
				
			);
			
		},
		
		items: [
			
		]
		
		
	}
	
};

playerTableProps.config.preInit();

Ext.define('HoldEm.view.player.PlayerTable', playerTableProps);