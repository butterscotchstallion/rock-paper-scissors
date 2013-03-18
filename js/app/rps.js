/**
 * RPS
 *
 */
'use strict';
define('RPS', function () {
    
    return (function () { 
        var instance = {
            player: {
                weapon: '',
                
                score: {
                    integerValue: 0,
                    percentValue: 0
                },
                
                moves: []
            },
            
            computer: {
                weapon: '',
                
                score: {
                    integerValue: 0,
                    percentValue: 0
                },
                
                moves: []
            },
            
            outcome: 'draw'
        };
        
        instance.availableWeapons = [
            'rock',
            'paper',
            'scissors'
        ];
        
        instance.getOutcomeVerb = function () {
            var verb;
            
            // player rock crushes computer scissors
            if (instance.player.weapon === 'rock' && instance.computer.weapon === 'scissors') {
                verb = 'crushes';
            }
            
            // player paper covers computer rock
            if (instance.player.weapon === 'paper' && instance.computer.weapon === 'rock') {
                verb = 'covers';
            }
            
            // player scissors cut computer paper
            if (instance.player.weapon === 'scissors' && instance.computer.weapon === 'paper') {
                verb = 'cut';
            }
            
            // computer scissors cut player paper
            if (instance.computer.weapon === 'scissors' && instance.player.weapon === 'paper') {
                verb = 'cut';
            }
            
            // computer rock crushes player scissors
            if (instance.computer.weapon === 'rock' && instance.player.weapon === 'scissors') {
                verb = 'crushes';
            }
            
            // computer paper covers player rock
            if (instance.computer.weapon === 'paper' && instance.player.weapon === 'rock') {
                verb = 'covers';
            }
            
            return verb;
        };
        
        instance.getWeaponCounter = function (weapon) {
            var counter;
            
            switch (weapon) {
                case 'rock':
                    counter = 'paper';
                break;
                
                case 'scissors':
                    counter = 'rock';
                break;
                
                case 'paper':
                    counter = 'scissors';
                break;
            }
            
            return counter;
        };
        
        // Gets most common player move (don't need to know about computer, for now)
        instance.getMostCommonMove = function () {
            var moves = [];
            var mlen  = instance.availableWeapons.length;
            
            // Iterate available weapons and count the occurance of each
            for (var j = 0; j < mlen; j++) {
                switch(instance.availableWeapons[j]) {
                    case 'rock':
                        moves.push({ weapon: 'rock', occurance: instance.countMoves('player', 'rock') });
                    break;
                    
                    case 'paper':
                        moves.push({ weapon: 'paper', occurance: instance.countMoves('player', 'paper') });
                    break;
                    
                    case 'scissors':
                        moves.push({ weapon: 'scissors', occurance: instance.countMoves('player', 'scissors') });
                    break;
                }
            }
            
            moves.sort(function (a, b) {
                if (a.occurance < b.occurance) {
                    return -1;
                }
                
                if (a.occurance > b.occurance) {
                    return 1;
                }
                
                return 0;
            });
            
            return moves.pop().weapon;
        };
        
        instance.countMoves = function (target, weapon) {
            var moves      = target === 'player' ? instance.player.moves : instance.computer.moves;
            var numberOfMoves = 0;
            var mlen          = moves.length;
            
            for (var j = 0; j < mlen; j++) {
                if (moves[j] === weapon) {
                    numberOfMoves++;
                }
            }
            
            return numberOfMoves;
        };
        
        instance.resetState = function () {
            instance.player.score.integerValue   = 0;
            instance.player.score.percentValue   = 0;
            instance.player.moves.length         = 0;
            
            instance.computer.score.integerValue = 0;            
            instance.computer.score.percentValue = 0;            
            instance.computer.moves.length       = 0;
        };
        
        instance.getRandomWeapon = function () {
            var w = instance.availableWeapons;
            
            return w[Math.floor(Math.random() * w.length)];
        };
        
        instance.validateWeapon = function (weapon) {
            return instance.availableWeapons.indexOf(weapon) > -1;
        };
        
        instance.setPlayerWeapon = function (weapon) {
            instance.player.weapon = weapon;
        };
        
        instance.setComputerWeapon = function (weapon) {
            instance.computer.weapon = weapon;
        };
        
        instance.updateScore = function (result) {
            if (result === 'win') {
                instance.player.score.integerValue++;
                
                var playerMoves = instance.player.moves.length;
                var playerWins  = instance.player.score.integerValue;
                
                instance.player.score.percentValue = Math.floor((playerWins / playerMoves) * 100);
            }
            
            if (result === 'lose') {
                instance.computer.score.integerValue++;
                
                var computerMoves = instance.computer.moves.length;
                var computerWins  = instance.computer.score.integerValue;
                
                instance.computer.score.percentValue = Math.floor((computerWins / computerMoves) * 100);
            }
        };
        
        instance.getOutcome = function () {
            // Player crushes computer's scissors
            if (instance.player.weapon === 'rock' && instance.computer.weapon === 'scissors') {
                instance.outcome = 'win';
            }
            
            // Player covers computer's rock
            if (instance.player.weapon === 'paper' && instance.computer.weapon === 'rock') {
                instance.outcome = 'win';
            }
            
            // Player cuts computer's paper
            if (instance.player.weapon === 'scissors' && instance.computer.weapon === 'paper') {
                instance.outcome = 'win';
            }
            
            // Computer crushes player's scissors
            if (instance.player.weapon === 'scissors' && instance.computer.weapon === 'rock') {
                instance.outcome = 'lose';
            }
            
            // Computer cuts player's paper
            if (instance.player.weapon === 'paper' && instance.computer.weapon === 'scissors') {
                instance.outcome = 'lose';
            }
            
            // Computer covers player's rock
            if (instance.player.weapon === 'rock' && instance.computer.weapon === 'paper') {
                instance.outcome = 'lose';
            }
            
            // Draw
            if (instance.player.weapon === instance.computer.weapon) {
                instance.outcome = 'draw';
            }
            
            instance.player.moves.push(instance.player.weapon);
            instance.computer.moves.push(instance.computer.weapon);
            instance.updateScore(instance.outcome);
            
            return instance.outcome;
        };
        
        instance.applyConfiguration = function (cfg) {
            var playerWeaponIsValid   = false;
            var computerWeaponIsValid = false;
            
            if (typeof cfg.playerWeapon !== 'undefined') {
                playerWeaponIsValid   = instance.validateWeapon(cfg.playerWeapon);
                
                instance.setPlayerWeapon(cfg.playerWeapon);
            }
            
            if (typeof cfg.computerWeapon !== 'undefined') {
                computerWeaponIsValid = instance.validateWeapon(cfg.playerWeapon);                
                instance.setComputerWeapon(cfg.computerWeapon);
            } else {
                var weapon;
                
                if (instance.player.moves.length > 3) {
                    weapon = instance.getWeaponCounter(instance.getMostCommonMove());
                } else {
                    weapon = instance.getRandomWeapon();
                }
                
                instance.setComputerWeapon(weapon);
                computerWeaponIsValid = true;
            }
            
            return playerWeaponIsValid && computerWeaponIsValid;
        };
        
        instance.play = function (cfg) {
            var configIsValid = instance.applyConfiguration(cfg);
            
            return configIsValid ? instance.getOutcome() : false;
        };
        
        
        return instance;
        
    })();
    
});