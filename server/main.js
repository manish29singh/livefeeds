import { Meteor } from 'meteor/meteor';
import x2j from 'xml2js';

Meteor.startup(() => {



  // console.log('res', res.content);

});

Meteor.methods({
  'fetchFeeds': function () {
    var res = HTTP.call('GET', 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms');
    let parser = new x2j.Parser();
    let s;
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
  },

  'fetchSelectedChannel': function (userId) {
    var selectedChannel;
    var data = UserDetails.findOne({ user_id: userId });
    selectedChannel = data.selected_channel;
    return selectedChannel;
  }
})


