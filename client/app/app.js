angular.module("plastiq", [
	"plastiq.templates",
	"plastiq.directives",
	"plastiq.services",
	"plastiq.bills",
	"plastiq.payees",
	"plastiq.auth",
	"ui.router"
])
/* @ngInject */
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise("/signin");

	$stateProvider
		.state("signin", {
			url: "/signin",
			templateUrl: "app/auth/signin.html",
			controller: "AuthController"
		})
		.state("signup", {
			url: "/signup",
			templateUrl: "app/auth/signup.html",
			controller: "AuthController"
		})
		.state("payees", {
			url: "/payees",
			templateUrl: "app/payees/payees.html",
			controller: "PayeesController",
			authenticate: true
		})
		.state("bills", {
			url: "/bills/{payee}",
			templateUrl: "app/bills/bills.html",
			controller: "BillsController",
			authenticate: true
		});

	$httpProvider.interceptors.push("AttachTokens");
})
/* @ngInject */
.factory("AttachTokens", function ($window) {
	var attach = {
		request: function (object) {
			var jwt = $window.localStorage.getItem("plastiqToken");

			if (jwt) {
				object.headers["x-access-token"] = jwt;
			}
			object.headers["Allow-Control-Allow-Origin"] = "*";
			return object;
		}
	};

	return attach;
})
/* @ngInject */
.run(function ($rootScope, $state, $location, Auth) {
	$rootScope.$on("$stateChangeStart", function (event, next, current) {
		if (next.authenticate && !Auth.isAuth()) {
			// event.preventDefault();
			$rootScope.$evalAsync(function() {
				$state.go("signin");
			});
		}
	});
});