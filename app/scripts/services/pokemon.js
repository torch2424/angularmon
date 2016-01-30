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

      return $resource('http://mangorabo.ngrok.kondeo.com:8080/angularmon', {}, {
      get: {
        method: 'GET',
        params: {},
        isArray: true
      }

    });

  });
