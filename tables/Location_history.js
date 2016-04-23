var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "user_id": "string",
    "latitude": "number",
    "longitude": "number",
    "datetime": "date"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    { user_id: "kartiks2", longitude: -122.164089, latitude: 37.425421, datetime: "2016-01-23T18:55:00+00:00"},
    { user_id: "kartiks2", longitude: -122.165309, latitude: 37.425575, datetime: "2016-01-30T19:00:00+00:00"},
    { user_id: "kartiks2", longitude: -122.164089, latitude: 37.425421, datetime: "2016-01-18T19:00:00+00:00"},
    { user_id: "emjtang", longitude: -122.164089, latitude: 37.425421, datetime: "2016-01-18T19:00:00+00:00"}
];

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;