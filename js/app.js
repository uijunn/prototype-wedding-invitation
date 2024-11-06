document.addEventListener('DOMContentLoaded', function () {
    // ---------- get URL Paramter for pronoun and name ---------- //
    const urlParams = new URLSearchParams(window.location.search);
    const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';
    const inviteTo = urlParams.get('to') || '';
    const userTitle = document.getElementById('user-title');
    userTitle.innerHTML = pronoun;
    const userName = document.getElementById('user-name');
    userName.innerHTML = inviteTo;

    // ---------- give name to input RSVP from URL name ---------- //
    document.getElementById('guest-name').value = inviteTo;

    // ---------- hamburger menu ---------- //
    const hamburgerToggle = document.getElementById('hamburger-menu');
    const navbarItem = document.getElementById('navbar-list-item');

    // show navbar item when hamburger menu is clicked
    hamburgerToggle.addEventListener('click', function () {
        navbarItem.classList.toggle('appear');
    })

    // hide navbar item when any navbar item is clicked
    document.querySelectorAll('#navbar-list-item').forEach(function (item) {
        item.addEventListener('click', function () {
            navbarItem.classList.toggle('appear');
        })
    })

    // ---------- disable scroll and enable scroll ---------- //
    const htmlElement = document.querySelector('html');
    const invitationBtn = document.getElementById('invite-btn');

    // Function to disable scrolling
    function disableScroll() {
        // Get the current page scroll position
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        let scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // If any scroll is attempted, set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        }
        htmlElement.classList.remove('scroll-smooth');
    }

    // function to enable scrolling
    function enableScroll() {
        window.onscroll = null;
        htmlElement.classList.add('scroll-smooth');
        try {
            localStorage.setItem('opened', 'true');
        } catch (e) {
            console.error('Tidak dapat menyimpan ke localStorage:', e);
        }
    }

    // disable scroll
    if (!localStorage.getItem('opened')) {
        disableScroll();
    }

    // enable scroll
    invitationBtn.addEventListener('click', enableScroll);

    // ---------- countdown ---------- //
    // target date in ms
    const countdownDate = new Date('NOV 20, 2024 00:00:00').getTime();

    // set interval date and classify to days, hours, minutes, and second
    setInterval(function () {
        const now = new Date().getTime(); //now date in ms
        const distance = countdownDate - now; //subcription from target to now in ms
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerHTML = days;
        document.getElementById('hours').innerHTML = hours;
        document.getElementById('minutes').innerHTML = minutes;
        document.getElementById('seconds').innerHTML = seconds;
    }, 1000)


    // ---------- copy VA button ---------- //
    const copyBtn1 = document.getElementById('copy-btn-1');
    const copyBtn2 = document.getElementById('copy-btn-2');
    const copyText1 = document.getElementById('copy-text-1');
    const copyText2 = document.getElementById('copy-text-2');
    const accNumber1 = document.getElementById('account-number-1').innerText;
    const accNumber2 = document.getElementById('account-number-2').innerText;

    // copy button 1
    copyBtn1.addEventListener('click', function () {
        navigator.clipboard.writeText(accNumber1);
        copyText1.innerText = 'Copied';

        setTimeout(function () {
            copyText1.innerText = 'Copy';
        }, 1000)
    })

    // copy button 2
    copyBtn2.addEventListener('click', function () {
        navigator.clipboard.writeText(accNumber2);
        copyText2.innerText = 'Copied';

        setTimeout(function () {
            copyText2.innerText = 'Copy';
        }, 1000)
    })

    // ---------- play and pause music ---------- //
    const audioContainer = document.getElementById('audio-container');
    const audioPlayIcon = document.getElementById('audio-icon-play');
    const audioPauseIcon = document.getElementById('audio-icon-pause');
    const song = document.getElementById('song');

    // song volume
    song.volume = 0.5; // 50%

    // show play and pause button (+ show navbar)
    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            audioContainer.style.display = 'block';
            hamburgerToggle.style.display = 'block';
        }
    })

    // play song
    invitationBtn.addEventListener('click', function () {
        if (song.paused) {
            audioPlayIcon.style.display = 'none';
            audioPauseIcon.style.display = 'block';
            song.play();
        }
    })

    // pause song
    audioContainer.addEventListener('click', function () {
        if (song.paused) {
            audioPlayIcon.style.display = 'none';
            audioPauseIcon.style.display = 'block';
            song.play();
        } else {
            audioPauseIcon.style.display = 'none';
            audioPlayIcon.style.display = 'block';
            song.pause();
        }
    })
})