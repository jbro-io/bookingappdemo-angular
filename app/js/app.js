angular.module('gcal-bookingapp', [
	'ngRoute',
	'ngAnimate',
	'app.controllers',
	'app.directives',
	'GoogleCalendarService'
])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainController'});
	$routeProvider.when('/event/new', {templateUrl: 'partials/newEvent.html', controller: 'AddEventController'});
	$routeProvider.when('/event/:eventId', {templateUrl: 'partials/event.html', controller: 'EventController'});
	$routeProvider.otherwise({redirectTo: '/'});
}])

.run(['$rootScope','$location', function($rootScope, $location){


	if($rootScope.eventMap === undefined){
		$location.path('/');
		$location.replace();
	}


}])

;