NewsChannels = new Mongo.Collection('newschannels');
import SimpleSchema from 'simpl-schema'

let NewsChannelsSchema = new SimpleSchema({
    name : String,
    logo_url : String,
    language : String,
    base_url : String
    // sub_url : [
    //     {
    //         sub_url1 : String,
    //         sub_url2 : [
    //             {
    //                 category_id : String,
    //                 url :String
    //             }
    //         ]
    //     }
    // ],
    // category_list : [
    //     {
    //         category_id : String
    //     }
    // ]
});

NewsChannels.attachSchema(NewsChannelsSchema);