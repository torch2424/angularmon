'use strict';

/**
 * @ngdoc function
 * @name angularmonApp.controller:SpinnerCtrl
 * @description
 * # SpinnerCtrl
 * Controller of the angularmonApp
 */
angular.module('angularmonApp')
  .controller('SpinnerCtrl', function ($scope, loadingSpinner) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Initialize our loading spinner
    $scope.loading = loadingSpinner;
  });
