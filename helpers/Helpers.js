var config = require('config');

module.exports = {
    getRandomCoordinate: function () {
        return (Math.random() * ((180) - (-180)) + (-180)).toFixed(5) * 1;
    },

    getRandomInRadiusPoint: function () {
        var y0 = config.coordinate.latitude;
        var x0 = config.coordinate.longitude;
        var rd = config.radius / 111300;

        var u = Math.random() + 1;
        var v = Math.random() + 1;

        var w = rd * Math.sqrt(u);
        var t = 2 * Math.PI * v;
        var x = w * Math.cos(t);
        var y = w * Math.sin(t);

        var xp = x / Math.cos(y0);

        var newlat = y + y0;
        var newlon = x + x0;

        return {
            'latitude': newlat.toFixed(10),
            'longitude': newlon.toFixed(5)
        }
    },

    getDistance: function (lat2, lon2, callback) {
        try {
            var R = 6371000;
            var a = 0.5 - Math.cos((lat2 - config.coordinate.latitude) * Math.PI / 180) / 2 + Math.cos(config.coordinate.latitude * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - config.coordinate.longitude) * Math.PI / 180)) / 2;
            callback(null, R * 2 * Math.asin(Math.sqrt(a)));
        }
        catch (err) {
            callback(err, null);
        }
    }
};
