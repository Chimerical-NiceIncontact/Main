 $.holdReady(true);
 // Firebase Collections
 var user = firebase.auth().currentUser;
 var db = firebase.firestore();
 const userDocRef = db.collection('users');

 userDocRef.get().then(function (querySnapshot) {
     querySnapshot.forEach(function (doc) {
         //console.log(doc.id, " => ", doc.data())
         if (doc.data().Status == "Active") {
             var chipColor = "success";
         } else if (doc.data().Status == "Inactive") {
             var chipColor = "warning";
         } else if (doc.data().Status == "Test") {
             var chipColor = "cxone";
         }
         $('.table-user-list')[0].innerHTML += '<tr class="' + doc.id + '"><td><img src="../../../app-assets/images/icons/user.svg" class="mr-75" height="20" width="20" alt="Angular" /><span class="font-weight-bold">' + doc.data().Name + '</span></td><td>' + doc.data().Email + '</td><td>' + doc.data().Role + '</td><td><span class="badge badge-pill badge-light-' + chipColor + ' mr-1">' + doc.data().Status + '</span></td><td><div class="dropdown"><button type="button" class="btn btn-sm dropdown-toggle hide-arrow edit-buttons" data-toggle="dropdown"><i data-feather="more-vertical"></i></button><div class="dropdown-menu"><a class="dropdown-item dropdown-edit"><i data-feather="edit-2" class="mr-50"></i><span>Edit</span></a><a class="dropdown-item" href="javascript:void(0);"><i data-feather="trash" class="mr-50"></i><span>Delete</span></a></div></div></td></tr>';
     })
     feather.replace();
     $.holdReady(false);
 })


 function editPop() {
     console.log($(this));
     $('#user-modal').modal('show');
 }

 $(document).ready(function () {
     "use strict"

     var newUserCheck = false;

     $("form.add-new-record").on("change", ":input", function (e) {
         //':input' selector get all form fields even textarea, input, or select
         window[$(this).attr("name")] = true;
     });

     $('.user-submit').on('click', function (e) {
         $('#acceptance-button').modal('show');
         $('#user-modal').modal('hide');
     })

     firebase.auth().onAuthStateChanged(function (user) {
         if (user) {
             db.collection("users").doc(user.uid).get().then(function (doc) {
                 var data = doc.data();
                 if (data.Role != "Administrator") {
                     $('.edit-buttons').attr("disabled", true);
                 }
             });
         }
     });

     $('.dt-new-user').on("click", function (e) {
         e.stopPropagation();
         $('#exampleModalLabel').text("New User");
         // Fill in relevant info
         $('.dt-full-name').val("");
         $('.dt-username').val("");
         $('.dt-email').val("");
         $('.dt-phone').val("");
         $('.dt-role').val("");
         // Fill Agent Ids
         $('.dt-c35').val("");
         $('.dt-c32').val("");
         $('.dt-b32').val("");
         $('.dt-b2').val("");
         $('#user-modal').modal('show');

         function createNewUser() {
             // Fill in relevant info
             $('.dt-full-name').val(data.Name);
             $('.dt-username').val(data.Username);
             $('.dt-email').val(data.Email);
             $('.dt-phone').val(data.Phone);
             $('.dt-role').val(data.Role);
             // Fill Agent Ids
             $('.dt-c35').val(data.AgentID.C35);
             $('.dt-c32').val(data.AgentID.C32);
             $('.dt-b32').val(data.AgentID.B32);
             $('.dt-b2').val(data.AgentID.B2);

             // Check status for switch
             if (data.Status == "Active") {
                 console.log(data.Status);
                 $('#customSwitch100').attr('checked', 'checked');
             } else if (data.Status == "Inactive") {
                 console.log(data.Status);
                 $('#customSwitch100').removeAttr('checked');
             }

             // Changed checked att when switch is pressed
             $('#customSwitch100').click(function () {
                 var switchRefCheck = document.getElementById("customSwitch100").hasAttribute("checked");
                 if (switchRefCheck == true) {
                     $('#customSwitch100').removeAttr('checked');
                     customStatus = "Inactive";
                     //console.log(customStatus);
                 } else if (switchRefCheck == false) {
                     $('#customSwitch100').attr('checked', 'checked');
                     customStatus = "Active";
                     //console.log(customStatus);
                 }
             });

             // Upload stuff to db
             $(".btn-accept").click(function () {
                 // User Info
                 var changedName = $('.dt-full-name').val();
                 var changedEmail = $('.dt-email').val();
                 var changedPhone = $('.dt-phone').val();
                 var changedRole = $('.dt-role').val();
                 var changedUsername = $('.dt-username').val();
                 var changedStatus = customStatus;
                 console.log(changedEmail);

                 // Agent ID
                 var changedAgentC35 = $('.dt-c35').val();
                 var changedAgentC32 = $('.dt-c32').val();
                 var changedAgentB32 = $('.dt-b32').val();
                 var changedAgentB2 = $('.dt-b2').val();

                 // Create Post Data Object
                 var postData = {
                     Name: changedName ? changedName : null,
                     Email: changedEmail ? changedEmail : null,
                     Phone: changedPhone ? changedPhone : null,
                     Role: changedRole ? changedRole : null,
                     Status: changedStatus ? changedStatus : data.Status,
                     Username: changedUsername ? changedUsername : null,
                     AgentID: {
                         C35: changedAgentC35 ? changedAgentC35 : null,
                         C32: changedAgentC32 ? changedAgentC32 : null,
                         B32: changedAgentB32 ? changedAgentB32 : null,
                         B2: changedAgentB2 ? changedAgentB2 : null
                     }
                 };

                 // POST


                 userDocRef.doc(className).update(postData).then(function () {
                     console.log("Document successfully updated!");
                     //console.log(postData);
                     location.reload();
                 }).catch(function (error) {
                     // The document probably doesnt exists
                     console.error("Error updating document: ", error);
                 });
             });

         }
         newUserCheck = true;
     });


     $('.dropdown-edit').on("click", function (e) {
         e.stopPropagation();
         var customStatus = "";
         var className = $(this).closest('td').parent('tr').attr("class");
         db.collection("users").doc(className).get().then(function (doc) {
             var data = doc.data();
             $('#exampleModalLabel').text("Edit User");
             // Fill in relevant info
             $('.dt-full-name').val(data.Name);
             $('.dt-username').val(data.Username);
             $('.dt-email').val(data.Email);
             $('.dt-phone').val(data.Phone);
             $('.dt-role').val(data.Role);
             // Fill Agent Ids
             $('.dt-c35').val(data.AgentID.C35);
             $('.dt-c32').val(data.AgentID.C32);
             $('.dt-b32').val(data.AgentID.B32);
             $('.dt-b2').val(data.AgentID.B2);

             // Check status for switch
             if (data.Status == "Active") {
                 console.log(data.Status);
                 $('#customSwitch100').attr('checked', 'checked');
             } else if (data.Status == "Inactive") {
                 console.log(data.Status);
                 $('#customSwitch100').removeAttr('checked');
             }

             $('#user-modal').modal('show');

             // Changed checked att when switch is pressed
             $('#customSwitch100').click(function () {
                 var switchRefCheck = document.getElementById("customSwitch100").hasAttribute("checked");
                 if (switchRefCheck == true) {
                     $('#customSwitch100').removeAttr('checked');
                     customStatus = "Inactive";
                     //console.log(customStatus);
                 } else if (switchRefCheck == false) {
                     $('#customSwitch100').attr('checked', 'checked');
                     customStatus = "Active";
                     //console.log(customStatus);
                 }
             });



             // Upload stuff to db
             $(".btn-accept").click(function () {
                 // User Info
                 var changedName = $('.dt-full-name').val();
                 var changedEmail = $('.dt-email').val();
                 var changedPhone = $('.dt-phone').val();
                 var changedRole = $('.dt-role').val();
                 var changedUsername = $('.dt-username').val();
                 var changedStatus = customStatus;
                 console.log(changedEmail);

                 // Agent ID
                 var changedAgentC35 = $('.dt-c35').val();
                 var changedAgentC32 = $('.dt-c32').val();
                 var changedAgentB32 = $('.dt-b32').val();
                 var changedAgentB2 = $('.dt-b2').val();

                 // Create Post Data Object
                 var postData = {
                     Name: changedName ? changedName : null,
                     Email: changedEmail ? changedEmail : null,
                     Phone: changedPhone ? changedPhone : null,
                     Role: changedRole ? changedRole : null,
                     Status: changedStatus ? changedStatus : data.Status,
                     Username: changedUsername ? changedUsername : null,
                     AgentID: {
                         C35: changedAgentC35 ? changedAgentC35 : null,
                         C32: changedAgentC32 ? changedAgentC32 : null,
                         B32: changedAgentB32 ? changedAgentB32 : null,
                         B2: changedAgentB2 ? changedAgentB2 : null
                     }
                 };

                 // POST


                 userDocRef.doc(className).update(postData).then(function () {
                     console.log("Document successfully updated!");
                     //console.log(postData);
                     location.reload();
                 }).catch(function (error) {
                     // The document probably doesnt exists
                     console.error("Error updating document: ", error);
                 });
             });
         })
     });



     // listen for auth status changes
     auth.onAuthStateChanged(user => {
         if (user) {
             db.collection("users").doc(user.uid).get().then(function (doc) {
                 if (doc.exists) {
                     var data = doc.data();
                     // Set User's info
                     $('.user-name')[0].innerHTML = data.Name;
                     $('.user-status')[0].innerHTML = data.Role;
                     $('.round').attr('src', data.Avatar.avatarURL);

                 }
             });
         }
     });
 });
