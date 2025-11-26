import { canvas_init } from "./canvas.js";
import { get_gl, createProgram, create_buffer, create_VAO, get_attributes, enable_vao } from "./webgl.js";
import { rect } from "./rect.js";


export async function init(){
    const canvas = canvas_init();

    let gl = get_gl(canvas);

    gl.clearColor(0,0,0,1);

    const program = await createProgram(gl,"vert.glsl","frag.glsl");
    

    let objs = [
        new rect(program,0.4,0.3,0.3,0.5),
        new rect(program,-0.3,-0.3,0.3,0.5)
    ];

    let deltaTime = 0, lastFrame = 0;

    const frame = function(){
        let currentFrame = Date.now();
        deltaTime = (currentFrame - lastFrame) / 1000.0;
        lastFrame = currentFrame;

        gl.clear(gl.COLOR_BUFFER_BIT);
        canvas.width = canvas.clientWidth * window.devicePixelRatio;
        canvas.height = canvas.clientHeight * window.devicePixelRatio;
        gl.viewport(0, 0, canvas.width, canvas.height);

        objs[0].sizeY +=0.001;
        objs.forEach(element => {
            element.draw(gl)
        });

        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}