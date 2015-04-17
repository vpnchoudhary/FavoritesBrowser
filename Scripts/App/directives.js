angular.module('Favorites', ['ngRoute'])
    .config(['$routeProvider',
      function ($routeProvider) {
          $routeProvider.
            when('/', {
                templateUrl: '/View/Template/body.html',
                controller: 'ItemDetailCtrl'
            }).
            when('/:id', {
                templateUrl: '/View/Template/body.html',
                controller: 'ItemDetailCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
      }])
    .controller('FavoritesController', ['$scope', '$document', '$rootScope', '$location', function ($scope, $document, $rootScope, $location) {

        WL.Event.subscribe("auth.login", onLogin);
        WL.Event.subscribe("auth.logout", onLogout);
        WL.init({
            client_id: APP_CLIENT_ID,
            redirect_uri: REDIRECT_URL,
            scope: "wl.skydrive wl.signin",
            response_type: "token"
        });
        WL.ui({
            name: "signin",
            element: "signin"
        });
        //$scope.WL = WL;
        //function GetData() {
        //    WL.api({ path: "/" + $rootScope.UserId + "/skydrive/files", method: "GET" }).then(
        //     function (response) {
        //         $scope.$apply(function () {

        //             $scope.folders = response.data;
        //         });
        //     },
        //     function (response) {
        //         //log("Could not access albums, status = " +
        //         //    JSON.stringify(response.error).replace(/,/g, ",\n"));
        //     });
        //}

        //$scope.GetItemDetails = function (item) {
        //    if (item.type == "folder") {
        //        WL.api({ path: "/" + item.id + "/files", method: "GET" }).then(
        //         function (response) {
        //             $scope.$apply(function () {

        //                 $scope.albums = response.data;
        //             });
        //         },
        //         function (response) {
        //             //log("Could not access albums, status = " +
        //             //    JSON.stringify(response.error).replace(/,/g, ",\n"));
        //         });
        //    }
        //}

       
        function onLogin(session) {

            if (!session.error) {
                WL.api({ path: "me", method: "GET" }).then(
                    function (response) {
                        $document[0].getElementById("info").innerText =
                             "Hello, " + response.first_name + " " + response.last_name + "!";
                        $scope.$apply(function () {

                            $rootScope.UserId = response.id;
                            $location.path('/root');
                        });
                        
                    },
                    function (responseFailed) {
                        $document[0].getElementById("info").innerText =
                            "Error calling API: " + responseFailed.error.message;
                    });
            }
            else {
                $document[0].getElementById("info").innerText =
                    "Error signing in: " + session.error_description;
            }
        }
        function onLogout(session) {
            $document[0].getElementById("info").innerText = "";
            $scope.$apply(function () {

                $scope.folders = null;
            });
        }
    }])
.controller('ItemDetailCtrl', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
      var url = "/me/skydrive/files";
      if (typeof $routeParams.id != 'undefined')
      {
          if ($routeParams.id != "root") {
              url = "/" + $routeParams.id + "/files";
          }
      }
      WL.api({ path: url, method: "GET" }).then(
                 function (response) {
                     $scope.$apply(function () {

                         $scope.folders = response.data;
                     });
                 },
                 function (response) {
                     //log("Could not access albums, status = " +
                     //    JSON.stringify(response.error).replace(/,/g, ",\n"));
                 });
  }])
.directive('myNavbar',  function() {
    return {
        restrict: 'E',
        templateUrl: '/View/Template/Navbar.html'
    };
});
