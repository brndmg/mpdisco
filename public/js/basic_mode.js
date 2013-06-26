define(['mpdisco', 'player', 'user', 'playlist', 'library'], function(MPDisco, Player, User, Playlist, Library) {
  
  var BasicMode = MPDisco.module('BasicMode', function(BasicMode, MPDisco) {
    BasicMode.Mode = {
      player: Player.PlayerView,
      user: User.UserView,
      playlist: Playlist.PlaylistView,
      library: Library.LibraryView
    };
  });
  
  return BasicMode;
});
