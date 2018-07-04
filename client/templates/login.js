import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.login.onCreated(function(){
    console.log('Login : onCreated');
    var currentUser = Meteor.userId();
    if(currentUser) {
        Router.go('home');
    }
});

Template.login.onRendered(function () {
    var validator = $('.login').validate({
        submitHandler: function (event) {
            var email = $('[name = "email"]').val();
            var password = $('[name = "password"]').val();

            Meteor.loginWithPassword(email, password, function (err) {
                if (err) {
                    if (err.reason == 'User not found') {
                        validator.showErrors({
                            email: err.reason
                        });
                    }
                    if (err.reason == 'Incorrect password') {
                        validator.showErrors({
                            password: err.reason
                        });
                    }
                } else {
                    var currentRoute = Router.current().route.getName();
                    if (currentRoute == 'login') {
                        Router.go('home');
                    }
                }
            });
        }
    });
});

$.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 8
        }
    },
    messages: {
        email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        }
    }
});