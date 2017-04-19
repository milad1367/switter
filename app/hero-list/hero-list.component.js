'use strict';
 angular.
 module('heroList').
 component('heroList',{
	templateUrl: 'hero-list/hero-list.template.html',
	controller: ['$http','$location','$route','$filter','CurrentUser',
	  function HeroListController($http,$location,$route,$filter,CurrentUser) {
		  var self = this;
      self.twitts = {};
      self.token = localStorage.getItem('token');
      if((self.token == null) || (self.token=="")){
        self.token = "";
      }    
      self.user = {'twitt':''};
      self.userTwitt = {name:'',msg:'',picUrl:''};
      self.twitt = function() {
        if(self.user.twitt.length){
          self.userTwitt.userId = CurrentUser.userId;
          self.userTwitt.msg = self.user.twitt;
          self.userTwitt.picUrl = CurrentUser.picUrl;
          self.user.twitt = "" ;    
          $http.post('http://localhost:9000/twitt',self.userTwitt)
              .then(function success (res){
                $route.reload();
              },function error(res) { 
                  console.log('error twitt');
                });
            
        }
      }
        self.CurrentUser = CurrentUser ;
        $http.get('http://localhost:9000/twitts')
              .then(function success(res){
                  self.twitts = res.data ;  
                 },
                 function error(){
                  console.log('error in resive twitts');
                 });
		    $http.get('http://localhost:9000/get').then(function(response){
		 	    self.heroes = response.data;
		    });

        self.showTwitts = function(twitt,flag) {
          if(twitt && self.heroes){
            self.selectHero = $filter('filter')(self.heroes,twitt.from);
            if(flag == "img"){
              return self.selectHero[0].picUrl;
            }
            else{
              return self.selectHero[0].name;
            }
        
     }
     }

	  }
    ]

});