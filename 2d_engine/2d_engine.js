import { canvas_init } from "./canvas.js";
import { get_gl, createProgram, create_buffer, create_VAO, get_attributes, enable_vao } from "./webgl.js";
import { rect } from "./rect.js";

const verts = new Float32Array([
    -1, 1,
    -1,-1,
    1,-1,
    1, 1
]);

const indices = new Uint16Array([
    0, 1, 2,
    0, 2, 3
]);


export async function init(){
    const canvas = canvas_init();

    let gl = get_gl(canvas);

    gl.clearColor(0,0,0,1);

    const program = await createProgram(gl,"vert.glsl","frag.glsl");
    

    let objs = [
        new rect(0.4,0.3,0.3,0.5),
        new rect(-0.3,-0.3,0.3,0.5)
    ];

    let deltaTime = 0, lastFrame = 0;

    gl.useProgram(program);

    const vao = create_VAO(gl);

    const vbo = create_buffer(gl,verts,gl.ARRAY_BUFFER);
    
    let attributes = get_attributes(gl,program,["apos"]);
    enable_vao(gl,attributes["apos"],2,gl.FLOAT,false,2 * 4,0)

    const ebo = create_buffer(gl,indices,gl.ELEMENT_ARRAY_BUFFER);

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
            element.draw(gl,program)
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        });

        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}