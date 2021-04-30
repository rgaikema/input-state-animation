import { gsap } from "gsap/dist/gsap";
import { DrawSVGPlugin} from "gsap/dist/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

document.addEventListener("DOMContentLoaded", function () {

    const body = document.getElementsByTagName("body")[0];
    const indicator =  document.querySelector(".svg_wrapper");
    // const indicatorWidth = indicator.offsetWidth;
    // const optionsElement =  document.getElementById("options-1");
    const tlMain =  gsap.timeline();

    console.log(gsap.globalTimeline);

    const components = document.querySelectorAll("[data-component]");
    let tlNames = [];

    console.log(components);
    components.forEach((element)=> {
        const id = element.getAttribute("data-component");
        // console.log(id);

        const timelineName = "tl" + id;
        console.log(timelineName);

        tlNames.push(timelineName);

    });

    // console.log(tlNames);

    components.forEach((element)=> {

        element.addEventListener("click", (e) => {
            console.log(gsap.globalTimeline);
            const target = e.target;
            const rect = target.getBoundingClientRect();
            const xCor = rect.x - 30;
            const yCor = rect.y;
            console.log(xCor, yCor);

            const id = target.getAttribute("data-component");

            let clone = indicator.cloneNode(true);
            clone.setAttribute("data-id", id);

            body.appendChild(clone);
            console.log("clone: ", clone)
            clone.style.left = `${xCor}px`;
            clone.style.top = `${yCor}px`;
            clone.style.height = "24px";
            clone.style.width = "24px";

            element = gsap.timeline();

            const iconShapes = clone.querySelector(".loading_line",".check_mark", ".cross");
            const loadingLine = clone.querySelector(".loading_line");
            const loadingLinePath = clone.querySelector(".loading_line_path");
            const checkMark = clone.querySelector(".check_mark");
            const checkMarkPath = clone.querySelector(".check_mark_path");
            const cross = clone.querySelector(".cross");
            const crossLeftPath = clone.querySelector(".cross_stroke_left_path");
            const crossRightPath = clone.querySelector(".cross_stroke_right_path");


            const startLoading = () => {

                const tl =  gsap.timeline();
                
        
                // Start drawing the circle stroke
                tl  
                    .set(iconShapes, {opacity:0})
                    .to([loadingLine, clone], {opacity:1, duration: .2})
                    .fromTo(loadingLinePath, {drawSVG:"0% 0%"},{duration: 1, drawSVG:"75% 0%", ease: "power1.Out"});
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
                // const tl = gsap.timeline({onComplete: () => { console.log('complete')}});
                const tl = gsap.timeline({onComplete: checkResponse});
                tl
                    .fromTo(loadingLinePath, {transformOrigin: "50% 50%", rotate: "0"}, {duration: 1.6, rotate: "-360", ease: "power1.Out"});
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
                        .fromTo(loadingLinePath, {drawSVG:"75% 0%"},{duration: .6, drawSVG:"100% 0%", ease: "power1.Out"});

                } else {
                    tl
                        .fromTo(loadingLinePath, {transformOrigin: "50% 50%", rotate: "0"}, {duration: 1.6, rotate: "-314", ease: "power1.Out"})
                        .fromTo(loadingLinePath, {drawSVG:"75% 0%"},{duration: .6, drawSVG:"100% 0%", ease: "power1.Out"});
                }
                return tl;
            };


            // Remove the line animation
            const removeLoading = (response) => {

                // To start appropriate timeline
                const startResponseAnimation = () => {
                    console.log(response);

                    //Continue with appropriate timeline
                    response === "success" ? element.add(showCheckMark()) : element.add(showCross());
                };
        
                // Set appropriate class name based on response
                let className;
                response === "success" ? className = "+=svg_wrapper success" : className = "+=svg_wrapper fail";
                
                // Change class name for matching colors based on response & remove loading stroke
                const tl = gsap.timeline();   
                tl  
                    .to (clone, {className: className, duration: .1})
                    .fromTo(loadingLinePath, {drawSVG:"100% 0%"},{duration: .8, drawSVG: "100% 100%", ease: "power1.Out"})
                    .call(startResponseAnimation);
                return tl;
            };

            //Check mark animation
            const showCheckMark = () => {
                const tl = gsap.timeline();

                // Draw check mark
                tl
                    .to(checkMark, {opacity:1, duration: .2, ease: "none"})
                    .fromTo(checkMarkPath, {drawSVG:"0% 0%"},{duration: 1.8, drawSVG:true, ease: "power1.Out"})
                    .to(checkMark, {opacity:0, duration: .4, ease: "power1.Out"}, "+=1")
                    .to(clone, {opacity:0, duration: .4, ease: "power1.Out"}, "-=.2");
                return tl;

            };

            //Cross animation
            const showCross = () => {
                const tl = gsap.timeline();

                // Draw the cross
                tl
                    .to(cross, {opacity:1, duration: .2, ease: "none"})
                    .to (clone, {className:"+=svg_wrapper fail", duration: .1})
                    .fromTo(crossLeftPath, {drawSVG:"0% 0%"},{duration: 1, drawSVG:true, ease: "power1.Out"})
                    .fromTo(crossRightPath, {drawSVG:"0% 0%"},{duration: 1, drawSVG:true, ease: "power1.Out"}, "-=.8")
                    .to(cross, {opacity:0, duration: .4, ease: "power1.Out"}, "+=1")
                    .to(clone, {opacity:0, duration: .4, ease: "power1.Out"}, "-=.2");
            };


            element
            .add(startLoading())
            .add(loading());

        })

    });





    //Place element right position
    // indicator.style.height = "20px";
    // indicator.style.width = "20px";
    //optionsElement.parentNode.appendChild(indicator);







    




    // Main timeline starts with loading animation
   // tlMain
        // .add(startLoading())
        // .add(loading());

});