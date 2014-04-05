// AngularControllers module
var angularControllers = angular.module("AngularControllers", []);



// HeaderController
angularControllers.controller("HeaderController", [
    "$scope",
    "$location",
    "SessionService",
    function HeaderController($scope, $location, SessionService) 
    {
        // constructor
        {
            $scope.session = SessionService;
        }
    }
]);



// FooterController
angularControllers.controller("FooterController", [
    "$scope",
    "$location",
    "SessionService",
    function FooterController($scope, $location, SessionService) 
    {
        // constructor
        {
            $scope.session = SessionService;
        };
    }
]);



// OnibusController
angularControllers.controller("OnibusController", [
    "$scope",
    "SessionService",
    "OnibusService",
    "GeoIPService",
    function($scope, SessionService, OnibusService, GeoIPService)
    {
        // constructor
        {
            $scope.session = SessionService;

            // from http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
            $scope.distance = function(lat1, lon1, lat2, lon2)
            {
                var R = 6371;
                var a = 
                   0.5 - Math.cos((lat2 - lat1) * Math.PI / 180)/2 + 
                   Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                   (1 - Math.cos((lon2 - lon1) * Math.PI / 180))/2;

                return R * 2 * Math.asin(Math.sqrt(a));
            };

            GeoIPService.get(
                function(data)
                {
                    SessionService.geoip = data;
                    var position = new google.maps.LatLng(data.latitude, data.longitude);
                    $scope.myMap.setCenter(position);
                    
                    $scope.myMarkers.push(new google.maps.Marker({
                        map: $scope.myMap,
                        position: position,
                        title: "your position",
                        icon: "images/markers/center.png",
                        animation: google.maps.Animation.DROP
                    }));
                    
                    $scope.getOnibus();
                },
                function(data) {
                    alert("ERROR on OnibusController.getAll():\nresponse: " + data);
                }
            );

            $scope.getOnibus = function()
            {
                OnibusService.getAll(
                    function(data)
                    {
                        SessionService.onibus = data;
                        
                        var center = $scope.myMap.getCenter();
                        var distance = 2; //km
                        
                        for(var i = 0; i < data.length; ++i)
                        {
                            if ($scope.distance(data[i].LATITUDE, data[i].LONGITUDE, center.lat(), center.lng()) < distance)
                            {
                                var position = new google.maps.LatLng(data[i].LATITUDE, data[i].LONGITUDE);
                                var title = (data[i].LINHA === undefined) ? "" : data[i].LINHA.toString();

                                $scope.myMarkers.push(new google.maps.Marker({
                                    map: $scope.myMap,
                                    position: position,
                                    title: title,
                                    icon: "images/markers/bus.png",
                                    animation: google.maps.Animation.DROP
                                }));
                            }
                        }
                    },
                    function(data) {
                        alert("ERROR on OnibusController.getAll():\nresponse: " + data);
                    }
                );
            };
        };

        $scope.myMarkers = [];
        $scope.mapOptions = {
          center: new google.maps.LatLng(-22.90278, -43.2075),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.addMarker = function ($event, $params) {
          $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: $params[0].latLng
          }));
        };

        $scope.setZoomMessage = function (zoom) {
          $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
          console.log(zoom, 'zoomed');
        };

        $scope.openMarkerInfo = function (marker) {
          $scope.currentMarker = marker;
          $scope.currentMarkerLat = marker.getPosition().lat();
          $scope.currentMarkerLng = marker.getPosition().lng();
          $scope.myInfoWindow.open($scope.myMap, marker);
        };

        $scope.setMarkerPosition = function (marker, lat, lng) {
          marker.setPosition(new google.maps.LatLng(lat, lng));
        };
    }
]);
