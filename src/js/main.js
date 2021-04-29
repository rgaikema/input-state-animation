import { gsap } from "gsap/dist/gsap";
import { DrawSVGPlugin} from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

document.addEventListener("DOMContentLoaded", function () {

    const indicator =  document.getElementById("indicator");
    const indicatorWidth = indicator.offsetWidth;
    const optionsElement =  document.getElementById("options-1");
    const tlMain =  gsap.timeline();

    //Place element right position
    indicator.style.height = `${indicatorWidth}px`;
    optionsElement.parentNode.appendChild(indicator);

    const startLoading = () => {
        const tl =  gsap.timeline();

        // Start drawing the circle stroke
        tl  
            .set(["#loading_line", "check_mark", "cross"], {opacity:0})
            .to(["#loading_line","#indicator"], {opacity:1, duration: .2})
            .fromTo("#loading_line_path", {drawSVG:"0% 0%"},{duration: 1, drawSVG:"75% 0%", ease: "power1.Out"});
        return tl;
    };

    // Loading animation
    const loading = () => {
        let response = "loading";
        const btnSucces = document.getElementById("btnSuccess");
        const btnFail = document.getElementById("btnFail");

        // Check for manual input - TODO replace with promise status
        btnSucces.addEventListener("click", function() {
            response = "success";
        });
        btnFail.addEventListener("click", function() {
            response = "fail";
        });


        // Check response during loading
        const checkResponse = () => {
            console.log(response);

            if(response === "success" || response === "fail"){
                tl.pause();
                tlMain.add(endLoading(response));
            }else{
                // Recent method is only a return of the last tween, not adding an extra tween
                tl.add(tl.recent());
            }
        };

        // Fill loader & check amount of repeats
        const tl = gsap.timeline({onComplete: checkResponse});
        tl
            .fromTo("#loading_line_path", {transformOrigin: "50% 50%", rotate: "0"}, {duration: 1.6, rotate: "-360", ease: "power1.Out"});
        return tl;
    };


    // Stop rotating at the right point & complete the loading animation
    const endLoading = (response) => {

        // To start loading line removal animation
        const remove = () => {
            tlMain.add(removeLoading(response));
        };

        // Complete the circle
        const tl = gsap.timeline({onComplete: remove});

        if (response === "success"){
            tl
                .fromTo("#loading_line_path", {drawSVG:"75% 0%"},{duration: .6, drawSVG:"100% 0%", ease: "power1.Out"});

        } else {
            tl
                .fromTo("#loading_line_path", {transformOrigin: "50% 50%", rotate: "0"}, {duration: 1.6, rotate: "-314", ease: "power1.Out"})
                .fromTo("#loading_line_path", {drawSVG:"75% 0%"},{duration: .6, drawSVG:"100% 0%", ease: "power1.Out"});
        }
        return tl;
    };


    // Remove the line animation
    const removeLoading = (response) => {

        // To start appropriate timeline
        const startResponseAnimation = () => {
            console.log(response);

            //Continue with appropriate timeline
            response === "success" ? tlMain.add(showCheckMark()) : tlMain.add(showCross());
        };
 
        // Set appropriate class name based on response
        let className;
        response === "success" ? className = "+=svg_wrapper success" : className = "+=svg_wrapper fail";
        
         // Change class name for matching colors based on response & remove loading stroke
        const tl = gsap.timeline();   
        tl  
            .to (".svg_wrapper", {className: className, duration: .1})
            .fromTo("#loading_line_path", {drawSVG:"100% 0%"},{duration: .8, drawSVG: "100% 100%", ease: "power1.Out"})
            .call(startResponseAnimation);
         return tl;
    };

    //Check mark animation
    const showCheckMark = () => {
        const tl = gsap.timeline();

        // Draw check mark
        tl
            .to("#check_mark", {opacity:1, duration: .2, ease: "none"})
            .fromTo("#check_mark_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"})
            .to("#check_mark", {opacity:0, duration: .4, ease: "power1.Out"}, "+=1")
            .to("#indicator", {opacity:0, duration: .4, ease: "power1.Out"}, "-=.2");
        return tl;

    };

    //Cross animation
    const showCross = () => {
        const tl = gsap.timeline();

        // Draw the cross
        tl
            .to("#cross", {opacity:1, duration: .2, ease: "none"})
            .to (".svg_wrapper", {className:"+=svg_wrapper fail", duration: .1})
            .fromTo("#cross_stroke_left_path", {drawSVG:"0% 0%"},{duration: 1, drawSVG:true, ease: "power1.Out"})
            .fromTo("#cross_stroke_right_path", {drawSVG:"0% 0%"},{duration: 1, drawSVG:true, ease: "power1.Out"}, "-=.8")
            .to("#cross", {opacity:0, duration: .4, ease: "power1.Out"}, "+=1")
            .to("#indicator", {opacity:0, duration: .4, ease: "power1.Out"}, "-=.2");
    };


    // Main timeline starts with loading animation
    tlMain
        .add(startLoading())
        .add(loading());

});