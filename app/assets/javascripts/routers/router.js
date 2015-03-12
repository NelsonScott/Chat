Chat.Routers.Router = Backbone.Router.extend({
  initialize: function($chatWrapper){
    this.$chatWrapper = $chatWrapper;
  },

  routes: {
    "": "home",
  },

  home: function(){
    var messages = new Chat.Collections.messages({name: "main"});

    var publicChatView = new Chat.Views.publicChat({
      collection: messages
    });

    this._swapView(publicChatView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$chatWrapper.html(view.render().$el);
  },
})
