import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

var channelName, logo;
Template.navigation.helpers({
    username: function () {
        console.log('userId: ', Meteor.userId());
        var data = UserDetails.findOne({user_id : Meteor.userId()});
        var username = data.name;
        return username;
    },
    navlist: function () {
        return Categories.find().fetch();
    },
    logoUrl: function () {
        let data = NewsChannels.findOne({ language: 'en' });
        return data.logo_url;
    },
    channelList: function () {
        let data = NewsChannels.find().fetch();
        return data;
    }
})

Template.navigation.events({
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'click #drpdown a': function (event) {
        event.preventDefault();
        $("#selectedChannel").text(this.name);
        console.log('logging' , this.name);
    }
});