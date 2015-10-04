angular.module("plastiq.directives", [])

	.directive("cPayee", function($compile) {
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
					payButton = "<div class='whycss'><span class='tooltip' title='Make a payment.'><button class='payButton'></button></span><div>";
				} else {
					payButton = "";
				}
			}

			template = "<img src='assets/" + image + "' /><div class='payeeInfo'><p class='payeeName'>{{ content.name }}</p><p class='payeeAddress'>{{content.address}}</p></div>" + payButton;

			return template;
		};

		return {
			restrict: "EA",
			scope: {
				content: "="
			},
			link: function($scope, element, attrs) {
				element.bind("click", function() {
					alert("Pay your Bills!");
				});
				
				element.html(customTemplate($scope.content));

				$compile(element.contents())($scope);
			}
		};
	})
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



