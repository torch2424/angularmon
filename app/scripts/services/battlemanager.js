'use strict';

/**
 * @ngdoc service
 * @name angularmonApp.BattleManager
 * @description
 * # BattleManager
 * Service in the angularmonApp.
 */
angular.module('angularmonApp')
  .service('BattleManager', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //Following: http://bulbapedia.bulbagarden.net/wiki/Damage

    //Is the game over
    var gameOver = false;

    //Default level for now
    var level = 12;

    //Default modifier to just random section for now
    var modifier = Math.floor((Math.random() * 15) + 85) / 100;


    return {

        calculateDamage: function(move, attacker, defender) {

            var levelCalc = (2 * level + 10) / 250;
            var attackDef = (attacker.attack / defender.defense);

            return Math.floor((levelCalc * attackDef * move.power + 2) * modifier);
        },

        isGameOver: gameOver


    }

  });
