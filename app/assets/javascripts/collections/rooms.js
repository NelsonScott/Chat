Chat.Collections.rooms = Backbone.Firebase.Collection.extend({
  initialize: function(options){
  },

  model: Chat.Models.room,

  url: function(){
    return "https://intense-fire-9631.firebaseio.com/rooms";
  }
})
