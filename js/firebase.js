document.addEventListener('DOMContentLoaded', function () {
    // ---------- configure firebase ---------- //
    const firebaseConfig = {
        apiKey: "AIzaSyCwW_NE5C3x4vocYXTb0wgmEhVnmQhgSdE",
        authDomain: "prototype-wedding-invitation.firebaseapp.com",
        databaseURL: "https://prototype-wedding-invitation-default-rtdb.firebaseio.com",
        projectId: "prototype-wedding-invitation",
        storageBucket: "prototype-wedding-invitation.appspot.com",
        messagingSenderId: "430435752256",
        appId: "1:430435752256:web:1caecd7a22dd74f88d82a5",
        measurementId: "G-000KFZSM63"
    }

    // ---------- Firebase Initialize ---------- //
    firebase.initializeApp(firebaseConfig);

    // ---------- get realtime database for reference ---------- // 
    const database = firebase.database();

    // ---------- add RSVP ---------- //
    function addRSVP(e) {
        e.preventDefault();

        const guestName = document.getElementById('guest-name').value;
        const guestAttend = document.getElementById('guest-attend').value;
        const guestMessage = document.getElementById('guest-message').value;

        // Buat referensi ke lokasi data di database
        var rsvpRef = database.ref('rsvp');

        // Push data baru ke database
        rsvpRef.push({
            nama: guestName,
            kehadiran: guestAttend,
            komentar: guestMessage
        }).then(function () {
            console.log("RSVP berhasil ditambahkan");
            document.getElementById('rsvp-form').reset();
            guestName.value = '';
            guestAttend.value = '';
            guestMessage.value = '';
        }).catch(function (error) {
            console.error("Error menambahkan RSVP: ", error);
        })
    }

    // ---------- show RSVP ---------- //
    function showRSVP() {
        // svg
        const svgCheck = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
        </svg>
        `
        const svgCross = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
        </svg>
        `

        // get data from realtime database
        const guestList = document.getElementById('guest-list');
        var rsvpRef = database.ref('rsvp');

        rsvpRef.on('value', function (snapshot) {
            guestList.innerHTML = '';
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                // create div element for guest-card
                var guestCard = document.createElement('div');
                guestCard.className = 'guest-card';
                // create p element for guest-card-name
                var guestCardName = document.createElement('div');
                guestCardName.className = 'guest-card-name';

                // create attendace data with icon
                if (data.kehadiran === 'hadir') {
                    guestCardName.innerHTML = `<p>${data.nama}</p>` + svgCheck;
                } else if (data.kehadiran === 'tidak hadir') {
                    guestCardName.innerHTML = `<p>${data.nama}</p>` + svgCross;
                }

                // create p element for guest-card-message
                guestCardMessage = document.createElement('p');
                guestCardMessage.className = 'guest-card-message';
                guestCardMessage.innerHTML = data.komentar;

                //insert elements to guestCard 
                guestCard.appendChild(guestCardName);
                guestCard.appendChild(guestCardMessage);
                guestList.appendChild(guestCard);
            })
        })
    }

    // showing RSVP data
    document.getElementById('rsvp-form').addEventListener('submit', addRSVP);
    showRSVP();
})