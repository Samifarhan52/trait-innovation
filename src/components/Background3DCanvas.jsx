import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    currentMount.appendChild(renderer.domElement);

    // FLOATING 3D PARTICLES
    const particlesCount = 800;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(0x0066ff);
    const color2 = new THREE.Color(0x00f0ff);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = (Math.random() - 0.5) * 60;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // FLOWING 3D TRAJECTORY CURVE
    const curvePoints = [];
    for (let i = 0; i < 15; i++) {
      curvePoints.push(
        new THREE.Vector3(
          Math.sin(i * 0.5) * 12,
          (i - 7) * 4,
          Math.cos(i * 0.5) * 10
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const curveGeometry = new THREE.TubeGeometry(curve, 100, 0.08, 8, false);
    const curveMaterial = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const trajectoryMesh = new THREE.Mesh(curveGeometry, curveMaterial);
    scene.add(trajectoryMesh);

    // SCROLL LISTENER FOR DYNAMIC CAMERA SHIFT
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // RENDER LOOP
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate particle system slowly
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      // Trajectory wave
      trajectoryMesh.rotation.y = elapsedTime * 0.05;
      trajectoryMesh.rotation.z = Math.sin(elapsedTime * 0.04) * 0.2;

      // Scroll response
      camera.position.y = -scrollY * 0.005;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
