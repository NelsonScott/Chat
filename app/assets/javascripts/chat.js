window.Chat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $chats = $('#chats');
    var $rooms = $('#rooms');

    // var roomsView = new Chat.Views.rooms({
    //   collection:
    // });
    // $rooms.html(roomsView.render().$el);

    new Chat.Routers.Router($chats);
    Backbone.history.start();
  }
}
