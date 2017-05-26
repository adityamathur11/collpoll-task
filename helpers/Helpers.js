var config = require('config');

module.exports = {
    getRandomCoordinate: function () {
        return (Math.random() * ((180) - (-180)) + (-180)).toFixed(5) * 1;
    },

    getRandomInRadiusPoint: function () {
        var y0 = config.coordinate.latitude;
        var x0 = config.coordinate.longitude;
        var rd = config.radius / 111300; //about 111300 meters in one degree

        var u = Math.random();
        var v = Math.random();

        var w = rd * Math.sqrt(u);
        var t = 2 * Math.PI * v;
        var x = w * Math.cos(t);
        var y = w * Math.sin(t);

        //Adjust the x-coordinate for the shrinking of the east-west distances
        var xp = x / Math.cos(y0);

        var newlat = y + y0;
        var newlon = x + x0;

        return {
            'latitude': newlat.toFixed(5),
            'longitude': newlon.toFixed(5),
            'distance': this.getDistance(12.935076, 77.614277, newlat, newlon).toFixed(2)
        }
    },

    getDistance: function (lat1, lon1, lat2, lon2) {
        var R = 6371000;
        var a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - lon1) * Math.PI / 180)) / 2;
        return R * 2 * Math.asin(Math.sqrt(a));
    }
};
