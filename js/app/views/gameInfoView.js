

'use strict';

var deps = ['backbone', 
            'handlebars',
            'text!./app/views/templates/gameInfo.handlebars']

define('GameInfoView', deps, function (Backbone, handlebars, gameInfoTemplate) {
    
    var gameInfoView = Backbone.View.extend({
        el: $('body'),
        
        initialize: function () {
            this.render()
        },
        
        render: function () {
            console.log(this.$el.length);
            var compiled = Handlebars.compile(gameInfoTemplate);
            this.$el.prepend(compiled);
        }
    });
    
    return gameInfoView;
    
});