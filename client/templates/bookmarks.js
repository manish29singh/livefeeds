import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';



Template.bookmarks.helpers({
    bookmarks : function(){
        let userId = Meteor.userId();
        return BookMarks.find({user_id: userId}).fetch();
    }
});

Template.bookmarks.events({
    'click .remove' : function(event) {
        event.preventDefault();
        Meteor.call('removeBookmark', this._id);
    }
})