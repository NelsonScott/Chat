Chat.Views.rooms = Chat.Views.textFilters.extend({
  template: JST["rooms"],

  attributes: function(){
    return {class: "rooms-list-wrapper"}
  },

  initialize: function(options){
    this.rooms = options.rooms;
    this.listenTo(this.rooms, "add", this.attachRoom);
    this.listenTo(this.rooms, "remove", this.removeRoom);
  },

  events: {
    "submit .add-room": "addRoom"
  },

  addRoom: function(event) {
    event.preventDefault();

    var nameInput = this.$('.add-room-input');
    var name = nameInput.val();
    name = name.substring(0, 15);
    name = this.profanityFilter(this.ASCIIOnly(name));

    var forbiddenChars = this.hasRestrictedChars(name);
    if (forbiddenChars){
      alert("Room name cannot contain: " + forbiddenChars);
      return;
    }

    var found = false;
    this.rooms.each(function(room){
      if (room.escape('name') == name) {
        alert("Room already exists");
        found = true;
      }
    });

    if (!found){
      this.rooms.create({ name: name });
      Backbone.history.navigate("rooms/" + name, {trigger: true})
    }
    nameInput.val("");
  },

  attachRoom: function(room) {
    var roomView = new Chat.Views.room({ room: room });
    this.addSubview('ul.rooms-list', roomView);
  },

  removeRoom: function(room) {
    var subview = _.find(
      this.subviews("ul.rooms-list"),
      function (subview) {
        return subview.room === room;
      }
    );

    this.removeSubview("ul.rooms-list", subview);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },
})
