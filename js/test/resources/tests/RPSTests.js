/**
 * RPS Tests
 *
 */
'use strict';
define('RPSTests', ['RPS'], function (rps) {
    module('Application');
    
    test('rps should return an object', function () {
        strictEqual(typeof rps, 'object');
    });
    
    test('getOutcomeVerb should describe the outcome', function () {
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'scissors'
        });
        
        // player rock crushes scissors
        strictEqual(rps.getOutcomeVerb(), 'crushes');
        
        var result = rps.play({
            playerWeapon: 'paper',
            computerWeapon: 'rock'
        });
        
        // player paper covers rock
        strictEqual(rps.getOutcomeVerb(), 'covers');
        
        var result = rps.play({
            playerWeapon: 'scissors',
            computerWeapon: 'paper'
        });
        
        // player scissors cut paper
        strictEqual(rps.getOutcomeVerb(), 'cut');
        
        var result = rps.play({
            playerWeapon: 'paper',
            computerWeapon: 'scissors'
        });
        
        // computers scissors cut paper
        strictEqual(rps.getOutcomeVerb(), 'cut');
        
        var result = rps.play({
            playerWeapon: 'scissors',
            computerWeapon: 'rock'
        });
        
        // computers rock crushes paper
        strictEqual(rps.getOutcomeVerb(), 'crushes');
        
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'paper'
        });
        
        // computers paper covers rock
        strictEqual(rps.getOutcomeVerb(), 'covers');
    });
    
    test('play should initialize player weapon', function () {

        var result = rps.play({
            playerWeapon: 'rock'
        });
        
        strictEqual(rps.player.weapon, 'rock');        
    });
    
    test('play should initialize computer weapon', function () {

        var result = rps.play({
            computerWeapon: 'paper'
        });
        
        strictEqual(rps.computer.weapon, 'paper');        
    });
    
    test('should not be able to set invalid weapons', function () {
        var result = rps.play({
            computerWeapon: 'banana'
        });
        
        strictEqual(result, false);        
    });
});