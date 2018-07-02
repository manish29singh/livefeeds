import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

Template.home.onCreated(function(){
    console.log('Home : onCreated');
    var currentUser = Meteor.userId();
    if(!currentUser) {
        Router.go('login');
    }
});

Template.home.onRendered(function(){
    var selectedChannel;
   Meteor.call('fetchSelectedChannel', function(err, result) { 
       if(err) {
           console.log('error: ', err);
       } else {
           Session.set('q', result);
          // console.log('status ', result);
       }
   })
    if(!Session.get('q')) {
        $('#myModal').modal('show');
    }

    // $('#myModal').modal('show');
    console.log('onrendered ended')
    
})

