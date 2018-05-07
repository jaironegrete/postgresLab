var pg = require ('pg');

var pool = new pg.Pool()

var pgConString = "postgres://localhost/postgreslab"

pool.connect(pgConString, function(err, client, done) {
  if(err) {
    console.log(err);
  }
  client.on('notification', function(msg) {
    console.log(msg);
  });
  var query = client.query("LISTEN watchers");
});