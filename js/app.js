// get URL Paramter for pronoun and name
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';
    const inviteTo = urlParams.get('to') || '';

    const userTitle = document.getElementById('user-title');
    userTitle.innerHTML = pronoun;

    const userName = document.getElementById('user-name');
    userName.innerHTML = inviteTo;

    // give name to input RSVP from URL name
    document.getElementById('guest-name').value = inviteTo;

    // hamburger menu
    const hamburgerToggle = document.getElementById('hamburger-menu');
    const navbarItem = document.getElementById('navbar-list-item');

    // show navbar item when hamburger menu is clicked
    hamburgerToggle.addEventListener('click', function () {
        navbarItem.classList.toggle('hidden');
        navbarItem.classList.toggle('flex');
    })

    // hide hamburger menu when any navbar item is clicked
    document.querySelectorAll('#navbar-list-item').forEach(function (item) {
        item.addEventListener('click', function () {
            navbarItem.classList.toggle('hidden');
            navbarItem.classList.toggle('flex');
        })
    })

    // disable scroll and enable scroll
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

    if (!localStorage.getItem('opened')) {
        disableScroll();
    }
    invitationBtn.addEventListener('click', enableScroll);

    // countdown
    const countdownDate = new Date('NOV 20, 2024 00:00:00').getTime(); //target date in ms
    // set interval
    const countdownStart = setInterval(function () {
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

    // play and pause music
    const audioContainer = document.getElementById('audio-container');
    const audioPlayIcon = document.getElementById('audio-icon-play');
    const audioPauseIcon = document.getElementById('audio-icon-pause');
    const song = document.getElementById('song');

    song.volume = 0.5;

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            audioContainer.style.display = 'block';
            hamburgerToggle.style.display = 'block';
        }
    })

    invitationBtn.addEventListener('click', function () {
        if (song.paused) {
            audioPlayIcon.style.display = 'none';
            audioPauseIcon.style.display = 'flex';
            song.play();
        }
    })

    audioContainer.addEventListener('click', function () {
        if (song.paused) {
            audioPlayIcon.style.display = 'none';
            audioPauseIcon.style.display = 'flex';
            song.play();
        } else {
            audioPauseIcon.style.display = 'none';
            audioPlayIcon.style.display = 'flex';
            song.pause();
        }
    })
})