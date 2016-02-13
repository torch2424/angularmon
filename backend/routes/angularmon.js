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

    //Get our pokemon
    var resPokemon = getPokemon(pokemonId);

    console.log(resPokemon);

    resPokemon.then(function() {

        console.log(resPokemon);

        //Next get our sprites, build an array
        var reqSprites = [resPokemon.value[0].sprites[0], resPokemon.value[1].sprites[0]];

        //Get our sprites
        var resSprites = getSprite(reqSprites);

        //Get Our moves
        var resMoves = [];
        resMoves[0] = getMoves(resPokemon.value[0].moves);
        resMoves[1] = getMoves(resPokemon.value[1].moves);

        //Save our stats while we are waiting
        pokemon[0].name = resPokemon.value[0].name;
        pokemon[1].name = resPokemon.value[1].name;
        pokemon[0].hp = resPokemon.value[0].hp;
        pokemon[1].hp = resPokemon.value[1].hp;
        pokemon[0].attack = resPokemon.value[0].attack;
        pokemon[1].attack = resPokemon.value[1].attack;
        pokemon[0].defense = resPokemon.value[0].defense;
        pokemon[1].defense = resPokemon.value[1].defense;
        pokemon[0].sp_atk = resPokemon.value[0].sp_atk;
        pokemon[1].sp_atk = resPokemon.value[1].sp_atk;
        pokemon[0].sp_def = resPokemon.value[0].sp_def;
        pokemon[1].sp_def = resPokemon.value[1].sp_def;
        pokemon[0].speed = resPokemon.value[0].speed;
        pokemon[1].speed = resPokemon.value[1].speed;

        //Call the rest of requried things
        Promise.all([resSprites, resMoves[0], resMoves[1]]).then(function() {

            //Finish up and return! :D

            //Now that we have EVERYTHING, start building our response

            //Save our image urls
            pokemon[0].spriteUrl = "http://pokeapi.co" + resSprites.value[0].image
            pokemon[1].spriteUrl = "http://pokeapi.co" + resSprites.value[1].image

            //Finally loop through and grab moves
            var pokeMoves = [resMoves[0], resMoves[1]];

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
        });
    });
});



//Function to grab a pokemon
var getPokemon = function(pokemonId) {

    //Request from the api
      return api.get('pokemon', pokemonId);

    //   .then(function(resPokemon) {
    //
    //       //Success
    //       //Return the response
    //       return resPokemon;
    //   },
    //   //Error, give status to the frontend
    //   function(err) {
    //       res.status(500).json({
    //             msg: "Could not ping the pokeapi for the pokemon!!"
    //       });
    //
    //       //Return false
    //       return false;
    //   });

}


//Function to grab a sprite
//Pass an array to grab multipl sprites
var getSprite = function(reqSprites) {

    //Request from the api
    return api.get(reqSprites);

    // .then(function(resSprites) {
    //
    //     //Success
    //     return resSprites;
    // },
    // //Error
    // function(err) {
    //     res.status(500).json({
    //           msg: "Could not ping the pokeapi for sprites!"
    //     });
    //
    //     return false;
    // })
}

//Function to grab an array of moves
var getMoves = function(reqMoves) {

    //Request from the api
    //Was resPokemon[0].moves
    return api.get(reqMoves);

    // .then(function(resMoves) {
    //
    //     //Success
    //     return resMoves;
    // },
    //
    // //Error
    // function(err) {
    //     res.status(500).json({
    //           msg: "Could not ping the pokeapi for moves!"
    //     });
    //
    //     //Return false
    //     return false;
    // })

    // if(!resMovesOne ||
    // resMovesOne.length < 4) {
    //     res.status(500).json({
    //           msg: "Could not ping the pokeapi for moves!"
    //     });
    // }
}



module.exports = router;
