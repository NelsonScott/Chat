Chat.Views.rooms = Backbone.CompositeView.extend({
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
    this.rooms.create({ name: name });
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
