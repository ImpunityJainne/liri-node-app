# liri-node-app

The goal of this homework was develop an node app that lets you access various data sources (OMBD, Spotify, and Bands In Town) via several different methods, including the use of 'fs' and 'request' modules.

## Set up liri-node-app on your own computer:

1. Open your command line terminal.
1. Navigate to the directory where you have downloaded the contents of this repository.
1. Create a `.env` file in the same directory containing your own API Keys/IDs for [Bands In Town](http://www.artists.bandsintown.com/bandsintown-api), [OMDB](http://www.omdbapi.com), and [Spotify](https://developer.spotify.com/my-applications/#!/applications/create).

    - The file contents will look like this:
      ````
      # Spotify API keys
      SPOTIFY_ID= <your ID here>
      SPOTIFY_SECRET= <your secret here>

      # BandsInTown API Key
      BANDS_IN_TOWN_ID= <your ID here>

      # OMDB API Key
      OMDB_ID= <your ID here>
      ````

1. Type `npm install` to add the required modules.
1. Type `node liri.js help` to begin.

----

## About Mandie Kramer
*Check out my [**About Me**](https://impunityjainne.github.io/Bootstrap-Portfolio/) page to learn more about me!*
