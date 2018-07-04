import { Meteor } from 'meteor/meteor';
import x2j from 'xml2js';

Meteor.startup(() => {



  // console.log('res', res.content);

});

Meteor.methods({
  'fetchFeeds': async function (channelName, categoryId ) {
    try {
      var url;
    
      var doc = await NewsChannels.findOne({ name: channelName });
   
      let obj = doc.sub_url.find(function(element){
      //  console.log('element', element)
        return element.category_id == categoryId;
      })
     // console.log('array obj: ', obj);
      if (doc) {
        url = doc.base_url + obj.sub_link;
        //console.log('url', url)
        var res = HTTP.call('GET', url);
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
      }
    } catch (err) {
      console.log('error occured: ', err);
    }

  },

  'fetchSelectedChannel': function (userId) {
    var selectedChannel;
    var data = UserDetails.findOne({ user_id: userId });
    selectedChannel = data.selected_channel;
    return selectedChannel;
  },

  'changeSelectedChannel': function (userId, channelId) {
    console.log('user id : ' + userId);
    console.log('channel id : ' + channelId)
    UserDetails.update({ user_id: userId }, { $set: { selected_channel: channelId } }, function (err, result) {
      if (err) {
        console('error: ', err);
      } else {
        console.log('updated', result);
      }
    });
  }
})


