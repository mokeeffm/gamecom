"use strict";
document.addEventListener("DOMContentLoaded", function() {

    $(function($) {
        // Sticky Header
        var fixed_top = $(".header-section");
        $(window).on("scroll", function() {
            if ($(window).scrollTop() > 50) {
                fixed_top.addClass("animated fadeInDown header-fixed");
            } else {
                fixed_top.removeClass("animated fadeInDown header-fixed");
            }
        });

        // Scroll Top
        var ScrollTop = $(".scrollToTop");
        $(window).on('scroll', function() {
            if ($(this).scrollTop() < 600) {
                ScrollTop.removeClass("active");
            } else {
                ScrollTop.addClass("active");
            }
        });
        $('.scrollToTop').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        // Header Dropdown Menu
        const mobileSize = window.matchMedia("(max-width: 1199px)");

        function handleMediaScreen(e) {
            if (e.matches) {
                $(".navbar-nav .sub").addClass("dropdown-menu");
                $(".navbar-nav .dropdown").removeClass("show-dropdown");
                $(".navbar-nav .sub").removeClass("sub-menu");

                $(".navbar-nav .dropdown-menu").parent("li").on('click', function(e) {
                    if (e.target.className !== "dropdown-item") {
                        $(this).find(">.dropdown-menu").toggle(300);
                        e.stopPropagation();
                    }
                });
            } else {
                $(".navbar-nav .dropdown-menu").parent("li").off("click");
                $("sub-dropdown").off("click");

                $(".navbar-nav .dropdown-menu").show();
                $(".navbar-nav .dropdown").addClass("show-dropdown");
                $(".navbar-nav .sub").addClass("sub-menu");
                $(".navbar-nav .sub").removeClass("dropdown-menu");
            }
        }
        handleMediaScreen(mobileSize);
        mobileSize.addEventListener("change", handleMediaScreen);

        // Custom Tabs
        $(".tablinks button").each(function() {
            var targetTab = $(this).closest(".singletab");
            targetTab.find(".tablinks button").each(function() {
                var navBtn = targetTab.find(".tablinks button");
                navBtn.on('click', function() {
                    navBtn.removeClass('active');
                    $(this).addClass('active');
                    var indexNum = $(this).closest("li").index();
                    var tabcontent = targetTab.find(".tabcontents .tabitem");
                    $(tabcontent).removeClass('active');
                    $(tabcontent).eq(indexNum).addClass('active');
                });
            });
        });

        // Box Style 
        const targetBtn = document.querySelectorAll('.box-style')
        if (targetBtn) {
            targetBtn.forEach((element) => {
                element.addEventListener('mousemove', (e) => {
                    const x = e.offsetX + 'px';
                    const y = e.offsetY + 'px';
                    element.style.setProperty('--x', x);
                    element.style.setProperty('--y', y);
                })
            })
        }

        // Btn Movement
        $(".box-style").each(function() {
            var btn_wrapper = $(this).closest(".btn-movement");
            btn_wrapper.find(".box-style").each(function() {
                $(btn_wrapper).on('mousemove', function(event) {
                    var mouseX = event.pageX;
                    var mouseY = event.pageY;
                    var divX = $(btn_wrapper).offset().left + $(btn_wrapper).width() / 2;
                    var divY = $(btn_wrapper).offset().top + $(btn_wrapper).height() / 2;
                    var distanceX = mouseX - divX;
                    var distanceY = mouseY - divY;
                    $(btn_wrapper).css({
                        transform: 'translate(' + distanceX / 5 + 'px, ' + distanceY / 5 + 'px)',
                        transition: 'all 0.8s'
                    });
                });
            });
        });

        // Mouse Follower
        const follower = document.querySelector(".mouse-follower .cursor-outline");
        const dot = document.querySelector(".mouse-follower .cursor-dot");
        if (follower, dot) {
            window.addEventListener("mousemove", (e) => {
                follower.animate(
                    [{
                        opacity: 1,
                        left: `${e.clientX}px`,
                        top: `${e.clientY}px`,
                        easing: "ease-in-out"
                    }], {
                        duration: 3000,
                        fill: "forwards"
                    }
                );
                dot.animate(
                    [{
                        opacity: 1,
                        left: `${e.clientX}px`,
                        top: `${e.clientY}px`,
                        easing: "ease-in-out"
                    }], {
                        duration: 1500,
                        fill: "forwards"
                    }
                );
            });
        }

        // Mouse Follower Hide Function
        $("a, button").on('mouseenter mouseleave', function() {
            $('.mouse-follower').toggleClass('hide-cursor');
        });
        $(window).on('resize', function() {
            if ($(window).width() < 1199) {
                $('.mouse-follower').addClass('hide-cursor');
            } else {
                $('.mouse-follower').removeClass('hide-cursor');
            }
        });
        if ($(window).width() < 1199) {
            $('.mouse-follower').addClass('hide-cursor');
        } else {
            $('.mouse-follower').removeClass('hide-cursor');
        }

        // Circle Text
        const text = document.querySelector(".text p");
        if (text) {
            text.innerHTML = text.innerText.split('').map(
                (char, i) =>
                `<span style="transform:rotate(${i * 10}deg)">${char}</span>`
            ).join('');
        }

        // counter Item Active Class
        var counterItem = $('.counter-section .single-box');
        $(counterItem).on('mouseenter mouseleave', function() {
            $(counterItem).removeClass('active-area');
            $(this).addClass('active-area');
        });

        // Sidebar Menu Active
        var sidebarBtn = $('.sidebar-wrapper .sidebar-close');
        var changeBtn = $('.sidebar-wrapper .sidebar-close i');
        var sidebarWrapper = $('.sidebar-wrapper');
        $(sidebarBtn).on('click', function() {
            $('.sidebar-wrapper').toggleClass('sidebar-active');
            if (sidebarWrapper.hasClass("sidebar-active")) {
                changeBtn.html("close");
				$('body').css('overflow-y', 'hidden');
            } else {
                changeBtn.html("menu_open");
				$('body').css('overflow-y', 'visible');
            }
        });

        // Sidebar menu mobile active
        $('.mobile-menu').on('click', function() {
            $('.sidebar-wrapper').toggleClass('active-mobile sidebar-active');
            $('.mobile-menu i').toggleClass('menu-active');
            if ($('.mobile-menu i').hasClass("menu-active")) {
                $('.mobile-menu i').html("close");
				$('body').css('overflow-y', 'hidden');
            } else {
                $('.mobile-menu i').html("menu_open");
				$('body').css('overflow-y', 'visible');
            }
			setMobileMenuHeight()
        });

        // Header Active
        $('.single-item .cmn-head').on('click', function() {
            $(this).parents('.single-item').toggleClass('active');
            $(this).parents('.single-item').siblings().removeClass('active');
        });

        // Cart Item Remove
        $('.nav-items-wrapper .single-box .end-area').on('click', function() {
            $(this).parents('.single-box').slideToggle();
        });

        // comments-area
        $('.comments-area .reply-btn').on('click', function() {
            $(this).siblings('.comment-form').slideToggle();
        });

        // Social Item Remove
        $('.social-hide-btn').on('click', function() {
            $(this).parents(".single-box").toggleClass('active');
            if ($('.single-box').hasClass("active")) {
                $('.active .social-hide-btn i').html("remove");
            } else {
                $('.social-hide-btn i').html("add");
            }
        });

        // Password Show Hide
        $('.show-hide-pass').on('click', function() {
            var passwordInput = $($(this).siblings(".pass-box input"));
            var icon = $(this);
            if (passwordInput.attr("type") == "password") {
                passwordInput.attr("type", "text");
                icon.html("visibility");
            } else {
                passwordInput.attr("type", "password");
                icon.html("visibility_off");
            }
        });

        // Dropdown Active Remove
        $("section, .close-btn").on('click', function() {
            $('.single-item').removeClass('active');
        });

        // Navbar Active Class 
        var curUrl = $(location).attr('href');
        var terSegments = curUrl.split("/");
        var desired_segment = terSegments[terSegments.length - 1];
        var checkLink = $('.navbar-nav a[href="' + desired_segment + '"]');
        var targetClass = checkLink.addClass('active');
        targetClass.parents(".sub-dropdown").find("button").first().addClass('active');
        targetClass.parents(".show-dropdown").find("button").first().addClass('active');

        var checkLink = $('.sidebar-content .navbar-nav a[href="' + desired_segment + '"]');
        var targetClass = checkLink.addClass('active');
        targetClass.parents(".sub-dropdown").find("button").first().addClass('active');
        targetClass.parents(".show-dropdown").find("button").first().addClass('active');

        // Input Increase
        var minVal = 1,
            maxVal = 20;
        $(".increaseQty").on('click', function() {
            var $parentElm = $(this).parents(".qtySelector");
            $(this).addClass("clicked");
            setTimeout(function() {
                $(".clicked").removeClass("clicked");
            }, 100);
            var value = $parentElm.find(".qtyValue").val();
            if (value < maxVal) {
                value++;
            }
            $parentElm.find(".qtyValue").val(value);
        });
        $(".decreaseQty").on('click', function() {
            var $parentElm = $(this).parents(".qtySelector");
            $(this).addClass("clicked");
            setTimeout(function() {
                $(".clicked").removeClass("clicked");
            }, 100);
            var value = $parentElm.find(".qtyValue").val();
            if (value > 1) {
                value--;
            }
            $parentElm.find(".qtyValue").val(value);
        });

    });

});

