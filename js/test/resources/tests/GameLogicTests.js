/**
 * RPS - game logic tests
 *
 */
'use strict';
define('GameLogicTests', ['RPS'], function (rps) {
    module('Game Logic');
    
    test('player rock should crush computer scissors', function () {
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'scissors'
        });
        
        strictEqual(result, 'win');        
    });
    
    test('player paper should cover computer rock', function () {
        var result = rps.play({
            playerWeapon: 'paper',
            computerWeapon: 'rock'
        });
        
        strictEqual(result, 'win');        
    });
    
    test('player scissors should cut computer paper', function () {
        var result = rps.play({
            playerWeapon: 'scissors',
            computerWeapon: 'paper'
        });
        
        strictEqual(result, 'win');        
    });
    
    test('computer rock should crush player scissors', function () {
        var result = rps.play({
            playerWeapon: 'scissors',
            computerWeapon: 'rock'
        });
        
        strictEqual(result, 'lose');        
    });
    
    test('computer scissors should cut player paper', function () {
        var result = rps.play({
            playerWeapon: 'paper',
            computerWeapon: 'scissors'
        });
        
        strictEqual(result, 'lose');        
    });
    
    test('computer paper should cover player rock', function () {
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'paper'
        });
        
        strictEqual(result, 'lose');        
    });
    
    test('identical weapons should cause a draw', function () {
        var result = rps.play({
            playerWeapon: 'rock',
            computerWeapon: 'rock'
        });
        
        strictEqual(result, 'draw');        
    });
    
    test('getRandomWeapon should return rock/paper/scissors', function () {
        var randomWeapon  = rps.getRandomWeapon();
        var weapons       = ['rock', 'paper', 'scissors'];
        var weaponIsValid = weapons.indexOf(randomWeapon);
        
        notStrictEqual(weaponIsValid, -1);
    });
    
    
});