import { gsap } from "gsap/dist/gsap";
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

document.addEventListener("DOMContentLoaded", function () {

    let tl =  gsap.timeline();

    tl  
        .set(["#loading_line", "#check_mark","#cross"], {autoAlpha:0})

        .add("start")
        .to("#loading_line", {autoAlpha:1, duration: 2})
        .fromTo("#loading_line_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=.2")

        .to("#check_mark", {autoAlpha:1, duration: 2})
        .fromTo("#check_mark_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=2.2");

        // .fromTo("#cross_stroke_left_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=4.2")
        // .fromTo("#cross_stroke_right_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=4.4");
});