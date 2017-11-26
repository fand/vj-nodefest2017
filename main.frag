/*{
    // "server": 3000,
    "pixelRatio": 1,
    "vertexCount": 30,
    "vertexMode": "LINE_LOOP",
    //"vertexMode": "TRI_FAN",
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

void main() {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 uv = gl_FragCoord.xy / resolution;
    p *= .9;
    p = sin(abs(p));

    gl_FragColor = vec4(1);
    gl_FragColor.gb = texture2D(renderBuffer, p).gb * 4.;
    gl_FragColor.r = texture2D(backbuffer, uv + .003).b;
    gl_FragColor *= sin(time) * .2 + .4;
}
