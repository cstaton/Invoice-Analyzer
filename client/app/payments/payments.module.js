angular.module("plastiq.payments", [])
.controller("PaymentsController", function ($scope, PaymentService) {

	$scope.payments = [];

	PaymentService.getPayment()
		.then(function (data) {
			data.forEach(function (payment) {
				$scope.payments.push(payment);
			});
		});

	$scope.payment = {};

	$scope.payment.paymentDate = new Date();

	$scope.handlePayment = function(payment) {
		console.log(payment);

		PaymentService.savePayment(payment)
			.then(function (resp) {
				console.log(resp);
				$scope.payments.push(resp);
			});
	};

	$scope.carData = {
		make: "toyota",
		model: "camry",
		year: 2004,
		doors: 4,
		sick: true
	};

	$scope.$watch('carData.make', function(newVal, oldVal) {
		console.log("OLD VALUE:  ", oldVal);
		console.log("NEW VALUE:  ", newVal);

	});

});



