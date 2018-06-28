import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';



Template.feeds.helpers({
    feeds : function(){
        return {
            title : "Indigenisation of metro components can boost the Make in India project",
            description : "The Union government set up a panel under former Delhi Metro chief E Sreedharan to lay down norms for standardisation and indigenisation of components, which will be used by metros being built or those that will be built with the Centre’s financial help",
            imgUrl : "https://www.hindustantimes.com/rf/image_size_630x354/HT/p2/2018/06/27/Pictures/delhi-metro-green-line-new-delhi-india_0180cf7c-7a00-11e8-b46a-be68571826e9.jpg",
            pubDate : "Thu, 28 Jun 2018 04:18:34 GMT"
        }
    }
})