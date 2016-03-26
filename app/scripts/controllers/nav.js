'use strict';

/**
 * @ngdoc function
 * @name angularmonApp.controller:NavctrlCtrl
 * @description
 * # NavctrlCtrl
 * Controller of the angularmonApp
 */
angular.module('angularmonApp')
  .controller('NavCtrl', function ($scope, $location) {


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Initialize if we are mobile or dektop
    //and if our navbar is collapsed
    $scope.collapseNav = true;
    $scope.isMobile = function() {

      //Check to see if the css rule for the collapsible applies
      var mq = window.matchMedia('(max-width: 767px)');

      return mq.matches;
    }

  //Fucntion to find the active page
  $scope.isActive = function(route) {
    return route === $location.path();
  }
  });
