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
    template: 'bookmarks'
})

Router.route('recentViews', {
    name: 'recentViews',
    path: '/recent-views',
    template: 'recentViews'
})

Router.route('/:channelName/:categoryId', {
    name: 'feeds',
    template: 'feeds',
    data: function () {
        console.log("data route executed")
        return {
            channelName: this.params.channelName,
            categoryId: this.params.categoryId
        }
    }
})