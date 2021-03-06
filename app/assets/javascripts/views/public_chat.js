Chat.Views.publicChat = Chat.Views.textFilters.extend({
  template: JST["public_chat"],

  attributes: function(){
    return { class: "pub-chat" }
  },

  initialize: function(options){
    Chat.Views.publicChat.__super__.initialize.apply(this, {});

    this.messages = options.messages;
    this.listenTo(this.messages, "add", this.attachMessage);
    this.listenTo(this.messages, "remove", this.removeMessage);

    this.render();
    this.messages.each(_.bind(function(msg){
      this.attachMessage(msg);
    }, this));
  },

  events: {
    "submit .add-content": "addMessage",
    "click .sign-up": "signUp"
  },

  addMessage: function(event){
    event.preventDefault();

    var message = this.$(".add-msg").val();
    message = message.substring(0, 200);
    message = this.profanityFilter(this.ASCIIOnly(message));
    if (this.messages.name == "bazinga!") {
      message += " bazinga!";
    }

    var displayName = this.$('.display-name-input').val();
    displayName = displayName.substring(0, 15);
    if (displayName.length == 0){
      displayName = "Guest";
    }
    displayName = this.profanityFilter(this.ASCIIOnly(displayName));
    Chat.displayName = displayName;

    var formattedMessage = this.formatMedia(message);
    this.messages.create({
      content: formattedMessage,
      displayName: displayName,
      time: this.formatAMPM()
    });
    this.$('.add-msg').val("");
  },

  attachMessage: function(message){
    if (message.get('content').length != 0){
      var messageView = new Chat.Views.message({ message: message });
      this.addSubview('ul.message-list', messageView);
    }

    var MessageList = this.$("ul.message-list");
    MessageList.scrollTop(MessageList[0].scrollHeight);
  },

  formatAMPM: function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  },

  formatMedia: function(message) {
    var words = message.split(" ");
    var word = null;
    var url = null;

    for (var i = 0; i < words.length; i++) {
      word = words[i];
      url = word.match(/(http).*(svg|tif|tiff|gif|jpeg|jpg|jif|jfif|jp2|jpx|j2k|j2c|fpx|pcd|png|pdf)/ig);
      if (url) {
        words[i] = "<img class='user-image' src='" + url + "'>";
      } else {
        url = word.match(/(http).*(youtube).*/ig);
        if (url) {
          var video_id = url[0].split('v=')[1];
          var ampersandPosition = video_id.indexOf('&');
          if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
          }

          words[i] = "<iframe width='400' height='223' src='https://www.youtube.com/embed/"+ video_id + "' frameborder='0' allowfullscreen></iframe>";
        }
      }
    }

    return words.join(" ");
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
// TODO move this to rooms view, require signup before making new room
  signUp: function(){
    $.ajax ({
      headers: {
        'X-Transaction': 'POST Example',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      url: "users",
      type: "POST",
      dataType: 'json',
      data: {
        "user": {"email": "scott11@example.com", "password": "password"},
      },
      success: function(msg){
        console.log("Successfully signed up.");
      },
      error: function(msg) {
        console.log("Error signing up.");
      }
    });
  },

  render: function(){
    if (Chat.displayName) var displayName = Chat.displayName;
    var content = this.template({name: this.messages.name, displayName: displayName});
    this.$el.html(content);
    this.attachSubviews();
    var MessageList = this.$("ul.message-list");
    MessageList.scrollTop(MessageList[0].scrollHeight);

    return this;
  },
})
