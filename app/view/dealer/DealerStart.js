var regPopupProps = {
	xtype:'panel',
	id: 'regPopup',
    floating: true,
	hidden: true,
    modal: true,
    centered: true,
    width: 300,
    height: 330,
    scroll: 'vertical',
	hideOnMaskTap:false,

	dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Register'
    }],

/*
	preInit: function() {
		var thisObj = this;
		var i;
	},
*/

	items: [
		{
			xtype:'panel',
			padding:10,
			border:10,

			items: [
				{
		        	xtype: 'fieldset',
					id:'regForm',
			        //title: 'Register',
			        //instructions: 'Please enter the information above.',
			        defaults: {
			            // labelAlign: 'right'
			            labelWidth: '35%'
			        },
			        items: [
						{
							id:'regName',
				            xtype: 'textfield',
				            name: 'name',
				            label: 'Name',
				            placeHolder: 'Your Name',
				            autoCapitalize : true,
				            //required: true,
				            useClearIcon: true
				        },
						{
							id:'regEmail',
			                xtype: 'emailfield',
							name: 'email',
			                label: 'Email',
			                placeHolder: 'Your Email',
			                useClearIcon: true
			            },
						{
							id:'regTableNum',
			                xtype: 'selectfield',
			                name: 'tableNum',
			                label: 'Table #',
							
			                options: [
								{
									text:"1",
				                    value: 1
				                }, {
									text:"2",
				                    value: 2
				                }, {
									text:"3",
				                    value: 3
				            	}, {
									text:"4",
				                    value: 4
				                }, {
									text:"5",
				                    value: 5
				                }, {
									text:"6",
				                    value: 6
				            	}, {
									text:"7",
				                    value: 7
				            	}, {
									text:"8",
				                    value: 8
				            	}, {
									text:"9",
				                    value: 9
				            	}, {
									text:"10",
				                    value: 10
				            	}
							]
						},
						{
							id:'regAINum',
			                xtype: 'selectfield',
			                name: 'aiNum',
			                label: 'AI Players',

			                options: [
								{
									text:"5",
				                    value: 5
				                }, {
									text:"0",
				                    value: 0
				                },{
									text:"1",
				                    value: 1
				                }, {
									text:"2",
				                    value: 2
				                }, {
									text:"3",
				                    value: 3
				            	}, {
									text:"4",
				                    value: 4
				                }, {
									text:"5",
				                    value: 5
				                }, {
									text:"6",
				                    value: 6
				            	}, {
									text:"7",
				                    value: 7
				            	}, {
									text:"8",
				                    value: 8
				            	}, {
									text:"9",
				                    value: 9
				            	}
							]
						}
						
					]
				}
			]
		},
		{
			//padding:10
		},
		{
			xtype:'panel',
			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'center'
			},
			items: [
				{
					text: 'Cancel',
					xtype: 'button',
				},
				{
					padding:10
				},
				{
					text: 'Ok',
					xtype: 'button'
				}
			]
		}
	]
};

var dealerStartProps = {
	extend: 'Ext.Container',
	xtype: 'dealerstart',
	
	config: {
	    cls: 'DealerStart',
	    layout: {
	        type: 'vbox',
			align:'center',
			pack:'center'
	    },
	
		cardSwitchAnimation:'flip',

		preInit: function() {
			var thisObj = this;
			
			thisObj.items.push(regPopupProps);
		},

	    items: [
			{
				html: "<div class='splashText'> Welcome to the Sencha Texas Hold 'Em Dealer Site! </div></br>",
			},
			{
				text: 'Start a New Table',
				xtype: 'button',
				id: 'joinButton'
			}
		]
	}
};

dealerStartProps.config.preInit();

Ext.define('HoldEm.view.dealer.DealerStart', dealerStartProps);