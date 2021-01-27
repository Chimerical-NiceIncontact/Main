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
        var avatarURL = "",
            avatarTitle = "",
            avatarDescription = "";

        // Nasa API
        var apod = {

            randomDate: function (start, end) {
                let date = new Date(
                    start.getTime() + Math.random() *
                    (end.getTime() - start.getTime())
                );

                let d = date.getDate();
                let m = date.getMonth() + 1;
                let y = date.getFullYear();

                if (m < 10) {
                    m = '0' + m;
                }

                if (d < 10) {
                    d = '0' + d;
                }

                return `${y}-${m}-${d}`;
            },


            buildDOM: function (result) {
                var count = result.explanation.length;
                console.log(result);
                if (count > 75) {
                    var shorten = result.explanation.split("\.")[1];
                }
                avatarURL = result.hdurl;
                avatarTitle = result.title;
                avatarDescription = result.explanation;

                /*
                $('.user-avatar').hover(function () {
                    $('#popover871274').addClass('show');
                    $('#popover871274').fadeIn(100);
                    $('.nasa-image-title').html(result.title);
                    $('.nasa-image-body').html(shorten);
                }, function() {
                    $('#popover871274').fadeOut(500);
                    //$('#popover871274').removeClass('show');
                });
                */

            },

            getRequest: function () {

                let date = this.randomDate(new Date(1995, 5, 16), new Date());
                let key = 'VWFQcVvwOZU3g1zGfUFJQ6HaIgKUKMZ2YA6kjwgT';
                var url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;
                let ths = this;


                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.send();

                xhr.onload = function () {
                    let result = JSON.parse(xhr.response);

                    ths.buildDOM(result);
                }
            },

            init: function () {
                this.getRequest();
            }
        };
        // Run NASA apod
        apod.getRequest();

        // sign up the user
        setTimeout(() => {
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
                    Avatar: {
                        "avatarURL": avatarURL,
                        "avatarTitle": avatarTitle,
                        "avatarDescription": avatarDescription
                    },
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
        }, 2000);
    });
});
