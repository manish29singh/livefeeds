Template.appBody.onCreated(function() {
    var currentUser = Meteor.userId();
    if(!currentUser) {
        Router.go('login');
    }
});
