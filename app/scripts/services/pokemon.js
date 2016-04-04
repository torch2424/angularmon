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

      return $resource('https://aaronthedev.com:2424/angularmon', {}, {
      get: {
        method: 'GET',
        params: {},
        isArray: true
      }

    });

  });
