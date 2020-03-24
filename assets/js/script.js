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

// Page Wise Functions
function IndexPage() {
// Slick Slider Function
		$('.banner-slider').slick({
			dots: false,    
			arrows : true,
			autoplay : true,
			infinite :true,
			autoplaySpeed: 2000
		});

	// LightBox Function 
	// Get Elements Required for LightBox
	var Posts = document.querySelectorAll('.portfolio');
	var Lightbox = document.querySelector('.portfolio-lightbox');
	var insideLi = document.querySelector('.lightbox');
	var imageinsideLightbox = document.querySelector('.portfolio-lightbox img');
	var close = document.createElement('span');

	// LightBox Function started
	function LightBox(html,Posts,Lightbox,imageinsideLightbox,close) {
		// Hide LightBox At First
		var postarray = Array.from(Posts);
		// Append Close Button to the LightBox Dynamically
		Lightbox.appendChild(close);
		close.classList.add('close');
		// Add click function to every post
		for (var post in postarray) {
			postarray[post].addEventListener('click',openlightbox);
		}
		// openlightbox Function started
		function openlightbox(){
			// Get Current image/Post & source on click
			var currentImg = this.children[0].children[0];
			var url = currentImg.src; 
			// stop background scroll
			html.classList.add('no-scroll');
			// make Lightbox appear
			Lightbox.classList.add('show');
			insideLi.classList.add('show');
			// add current image path to lightbox image 
			imageinsideLightbox.setAttribute('src',url);
		};
		// Close LightBox Function
		function closeLightbox(){
			Lightbox.classList.remove('show');
			insideLi.classList.remove('show');
			html.classList.remove('no-scroll');
		};
		// Calling close Lightbox function on close button click 
		close.addEventListener('click',closeLightbox);
		// Calling close Lightbox function on Background of lightbox click
		Lightbox.addEventListener('click',function(e){
			if (e.target.classList.contains("portfolio-lightbox")) {
				Lightbox.classList.remove('show');
				insideLi.classList.remove('show');
				html.classList.remove('no-scroll');
			}
		});
	}
	// Calling LightBox Function
	LightBox(html,Posts,Lightbox,imageinsideLightbox,close);

	// Form validation Function Started
	// Selecting Every Input field
	var inputs = Array.from(document.querySelectorAll('.form-group input'));
	inputs.push(document.querySelector('#message'));
	var selectInput = document.querySelector('#enquiries');
	var getintouchform = document.querySelector('form');

	// select-option input validation 
	selectInput.addEventListener('click',function(){
		if(selectInput.selectedIndex === "") {
			selectInput.nextElementSibling.classList = "error visible";
			errors(selectInput,selectInput.nextElementSibling);
		} else if(selectInput.selectedIndex === 0) {
			selectInput.nextElementSibling.classList = "success visible";
		} else {
			selectInput.nextElementSibling.classList = "success visible";
		}
	})
	var checkbox = document.querySelector('#TermsandCondition');;
	var send = document.querySelector('#submit');
	// making send button disable at first
	send.disabled = true;
	send.classList.add('opacity');
	// Regex for every input fields
	var Regex = [
		fullNameRegex = /^([a-zA-Z]){0,20}$/,
		emailRegex = /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/,
		companyRegex = /([0-9a-zA-Z]){0,50}$/,
		messageRegex = /([0-9a-zA-Z]){0,50}$/
	];
	// Send Button assigned a click Function
	send.addEventListener('click', function (e) {
		e.preventDefault();
		validateOnSubmit(e);
	});
	// Keyup event on each input to check if it is valid
	inputs.forEach(function (input) {
		var index = inputs.indexOf(input);
			input.addEventListener("keyup", function () {
				validate(Regex[index], this);
			});
	});
	// Defiination of Validate Function on Keyup
	function validate(RegularExpression, input) {
		if (input.value === "") {
			input.nextElementSibling.classList = "error visible";
			errors(input, input.nextElementSibling);
		} else if (RegularExpression.test(input.value)) {
			input.nextElementSibling.classList = "success visible";
		} else {
			input.nextElementSibling.classList = "error visible";
				errors(input, input.nextElementSibling);
		}
	}
	// Declaration of Reset Function make whole form reset
	function resetIt(e) {
		var helperSpans = document.querySelectorAll('form span');
		helperSpans.forEach(function (span) {
			var isVisible =  span.classList.contains("visible");
			if (isVisible) {
				span.classList = "error";
				span.innerText = "";
			}
		});
	};
	// Error function Declaration for every set of errors
	function errors(input, span) {
		var selectInput =document.querySelector('#enquiries');
		if (input.value == "") {
			span.innerText = "Please fill the empty field!";
			return;   
		}
		switch (input.id) {
			case "fullname":
				span.innerText = "Must Contains Only Alphabets.";
				break;
			case "email":
				span.innerText = "Entered Email is Invalid.";
				break;
			default:
				break;
		}
		if(input.id === selectInput.id) {
			span.innerText = "Please Select one Option!";			
		}	
	}
	// function for checkbox validation 
	checkbox.addEventListener('click',ischecked);
	function ischecked() {
		if(checkbox.checked === true) {
			var helperSpans = document.querySelectorAll('form span');
			for(var index = 0; index < helperSpans.length; index++) {
				var SomeErrorify = false;
				var AllCorrected = helperSpans[index].classList.contains('success');
					if(AllCorrected === true) {
						allCorrect = true;
					} else {
						SomeErrorify = true;
					}
					if(SomeErrorify == true) {
						allCorrect = false;
						break;
					}
			}
			if(allCorrect === true) {
				send.disabled = false;
					send.classList.remove('opacity');
			}
		} else {
			send.disabled = true;
			send.classList.add('opacity');
		}
	}
	// Defiination of Validate Function on submitButton
	function validateOnSubmit(e) {
  var allEmpty = false;
  inputs.forEach(function (input) {
    if (input.value == "") {
      allEmpty = true;
    };
  });
  // If every fields are empty show error
  if (allEmpty) {
    e.preventDefault();
    inputs.forEach(function (input) {
      if (input.value == "") {
				input.nextElementSibling.classList = "error visible";
				errors(input, input.nextElementSibling);
      };
    });
	}
  var helperSpans = document.querySelectorAll('form span');
  // If every fields are invalid show errors message
  var allCorrect = false;

  for(var index = 0; index < helperSpans.length; index++) {
    var SomeErrorify = false;
    var AllCorrected = helperSpans[index].classList.contains('success');
      if(AllCorrected === true) {
        allCorrect = true;
      } else {
        SomeErrorify = true;
      }
      if(SomeErrorify == true) {
        allCorrect = false;
        break;
      }
  }
  // If every fields are correct Customalert success message
  if (allCorrect == true) {
    getintouchform.reset();
		CustomAlertSuccess();
		send.disabled = true;
		send.classList.add('opacity');
  }
  function CustomAlertSuccess() {
    var Customalert = document.querySelector('.get-in-touch .customAlert');
    var ok = document.querySelector('.customAlert .confirm-button');
    var message = document.querySelector('.customAlert .message');
    message.innerText = "Your Form Has Submitted Successfully!";
    resetIt(e);
    Customalert.classList.remove('hidden');
    Customalert.classList.add('fadein');
    function fadeAway() {
      Customalert.classList.add('hidden');
      Customalert.classList.remove('fadein');
    }
    ok.addEventListener('click',fadeAway);
    setTimeout(function() {
      fadeAway();
    }, 4000);
  }
 }
}

