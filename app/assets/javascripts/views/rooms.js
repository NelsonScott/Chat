Chat.Views.rooms = Backbone.View.extend({
  template: JST["rooms"],

  initialize: function(options){
    this.rooms = options.rooms;
    this.listenTo(this.rooms, "add", this.addRoom);
    this.listenTo(this.rooms, "remove", this.removeRoom);
  },

  addRoom: function(room) {
    console.log(room.get('name'));
  },

  removeRoom: function(room) {

  },

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },
})
