Chat.Views.room = Backbone.View.extend({
  template: JST["room"],

  tagName: "li",

  initialize: function(options){
    this.room = options.room;
  },

  events: {
    "mouseenter": "activate",
    "mouseleave": "deactivate",
  },

  activate: function(){
    this.$(".list-group-item").addClass("active");
  },

  deactivate: function(){
    this.$(".list-group-item").removeClass("active");
  },

  render: function(){
    var content = this.template({room: this.room});
    this.$el.html(content);

    return this;
  },
})
