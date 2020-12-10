// -----------------------------------------------------------------javascript-------------------------------------------------------------- :

// Last update : 12/10/2020

    (function() { // slide :

        // Identify each component it contains (attr(aria-controls))
        let element = $('[aria-controls]');

        // Select all elements:
        element.each(function (index, ele) {

            // Screening process :
            // Elements enter this function that has (attr (data-slide)) only
            if (ele.getAttributeNode('data-slide') !== null) {

                // Defining a variable (dependent) and its usefulness Defining the element related to the event to the previous one such as (click, dblclick, change ..) :
                let dependent = $(`#${ele.getAttribute('aria-controls')}`);

                // This condition is useful in avoiding some errors :
                if (dependent !== null) {

                    // Make slide toggle :
                    function make_slide_toggle(el, dep, dur, data_ev) {

                        if (data_ev === 'click' || data_ev === 'onclick') {
                            el.addEventListener('click', function () {
                                // slide toggle
                                dep.slideToggle(dur / 1);
                            });
                        }
                    }

                    // Make slide down :
                    function make_slide_down(el, dep, dur, data_ev) {
                        
                        if (data_ev === 'click' || data_ev === 'onclick') {
                            el.addEventListener('click', function () {
                                // slide down :
                                dep.slideDown(dur / 1);
                            });
                        } else if (data_ev === 'load' || data_ev === 'onload') {
                            window.addEventListener('load', function () {
                                // slide down :
                                dep.slideDown(dur / 1);
                            });
                        }
                    }

                    // Make slide up :
                    function make_slide_up(el, dep, dur, data_ev) {

                        if (data_ev === 'click' || data_ev === 'onclick') {
                            el.addEventListener('click', function () {
                                // slide up :
                                dep.slideUp(dur / 1);
                            });
                        } else if (data_ev === 'load' || data_ev === 'onload') {
                            window.addEventListener('load', function () {
                                // slide up :
                                dep.slideUp(dur / 1);
                            });
                        }
                    }

                    function make_slides(el, dep, dur, data_ev) {

                        el.addEventListener('click', function (eve) {

                            eve.stopPropagation();

                        });

                        dep.on('click', function (eve) {

                            eve.stopPropagation();

                        });


                        // Conditions for checking slide type :
                        if (el.getAttributeNode('data-slide').value === 'toggle') {

                            // slide toggle :
                            make_slide_toggle(el, dep, dur, data_ev);

                        } else if (el.getAttributeNode('data-slide').value === 'down') {

                            // slide down :
                            make_slide_down(el, dep, dur, data_ev);

                        } else if (el.getAttributeNode('data-slide').value === 'up') {

                            // slide up :
                            make_slide_up(el, dep, dur, data_ev);

                        }

                        if (el.getAttributeNode('data-slide').value === 'toggle' || el.getAttributeNode('data-slide').value === 'down') {

                            if (el.getAttributeNode('data-screen').value !== 'collapse') {

                                document.addEventListener('click', function (documentele) {

                                    if (documentele.target != el && documentele.target != dep) {
                                        
                                        dep.slideUp(dur / 1);
    
                                    }
    
                                });

                            }

                        }
                    }

                    // Defining a variable and its usefulness is to store the value before the change :
                    let DP = dependent.css('display');

                    // This condition is useful in avoiding some errors :
                    if (ele.getAttribute('data-duration') !== null) {
                        
                        // duration :
                        var slide_duration = ele.getAttribute('data-duration');
                    }

                    // Determine if the element is visibility or hidden :
                    if (dependent.attr('aria-expanded') === 'true') {

                        // visibility:
                        dependent.css('display',

                         // Condition if it is hidden it will visibility :
                         DP !== "none" ? DP : "block");
                    // hidden:
                    } else if (dependent.attr('aria-expanded') === 'false') {
                        dependent.css('display', 

                        // Condition if it is visibility it will hidden:
                        DP === 'none' ? DP : "none");
                        
                        // Control by screen size :
                        // This condition is useful in avoiding some errors :
                        if (ele.getAttributeNode('data-screen') !== null) {

                            // Used for navbar (data-screen-size="collapse") :
                            if (ele.getAttributeNode('data-screen').value === 'collapse') {

                                // Hide and show (navbar-collapse) at a certain screen size
                                function hide_navbar_collapse (screen_w) {
                                    
                                    // A condition that hides the navbar-collapse if the screen size is smaller than (screen_w)
                                    if (window.innerWidth <= screen_w) {

                                        // Hide navbar-collapse :
                                        $('.navbar-collapse').css('display', 'none');

                                    } else {

                                        // Show navbar-collapse when screen size is larger than (screen_w)
                                        $('.navbar-collapse').css('display', 'flex');

                                    }
                                }

                                // A condition that hides the navbar-collapse if the screen size is smaller than (740)
                                hide_navbar_collapse (740);

                                // Function for checking the size of the screen when changing its size :
                                //This function is important to hide the navbar-collapse even if the screen is minimized, because if the previous function works on its own, it will not reveal the screen size after the reduction.
                               window.addEventListener('resize', function () {

                                    // A condition that hides the navbar-collapse if the screen size is smaller than (740)
                                    hide_navbar_collapse (740);
                                    
                               });

                            // Condition if its value is true it allows him to set the screen size :
                            // Conditions are used to define the screen size the event runs on : 
                            } else if (ele.getAttributeNode('data-screen').value === 'true') {
                        
                                // If it was screen size = xs = 380 :
                                if (ele.getAttributeNode('data-screen-size').value === 'xs') {

                                    // A condition that hides the element if the screen size is larger than (380)
                                    if (window.innerWidth >= 380) {

                                        // hide :
                                        dependent.css('display', 'none');
                                    } else {

                                        // make slides (function) :
                                        make_slides(ele, dependent, 

                                            // The duration is entered on the function to set the sliding duration :
                                            slide_duration, 

                                            // The (attr) value is entered into the function to classify the event type :
                                            dependent.attr('data-event'));
                                    }

                                    window.addEventListener('resize', function () {
                                        // Take (display) value when resize :
                                        DP = dependent.css('display');

                                        // A condition that hides the element if the screen size is larger than (380)
                                        if (window.innerWidth >= 380) {

                                            // hide :
                                            dependent.css('display', 'none');
                                        } else {

                                            // make slides (function) :
                                            make_slides(ele, dependent, 

                                                // The duration is entered on the function to set the sliding duration :
                                                slide_duration, 

                                                // The (attr) value is entered into the function to classify the event type :
                                                dependent.attr('data-event'));
                                        }
                                     });

                                // If it was screen size = sm = 560 :
                                } else if (ele.getAttributeNode('data-screen-size').value === 'sm') {

                                    // A condition that hides the element if the screen size is larger than (560)
                                    if (window.innerWidth >= 560) {
                                        // hide :
                                        dependent.css('display', 'none');
                                    } else {

                                        // make slides (function) :
                                        make_slides(ele, dependent, 

                                            // The duration is entered on the function to set the sliding duration :
                                            slide_duration, 

                                            // The (attr) value is entered into the function to classify the event type :
                                            dependent.attr('data-event'));
                                    }

                                    window.addEventListener('resize', function () {

                                        // Take (display) value when resize :
                                        DP = dependent.css('display');

                                        // A condition that hides the element if the screen size is larger than (560)
                                        if (window.innerWidth >= 560) {

                                            // hide :
                                            dependent.css('display', 'none');
                                        } else {

                                            // make slides (function) :
                                            make_slides(ele, dependent, 

                                                // The duration is entered on the function to set the sliding duration :
                                                slide_duration, 

                                                // The (attr) value is entered into the function to classify the event type :
                                                dependent.attr('data-event'));
                                        }
                                    });

                                // If it was screen size = md = 740 :
                                } else if (ele.getAttributeNode('data-screen-size').value === 'md') {

                                    // A condition that hides the element if the screen size is larger than (740)
                                    if (window.innerWidth >= 740) {

                                        // hide :
                                        dependent.css('display', 'none');
                                    } else {

                                        // make slides (function) :
                                        make_slides(ele, dependent, 

                                            // The duration is entered on the function to set the sliding duration :
                                            slide_duration, 

                                            // The (attr) value is entered into the function to classify the event type :
                                            dependent.attr('data-event'));
                                    }

                                    window.addEventListener('resize', function () {

                                        // Take (display) value when resize :
                                        DP = dependent.css('display');

                                        // A condition that hides the element if the screen size is larger than (740)
                                        if (window.innerWidth >= 740) {

                                            // hide :
                                            dependent.css('display', 'none');
                                        } else {

                                            // make slides (function) :
                                            make_slides(ele, dependent, 

                                                // The duration is entered on the function to set the sliding duration :
                                                slide_duration, 

                                                // The (attr) value is entered into the function to classify the event type :
                                                dependent.attr('data-event'));
                                        }
                                    });

                                // If it was screen size = lg = 920 :
                                } else if (ele.getAttributeNode('data-screen-size').value === 'lg') {


                                    // A condition that hides the element if the screen size is larger than (920)
                                    if (window.innerWidth >= 920) {

                                        // hide :
                                        dependent.css('display', 'none');
                                    } else {

                                        // make slides (function) :
                                        make_slides(ele, dependent, 

                                            // The duration is entered on the function to set the sliding duration :
                                            slide_duration, 

                                            // The (attr) value is entered into the function to classify the event type :
                                            dependent.attr('data-event'));
                                    }

                                    window.addEventListener('resize', function () {

                                        // Take (display) value when resize :
                                        DP = dependent.css('display');

                                        // A condition that hides the element if the screen size is larger than (920)
                                        if (window.innerWidth >= 920) {

                                            // hide :
                                            dependent.css('display', 'none');
                                        } else {

                                            // make slides (function) :
                                            make_slides(ele, dependent, 

                                                // The duration is entered on the function to set the sliding duration :
                                                slide_duration, 

                                                // The (attr) value is entered into the function to classify the event type :
                                                dependent.attr('data-event'));
                                        }
                                    });

                                // If it was screen size = xl = 1100 :
                                } else if (ele.getAttributeNode('data-screen-size').value === 'xl') {

                                    // A condition that hides the element if the screen size is larger than (920)
                                    if (window.innerWidth >= 1100) {

                                        // hide :
                                        dependent.css('display', 'none');
                                    } else {

                                        // make slides (function) :
                                        make_slides(ele, dependent, 

                                            // The duration is entered on the function to set the sliding duration :
                                            slide_duration, 

                                            // The (attr) value is entered into the function to classify the event type :
                                            dependent.attr('data-event'));
                                    }

                                    window.addEventListener('resize', function () {

                                        // Take (display) value when resize :
                                        DP = dependent.css('display');

                                        // A condition that hides the element if the screen size is larger than (1100)
                                        if (window.innerWidth >= 1100) {

                                            // hide :
                                            dependent.css('display', 'none');
                                        } else {

                                            // make slides (function) :
                                            make_slides(ele, dependent, 

                                                // The duration is entered on the function to set the sliding duration :
                                                slide_duration, 

                                                // The (attr) value is entered into the function to classify the event type :
                                                dependent.attr('data-event'));
                                        }
                                    });
                                }

                            // If attr (data-screen = false) then does not specify a screen size for event execution :
                            } else if (ele.getAttributeNode('data-screen').value === 'false') {

                                // make slides (function) :
                                make_slides(ele, dependent, 

                                    // The duration is entered on the function to set the sliding duration :
                                    slide_duration, 

                                    // The (attr) value is entered into the function to classify the event type :
                                    dependent.attr('data-event'));
                            } 
                        } 

                        if(ele.getAttributeNode('data-screen') === null || ele.getAttributeNode('data-screen').value === 'collapse' || ele.getAttributeNode('data-screen').value === 'none') {
                            // make slides (function) :
                            make_slides(ele, dependent, 

                                // The duration is entered on the function to set the sliding duration :
                                slide_duration, 

                                // The (attr) value is entered into the function to classify the event type :
                                dependent.attr('data-event'));
                        }
                    }
                }
            }
        });       

    })();
    
    (function () { // fade :

        // Identify each component it contains (attr(aria-controls))
        let element = $('[aria-controls]');

        // Select all elements:
        element.each(function (index, ele) {

            // Screening process :
            // Elements enter this function that has (attr (data-fade)) only
            if (ele.getAttributeNode('data-fade') !== null) {

                // Defining a variable (dependent) and its usefulness Defining the element related to the event to the previous one such as (click, dblclick, change ..) :
                let dependent = $(`#${ele.getAttribute('aria-controls')}`);
                
                // This condition is useful in avoiding some errors :
                if (dependent !== null) {

                    // Make fade toggle :
                    function make_fade_toggle(el, dep, dur, data_ev) {

                        if (data_ev === 'click' || data_ev === 'onclick') {
                            el.addEventListener('click', function () {
                                // fade toggle
                                dep.fadeToggle(dur / 1);
                            });
                        }
                    }

                    // Make fade out :
                    function make_fade_out(el, dep, dur, data_ev) {
                        
                        if (data_ev === 'click' || data_ev === 'onclick') {
                            el.addEventListener('click', function () {
                                // fade out :
                                dep.fadeOut(dur / 1);
                            });
                        } else if (data_ev === 'load' || data_ev === 'onload') {
                            window.addEventListener('load', function () {
                                // fade out :
                                dep.fadeOut(dur / 1);
                            });
                        }
                    }

                    // Make fade in :
                    function make_fade_in(el, dep, dur, data_ev) {

                        if (data_ev === 'click' || data_ev === 'onclick') {
                            el.addEventListener('click', function () {
                                // fade in :
                                dep.fadeIn(dur / 1);
                            });
                        } else if (data_ev === 'load' || data_ev === 'onload') {
                            window.addEventListener('load', function () {
                                // fadeIn :
                                dep.fadeIn(dur / 1);
                            });
                        }
                    }

                    function make_fades(el, dep, dur, data_ev) {

                        el.addEventListener('click', function (eve) {

                            eve.stopPropagation();

                        });

                        dep.on('click', function (eve) {

                            eve.stopPropagation();

                        });

                        // Conditions for checking fade type :
                        if (el.getAttributeNode('data-fade').value === 'toggle') {

                            // fade toggle :
                            make_fade_toggle(el, dep, dur, data_ev);

                        } else if (el.getAttributeNode('data-fade').value === 'out') {

                            // fade out :
                            make_fade_out(el, dep, dur, data_ev);

                        } else if (el.getAttributeNode('data-fade').value === 'in') {

                            // fade in :
                            make_fade_in(el, dep, dur, data_ev);

                        }

                        if (el.getAttributeNode('data-fade').value === 'toggle' || el.getAttributeNode('data-fade').value === 'in') {

                            document.addEventListener('click', function (documentele) {

                                if (documentele.target != el && documentele.target != dep) {
                                    
                                    dep.fadeOut(dur / 1);

                                }

                            });

                        }
                    }

                    // Defining a variable and its usefulness is to store the value before the change :
                    let DP = dependent.css('display');

                    // This condition is useful in avoiding some errors :
                    if (ele.getAttribute('data-duration') !== null) {
                        
                        // duration :
                        var fade_duration = ele.getAttribute('data-duration');
                    }

                    // Determine if the element is visibility or hidden :
                    if (dependent.attr('aria-expanded') === 'true') {

                        // visibility:
                        dependent.css('display',

                         // Condition if it is hidden it will visibility :
                         DP !== "none" ? DP : "block");
                    // hidden:
                    } else if (dependent.attr('aria-expanded') === 'false') {
                        dependent.css('display', 

                        // Condition if it is visibility it will hidden:
                        DP === 'none' ? DP : "none");
                    }

                    // fade (function) : 
                    make_fades(ele, dependent, 

                        // The duration is entered on the function to set the fade duration :
                        fade_duration, 
                        
                        // The (attr) value is entered into the function to classify the event type :
                        dependent.attr('data-event'));
                }
            }
        });

    })();



    (function () { // hide & show :

        // Identify each component it contains (attr(aria-controls))
        let element = $('[data-target]');

        // Select all elements:
        element.each(function (index, ele) {

            // Screening process :
            // Elements enter this function that has (attr (data-target)) only
            if (ele.getAttributeNode('data-target') !== null) {

                // Defining a variable (dependent) and its usefulness Defining the element related to the event to the previous one such as (click, dblclick, change ..) :
                let dependent = $(`${ele.getAttributeNode('data-target').value}`);

                // Select all elements:
                dependent.each(function (index, dep) {

                    // Make toggle :
                    function make_toggle(el, dep, dur) {

                        el.addEventListener('click', function () {
                            // toggle
                            dep.toggle(dur / 1);
                        });
                    }

                    // Make hide :
                    function make_hide(el, dep, dur) {

                        el.addEventListener('click', function () {
                            // hide
                            dep.hide(dur / 1);
                        });
                    }

                    // Make show :
                    function make_show(el, dep, dur) {

                        el.addEventListener('click', function () {
                            // show
                            dep.show(dur / 1);
                        });
                    }

                    // Make slide toggle :
                    function make_slide_toggle(el, dep, dur) {

                        el.addEventListener('click', function () {
                            // slide toggle
                            dep.slideToggle(dur / 1);
                        });
                    }

                    // Make slide down :
                    function make_slide_down(el, dep, dur) {
                        
                        el.addEventListener('click', function () {
                            // slide down :
                            dep.slideDown(dur / 1);
                        });
                    }

                    // Make slide up :
                    function make_slide_up(el, dep, dur) {

                        el.addEventListener('click', function () {
                            // slide up :
                            dep.slideUp(dur / 1);
                        });
                    }

                    function make_pattern(el, dep, dur, data_ev) {

                        el.addEventListener('click', function (eve) {

                            eve.stopPropagation();

                        });

                        dep.on('click', function (eve) {

                            eve.stopPropagation();

                        });

                        if (data_ev === 'toggle') {

                            // toggle :
                            make_toggle(el, dep, dur);
                        } else if (data_ev === 'hide') {

                            // hide :
                            make_hide(el, dep, dur);
                        } else if (data_ev === 'show') {

                            // show :
                            make_show(el, dep, dur);
                        } else if (data_ev === 'slide-toggle') {

                            // slide toggle :
                            make_slide_toggle(el, dep, dur);
                        } else if (data_ev === 'slide-down') {

                            // slide down :
                            make_slide_down(el, dep, dur);
                        } else if (data_ev === 'slide-up') {

                            // slide up :
                            make_slide_up(el, dep, dur);
                        }

                        if (data_ev === 'toggle' || data_ev === 'show') {

                            document.addEventListener('click', function (documentele) {

                                if (documentele.target != el && documentele.target != dep) {
                                    
                                    dep.hide(dur / 1);

                                }

                            });

                        } else if (data_ev === 'slide-toggle' || data_ev === 'slide-down') {

                            document.addEventListener('click', function (documentele) {

                                if (documentele.target != el && documentele.target != dep) {
                                    
                                    dep.slideUp(dur / 1);

                                }

                            });

                        }
                    }

                    
                    // Defining a variable and its usefulness is to store the value before the change :
                    let DP = dependent.css('display');

                    // Determine if the element is visibility or hidden :
                    if (dependent.attr('aria-expanded') === 'true') {

                        // visibility:
                        dependent.css('display',

                         // Condition if it is hidden it will visibility :
                         DP !== "none" ? DP : "block");
                    // hidden:
                    } else if (dependent.attr('aria-expanded') === 'false') {
                        dependent.css('display', 

                        // Condition if it is visibility it will hidden:
                        DP === 'none' ? DP : "none");
                    }

                    if (ele.getAttributeNode('data-pattern') !== null) {
                        make_pattern(ele, dependent, 

                            // The duration is entered on the function to set the fade duration :
                            20, 

                            // The (attr) value is entered into the function to classify the pattern type :
                            ele.getAttributeNode('data-pattern').value);
                    }
                });
            }
        });
    })();


    (function () { // events :


        let ele_prevent_default = $('[prevent-default]');

        // Select all elements:
        ele_prevent_default.each(function (index, ele) {

            // Screening process :
            // Elements enter this function that has (attr (prevent-default)) only
            if (ele.getAttributeNode('prevent-default') !== null) {

                ele.onsubmit = function(event) {

                    // prevent default :
                    event.preventDefault();
                } 
            } 
        });

        let ele_focus = $('[focus]');

        ele_focus.each(function (index, ele) {

            // Elements enter this function that has (attr (focus)) only
            if (ele.getAttributeNode('focus') !== null) {

                window.addEventListener('load', function() {
                    
                    // foucs :
                    ele.focus();
                });
            }
        });


        let ele_blur = $('[blur]');

        ele_blur.each(function (index, ele) {

            // Elements enter this function that has (attr (blur)) only
            if (ele.getAttributeNode('blur') !== null) {

                window.addEventListener('load', function() {
                    
                    // remove focus :
                    ele.blur();
                });
            }
        });


        let ele_click = $('[click]');

        ele_click.each(function (index, ele) {

            // Elements enter this function that has (attr (click)) only
            if (ele.getAttributeNode('click') !== null) {

                // auto click on element which chose it
                window.addEventListener('load', function() {
                    
                    // click :
                    ele.click();
                });
            }
        });

    })();


        
    // search :
    (function () {

        // Defining a variable (dependent) and its usefulness Defining the element related to the event to the previous one such as (click, dblclick, change ..) :
        let dependent_search = $('[data-target]');

        // Select all elements:
        dependent_search.each(function (index, ele_dep) {

            // Element was extracted with id specified in (attr(data-target))
            let ele_search = $(`#${ele_dep.getAttributeNode('data-target').value}`);

            // Select all elements:
            ele_search.each(function (index, ele_se) {

                // The dependent must contain(attr(data-description)) ... in order to perform the search
                if (ele_dep.getAttributeNode('data-description') !== null) {

                    // Stores the display value before the change 
                    let DP = ele_dep.style.display;

                    // input > onkeyup 
                    ele_search.keyup(function () {

                        // Check words stored in attr (data-description) to check input values and values stored in attr (data-description)
                        search_fn($(this)
                        
                        // get value :
                        .val()
                        
                        // Delete the spaces at the beginning and end in the entered value
                        .trim());
                    });

                    // check_fn
                    function search_fn(val) { 

                        // Define a variable with the value (False) Match Check
                        let found = false,

                        // Define a variable in the form of an array to check the previously mentioned description sentences
                            data_des = ele_dep.getAttributeNode('data-description').value.split(',');

                        // for each :    
                        for (let i = 0; i < data_des.length; i++) {

                            // Check description and input
                            if (data_des[i].trim().toLowerCase().indexOf(val.toLowerCase()) >= 0) {

                                // Modify the variable value to specify the type of display
                                found = true;
                            }

                            // If the entry contains the description
                            if (found == true) {

                                // show :
                                ele_dep.style.display = 

                                // Verify that the display value is none
                                DP !== 'none' ? DP : 

                                // If it is not equal
                                'block';

                                // In the event of a mismatch
                            } else {

                                // hide :
                                ele_dep.style.display = 'none';
                            }
                        }
                    }
                }
            });
        });
    })();



    (function () {

        const slider_basic = document.querySelectorAll('[data-slider]');
    
        slider_basic.forEach(function (ele_bic) {
        
        
            if (ele_bic.getAttributeNode('data-slider').value == 'true') {
        
        
                let slider_imges = Array.from(document.querySelectorAll('.slider-imgs img')),
                    slices_imgs = document.querySelectorAll('.slices-imgs');
        
                slices_imgs.forEach(function (ele_slices_imgs) {
        
                    if (ele_slices_imgs.getAttributeNode('data-imgs').value == 'slide') {
        
                        let slider_Len = slider_imges.length,
                            current_slide = 1,
                            slider_info = document.querySelectorAll('.slider-info');
                        
                        
                        var navigation_next = document.querySelectorAll('[data-navigation="next"]'),
                            navigation_prev = document.querySelectorAll('[data-navigation="prev"]');
                        
                        
        
                        navigation_onslider(navigation_next, next_slider);
        
                        navigation_onslider(navigation_prev, prev_slider);
        
        
                        function navigation_onslider(navigation, ev_navigation) {
        
                            navigation.forEach(function (ele_navigation) {
        
                                ele_navigation.addEventListener('click', ev_navigation);
            
                            });
        
                        }
        
        
                        let indicators_slider = document.querySelectorAll('[data-indicators]');
        
                        indicators_slider.forEach(function (ele_indicators) {
        
                            if (ele_indicators.getAttributeNode('data-indicators').value == 'true') {
        
                                let create_pagination = document.createElement('ul');
                        
                                create_pagination.setAttribute('pagination', '');
                                
                                for (let i = 1; i <= slider_Len; i++) {
                                
                                    let create_pagination_item = document.createElement('li');
                                
                                    create_pagination_item.setAttribute('data-index', i);
                                
                                    create_pagination.appendChild(create_pagination_item);
                                
                                }
                                
                                ele_indicators.appendChild(create_pagination);
                
                            } else if (ele_indicators.getAttributeNode('data-indicators').value == 'false') {
        
                                console.log('data-indicators : false')
        
                            }
        
                        }) ;
        
        
                        var pagination_bullets = Array.from(document.querySelectorAll('[pagination] li'));
                                
        
                        if (pagination_bullets !== undefined) {
        
                            for (let i = 0; i < pagination_bullets.length; i++) {
                        
                                pagination_bullets[i].addEventListener('click', function () {
                            
                                    current_slide = parseInt(this.getAttribute('data-index'));
                            
                                    if (parseInt(this.getAttribute('data-index')) > current_slide - 1) {
                            
                                        check_for_slider();
                            
                                    } else {
                            
                                        check_for_slider();
                            
                                    }
                                    
                                });
                            
                            }
        
                        }
        
        
                        check_for_slider();
        
                        
                        window.addEventListener('load', function () {
                        
                            set_H_and_W_for_slices();
                        
                            const automatic_navigation = document.querySelectorAll('[data-automatic-navigation]');
        
                            automatic_navigation.forEach(function (ele_automatic_navigation) {
        
        
                                if (ele_automatic_navigation.getAttributeNode('data-automatic-navigation').value == 'true') {
        
                                    setInterval(function () {
                        
                                        navigation_next.forEach(function (ele_navigation) {
                
                                            ele_navigation.click();
                
                                        });       
                                
                                    }, ele_automatic_navigation.getAttributeNode('data-timeout') !== null ? ele_automatic_navigation.getAttributeNode('data-timeout').value : 10000);
        
                                }
        
                            }); 
                        
                        });
                        
                        
                        
                        function next_slider() {
                        
                            current_slide++;
                        
                            check_for_slider();
                        
                        }
                        
                        function prev_slider() {
                        
                            current_slide--;
                        
                            check_for_slider();
                        
                        }
                        
                        
                        function check_for_slider() {
                        
                            slider_info.forEach(function (ele_info) {
        
                                if (ele_info.getAttributeNode('data-info').value == 'true')
                                    ele_info.textContent = `${current_slide } / ${slider_Len}`;
        
                            });
                        
                            removeAllActive();
                        
                            if ( current_slide > slider_Len ) {
                        
                                current_slide = 1;
                        
                            } 
                        
                            if ( current_slide <= 0 ) {
                        
                                current_slide = slider_Len;
                        
                            }
                            
                            if ( slider_imges[current_slide - 1] != 0 ) {
                        
                                slider_imges[current_slide - 1].style.left = `${(parseInt(slider_imges[current_slide - 1].clientWidth) * (-1))}px`;
                                slider_imges[current_slide - 1].classList.add('active');
        
                                if (typeof(pagination_bullets) == 'object') {
        
                                    pagination_bullets[current_slide - 1].classList.add('active');
        
                                }
        
                            }
                        
                        }
                        
                        function set_H_and_W_for_slices() {
                        
                            slider_imges.forEach(function (img) {
                        
                                img.style.height = `${slider_imges[0].clientHeight}px`;
                            
                                img.style.width = `${slider_imges[0].clientWidth}px`;
                            
                            });
                        
                        }
                        
                        function removeAllActive() {
                        
                            slider_imges.forEach(function(img) {
                        
                                img.style.removeProperty('left');
                        
                                img.classList.remove('active');
                        
                            });
                        
                            pagination_bullets.forEach(function (bullets) {
                        
                                bullets.classList.remove('active');
                        
                            });
        
                        }  
        
                    }
        
        
                });              
        
            }
        
        });    
    
    })();
    
// ---------------------------------------------------------------------------------------------------------------------------------------
