angular.module("plastiq.payees", [])

.controller("PayeesController", function($scope, PayeeService) {

	$scope.biz = true;
	$scope.person = false;

	$scope.pholder = "";

	$scope.payees = PayeeService.getPayees()
		.then(function (data) {
			$scope.payees = data;
		});

	$scope.findBiz = function() {
		$scope.biz = true;
		$scope.person = false;
		$scope.pholder = "What business do you want to pay by card?";
		console.log($scope.payees);
	};

	$scope.findPerson = function() {
		$scope.biz = false;
		$scope.person = true;
		$scope.pholder = "What person do you want to pay by card?";
	};

	$scope.handleFocus = function() {
		if ($scope.biz === true) {
			$scope.pholder = "Enter the name of the business..."
		} else if ($scope.person === true) {
			$scope.pholder = "Enter the name of the person..."
		}
	};

	$scope.grabData = function() {
		PayeeService.getPayees()
			.then(function (data) {
				console.log(data);
				data.forEach(function(item) {
					$scope.payees.push(item);
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	$scope.fireMySubmit = function(legit) {
		//Handles the logic determining what data to store
		//TODO: Should be refactored to use a service in order to communicate with database

		if ($scope.person === true && $scope.chosenPlace !== "") {
			$scope.payees.push({
				name: $scope.chosenPlace,
				address: "Address not provided.",
				payeeType: "person"
			});

			PayeeService.savePayee({
				name: $scope.chosenPlace,
				address: "Address not provided.",
				payeeType: "person"
			})
				.then(function (data) {
					console.log(data, " SAVED ON SERVER!!");
				})
				.catch(function (error) {
					console.error(error);
				});

		} else if (legit !== undefined && legit.placeId !== undefined) {
			$scope.payees.push({
				name: legit.name,
				address: legit.address,
				payeeType: "business",
				placeId: legit.placeId
			});

			PayeeService.savePayee({
				name: legit.name,
				address: legit.address,
				payeeType: "business",
				placeId: legit.placeId
			})
				.then(function (data) {
					console.log(data, " SAVED ON SERVER!!");
				})
				.catch(function (error) {
					console.error(error);
				});

		} else if ($scope.biz && legit !== "enter" && $scope.chosenPlace !== undefined) {
			$scope.payees.push({
				name: $scope.chosenPlace,
				address: "Address not provided.",
				payeeType: "business",
				placeId: null
			});

			PayeeService.savePayee({
				name: $scope.chosenPlace,
				address: "Address not provided.",
				payeeType: "business",
				placeId: null
			})
				.then(function (data) {
					console.log(data, " SAVED ON SERVER!!");
				})
				.catch(function (error) {
					console.error(error);
				});

		} 

		$scope.chosenPlace = "";
	};
});



