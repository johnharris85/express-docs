var _ = require("underscore");
var express = require("express");

module.exports = function (app, apiRoute) {

    function appendRoutes(route, arr) {
        if (!_.isUndefined(route.route)) {
            route.route.method = Object.keys(route.route.methods).toString();
            arr.push(route.route);
        } else if(route.handle.stack) {
            // Extract routes from middlewere installed Router
            console.log(route.handle.stack)
            _.each(route.handle.stack, function (route) {
                appendRoutes(route, arr);
            });
        }
    }

    // Add an API endpoint to be used internally by this module
    app.get(`/${apiRoute}`, function (req, res) {
        try {
            if (app.routes) {
                // Extract all API routes in one array  in case of express3
                var routes = _.flatten(app.routes);
            }
            else {
                // Extract all API routes in one array  in case of express4
                var arr = [];
                _.each(app._router.stack, function (route) {
                    appendRoutes(route, arr);
                });
                routes = arr;
            }
            // Group routes by resource name
            routes = _.groupBy(routes, function (route) {
                return route.path.split("/")[1];
            });

            // Skip the routes to be used internally by this module
            delete routes[apiRoute];

            // Transform route groups object to an array of group/routes pairs
            routes = _.pairs(routes);

            res.send({routes});
        } catch (e) {
            res.send(400,e);
        }
    });

    // Configure the directory which holds html docs template
    app.use(express.static(__dirname + '/html'));
};
