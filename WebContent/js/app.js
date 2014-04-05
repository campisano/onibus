// AngularApplication main module
var angularApplication = angular.module("AngularApplication", [
    "ngRoute",
    "ngSanitize",
    "ui.bootstrap",
    "ui.map",
    "AngularServices",
    "AngularControllers",
    "AngularFilters",
    "AngularDirectives",
    "AngularAnimations"
]);



// app url routes to templates
angularApplication.config( [
    "$routeProvider",
    function($routeProvider)
    {
        $routeProvider.
        when("/onibus",
        {
            templateUrl: "partials/onibus.html",
            controller: "OnibusController"
        }).
        otherwise(
        {
            redirectTo: "/onibus"
        });
    }
]);



// client-site authorization check
// from http://blog.brunoscopelliti.com/deal-with-users-authentication-in-an-angularjs-web-app
angularApplication.run( [
    "$rootScope",
    "$location",
    "SessionService",
    function ($rootScope, $location, SessionService)
    {
        $rootScope.$on("$routeChangeStart", function(event, curr_route, prev_route)
        {
            if ((typeof(curr_route.auth_required) !== "undefined") &&
                curr_route.auth_required &&
                (typeof(SessionService.user) === "undefined"))
            {
                // reload the login route
                $location.url("/account/login");
            }
            /*
             * IMPORTANT:
             * It's not difficult to fool the previous control,
             * so it's really IMPORTANT to repeat the control also in the backend,
             * before sending back from the server reserved information.
             */
        });
    }
]);
