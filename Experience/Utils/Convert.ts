export default function (element: any) {
    element.style.overflow = 'hidden';
    element.innerHTML = element.innerText.split("").map((char: any) => {
        if (char===" ") {
            return `<span> ${char} </span>`
        }
        return `<span class="animatediv"> ${char} </span>`
    }).join("");

    return element;
}