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
            .fromTo("#loading_line_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:"75% 0%", ease: "power1.Out"});
    
        return tl;
    };

    // Loading animation
    const loading = () => {
        let response = "loading";
        const btnSucces = document.getElementById("btnSucces");
        const btnFail = document.getElementById("btnFail");

        // Check for manual input - TODO replace with promise status
        btnSucces.addEventListener("click", function() {
            response = "succes";
        });
        btnFail.addEventListener("click", function() {
            response = "fail";
        });

        // Check response during loading
        const checkResponse = () => {
            if(response === "succes" || response === "fail"){
                tl
                    .pause();
                tlMain
                    .add(endLoading(response));
            }else{
                tl
                    .add(tl.recent());
            }
        };

        // Fill loader & check amount of repeats
        const tl = gsap.timeline({onComplete: checkResponse});
        tl
            .fromTo("#loading_line_path", {transformOrigin: "50% 50%", rotate: "0"}, {duration: 2, rotate: "-360", ease: "power1.Out"});

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
        tl
            .fromTo("#loading_line_path", {drawSVG:"75% 0%"},{duration: .6, drawSVG:"100% 0%", ease: "power1.Out"});
        
        return tl;
    };


    // Remove the line animation
    const removeLoading = (response) => {

        const showResponseAnimation = () => {
            console.log(response);

            if (response === "succes") {
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
            .fromTo("#loading_line_path", {drawSVG:"100% 0%"},{duration: 1.2, drawSVG:"100% 100%", ease: "power1.Out"});

         return tl;
    };

    //Check mark animation
    const showCheckMark = () => {
        const tl = gsap.timeline();

        // Draw check mark
        tl
            .to("#check_mark", {autoAlpha:1, duration: 0, ease: "none"})
            .fromTo("#check_mark_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"});

    };

    //Cross animation
    const showCross = () => {
        const tl = gsap.timeline();

        // Draw the cross
        tl
            .to("#cross", {autoAlpha:1, duration: 0, ease: "none"})
            .fromTo("#cross_stroke_left_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"})
            .fromTo("#cross_stroke_right_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "-=1.4");
    };


    // Main timeline starts with loading animation
    tlMain
        .add(startLoading())
        .add(loading());

});