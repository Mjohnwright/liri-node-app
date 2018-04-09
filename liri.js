require("dotenv").config(); // installed using: npm install dotenv

var keys = require("./keys.js"); // this loads the keys.js file - RESPONSE on console: "this is loaded"
var request = require("request");
var Twitter = require("twitter");

var client = new Twitter(keys.twitter);

command = process.argv[2]; //like 'my-tweets'
name = process.argv[3]; //mu user account name

execute(command, name); // calls the execute function which starts the process

function execute(command, name) {
  //takes 2 arguments -- command name and username
  
  if (command === "my-tweets") {
    getTwitter(name); //runs the Twitter functionality
  }
}


function getTwitter(name) {
  var params = { screen_name: "ladygaga" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log(tweets);
    }
  });
}
