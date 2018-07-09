Meteor.publish('userDetails', function(){
    return UserDetails.find({user_id : Meteor.userId()});
})

Meteor.publish('channel', function(){
    var data = NewsChannels.find();
    return data;
})

Meteor.publish('bookmarks', function(){
    return BookMarks.find({user_id :  Meteor.userId()});
})

Meteor.publish('recentViews', ()=>{
    return RecentViews.find({user_id : Meteor.userId()});
})

Meteor.publish('categories', ()=>{
    return Categories.find();
})