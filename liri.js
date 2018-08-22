// Requires:
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var moment = require("moment");

// Variables

var command = process.argv[2]; // the command requested by the user

var input = process.argv.slice(3).join(" "); // takes all text beyond the command and puts it in the 'input' variable, regardless of length.

var spotify = new Spotify ({ // to access the Spotify key id and secret codes
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var hr = "\n----------------------------------------------------------------------\n";

switch(command) {
    default: console.log("\nI'm afraid I can't do that, Dave . . . \n(type 'node liri.js help' to see the list of possible commands.)\n");
    break;
    case "help": help();
    break;
    case "concert-this": concertThis();
    break;
    case "spotify-this-song": spotifyThisSong();
    break;
    case "movie-this": movieThis();
    break;
    case "do-what-it-says": doWhatItSays();
    break;
}

// [_] Build a help function that lists and defines the possible commands

function help () {
    console.log(
        hr
        + "You may use any of the following commands:\n\n"
        
        + "concert-this          To find the next concert location for an artist,\n"
        + "                      type: 'node liri.js concert-this ARTIST'\n"
        + "                      (Substitute 'ARTIST' above with the name of \n"
        + "                      your desired musician or band name.)\n\n"
        
        + "spotify-this-song     To find information about a song,\n"
        + "                      type: 'node liri.js spotify-this-song SONG TITLE'\n"
        + "                      (Substitute 'SONG TITLE' above with the title\n"
        + "                      of the song you wish to know more about.\n\n"

        + "movie-this            To find information about a move,\n"
        + "                      type: 'node liri.js movie-this MOVIE TITLE'\n"
        + "                      (Substitute 'MOVIE TITLE' above with the movie\n"
        + "                      you wish to know more about.\n\n"

        + "do-what-it-says       This command runs a command based on the contents\n"
        + "                      of the file 'random.txt' in this directory. Note\n"
        + "                      that the command and search request are separated\n"
        + "                      by a comma."
        + hr
    );
};

// [X] Write the function for 'concert-this'

function concertThis () {

    // * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

    // 	* Name of the venue
    // 	* Venue location
    // 	* Date of the Event (use moment to format this as "MM/DD/YYYY")

    var artist = input.trim()
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown.id;

    request (queryURL, function(error, response, body) {

        var result = JSON.parse(body);

        if (!error && response.statusCode === 200) {
            console.log(
                hr
                + artist + " will next be playing: \n\n"
                + "      VENUE: " + result[0].venue.name + "\n"
                + "   LOCATION: " + result[0].venue.city + ", " + result[0].venue.country + "\n"
                + "       DATE: " + moment(result[0].datetime).format("M/D/YYYY") + // [X] I need to parse out the date and time in a friendly format here.
                hr
            );
        } else {
            console.log(error);
        };

    });

};

function spotifyThisSong() {
    
    // * This will show the following information about the song in your terminal/bash window

    // 	* Artist(s)
    // 	* The song's name
    // 	* A preview link of the song from Spotify
    // 	* The album that the song is from
    //  * [_] If no song is provided then your program will default to "The Sign" by Ace of Base.

    if (!input) {
        console.log(
            "\nOOPS! You forgot to include a song title. (Type 'node liri.js help' to learn how to use the 'spotify-this-song' command.)\n\n"
            + "We'll do you a 'favor' and default to the search results for 'The Sign' by Ace of Base.\n\n"
            + "You're welcome."
        );
        var title = "The Sign";
    } else {
        var title = input.trim();
    };

    spotify.search({ type: "track", query: title }, function(error, data) {
        if (error) {
          return console.log('Error occurred: ' + error);
        };
    
        var result = data.tracks.items[0];

        console.log(
            hr
            + "You've searched for the song title '" + result.name + "'\n\n"

            + "This song is performed by " + result.artists[0].name + ", and can be found on\n"
            + "the album '" + result.album.name + "'.\n"
            + "You can listen to a preview of '" + result.name + "' at:\n"
            + result.preview_url + 
            hr
        );
    });

};

function movieThis() {

    // `node liri.js movie-this '<movie name here>'`
    // * This will output the following information to your terminal/bash window:

    // ```
    // 	* Title of the movie.
    // 	* Year the movie came out.
    // 	* IMDB Rating of the movie.
    // 	* Rotten Tomatoes Rating of the movie.
    // 	* Country where the movie was produced.
    // 	* Language of the movie.
    // 	* Plot of the movie.
    // 	* Actors in the movie.
    // ```

    // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    if (!input) {
        console.log(
            "\nOOPS! You forgot to include a movie title. (Type 'node liri.js help' to learn how to use the 'movie-this' command.)\n\n"
            + "We got you, though, no worries. We highly recommend that you look into 'Mr Nobody'. It's seriously a great film.\n"
        );
        var title = "Mr Nobody";
    } else {
        var title = input.trim();
    };

    var queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + keys.OMDB.id;

    request (queryURL, function(error, response, body) {

        var result = JSON.parse(body);

        if (!error && response.statusCode === 200) {
            console.log(
                hr
                + "Here's the info you requested on '" + title + "':\n\n"

                + "              RELEASED: " + result.Year + "\n"
                + "           IMDB RATING: " + result.imdbRating + "\n"
                + "ROTTEN TOMATOES RATING: " + result.Ratings[1].Value + "\n"
                + "    PRODUCTION COUNTRY: " + result.Country + "\n"
                + "              LANGUAGE: " + result.Language + "\n"
                + "                ACTORS: " + result.Actors + "\n\n"
                
                + "PLOT: " + result.Plot + 
                hr
            );
        } else {
            console.log(error);
        };

    });

}

function doWhatItSays() {

    // 4. `node liri.js do-what-it-says`

    // 	* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        
    // 	* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        
    // * Feel free to change the text in that document to test out the feature for other commands.

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error)
        };

        var dataArray = data.split(",");
        command = dataArray[0];
        input = dataArray[1];

        switch(command) {
            default: console.log("\nI'm afraid I can't do that, Dave . . . \n(type 'node liri.js help' to see the list of possible commands.)\n");
            break;
            case "help": help();
            break;
            case "concert-this": concertThis();
            break;
            case "spotify-this-song": spotifyThisSong();
            break;
            case "movie-this": movieThis();
            break;
            case "do-what-it-says": console.log("\nEEP! That won't work. try any of the other commands besides 'do-what-it-says'\n");
            break;
        };

    });

};

