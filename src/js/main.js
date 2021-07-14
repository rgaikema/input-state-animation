 
document.addEventListener("DOMContentLoaded", function () {

    const body = document.getElementsByTagName("body")[0];
    const indicator =  document.querySelector(".svg_wrapper");
    const components = document.querySelectorAll("[data-component]");
    let clones = [];

    const checkClones = (e) => {
        const btnId = e.target.id;
        let lastClickedClone = clones.pop();

        const toggleClasses = () => {
            lastClickedClone.classList.add("fade");
            setTimeout(() => {
                lastClickedClone.classList.remove("fade");
                lastClickedClone.classList.remove("success", "error");
            }, 400);
        }

        if(btnId === "btnSuccess") {
            lastClickedClone.classList.add("success");
            // setTimeout(toggleClasses, 2000);
        }else {
            lastClickedClone.classList.add("error");
            // setTimeout(toggleClasses, 2000);
        }
    }

    // Loading animation
    const showAnimation = () => {
        const btnSucces = document.getElementById("btnSuccess");
        const btnFail = document.getElementById("btnFail");

        // To simulate response state
        btnSucces.addEventListener("click", checkClones);
        btnFail.addEventListener("click", checkClones);

    };

    components.forEach((element)=> {

        element.addEventListener("click", (e) => {
            const target = e.target;
            const rect = target.getBoundingClientRect();
            const xCor = rect.x - 30;
            const yCor = rect.y;
            // console.log(xCor, yCor);

            const id = target.getAttribute("data-component");

            let clone = indicator.cloneNode(true);
            clone.setAttribute("data-id", id);

            body.appendChild(clone);
            // console.log("clone: ", clone)
            clone.style.left = `${xCor}px`;
            clone.style.top = `${yCor}px`;
            clone.style.height = "24px";
            clone.style.width = "24px";

            clones.push(clone);

            showAnimation();
        })

    });

});