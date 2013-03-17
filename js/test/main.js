
'use strict';

require.config({
    baseUrl: "../",
    
    paths: {
        RPS          : './app/rps',

        // Tests        
        RPSTests       : './test/resources/tests/RPSTests',
        GameLogicTests : './test/resources/tests/GameLogicTests',
        ScoreTests     : './test/resources/tests/ScoreTests'
    }
});

require(['RPSTests', 'GameLogicTests', 'ScoreTests']);
