angular.module("plastiq.directives", [])
/* @ngInject */
	.directive("cPayee", function($compile, $state) {
		var customTemplate = function(payee) {
			// Creates a template depending on the payee type
			var image;
			var template;
			var payButton;

			if (payee.payeeType === "person") {
				image = "Person_Img.png";
				payButton = "";

			} else if (payee.payeeType === "business") {
				image = "Business_Img.png";

				if (payee.placeId) {
					payButton = "<div class='grid2of10'><span class='tooltip' title='Make a payment.'><button class='payButton'></button></span><div>";
				} else {
					payButton = "";
				}
			}

			template = "<div class='grid2of10'><img src='assets/" + image + "' /></div><div class='grid6of10'><p class='payeeName'>{{ content.name }}</p><p class='payeeAddress'>{{content.address}}</p></div>" + payButton;

			return template;
		};

		return {
			restrict: "EA",
			scope: {
				content: "="
			},
			link: function($scope, element, attrs) {
				element.bind("click", function() {
					console.log($scope.content);
					$state.go("bills", { payee: $scope.content._id });
				});
				
				element.html(customTemplate($scope.content));

				$compile(element.contents())($scope);
			}
		};
	})
/* @ngInject */
	.directive("gPlace", function() {
		//Binds the auto complete to the input form
		return {
			restrict: "EA",
			require: '^ngModel',
			link: function($scope, element, attrs, model) {

				var options = {
					types: [],
					componentRestrictions: {}
				};

				var gvalue = new google.maps.places.Autocomplete(element[0], options);

				google.maps.event.addListener(gvalue, 'place_changed', function() {
					//Grabs the value when the user chooses a business from autocomplete
					var verify = gvalue.getPlace();

					console.log(verify);

					var legit = {
						name: verify.name,
						address: verify.formatted_address,
						payeeType: "business",
						placeId: verify.place_id
					};

					$scope.$apply(function() {
						model.$setViewValue(element.val());
						$scope.fireMySubmit(legit);
					});
				});
			}
		};
	})
/* @ngInject */
	.directive('ngEnter', function () {
		//Hacky work around to get the enter key to behave properly (potentially should be refactored)
	    return function ($scope, element, attrs) {
	        element.bind("keydown keypress", function (event) {
	            if(event.which === 13) {
	            	$scope.fireMySubmit("enter");
	                $scope.$apply(function (){
	                    $scope.$eval(attrs.ngEnter);
	                });
	 
	                event.preventDefault();
	            }
	        });
	    };
	});



