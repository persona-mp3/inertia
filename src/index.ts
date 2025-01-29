const greet = (name: string): string => {
    return `Hello, ${name}`
};

// alert(greet('TS'))


const hamMenu = document.querySelector(".ham-menu") as HTMLDivElement;

const offScreenMenu = document.querySelector(".off-screen-menu") as HTMLDivElement;

hamMenu.addEventListener("click", (e: Event) => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});