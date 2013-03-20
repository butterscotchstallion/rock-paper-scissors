

'use strict';

var deps = ['backbone', 
            'handlebars',
            'text!./app/views/templates/main.handlebars',
            'GameInfoView']

define('AppView', deps, function (Backbone, 
                                  handlebars, 
                                  mainTemplate, 
                                  GameInfoView) {
    
    var appView = Backbone.View.extend({
        el: $('body'),
        
        initialize: function () {
            this.render()
        },
        
        render: function () {
            var compiled = Handlebars.compile(mainTemplate);
            this.$el.html(compiled);
            
            new GameInfoView();
        }
    });
    
    return appView;
    
});