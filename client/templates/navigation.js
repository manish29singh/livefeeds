import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

var channel, userDetails;
Template.navigation.onCreated(function () {
    channel = Meteor.subscribe('channel');
    userDetails = Meteor.subscribe('userDetails');

})


Template.navigation.helpers({
    username: function () {
        if (userDetails.ready()) {
            var data = UserDetails.findOne({ user_id: Meteor.userId() });
            var username = data.name.split(' ')[0];
            return username;
        }
    },
    channelList: function () {
        let data = NewsChannels.find({ language: 'en' }).fetch();
        return data;
    },
    channelListHindi: function () {
        let data = NewsChannels.find({ language: 'hi' }).fetch();
        return data;
    },
    selectedChannel: function () {
        if (channel.ready()) {
            let user = UserDetails.findOne({ user_id: Meteor.userId() });
            let channel = NewsChannels.findOne({ _id: user.selected_channel })
            return channel;
        }
    }
})

Template.navigation.events({
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout(function () {
            Router.go('login');
        });

    },

    'click #drpdown a': function (event) {
        event.preventDefault();
        // $("#selectedChannel").text(this.name);
        Meteor.call('changeSelectedChannel', Meteor.userId(), this._id);
        Router.go('feeds', { channelName: this.name, categoryId: '7LkjixM2roZcw3YxG' });
    }
});

