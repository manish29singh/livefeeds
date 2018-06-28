import { Meteor } from 'meteor/meteor';
import x2j from 'xml2js';

Meteor.startup(async () => {

  var res = await HTTP.call('GET', 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms');
  let p = new x2j.Parser();
  if(res){
    var data = res.content.toString().replace("\ufeff", "");
    p.parseString(res.content,function(err, result){
      if(err){
        console.log('error', err)
      }
      let s = JSON.stringify(result);
      console.log('result parsed : ', s);
    })
  }

  console.log('res', res.content);

});


