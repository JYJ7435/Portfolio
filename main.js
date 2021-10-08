'use strict'

//Make navbar transparent
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}`);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// navbar menu click
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null){
        return;
    }
    // console.log(event.target.dataset.link);
    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView({behavior:"smooth"});
    scrollIntoView(link);
});

//"contact me" button click
const contactBtn = document.querySelector('.home_contact');
contactBtn.addEventListener('click', () => {
    // const clickBtn = document.querySelector('#contact');
    // clickBtn.scrollIntoView({behavior:"smooth"});
    scrollIntoView('#contact');
});

function scrollIntoView(selector){
    const clickBtn = document.querySelector(selector);
    clickBtn.scrollIntoView({behavior:"smooth"});
}

// When scrolling down the window, the home screen becomes transparent
const home = document.querySelector(".home__container");
const homeScreen = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    //console.log(1 - window.scrollY / homeScreen);
    home.style.opacity = (1 - window.scrollY / homeScreen);

});