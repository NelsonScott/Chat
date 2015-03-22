Chat.Routers.Router = Backbone.Router.extend({
  initialize: function($chatWrapper){
    this.$chatWrapper = $chatWrapper;
  },

  routes: {
    "": "home",
    "rooms/:room": "room"
  },

  home: function(){
    var messages = new Chat.Collections.messages({name: "main"});

    var publicChatView = new Chat.Views.publicChat({
      messages: messages
    });

    this._swapView(publicChatView);
  },

  room: function(room){
    var messages = new Chat.Collections.messages({ name: room });

    var publicChatView = new Chat.Views.publicChat({
      messages: messages
    });
    this._swapView(publicChatView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$chatWrapper.html(view.render().$el);
  },
})
