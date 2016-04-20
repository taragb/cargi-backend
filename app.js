var express = require('express'),
    azureMobileApps = require('azure-mobile-apps');

var app = express(),
    mobile = azureMobileApps();

// Define a TodoItem table
mobile.tables.add('TodoItem');
mobile.tables.add('Users');
mobile.tables.add('Location_history');


// Add the mobile API so it is accessible as a Web API
app.use(mobile);

// Start listening on HTTP
app.listen(process.env.PORT || 3000);