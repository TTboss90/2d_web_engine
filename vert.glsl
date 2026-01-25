#version 300 es
precision mediump float;

in vec2 apos;
in vec2 a_texCoord;

uniform vec2 pos;
uniform float u_textureSize;
uniform float uScale;
uniform float uAspect;

out vec2 v_texCoord;

void main() {
    v_texCoord = a_texCoord;
    vec2 dpos = apos;

    dpos.x *= u_textureSize / uAspect;

    gl_Position = vec4((dpos*vec2(uScale,uScale)) + pos, 0.0, 1.0);
} 
