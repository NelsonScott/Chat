// TODO change this to composite view
// simple view now just for testing firebase
Chat.Views.publicChat = Backbone.View.extend({
  template: JST["public_chat"],

  id: "pub-chat",

  initialize: function(messages){
    this.messages = messages.collection;
    // this.messages.create({ content: "Tst main msg"} );
    this.listenTo(this.messages, "add", this.render);

    // this.render();
  },

  events: {
    "click .add-msg": "addMessage"
  },

  addMessage: function(event){
    event.preventDefault();
    // for testing just add manually
    this.messages.create({ content: "Added Test" });
  },

  render: function(){
    // change this to attaching message subview
    var content = this.template({messages: this.messages});
    this.$el.html(content);

    return this;
  },
})
