var dealerTableProps = {
	extend: 'Ext.Container',
	xtype: 'dealertable',
	
	config: {
		cls: 'DealerTable',
		
		defaults: {
			xtype: 'container',
			floating:true,
			visible:true//,
			//zindex:10
	    },
		
		preInit: function() {
			var thisObj = this;
			
			var i;
			
			for (i = 0; i < 10; i++) {
				thisObj.items.push({
					id:'player'+i
				});
			}
			
			for (i = 0; i < 52; i++) {
				thisObj.items.push({
					id:'card'+i
				});
			}
			
			thisObj.items.push({
				id:'dealerButton'
			});
			
			thisObj.items.push({
				xtype:'actionsheet',
				id:'actionSheet',
			    items: [
			        /*{
			            text: 'Delete draft',
			            ui  : 'decline'
			        },
			        {
			            text: 'Save draft'
			        },*/
			        {
			            text: 'Proceed',
			            ui  : 'confirm'
			        }
			    ]
			});
			
		},
		
		items: [
			
		]
		
		
	}
	
};

dealerTableProps.config.preInit();

Ext.define('HoldEm.view.dealer.DealerTable', dealerTableProps);