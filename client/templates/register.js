import { Template } from 'meteor/templating';

Template.register.onRendered(function () {
    var validator = $('.register').validate({
        submitHandler: function (event) {
            var email = $('[name = "email"]').val();
            var password = $('[name = "password"]').val();
            var name = $('[name="fullname"]').val();
            var city = $('[name = "city"]').val();

            Accounts.createUser({
                email: email,
                password: password,
                profile: {
                    name: name,
                    city: city
                }
            }, function (err) {
                if (err) {
                    if (err.reason == "Email already exists.") {
                        validator.showErrors({
                            email: "That email already belongs to a registered user."
                        });
                    }
                } else {
                    console.log('User saved.');
                    Router.go('home');
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
        },
        fullname: {
            required: true
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
        },
        fullname: {
            required: "You must enter your name."
        }
    }
});