/*{
    "pixelRatio": 1,
    "vertexCount": 300,
    "vertexMode": "LINES",
}*/
precision mediump float;
attribute float vertexId;
uniform float vertexCount;
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
varying vec4 v_color;

void main() {
  float t = time * .1;
  float i = vertexId * 2.2 + sin(vertexId) * 1.3;

  vec3 pos = vec3(
    sin(t + vertexId + i * .1) * sin(t * 1.81 + i) * 3.,
    cos(t + vertexId - i * 8.2) * cos(t * 1.19 + i) * 2.,
    cos(t + i) * sin(t + vertexId * 9.22)
  );

  gl_Position = vec4(pos.x, pos.y * resolution.x / resolution.y, pos.z * .1, 1);
  gl_PointSize = 1.4 / max(abs(pos.z), .1);

  v_color = vec4(
    fract(pos.x + i),
    fract(pos.y + i),
    fract(pos.z + i),
    1
  );
}
