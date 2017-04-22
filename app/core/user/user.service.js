'use strict';

angular.
  module('core.user').
  factory('user', 
    ['$resource',
      function($resource) {
        return $resource('/:req', {}, {
          query: {
            method: 'GET',
            params: {req: 'curent-user'},
            isArray: true
          }
        });
      }
  ]);