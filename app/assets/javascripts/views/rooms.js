Chat.Views.rooms = Backbone.CompositeView.extend({
  template: JST["rooms"],

  initialize: function(options){
    this.rooms = options.rooms;
    this.listenTo(this.rooms, "add", this.attachRoom);
    this.listenTo(this.rooms, "remove", this.removeRoom);
  },

  events: {
    "click .add-room": "addRoom"
  },

  addRoom: function(event){
    event.preventDefault();

    this.rooms.create({ name: "New Room" })
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

    return this;
  },
})
