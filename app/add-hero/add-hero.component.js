'use strict';
angular.
  module('addHero').
  component('addHero', {
    templateUrl: 'add-hero/add-hero.template.html',
    controller: ['$http','$location',
    function AddHeroController($http,$location) {
      var self = this ;
      self.user = {};
      self.master = {};
      self.session = {};
      self.registerStatus = "" ;
      self.token = {} ;
      self.save = function(user){
        self.master = angular.copy(user);
        $http.post('http://localhost:9000/register',self.master).
          then(function(response){
            self.token = response.data;
            if(self.token.logIn == "pass"){
              console.log('pass');
              localStorage.setItem("token",JSON.stringify(self.token));
              self.registerStatus = "register succesfull" ;
              $location.path('/heroList');
            }
            else{
              self.registerStatus = "name or email is teken" ;
            }
          },
            function(){
              console.log('not ok');
            }
          );

         

       };
       self.reset = function(){
          self.user = angular.copy(self.master);
       };
    }
   ]
  });