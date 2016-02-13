var express = require('express');
var router = express.Router();

//Using Pokeapi for getting all of our pokemon
var PokeApi = require('pokeapi');
var api = PokeApi.v1();

/* GET users listing. */
router.get('/', function(req, res, next) {

    //What we need
    //Pokemon, it's sprite, and 4 moves
    //Need to return two pokemon for fighting
    var pokemon = [
        {
            name: "pokemon",
            spriteUrl: "http://pokeapi.co/media/img/1.png",
            hp: 1,
            attack: 1,
            defense: 1,
            sp_atk: 1,
            sp_def: 1,
            speed: 1,
            moves: []
        },
        {
            name: "pokemon",
            spriteUrl: "http://pokeapi.co/media/img/1.png",
            hp: 1,
            attack: 1,
            defense: 1,
            sp_atk: 1,
            sp_def: 1,
            speed: 1,
            moves: []
        }
    ];

    //Get a random number between 1 and
    //max num pokemon sprites (719)
    var pokemonId = Math.floor((Math.random() * 719) + 1) + ',' +  Math.floor((Math.random() * 719) + 1);

  api.get('pokemon', pokemonId).then(function(resPokemon) {

        //Next get our sprites, build an array
        var reqSprites = [resPokemon[0].sprites[0], resPokemon[1].sprites[0]];

        //Now request
    	api.get(reqSprites).then(function(resSprites) {

            api.get(resPokemon[0].moves).then(function(resMovesOne) {

                if(!resMovesOne ||
                resMovesOne.length < 4) {
                    res.status(500).json({
                          msg: "Could not ping the pokeapi for moves!"
                    });
                }

                api.get(resPokemon[1].moves).then(function(resMovesTwo) {

                    if(!resMovesTwo ||
                    resMovesTwo.length < 4) {
                        res.status(500).json({
                              msg: "Could not ping the pokeapi for moves!"
                        });
                    }

                    //Now that we have EVERYTHING, start building our response

                    //Save Our Name
                    pokemon[0].name = resPokemon[0].name;
                    pokemon[1].name = resPokemon[1].name;

                    //Save our stats
                    pokemon[0].hp = resPokemon[0].hp;
                    pokemon[1].hp = resPokemon[1].hp;
                    pokemon[0].attack = resPokemon[0].attack;
                    pokemon[1].attack = resPokemon[1].attack;
                    pokemon[0].defense = resPokemon[0].defense;
                    pokemon[1].defense = resPokemon[1].defense;
                    pokemon[0].sp_atk = resPokemon[0].sp_atk;
                    pokemon[1].sp_atk = resPokemon[1].sp_atk;
                    pokemon[0].sp_def = resPokemon[0].sp_def;
                    pokemon[1].sp_def = resPokemon[1].sp_def;
                    pokemon[0].speed = resPokemon[0].speed;
                    pokemon[1].speed = resPokemon[1].speed;

                    //Save our image urls
                    pokemon[0].spriteUrl = "http://pokeapi.co" + resSprites[0].image
                    pokemon[1].spriteUrl = "http://pokeapi.co" + resSprites[1].image

                    //Finally loop through and grab moves
                    var pokeMoves = [resMovesOne, resMovesTwo];

                    for(var i = 0; i < pokemon.length; i++) {

                        //An array of already added moves
                        var addedIndex = [];

                        //And we need four moves
                        while(pokemon[i].moves.length < 4) {

                            //Get a random move
                            var ranMove = Math.floor(Math.random() * pokeMoves[i].length);

                            //Check if it was already added
                            var added = false;
                            for(var k = 0; k < addedIndex.length; k++) {
                                if(ranMove == addedIndex[k]) added = true;
                            }

                            //find moves with power greater than one
                            if(!added &&
                                pokeMoves[i][ranMove].power > 1) {

                                //Add it to the pokemon
                                pokemon[i].moves.push(pokeMoves[i][ranMove]);

                                //Also, Add it to the added index
                                addedIndex.push(ranMove);
                            }
                        }
                    }


                    //FINALLY RETURN OUR POKEMON!
                    res.send(pokemon);

                },
                //Error
                function(err) {
                    res.status(500).json({
                          msg: "Could not ping the pokeapi for moves!"
                    });
                })
            },
            //Error
            function(err) {
                res.status(500).json({
                      msg: "Could not ping the pokeapi for moves!"
                });
            })
        },
        //Error
        function(err) {
            res.status(500).json({
                  msg: "Could not ping the pokeapi for sprites!"
            });
        })
    },
    //Error, give status to the frontend
    function(err) {
        res.status(500).json({
              msg: "Could not ping the pokeapi for sprite!"
        });
    });
});



//Function to grab a pokemon
var getPokemon = function() {
      api.get('pokemon', pokemonId).then(function(resPokemon) {

          //Return the response
          return resPokemon;
      },
      //Error, give status to the frontend
      function(err) {
          res.status(500).json({
                msg: "Could not ping the pokeapi for sprite!"
          });

          //Return false
          return false;
      });

}



module.exports = router;
