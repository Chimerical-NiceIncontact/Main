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
                    var tempURL = "",
                        tempTitle = "",
                        tempDesc = "",
                        tempChange = false;
                    var signInCount = data.Misc.SignedInCount;
                    var x = "";
                    // Top right
                    if (('.user-name').length) {
                        for (x = 0; x < 2; x++) {
                            $('.user-name')[x].innerHTML = data.Name;
                        }
                        $('.user-status')[0].innerHTML = data.Role;
                        $('.round').attr('src', data.Avatar.avatarURL);
                    }
                    // User Info main Page
                    $('.user-fullname').val(data.Name);
                    $('.user-email').val(data.Email);
                    $('.user-username').val(data.Username);
                    $('#status').val(data.Status);
                    $('.user-role').val(data.Role);
                    $('.user-phone').val(data.Phone);
                    $('.user-avatar').attr('src', data.Avatar.avatarURL);
                    // Agent Id Info
                    $('.user-c37').val("To Be Added...");
                    $('.user-c32be').val("To Be Added...");
                    $('.user-c35').val(data.AgentID.C35);
                    $('.user-c32').val(data.AgentID.C32);
                    $('.user-b32').val(data.AgentID.B32);
                    $('.user-b2').val(data.AgentID.B2);
                    // User Permissions
                    if (data.Role != "Administrator") {
                        $('.user-role').attr("disabled", true);
                        $('.user-status').attr("disabled", true);
                    }

                    var count = data.Avatar.avatarDescription.length;
                    if (count > 75) {
                        var shorten = data.Avatar.avatarDescription.split("\.")[0];
                    }

                    $('.user-avatar').hover(function () {
                        $('#popover871274').addClass('show');
                        $('#popover871274').fadeIn(100);
                        $('.nasa-image-title').html(data.Avatar.avatarTitle);
                        $('.nasa-image-body').html(data.Avatar.avatarDescription);
                    }, function () {
                        $('#popover871274').fadeOut(500);
                        //$('#popover871274').removeClass('show');
                    });

                    // Shepherd Tour
                    if (signInCount == 0) {
                        var testing = $('.social-tab');
                        var tourVar = new Shepherd.Tour({
                            defaultStepOptions: {
                                classes: 'shadow-md bg-purple-dark',
                                scrollTo: false,
                                cancelIcon: {
                                    enabled: true
                                }
                            },
                            useModalOverlay: true
                        });
                        setupTour(tourVar).start();

                        function setupTour(tour) {
                            tour.addStep({
                                title: 'Lets Add Your Agent IDs',
                                text: 'Next, select this tab so we can begin inputing your Agent Ids.',
                                attachTo: {
                                    element: '.nav-agent-id',
                                    on: 'bottom'
                                },
                                buttons: [
                                    {
                                        action: tour.next,
                                        classes: 'btn btn-sm btn-primary btn-next',
                                        text: 'Okay'
                                    }
                                ]
                            });
                            return tour;
                        }
                    }
                    $('#social-tab').on('click', function () {
                        if (data.Misc.SignedInCount == 0) {
                            var tourVar = new Shepherd.Tour({
                                defaultStepOptions: {
                                    classes: 'shadow-md bg-purple-dark',
                                    scrollTo: false,
                                    cancelIcon: {
                                        enabled: true
                                    }
                                },
                                useModalOverlay: true
                            });
                            setupTour(tourVar).start();

                            function setupTour(tour) {
                                tour.addStep({
                                    title: 'Lets Add Your Agent IDs',
                                    text: 'Now that we are finally here, enter in all the shown Agent Id fields, except for C37 and C32-BE.  These will be used later',
                                    attachTo: {
                                        element: '.user-user',
                                        on: 'bottom'
                                    },
                                    buttons: [
                                        {
                                            action: tour.next,
                                            classes: 'btn btn-sm btn-primary btn-next',
                                            text: 'Okay'
                                    }
                                ]
                                });
                                return tour;
                            }
                        }
                    });

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
                            tempURL = result.hdurl;
                            tempDesc = shorten+'.';
                            tempTitle = result.title;

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
                        setTimeout(() => {
                            //console.log(tempURL);
                            //console.log(tempDesc);
                            //console.log(tempTitle);
                            tempChange = true;
                            toastr['success'](
                                'Heres Your New Picture! Make sure to save changes when you find a picture you like!',
                                'Have Fun!', {
                                    closeButton: true,
                                    tapToDismiss: false,
                                    positionClass: "toast-top-right"
                                }
                            );

                        }, 1000);


                    });
                    // Initialize the post
                    //apod.init();

                    $('.user-submit').on('click', function (e) {
                        $('#acceptance-button').modal('show');
                        $('#user-modal').modal('hide');
                    })

                    $("form.checkerForm").on("change", ":input", function (e) {
                        //':input' selector get all form fields even textarea, input, or select
                        window[$(this).attr("name")] = true;
                        console.log($(this).attr("name"));
                    });

                    $('.user-cancel').click(function () {
                        location.href = "app-user-view.html";
                    });


                    // Upload stuff to db
                    $(".btn-accept").click(function () {
                        // User Info
                        var changedName = $('.user-fullname').val();
                        var changedEmail = $('.user-email').val();
                        var changedPhone = $('.user-phone').val();
                        var changedRole = $('.user-role').val();
                        var changedUsername = $('.user-username').val();
                        var changedStatus = $('#status').val();

                        // Agent ID
                        var changedAgentC35 = $('.user-c35').val();
                        var changedAgentC32 = $('.user-c32').val();
                        var changedAgentB32 = $('.user-b32').val();
                        var changedAgentB2 = $('.user-b2').val();

                        // POST
                        if (data.Misc.SignedInCount == 0) {
                            var postData = {
                                Name: changedName ? changedName : null,
                                Email: changedEmail ? changedEmail : null,
                                Phone: changedPhone ? changedPhone : null,
                                Role: "Sales Engineer",
                                Status: changedStatus ? changedStatus : null,
                                Username: changedUsername ? changedUsername : null,
                                AgentID: {
                                    C35: changedAgentC35 ? changedAgentC35 : null,
                                    C32: changedAgentC32 ? changedAgentC32 : null,
                                    B32: changedAgentB32 ? changedAgentB32 : null,
                                    B2: changedAgentB2 ? changedAgentB2 : null
                                },
                                "Misc.SignedInCount": 1
                            };
                        } else if (tempChange == true) {
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
                                },
                                Avatar: {
                                    avatarDescription: tempDesc,
                                    avatarTitle: tempTitle,
                                    avatarURL: tempURL
                                }
                            };
                        } else {
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
                                },
                                Avatar: {
                                    avatarDescription: tempDesc,
                                    avatarTitle: tempTitle,
                                    avatarURL: tempURL
                                }
                            };
                        }
                        console.log(postData);
                        userDocRef.doc(user.uid).update(postData).then(function () {
                            if (data.Misc.SignedInCount == 1) {
                                setTimeout(function () {
                                    toastr['success'](
                                        'You are all ready to go!',
                                        'Congrats!', {
                                            closeButton: true,
                                            tapToDismiss: false,
                                            positionClass: "toast-bottom-center"
                                        }
                                    );
                                }, 2000);
                                setTimeout(() => {
                                    location.reload();
                                }, 2300);
                            } else {
                                console.log("Document successfully updated!");
                                //console.log(postData);
                                location.reload();
                            }
                        }).catch(function (error) {
                            // The document probably doesnt exists
                            console.error("Error updating document: ", error);
                        });



                    });
                }
            })
        }
    });

    // logout
    $('.logout').on('click', function (e) {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
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
