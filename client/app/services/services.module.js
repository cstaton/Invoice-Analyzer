angular.module("plastiq.services", [])
/* @ngInject */
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
	};

	return {
		signin: signin,
		isAuth: isAuth,
		signup: signup
	};
})
/* @ngInject */
.factory("PayeeService", function ($http) {

	var currentPayee;

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
			currentPayee = resp.data;
			console.log(resp);
			return resp.data;
		});
	};

	return {
		currentPayee: currentPayee,
		savePayee: savePayee,
		getPayees: getPayees
	};
})
/* @ngInject */
.factory("BillService", function ($http) {

	var saveBill = function(bill) {
		console.log(bill);
		return $http({
			method: "POST",
			url: "/api/protect/bill",
			data: bill
		})
		.then(function (resp) {
			console.log(resp);
			return resp.data;
		});
	};

	var getBills = function(payee) {
		console.log(payee.payeeId);
		return $http({
			method: "GET",
			url: "/api/protect/bill/" + payee.payeeId
			// params: {
			// 	payeeId: payee.payeeId
			// }
		})
		.then(function (resp) {
			console.log(resp);
			return resp.data;
		});
	};

	return {
		saveBill: saveBill,
		getBills: getBills
	};
});


