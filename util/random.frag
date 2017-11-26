float random(in vec2 p){
  return fract(sin(dot(vec2(21.324,435.454), p)) * 3249.042);
}

#pragma glslify: export(random)
