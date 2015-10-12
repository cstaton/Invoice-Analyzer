angular.module("plastiq.auth", [])
/* @ngInject */
.controller("AuthController", function ($scope, $window, $state, Auth) {

	$scope.user = {};

	$scope.signin = function() {
		Auth.signin($scope.user)
			.then(function (token) {
				$window.localStorage.setItem("plastiqToken", token);
				$state.go("payees");
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	$scope.signup = function() {
		Auth.signup($scope.user) 
			.then(function (token) {
				console.log(token);
				$window.localStorage.setItem("plastiqToken", token);
				$state.go("payees");
			})
			.catch(function (error) {
				console.error(error);
			});
	};
});



