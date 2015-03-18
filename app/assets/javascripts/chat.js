window.Chat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $chats = $('#chats');
    var $rooms = $('#rooms');

    var rooms = new Chat.Collections.rooms();
    var roomsView = new Chat.Views.rooms({
      rooms: rooms
    });
    $rooms.html(roomsView.render().$el);

    new Chat.Routers.Router($chats);
    Backbone.history.start();
  }
}
