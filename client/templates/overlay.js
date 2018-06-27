import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';


Template.overlay.helpers({

});

Template.overlay.events({
    'click .logout' : function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
})