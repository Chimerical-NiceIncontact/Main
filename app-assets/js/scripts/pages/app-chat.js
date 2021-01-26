/*=========================================================================================
    File Name: app-chat.js
    Description: Chat app js
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

'use strict';

$(function () {
    var chatUsersListWrapper = $('.chat-application .chat-user-list-wrapper'),
        overlay = $('.body-content-overlay'),
        profileSidebar = $('.chat-application .chat-profile-sidebar'),
        profileSidebarArea = $('.chat-application .profile-sidebar-area'),
        profileToggle = $('.chat-application .sidebar-profile-toggle'),
        userProfileToggle = $('.chat-application .user-profile-toggle'),
        userProfileSidebar = $('.user-profile-sidebar'),
        statusRadio = $('.chat-application .user-status input:radio[name=userStatus]'),
        userChats = $('.user-chats'),
        chatsUserList = $('.chat-users-list'),
        chatList = $('.chat-list'),
        contactList = $('.contact-list'),
        sidebarToggle = $('.sidebar-toggle'),
        sidebarContent = $('.sidebar-content'),
        closeIcon = $('.chat-application .close-icon'),
        sidebarCloseIcon = $('.chat-application .sidebar-close-icon'),
        menuToggle = $('.chat-application .menu-toggle'),
        speechToText = $('.speech-to-text'),
        chatSearch = $('.chat-application #chat-search');

    // init ps if it is not touch device
    if (!$.app.menu.is_touch_device()) {
        // Chat user list
        if (chatUsersListWrapper.length > 0) {
            var chatUserList = new PerfectScrollbar(chatUsersListWrapper[0]);
        }

        // Admin profile left
        if (userProfileSidebar.find('.user-profile-sidebar-area').length > 0) {
            var userScrollArea = new PerfectScrollbar(userProfileSidebar.find('.user-profile-sidebar-area')[0]);
        }

        // Chat area
        if (userChats.length > 0) {
            var chatsUser = new PerfectScrollbar(userChats[0], {
                wheelPropagation: false
            });
        }

        // User profile right area
        if (profileSidebarArea.length > 0) {
            var user_profile = new PerfectScrollbar(profileSidebarArea[0]);
        }
    } else {
        chatUsersListWrapper.css('overflow', 'scroll');
        userProfileSidebar.find('.user-profile-sidebar-area').css('overflow', 'scroll');
        userChats.css('overflow', 'scroll');
        profileSidebarArea.css('overflow', 'scroll');

        // on user click sidebar close in touch devices
        $(chatsUserList)
            .find('li')
            .on('click', function () {
                $(sidebarContent).removeClass('show');
                $(overlay).removeClass('show');
            });
    }

    // Chat Profile sidebar & overlay toggle
    if (profileToggle.length) {
        profileToggle.on('click', function () {
            profileSidebar.addClass('show');
            overlay.addClass('show');
        });
    }

    // Update status by clicking on Radio
    if (statusRadio.length) {
        statusRadio.on('change', function () {
            var $className = 'avatar-status-' + this.value,
                profileHeaderAvatar = $('.header-profile-sidebar .avatar span');
            profileHeaderAvatar.removeClass();
            profileToggle.find('.avatar span').removeClass();
            profileHeaderAvatar.addClass($className + ' avatar-status-lg');
            profileToggle.find('.avatar span').addClass($className);
        });
    }

    // On Profile close click
    if (closeIcon.length) {
        closeIcon.on('click', function () {
            profileSidebar.removeClass('show');
            userProfileSidebar.removeClass('show');
            if (!sidebarContent.hasClass('show')) {
                overlay.removeClass('show');
            }
        });
    }

    // On sidebar close click
    if (sidebarCloseIcon.length) {
        sidebarCloseIcon.on('click', function () {
            sidebarContent.removeClass('show');
            overlay.removeClass('show');
        });
    }

    // User Profile sidebar toggle
    if (userProfileToggle.length) {
        userProfileToggle.on('click', function () {
            userProfileSidebar.addClass('show');
            overlay.addClass('show');
        });
    }

    // On overlay click
    if (overlay.length) {
        overlay.on('click', function () {
            sidebarContent.removeClass('show');
            overlay.removeClass('show');
            profileSidebar.removeClass('show');
            userProfileSidebar.removeClass('show');
        });
    }

    // Add class active on click of Chat users list
    if (chatUsersListWrapper.find('ul li').length) {
        chatUsersListWrapper.find('ul li').on('click', function () {
            var $this = $(this),
                startArea = $('.start-chat-area'),
                activeChat = $('.active-chat');

            if (chatUsersListWrapper.find('ul li').hasClass('active')) {
                chatUsersListWrapper.find('ul li').removeClass('active');
            }

            $this.addClass('active');
            $this.find('.badge').remove();

            if (chatUsersListWrapper.find('ul li').hasClass('active')) {
                startArea.addClass('d-none');
                activeChat.removeClass('d-none');
            } else {
                startArea.removeClass('d-none');
                activeChat.addClass('d-none');
            }
        });
    }

    // auto scroll to bottom of Chat area
    chatsUserList.find('li').on('click', function () {
        userChats.animate({
            scrollTop: userChats[0].scrollHeight
        }, 400);
    });

    // Main menu toggle should hide app menu
    if (menuToggle.length) {
        menuToggle.on('click', function (e) {
            sidebarContent.removeClass('show');
            overlay.removeClass('show');
            profileSidebar.removeClass('show');
            userProfileSidebar.removeClass('show');
        });
    }

    // Chat sidebar toggle
    if ($(window).width() < 992) {
        if (sidebarToggle.length) {
            sidebarToggle.on('click', function () {
                sidebarContent.addClass('show');
                overlay.addClass('show');
            });
        }
    }

    // Filter
    if (chatSearch.length) {
        chatSearch.on('keyup', function () {
            var value = $(this).val().toLowerCase();
            if (value !== '') {
                // filter chat list
                chatList.find('li:not(.no-results)').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
                // filter contact list
                contactList.find('li:not(.no-results)').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
                var chat_tbl_row = chatList.find('li:not(.no-results):visible').length,
                    contact_tbl_row = contactList.find('li:not(.no-results):visible').length;

                // check if chat row available
                if (chat_tbl_row == 0) {
                    chatList.find('.no-results').addClass('show');
                } else {
                    if (chatList.find('.no-results').hasClass('show')) {
                        chatList.find('.no-results').removeClass('show');
                    }
                }

                // check if contact row available
                if (contact_tbl_row == 0) {
                    contactList.find('.no-results').addClass('show');
                } else {
                    if (contactList.find('.no-results').hasClass('show')) {
                        contactList.find('.no-results').removeClass('show');
                    }
                }
            } else {
                // If filter box is empty
                chatsUserList.find('li').show();
                if (chatUsersListWrapper.find('.no-results').hasClass('show')) {
                    chatUsersListWrapper.find('.no-results').removeClass('show');
                }
            }
        });
    }

    if (speechToText.length) {
        // Speech To Text
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        if (SpeechRecognition !== undefined && SpeechRecognition !== null) {
            var recognition = new SpeechRecognition(),
                listening = false;
            speechToText.on('click', function () {
                var $this = $(this);
                recognition.onspeechstart = function () {
                    listening = true;
                };
                if (listening === false) {
                    recognition.start();
                }
                recognition.onerror = function (event) {
                    listening = false;
                };
                recognition.onresult = function (event) {
                    $this.closest('.form-send-message').find('.message').val(event.results[0][0].transcript);
                };
                recognition.onspeechend = function (event) {
                    listening = false;
                    recognition.stop();
                };
            });
        }
    }
});

// Window Resize
$(window).on('resize', function () {
    if ($(window).width() > 992) {
        if ($('.chat-application .body-content-overlay').hasClass('show')) {
            $('.app-content .sidebar-left').removeClass('show');
            $('.chat-application .body-content-overlay').removeClass('show');
        }
    }

    // Chat sidebar toggle
    if ($(window).width() < 991) {
        if (
            !$('.chat-application .chat-profile-sidebar').hasClass('show') ||
            !$('.chat-application .sidebar-content').hasClass('show')
        ) {
            $('.sidebar-content').removeClass('show');
            $('.body-content-overlay').removeClass('show');
        }
    }
}); 

// Add message to chat - function call on form submit
    var newLeftMessage = false;
function enterChat(source) {
    var message = $('.message').val();
    var chatSessionID = 'akxyV29RWFZzVkRmM1hEY0J4aDBxU1VOZ3g3UzBlbTA5cTI0d3dlc3F0UGVGdW82WmZVVWJVVEhXdz09';
    if (/\S/.test(message)) {
        if (!$('.chat')[0]) {
            // -- Testing -- console.log("first");
            $('.chats').html('<div class="chat"><div class="chat-avatar"><span class="avatar box-shadow-1 cursor-pointer"><img src="../../../app-assets/images/portrait/small/avatar-s-11.jpg" alt="avatar" height="36" width="36" /></span></div><div class="chat-body"></div>');
            var html = '<div class="chat-content">' + '<p>' + message + '</p>' + '</div>';
            $('.chat:last-child .chat-body').append(html);
            
            //sendSingleChatMessage(chatSessionID);
            
            $('.message').val('');
            $('.user-chats').scrollTop($('.user-chats > .chats').height());
        } else {
            // -- Testing -- console.log("second");
            var html = '<div class="chat-content">' + '<p>' + message + '</p>' + '</div>';
            $('.chat:last-child .chat-body').append(html);
            $('.message').val('');
            $('.user-chats').scrollTop($('.user-chats > .chats').height());
        }
        if(!$('.chat-left')[0]) {
             var whatever = '<div class="chat chat-left"><div class="chat-avatar"><span class="avatar box-shadow-1 cursor-pointer"><img src="../../../app-assets/images/portrait/small/avatar-s-11.jpg" alt="avatar" height="36" width="36" /></span></div><div class="chat-body"></div>';
            $('.chat:last-child').append(whatever);
            var htmL = '<div class="chat-content"><p>FUN, works?</p></div>'
            $('.chat-left:last-child .chat-body').append(htmL);
        } else {
            var htmL = '<div class="chat-content"><p>FUN, works?</p></div>'
            $('.chat-left:last-child .chat-body').append(htmL); 
        }
    }
    

    // Send messages to members of the chat session
    function sendSingleChatMessage(chatSessionId) {
        var baseURI = "https://api-c32.nice-incontact.com/incontactapi/";
        var accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyOjExZTgyODg2LWUyODQtNzNhMC05ODAyLTAyNDJhYzExMDAwMiIsInJvbGUiOnsibGVnYWN5SWQiOiJBZG1pbmlzdHJhdG9yIiwic2Vjb25kYXJ5Um9sZXMiOltdLCJpZCI6ImIwMmJjMGQzLThlNGQtMTFlNy05OThiLTAyMzA5ZjI1ZGJmNCIsImxhc3RVcGRhdGVUaW1lIjoxNjA5ODY0NjUyMDAwfSwiaWNBZ2VudElkIjoiNjczMzE5OCIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLm5pY2UtaW5jb250YWN0LmNvbSIsImdpdmVuX25hbWUiOiJKb3NodWEiLCJhdWQiOiJBY2Nlc3NLZXlzQE5JQ0VpbkNvbnRhY3QgSW5jLiIsImljU1BJZCI6IjEwMTIyIiwiaWNCVUlkIjo0NTk2NjE5LCJuYW1lIjoiamdAbmljZWluY29udGFjdC5jb20iLCJ0ZW5hbnRJZCI6IjExZTc4ZTRkLWFmN2MtM2JiMC05ZWY5LTAyNDJhYzExMDAwMyIsImV4cCI6MTYxMTUxMjk1NCwiaWF0IjoxNjExNTA5MzU0LCJmYW1pbHlfbmFtZSI6IkdpYnNvbiIsInRlbmFudCI6IlNFX0RFTU9fQzMyIiwidmlld3MiOnt9LCJpY0NsdXN0ZXJJZCI6IkMzMiJ9.A84gtZsv6Fqa0cN5u9u1VZt9nieoUtDHXfxRhsMfFEsWrBwXO43-QRvrDWJIw94QCD2tWVztbVrQQ6BkXepGDUQWpVpiuMR_AXeYm996NCBwPopLBDXv4gl8mWyMYtZk5gXAv7A8ClL3ar6F9xmUL3cTuaDTCppfnZ61LoheE6o";
        var sendSingleChatMessagePayload = {
            'label': 'Test Label',
            'message': message,
            'chatTarget': 'string'
        }
        $.ajax({
            //The baseURI variable is created by the result.base_server_base_uri
            //which is returned when getting a token and should be used to create the URL base
            'url': baseURI + 'services/v20.0/contacts/chats/' + chatSessionId + '/send-text',
            'type': 'POST',
            'headers': {
                //Use access_token previously retrieved from inContact token service
                'Authorization': 'bearer ' + accessToken,
                'content-Type': 'application/json'
            },
            'data': JSON.stringify(sendSingleChatMessagePayload),
            'success': function (result) {
                //Process success actions
                console.log("Success: " + result);
                return result;
            },
            'error': function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log("Error: " + errorThrown);
                return false;
            }
        });
    }
}



/*
<div class="chat"><div class="chat-avatar"><span class="avatar box-shadow-1 cursor-pointer"> <img src="../../../app-assets/images/portrait/small/avatar-s-11.jpg" alt="avatar" height="36" width="36"></span></div>
*/
