NewsChannels = new Mongo.Collection('newschannels');
import SimpleSchema from 'simpl-schema'

let NewsChannelsSchema = new SimpleSchema({
    name : String,
    logo_url : String,
    language : String,
    base_url : String,
    sub_url : [
        {
           category_id : String,
           sub_link : String
        }
    ]
});

NewsChannels.attachSchema(NewsChannelsSchema);