Chat.Views.publicChat = Backbone.CompositeView.extend({
  template: JST["public_chat"],

  attributes: function(){
    return { class: "pub-chat" }
  },

  initialize: function(messages){
    this.messages = messages.collection;
    this.listenTo(this.messages, "add", this.attachMessage);
    this.listenTo(this.messages, "remove", this.removeMessage);
  },

  events: {
    "submit .add-content": "addMessage"
  },

  addMessage: function(event){
    event.preventDefault();
    var newMsg = this.$(".add-msg").val();
    var displayName = this.$('.display-name').val();
    this.messages.create({ type: "plainText", content: newMsg, displayName: displayName });
    this.$('.add-msg').val("");
  },

  attachMessage: function(message){
    var messageView = new Chat.Views.message({ message: message });
    this.addSubview('ul.message-list', messageView);
    var MessageList = this.$(".message-list");
    MessageList.scrollTop(MessageList[0].scrollHeight);
  },

  removeMessage: function(message){
    var subview = _.find(
      this.subviews("ul.message-list"),
      function (subview) {
        return subview.message === message;
      }
    );

    this.removeSubview("ul.message-list", subview);
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
