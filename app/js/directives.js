angular.module('app.directives', [])

.directive('inputfield', ['$compile', function($complile) {
	return {
		restrict: 'E',
		scope: {
			ngModel: '=',
			label: '@',
			type: '@',
			placeholder: '@',
			id: '@',
			required: '@',
		},
		transclude: true,
		templateUrl: 'partials/formField.html',
		replace: true,
	};
}])

;