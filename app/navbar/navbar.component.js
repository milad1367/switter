// Register the `phoneList` component on the `phoneList` module,
angular
  .module('navbar')
  .config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
      .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
  })
  .component('navbar', {
  	templateUrl: 'navbar/navbar.template.html',
  	controller: ['$http','$location','$mdDialog','CurrentUser',
      function NavbarController($http,$location,$mdDialog,CurrentUser) {
        var originatorEv;
        this.fProfile = false ;
        this.token = localStorage.getItem('token');  
        if(CurrentUser.userId.length > 3){
          this.fProfile = true ;
          this.CurrentUser = CurrentUser;
        }
        this.openMenu = function($mdMenu,ev) {
          originatorEv = ev;
          $mdMenu.open(ev);
        };
        this.notificationsEnabled = true;
        this.toggleNotifications = function() {
          this.notificationsEnabled = !this.notificationsEnabled;
        };
        this.redial = function() {
          $mdDialog.show(
            $mdDialog.alert()
            .targetEvent(originatorEv)
            .clickOutsideToClose(true)
            .parent('body')
            .title('Suddenly, a redial')
            .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
            .ok('That was easy')
          );
          originatorEv = null;
        };
        this.checkVoicemail = function() {
          // This never happens.
        };
        this.viewProfile = function() {
          $location.path('profile');
        }
        this.logOut = function () {
         	this.fProfile = false;
         	this.fLoginDiv = true;
         	this.token = "";
         	localStorage.setItem('token',this.token);
          CurrentUser.userId = "";
          CurrentUser.name = "";
          CurrentUser.picUrl = ""; 
          $location.path('login');
        }
	    }
	   ]
  	});
  