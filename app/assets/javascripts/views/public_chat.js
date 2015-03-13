Chat.Views.publicChat = Backbone.CompositeView.extend({
  template: JST["public_chat"],

  attributes: function(){
    return { class: "pub-chat" }
  },

  initialize: function(messages){
    this.messages = messages.collection;
    this.listenTo(this.messages, "add", this.attachMessage);
    this.listenTo(this.messages, "add", this.render);
    this.listenTo(this.messages, "remove", this.render);
  },

  events: {
    "submit .add-content": "addMessage"
  },

  addMessage: function(event){
    event.preventDefault();
    var newMsg = this.$(".add-msg").val();
    this.messages.create({ type: "plainText", content: newMsg });
  },

  attachMessage: function(message){
    var messageView = new Chat.Views.message({ message: message });
    this.addSubview('ul.message-list', messageView);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    var MessageList = this.$(".message-list");
    MessageList.scrollTop(MessageList[0].scrollHeight);

    return this;
  },
})
