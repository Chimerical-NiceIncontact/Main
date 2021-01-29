/*=========================================================================================
    File Name: app-email.js
    Description: Email Page js
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

'use strict';

$(function () {
    // Register Quill Fonts
    var Font = Quill.import('formats/font');
    Font.whitelist = ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'];
    Quill.register(Font, true);

    var compose = $('.compose-email'),
        composeModal = $('#compose-mail'),
        menuToggle = $('.menu-toggle'),
        sidebarToggle = $('.sidebar-toggle'),
        sidebarLeft = $('.sidebar-left'),
        sidebarMenuList = $('.sidebar-menu-list'),
        emailAppList = $('.email-app-list'),
        emailUserList = $('.email-user-list'),
        emailUserListInput = $('.email-user-list .custom-checkbox'),
        emailScrollArea = $('.email-scroll-area'),
        emailTo = $('#email-to'),
        emailCC = $('#emailCC'),
        emailBCC = $('#emailBCC'),
        toggleCC = $('.toggle-cc'),
        toggleBCC = $('.toggle-bcc'),
        wrapperCC = $('.cc-wrapper'),
        wrapperBCC = $('.bcc-wrapper'),
        emailDetails = $('.email-app-details'),
        chatDetails = $('.chat-app-details'),
        phoneDetails = $('.phone-app-details'),
        listGroupMsg = $('.list-group-messages'),
        goBack = $('.go-back'),
        favoriteStar = $('.email-application .email-favorite'),
        userActions = $('.user-action'),
        mailDelete = $('.mail-delete'),
        mailUnread = $('.mail-unread'),
        emailSearch = $('#email-search'),
        editorEl = $('#message-editor .editor'),
        overlay = $('.body-content-overlay'),
        launchItem = $('.launch-item'),
        navLinkStyle = $('.nav-link-style');


    var assetPath = '../../../app-assets/';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
    }

    // Toggle BCC on mount
    if (wrapperBCC.length) {
        wrapperBCC.toggle();
    }

    // Toggle CC on mount
    if (wrapperCC) {
        wrapperCC.toggle();
    }

    // Toggle BCC input
    if (toggleBCC.length) {
        toggleBCC.on('click', function () {
            wrapperBCC.toggle();
        });
    }

    // Toggle CC input
    if (toggleCC.length) {
        toggleCC.on('click', function () {
            wrapperCC.toggle();
        });
    }

    // if it is not touch device
    if (!$.app.menu.is_touch_device()) {
        // Email left Sidebar
        if ($(sidebarMenuList).length > 0) {
            var sidebar_menu_list = new PerfectScrollbar(sidebarMenuList[0]);
        }

        // User list scroll
        if ($(emailUserList).length > 0) {
            var users_list = new PerfectScrollbar(emailUserList[0]);
        }

        // Email detail section
        if ($(emailScrollArea).length > 0) {
            var users_list = new PerfectScrollbar(emailScrollArea[0]);
        }
    }
    // if it is a touch device
    else {
        $(sidebarMenuList).css('overflow', 'scroll');
        $(emailUserList).css('overflow', 'scroll');
        $(emailScrollArea).css('overflow', 'scroll');
    }

    // Email to user select
    function renderGuestAvatar(option) {
        if (!option.id) {
            return option.text;
        }
        var avatarImg = feather.icons['user'].toSvg({
            class: 'mr-0'
        });
        if ($(option.element).data('avatar')) {
            avatarImg = "<img src='" + assetPath + 'images/avatars/' + $(option.element).data('avatar') + "' alt='avatar' />";
        }

        var $avatar =
            "<div class='d-flex flex-wrap align-items-center'>" +
            "<div class='avatar avatar-sm my-0 mr-50'>" +
            "<span class='avatar-content'>" +
            avatarImg +
            '</span>' +
            '</div>' +
            option.text +
            '</div>';

        return $avatar;
    }
    if (emailTo.length) {
        emailTo.wrap('<div class="position-relative"></div>').select2({
            placeholder: 'Select value',
            dropdownParent: emailTo.parent(),
            closeOnSelect: false,
            templateResult: renderGuestAvatar,
            templateSelection: renderGuestAvatar,
            tags: true,
            tokenSeparators: [',', ' '],
            escapeMarkup: function (es) {
                return es;
            }
        });
    }

    /* Select 2 Drop down for CC and BCC Field
    if (emailCC.length) {
        emailCC.wrap('<div class="position-relative"></div>').select2({
            placeholder: 'Select value',
            dropdownParent: emailCC.parent(),
            closeOnSelect: false,
            templateResult: renderGuestAvatar,
            templateSelection: renderGuestAvatar,
            tags: true,
            tokenSeparators: [',', ' '],
            escapeMarkup: function (es) {
                return es;
            }
        });
    }
 
    
    if (emailBCC.length) {
        emailBCC.wrap('<div class="position-relative"></div>').select2({
            placeholder: 'Select value',
            dropdownParent: emailBCC.parent(),
            closeOnSelect: false,
            templateResult: renderGuestAvatar,
            templateSelection: renderGuestAvatar,
            tags: true,
            tokenSeparators: [',', ' '],
            escapeMarkup: function (es) {
                return es;
            }
        });
    }
    */

    if (launchItem.length) {
        launchItem.on('click', function () {
            var current = $(this)[0].id;
            if (current == "launch-chat") {
                chatDetails.toggleClass('show');
                $('.mail-date-time').html(fullDate);
                //$('#pop-up-chat').modal('show');
                // Close other open things
                phoneDetails.removeClass('show');
            } else if (current == "launch-email") {
                $('.mail-date-time').html(fullDate);
                composeModal.modal('show');
                // Close other open things
                phoneDetails.removeClass('show');
                chatDetails.removeClass('show');
            } else if (current == "launch-phone") {
                $('.mail-date-time').html(fullDate);
                phoneDetails.toggleClass('show');
                // Close other open things
                chatDetails.removeClass('show');
            } else if (current == "launch-reporting") {
                $('.mail-date-time').html(fullDate);
                phoneDetails.removeClass('show');
                chatDetails.removeClass('show');
            }
        });
    }

    // Current Date & Time
    var Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dt = new Date(),
        currentMonth = Month[dt.getMonth()],
        currentDay = dt.getDay(),
        currentYear = dt.getFullYear(),
        time = dt.getHours() + ":" + dt.getMinutes();
    // Shorten month to first 3 letters   
    currentMonth = currentMonth.substr(0, 3);
    var fullDate = currentDay + " " + currentMonth + ", " + currentYear + ", " + time

    // Firebase Collections
    var user = firebase.auth().currentUser,
        db = firebase.firestore();
    const userDocRef = db.collection('users');

    // listen for auth status changes
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get().then(function (doc) {
                if (doc.exists) {
                    var data = doc.data();

                    // Dark Mode Check

                    /*
                    if (data.DarkMode == true) {
                        console.log('Dark Mode ON');
                        $('.loaded').addClass('dark-layout');
                        navLinkStyle.find('.ficon').replaceWith(feather.icons['sun'].toSvg({
                            class: 'ficon'
                        }));

                    } else {
                        console.log("Dark Mode OFF");
                        $('.loaded').addClass('light-layout');
                    }
                    */

                    // Set User's info
                    $('.user-name')[0].innerHTML = data.Name;
                    $('.user-status')[0].innerHTML = data.Role;
                    $('.round').attr('src', data.Avatar.avatarURL);
                    // Set Agent IDs
                    var c32 = doc.data().AgentID.C32;
                    var b32 = doc.data().AgentID.B32;
                    var c35 = doc.data().AgentID.C35;
                    var b2 = doc.data().AgentID.B2;

                    var idBU = '';
                    var x = 0;
                    // Fill in drop downs
                    for (x = 0; x < 2; x++) {
                        for (let i in doc.data().AgentID) {
                            idBU = doc.data().AgentID[i];
                            document.getElementsByClassName('cxoneOpt')[x].innerHTML += '<option value="' + doc.data().AgentID[i] + '"class="buID" data-icon="feather icon-folder">' + idBU + '</option>';
                        }
                    }
                    // Phone Submit Actions
                    $("button.launch-phone-submit").on("click", function (e) {
                        var phoneNum = $("input#phone-id-icon").val();
                        var firstName = $("input#first-name-icon").val();
                        var contactReason = $("input#contact-reason-id-icon").val();
                        var agentId = $("#launch-phone-select option:selected").text();
                        // Get Right URL
                        if (c32.localeCompare(agentId) === 0) {
                            $(function () {
                                $('#hiddenPage').load("https://home-c32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation%5cChimericalClickToCall&bus_no=4596619&scriptId=84257682&skill_no=4020410&p1=" + firstName + "&p2=" + phoneNum + "&p3=" + agentId + "&p4=now&p5=&Guid=06b1144c-fdc3-48ab-9064-a71a8b87bc8c");
                                toastr['success']('Launched C32', 'Script Launched', {
                                    closeButton: true,
                                    tapToDismiss: false,
                                    progressBar: true
                                });
                            });
                            console.log("Launched C32");
                        } else if (b32.localeCompare(agentId) === 0) {
                            $(function () {
                                $('#hiddenPage').load("https://home-b32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation%5cChimericalClickToCall&bus_no=4597359&scriptId=84182749&skill_no=4134464&p1=" + firstName + "&p2=" + phoneNum + "&p3=" + agentId + "&p4=&p5=&Guid=b59f7304-949d-4f2f-bb86-359e7e24380e");
                                toastr['success']('Launched B32', 'Script Launched', {
                                    closeButton: true,
                                    tapToDismiss: false,
                                    progressBar: true
                                });
                                console.log("Launched B32");
                            });

                        } else if (c35.localeCompare(agentId) === 0) {
                            $(function () {
                                $('#hiddenpagec32').load("https://home-c35.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation%5cChimericalClickToCall&bus_no=4600195&scriptId=83860392&skill_no=10558412&p1=" + firstName + "&p2=" + phoneNum + "&p3=" + agentId + "&p4=now&p5=&Guid=b59f7304-949d-4f2f-bb86-359e7e24380e");
                                toastr['success']('Launched C35', 'Script Launched', {
                                    closeButton: true,
                                    tapToDismiss: false,
                                    progressBar: true
                                });
                            });
                        }

                        console.log("Chosen Option: " + agentId);

                    });
                    // Chat Submit Actions
                    $("button.chat-launch-btn").on("click", function (e) {
                        $('#pop-up-chat').modal('show');
                        var emailAdd = $("input.emailAdd").val();
                        var firstName = $("input.firstName").val();
                        var contactReason = $("input.contactReason").val();
                        var agentId = $("#chatSelect option:selected").val();
                        var chatSessionID = 'akxyV29RWFZzVkE3SEpuS0lsVWVORzhzbno2aXkzcHN0Y2ZldHVHam9qcC9uNjBVYXRkNFp5MTdkQT09';
                        // Get Right URL
                        if (c32.localeCompare(agentId) === 0) {
                            window.open("https://home-c32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation%5cChimericalClickToCall&bus_no=4596619&scriptId=84257682&skill_no=4020410&p1=" + firstName + "&p2=" + emailAdd + "&p3=" + agentId + "&p4=&p5=&Guid=06b1144c-fdc3-48ab-9064-a71a8b87bc8c");
                        } else if (c35.localeCompare(agentId) === 0) {
                            window.open("https://home-c35.nice-incontact.com/incontact/chatclient/chatclient.aspx?poc=2c28d967-872c-4940-9fa4-89b3c6d181dd&bu=4600195&p1=" + firstName + "&p2=" + emailAdd + "&p3=" + agentId + "&p4=&p5=&Guid=06b1144c-fdc3-48ab-9064-a71a8b87bc8c");
                        } else if (b32.localeCompare(agentId) === 0) {
                            console.log("You chose B32");
                        } else if (b2.localeCompare(agentId) === 0) {
                            console.log("You chose B2... why?");
                        }
                        console.log("Chosen Option: " + agentId);
                    });

                    $("button.launch-refresh-button").on("click", function (e) {
                        location.reload();
                    });
                    
                    var signInCount = data.Misc.SignedInCount;
                    // Setup Tour
                    if (signInCount == 0) { 
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
                                text: 'First, lets have you go to your account so you can add your Agent IDs in.  Click here and select "View Account"',
                                attachTo: {
                                    element: '.dropdown-user',
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

                    // Darkmode Memorialization

                    /*
                    $('.darkMode').on('click', function (e) {
                        console.log("clicked");
                        var dark = data.DarkMode;
                        dark = !dark;
                        var postData = {
                            DarkMode: dark
                        }
                        userDocRef.doc(user.uid).update(postData).then(function () {
                            console.log("Document successfully updated!");
                            //console.log(postData);
                        }).catch(function (error) {
                            // The document probably doesnt exists
                            console.error("Error updating document: ", error);
                        });


                    });
                    */

                };
            });
        }
    });


    /* -------- Set Dark Mode Cookie -----------
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        var user = getCookie("username");
        if (user != "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 365);
            }
        }
    }
    */

    // Create chat session
    function createChatSessionC32() {
        console.log("Starting Session");
        var baseURI = "https://api-c32.nice-incontact.com/incontactapi/";
        var accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyOjExZTgyODg2LWUyODQtNzNhMC05ODAyLTAyNDJhYzExMDAwMiIsInJvbGUiOnsibGVnYWN5SWQiOiJBZG1pbmlzdHJhdG9yIiwic2Vjb25kYXJ5Um9sZXMiOltdLCJpZCI6ImIwMmJjMGQzLThlNGQtMTFlNy05OThiLTAyMzA5ZjI1ZGJmNCIsImxhc3RVcGRhdGVUaW1lIjoxNjA5ODY0NjUyMDAwfSwiaWNBZ2VudElkIjoiNjczMzE5OCIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLm5pY2UtaW5jb250YWN0LmNvbSIsImdpdmVuX25hbWUiOiJKb3NodWEiLCJhdWQiOiJBY2Nlc3NLZXlzQE5JQ0VpbkNvbnRhY3QgSW5jLiIsImljU1BJZCI6IjEwMTIyIiwiaWNCVUlkIjo0NTk2NjE5LCJuYW1lIjoiamdAbmljZWluY29udGFjdC5jb20iLCJ0ZW5hbnRJZCI6IjExZTc4ZTRkLWFmN2MtM2JiMC05ZWY5LTAyNDJhYzExMDAwMyIsImV4cCI6MTYxMTUxMjk1NCwiaWF0IjoxNjExNTA5MzU0LCJmYW1pbHlfbmFtZSI6IkdpYnNvbiIsInRlbmFudCI6IlNFX0RFTU9fQzMyIiwidmlld3MiOnt9LCJpY0NsdXN0ZXJJZCI6IkMzMiJ9.A84gtZsv6Fqa0cN5u9u1VZt9nieoUtDHXfxRhsMfFEsWrBwXO43-QRvrDWJIw94QCD2tWVztbVrQQ6BkXepGDUQWpVpiuMR_AXeYm996NCBwPopLBDXv4gl8mWyMYtZk5gXAv7A8ClL3ar6F9xmUL3cTuaDTCppfnZ61LoheE6o";
        var createChatSessionPayload = {
            'pointOfContact': '9bcf4734-6076-4c6f-ae75-7bbb808ac03f',
            'mediaType': '3'
        }
        $.ajax({
            //The baseURI variable is created by the result.base_server_base_uri
            //which is returned when getting a token and should be used to create the URL base
            'url': baseURI + 'services/v20.0/contacts/chats',
            'type': 'POST',
            'headers': {
                //Use access_token previously retrieved from inContact token service
                'Authorization': 'bearer ' + accessToken,
                'content-Type': 'application/json'
            },
            'data': JSON.stringify(createChatSessionPayload),
            'success': function (result) {
                //Process success actions
                console.log(result);
                return result;
            },
            'error': function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log(errorThrown);
                return false;
            }
        });
    }
    
    //akxyV29RWFZzVkE3SEpuS0lsVWVORzhzbno2aXkzcHN0Y2ZldHVHam9qcC9uNjBVYXRkNFp5MTdkQT09
    function endChatSession(chatSessionId) {
        var baseURI = "https://api-c32.nice-incontact.com/incontactapi/";
        var accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyOjExZTgyODg2LWUyODQtNzNhMC05ODAyLTAyNDJhYzExMDAwMiIsInJvbGUiOnsibGVnYWN5SWQiOiJBZG1pbmlzdHJhdG9yIiwic2Vjb25kYXJ5Um9sZXMiOltdLCJpZCI6ImIwMmJjMGQzLThlNGQtMTFlNy05OThiLTAyMzA5ZjI1ZGJmNCIsImxhc3RVcGRhdGVUaW1lIjoxNjA5ODY0NjUyMDAwfSwiaWNBZ2VudElkIjoiNjczMzE5OCIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLm5pY2UtaW5jb250YWN0LmNvbSIsImdpdmVuX25hbWUiOiJKb3NodWEiLCJhdWQiOiJBY2Nlc3NLZXlzQE5JQ0VpbkNvbnRhY3QgSW5jLiIsImljU1BJZCI6IjEwMTIyIiwiaWNCVUlkIjo0NTk2NjE5LCJuYW1lIjoiamdAbmljZWluY29udGFjdC5jb20iLCJ0ZW5hbnRJZCI6IjExZTc4ZTRkLWFmN2MtM2JiMC05ZWY5LTAyNDJhYzExMDAwMyIsImV4cCI6MTYxMTUxMjk1NCwiaWF0IjoxNjExNTA5MzU0LCJmYW1pbHlfbmFtZSI6IkdpYnNvbiIsInRlbmFudCI6IlNFX0RFTU9fQzMyIiwidmlld3MiOnt9LCJpY0NsdXN0ZXJJZCI6IkMzMiJ9.A84gtZsv6Fqa0cN5u9u1VZt9nieoUtDHXfxRhsMfFEsWrBwXO43-QRvrDWJIw94QCD2tWVztbVrQQ6BkXepGDUQWpVpiuMR_AXeYm996NCBwPopLBDXv4gl8mWyMYtZk5gXAv7A8ClL3ar6F9xmUL3cTuaDTCppfnZ61LoheE6o";
        $.ajax({
            //The baseURI variable is created by the result.base_server_base_uri
            //which is returned when getting a token and should be used to create the URL base
            'url': baseURI + 'services/v20.0/contacts/chats/' + chatSessionId,
            'type': 'DELETE',
            'headers': {
                //Use access_token previously retrieved from inContact token service
                'Authorization': 'bearer ' + accessToken,
                'content-Type': 'application/x-www-form-urlencoded'
            },
            'success': function (result) {
                //Process success actions
                console.log("Chat session ended: " + result);
                return result;
            },
            'error': function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log("Error: " + result);
                return false;
            }
        });
    }

    // compose email
    if (compose.length) {
        compose.on('click', function () {
            // showing rightSideBar
            overlay.removeClass('show');
            // hiding left sidebar
            sidebarLeft.removeClass('show');
            // all input forms
            $('.compose-form input').val('');
            emailTo.val([]).trigger('change');
            // quill editor content
            var quill_editor = $('.compose-form .ql-editor');
            quill_editor[0].innerHTML = '';
        });
    }

    // Main menu toggle should hide app menu
    if (menuToggle.length) {
        menuToggle.on('click', function (e) {
            sidebarLeft.removeClass('show');
            overlay.removeClass('show');
        });
    }

    // Email sidebar toggle
    if (sidebarToggle.length) {
        sidebarToggle.on('click', function (e) {
            e.stopPropagation();
            sidebarLeft.toggleClass('show');
            overlay.addClass('show');
        });
    }

    // Overlay Click
    if (overlay.length) {
        overlay.on('click', function (e) {
            sidebarLeft.removeClass('show');
            overlay.removeClass('show');
        });
    }


    // Email Right sidebar toggle
    if (emailUserList.find('li').length) {
        emailUserList.find('li').on('click', function (e) {
            emailDetails.toggleClass('show');
        });
    }



    // Add class active on click of sidebar list
    if (listGroupMsg.find('a').length) {
        listGroupMsg.find('a').on('click', function () {
            if (listGroupMsg.find('a').hasClass('active')) {
                listGroupMsg.find('a').removeClass('active');
            }
            $(this).addClass('active');
        });
    }

    // Email detail view back button click
    if (goBack.length) {
        goBack.on('click', function (e) {
            e.stopPropagation();
            emailDetails.removeClass('show');
        });
    }

    // Favorite star click
    if (favoriteStar.length) {
        favoriteStar.on('click', function (e) {
            $(this).find('svg').toggleClass('favorite');
            e.stopPropagation();
            // show toast only have favorite class
            if ($(this).find('svg').hasClass('favorite')) {
                toastr['success']('Updated mail to favorite', 'Favorite Mail ⭐️', {
                    closeButton: true,
                    tapToDismiss: false
                });
            }
        });
    }

    // For app sidebar on small screen
    if ($(window).width() > 768) {
        if (overlay.hasClass('show')) {
            overlay.removeClass('show');
        }
    }

    // single checkbox select
    if (emailUserListInput.length) {
        emailUserListInput.on('click', function (e) {
            e.stopPropagation();
        });
        emailUserListInput.find('input').on('change', function (e) {
            e.stopPropagation();
            var $this = $(this);
            if ($this.is(':checked')) {
                $this.closest('.media').addClass('selected-row-bg');
            } else {
                $this.closest('.media').removeClass('selected-row-bg');
            }
        });
    }

    // select all
    $(document).on('click', '.email-app-list .selectAll input', function () {
        if ($(this).is(':checked')) {
            userActions
                .find('.custom-checkbox input')
                .prop('checked', this.checked)
                .closest('.media')
                .addClass('selected-row-bg');
        } else {
            userActions.find('.custom-checkbox input').prop('checked', '').closest('.media').removeClass('selected-row-bg');
        }
    });

    // Delete selected Mail from list
    if (mailDelete.length) {
        mailDelete.on('click', function () {
            if (userActions.find('.custom-checkbox input:checked').length) {
                userActions.find('.custom-checkbox input:checked').closest('.media').remove();
                emailAppList.find('.selectAll input').prop('checked', false);
                toastr['error']('You have removed email.', 'Mail Deleted!', {
                    closeButton: true,
                    tapToDismiss: false
                });
                userActions.find('.custom-checkbox input').prop('checked', '');
            }
        });
    }

    // Mark mail unread
    if (mailUnread.length) {
        mailUnread.on('click', function () {
            userActions.find('.custom-checkbox input:checked').closest('.media').removeClass('mail-read');
        });
    }

    // Filter
    if (emailSearch.length) {
        emailSearch.on('keyup', function () {
            var value = $(this).val().toLowerCase();
            if (value !== '') {
                emailUserList.find('.email-media-list li').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
                var tbl_row = emailUserList.find('.email-media-list li:visible').length;

                //Check if table has row or not
                if (tbl_row == 0) {
                    emailUserList.find('.no-results').addClass('show');
                    emailUserList.animate({
                        scrollTop: '0'
                    }, 500);
                } else {
                    if (emailUserList.find('.no-results').hasClass('show')) {
                        emailUserList.find('.no-results').removeClass('show');
                    }
                }
            } else {
                // If filter box is empty
                emailUserList.find('.email-media-list li').show();
                if (emailUserList.find('.no-results').hasClass('show')) {
                    emailUserList.find('.no-results').removeClass('show');
                }
            }
        });
    }

    // Email compose Editor
    if (editorEl.length) {
        var emailEditor = new Quill(editorEl[0], {
            bounds: '#message-editor .editor',
            modules: {
                formula: true,
                syntax: true,
                toolbar: '.compose-editor-toolbar'
            },
            placeholder: 'Message',
            theme: 'snow'
        });
    }

    // On navbar search and bookmark Icon click, hide compose mail
    $('.nav-link-search, .bookmark-star').on('click', function () {
        composeModal.modal('hide');
    });
});

$(window).on('resize', function () {
    var sidebarLeft = $('.sidebar-left');
    // remove show classes from sidebar and overlay if size is > 992
    if ($(window).width() > 768) {
        if ($('.app-content .body-content-overlay').hasClass('show')) {
            sidebarLeft.removeClass('show');
            $('.app-content .body-content-overlay').removeClass('show');
        }
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