function JoinUsPage() {
	// Getting Dom Elements according to the Functionality
	var i = 0;
	var selectedOption = document.querySelector('#job-categories');
	var jobs = document.querySelectorAll('.job-cat');
	var Category = document.querySelectorAll('.job');
// select Option filtered Tab Function started
	selectedOption.addEventListener('change',selectFilter);
	function selectFilter() {
		jobs.forEach(function(job) {
			if (job.id === selectedOption.value || selectedOption.value === "All Job Category" ) {
				Category[i].classList.remove('hide');
				Category[i].classList.add('show');
			} else {
				Category[i].classList.remove('show');
				Category[i].classList.add('hide');
			}
			i++;
		})
		i = 0;
	};
}

function OurWorkPage() {
	// Get Tab heading links and tab content images
	var tabHead = document.querySelectorAll(".portfolios-links li");
	var tabcontent = document.querySelectorAll(".portfolio-images li");
	//Filtered Tab Function Started
	function FilteredTabs(tabHead,tabcontent) {
		var tabLinks = Array.from(tabHead);
		//Assign click function to every tabLink 
		tabLinks.forEach(function(e) {
			e.addEventListener("click", Filter);
		});
		//Make first tab Link active at start
		function firstActive() {
			for (var link in tabLinks) {
				if(tabLinks[link] === tabLinks[0])
					MakeItActive(tabLinks[link]);
			}
		}
		firstActive();
	// Tabs Filtering Function started
		function Filter(evt) {
			var currentTab = evt.currentTarget;
			// remove active from all tab links
			for( tab in tabLinks) {
				tabLinks[tab].children[0].classList.contains('active');
				tabLinks[tab].children[0].classList.remove('active');    
			}
			// Make clicked tab only active
			currentTab.children[0].classList.add('active');
			var currentClasses = currentTab.classList;
			var currentClass  = currentClasses[1];
			// check weather the the tab links class matches with the images class
			// if matches make it visible accordingly
			tabcontent.forEach(function(image){
				if(currentClass === "All") {
					image.classList.remove("hide");
					image.classList.add('opaque');
				} else if(currentClass === image.classList[1]) {
					image.classList.remove("hide");
					image.classList.add('opaque');
				} else {
					image.classList.remove('opaque');
					image.classList.add("hide");  
				}
			})
		}
	// Make Selected tabLink Active on event fire
		function MakeItActive(currentTabLink) {
			currentTabLink.children[0].className += " active";
		}
	}
	// calling filteredTab Function
	FilteredTabs(tabHead,tabcontent);
}



















