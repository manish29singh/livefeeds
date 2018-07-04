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
    channelList: function () {
        let data = NewsChannels.find().fetch();
        return data;
    },
    selectedChannel : function() {
        let user = UserDetails.findOne({user_id : Meteor.userId()});
        let channel = NewsChannels.findOne({_id : user.selected_channel})
        return channel;
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
       // $("#selectedChannel").text(this.name);
        Meteor.call('changeSelectedChannel', Meteor.userId(), this._id);
        Router.go('feeds', {channelName: this.name, categoryId : '7LkjixM2roZcw3YxG'});
    }
});

