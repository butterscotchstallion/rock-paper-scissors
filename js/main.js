

require.config({
    baseUrl: "/rock-paper-scissors/js",
    
    paths: {
        // Libs
        bootstrap    : 'lib/bootstrap.min',
        underscore   : 'lib/underscore.min',
        backbone     : 'lib/backbone.min',
        handlebars   : 'lib/handlebars.min',
        text         : 'lib/text',
        
        // App
        RPS          : './app/rps',
        AppView      : './app/views/appView',
        GameInfoView : './app/views/gameInfoView'
    },
    shim: {
        underscore: {
          exports: '_'
        },
        backbone: {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
        }
    }
});

require(['jquery', 'RPS', 'bootstrap', 'AppView', 'GameInfoView'], function($, rps, bootstrap, AppView, GameInfoView) {

    $(function() {
    
        new AppView();
        
        var moveNumber = 1;
        
        $('button').on('click', function () {            
            var result = rps.play({
                playerWeapon: $(this).data('weapon')
            });
            
            // Clear initial content
            if ($('#history > #placeholder').length === 1) {
                $('#history').empty();
            }
            
            $('#player-score').text(rps.player.score.integerValue);
            $('#player-moves').text(rps.player.moves.length);
            $('#player-score-percentage').text(rps.player.score.percentValue + '%');
            $('#player-rock-count').text(rps.countMoves('player', 'rock'));
            $('#player-paper-count').text(rps.countMoves('player', 'paper'));
            $('#player-scissors-count').text(rps.countMoves('player', 'scissors'));
            
            $('#computer-score').text(rps.computer.score.integerValue);
            $('#computer-moves').text(rps.computer.moves.length);
            $('#computer-score-percentage').text(rps.computer.score.percentValue + '%');
            $('#computer-rock-count').text(rps.countMoves('computer', 'rock'));
            $('#computer-paper-count').text(rps.countMoves('computer', 'paper'));
            $('#computer-scissors-count').text(rps.countMoves('computer', 'scissors'));
            
            var sentence = '<li>#' + moveNumber;
            
            // If player defeats computer, phrase it like "Player's rock crushes computer's scissors"
            if (result === 'win') {
                sentence += " Player's " + rps.player.weapon + ' ' + rps.getOutcomeVerb();
                sentence += " Computer's " + rps.computer.weapon;
            } else if (result === 'lose') {
                sentence += " Computer's " + rps.computer.weapon + ' ' + rps.getOutcomeVerb();
                sentence += " Player's " + rps.player.weapon;
            } else {
                sentence += ' DRAW';
            }
            
            sentence += '</li>';
            
            $('#history').prepend(sentence);  
            moveNumber++;            
        });
    });
    
});
