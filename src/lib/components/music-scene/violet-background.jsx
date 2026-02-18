import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec3 black = vec3(0.0, 0.0, 0.0);
    vec3 violet = vec3(0.35, 0.18, 1.0); // #5B2EFF

    float gradient = smoothstep(0.0, 0.4, vUv.y); 
    vec3 color = mix(violet, black, gradient);

    float noise = random(vUv * uTime);
    color += (noise - 0.5) * 0.02;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const VioletBackground = () => {
  const mesh = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state, delta) => {
    if (mesh.current) {
        mesh.current.material.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export default VioletBackground;
