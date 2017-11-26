/*{
    "pixelRatio": 1,
    "glslify": true,
    "camera": true,
    "IMPORTED": {
        "v1": {
          "PATH": "./vj/beeple/beeple00172.mp4",
        },
        "v2": {
          "PATH": "./vj/beeple/beeple00199.mp4",
        },
    }
}*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D v1;
uniform sampler2D v2;
uniform sampler2D camera;
uniform sampler2D backbuffer;
#pragma glslify: rotate = require(./util/rotate.frag)
#pragma glslify: triNoise = require(./util/triNoise.frag)


float random(in vec2 p){
  return fract(sin(dot(vec2(21.324,435.454), p)) * 3249.042);
}

void main() {
    float t = mod(time * .4, .8);
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 uv = gl_FragCoord.xy / resolution;
    vec2 uv0 = uv;
    p *= .2;
    // uv = pow(uv. - .5, mod(time * .2, 1.9), 2.) + .5;

    // uv = rotate(uv, triNoise(uv, time * 2.2) * 2.);
    if (t < .5) {
        uv.x = fract(uv.x * 2.);
        // uv = rotate(uv, time);
    }
    if (t > .3) {
        uv.y = fract(uv.y * sin(time * 2. ) * 1.8) + mod(time, .8);
    }
    // if (mod(time, .9) < .2) {
    //
    // }

    uv = (uv - .5) * (uv - .3) * .8;

    uv = fract(uv);

    p = sin(abs(p*p));
    // p = rotate(p, sin(time* 2.) + triNoise(uv, time) * 20.);
    // p = abs(p);
    // uv = abs(rotate(uv - .5, sin(time * .2)) + .5);
//
    gl_FragColor = vec4(1);
    // gl_FragColor = texture2D(camera, uv);
    // gl_FragColor = fract(texture2D(camera, p) * 3. + time * .2);
    // gl_FragColor = fract(texture2D(camera, p*p));
    // gl_FragColor /= fract(texture2D(v1, uv) * 1.);
    // gl_FragColor = .87 - fract(texture2D(v1, uv)*10.) * 2. + texture2D(v2, uv);
    gl_FragColor = texture2D(v1, uv) + texture2D(v2, uv);
//
    // gl_FragColor = fract(gl_FragColor * sin(time * .3) * 20.);
    //

    if (t < .7) {
        gl_FragColor.r /= texture2D(backbuffer, fract(uv0 + random(vec2(time + uv0.y * .002)) * 20.)).b;
    }
    // gl_FragColor.r = texture2D(backbuffer, uv0 + .02).b;
}
