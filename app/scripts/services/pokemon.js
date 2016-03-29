'use strict';

/**
 * @ngdoc service
 * @name angularmonApp.pokemon
 * @description
 * # pokemon
 * Service in the angularmonApp.
 */
angular.module('angularmonApp')
  .service('PokemonApi', function ($resource) {

      return $resource('https://aaronthedev.com:3000/angularmon', {}, {
      get: {
        method: 'GET',
        params: {},
        isArray: true
      }

    });

  });
