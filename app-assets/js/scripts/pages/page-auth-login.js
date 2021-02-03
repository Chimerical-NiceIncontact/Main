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

    var pageLoginForm = $('.auth-login-form');

    // jQuery Validation
    // --------------------------------------------------------------------
    if (pageLoginForm.length) {
        pageLoginForm.validate({
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
                'login-email': {
                    required: true,
                    email: true
                },
                'login-password': {
                    required: true
                }
            }
        });
    }



    pageLoginForm.submit(function (event) {
        event.preventDefault();
        console.log("pressed");
        // Get user info
        var email = $('#login-email').val();
        var password = $('#login-password').val();

        auth.signInWithEmailAndPassword(email, password)
            .then(cred => {
                // On Successfull login, goto index.html
                console.log("Logged In: " + cred);
                var user = firebase.auth().currentUser,
                    db = firebase.firestore();
                db.collection('users').doc(user.uid).get().then(function (doc) {
                    if (doc.data().Status != "Active") {
                        toastr['warning']("Your account has not yet been activated.  If you believe this is in error, please reach out to your direct supervisor.", 'User Not Active', {
                            closeButton: true,
                            tapToDismiss: false,
                            progressBar: true
                        });
                        firebase.auth().signOut().then(() => {
                            // Sign-out successfull
                            console.log("Logged out successfully");
                        }).catch((error) => {
                            // An Error happened
                        });
                    } else {
                        window.location.href = "app-launch.html"; 
                    }
                });

            }).catch((e) => {
                // On error, do popup to tell customer.
                toastr['error'](e.toString(), 'Invalid Attempt', {
                    closeButton: true,
                    tapToDismiss: false,
                    progressBar: true
                });
            });
    });
});
