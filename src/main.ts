import "./style.css";
import Experience from "../Experience/Experience";
import Lenis from "@studio-freight/lenis";

const experience = new Experience(document.querySelector(".experience-canvas"));


experience.on("startSmoothScroll", () => {
    console.log("Started Smooth Scroll!")
    const lenis = new Lenis({
        easing: (t) => (1 - Math.pow(1 - t, 5)) / 4,
    })
    
    function raf(time: any) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
})


