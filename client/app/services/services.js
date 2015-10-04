angular.module("plastiq.services", [])

.factory("Auth", function ($http, $state, $window) {

	var signin = function(user) {
		return $http({
			method: "POST",
			url: "/api/users/signin",
			data: user
		})
		.then(function (resp) {
			console.log(resp);
			return resp.data.token;
		});
	};

	var signup = function(user) {
		console.log(user);
		return $http({
			method: "POST",
			url: "/api/users/signup",
			data: user
		})
		.then(function(resp) {
			console.log(resp);
			return resp.data.token;
		});
	};

	var isAuth = function () {
		return !!$window.localStorage.getItem("plastiqToken");
	}

	return {
		signin: signin,
		isAuth: isAuth,
		signup: signup
	};
})
.factory("PayeeService", function ($http) {

	var savePayee = function(payee) {
		return $http({
			method: "POST",
			url: "/api/protect/payee",
			data: payee
		})
		.then(function(resp) {
			console.log(resp);
			return resp.data;
		});
	};

	var getPayees = function() {
		return $http({
			method: "GET",
			url: "/api/protect/payee",
		})
		.then(function(resp) {
			console.log(resp.data);
			return resp.data;
		});
	}

	return {
		savePayee: savePayee,
		getPayees: getPayees
	};
});


