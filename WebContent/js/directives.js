// AngularDirectives module
var angularDirectives = angular.module("AngularDirectives", []);



// ConfirmDirective
// from https://coderwall.com/p/mgtrkg
angularDirectives.directive("confirmDirective", [
    "$http",
    "$compile",
    function($http, $compile)
    {
        return {
            link : function(scope, element, attr)
            {
                var msg = attr.confirmDirective || "Are you sure?";
                var clickAction = attr.confirmedOnclick;
                element.bind('click', function(event)
                {
                    if (window.confirm(msg))
                    {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
    }
]);
