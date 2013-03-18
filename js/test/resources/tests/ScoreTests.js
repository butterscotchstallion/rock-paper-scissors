/**
 * RPS Score Tests
 *
 */
'use strict';
define('ScoreTests', ['RPS'], function (rps) {
    module('Score');
    
    test('instance.resetState should reset scores and moves', function () {
        rps.resetState();
        
        strictEqual(rps.player.score.integerValue, 0);
        strictEqual(rps.player.score.percentValue, 0);
        strictEqual(rps.player.moves.length, 0);
        
        strictEqual(rps.computer.score.integerValue, 0);
        strictEqual(rps.computer.score.percentValue, 0);        
        strictEqual(rps.computer.moves.length, 0);
    });
    
    test('getWeaponCounter should return the weapon that counters a given weapon', function () {       
        strictEqual(rps.getWeaponCounter('rock'), 'paper');        
        strictEqual(rps.getWeaponCounter('scissors'), 'rock');        
        strictEqual(rps.getWeaponCounter('paper'), 'scissors');    
    });
    
    test('getMostCommonMove should return the most common move', function () {
        
        rps.resetState();
        
        rps.play({
            playerWeapon: 'scissors',
            computerWeapon: 'rock'
        });
        
        rps.play({
            playerWeapon: 'scissors',
            computerWeapon: 'paper'
        });
        
        rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'scissors'
        });
        
        strictEqual(rps.getMostCommonMove(), 'scissors');           
    });
    
    test('countMoves should count the number of moves given a weapon', function () {
        
        rps.resetState();
        
        rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'scissors'
        });
        
        strictEqual(rps.countMoves('player', 'rock'), 1);        
        strictEqual(rps.countMoves('computer', 'scissors'), 1);        
    });
    
    test('score percentage should never exceed 100', function () {
        
        rps.resetState();
        
        for (var j = 0; j < 50; j++) {
            rps.play({
                playerWeapon: 'rock',
                computerWeapon: 'scissors'
            });
        }
        
        ok(rps.player.score.percentValue <= 100);        
    });
    
    test('computer win should increment computer score percentage', function () {
        
        rps.resetState();
        
        var result = rps.play({
            playerWeapon: 'paper',
            computerWeapon: 'scissors'
        });
        
        strictEqual(rps.computer.score.percentValue, 100);        
    });
    
    test('player win should increment player score percentage', function () {
        
        rps.resetState();
        
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'scissors'
        });
        
        strictEqual(rps.player.score.percentValue, 100);        
    });
    
    test('play should increment number of moves', function () {
        
        rps.resetState();
        
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'scissors'
        });
        
        strictEqual(rps.player.moves.length, 1);        
        strictEqual(rps.computer.moves.length, 1);        
    });
    
    test('player winning should increment player score', function () {

        rps.resetState();
        
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'scissors'
        });
        
        strictEqual(rps.player.score.integerValue, 1);        
    });
    
    test('player losing should increment computer score', function () {

        rps.resetState();
    
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'paper'
        });
        
        strictEqual(rps.computer.score.integerValue, 1);        
    });
    
    
});