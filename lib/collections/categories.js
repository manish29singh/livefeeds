Categories = new Mongo.Collection('categories');
import SimpleSchema from 'simpl-schema';

let CategoriesSchema = new SimpleSchema({
    name : String
})

Categories.attachSchema(CategoriesSchema);