// AngularServices module
var angularServices = angular.module("AngularServices", []);



// from http://www.thinkster.io/angularjs/9jfpSmbx1j/angularjs-sharing-data-between-controllers'
// Angular application context
angularServices.factory("SessionService", [
    function()
    {
        function SessionObject()
        {
            var self = this;
        }

        return new SessionObject();
    }
]);



// ModalService
// from http://weblogs.asp.net/dwahlin/archive/2013/09/18/building-an-angularjs-modal-service.aspx
angularServices.factory("ModalService", [
    "$modal",
    function($modal)
    {
        function ModalServiceObject()
        {
            var self = this;
            
            var modalDefaults =
            {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: "partials/modal.html"
            };

            var modalOptions =
            {
                closeButtonText: "Close",
                actionButtonText: "OK",
                headerText: "Proceed?",
                bodyText: "Perform this action?"
            };

            self.showModal = function(customModalDefaults, customModalOptions)
            {
                if (!customModalDefaults) customModalDefaults = {};
                customModalDefaults.backdrop = "static";

                return self.show(customModalDefaults, customModalOptions);
            };

            self.show = function(customModalDefaults, customModalOptions)
            {
                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

                //Map modal.html $scope custom properties to defaults defined in service
                angular.extend(tempModalOptions, modalOptions, customModalOptions);

                if (!tempModalDefaults.controller)
                {
                    tempModalDefaults.controller = self.getDefaultController(tempModalOptions, SessionService);
                }

                return $modal.open(tempModalDefaults).result;
            };
            
            self.getDefaultController = function(tempModalOptions, session)
            {
            	return function ($scope, $modalInstance)
                {
                    $scope.session = session;
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function(result)
                    {
                        $modalInstance.close(result);
                    };

                    $scope.modalOptions.close = function(result)
                    {
                        $modalInstance.dismiss("cancel");
                    };
                };
            };

            self.alert = function(message)
            {
                $modal.open(
                {
                    templateUrl: "partials/alert.html",
                    controller : function($scope, $modalInstance)
                    {
                        $scope.modalOptions = 
                        {
                            closeButtonText: "Close",
                            headerText: "Proceed?",
                            bodyText: message
                        };
                        $scope.modalOptions.close = function(result)
                        {
                            $modalInstance.close(result);
                        };
                    }
                });
            };
        }

        return new ModalServiceObject();
    }
]);



// OnibusService
angularServices.factory("OnibusService", [
    "$http",
    function($http)
    {
        function OnibusServiceObject()
        {
            var self = this;
            self.proxy = "http://jsonp.jit.su/?callback=?&url=";
            self.url = "http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes";

            self.getAll = function(fn_success, fn_error)
            {
                jQuery.ajax({
                     url: self.proxy + self.url,
                     mode: "GET",
                     dataType: "jsonp",
                     cache: true,
                     timeout: 15000
                }).
                success(function(data, textStatus, jqXHR)
                {
                    if(data != null)
                    {
                        var onibus = new Array();

                        for(var i = 0; i < data.DATA.length; ++i)
                        {
                            onibus.push(new OnibusModel(
                                data.DATA[i][0],
                                data.DATA[i][1],
                                data.DATA[i][2],
                                data.DATA[i][3],
                                data.DATA[i][4],
                                data.DATA[i][5]
                            ));
                        }

                        fn_success(onibus);
                    }
                    else
                    {
                        fn_error(data);
                    }
                }).
                error(function(jqXHR,  textStatus, errorThrown)
                {
                    fn_error("AJAX ERROR:\n" + jqXHR + "\nstatus: " + textStatus + "\nresponse: " + angular.toJson(errorThrown, true));
                });
            };
        }

        return new OnibusServiceObject();
    }
]);



// GeoIPService
angularServices.factory("GeoIPService", [
    "$http",
    function($http)
    {
        function GeoIPServiceObject()
        {
            var self = this;
            self.url = "http://www.telize.com/geoip?callback=?";

            self.get = function(fn_success, fn_error)
            {
                jQuery.ajax({
                     url: self.url,
                     mode: "GET",
                     dataType: "jsonp",
                     cache: false,
                     timeout: 15000
                }).
                success(function(data, textStatus, jqXHR)
                {
                    if(data != null)
                    {
                        var geoip = new GeoIPModel(
                            data.ip,
                            data.country,
                            data.region,
                            data.city,
                            data.longitude,
                            data.latitude,
                            data.timezone
                        );

                        fn_success(geoip);
                    }
                    else
                    {
                        fn_error(data);
                    }
                }).
                error(function(jqXHR,  textStatus, errorThrown)
                {
                    fn_error("AJAX ERROR:\n" + jqXHR + "\nstatus: " + textStatus + "\nresponse: " + angular.toJson(errorThrown, true));
                });
            };
        }

        return new GeoIPServiceObject();
    }
]);
