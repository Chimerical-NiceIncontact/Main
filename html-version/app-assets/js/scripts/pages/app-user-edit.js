/*=========================================================================================
    File Name: app-user-edit.js
    Description: User Edit page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(function () {
    'use strict';

    var changePicture = $('#change-picture'),
        userAvatar = $('.user-avatar'),
        languageSelect = $('#users-language-select2'),
        form = $('.form-validate'),
        birthdayPickr = $('.birthdate-picker');



    //apod.getRequest();



    // Firebase Collections
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    const userDocRef = db.collection('users');

    // listen for auth status changes
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get().then(function (doc) {
                if (doc.exists) {
                    var data = doc.data();
                    var x = "";
                    // Top right
                    if (('.user-name').length) {
                        for (x = 0; x < 2; x++) {
                            $('.user-name')[x].innerHTML = data.Name;
                        }
                        $('.user-status')[0].innerHTML = data.Role;
                    }
                    // User Info main Page
                    $('.user-fullname').val(data.Name);
                    $('.user-email').val(data.Email);
                    $('.user-username').val(data.Username);
                    $('#status').val(data.Status);
                    $('.user-role').val(data.Role);
                    $('.user-phone').val(data.Phone);
                    $('.user-avatar').attr('src', data.Avatar);
                    // Agent Id Info
                    $('.user-c37').val("To Be Added...");
                    $('.user-c32be').val("To Be Added...");
                    $('.user-c35').val(data.AgentID.C35);
                    $('.user-c32').val(data.AgentID.C32);
                    $('.user-b32').val(data.AgentID.B32);
                    $('.user-b2').val(data.AgentID.B2);

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
                            $('.user-avatar').attr('src', result.hdurl);

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

                    $('#change-picture').on('click', function (e) {
                        apod.getRequest();

                    });
                    // Initialize the post
                    //apod.init();

                    $('.user-submit').on('click', function (e) {
                        $('#acceptance-button').modal('show');
                        $('#user-modal').modal('hide');
                    })


                    // Upload stuff to db
                    $(".btn-accept").click(function () {
                        // User Info
                        var changedName = $('.dt-full-name').val();
                        var changedEmail = $('.dt-email').val();
                        var changedPhone = $('.dt-phone').val();
                        var changedRole = $('.dt-role').val();
                        var changedUsername = $('.dt-username').val();
                        var changedStatus = $('#status').val();
                        console.log(changedEmail);

                        // Agent ID
                        var changedAgentC35 = $('.dt-c35').val();
                        var changedAgentC32 = $('.dt-c32').val();
                        var changedAgentB32 = $('.dt-b32').val();
                        var changedAgentB2 = $('.dt-b2').val();

                        // POST
                        var postData = {
                            Name: changedName ? changedName : null,
                            Email: changedEmail ? changedEmail : null,
                            Phone: changedPhone ? changedPhone : null,
                            Role: changedRole ? changedRole : null,
                            Status: changedStatus ? changedStatus : null,
                            Username: changedUsername ? changedUsername : null,
                            AgentID: {
                                C35: changedAgentC35 ? changedAgentC35 : null,
                                C32: changedAgentC32 ? changedAgentC32 : null,
                                B32: changedAgentB32 ? changedAgentB32 : null,
                                B2: changedAgentB2 ? changedAgentB2 : null
                            }
                        };
                        console.log(postData);
                        /*
                        userDocRef.doc(user.uid).update(postData).then(function () {
                            console.log("Document successfully updated!");
                            //console.log(postData);
                            location.reload();
                        }).catch(function (error) {
                            // The document probably doesnt exists
                            console.error("Error updating document: ", error);
                        });
                        */


                    });
                }
            })
        }
    });


    // Change user profile picture
    if (changePicture.length) {
        $(changePicture).on('change', function (e) {
            var reader = new FileReader(),
                files = e.target.files;
            reader.onload = function () {
                if (userAvatar.length) {
                    userAvatar.attr('src', reader.result);
                }
            };
            reader.readAsDataURL(files[0]);
        });
    }

    // users language select
    if (languageSelect.length) {
        languageSelect.wrap('<div class="position-relative"></div>').select2({
            dropdownParent: languageSelect.parent(),
            dropdownAutoWidth: true,
            width: '100%'
        });
    }

    // Users birthdate picker
    if (birthdayPickr.length) {
        birthdayPickr.flatpickr();
    }

    // Validation
    if (form.length) {
        $(form).each(function () {
            var $this = $(this);
            $this.validate({
                submitHandler: function (form, event) {
                    event.preventDefault();
                },
                rules: {
                    username: {
                        required: true
                    },
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    dob: {
                        required: true,
                        step: false
                    },
                    phone: {
                        required: true
                    },
                    website: {
                        required: true,
                        url: true
                    },
                    address: {
                        required: true
                    },
                    zip: {
                        required: true,
                        maxlength: 6
                    },
                    city: {
                        required: true
                    },
                    state: {
                        required: true
                    },
                    country: {
                        required: true
                    }
                }
            });
        });

        $(this).on('submit', function (event) {
            event.preventDefault();
        });
    }
});