function setMobileMenuHeight() {
	var height = document.querySelector('nav.navbar').offsetHeight;
	document.querySelectorAll('.side-menubar, .sidebar-content').forEach((el) => {
		el.style.setProperty('height', 'calc(100vh - '+height+'px)');
		el.style.setProperty('top', height+'px');
	});
}

function onEntry(entry) {
	entry.forEach((change) => {
		if (change.isIntersecting) {
			change.target.querySelectorAll('.transitionAnim').forEach((el) => {
				if (el.classList.contains('leftFade')) { el.classList.remove('leftFade') }
				else if (el.classList.contains('rightFade')) { el.classList.remove('rightFade') }
				else if (el.classList.contains('topFade')) { el.classList.remove('topFade') }
			});
		}
	});
}

function scrollAnimationInit() {
	let options = { threshold: [0.4] },
		observer = new IntersectionObserver(onEntry, options),
		elements = document.querySelectorAll('.transitionAnim');

	for (let elm of elements) {
		observer.observe(elm.parentNode);
	}
}

function onScrollEntry(entry) {
	entry.forEach((change) => {
		if (change.isIntersecting) {
			if (change.intersectionRatio > 0.50 && change.intersectionRatio <= 1) {
				document.querySelectorAll('[data-scrolltarget].active').forEach((el) => { el.classList.remove('active'); });
				document.querySelectorAll('[data-scrolltarget="'+change.target.dataset.menutarget+'"]').forEach((el) => { el.classList.add('active'); });
			}
		}
	});
}

