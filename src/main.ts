import "./style.css";
import Experience from "../Experience/Experience";
import Lenis from "@studio-freight/lenis";

const experience = new Experience(document.querySelector(".experience-canvas"));

if (experience.flag) {
    const lenis = new Lenis({
        easing: (t) => (1 - Math.pow(1 - t, 5)),
    })
    
    function raf(time: any) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
}
