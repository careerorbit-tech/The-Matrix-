import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, MeshDistortMaterial, Float, MeshWobbleMaterial, ContactShadows, Text, Center } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

function FacetedOrb() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Rotate based on frame
    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = t * 0.2;
        meshRef.current.rotation.y = t * 0.3;

        // Subtle float
        meshRef.current.position.y = Math.sin(t) * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.05 : 1}
            >
                <icosahedronGeometry args={[2.2, 0]} />
                <meshStandardMaterial
                    color={hovered ? "#d48d5e" : "#8b5cf6"}
                    metalness={0.9}
                    roughness={0.1}
                    flatShading={true}
                    emissive={hovered ? "#d48d5e" : "#4a90e2"}
                    emissiveIntensity={hovered ? 0.5 : 0.2}
                />
            </mesh>
        </Float>
    );
}

function OrbitRing({ radius, speed, rotationX, rotationY, color }: { radius: number; speed: number; rotationX: number; rotationY: number; color: string }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.z = state.clock.getElapsedTime() * speed;
    });

    return (
        <group rotation={[rotationX, rotationY, 0]}>
            <mesh ref={ref as any}>
                <torusGeometry args={[radius, 0.015, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />

                {/* Small detail on ring */}
                <mesh position={[radius, 0, 0]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            </mesh>
        </group>
    );
}

function Particles({ count = 100 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 15;
            p[i * 3 + 1] = (Math.random() - 0.5) * 15;
            p[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return p;
    }, [count]);

    const ref = useRef<THREE.Points>(null);
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.5} />
        </points>
    );
}

export function CosmicScene() {
    return (
        <div className="w-full h-[650px] cursor-grab active:cursor-grabbing">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#8b5cf6" />

                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                    <FacetedOrb />
                </Float>

                <OrbitRing radius={3.5} speed={0.5} rotationX={Math.PI / 2.5} rotationY={0} color="#8b5cf6" />
                <OrbitRing radius={4.2} speed={-0.3} rotationX={-Math.PI / 4} rotationY={Math.PI / 6} color="#d48d5e" />

                <Particles count={250} />

                <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                <Environment preset="city" />

                {/* Interaction controls - subtle and constrained */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.5}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
