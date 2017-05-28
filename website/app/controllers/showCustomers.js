customers.controller('showCustomers', function ($scope, service, $window) {
    $scope.welcomeMessage = "Near by customers";
    service.getNearByUsers(function (err, data) {
        if (err) {
            $scope.welcomeMessage = "Internal server error, Please try later.";
            $scope.userList = [];
        }
        else {
            $scope.userList = data.customers;
        }
    });

    $scope.updateData = function (limit) {


        var payload = {};
        if (limit) {
            limit = limit.trim();
            if(isNaN(limit)){
                $window.alert("please enter digits only");
                return;
            }
            if (limit == "") {
                payload = {}
            }
            else {
                payload = {
                    limit: limit
                };
            }
        }
        var result = true;
        if (parseFloat(limit) > 100000.00) {
            result = $window.confirm(limit +" is way too big number. Might crash the server. This is just for creating sample data. Sure you want to proceed with it?");
        }
        if (result) {
            service.updateDataFile(payload, function (err, data) {
                if (err) {
                    $scope.welcomeMessage = "Internal server error, Please try later.";
                    $scope.userList = [];
                }
                else {
                    service.getNearByUsers(function (err, data) {
                        if (err) {
                            $scope.welcomeMessage = "Internal server error, Please try later.";
                            $scope.userList = [];
                        }
                        else {
                            $scope.userList = data.customers;
                        }
                    });
                }
            });
        }
    }
});