var Service = require('node-windows').Service;
const path = require('path')

// Create a new service object
var svc = new Service({
  name:'Active Directory Updater API by NodeJS',
  description: 'API for update data in Active Directory',
  script: path.join(__dirname, '../index.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.uninstall();