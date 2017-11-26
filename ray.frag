/*{
    "pixelRatio": 1,
    "glslify": true,
    "IMPORTED": {
        "v1": {
          "PATH": "./vj/beeple/beeple00022.mp4",
        },
        "v2": {
          "PATH": "./vj/beeple/beeple00172.mp4",
        },
    }

}*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D v1;
uniform sampler2D v2;
uniform sampler2D v3;

const float PI = 3.1415926535897932384626433;
vec2 map(vec3 p);
#pragma glslify: square = require('glsl-square-frame')
#pragma glslify: camera = require('glsl-camera-ray')
#pragma glslify: raytrace = require('glsl-raytrace', map = map, steps = 30)
#pragma glslify: getNormal = require('glsl-sdf-normal', map = map)
#pragma glslify: sdTorus = require('glsl-sdf-primitives/sdTorus')
#pragma glslify: sdBox = require('glsl-sdf-primitives/sdBox')
// #pragma glslify: noise = require('glsl-noise/sdBox')
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: triNoise = require(./util/triNoise.frag)


float t(){
    return time * 1.;
}
vec4 noises(in vec2 uv) {
    return vec4(
        // triNoise(uv *3.7, time*7.),
        // triNoise(uv* 3., time*3.5),
        // triNoise(uv* 2., time*10.5),
        snoise3(vec3(uv * 10., time*3.97)) * .7,
        snoise3(vec3(uv * 20.8, time*3.93)) * .7,
        snoise3(vec3(uv * .7, time*4.31)),
        1.
    );
}
vec2 rotate(in vec2 p, in float t) {
    return mat2(
        sin(t), -cos(t),
        cos(t), -sin(-t)
    ) * p;
}

vec2 map(vec3 p) {
    // float t = abs(sin(time *.3) * cos(time * .2)) * 3.;
    float p2 = snoise3(p * 3.) * .2;
    float t = 1.9;
    p = mod(p, t * 2.) - t;
    p.x *= sin(time * .1);
    p.y *= fract(time*.2);
    // p += p2;

    return vec2(sdBox(p2, vec3(.2)), 1.);
    // float windows = length(p) - 1.;
    // return vec2(windows, 1.);
}

void main (void) {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 uv = gl_FragCoord.xy / resolution;
 p *= p;
    vec3 rayOrigin = vec3(0, 0, 10);
    vec3 rayTarget = vec3(0, 0, 99999999);
    rayOrigin.z -= time*10.;
    vec3 rayDirection = camera(rayOrigin, rayTarget, square(resolution), 2.);
    rayDirection.xy = rotate(rayDirection.xy, time*.08 +sin(rayDirection.z*2.+time*.7)*.9);
    rayDirection.x += sin(time * 1.3) * .2;
    rayDirection.y += cos(time *3) * .3;

    vec3 lightDir = normalize(vec3(0, 2, 1.));
    vec3 light = vec3(.7, .4, 0.83) * 1.;
    vec3 ambient = vec3(.6, .8, .3) *.1;

    vec2 collision = raytrace(rayOrigin, rayDirection, 20., 0.1);
    if (collision.x > -.5) {
        vec3 pos = rayOrigin + rayDirection * collision.x;
        vec3 normal = getNormal(pos);
        float diff = clamp(dot(lightDir, normal), 0., 3.0);
        vec3 c = diff * light + ambient;

        gl_FragColor = vec4(c, 1.0) + texture2D(backbuffer) * .7;
        gl_FragColor *= noises(uv*.3) * 7. +.8　* (step(.2, mod(time*2., .4)) +.2);
    }
    else {
        gl_FragColor = texture2D(v1, uv);
    }
}
