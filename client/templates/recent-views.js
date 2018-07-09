import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

Template.recentViews.onCreated(()=>{
    Meteor.subscribe('recentViews');
})

Template.recentViews.helpers({
    recentViews : function(){
        let userId = Meteor.userId();
        return RecentViews.find({user_id: userId}).fetch();
    }
});

Template.recentViews.events({
    'click .remove' : function(event) {
        event.preventDefault();
        Meteor.call('removeRecentView', this._id);
    }
})

