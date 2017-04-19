'use strict';
angular.
module('profile').
component('profile',{
    templateUrl: 'profile/profile.template.html',
    controller: ['$scope','$http','$timeout','$location','CurrentUser','$compile','$element',
    function ProfileController($scope,$http,$timeout,$location,CurrentUser,$compile,$element) {
      $scope.heroInf = {} ;
      $scope.file = {} ;
      $scope.saveReport = "";
      $scope.imgSrc = document.querySelector('.profile');
      $scope.token = localStorage.getItem('token');
      $scope.CurrentUser = CurrentUser ;
      var img = angular.element(document.querySelector('#img'));
      $http.post('http://localhost:9000/me',{'token':$scope.token}).then
        (function(res){
           $scope.hero = res.data.user ;
           $scope.imgSrc.src = "img/"+$scope.hero.picUrl ;
           if(res.data.user.picUrl){
             img.removeClass('ng-hide');
           }
           CurrentUser.userId = res.data.user._id ;
           CurrentUser.name = res.data.user.name ;
           CurrentUser.email = res.data.user.email;
           CurrentUser.picUrl = res.data.user.picUrl;
           var compileHtml = $compile('<navbar></navbar>')($scope);
           $("#nav").append(compileHtml);
        });
    	  $scope.previewFile = function() {
    	    var preview = document.querySelector('.profile');
          var file    = document.querySelector('input[type=file]').files[0];
          var token = $scope.token ;
          var reader  = new FileReader();
          var formData = new FormData();
          formData.append('profilePic',file);
          $scope.file = file ;
          formData.append('userToken',token);
          reader.addEventListener("load",
            function () {
              preview.src = reader.result;
              img.removeClass('ng-hide');
            }
          ,false);

          if (file) {
            reader.readAsDataURL(file);
          }
        }
        $scope.save = function(){
          var profileFormData = new FormData();
          var file = document.querySelector('input[type=file]').files[0];
          var hero = $scope.hero ;
          hero = JSON.stringify(hero) ;
          profileFormData.append('imgProfile',file);
          profileFormData.append('infProfile',hero);
          $http.post('http://localhost:9000/edit-profile',profileFormData,{
            headers:{'Content-type': undefined}
          })
               .then(function success(res){
                 CurrentUser.picUrl = res.data.picUrl;
                 CurrentUser.name = res.data.name;
                 localStorage.setItem("token",$scope.token);
                 $scope.saveReport = "save success";
                 $timeout(function() {$scope.saveReport = "";}, 4000);
                 $location.path('/');
                },
                function error(){
                  console.log("errorr edit profile") ;
                }
              );
        }


    	 
    }
   ]
});