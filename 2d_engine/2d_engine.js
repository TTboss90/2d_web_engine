import { canvas_init } from "./canvas.js";
import { get_gl, createProgram, create_buffer, create_VAO, get_attributes, enable_vao } from "./webgl.js";

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

const texCoords = new Float32Array([
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0  
]);

let program;
let sprites = [];

export async function init(init_func,loop_func){
    const canvas = canvas_init();

    let gl = get_gl(canvas);

    gl.clearColor(0,0,0,1);

    program = await createProgram(gl,"vert.glsl","frag.glsl");

    let deltaTime = 0, lastFrame = 0;

    gl.useProgram(program);

    const vao = create_VAO(gl);

    const vbo = create_buffer(gl,verts,gl.ARRAY_BUFFER);
    
    const texbuff = create_buffer(gl, texCoords, gl.ARRAY_BUFFER);

    let attributes = get_attributes(gl,program,["apos","a_texCoord"]);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    enable_vao(gl,attributes["apos"],2,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texbuff);
    enable_vao(gl, attributes["a_texCoord"], 2, gl.FLOAT, false, 0, 0);


    const ebo = create_buffer(gl,indices,gl.ELEMENT_ARRAY_BUFFER);

    await init_func()

    const frame = function(){
        let currentFrame = Date.now();
        deltaTime = (currentFrame - lastFrame) / 1000.0;
        lastFrame = currentFrame;

        gl.clear(gl.COLOR_BUFFER_BIT);
        canvas.width = canvas.clientWidth * window.devicePixelRatio;
        canvas.height = canvas.clientHeight * window.devicePixelRatio;
        gl.viewport(0, 0, canvas.width, canvas.height);

        loop_func(deltaTime)

        sprites.forEach(e =>{
            gl_draw_sprite(gl,e.texture,e.size,e.x,e.y)
        })

        sprites.length = 0;

        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

export async function createTexture(gl,url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);

            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                image
            );

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            tex.width = image.width;
            tex.height = image.height;

            resolve(tex);
        };
        image.onerror = (e) => reject(e);
    });
}

export function draw_sprite(Texture, Size, X, Y) {
    sprites.push({
        texture: Texture,
        size: Size,
        x: X,
        y: Y
    });
}

function gl_draw_sprite(gl,texture,size,x,y){
    let canvas = gl.canvas;

    const sampler = gl.getUniformLocation(program, "u_image");
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(sampler, 0);

    gl.uniform2f(gl.getUniformLocation(program,"pos"),x,y);
    gl.uniform1f(gl.getUniformLocation(program,"uScale"),size);

    const texSize = gl.getUniformLocation(program, "u_textureSize");
    gl.uniform1f(texSize, texture.width / texture.height);

    const uAspectLocation = gl.getUniformLocation(program, "uAspect");
    const aspect = canvas.width / canvas.height;
    gl.uniform1f(uAspectLocation, aspect);


    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function load_image(url){
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;

    return image
}