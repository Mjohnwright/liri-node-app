//rotten tomatoes ?????
//ADD THE TWEET NUMBER WITH A FOR LOOP
//only getting 19 tweets

require("dotenv").config(); // installed using: npm install dotenv

var keys = require("./keys"); // this loads the keys.js file - this will link with the 'var client assignment
var request = require("request"); //for OMBD
var Twitter = require("twitter"); //for Twitter
var Spotify = require("node-spotify-api"); //for Spotify
var fs = require("fs"); //for file share

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// 2 arguments passed into Node
command = process.argv[2]; //for example: 'my-tweets'
argument = process.argv[3]; //for example:  song name or movie name

//FUNCTION that Evaluates the API TO CALL
function execute(command) {
  //passing an argument into a 'switch' function that evaluates the firts arugment ('command') to determine which function to call
  switch (command) {
    case "my-tweets":
      getTwitter();
      break;

    case "spotify-my-song":
      getSpotify(argument);
      break;

    case "movie-this":
      getOMBD(argument);
      break;

    case "do-what-it-says":
      getFS();
      break;
  }
}

//*************************************************** */
// TWITTER FUNCTION < my-tweets >
function getTwitter(name) {
  console.log("function getTwitter launched");

  var params = {
    screen_name: "katyperry",
    limit: 21
  }; // "theRealMWright"
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i <= 19; i++) {
        // console.log("JSON object: " + JSON.stringify(tweets[i], null, 2));
        console.log(i);
        console.log("Last tweets = ", tweets[i].text); //returns the text of the tweet ---ADD THE NUMBER IN HERE
        console.log("timestamp = ", tweets[i].created_at); //returns the tweet timestamp
        console.log("******************************************************"); //returns the tweet timestamp
      }
    }
  });
}

//*********************************************
// SPOTIFY FUNTION - < spotify-my-song >
var songName;
function getSpotify(argument) {
  console.log("ARGUMENTS IN SPOTIFY: " + argument);

  if (argument == null) {
    argument = "The Sign Ace Of Base";
  }
  spotify.search({ type: "track", query: argument, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      console.log("Error: " + err);
      return;
    }
    
    var songs = data.tracks.items[0];

    // console.log("SONGS = " + JSON.stringify(data, null, 2));
    console.log("1 ************ Song Name = ", songs.name);
    console.log("2 ************ Artist= ", songs.artists[0].name);
    console.log("3 ************ Album Name = ", songs.album.name);
    console.log("4 ************ Preview = ", songs.preview_url);
  });
}

//********************************************
// OMBD FUNCTION < movie-this >
function getOMBD(argument) {
  var movieName = "";

  if (argument === undefined) {
    movieName = "Mr. Nobody";
  }

  var totalArgs = process.argv;

  for (var i = 3; i < totalArgs.length; i++) {
    if (i > 3 && i <= totalArgs.length) {
      movieName = argument + "-" + totalArgs[i];
    } else {
      movieName += totalArgs[i];
    }
  }

  // Then run a request to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&tomatoes=true&y=&plot=short&apikey=ee2df17c";

  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);
 var rottentomatoes;
  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // console.log(" JSON OBJECT: " + JSON.stringify(body, null, 2));
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating); ////change this up
      console.log("Country Produced In: " + JSON.parse(body).Country);
      console.log("Language of Movie: " + JSON.parse(body).Language);
      console.log("Movie Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

// ****************************
// FUNCTION   do-what-it-says
function getFS() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) throw err;
    console.log(data);

    var firstString = data.split(",");
    console.log(firstString);
    argument = firstString[1];
    console.log("this is the new argument = " + argument);
    getSpotify(argument);
  });
}

//THIS IS FUNCTION where it all starts
execute(command);
