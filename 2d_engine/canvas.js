export function canvas_init(){
    const canvas = document.createElement("canvas");
    document.body.style = "margin: 0; padding: 0; overflow: hidden;"
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";

    document.body.appendChild(canvas);
    return canvas
}