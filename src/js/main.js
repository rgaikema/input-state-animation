import { gsap } from "gsap/dist/gsap";
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

document.addEventListener("DOMContentLoaded", function () {

    gsap.set("#loading_path", {autoAlpha:0});

    let tl =  gsap.timeline();

    tl  
        .set("#loading_path", {autoAlpha:0})

        .add("start")
        .to("#loading_path", .2, {autoAlpha:1})
        .fromTo("#loading_path", {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"}, "start+=.2")
});