import { Meteor } from 'meteor/meteor';
import x2j from 'xml2js';

Meteor.startup(() => {



  // console.log('res', res.content);

});

Meteor.methods({
  'fetchFeeds': function (channel) {
    var url;

    if(channel == 'Times of India') {
      url = 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms';
    }
    if(channel == 'Hindustan Times') {
      url = 'https://www.hindustantimes.com/rss/topnews/rssfeed.xml';
    }
    if(channel == 'NDTV India') {
      url = 'https://www.bhaskar.com/rss-feed/2322/'
    }
    var res = HTTP.call('GET', url);
    let parser = new x2j.Parser();
    let s;
    try{
      if (res) {
        //var data = res.content.toString().replace("\ufeff", "");
        parser.parseString(res.content, function (err, result) {
          if (err) {
            console.log('error', err)
          }
          s = JSON.stringify(result);
          //console.log('result parsed : ', s);
        })
      }
      return s;
    } catch(err) {
      console.log('error occured: ', err);
    }
   
  },

  'fetchSelectedChannel': function (userId) {
    var selectedChannel;
    var data = UserDetails.findOne({ user_id: userId });
    selectedChannel = data.selected_channel;
    return selectedChannel;
  }
})


