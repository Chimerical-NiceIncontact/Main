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
                // Add User Information
                $('.user-name').html(data.Name);
                $('.user-status').html(data.Role);
                $('.user-avatar').attr('src', data.Avatar.avatarURL);
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
    }
});
