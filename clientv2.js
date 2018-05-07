var pg = require('pg');
conString = 'postgresql://root:root@localhost/postgreslab';

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
    client.connect();
    client.query('LISTEN "loc_update"');
    client.on('notification', function(data) {
        console.log(data.payload);
    });
});