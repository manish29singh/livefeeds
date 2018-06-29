import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';



Template.feeds.helpers({
    feeds : function(){
        // console.log('feeds helper')
       // let Feed = {};
        let feedArr = [];
         Meteor.call('fetchFeeds', function(err, result) {
            if(err) {
                console.log('error : ', err);
            } 
            else {
                result = JSON.parse(result);
                var i =0;
                for(res in result.rss.channel[0].item){
                    let strArr = result.rss.channel[0].item[i].description[0].split('/></a>');
                    let img = strArr[0]+"height='100%' width='100%'/></a>";
                    let descr = strArr[1];
                    let feedObj = {
                        title : result.rss.channel[0].item[i].title[0],
                        description : descr,
                        imgUrl : img,
                        pubDate : result.rss.channel[0].item[i].pubDate[0]
                    };
                    feedArr[i] = feedObj; 
                    i++;
                }               
                Session.set('q', feedArr);
                console.log(feedArr);
            }
            
        });
        return Session.get('q');
    }
})