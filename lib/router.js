Router.configure({
    layoutTemplate: 'appBody'
});

if (Meteor.isClient) {

}
Router.route('home', {
    name: 'home',
    path: '/',
    template: 'home'
});

Router.route('loading', {
    path: '/loading',
    template: 'loading'
})

Router.route('login', {
    name: 'login',
    path: '/login',
    template: 'login',
})

Router.route('register', {
    path: '/register',
    template: 'register'
})

Router.route('bookmarks', {
    name: 'bookmarks',
    path: '/bookmarks',
    template: 'bookmarks',
    loadingTemplate : 'loading',
    waitOn: function () {
        return Meteor.subscribe('bookmarks');
    }
})

Router.route('recentViews', {
    name: 'recentViews',
    path: '/recent-views',
    template: 'recentViews',
    loadingTemplate: 'loading',
    waitOn: function () {
        return Meteor.subscribe('recentViews')
    }
})

Router.route('/:channelName/:categoryId', {
    name: 'feeds',
    template: 'feeds',
    waitOn: function () {
        //console.log("data route executed");
        //edited
        var dataList = new ReactiveVar(null);
        var channel = this.params.channelName;
        let feedArr = [];
        Meteor.call('fetchFeeds', this.params.channelName, this.params.categoryId, (err, result) => {
            if (err) {
                console.log('error : ', err);
            }
            else {
                result = JSON.parse(result);
                var i = 0;
                for (res in result.rss.channel[0].item) {
                    let strArr = result.rss.channel[0].item[i].description[0].split('/></a>');
                    let img;
                    let descr = result.rss.channel[0].item[i].description[0];
                    if (strArr.length >= 2) {
                        descr = strArr[1];
                        img = strArr[0] + "height='100%' width='100%'/></a>";

                    } else {
                        descr = strArr[0];
                        img = 'Image not available';
                    }
                    if (channel == 'Hindustan Times' || channel == 'Mid Day') {
                        if (result.rss.channel[0].item[i]['media:content'][0]['$'].url);
                        img = `<a href = '#'><img src = ${result.rss.channel[0].item[i]['media:content'][0]['$'].url} height='100%' width='100%'/></a>`
                    }
                    if (channel == 'Mid Day') {
                        descr = result.rss.channel[0].item[i].summary[0];
                    }
                    if (channel == 'Navbharat Times') {
                        let imgurl = result.rss.channel[0].item[i].image[0];
                        img = `<a href = '#'><img src = '${imgurl}' height='100%' width='100%'/></a>`;
                    }
                    if (channel == 'News 18') {
                        let strArr = result.rss.channel[0].item[i].description[0].split('/>');
                        if (strArr.length >= 2) {
                            descr = strArr[1];
                            img = strArr[0] + "height='100%' width='100%'/>";

                        } else {
                            descr = strArr[0];
                            img = 'Image not available';
                        }
                    }
                    if (channel == 'India Today') {
                        let strArr = result.rss.channel[0].item[i].description[0].split('> </a>');
                        if (strArr.length >= 2) {
                            descr = strArr[1];
                            img = strArr[0] + "height='100%' width='100%'/></a>";

                        } else {
                            descr = strArr[0];
                            img = 'Image not available';
                        }
                    }
                    let feedObj = {
                        title: result.rss.channel[0].item[i].title[0],
                        description: descr,
                        imgUrl: img,
                        pubDate: result.rss.channel[0].item[i].pubDate[0],
                        link: result.rss.channel[0].item[i].link[0]
                    };
                    feedArr[i] = feedObj;
                    i++;
                }
                dataList.set(feedArr);
            }
        });
        //edited


        return {
            channelName: this.params.channelName,
            categoryId: this.params.categoryId,
            result: dataList
        }
    }
})