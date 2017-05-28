/**
 * Created by Aditya on 27-May-17.
 */
customers.service('service', function ($http, url) {
    this.getNearByUsers = function (callback) {
        $http.get(url.BASE_URL + "/nearByUsers")
            .then(function (response) {
                callback(null , response.data);
            }, function (err) {
                callback(err , null);
            });
    };
    this.updateDataFile = function (payload , callback) {
        $http.post(url.BASE_URL + "/createDataFile" , payload)
            .then(function (response) {
                callback(null , response.data);
            }, function (err) {
                callback(err , null);
            })
    }

});