'use strict';
angular.
module('login').
component('login',{
	templateUrl: 'login/login.template.html',
	controller: ['$http','$location','$route','CurrentUser','$scope','$mdDialog',
	  function LoginController($http,$location,$route,CurrentUser,$scope, $mdDialog) { 
		  var self = this; 
      var showError = "" ;
		  self.userData = {};
      self.showAlert = function(ev) {
        $mdDialog.show(
         $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('error')
          .textContent(showError)
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
        );
      };

	  self.token = localStorage.getItem('token');  
    if(self.token){
      if(self.token.length > 3){
       	  $location.path('/');
      }
    } 
		 self.errorLogin = "";
		 self.logIn = function(user) {
		   var userData = angular.copy(user);
		   if ( userData != null ) {
		   $http.post('http://localhost:9000/login',userData)
		        .then(function(res){
		      	    if(res.data.type == true){
		      	  	  self.currentUser = { userId:res.data.user.userId,name:res.data.user.name,picUrl:res.data.user.picUrl};
                  CurrentUser.name = res.data.user.name;
                  CurrentUser.userId = res.data.user._id;
                  CurrentUser.picUrl = res.data.user.picUrl;
		      	  	  localStorage.setItem("token",JSON.stringify(res.data.token));
                  var token = localStorage.getItem('token');
		      	  	  $location.path('/app-main');
		      	    }
		      	    else{
                showError = "your username or password is incorrect";
		      	  	self.showAlert($scope);
		      	    }
		        });
        }
        else{
          showError = "please fill username and password";
          self.showAlert($scope);
        }

	    };

		  self.register = function(newUser){
          var master ={};
          master = angular.copy(newUser);
          if(master != null) {
            $http.post('http://localhost:9000/register',master).
            then(function(res){
              if(res.data.type == true ){
                CurrentUser.userId = res.data._id;
                CurrentUser.name = res.data.name;
                CurrentUser.email = res.data.email
                localStorage.setItem("token",JSON.stringify(res.data.token));
                self.registerStatus = "register succesfull" ;
                $location.path('/');
              }
              else{
                showError = "your username or email is teken";
                self.showAlert($scope); 
              }
            },
            function(){
              console.log('error in db registration');
            }
           );
          }
          else {
              showError = "please fill forms";
              self.showAlert($scope);
          }

      };
	  }
    ]
});