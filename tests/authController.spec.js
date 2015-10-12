describe('AuthController', function() {

	var $rootScope, $scope, $location, $window, $httpBackend, Auth, createController;

	beforeEach(module("plastiq"));

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get("$rootScope");
		$location = $injector.get("$location");
		$window = $injector.get("$window");
		$httpBackend = $injector.get("$httpBackend");
		Auth = $injector.get("Auth");
		$scope = $rootScope.$new();

		var $controller = $injector.get("$controller");

		createController = function() {
			return $controller("AuthController", {
				$scope: $scope,
				$window: $window,
				$location: $location,
				Auth: Auth
			});
		};

		createController();
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
		$window.localStorage.removeItem("plastiqToken");
	});

	it("Should have a signin method", function() {
		$httpBackend.expect("GET", "app/auth/signin.html")
			.respond({
				"success": true
			});
		$httpBackend.flush();
		expect(typeof $scope.signin).toBe("function");
	});

	it("Should have a signup method", function() {
		$httpBackend.expect("GET", "app/auth/signin.html")
			.respond({
				"success": true
			});
		$httpBackend.flush();
		expect(typeof $scope.signup).toBe("function");
	});

	it("Should have a token in localStorage after signup", function() {
		var token = 'kjsdkf34902klfj392oirjsjf';
		$httpBackend.expect("POST", "/api/users/signup")
			.respond({
				"success": true,
				"token": token
			});
		$httpBackend.expect("GET", "app/auth/signin.html")
			.respond({
				"success": true
			});

		 $httpBackend.expect("GET", "app/payees/payees.html")
		 	.respond({
		 		"success": true
		 	});
		$scope.signup();
		$httpBackend.flush();
		expect($window.localStorage.getItem("plastiqToken")).toBe(token);
	});

	it("Should have a token in localStorage after signin", function() {
		var token = 'ajflslksadjfkjgire9302kfjslk';
		$httpBackend.expect("POST", "/api/users/signin")
			.respond({
				token: token
			});
		$httpBackend.expect("GET", "app/auth/signin.html")
			.respond({
				success: true
			});
		$httpBackend.expect("GET", "app/payees/payees.html")
			.respond({
				"success": true
			});
		$scope.signin();
		$httpBackend.flush();
		expect($window.localStorage.getItem("plastiqToken")).toBe(token);
	});
});






