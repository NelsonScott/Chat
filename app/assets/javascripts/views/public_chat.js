Chat.Views.publicChat = Backbone.CompositeView.extend({
  template: JST["public_chat"],

  attributes: function(){
    return { class: "pub-chat" }
  },

  initialize: function(messages){
    this.profanityList = $.fn.profanity();
    this.friendlyList = ["rainbow", "kittens", "hug", "puppy", "tickles", "dazzling", "bunnies", "balloons", "ice cream", "jello", "smiles", "sunshine"];
    this.messages = messages.collection;
    this.listenTo(this.messages, "add", this.attachMessage);
    this.listenTo(this.messages, "remove", this.removeMessage);
  },

  events: {
    "submit .add-content": "addMessage",
    "click .sign-up": "signUp"
  },

  addMessage: function(event){
    event.preventDefault();

    var message = this.$(".add-msg").val();
    var displayName = this.$('.display-name-input').val();
    message = this.profanityFilter(this.ASCIIOnly(message));
    var formattedMessage = this.formatMedia(message);
    this.messages.create({
      content: formattedMessage,
      displayName: displayName,
      time: this.formatAMPM()
    });
    this.$('.add-msg').val("");
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

  ASCIIOnly: function(unfiltered) {
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
      var found = $.inArray(words[i].toLowerCase(), this.profanityList);
      if ( found > - 1){
        var idx = Math.round((Math.random() * (this.friendlyList.length - 1)));
        words[i] = this.friendlyList[idx];
      }
    }

    return words.join(" ");
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
          // TODO fix scaling to work for all videos
          words[i] = "<iframe width='400' height='223' src='https://www.youtube.com/embed/"+ video_id + "' frameborder='0' allowfullscreen></iframe>'";
        }
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
// testing Ajax signup, TODO move this
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
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    var MessageList = this.$(".message-list");
    MessageList.scrollTop(MessageList[0].scrollHeight);

    return this;
  },
})
