'use strict';
angular.
  module('appMain').
  component('appMain', {
    templateUrl: 'app-main/app-main.template.html',
    controller: ['$http','CurrentUser','$compile','$scope','$location',
     function AppMainController($http,CurrentUser,$compile,$scope,$location) {
       this.me = {} ;
       var token ;
       token = localStorage.getItem('token');
       
       if(token == null || token.length<1) {
          token="1";
          var compileHtml = $compile('<navbar></navbar><hero-list></hero-list>')($scope);
          $("#main").append(compileHtml);
       }
        
       
       if(token.length > 2 ){
        $http.post('http://localhost:9000/me',{token : token})
          .then(function success (res){
              if(res.data.type == true){
               // this.me = res.data.user;
                CurrentUser.userId = res.data.user._id;
                CurrentUser.name = res.data.user.name;
                CurrentUser.picUrl = res.data.user.picUrl;
                var compileHtml = $compile('<navbar></navbar><hero-list></hero-list>')($scope);
                $("#main").append(compileHtml);

              }
              if (res.data.type == false){
                 token = "";
                 localStorage.setItem('token',token);
                  location.reload();
              }
          },function error(res) { 
            
                console.log('error in meee');
            });
       }
    }
      ]
  });