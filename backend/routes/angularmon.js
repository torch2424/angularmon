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
            pokedexId: "1",
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
            pokedexId: "1",
            hp: 1,
            attack: 1,
            defense: 1,
            sp_atk: 1,
            sp_def: 1,
            speed: 1,
            moves: []
        }
    ];

    //Also an emergency struggle move
    var struggle = {
        name: "Struggle",
        id: 0,
        resource_uri: 0,
        created: 0,
        modified: 0,
        description: "Ran out of loop time (I mean PP)",
        power: 50,
        accuracy: 80,
        category: "none",
        pp: 200
    }

    //Get a random number between 1 and
    //max num pokemon sprites of Gen 5 (649)
    var pokemonId = Math.floor((Math.random() * 649) + 1) + ',' +  Math.floor((Math.random() * 649) + 1);

    //Get our pokemon
    var resPokemon = getPokemon(pokemonId);

    resPokemon.then(function(resPokemon) {

        //Get Our moves
        var resMoves = [];
        resMoves[0] = getMoves(resPokemon[0].moves);
        resMoves[1] = getMoves(resPokemon[1].moves);

        //Save our stats while we are waiting
        pokemon[0].name = resPokemon[0].name;
        pokemon[0].pokedexId = resPokemon[0].pkdx_id;
        pokemon[1].name = resPokemon[1].name;
        pokemon[1].pokedexId = resPokemon[1].pkdx_id;
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

        //Call the rest of requried things
        Promise.all([resMoves[0], resMoves[1]]).then(function(response) {

            //Check if any of our response is undefined
            if(!response[0] ||
            !response[1]) {

                //Send an error
                handleError();
            }

            //Set our response to the correct values
            //Sprites on the cleint
            //resSprites = response[0];
            resMoves[0] = response[0];
            resMoves[1] = response[1];

            //Now that we have EVERYTHING, start building our response

            //Finally loop through and grab moves
            var pokeMoves = [resMoves[0], resMoves[1]];

            for(var i = 0; i < pokemon.length; i++) {

                //An array of already added moves
                var addedIndex = [];

                //Create a counter of our while loop
                var moveCount = 0;

                //And we need four moves
                while(pokemon[i].moves.length < 4) {

                    //Get a random move
                    var ranMove = Math.floor(Math.random() * pokeMoves[i].length);

                    //Check if it was already added
                    var added = false;

                    for(var k = 0; k < addedIndex.length; k++) {

                        //If that move index has already
                        if(ranMove == addedIndex[k]) {

                                //Break from this loop, and set added to true
                                added = true;
                                k = addedIndex.length;
                        }
                    }

                    //find moves with power greater than one
                    if(!added &&
                        pokeMoves[i][ranMove] &&
                        pokeMoves[i][ranMove].power > 1) {

                        //Add it to the pokemon
                        pokemon[i].moves.push(pokeMoves[i][ranMove]);

                        //Also, Add it to the added index
                        addedIndex.push(ranMove);
                    }

                    //Increase our move counter
                    moveCount++;

                    //If we cant find a move simply return stuggle
                    if(moveCount > 25) {
                        //Push struggle to the pokemon
                        while(pokemon[i].moves.length < 4) {
                            pokemon[i].moves.push(struggle);
                        }
                    }

                }
            }

            //FINALLY RETURN OUR POKEMON!
            res.send(pokemon);

        }).catch(function(err) {

            //Handler Error
            handleError(res, err);
        });
    }).catch(function(err) {

        //Handler Error
        handleError(res, err);
    });
});



//Function to grab a pokemon
var getPokemon = function(pokemonId) {

    //Request from the api
      return api.get('pokemon', pokemonId);
}


//Function to grab a sprite
//Pass an array to grab multipl sprites
//But sprites now done on the clients
var getSprite = function(reqSprites) {

    //Request from the api
    return api.get(reqSprites);
}

//Function to grab an array of moves
var getMoves = function(reqMoves) {

    //Request from the api
    //Was resPokemon[0].moves
    return api.get(reqMoves);
}

//Function to handler our errors
var handleError = function(res, err) {

    console.log("Angularmon Pokeapi Error!");

    //First check if we have an error
    if(err) {

        console.log(err);
        //Return the response, also with link to rest codes
        res.status(err.code).json({
            msg: "Error " + err.code + ": Please check rest status codes for more information...",
            link: "http://www.restapitutorial.com/httpstatuscodes.html",
            linkTitle: "Rest Status Codes"
        });
    }
    else {

        //We dont have an error must have gotten undefined
        //Or it is a general error
        res.status(500).json({
            msg: "General error, or the pokemon api returned us undefined."
        });
    }
}



module.exports = router;
