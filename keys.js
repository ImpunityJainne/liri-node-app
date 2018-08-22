// console.log('this is loaded'); -- this worked, hiding now

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsInTown = {
  id: process.env.BANDS_IN_TOWN_ID
};

exports.OMDB = {
  id: process.env.OMDB_ID
};