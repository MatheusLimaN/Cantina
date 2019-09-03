var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'Cantina',
    description: 'Sistema Cantina',
    script: 'C:\\Cantina\\bin\\www'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start();
});

svc.install();