Chat.Views.textFilters = Backbone.CompositeView.extend({
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
})
