const pg        = require('pg');
const express   = require('express');
const app       = express();

const config = {
    user: 'root',
    database: 'postgreslab',
    password: 'root',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
		   client.on('notification', function(msg) {
		console.log(msg);
	  });
	  var query = client.query("LISTEN addedrecord");
	  console.log(query);
   })
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});