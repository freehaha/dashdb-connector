var ibmdb = require('ibm_db');

module.exports = function(source, resourceType, cb) {
  var cred = source.credentials;
  var connString = "DRIVER={DB2};DATABASE=" + cred.db + ";UID=" + cred.username + ";PWD=" + cred.password + ";HOSTNAME=" + cred.hostname + ";port=" + cred.port;
  ibmdb.open(connString, function(err, conn) {
    if (err) {
      cb(err);
      return;
    }
    conn.query(source.query, function(err, tables, moreResultSets) {
      if ( !err ) { 
        cb(null, tables);
      } else {
        cb("error occurred " + err.message);
      }
      /*
         Close the connection to the database
         param 1: The callback function to execute on completion of close function.
         */
      conn.close(function(){
        /* error closing */
      });
    });
  });
};
