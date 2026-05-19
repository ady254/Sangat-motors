"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeCar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();

    // --- CAMERA SETUP ---
    // Start with a top-down view looking straight down (matching the reference image)
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 10, 0); // Top-down
    camera.lookAt(0, 0, 0);

    // --- RENDERER SETUP ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 12, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    // Dynamic light matching brand orange underglow
    const underglowLight = new THREE.PointLight(0xff5a1f, 3, 5);
    underglowLight.position.set(0, -0.4, 0);
    scene.add(underglowLight);

    // --- MATERIALS ---
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6, // Metallic silver/white
      metalness: 0.9,
      roughness: 0.15,
      flatShading: false,
    });

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.8,
      roughness: 0.4,
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.9,
      roughness: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.8,
      metalness: 0.1,
    });

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      metalness: 1.0,
      roughness: 0.2,
    });

    const orangeAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5a1f, // Brand orange accent
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xff5a1f,
      emissiveIntensity: 0.2,
    });

    const lightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const tailLightMaterial = new THREE.MeshBasicMaterial({
      color: 0xef4444,
    });

    // --- CAR GROUP BUILD ---
    const carGroup = new THREE.Group();

    // 1. Undercarriage/Chassis
    const chassisGeom = new THREE.BoxGeometry(1.8, 0.2, 4.2);
    const chassis = new THREE.Mesh(chassisGeom, carbonMaterial);
    chassis.position.y = 0.1;
    chassis.receiveShadow = true;
    chassis.castShadow = true;
    carGroup.add(chassis);

    // 2. Main Body (Lower Half)
    const bodyGeom = new THREE.BoxGeometry(1.78, 0.5, 4.0);
    // Round the front and back slightly by scaling vertices
    const body = new THREE.Mesh(bodyGeom, bodyMaterial);
    body.position.y = 0.4;
    body.castShadow = true;
    carGroup.add(body);

    // Sloped Hood Front
    const hoodGeom = new THREE.BoxGeometry(1.76, 0.35, 1.4);
    const hood = new THREE.Mesh(hoodGeom, bodyMaterial);
    hood.position.set(0, 0.4, 1.3);
    hood.rotation.x = -0.15; // Sloped down
    hood.castShadow = true;
    carGroup.add(hood);

    // 3. Cabin (Upper Half with Windows)
    const cabinGeom = new THREE.BoxGeometry(1.4, 0.5, 2.0);
    const cabin = new THREE.Mesh(cabinGeom, bodyMaterial);
    cabin.position.set(0, 0.85, -0.2);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Windshield (Front Glass)
    const windshieldGeom = new THREE.BoxGeometry(1.36, 0.45, 0.8);
    const windshield = new THREE.Mesh(windshieldGeom, glassMaterial);
    windshield.position.set(0, 0.82, 0.75);
    windshield.rotation.x = -0.6; // Sloped windshield
    carGroup.add(windshield);

    // Rear Windshield
    const rearGlassGeom = new THREE.BoxGeometry(1.36, 0.45, 0.8);
    const rearGlass = new THREE.Mesh(rearGlassGeom, glassMaterial);
    rearGlass.position.set(0, 0.82, -1.15);
    rearGlass.rotation.x = 0.6;
    carGroup.add(rearGlass);

    // Side Windows
    const sideGlassLGeom = new THREE.BoxGeometry(0.1, 0.38, 1.6);
    const sideGlassL = new THREE.Mesh(sideGlassLGeom, glassMaterial);
    sideGlassL.position.set(0.66, 0.82, -0.2);
    carGroup.add(sideGlassL);

    const sideGlassRGeom = new THREE.BoxGeometry(0.1, 0.38, 1.6);
    const sideGlassR = new THREE.Mesh(sideGlassRGeom, glassMaterial);
    sideGlassR.position.set(-0.66, 0.82, -0.2);
    carGroup.add(sideGlassR);

    // 4. Wheels & Wheel Arches
    const wheelGroupF = new THREE.Group();
    const wheelGroupB = new THREE.Group();

    const wheelGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.35, 24);
    wheelGeom.rotateZ(Math.PI / 2);

    const createWheel = (x: number, y: number, z: number) => {
      const singleWheelGroup = new THREE.Group();
      singleWheelGroup.position.set(x, y, z);

      // Tire
      const tire = new THREE.Mesh(wheelGeom, tireMaterial);
      tire.castShadow = true;
      singleWheelGroup.add(tire);

      // Rim Center
      const rimGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.37, 16);
      rimGeom.rotateZ(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeom, rimMaterial);
      singleWheelGroup.add(rim);

      // Spokes (for rotation visibility)
      const spokeGeom = new THREE.BoxGeometry(0.06, 0.58, 0.08);
      for (let i = 0; i < 5; i++) {
        const spoke = new THREE.Mesh(spokeGeom, orangeAccentMaterial);
        spoke.rotation.x = (i * Math.PI) / 2.5;
        rim.add(spoke);
      }

      return singleWheelGroup;
    };

    const wheelFL = createWheel(0.9, 0.32, 1.2);
    const wheelFR = createWheel(-0.9, 0.32, 1.2);
    const wheelBL = createWheel(0.9, 0.32, -1.2);
    const wheelBR = createWheel(-0.9, 0.32, -1.2);

    carGroup.add(wheelFL, wheelFR, wheelBL, wheelBR);

    // 5. Headlights (Porsche circular headlights styling)
    const headlightLGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const headlightL = new THREE.Mesh(headlightLGeom, lightMaterial);
    headlightL.position.set(0.6, 0.5, 2.0);
    headlightL.scale.set(1, 1, 0.3);
    carGroup.add(headlightL);

    const headlightR = headlightL.clone();
    headlightR.position.x = -0.6;
    carGroup.add(headlightR);

    // Spotlights casting front beams
    const beamL = new THREE.SpotLight(0xffffff, 4, 15, Math.PI / 8, 0.5, 1);
    beamL.position.set(0.6, 0.5, 2.05);
    const targetL = new THREE.Object3D();
    targetL.position.set(0.6, 0.2, 8);
    scene.add(targetL);
    beamL.target = targetL;
    carGroup.add(beamL);

    const beamR = beamL.clone();
    beamR.position.x = -0.6;
    const targetR = new THREE.Object3D();
    targetR.position.set(-0.6, 0.2, 8);
    scene.add(targetR);
    beamR.target = targetR;
    carGroup.add(beamR);

    // 6. Tail lights
    const tailLightGeom = new THREE.BoxGeometry(1.4, 0.06, 0.1);
    const tailLight = new THREE.Mesh(tailLightGeom, tailLightMaterial);
    tailLight.position.set(0, 0.48, -2.01);
    carGroup.add(tailLight);

    // 7. Spoiler
    const spoilerStandsGeom = new THREE.BoxGeometry(0.08, 0.2, 0.1);
    const spoilerStandL = new THREE.Mesh(spoilerStandsGeom, carbonMaterial);
    spoilerStandL.position.set(0.5, 0.7, -1.8);
    carGroup.add(spoilerStandL);

    const spoilerStandR = spoilerStandL.clone();
    spoilerStandR.position.x = -0.5;
    carGroup.add(spoilerStandR);

    const spoilerWingGeom = new THREE.BoxGeometry(1.5, 0.05, 0.35);
    const spoilerWing = new THREE.Mesh(spoilerWingGeom, carbonMaterial);
    spoilerWing.position.set(0, 0.8, -1.8);
    spoilerWing.rotation.x = -0.08;
    carGroup.add(spoilerWing);

    // Center and rotate car to fit top-down view (car pointing straight up on screen)
    carGroup.rotation.y = Math.PI; // Face forward along Z axis
    scene.add(carGroup);

    // --- GRID FLOOR ---
    const gridHelper = new THREE.GridHelper(30, 30, 0xff5a1f, 0x374151);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // Subtle shadows plane
    const shadowPlaneGeom = new THREE.PlaneGeometry(10, 10);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.4 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeom, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.09;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    setLoading(false);

    // --- INTERACTIONS ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = Math.PI; // Face car forward initially
    let scrollPercent = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coords (-1 to +1)
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      scrollPercent = Math.min(scrollTop / docHeight, 1.0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // --- RENDER LOOP ---
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Spin tires based on elapsed time to feel active
      wheelFL.rotation.x += 0.05;
      wheelFR.rotation.x += 0.05;
      wheelBL.rotation.x += 0.05;
      wheelBR.rotation.x += 0.05;

      // Underglow pulse
      underglowLight.intensity = 3 + Math.sin(elapsedTime * 4) * 0.6;

      // Scroll-based rotation & position transitions
      // Scroll state controls camera & car posture:
      // At scrollPercent = 0: top-down view (camera.position.set(0, 10, 0))
      // As scrollPercent increases: Camera tilts down, car rotates to show profile.
      // We limit the scroll influence to the top section of the page (first 30% of scroll)
      const scrollFactor = Math.min(scrollPercent * 3.3, 1.0); // complete transformation quickly

      // Interpolate camera angle
      // Start (0): x=0, y=8, z=0.01 (top-down)
      // End (1): x=0, y=2.8, z=7.5 (front perspective)
      const camY = THREE.MathUtils.lerp(9.5, 2.5, scrollFactor);
      const camZ = THREE.MathUtils.lerp(0.01, 7.8, scrollFactor);
      camera.position.set(0, camY, camZ);
      camera.lookAt(0, 0.4, 0);

      // Mouse interactive tilt: sway the car slightly based on mouse
      // Interpolate targets
      targetRotationY = Math.PI + mouseX * 0.18 + scrollFactor * Math.PI * 0.35;
      targetRotationX = mouseY * 0.08 - scrollFactor * 0.05;

      carGroup.rotation.y = THREE.MathUtils.lerp(carGroup.rotation.y, targetRotationY, 0.06);
      carGroup.rotation.x = THREE.MathUtils.lerp(carGroup.rotation.x, targetRotationX, 0.06);

      // Float the car slightly to feel premium
      carGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(reqId);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden"
    >
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xs font-mono tracking-widest text-zinc-400">INITIALIZING 3D ENGINE...</p>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block touch-none z-0" />
      
      {/* Decorative Brand Text overlay */}
      <div className="absolute inset-x-0 bottom-4 flex justify-between px-6 pointer-events-none z-10 select-none">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500">CHASSIS: SP-911 METALLIC</span>
        <span className="text-[10px] font-mono tracking-widest text-orange-500/80 animate-pulse">ACTIVE 3D CONFIGURATOR</span>
        <span className="text-[10px] font-mono tracking-widest text-zinc-500">SCALE: 1:12 DIGITAL</span>
      </div>
    </div>
  );
}
