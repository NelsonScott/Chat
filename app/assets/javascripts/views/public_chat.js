Chat.Views.publicChat = Backbone.CompositeView.extend({
  template: JST["public_chat"],

  attributes: function(){
    return { class: "pub-chat" }
  },

  initialize: function(messages){
    this.profanityList = $.fn.profanity();
    this.friendlyList = ["rainbow", "kittens", "hug", "puppy", "tickles", "dazzling", "bunnies", "balloons", "ice cream", "jello", "smiles", "sunshines"];
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
    newMsg = this.profanityFilter(this.ensureASCII(newMsg));
    // newMsg = (newMsg);
    var displayName = this.$('.display-name-input').val();
    this.messages.create({ type: "plainText", content: newMsg, displayName: displayName });
    this.$('.add-msg').val("");
  },

  ensureASCII: function(unfiltered) {
    var charCode = null;
    var filtered = Array(unfiltered.length);

    for (var i = 0; i < unfiltered.length; i++) {
      charCode = unfiltered.charCodeAt(i);
      if (charCode > 255) {
        filtered[i] = "[]";
      } else {
        filtered[i] = unfiltered[i];
      }
    }

    return filtered.join("");
  },

  profanityFilter: function(unfiltered) {
    var words = unfiltered.split(" ");

    for (var i = 0; i < words.length; i++){
      var found = $.inArray(words[i], this.profanityList);
      if ( found > - 1){
        var idx = Math.floor((Math.random() * this.friendlyList.length));
        words[i] = this.friendlyList[idx];
      }
    }

    return words.join(" ");
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
