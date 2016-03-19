var DEBUG = false;

var myapp = angular.module('myapp', ['ngMessages', 'ngAnimate']);

myapp.controller('MyCtrl', function($scope, $http, $q) {
    $scope.resultCount = 0;
    $scope.searchField       = "";
    $scope.results     = [];
    $scope.searchDone  = DEBUG? true : false;
    $scope.searching   = DEBUG? true : false;
    $scope.searchFail  = DEBUG? true : false;
    $scope.lastSearch  = "";
    //
    $scope.search = function() {
        if(DEBUG) console.log('making request to instagram');
        if(DEBUG) console.log($scope.myForm);
        //
        $scope.searchDone = false;
        $scope.searchFail = false;
        //
        if ($scope.myForm.$valid) {
            $scope.searching = true;
            //
            $http({
                method: 'JSONP',
                url: "https://api.instagram.com/v1/tags/" + $scope.searchField + "/media/recent",
                params: {
                    callback: 'JSON_CALLBACK',
                    client_id: 'f6cc2648dbeb4bd48e29345ccd594605'
                }
            })
                .success(function(data, status){
                    if(DEBUG) console.log('success');
                    if(DEBUG) console.log(data);
                    //
                    $scope.results    = data.data;
                    $scope.lastSearch = $scope.searchField;
                    //
                    $scope.myForm.$setPristine();
                    $scope.myForm.$setUntouched();
                    $scope.searching  = false;
                    $scope.searchDone = true;
                    $scope.searchField      = "";
                    searchFieldFocus();
                })
                .error(function(data, status){
                    if(DEBUG) console.log(status);
                    //
                    $scope.searchFail = true;
                    $scope.searching  = false;
                });
        }
        else {
            searchFieldFocus();
        }
    };
});

window.addEventListener('DOMContentLoaded', searchFieldFocus, false);

function searchFieldFocus() {
    document.getElementsByName('searchField')[0].focus();
}