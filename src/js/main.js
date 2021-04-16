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
        .add("start")
        .to("#loading_line", {autoAlpha:1, duration: 2})
        .fromTo("#loading_line_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:"75% 0%", ease: "power1.Out"}, "start+=.2");

        return tl;
    }

    const rotate = () => {
        const tl = gsap.timeline({repeat: -1});

         // Rotate
         tl
            .add('rotation')
            .fromTo("#loading_line_path", {transformOrigin: "50% 50%", rotate: "0"}, {duration: 2, rotate: "-360", ease: "power1.Out"});

        return tl;
    }

    const endLoading = () => {
        const tl = gsap.timeline();

        tl
            .fromTo("#loading_line_path", {drawSVG:"100% 0%"},{duration:.7});

        return tl;
    }

    tlMain
        .add(fadeIn())
        .add(rotate());

        //We get success of fail info
    tlMain2
        .add(endLoading());



        // .fromTo("#loading_line_path", {drawSVG:"100% 0%"},{duration: 1.8, drawSVG:"0% 0%", ease: "power1.Out"}, "start+=2.2");

    //tl
        // .to("#check_mark", {autoAlpha:1, duration: 2})
        // .fromTo("#check_mark_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=2.2");

        // .fromTo("#cross_stroke_left_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=4.2");
        // .fromTo("#cross_stroke_right_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=4.4");
});