/*{
    // "server": 3000,
    "pixelRatio": 1,
    "vertexCount": 1300,
     "vertexMode": "LINE_L2OOP",
    ////////"vertexMode": "POITS",
    "glslify": true,
    "PASSES": [{
        "TARGET": "renderBuffer",
        "vs": "./1.vert",
    }, {
    }],
}*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D renderBuffer;
uniform sampler2D backbuffer;
#pragma glslify: triNoise = require(./util/triNoise.frag)

vec2 rotate(in vec2 v, in float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

void main() {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 uv = gl_FragCoord.xy / resolution;
    vec2 uv0 = uv;


    // p = sin(abs(p)) * sin(time * 2.4);

p=abs(uv-.5);
// p=rotate(p, sin(time*.3)*cos(time*.4));
// p*=p;

    float t = mod(time, .9);
    p *= 1.9;
    // if (t < .5) {
        // p = fract(p + time *.3);
        // p *= 1. - fract(time*.2);
    // }
    // else {
        // p = rotate(p, time+ length(p)*2.);
    // }

// p += triNoise(p, fract(time)+30.);

    // p *= 1. - t;
   p = rotate(p, time * .7 + triNoise(p*.22, time)*10.);
// p = fract(p);
    gl_FragColor = vec4(1);
  gl_FragColor.br = vec2(
        texture2D(renderBuffer, p).b,
        texture2D(renderBuffer, p+.3).r
    )*2.;
    gl_FragColor.g = texture2D(backbuffer, uv0).b*2.;
    // gl_FragColor.r= triNoise(uv + .02, time *.3);

    // gl_FragColor+= texture2D(backbuffer, uv+.01)*.8;
    gl_FragColor -= .2 / length(uv0 - .5);
}
