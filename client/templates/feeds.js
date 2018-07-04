import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

Template.feeds.onCreated(function () {
      this.dataList = new ReactiveVar(null);
  })

Template.feeds.helpers({
    feeds : function(){
        var template = Template.instance();
     console.log('feeds helper data : ', Template.instance().data)
     var channel = Template.instance().data.channelName;
    // console.log('channel name -----------', channelName);
     var categoryId = Template.instance().data.categoryId;
     
        let feedArr = [];
        Meteor.call('fetchFeeds', channel, categoryId , (err, result) => {
            if (err) {
                console.log('error : ', err);
            }
            else {
               // console.log('meteor call this : ', this)
                result = JSON.parse(result);
                var i = 0;
                for (res in result.rss.channel[0].item) {
                    let strArr = result.rss.channel[0].item[i].description[0].split('/></a>');
                    let img;
                    let descr = result.rss.channel[0].item[i].description[0];
                   // console.log('string arr length ', strArr.length)
                    if (strArr.length >= 2) {
                        descr = strArr[1];
                        img = strArr[0] + "height='100%' width='100%'/></a>";

                    } else {
                        descr = strArr[0];
                        img ='';
                    }
                    if(channel == 'Hindustan Times' || channel == 'Mid Day' ){
                        if(result.rss.channel[0].item[i]['media:content'][0]['$'].url);
                        img =  `<a href = '#'><img src = ${result.rss.channel[0].item[i]['media:content'][0]['$'].url} height='100%' width='100%'/></a>`
                    }
                    if(channel == 'News 18'){
                        
                    }
                    if(channel == 'Mid Day'){
                        descr = result.rss.channel[0].item[i].summary[0];
                    }
                    let feedObj = {
                        title: result.rss.channel[0].item[i].title[0],
                        description: descr,
                        imgUrl: img,
                        pubDate: result.rss.channel[0].item[i].pubDate[0]
                    };
                    feedArr[i] = feedObj;
                    i++;
                }     
                template.dataList.set(feedArr);
            //    console.log(feedArr);
            }

        });
        return Template.instance().dataList.get();
    }
})