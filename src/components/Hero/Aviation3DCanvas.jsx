import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Activity, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Aviation3DCanvas({ onNodeHover }) {
  const mountRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // LIGHTING FOR IRIDESCENT METALLIC AESTHETIC
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(12, 15, 12);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x0066ff, 6, 35);
    blueLight.position.set(-6, -4, 6);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 6, 30);
    cyanLight.position.set(6, 4, 6);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x6e00ff, 5, 30);
    violetLight.position.set(0, -6, -4);
    scene.add(violetLight);

    // AIRCRAFT ROOT GROUP
    const aircraftGroup = new THREE.Group();
    scene.add(aircraftGroup);

    // PROCEDURAL IRIDESCENT SUPERSONIC JET GEOMETRY
    const jetBodyGroup = new THREE.Group();
    aircraftGroup.add(jetBodyGroup);

    const pearlMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.1,
      transparent: true,
      opacity: 0.95,
      reflectivity: 0.9,
    });

    const cobaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      metalness: 0.8,
      roughness: 0.2,
    });

    const glowCyanMaterial = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    // Fuselage Nose Cone
    const noseGeo = new THREE.ConeGeometry(0.8, 5.0, 32);
    noseGeo.rotateX(Math.PI / 2);
    const noseMesh = new THREE.Mesh(noseGeo, pearlMaterial);
    noseMesh.position.set(0, 0, 3.8);
    jetBodyGroup.add(noseMesh);

    // Fuselage Body
    const bodyGeo = new THREE.CylinderGeometry(0.9, 1.0, 6.4, 32);
    bodyGeo.rotateX(Math.PI / 2);
    const bodyMesh = new THREE.Mesh(bodyGeo, pearlMaterial);
    bodyMesh.position.set(0, 0, -0.5);
    jetBodyGroup.add(bodyMesh);

    // Swept Delta Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(6.0, -4.0);
    wingShape.lineTo(5.6, -5.0);
    wingShape.lineTo(0, -2.4);
    wingShape.closePath();

    const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.18, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 });
    wingGeo.rotateX(Math.PI / 2);

    const rightWing = new THREE.Mesh(wingGeo, pearlMaterial);
    rightWing.position.set(0.4, 0, 1.0);
    jetBodyGroup.add(rightWing);

    const leftWing = new THREE.Mesh(wingGeo, pearlMaterial);
    leftWing.scale.set(-1, 1, 1);
    leftWing.position.set(-0.4, 0, 1.0);
    jetBodyGroup.add(leftWing);

    // Engine Nacelles
    const engineGeo = new THREE.CylinderGeometry(0.5, 0.5, 4.2, 32);
    engineGeo.rotateX(Math.PI / 2);
    
    const engineLeft = new THREE.Mesh(engineGeo, cobaltMaterial);
    engineLeft.position.set(-1.0, -0.2, -1.6);
    jetBodyGroup.add(engineLeft);

    const engineRight = new THREE.Mesh(engineGeo, cobaltMaterial);
    engineRight.position.set(1.0, -0.2, -1.6);
    jetBodyGroup.add(engineRight);

    // Wingtip Energy Spheres
    const tipGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const leftTip = new THREE.Mesh(tipGeo, glowCyanMaterial);
    leftTip.position.set(-6.2, 0, -3.0);
    jetBodyGroup.add(leftTip);

    const rightTip = new THREE.Mesh(tipGeo, glowCyanMaterial);
    rightTip.position.set(6.2, 0, -3.0);
    jetBodyGroup.add(rightTip);

    // HOLOGRAPHIC TELEMETRY ORBIT RINGS
    const ringGroup = new THREE.Group();
    aircraftGroup.add(ringGroup);

    const createRing = (radius, tiltX, tiltY, colorHex) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineDashedMaterial({
        color: colorHex,
        dashSize: 0.4,
        gapSize: 0.2,
        linewidth: 1,
        transparent: true,
        opacity: 0.5,
      });
      const line = new THREE.Line(ringGeo, ringMat);
      line.computeLineDistances();
      line.rotation.x = tiltX;
      line.rotation.y = tiltY;
      return line;
    };

    const ring1 = createRing(8.0, Math.PI / 3, Math.PI / 8, 0x0066ff);
    const ring2 = createRing(9.6, Math.PI / 2.5, -Math.PI / 6, 0x00f0ff);
    ringGroup.add(ring1, ring2);

    // INTERACTIVE AI NODES
    const nodeDefinitions = [
      { id: 'avionics', title: 'Autonomous Avionics', pos: [-4.6, 2.8, 1.5], metric: '99.98% Precision' },
      { id: 'telemetry', title: 'Neural Fleet Telemetry', pos: [4.8, 2.2, -1.0], metric: '48.2 TB/sec' },
      { id: 'optimization', title: 'Thrust Optimization', pos: [-4.2, -2.5, 0.5], metric: '-18.4% Fuel' },
    ];

    const nodeMeshes = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    nodeDefinitions.forEach((def) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...def.pos);

      const sphereGeo = new THREE.SphereGeometry(0.25, 32, 32);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0x0066ff });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = def;

      const pulseGeo = new THREE.RingGeometry(0.35, 0.5, 32);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);

      nodeGroup.add(sphereMesh, pulseMesh);
      aircraftGroup.add(nodeGroup);
      nodeMeshes.push({ sphere: sphereMesh, pulse: pulseMesh, def });
    });

    // MOUSE INTERTIA PARALLAX
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetX = x * 0.4;
      targetY = y * 0.3;
      mouse.x = x;
      mouse.y = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // CONTINUOUS ORGANIC LEVITATION DRIFT (LEFT-RIGHT + UP-DOWN MOTION LIKE REFERENCE IMAGE!)
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // CONTINUOUS ORGANIC DRIFT (UP-DOWN & LEFT-RIGHT)
      aircraftGroup.position.x = Math.sin(elapsedTime * 0.8) * 0.8 + targetX;
      aircraftGroup.position.y = Math.cos(elapsedTime * 1.1) * 0.6 + targetY;
      aircraftGroup.rotation.z = Math.sin(elapsedTime * 0.6) * 0.08;
      aircraftGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.06;
      aircraftGroup.rotation.y = elapsedTime * 0.15;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;

      // Raycasting hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.sphere));

      if (intersects.length > 0) {
        const hoveredData = intersects[0].object.userData;
        currentMount.style.cursor = 'pointer';
        setActiveNode(hoveredData);
        if (onNodeHover) onNodeHover(hoveredData);
      } else {
        currentMount.style.cursor = 'default';
        setActiveNode(null);
        if (onNodeHover) onNodeHover(null);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[600px]">
      <div ref={mountRef} className="w-full h-full" />

      {/* FLOATING GLASS ANALYTICS CARD NEXT TO 3D VISUAL (MATCHING REFERENCE IMAGE!) */}
      <div className="absolute top-12 right-4 md:right-8 glass-panel p-4 rounded-2xl border border-slate-200/90 shadow-xl shadow-brand-500/5 max-w-xs animate-float pointer-events-none">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            REAL-TIME INSIGHTS
          </span>
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
          99.8%
        </div>
        <div className="text-xs text-slate-500 font-medium mt-0.5">Neural Precision Accuracy</div>
      </div>

      {/* ACTIVE HOVER DIALOG */}
      {activeNode && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-80 p-5 rounded-2xl glass-panel text-slate-900 border border-brand-500/40 shadow-2xl animate-in fade-in duration-300 pointer-events-none">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
            <span className="text-[10px] font-mono text-brand-500 uppercase tracking-widest font-bold">
              NODE ACTIVE
            </span>
            <span className="text-xs font-mono text-slate-500">{activeNode.metric}</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">{activeNode.title}</h4>
        </div>
      )}
    </div>
  );
}
