Ext.define('HoldEm.view.MainPlayer', {
    extend: 'Ext.Container',
	xtype: 'mainplayer',
	
    requires: [
        'HoldEm.view.player.PlayerStart',
		'HoldEm.view.player.PlayerTable'
    ],

    config: {
	
        fullscreen: true,
        layout: 'card',
        items: [
            {
                xtype: 'playerstart'
			},
			{
	            xtype: 'playertable'
			}
        ]
    }
});