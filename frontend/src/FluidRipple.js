import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FluidRipple = () => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const bufferRef = useRef(null);
  const bufferSceneRef = useRef(null);
  const bufferCameraRef = useRef(null);

  // Vertex shader for both passes
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader for buffer pass (simulation)
  const bufferFragmentShader = `
    uniform sampler2D pressureTexture;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform float time;
    varying vec2 vUv;

    const float delta = 1.0;
    const float damping = 0.999;
    const float spring = 0.005;
    const float velocityDamping = 0.002;

    void main() {
      vec2 uv = vUv;
      vec2 fragCoord = uv * resolution;
      vec2 center = mouse * resolution;
      
      // Sample current pressure and velocity
      vec4 current = texture2D(pressureTexture, uv);
      float pressure = current.x;
      float pVel = current.y;
      
      // Sample neighboring pressures
      float p_right = texture2D(pressureTexture, uv + vec2(1.0/resolution.x, 0.0)).x;
      float p_left = texture2D(pressureTexture, uv - vec2(1.0/resolution.x, 0.0)).x;
      float p_up = texture2D(pressureTexture, uv + vec2(0.0, 1.0/resolution.y)).x;
      float p_down = texture2D(pressureTexture, uv - vec2(0.0, 1.0/resolution.y)).x;
      
      // Handle boundaries
      if (fragCoord.x <= 1.0) p_left = p_right;
      if (fragCoord.x >= resolution.x - 1.0) p_right = p_left;
      if (fragCoord.y <= 1.0) p_down = p_up;
      if (fragCoord.y >= resolution.y - 1.0) p_up = p_down;
      
      // Apply wave equations
      pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
      pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;
      
      // Update pressure
      pressure += delta * pVel;
      
      // Apply spring motion
      pVel -= spring * delta * pressure;
      
      // Apply damping
      pVel *= 1.0 - velocityDamping * delta;
      pressure *= damping;
      
      // Add mouse interaction
      float dist = distance(fragCoord, center);
      if (dist <= 20.0) {
        pressure += 1.0 - dist / 20.0;
      }
      
      // Store pressure, velocity, and gradients
      gl_FragColor = vec4(pressure, pVel, (p_right - p_left) / 2.0, (p_up - p_down) / 2.0);
    }
  `;

  // Fragment shader for display pass
  const displayFragmentShader = `
    uniform sampler2D pressureTexture;
    uniform vec2 resolution;
    uniform float time;
    varying vec2 vUv;

    void main() {
      vec4 data = texture2D(pressureTexture, vUv);
      float pressure = data.x;
      vec2 gradient = data.zw;
      
      // Create modern tech background
      vec2 uv = vUv;
      vec2 center = vec2(0.5, 0.5);
      float dist = length(uv - center);
      
      // Create grid pattern
      float grid = sin(uv.x * 20.0) * sin(uv.y * 20.0);
      grid = smoothstep(0.0, 0.1, grid);
      
      // Create tech circles
      float circles = 0.0;
      for(float i = 1.0; i < 4.0; i++) {
        float radius = 0.2 + i * 0.1;
        float circle = smoothstep(radius, radius - 0.01, dist);
        circles += circle * 0.2;
      }
      
      // Add some movement
      float movement = sin(time * 0.5 + uv.x * 10.0) * 0.5 + 0.5;
      
      // Create base color
      vec3 baseColor = vec3(0.1, 0.2, 0.3); // Dark blue-gray
      vec3 accentColor = vec3(0.0, 0.5, 1.0); // Bright blue
      
      // Combine effects
      vec3 color = mix(baseColor, accentColor, grid * 0.3 + circles * 0.5);
      color += accentColor * movement * 0.1;
      
      // Add wave effect
      float wave = pressure * 0.5 + 0.5;
      vec2 distortedUV = uv + gradient * 0.05;
      color += accentColor * wave * 0.3;
      
      // Add subtle glow
      float glow = smoothstep(0.5, 0.0, dist);
      color += accentColor * glow * 0.2;
      
      // Output final color
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scenes
    const scene = new THREE.Scene();
    const bufferScene = new THREE.Scene();
    sceneRef.current = scene;
    bufferSceneRef.current = bufferScene;

    // Setup cameras
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    const bufferCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.z = 1;
    bufferCamera.position.z = 1;
    cameraRef.current = camera;
    bufferCameraRef.current = bufferCamera;

    // Setup renderers
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    const bufferRenderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bufferRenderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x001a33, 1); // Dark blue background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create buffer texture
    const bufferTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    bufferRef.current = bufferTexture;

    // Create plane geometries
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Create materials
    const bufferMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pressureTexture: { value: null },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        mouse: { value: new THREE.Vector2(0.5, 0.5) },
        time: { value: 0 }
      },
      vertexShader,
      fragmentShader: bufferFragmentShader
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pressureTexture: { value: bufferTexture.texture },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 0 }
      },
      vertexShader,
      fragmentShader: displayFragmentShader
    });

    // Create meshes
    const bufferMesh = new THREE.Mesh(geometry, bufferMaterial);
    const displayMesh = new THREE.Mesh(geometry, displayMaterial);
    bufferScene.add(bufferMesh);
    scene.add(displayMesh);

    // Handle mouse movement
    const handleMouseMove = (event) => {
      previousMousePosition.current = { ...mousePosition.current };
      mousePosition.current = {
        x: event.clientX / window.innerWidth,
        y: 1.0 - (event.clientY / window.innerHeight)
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update uniforms
      if (bufferMaterial.uniforms) {
        bufferMaterial.uniforms.time.value += 0.01;
        bufferMaterial.uniforms.mouse.value.set(
          mousePosition.current.x,
          mousePosition.current.y
        );
        bufferMaterial.uniforms.pressureTexture.value = bufferTexture.texture;
      }
      if (displayMaterial.uniforms) {
        displayMaterial.uniforms.time.value += 0.01;
      }

      // Render to buffer
      bufferRenderer.setRenderTarget(bufferTexture);
      bufferRenderer.render(bufferScene, bufferCamera);
      bufferRenderer.setRenderTarget(null);

      // Render to screen
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      bufferRenderer.setSize(width, height);
      bufferTexture.setSize(width, height);

      if (bufferMaterial.uniforms) {
        bufferMaterial.uniforms.resolution.value.set(width, height);
      }
      if (displayMaterial.uniforms) {
        displayMaterial.uniforms.resolution.value.set(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      bufferTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default FluidRipple; 