export default function removeColor() {
    const elements = document.querySelectorAll(".Path");

    console.log(elements);
    elements.forEach((element) => {
        element.classList.remove('Path');
      });
}