var dash = angular.module('dash', [])
.controller("dashCtrl", function($scope, Sys, $interval) {

    $scope.sysData = Sys.data;

    $interval(function() {
        Sys.update();
    }, 1000);

})
.service("Sys", function($http) {
    this.data = {};

    var data = this.data;

    this.cpu_temp = function () {
        $http.post("/api/cpu_temp.php").then(function(response) {
            data.cpu_temp = response.data.cpu_temp;
        })
    }

    this.mem_info = function () {
        $http.post("/api/mem_info.php").then(function(response) {
            data.mem_info = response.data;
        })
    }

    this.disk_usage = function () {
        $http.post("/api/disk_usage.php").then(function(response) {
            data.disk_usage = response.data;
        })
    }

    this.update = function () {
        if (focused) {
            this.cpu_temp();
            this.disk_usage();
            this.mem_info();
        }
    }

    this.update();
})

.filter("tempature", function() {
    return function(temp) {
        return (temp / 1000).toFixed(1) + " °C";
    }
})

var focused = true;

window.onfocus = function() {
    focused = true;
};
window.onblur = function() {
    focused = false;
};
