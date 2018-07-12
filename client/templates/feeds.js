import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


Template.feeds.onCreated(function () {
    this.category = Meteor.subscribe('categories');

});


Template.feeds.helpers({
    feeds: function () {
        console.log('feed called ----------------------')
        return Template.instance().data.result.get();
    },

    categoryName: function () {
        if (Template.instance().category.ready()) {
            var categoryId = Template.instance().data.categoryId;
            let doc = Categories.findOne({ _id: categoryId });
            return doc.name;
        }
    }

});

Template.feeds.events({
    'click .bookmark': function (event) {
        event.preventDefault();
        console.log('button clicked: ', this);
        let book = {
            user_id: Meteor.userId(),
            title: this.title,
            imgUrl: this.imgUrl,
            link: this.link,
            pubDate: this.pubDate,
            channelName: Template.instance().data.channelName
        }
        if (this.imgUrl) {
            book['imgUrl'] = this.imgUrl;
        } else {
            book['imgUrl'] = 'Image not available';
        }
        Meteor.call('bookmarkIn', book);
    }
})

Template.feeds.events({
    'click .recent-views': function (event) {
        // event.preventDefault();
        console.log('button clicked: ', this);
        let book = {
            user_id: Meteor.userId(),
            title: this.title,
            imgUrl: this.imgUrl,
            link: this.link,
            pubDate: this.pubDate,
            channelName: Template.instance().data.channelName
        }
        if (this.imgUrl) {
            book['imgUrl'] = this.imgUrl;
        } else {
            book['imgUrl'] = 'Image not available';
        }
        Meteor.call('recentViewsIn', book);
    }
})




