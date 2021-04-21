import { gsap } from "gsap/dist/gsap";
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

document.addEventListener("DOMContentLoaded", function () {

    const tlMain =  gsap.timeline();

    const startLoading = () => {
        const tl =  gsap.timeline();

        // Start drawing the circle stroke
        tl  
            .set(["#loading_line", "check_mark", "cross"], {autoAlpha:0})
            .to("#loading_line", {autoAlpha:1, duration: .2})
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
                tl
                    .pause();
                tlMain
                    .add(endLoading(response));
            }else{
                // Recent method is only a return of the last tween, not adding an extra tween
                tl
                    .add(tl.recent());
            }

        };

        // Fill loader & check amount of repeats
        const tl = gsap.timeline({onComplete: checkResponse});

        tl
            .fromTo("#loading_line_path", {transformOrigin: "50% 50%", rotate: "0"}, {duration: 1.6, rotate: "-360", ease: "power1.Out"});

        return tl;
    };


    // Completing the loading animation 
    const endLoading = (response) => {

        // Add loading line removal animation
        const remove = () => {
            tlMain
                .add(removeLoading(response));
        };

        // Complete the circle
        const tl = gsap.timeline({onComplete: remove});

        if (response === "success"){
            tl
            .fromTo("#loading_line_path", {drawSVG:"75% 0%"},{duration: .6, drawSVG:"100% 0%", ease: "power1.Out"});

        } else if (response === "fail"){
            tl
            .fromTo("#loading_line_path", {transformOrigin: "50% 50%", rotate: "0"}, {duration: 1.6, rotate: "-314", ease: "power1.Out"})
            .fromTo("#loading_line_path", {drawSVG:"75% 0%"},{duration: .6, drawSVG:"100% 0%", ease: "power1.Out"});
        }

        return tl;
    };


    // Remove the line animation
    const removeLoading = (response) => {

        const showResponseAnimation = () => {
            console.log(response);

            if (response === "success") {
                tlMain
                    .add(showCheckMark());
            } else if(response === "fail"){
                tlMain
                    .add(showCross());
            }else {
                console.log("error while saving input");
            }
        };

        // After the loading line is gone start the check mark animation
        const tl = gsap.timeline({onComplete: showResponseAnimation});        
        
        tl
            .fromTo("#loading_line_path", {drawSVG:"100% 0%"},{duration: .8, drawSVG: "100% 100%", ease: "power1.Out"});

         return tl;
    };

    //Check mark animation
    const showCheckMark = () => {
        const tl = gsap.timeline();

        // Draw check mark
        tl
            .to("#check_mark", {autoAlpha:1, duration: 0, ease: "none"})
            .to (".svg_wrapper", {className:"+=svg_wrapper success", duration: .1})
            .fromTo("#check_mark_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"})
            .to("#check_mark", {autoAlpha:0, duration: .4, eease: "power1.Out"}, "+=1");

    };

    //Cross animation
    const showCross = () => {
        const tl = gsap.timeline();

        // Draw the cross
        tl
            .to("#cross", {autoAlpha:1, duration: 0, ease: "none"})
            .to (".svg_wrapper", {className:"+=svg_wrapper fail", duration: .1})
            .fromTo("#cross_stroke_left_path", {drawSVG:"0% 0%"},{duration: 1, drawSVG:true, ease: "power1.Out"})
            .fromTo("#cross_stroke_right_path", {drawSVG:"0% 0%"},{duration: 1, drawSVG:true, ease: "power1.Out"}, "-=.8")
            .to("#cross", {autoAlpha:0, duration: .4, ease: "power1.Out"}, "+=1");
    };

    // Main timeline starts with loading animation
    tlMain
        .add(startLoading())
        .add(loading());

});