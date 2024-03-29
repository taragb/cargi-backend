/*
*The rankAPI
* Created by Kartik Sawhney on 6/8/2016
* Copyright � 2016 Cargi. All rights reserved.
* This is to rank contacts based on their frequency in the contacts table
*/

function checkForDuplicates(results, name) {
    for (var i = 0; i < results.length; i++) {
        if (results[i]["name"] == name) {
            return true;
        }
    }
    return false;
}

function sortByFrequency(array) {
    var frequency = {}
    array.forEach(function(value) { frequency[value] = 0; });
    var uniques = array.filter(function(value) {
        return ++frequency[value] == 1;
    });
    return uniques.sort(function(a, b) {
        return frequency[b] - frequency[a];
    });
}

function sortByFrequencyAndRemoveDuplicates(array) {
    var frequency = {}, value;

    // compute frequencies of each value
    for(var i = 0; i < array.length; i++) {
        value = array[i];
        if(value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }

    // make array from the frequency object to de-duplicate
    var uniques = [];
    for(value in frequency) {
        uniques.push(value);
    }

    // sort the uniques array in descending order by frequency
    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }

    return uniques.sort(compareFrequency);
}

/*
*This function uses an SQL query to get the desired information. 
* We first query for any contacts that the person has an event that day, followed by 
* a list of those that the person usually has events with, followed by recent contacts, and finally people that the user contacts at that time of the day.
*/

var api = {
    get: function(request, response, next) {
        var query = {sql: 'SELECT id from users where email=@email',
            parameters: [
                { name: 'email', value: request.query.email }
            ]
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            if (results.length == 0) {
            response.send("Email does not exist");
            }

            var user_id = results[0]["id"]

            var query2 = {sql: 'SELECT name FROM contacts where user_id = @user_id',
            parameters: [
                { name: 'user_id', value: user_id }
            ]
        };
            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var finalArray = []
                for (var i = 0; i < results.length; i++) {
                    finalArray.push(results[i]["name"])
                }

                if (finalArray.length != 0) {
                    finalArray = sortByFrequencyAndRemoveDuplicates(finalArray)
                }
                response.send(finalArray);
            });
        });
    }
};
module.exports = api;

