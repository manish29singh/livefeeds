UserDetails = new Mongo.Collection('userdetails');
import SimpleSchema from 'simpl-schema';

let UserDetailsSchema = new SimpleSchema({
    user_id : String,
    name : String,
    city : String,
    selected_channel : String
});

UserDetails.attachSchema(UserDetailsSchema);