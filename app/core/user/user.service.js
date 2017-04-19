'use strict';

angular.
  module('core.user').
  factory('user', 
    ['$resource',
      function($resource) {
        return $resource('http://localhost:9000/:req', {}, {
          query: {
            method: 'GET',
            params: {req: 'curent-user'},
            isArray: true
          }
        });
      }
  ]);