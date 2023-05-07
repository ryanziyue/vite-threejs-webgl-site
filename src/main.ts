import "./style.css";
import Experience from "../Experience/Experience";
import Lenis from "@studio-freight/lenis";

window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}

const experience = new Experience(document.querySelector(".experience-canvas"));
experience;

const lenis = new Lenis({
    easing: (t) => (1 - Math.pow(1 - t, 5)),
})

function raf(time:any) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)