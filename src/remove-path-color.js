export default function removeColor() {
    const elements = document.querySelectorAll(".Path");
    elements.forEach((element) => {
        element.classList.remove('Path');
      });
}