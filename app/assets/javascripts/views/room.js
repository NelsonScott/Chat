Chat.Views.room = Backbone.View.extend({
  template: JST["room"],

  tagName: "li",

  initialize: function(options){
    this.room = options.room;
  },

  render: function(){
    var content = this.template({room: this.room});
    this.$el.html(content);

    return this;
  },
})
