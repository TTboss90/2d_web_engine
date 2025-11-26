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

export class rect{
    constructor(program,x,y,sizeX,sizeY){
        this.program = program;
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    draw(gl){

        gl.useProgram(this.program);

        const vao = create_VAO(gl);

        const vbo = create_buffer(gl,verts,gl.ARRAY_BUFFER);
        
        let attributes = get_attributes(gl,this.program,["apos"]);
        enable_vao(gl,attributes["apos"],2,gl.FLOAT,false,2 * 4,0)
        
        const ebo = create_buffer(gl,indices,gl.ELEMENT_ARRAY_BUFFER);

        const pos = gl.getUniformLocation(this.program,"pos");
        
        gl.uniform2f(pos,this.x,this.y);

        const scaleLoc = gl.getUniformLocation(this.program, "uScale");
        gl.uniform2f(scaleLoc, this.sizeX,this.sizeY);

        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindVertexArray(null);
    }
}