Ext.define('HoldEm.view.MainDealer', {
    extend: 'Ext.Container',
	xtype: 'maindealer',
	
    requires: [
        'HoldEm.view.dealer.DealerStart',
		'HoldEm.view.dealer.DealerTable',
		'HoldEm.view.dealer.DealerSeat'
    ],

    config: {
        fullscreen: true,
        layout: 'card',
        items: [
            {
                xtype: 'dealerstart'
			},
			{
                xtype: 'dealertable'
			},
			{
                xtype: 'dealerseat'
			}
        ]
    }
});