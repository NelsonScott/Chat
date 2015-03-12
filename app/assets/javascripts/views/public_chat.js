// TODO change this to composite view
// simple view now just for testing firebase
Chat.Views.publicChat = Backbone.View.extend({
  template: JST["public_chat"],

  attributes: function(){
    return { class: "pub-chat" }
  },

  initialize: function(messages){
    this.messages = messages.collection;
    // this.messages.create({ content: "Tst main msg"} );
    this.listenTo(this.messages, "add", this.render);
  },

  events: {
    "submit .add-content": "addMessage"
  },

  addMessage: function(event){
    event.preventDefault();
    var newMsg = this.$(".add-msg").val();
    this.messages.create({ content: newMsg });
  },

  render: function(){
    // change this to attaching message subview
    var content = this.template({messages: this.messages});
    this.$el.html(content);

    return this;
  },
})
