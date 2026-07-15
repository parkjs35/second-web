/* ==================================================

   Academic Portfolio

   script.js Part 1

   Canvas Smoke Animation

================================================== */



/* ==================================================
   1. Canvas Setup
================================================== */


const canvas = document.getElementById("smoke");

const ctx = canvas.getContext("2d");



let width;

let height;



function resizeCanvas(){


    width = canvas.width = window.innerWidth;


    height = canvas.height = window.innerHeight;


}



resizeCanvas();



window.addEventListener(
    "resize",
    resizeCanvas
);





/* ==================================================
   2. Smoke Particle Class
================================================== */


class SmokeParticle {


    constructor(){


        this.reset();


    }



    reset(){


        this.x = Math.random() * width;


        this.y =
        height +
        Math.random() * 200;



        this.size =
        Math.random() * 180 + 80;



        this.speed =
        Math.random() * 0.25 + 0.1;



        this.opacity =
        Math.random() * 0.03 + 0.015;



        this.direction =
        Math.random() * 2 - 1;



        this.wave =
        Math.random() * Math.PI * 2;


    }




    update(){



        this.y -= this.speed;



        this.wave += .003;



        this.x +=
        Math.sin(this.wave)
        *
        this.direction;



        if(
            this.y <
            -this.size
        ){


            this.reset();


        }


    }





    draw(){



        const gradient =
        ctx.createRadialGradient(

            this.x,
            this.y,
            0,

            this.x,
            this.y,
            this.size

        );



        gradient.addColorStop(

            0,

            `rgba(
                139,
                107,
                74,
                ${this.opacity}
            )`

        );



        gradient.addColorStop(

            1,

            "rgba(139,107,74,0)"

        );



        ctx.fillStyle =
        gradient;



        ctx.beginPath();



        ctx.arc(

            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2

        );



        ctx.fill();


    }


}





/* ==================================================
   3. Create Smoke Particles
================================================== */


const particles = [];



const particleCount = 35;



for(
    let i = 0;
    i < particleCount;
    i++
){


    particles.push(

        new SmokeParticle()

    );


}





/* ==================================================
   4. Animation Loop
================================================== */


function animateSmoke(){



    ctx.clearRect(

        0,
        0,
        width,
        height

    );




    particles.forEach(

        particle => {


            particle.update();


            particle.draw();


        }

    );



    requestAnimationFrame(

        animateSmoke

    );


}



animateSmoke();





/* ==================================================
   5. Performance Optimization
================================================== */


document.addEventListener(

    "visibilitychange",

    ()=>{


        if(
            document.hidden
        ){


            canvas.style.display =
            "none";


        }

        else{


            canvas.style.display =
            "block";


        }


    }

);
/* ==================================================

   Academic Portfolio

   script.js Part 2

   Scroll Interaction

================================================== */



/* ==================================================
   6. Scroll Progress Bar
================================================== */


const progressBar =

document.getElementById(
    "progress-bar"
);



function updateProgress(){



    const scrollTop =

    window.scrollY;



    const documentHeight =

    document.documentElement.scrollHeight
    -
    window.innerHeight;



    const progress =

    (scrollTop / documentHeight)
    * 100;



    progressBar.style.width =

    progress + "%";



}



window.addEventListener(

    "scroll",

    updateProgress,

    {

        passive:true

    }

);





/* ==================================================
   7. Reveal Animation
================================================== */



const revealElements =

document.querySelectorAll(

    "section, .research-card, .publication-card, .timeline-item, .contact-card"

);





revealElements.forEach(

    element => {


        element.classList.add(
            "fade"
        );


    }

);






const revealObserver =

new IntersectionObserver(

    entries => {


        entries.forEach(

            entry => {


                if(
                    entry.isIntersecting
                ){


                    entry.target.classList.add(
                        "show"
                    );



                    revealObserver.unobserve(

                        entry.target

                    );


                }


            }


        );


    },


    {

        threshold:0.15,


        rootMargin:

        "0px 0px -80px 0px"


    }

);





revealElements.forEach(

    element => {


        revealObserver.observe(

            element

        );


    }

);





