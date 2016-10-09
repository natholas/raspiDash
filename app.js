var dash = angular.module('dash', [])
.controller("dashCtrl", function($scope, Sys, $interval) {

    $scope.sysData = Sys.data;

    $interval(function() {
        Sys.update();
    }, 1000);

    $scope.reboot = Sys.reboot;

})
.service("Sys", function($http) {
    this.data = {};

    var data = this.data;

    var url_base = "/api/";
    if (window.location.hostname == "raspidash") url_base = "/test_api/";

    this.reboot = function () {
        $http.post(url_base + "reboot.php").then(function() {
            alert("Valhalla rebooting in 60 seconds");
        })
    }

    this.network_check = function () {
        $http.post(url_base + "network_check.php").then(function(response) {
            data.bps = response.data.bytes - data.bytes;
            data.bytes = response.data.bytes;
        })
    }

    this.cpu_temp = function () {
        $http.post(url_base + "cpu_temp.php").then(function(response) {
            data.cpu_temp = response.data.cpu_temp;
        })
    }

    this.mem_info = function () {
        $http.post(url_base + "mem_info.php").then(function(response) {
            data.mem_info = response.data;
        })
    }

    this.disk_usage = function () {
        $http.post(url_base + "disk_usage.php").then(function(response) {
            data.disk_usage = response.data;
        })
    }

    this.update = function () {
        if (focused) {
            this.cpu_temp();
            this.disk_usage();
            this.mem_info();
            this.network_check();
        } else {
            delete data.bytes;
            delete data.bps;
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
