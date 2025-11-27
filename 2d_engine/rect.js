import { get_gl, createProgram, create_buffer, create_VAO, get_attributes, enable_vao } from "./webgl.js";

export class rect{
    constructor(x,y,sizeX,sizeY){
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    draw(gl,program){

        const pos = gl.getUniformLocation(program,"pos");
        
        gl.uniform2f(pos,this.x,this.y);

        const scaleLoc = gl.getUniformLocation(program, "uScale");
        gl.uniform2f(scaleLoc, this.sizeX,this.sizeY);
    }
}