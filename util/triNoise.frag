mat2 mm2(in float a){float c = cos(a), s = sin(a);return mat2(c,s,-s,c);}
mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);
float tri(in float x){return clamp(abs(fract(x)-.5),0.01,0.49);}
vec2 tri2(in vec2 p){return vec2(tri(p.x)+tri(p.y),tri(p.y+tri(p.x)));}

float triNoise(in vec2 p, float spd){
  float z=1.8;
  float z2=2.5;
  float rz = 0.;
  p *= mm2(p.x*0.06);
  vec2 bp = p;
  for (float i=0.; i<5.; i++ )
  {
    vec2 dg = tri2(bp*1.85)*.75;
    dg *= mm2(spd);
    p -= dg/z2;

    bp *= 1.3;
    z2 *= .45;
    z *= .42;
    p *= 1.21 + (rz-1.0)*.02;

    rz += tri(p.x+tri(p.y))*z;
    p*= -m2;
  }
  return clamp(1./pow(rz*29., 1.3),0.,.55);
}

#pragma glslify: export(triNoise)
