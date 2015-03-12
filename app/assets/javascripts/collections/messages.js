Chat.Collections.messages = Backbone.Firebase.Collection.extend({
  initialize: function(options){
    this.name = options.name;
  },

  model: Chat.Models.message,

  url: function(){
    return "https://intense-fire-9631.firebaseio.com/" + this.name;
  }
})
