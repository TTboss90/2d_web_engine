#version 300 es
precision mediump float;

in vec2 apos;

uniform vec2 pos;
uniform float size;

void main() {
    gl_Position = vec4((apos * size) + pos, 0.0, 1.0);
}
