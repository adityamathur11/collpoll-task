/**
 * Created by Aditya on 27-May-17.
 */
customers.config(function ($provide) {
    $provide.provider('url', function () {
        return {
            $get: function () {
                return {
                    BASE_URL : "http://localhost:3000"
                }
            }
        }
    })
});