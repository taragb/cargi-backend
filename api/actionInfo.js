/*
*The actionInfo API
* Created by Kartik Sawhney on 5/8/2016
* Copyright � 2016 Cargi. All rights reserved.
*/

var api = {
    get: function(request, response, next) {
        var query = {sql: 'SELECT u.name as name, u.email as email, a.action as action, a.createdAt as time, from users u, actions_taken a where u.id=a.user_id'
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            response.send(results);
        });
    }
};
module.exports = api;

