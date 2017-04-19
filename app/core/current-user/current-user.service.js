'use strict';
angular.
  module('core.CurrentUser').
  factory('CurrentUser',
    [
      function(){
        return {userId:'',name:'',email:'',picUrl:''};
      }
    ]
  );
