import { get_gl, createProgram, create_buffer, create_VAO, get_attributes, enable_vao } from "./webgl.js";


export class rect{
    constructor(gl,program,x,y,size){
        this.gl = gl;
        this.program = program;
        this.x = x;
        this.y = y;
        this.size = size;
    }

    verts = new Float32Array([
        -1, 1,
        -1,-1,
        1,-1,
        1, 1
    ]);

    indices = new Uint16Array([
        0, 1, 2,
        0, 2, 3
    ]);

    draw(){
        const gl = this.gl;

        gl.useProgram(this.program);

        const vao = create_VAO(gl);

        const vbo = create_buffer(gl,this.verts,gl.ARRAY_BUFFER);
        
        let attributes = get_attributes(gl,this.program,["apos"]);
        enable_vao(gl,attributes["apos"],2,gl.FLOAT,false,2 * 4,0)
        
        const ebo = create_buffer(gl,this.indices,gl.ELEMENT_ARRAY_BUFFER);

        const pos = gl.getUniformLocation(this.program,"pos");
        
        gl.uniform2f(pos,this.x,this.y);

        const sizeLoc = gl.getUniformLocation(this.program, "size");
        gl.uniform1f(sizeLoc, this.size);

        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindVertexArray(null);
    }
}