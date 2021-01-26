/*=========================================================================================
  File Name: form-validation.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
    'use strict';

    var pageResetForm = $('.auth-register-form');

    // jQuery Validation
    // --------------------------------------------------------------------
    if (pageResetForm.length) {
        pageResetForm.validate({
            /*
            * ? To enable validation onkeyup
            onkeyup: function (element) {
              $(element).valid();
            },*/
            /*
            * ? To enable validation on focusout
            onfocusout: function (element) {
              $(element).valid();
            }, */
            rules: {
                'register-username': {
                    required: true
                },
                'register-email': {
                    required: true,
                    email: true
                },
                'register-password': {
                    required: true
                }
            }
        });
    }
    var db = firebase.firestore(),
        user = firebase.auth().currentUser;

    pageResetForm.submit(function (event) {
        event.preventDefault();
        console.log("pressed");
        // Get user info
        var fullname = $('#register-fullname').val();
        var username = $('#register-username').val();
        var email = $('#register-email').val();
        var password = $('#register-password').val();

        // sign up the user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);
            // Create user in firestore
            db.collection('users').doc(cred.user.uid).set({
                Name: fullname,
                Email: email,
                Role: "Signup",
                Username: username,
                Phone: "0000000000",
                Status: "Inactive",
                Avatar: "",
                AgentID: {
                    "C35": "123456",
                    "C32": "123456",
                    "B32": "123456",
                    "B2": "123456"
                },
                Misc: {
                    "DarkMode": 0,
                    "SignedIn": false,
                    "SignedInCount": 0
                }
            })
            var userRef = db.collection('users').doc(user.uid).get().then(function (event) {
                var data = doc.data();
                console.log("if here and no error: " + data);
            })

        }).catch(function (e) {
            // On error, do popup to tell customer.
            toastr['error'](e.toString(), 'Invalid Attempt', {
                closeButton: true,
                tapToDismiss: false,
                progressBar: true
            });
        });
    });
});
