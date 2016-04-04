'use strict';

/**
 * @ngdoc service
 * @name angularmonApp.loadingSpinner
 * @description
 * # loadingSpinner
 * Service in the angularmonApp.
 */
angular.module('angularmonApp')
  .service('loadingSpinner', function ($timeout) {

      //Boolean if are loading
      var loading = false;

      //Stack for errors
      var errors = [];
      var timeoutErrors = [];

      //Timeout limit
      var timeoutLimit = 30000;

      return {

          //Needs to be a function,
          //or else will not update across controllers
          isLoading: function() {
              if(loading) return true
              else return false
          },

          startLoading: function() {

              //First, make the body non interactable
              document.body.class = document.body.class + " noTouch";

              //Add a timeout to the pending errors
              timeoutErrors.push($timeout(function () {

                  //Push onto the error stack
                  errors.push({
                      message: "This is taking a bit longer than expected. Please check that you have an internet connection, or the server may be down. Also, Try refreshing the page!"
                  })

                  //Pop from the timeouterrors array
                  if(timeoutErrors.length > 0) {

                      $timeout.cancel(timeoutErrors[0]);
                      timeoutErrors = timeoutErrors.splice(0, 1);
                  }

              }, timeoutLimit));

              loading = true;
              return true;
          },

          stopLoading: function() {

              //First, make the body interactable again
              document.body.class = document.body.class.replace(" noTouch", "");

              loading = false;

              //Pop from the errors array
              if(timeoutErrors.length > 0) {

                  $timeout.cancel(timeoutErrors[0]);
                  timeoutErrors = timeoutErrors.splice(0, 1);
              }
              if(errors.length > 1) errors = errors.pop();

              return false;
          },

          getErrors: function() {
              return errors;
          },

          addError: function(error) {

              //Pop from the errors array
              if(timeoutErrors.length > 0) {

                  $timeout.cancel(timeoutErrors[0]);
                  timeoutErrors = timeoutErrors.splice(0, 1);
              }

              //Now simply add to the errors array
              //Add a link to more info if applicable
              if(error.data.link) {

                  errors.push({
                      message: error.data.msg,
                      link: error.data.link,
                      linkTitle: error.data.linkTitle
                  });
              }
              else {

                  errors.push({
                      message: error.data.msg
                  });
              }
          }
      };
  });
