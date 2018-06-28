Router.configure({
    layoutTemplate: 'appBody'
});

Router.route('home', {
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

Router.route('feeds', {
    path:'/feeds',
    template: 'feeds'
})