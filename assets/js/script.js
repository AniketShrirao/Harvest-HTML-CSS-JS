/* Author: Aniket */

// Common DOM selection
var Main = document.querySelector('main');
var html = document.querySelector('html');

// Common Function
var hamburger = document.querySelector('.hamburger');

// Adding click event to hamburger
hamburger.addEventListener('click',function(){
	var navigationUl = document.querySelector('nav ul');
	var headerSocialIcons = document.querySelector('.header-social-icons');
	// making Navigation appear and disappear on click event
	// and toggling scroll behaviour of background accordingly 
	if(navigationUl.classList.contains('nav-active')) {
		navigationUl.classList.remove('nav-active');
		hamburger.classList.remove('hamburger-active');
		headerSocialIcons.classList.remove('social-active');
		html.classList.remove('no-scroll');
	} else {
		navigationUl.classList.add('nav-active');
		hamburger.classList.add('hamburger-active');
		headerSocialIcons.classList.add('social-active');
		html.classList.add('no-scroll');
	}
})

/*Check weather the page's main class 
and call that page's function accordingly*/
if(Main.classList.contains('Home-main')) {
    IndexPage();
} else if(Main.classList.contains('join-us-main')) {
   JoinUsPage(); 
} else if(Main.classList.contains('our-work-main')) {
    OurWorkPage();
}

function IndexPage() {

}

function JoinUsPage() {

}

function OurWorkPage() {
    
}





