function menuScrollInit() {
	let options = { threshold: [0.51]},
		observer = new IntersectionObserver(onScrollEntry, options),
		elements = document.querySelectorAll('[data-menutarget]');

	for (let elm of elements) {
		observer.observe(elm);
	}
}

/* document.addEventListener("load", function(){ */
document.addEventListener("DOMContentLoaded", function(){
	var loader = document.querySelector('.preloader'), loader_blocks = [], column = [], row = [], iterator = 0;
	document.querySelectorAll('.preloader > div').forEach((el) => {
		el.querySelectorAll('.preloader-block').forEach((el2) => {
			row.push(el2);
			iterator++;
			if (iterator == 5) {
				column.push(row);
				row = [];
				iterator = 0;
			}
		});
		loader_blocks.push(column);
		column = [];
	});
	loader.classList.add('loaded');
	setTimeout(() => {
		let i = 0;
		for (let step = 4; Math.abs(step) < 5; step--) {
			i = 4 - step;
			setTimeout(() => {
				if (step >= 0) {
					for (let step2 = 0; step2 < (5 - Math.abs(step)); step2++) {
						loader_blocks.forEach((el) => {
							let trg = el[4 - step2].pop();
							trg.classList.add('block-animation');
						});
					}
				} else {
					for (let step2 = (4 - Math.abs(step)); step2 >= 0; step2--) {
						loader_blocks.forEach((el) => {
							let trg = el[step2].pop();
							trg.classList.add('block-animation');
						});
					}
				}
				i++;
			}, (i*100));
		}
		setTimeout(() => {
			loader.style.display = 'none';
			document.body.style.overflowY = 'auto';
		}, ((i-1)*100) + 1000);
	}, 300);
});

function getScalings() {

}

function hexToRgb(hex_array) {
    let result = [];
    hex_array.forEach((hex) => {
        let color = hex[1];
        if (color.includes('#')) { color = color.replace('#',''); }
        let r = parseInt(color.slice(0, 2), 16),
        g = parseInt(color.slice(2, 4), 16),
        b = parseInt(color.slice(4, 6), 16);
        result.push([hex[0], r+','+g+','+b]);
    });
    console.log(result);
}

function rgbToHex(rgb_array) {
    let result = [];
    rgb_array.forEach((rgb) => {
        result.push([rgb[0],(1 << 24 | rgb[1].split(',')[0] << 16 | rgb[1].split(',')[1] << 8 | rgb[1].split(',')[2]).toString(16).slice(1)]);
    });
    console.log(result);
}