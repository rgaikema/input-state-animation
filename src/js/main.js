import { gsap } from "gsap/dist/gsap";
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

document.addEventListener("DOMContentLoaded", function () {

    const tlMain =  gsap.timeline();

    const fadeIn = () => {
        const tl =  gsap.timeline();

        tl  
        .set(["#loading_line", "#check_mark","#cross"], {autoAlpha:0})

        // Fade in and draw
        .to("#loading_line", {autoAlpha:1, duration: .2})
        .fromTo("#loading_line_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:"75% 0%", ease: "power1.Out"});
    
        return tl;
    };

    // Loading animation
    const rotate = () => {
        const valueHolder = document.getElementById("progressValue");
        let counter = 0;

        // After 3x loading add removing line animation
        const checkRepeat = () => {
            counter++;
            if(counter === 3){
                console.log("done");
                tlMain
                .add(endLoading());
            }
            valueHolder.innerText = counter;
        };

        // Fill loader & check amount of repeats
        const tl = gsap.timeline({repeat: 3, onRepeat: checkRepeat});
         tl
            .fromTo("#loading_line_path", {transformOrigin: "50% 50%", rotate: "0"}, {duration: 2, rotate: "-360", ease: "power1.Out"});

        return tl;
    };


    // Completing the loading animation 
    const endLoading = () => {

        // Add loading line removal animation
        const remove = () => {
            tlMain
            .add(removeLoading());
        };

        // After filling the circle start the line removal animation
        const tl = gsap.timeline({onComplete: remove});
        tl
            .fromTo("#loading_line_path", {drawSVG:"75% 0%"},{duration: .7, drawSVG:"100% 0%", ease: "power1.Out"});
        
            return tl;
    };


    // Remove the line animation
    const removeLoading = () => {

        // Add the check mark animation to the Main timeline after the loading line is gone
        const checkIn = () => {
            tlMain
            .add(check());
        };

        // After the loading line is gone start the check mark animation
        const tl = gsap.timeline({onComplete: checkIn});
        tl
            .fromTo("#loading_line_path", {drawSVG:"100% 0%"},{duration: 1.2, drawSVG:"100% 100%", ease: "power1.Out"});
        
            return tl;
    };

    // Check mark animation In
    const check = () => {
        const tl = gsap.timeline();

        // Animate the check mark in
        tl
        .to("#check_mark", {autoAlpha:1, duration: .2})
        .fromTo("#check_mark_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "-=.2");

    };

    tlMain
        .add(fadeIn())
        .add(rotate());




        // .fromTo("#loading_line_path", {drawSVG:"100% 0%"},{duration: 1.8, drawSVG:"0% 0%", ease: "power1.Out"}, "start+=2.2");

    //tl
        // .to("#check_mark", {autoAlpha:1, duration: 2})
        // .fromTo("#check_mark_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=2.2");

        // .fromTo("#cross_stroke_left_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=4.2");
        // .fromTo("#cross_stroke_right_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=4.4");
});