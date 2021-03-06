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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});


//"contact me" button click
const contactBtn = document.querySelector('.home_contact');
contactBtn.addEventListener('click', () => {
    // const clickBtn = document.querySelector('#contact');
    // clickBtn.scrollIntoView({behavior:"smooth"});
    scrollIntoView('#contact');
});

// When scrolling down the window, the home screen becomes transparent
const home = document.querySelector(".home__container");
const homeScreen = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    //console.log(1 - window.scrollY / homeScreen);
    home.style.opacity = (1 - window.scrollY / homeScreen);
});

//Up Button
const upBtn = document.querySelector('.up__button');
upBtn.addEventListener('click', () => {
    scrollIntoView('#home');
});

document.addEventListener('scroll', () => {
      if(window.scrollY > homeScreen / 2){
        upBtn.classList.add('visible')
     } else {
        upBtn.classList.remove('visible')
     };
});

// Projects
const workBtn = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtn.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }
    // Remove selection from th previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
    projects.forEach((project) => {
        // console.log(project.dataset.type)
        if(filter == '*' || filter == project.dataset.type) {
            project.classList.remove('invisible');
        } else {
            project.classList.add('invisible');
        }
    });
        projectContainer.classList.remove('anim-out');
    }, 300);
});

// 1.?????? ?????? ???????????? ?????? ??????????????? ????????????
// 2.IntersectionObserver??? ???????????? ?????? ???????????? ????????????.
// 3.???????????? ????????? ???????????? ?????? ???????????? ????????? ?????????.

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
 ];


 const sections = sectionIds.map(id => document.querySelector(id));
 const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
//  console.log(sections);
// console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector){
    const clickBtn = document.querySelector(selector);
    clickBtn.scrollIntoView({behavior:"smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
};

const observerOptions = {
    root:null,
    rootMargin: '0px',
    threshold: 0.3,
} ;
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // console.log(entry.target);
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            // console.log(entry);
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index, entry.target.id);
            // ???????????? ????????? ????????? ???????????? ?????????
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scroll === 0){
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight === document.body.clientHeight)){
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});