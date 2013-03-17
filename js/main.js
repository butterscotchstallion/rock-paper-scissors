

require.config({
    baseUrl: "/rps/js",
    
    paths: {
        Bootstrap : 'lib/bootstrap.min',
        
        RPS       : './app/rps'
    }
});

require(['jquery', 'RPS', 'Bootstrap'], function($, rps) {

    $(function() {
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
            
            $('#history').prepend('<li>#' + moveNumber + ' Computer plays ' + rps.computer.weapon + '; ' + result + '</li>');  
            moveNumber++;            
        });
    });
    
});
