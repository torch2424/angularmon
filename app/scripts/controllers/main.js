'use strict';

/**
 * @ngdoc function
 * @name angularmonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularmonApp
 */
angular.module('angularmonApp')
  .controller('MainCtrl', function ($scope,
      PokemonApi, BattleManager, $timeout) {

    //For tests
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var initPokemon = [
      {
        "name": "Bouffalant",
        "spriteUrl": "http://pokeapi.co/media/img/626.png",
        "hp": 95,
        "attack": 110,
        "defense": 95,
        "sp_atk": 40,
        "sp_def": 95,
        "speed": 55,
        "moves": [
          {
            "accuracy": 0,
            "category": "",
            "created": "2013-11-03T15:06:10.352782",
            "description": "Inflicts regular damage.  Ignores accuracy and evasion modifiers.",
            "id": 332,
            "modified": "2013-12-24T15:24:31.634878",
            "name": "Aerial-ace",
            "power": 60,
            "pp": 20,
            "resource_uri": "/api/v1/move/332/"
          },
          {
            "accuracy": 100,
            "category": "",
            "created": "2013-11-03T15:06:10.218327",
            "description": "Inflicts regular damage.  If the target damaged the user this turn and was the last to do so, this move has double power.\n\npain-split does not count as damaging the user.",
            "id": 279,
            "modified": "2013-12-24T15:24:31.297471",
            "name": "Revenge",
            "power": 60,
            "pp": 10,
            "resource_uri": "/api/v1/move/279/"
          },
          {
            "accuracy": 85,
            "category": "",
            "created": "2013-11-03T15:06:09.566867",
            "description": "Inflicts regular damage.  Hits 2–5 times in one turn.\n\nHas a 3/8 chance each to hit 2 or 3 times, and a 1/8 chance each to hit 4 or 5 times.  Averages to 3 hits per use.",
            "id": 31,
            "modified": "2013-12-24T15:24:29.816909",
            "name": "Fury-attack",
            "power": 15,
            "pp": 20,
            "resource_uri": "/api/v1/move/31/"
          },
          {
            "accuracy": 100,
            "category": "",
            "created": "2013-11-03T15:06:09.633754",
            "description": "Inflicts regular damage.\n\nIf the target is in the first turn of dive, this move will hit with double power.",
            "id": 57,
            "modified": "2013-12-24T15:24:29.987907",
            "name": "Surf",
            "power": 95,
            "pp": 15,
            "resource_uri": "/api/v1/move/57/"
          }
        ]
      },
      {
        "name": "Machop",
        "spriteUrl": "http://pokeapi.co/media/img/66.png",
        "hp": 70,
        "attack": 80,
        "defense": 50,
        "sp_atk": 35,
        "sp_def": 35,
        "speed": 35,
        "moves": [
          {
            "accuracy": 100,
            "category": "",
            "created": "2013-11-03T15:06:09.966740",
            "description": "Inflicts regular damage.  Has a 100% chance to lower the target's accuracy by one stage.",
            "id": 189,
            "modified": "2013-12-24T15:24:30.755443",
            "name": "Mud-slap",
            "power": 20,
            "pp": 10,
            "resource_uri": "/api/v1/move/189/"
          },
          {
            "accuracy": 100,
            "category": "",
            "created": "2013-11-03T15:06:10.438699",
            "description": "Inflicts regular damage, then lowers the user's Defense and Special Defense by one stage each.",
            "id": 370,
            "modified": "2013-12-24T15:24:31.846680",
            "name": "Close-combat",
            "power": 120,
            "pp": 5,
            "resource_uri": "/api/v1/move/370/"
          },
          {
            "accuracy": 100,
            "category": "",
            "created": "2013-11-03T15:06:09.500246",
            "description": "Inflicts regular damage.  Has a 10% chance to burn the target.",
            "id": 7,
            "modified": "2013-12-24T15:24:29.681811",
            "name": "Fire-punch",
            "power": 75,
            "pp": 15,
            "resource_uri": "/api/v1/move/7/"
          },
          {
            "accuracy": 100,
            "category": "",
            "created": "2013-11-03T15:06:10.093079",
            "description": "Inflicts regular damage.  Power and type are determined by the user's IV.\n\nPower is given by `x * 40 / 63 + 30`.  `x` is obtained by arranging bit 1 from the IV for each of Special Defense, Special Attack, Speed, Defense, Attack, and HP in that order.  (Bit 1 is 1 if the IV is of the form `4n + 2` or `4n + 3`.  `x` is then 64 * Special Defense IV bit 1, plus 32 * Special Attack IV bit 1, etc.)\n\nPower is always between 30 and 70, inclusive.  Average power is 49.5.\n\nType is given by `y * 15 / 63`, where `y` is similar to `x` above, except constructed from bit 0.  (Bit 0 is 1 if the IV is odd.)  The result is looked up in the following table.\n\nValue | Type\n----: | --------\n    0 | fighting\n    1 | flying\n    2 | poison\n    3 | ground\n    4 | rock\n    5 | bug\n    6 | ghost\n    7 | steel\n    8 | fire\n    9 | water\n   10 | grass\n   11 | electric\n   12 | psychic\n   13 | ice\n   14 | dragon\n   15 | dark\n\nThis move thus cannot be normal.  Most other types have an equal 1/16 chance to be selected, given random IV.  However, due to the flooring used here, bug, fighting, and grass appear 5/64 of the time, and dark only 1/64 of the time.",
            "id": 237,
            "modified": "2013-12-24T15:24:31.040996",
            "name": "Hidden-power",
            "power": 1,
            "pp": 15,
            "resource_uri": "/api/v1/move/237/"
          }
        ]
      }
    ]

    //Timeout for animations
    $timeout(function () {

        //Set up our scope player and enemy
        $scope.player = initPokemon[0];
        $scope.enemy = initPokemon[1];

        //Our Meter percentages
        $scope.playerHealth = {
            hp: $scope.player.hp,
            percent: "100%"
        };
        $scope.enemyHealth = {
            hp: $scope.enemy.hp,
            percent: "100%"
        };

        //Our attacking boolean
        $scope.noAttack = false;

        //Our message to the player
        $scope.message = "What will you do?"

    }, 10);

    //First get our pokemon
    $scope.init = function() {

        //Dont need a payload
        var payload = {};
        PokemonApi.get(payload, function(response) {

            //Set our pokemon in scope
            $scope.player = response[0];
            $scope.enemy = response[1];

            //Set our meter health
            $scope.playerHealth.hp = $scope.player.hp;
            $scope.enemyHealth.hp = $scope.enemy.hp;
        },
        //Errors
        function(error) {

        })
    }
    //$scope.init();

    //Function to use an attack
    $scope.attack = function(moveIndex) {

        //No attacking
        $scope.noAttack = true;

        //You attack the enemy
        //Calculate the damage
        var damage = BattleManager.calculateDamage($scope.player.moves[moveIndex], $scope.player, $scope.enemy);

        //Do the math to our meters
        $scope.enemyHealth.hp = $scope.enemyHealth.hp - damage;

        //Apply the style to our enemy meter
        if($scope.enemyHealth.hp <= 0) $scope.enemyHealth.percent = 0;
        else $scope.enemyHealth.percent = Math.ceil($scope.enemyHealth.hp / $scope.enemy.hp * 100) + "%";

        //display the message
        $scope.message = $scope.player.name + " does " + damage + " damage to " + $scope.enemy.name;

        //Timeout for a second then let the enemy attack
        $timeout(function () {

            //Get a random move of the enemy
            var enemyMove = Math.floor((Math.random() * 4))

            //Calculate the damage
            var damage = BattleManager.calculateDamage($scope.enemy.moves[enemyMove], $scope.enemy, $scope.player);

            //Do the math to our meters
            $scope.playerHealth.hp = $scope.playerHealth.hp - damage;

            //Apply the style to our enemy meter
            if($scope.playerHealth.hp <= 0) $scope.playerHealth.percent = 0;
            else $scope.playerHealth.percent = Math.ceil($scope.playerHealth.hp / $scope.player.hp * 100) + "%";

            //display the message
            $scope.message = $scope.enemy.name + " does " + damage + " damage to " + $scope.player.name;

            //timeout before showing the message and table again
            $timeout(function () {

                //Our attacking boolean
                $scope.noAttack = false;

                //Our message to the player
                $scope.message = "What will you do?"
            }, 1500);
        }, 1500);

    }

  });
