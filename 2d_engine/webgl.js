export function get_gl(canvas) {
    return canvas?.getContext("webgl2")
        || canvas?.getContext("webgl")
        || canvas?.getContext("experimental-webgl")
        || null;
}

async function loadfile(url) {
    const response = await fetch(url);
    return await response.text();
}

function createShader(gl, type, source){
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
}

export async function createProgram(gl, vertexShader, fragmentShader){
  vertexShader = createShader(gl,gl.VERTEX_SHADER,await loadfile(vertexShader));
  fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,await loadfile(fragmentShader));

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
      return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

export function create_buffer(gl,data,type){
    const buff = gl.createBuffer();
    gl.bindBuffer(type,buff);
    gl.bufferData(type, data, gl.STATIC_DRAW);

    return buff;
}

export function create_VAO(gl){
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    return vao;
}

export function get_attributes(gl,program,attributes){
    let out = {};
    attributes.forEach(element => {
       out[element] = gl.getAttribLocation(program,element);
    });

    return out
}

export function enable_vao(gl,attribute,size,type,norm,stride,offset){
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute,size,type,norm,stride,offset);
}