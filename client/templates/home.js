import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

Template.home.onCreated(function(){
    console.log('Home : onCreated');
    var currentUser = Meteor.userId();
    if(!currentUser) {
        Router.go('login');
    }
});