/* ==================================================
   8. Navigation Scroll Highlight
================================================== */



const sections =

document.querySelectorAll(

    "section"

);



const navLinks =

document.querySelectorAll(

    "nav a"

);





function updateNavigation(){



    let current = "";



    sections.forEach(

        section => {



            const sectionTop =

            section.offsetTop - 150;



            const sectionHeight =

            section.offsetHeight;



            if(

                window.scrollY >= sectionTop

                &&

                window.scrollY <
                sectionTop + sectionHeight

            ){


                current =
                section.getAttribute(
                    "id"
                );


            }


        }

    );





    navLinks.forEach(

        link => {


            link.classList.remove(
                "active"
            );



            if(

                link.getAttribute(
                    "href"
                )
                ===
                "#" + current

            ){


                link.classList.add(
                    "active"
                );


            }


        }


    );



}



window.addEventListener(

    "scroll",

    updateNavigation,

    {

        passive:true

    }

);





/* ==================================================
   9. Smooth Anchor Adjustment
================================================== */



document
.querySelectorAll(

    'a[href^="#"]'

)
.forEach(

    anchor => {


        anchor.addEventListener(

            "click",

            function(e){


                const target =

                document.querySelector(

                    this.getAttribute(
                        "href"
                    )

                );



                if(target){


                    e.preventDefault();



                    target.scrollIntoView({

                        behavior:
                        "smooth",


                        block:
                        "start"


                    });


                }


            }

        );


    }

);





/* ==================================================
   END OF SCRIPT PART 2

================================================== */
/* ==================================================

   Academic Portfolio

   script.js Part 3

   Final Interaction

================================================== */



/* ==================================================
   10. Dark Mode Toggle
================================================== */


const darkButton =

document.getElementById(
    "darkButton"
);



const body =

document.body;




// 저장된 테마 불러오기

const savedTheme =

localStorage.getItem(
    "theme"
);



if(savedTheme === "dark"){


    body.classList.add(
        "dark"
    );


}





if(darkButton){


    darkButton.addEventListener(

        "click",

        ()=>{


            body.classList.toggle(
                "dark"
            );



            const currentTheme =

            body.classList.contains(
                "dark"
            )

            ?

            "dark"

            :

            "light";



            localStorage.setItem(

                "theme",

                currentTheme

            );



        }

    );


}





/* ==================================================
   11. Mouse Soft Light Effect
================================================== */


const light = document.createElement(
    "div"
);


light.className =
"mouse-light";



document.body.appendChild(
    light
);





document.addEventListener(

    "mousemove",

    (e)=>{


        light.style.left =

        e.clientX + "px";



        light.style.top =

        e.clientY + "px";



    }

);





/* ==================================================
   12. Headshot Parallax
================================================== */


const photoFrame =

document.querySelector(
    ".photo-frame"
);





if(photoFrame){


    document.addEventListener(

        "mousemove",

        (e)=>{


            const x =

            (window.innerWidth / 2
            -
            e.clientX)
            / 80;



            const y =

            (window.innerHeight / 2
            -
            e.clientY)
            / 80;




            photoFrame.style.transform =

            `translate(${x}px, ${y}px)
             rotate(2deg)`;


        }

    );


}





/* ==================================================
   13. Page Loading Animation
================================================== */


window.addEventListener(

    "load",

    ()=>{


        document.body.classList.add(

            "loaded"

        );


    }

);





/* ==================================================
   14. Dynamic Footer Year
================================================== */


const footerYear =

document.querySelector(
    ".footer-name"
);



if(footerYear){


    const year =

    new Date()
    .getFullYear();



    footerYear.innerHTML =

    `© ${year} Hong Gil Dong`;


}





/* ==================================================
   15. Prevent Empty Links
================================================== */


document

.querySelectorAll(

    'a[href="#"]'

)

.forEach(

    link=>{


        link.addEventListener(

            "click",

            e=>{


                e.preventDefault();


            }

        );


    }

);





/* ==================================================
   END OF SCRIPT.JS

================================================== */
