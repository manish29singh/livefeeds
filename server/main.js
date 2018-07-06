import { Meteor } from 'meteor/meteor';
import x2j from 'xml2js';

Meteor.startup(() => {

});

Meteor.methods({
  'fetchFeeds': async function (channelName, categoryId) {
    try {
      var url;
      // console.log('server run')
      var doc = await NewsChannels.findOne({ name: channelName });

      let obj = doc.sub_url.find(function (element) {
        return element.category_id == categoryId;
      })
      if (doc) {
        url = doc.base_url + obj.sub_link;
        var res = HTTP.call('GET', url);
        let parser = new x2j.Parser();
        let s;

        if (res) {
          //var data = res.content.toString().replace("\ufeff", "");
          parser.parseString(res.content, function (err, result) {
            if (err) {
              console.log('error', err)
            } else {
              s = JSON.stringify(result);
            }
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
    UserDetails.update({ user_id: userId }, { $set: { selected_channel: channelId } }, function (err, result) {
      if (err) {
        console('error: ', err);
      } else {
        console.log('updated', result);
      }
    });
  },

  'bookmarkIn' : function(book) {
    BookMarks.insert({
      user_id : book.user_id,
      news_title : book.title,
      news_img_url : book.imgUrl,
      news_link : book.link,
      news_pubdate : book.pubDate,
      news_channel : book.channelName
    })
  }
})


