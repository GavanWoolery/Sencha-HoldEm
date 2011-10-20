Ext.define('HoldEm.view.dealer.DealerStart', {
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

	    items: [
			{
				html: "<div class='splashText'> Welcome to the Sencha Texas Hold 'Em Dealer Site! </div></br>",
			},
			{
				text: 'Start a New Table',
				xtype: 'button',
				id: 'startButton'

			},
			{
				xtype:'panel',
				id: 'dealerRegPopup',
			    floating: true,
				hidden: true,
			    modal: true,
			    centered: true,
			    width: 300,
			    height: 300,
			    scroll: 'vertical',
				hideOnMaskTap:false,

				dockedItems: [{
			        dock: 'top',
			        xtype: 'toolbar',
			        title: 'Register'
			    }],

				items: [
					{
						xtype:'panel',
						padding:10,
						border:10,

						items: [
							{
					        	xtype: 'fieldset',
								id:'dealerRegForm',
						        //title: 'Register',
						        //instructions: 'Please enter the information above.',
						        defaults: {
						            // labelAlign: 'right'
						            labelWidth: '35%'
						        },
						        items: [
									{
										id:'dealerRegName',
							            xtype: 'textfield',
							            name: 'name',
							            label: 'Name',
							            placeHolder: 'Your Name',
							            autoCapitalize : true,
							            //required: true,
							            useClearIcon: true
							        },
									{
										id:'dealerRegEmail',
						                xtype: 'emailfield',
										name: 'email',
						                label: 'Email',
						                placeHolder: 'Your Email',
						                useClearIcon: true
						            },
									{
										id:'dealerRegTableNum',
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

			}
		]
	}
});