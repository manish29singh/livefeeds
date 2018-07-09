RecentViews = new Mongo.Collection('recentviews');
import SimpleSchema from 'simpl-schema'

let RecentViewsSchema = new SimpleSchema({
    user_id : String,
    news_title : String,
    news_img_url : String,
    news_link : String,
    news_pubdate : String,
    news_channel : String
});

RecentViews.attachSchema(RecentViewsSchema);