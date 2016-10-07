var dash = angular.module('dash', [])
.controller("dashCtrl", function($scope, Sys, $interval) {

    $scope.sysData = Sys.data;

    $interval(function() {
        Sys.update();
    }, 500)

})
.service("Sys", function($http) {
    this.data = {
        "temp": 0
    }
    var data = this.data;

    this.cpu_temp = function () {
        $http.post("/api/get_temp.php").then(function(response) {
            data.temp = response.temp;
        })
    }

    this.update = function () {
        this.cpu_temp();
    }
})
