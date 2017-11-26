/*{
    "pixelRatio": 1,
    "glslify": true,
  // "server": 3000,
    "IMPORTED": {
      "v1": { "PATH": "./vj/beeple/beeple00014.mp4" },
    },
}*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D backbuffer;
uniform sampler2D v1;

const float PI = 3.1415926535897932384626433;
vec2 map(vec3 p);
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)
#pragma glslify: triNoise = require(./util/triNoise.frag)
#pragma glslify: random = require(./util/random.frag)

float ssnoise3(in vec3 p) {
  return (
    snoise3(p) +
    snoise3(vec3(p.xy*3.3 +.2, p.z +.1)) *.5 +
    snoise3(vec3(p.xy*8.3 +.2, p.z +.2)) * .3 +
    snoise3(vec3(p.xy*14.3 +.2, p.z +.8)) * .1
  );
}

vec4 noises(in vec2 uv) {
    // uv = sin(uv*uv);
    float l = length(uv - .5);
    // return vec4(
    //     // triNoise(uv * .7, time),
    //     // triNoise(uv* 2., time*1.5),
    //     // triNoise(uv* 2., time*1.5)
    //     // triNoise(uv * 2., time*1.5) * .9,
    //     // snoise3(vec3(uv * .7, time)),
    //     // snoise3(vec3(uv* 2., time*1.5)),
    //     // snoise3(vec3(uv * 2., time*1.5)) * .9,
    //     // l + snoise3(vec3(uv * .7, time*3.)),
    //     // // l + snoise3(vec3(uv* 2., time*1.5))*.3,
    //     // l + snoise3(vec3(uv * 2., time*3.5)),
    //     //  snoise3(vec3(uv * 2., time*1.5)),
    //
    //     // 1.,//triNoise(uv * 2.8, time*.93),
    //     1.
    // ) * 2.;

    vec4 c3 = vec4(.7, .3, 0., 1);
    // vec4 c2 = vec4(-0.0, .7, .7, 1);
    vec4 c2 = vec4(0.2, .7, -.2, 1);
    vec4 c1 = vec4(-0., .2, .5, 1);
    return (
      ssnoise3(vec3(uv*3., time*1.8)) * .4* c3 +
      triNoise(uv * 2.8, time*1.7) * c1 +
      triNoise(uv* 3.7, time*.8) * c3
    )*1.5;
}

vec2 rotate(in vec2 p, in float t) {
    return mat2(
        sin(t), -cos(t),
        cos(t), -sin(-t)
    ) * p;
}

// float random(in vec2 p){
//   return fract(sin(dot(21.324,435.454)) * 3249.042);
// }

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
vec2 uv0 = uv;
// uv.x += random(vec2(uv.y*.2, time*.02))*.02;
// uv.y += random(vec2(uv.x*.3, time*.02))*.02;
// uv.x += random(vec2(random(vec2(uv.y*10.2)), time*.02))*.02;
// uv.y += random(vec2(random(vec2(uv.x*.3)), time*.02))*.02;
    // uv.x += random(uv*.002)*.02;

    // uv = abs(uv - .5)+time * (step(.7, mod(time, 1.5)) +.2);

    uv.y -= time * .1;
    // uv.x *= cos(time * .4) +.8;

    // else {

    // uv = abs(uv - .5);
    // uv += rotate(uv, time* .3);
    // uv = rotate(uv - .5, time* .8) + .5;
    float l = length(uv - .5);
// uv = rotate(abs(uv - .5) - 1.2, -time * .1) + .5;



    // float t = mod(time, 1.5);
    // if (t < .9) {
    //     uv.y *= t;
    // }
    // // else if (t < .9) {
    // //     uv = (uv - .5) * (1. +t) + .5;
    // // }


    // }
    gl_FragColor = vec4(2);
    gl_FragColor = noises(uv) *.7;
    // gl_FragColor = 1. - ((((1. - fract(noises(uv)*fract(time * .4)*10.))))*10. -3.);



    // if(t > .8) {
    //     gl_FragColor *= step(.7, gl_FragColor);
    //
    // }

    // if (random(vec2(uv.y * .001, time * .2)) < .3) {
    //     gl_FragColor.b += texture2D(backbuffer, fract(uv + .2)).g;　//     gl_FragColor.b += texture2D(backbuffer, fract(uv + .2)).g;　
    // }

    // gl_FragColor.r += texture2D(v1, sin(uv*uv)).r;
    gl_FragColor += texture2D(backbuffer, uv0)*.1;
    // gl_FragColor += texture2D(backbuffer, uv * .9) *.4;

    // gl_FragColor = vec4(snoise2(uv * 10.1), 1., 1., 1.);
    //
    // if (random(vec2(uv0.y * .0003, time*.3)) < .03) {
    //   gl_FragColor.rg += 1.;
    // }

    // if (random(vec2(time*.4)) < .3) {
    //   gl_FragColor = texture2D(backbuffer, fract(uv0 * vec2(1, 1.4)));
    // }

    vec2 up = uv0 - .5;
    gl_FragColor += texture2D(backbuffer, rotate(up, .2) * .9+.5)*.4;

    // gl_FragColor *= fract(snoise3(vec3(uv.x * 13., uv.y * 2. - time *.1, uv.y))*3.) * 3.;

    // gl_FragColor -= .1 / length(uv0 - .5);



}
