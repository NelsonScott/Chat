Chat.Views.message = Backbone.View.extend({
  template: JST["message"],

  tagName: "li",

  attributes: function(){
    return { class: "message-content"};
  },

  initialize: function(options){
    this.message = options.message;
  },

  render: function(){
    var content = this.template({ message: this.message });
    this.$el.html(content);

    return this;
  },
})
