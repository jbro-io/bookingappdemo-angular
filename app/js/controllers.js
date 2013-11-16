angular.module('app.controllers', [])

.controller('MainController', ['$scope','$rootScope','$googleCalendar', function($scope, $rootScope, $googleCalendar){
	
	//retrieve event list from google calendar
	$googleCalendar.getEvents().then(onResults, onError);

	function onError(error){
		console.log('error:', error);
	}

	function onResults(results){
		$rootScope.events = $scope.events = results;
		$rootScope.eventMap = {};

		for(var i=0; i<results.length; i++)
		{
			$rootScope.eventMap[results[i].id] = results[i];
		}
	}
	
}])


.controller('EventController', ['$scope','$rootScope','$routeParams', function($scope, $rootScope, $routeParams){
	$scope.event = $rootScope.eventMap[$routeParams.eventId];
}])

.controller('AddEventController', ['$scope','$routeParams','$googleCalendar', function($scope, $routeParams, $googleCalendar){

	$scope.durations = [
		{label:'Half Day (4 hours)', hours:4},
		{label:'Full Day (8 hours)', hours:8}
	];

	$scope.addEvent = function(){
		console.log('adding event...');
		console.debug($scope.contactInfo);

		//format start date/time object in to google format
		var startTime = $scope.event.startTime.split(':');
		var startHours = startTime[0];
		var startMins = startTime[1];

		var startDate = new Date($scope.event.startDate);
		startDate.setHours(startHours);
		startDate.setMinutes(startMins);
		console.log(startDate);

		//format end date/time object in to google format
		var endDate = new Date(startDate);
		endDate.setHours(endDate.getHours() + $scope.event.duration.hours);
		console.log(endDate);

		var contactInfo = {};

		$googleCalendar.addEvent(startDate, endDate, $scope.contactInfo);

	}

}])


;