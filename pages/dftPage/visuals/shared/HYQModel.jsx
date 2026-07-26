import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import hyqModelUrl from "/src/assets/models/HYQModels/DFTPageLandingHYQAnimation.glb?url";

export default function HYQModel({
    animate = false,
    densityOpacity = 0.28,
    densityColor = "#7446B8",
    rotation = [0, 0, 0],
    position = [0, 0, 0],
    scale = 1,
}) {
    const { scene } = useGLTF(hyqModelUrl);
    const model = useMemo(() => scene.clone(true), [scene]);
    const modelRoot = useRef(null);

    useLayoutEffect(() => {
        const densityMaterials = [];

        model.traverse((object) => {
            if (!object.isMesh) return;

            const isDensity =
                object.name === "ElectronDensity" ||
                object.material?.name === "ElectronCloud";

            if (!isDensity) return;

            const material = object.material.clone();

            material.name = "ElectronCloud_Web";
            material.transparent = true;
            material.opacity = densityOpacity;
            material.depthWrite = false;
            material.color.set(densityColor);
            material.needsUpdate = true;

            object.material = material;
            object.renderOrder = 2;

            densityMaterials.push(material);
        });

        return () => {
            densityMaterials.forEach((material) => material.dispose());
        };
    }, [model, densityColor, densityOpacity]);

    useFrame((_, delta) => {
        if (!animate || !modelRoot.current) return;

        modelRoot.current.rotation.y += delta * 0.12;
    });

    return (
        <group
            ref={modelRoot}
            rotation={rotation}
            position={position}
            scale={scale}
        >
            <primitive object={model} dispose={null} />
        </group>
    );
}

useGLTF.preload(hyqModelUrl);