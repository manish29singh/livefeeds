BookMarks = new Mongo.Collection('bookmarks');
import SimpleSchema from 'simpl-schema'

let BookmarkSchema = new SimpleSchema({
    user_id : String,
    news_title : String,
    news_img_url : String,
    news_link : String,
    news_pubdate : String,
    news_channel : String
});

BookMarks.attachSchema(BookmarkSchema);