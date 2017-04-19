'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'addHero',
  'myApp.version',
  'heroList',
  'core',
  'login',
  'profile',
  'ngMaterial',
  'ngMessages',
  'ngResource',
  'navbar',
  'appMain',
  'aboutMe'
 
  ]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/addHero', {
          template: '<add-hero></add-hero>'
        }).
        when('/heroList',{
        	template: '<hero-list></hero-list>'
        }).
        when('/login',{
          template: '<login></login>'
        }).
        when('/profile',{
          template: '<profile></profile>'
        }).
        when('/navbar',{
          template:'<navbar></navbar>'
        }).
        when('/app-main',{
          template:'<app-main></app-main>'
        }).
        when('/',{
          template:'<app-main></app-main>'
        }).
        when('/about-me',{
          template:'<about-me></about-me>'
        }).
        otherwise('/');
}]);
