angular.module("plastiq.bills", [])
/* @ngInject */
.controller("BillsController", function($scope, $stateParams, BillService, PayeeService) {

	$scope.bills = [
		{
			invoiceNum: "4001",
			dateDue: "10/20/2015",
			amount: 5200
		}
	];

	$scope.testIt = function() {
		console.log($stateParams);
		console.log("Current Payee:", PayeeService.currentPayee);
		BillService.getBills({
			payeeId: $stateParams.payee
		})
			.then(function (data) {
				console.log(data);
				data.forEach(function(item) {
					$scope.bills.push(item);
				});
			});
	};

	$scope.payBill = function(bill) {
		console.log("STATEPARAMS:  ", $stateParams.payee);
		bill.payeeId = $stateParams.payee;
		console.log(bill);

		BillService.saveBill(bill)
			.then(function (data) {
				console.log(data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};
});