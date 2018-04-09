const result = require("dotenv").config(); // installed using: npm install dotenv

if (result.error) {
  throw result.error;
}
// console.log(result.parsed);


var keys = require("./keys.js"); // this loads the keys.js file - RESPONSE on console: "this is loaded"
var request = require("request");
var Twitter = require("twitter");

var client = new Twitter(keys.twitter);

command = process.argv[2]; //for example: 'my-tweets'
// console.log(command);
name = process.argv[3]; //for example:  user account name 'theRealMWright'



function execute(command, name) {
  //takes 2 arguments -- command name ('my-tweets') and username/artist

  if (command === "my-tweets") {
    getTwitter(name); //calls the Twitter function
  }
}
// console.log("hi");

function getTwitter(name) {
  var params = { screen_name: "theRealMWright" };
  client.get('favorites/list', params, function(
    error,
    tweets,
    response
  ) {
    if (error) throw error;
    console.log(tweets);
    console.log(response);
  });
}


//THIS IS FUNCTION where it all starts
execute(command, name); // calls the execute function which starts the process
