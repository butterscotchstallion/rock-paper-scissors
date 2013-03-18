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
    
    test('getOutcomeDescription should describe the outcome', function () {
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'scissors'
        });
        
        // rock crushes scissors
        strictEqual(result.outcomeVerb, 'crushes');
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