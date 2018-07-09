import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

//var category;

Template.feeds.onCreated(function () {
    this.category = Meteor.subscribe('categories');
    this.dataList = new ReactiveVar(null);
});


Template.feeds.helpers({
    feeds: function () {

        var template = Template.instance();
        var channel = Template.instance().data.channelName;
        var categoryId = Template.instance().data.categoryId;

        let feedArr = [];
        Meteor.call('fetchFeeds', channel, categoryId, (err, result) => {
            if (err) {
                console.log('error : ', err);
            }
            else {
                result = JSON.parse(result);
                var i = 0;
                for (res in result.rss.channel[0].item) {
                    let strArr = result.rss.channel[0].item[i].description[0].split('/></a>');
                    let img;
                    let descr = result.rss.channel[0].item[i].description[0];
                    if (strArr.length >= 2) {
                        descr = strArr[1];
                        img = strArr[0] + "height='100%' width='100%'/></a>";

                    } else {
                        descr = strArr[0];
                        img = 'Image not available';
                    }
                    if (channel == 'Hindustan Times' || channel == 'Mid Day') {
                        if (result.rss.channel[0].item[i]['media:content'][0]['$'].url);
                        img = `<a href = '#'><img src = ${result.rss.channel[0].item[i]['media:content'][0]['$'].url} height='100%' width='100%'/></a>`
                    }
                    if (channel == 'Mid Day') {
                        descr = result.rss.channel[0].item[i].summary[0];
                    }
                    if (channel == 'Navbharat Times') {
                        let imgurl = result.rss.channel[0].item[i].image[0];
                        img = `<a href = '#'><img src = '${imgurl}' height='100%' width='100%'/></a>`;
                    }
                    if (channel == 'News 18') {
                        let strArr = result.rss.channel[0].item[i].description[0].split('/>');
                        if (strArr.length >= 2) {
                            descr = strArr[1];
                            img = strArr[0] + "height='100%' width='100%'/>";

                        } else {
                            descr = strArr[0];
                            img = 'Image not available';
                        }
                    }
                    if (channel == 'India Today') {
                        let strArr = result.rss.channel[0].item[i].description[0].split('> </a>');
                        if (strArr.length >= 2) {
                            descr = strArr[1];
                            img = strArr[0] + "height='100%' width='100%'/></a>";

                        } else {
                            descr = strArr[0];
                            img = 'Image not available';
                        }
                    }
                    let feedObj = {
                        title: result.rss.channel[0].item[i].title[0],
                        description: descr,
                        imgUrl: img,
                        pubDate: result.rss.channel[0].item[i].pubDate[0],
                        link: result.rss.channel[0].item[i].link[0]
                    };
                    feedArr[i] = feedObj;
                    i++;
                }
                template.dataList.set(feedArr);
            }

        });
        return Template.instance().dataList.get();
    },

    categoryName: function () {
        if(Template.instance().category.ready()){
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




