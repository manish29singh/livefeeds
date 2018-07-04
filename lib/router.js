Router.configure({
    layoutTemplate: 'appBody'
});

Router.route('home', {
    name: 'home',
    path: '/',
    template: 'home'
});

Router.route('login', {
    path: '/login',
    template: 'login',
})

Router.route('register', {
    path: '/register',
    template: 'register'
})

// Router.route('feeds', {
//     path:'/feeds',
//     template: 'feeds'
// })

Router.route('/:channelName/:categoryId', {
    name : 'feeds',
    template: 'feeds',
    data : function() {
        console.log("data route executed")
        return {
            channelName : this.params.channelName,
            categoryId : this.params.categoryId
        }
    }
})