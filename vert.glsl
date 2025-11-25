#version 300 es
precision mediump float;

in vec2 apos;

uniform vec2 pos;
uniform vec2 uScale;

void main() {
    gl_Position = vec4((apos * uScale) + pos, 0.0, 1.0);
}
