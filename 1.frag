/*{
//     "server": 3000,
    "pixelRatio": 1,
    "vertexCount":200,
    // "vertexMode": "TRIANGLES",
     "vertexMode": "LINES",
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
float random(in vec2 p){
  return fract(sin(dot(vec2(21.324,435.454), p)) * 3249.042);
}


void main() {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 uv = gl_FragCoord.xy / resolution;
    vec2 uv0 = uv;


    p = sin(abs(p)) * sin(time * 2.4);

// p=abs(uv-.5);
p=rotate(p, sin(time*.3)*cos(time*.4));
p*=p;

    float t = mod(time * 2., 3.9);
    p *= 3.9;
    if (t < .5) {
        p = fract(p + time *.3);
        p *= 1. - fract(time*.2);
    }
    // else {
        p = rotate(p, time*.8);
    // }

  p += triNoise(p, fract(time)+30.);

    p *= 1. - t;
   p = rotate(p, time * .7 + triNoise(p*.22, time*.1)*10.);
  p = fract(p) * (1. +fract(time *2.2));

    gl_FragColor = vec4(1);
    gl_FragColor.rg = (vec2(
        texture2D(renderBuffer, p).b,
        texture2D(renderBuffer, fract(p+3.)).g
    )) * 2. - .7;
    gl_FragColor.b = texture2D(backbuffer, uv0).g;
    // gl_FragColor.b= triNoise(uv + .02, time *2.3);

  vec2 up = uv0 - .5;
  gl_FragColor.r -= texture2D(backbuffer, fract(up*.2)).b *.3;


  gl_FragColor.b += texture2D(backbuffer, uv + random(vec2(time * .2))).b *.3;


}
