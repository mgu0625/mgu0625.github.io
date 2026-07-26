import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds } from "@react-three/drei";
import { InlineMath } from "react-katex";

import HYQModel from "/pages/dftPage/visuals/shared/HYQModel";
import "./HYQDensityVisual.css";

const COLLEAGUE_VISUAL_STATES = [
    {
        densityOpacity: 0.05,
        overlay: "coordinates",
    },
    {
        densityOpacity: 0.34,
        overlay: "density",
    },
    {
        densityOpacity: 0.34,
        overlay: "potentials",
    },
];

const COLLEAGUE_STEPS = [
    {
        notation: String.raw`\Psi(x_1,\ldots,x_N)`,
    },
    {
        notation: String.raw`\rho(\mathbf{r})`,
    },
    {
        notation: String.raw`V_{\mathrm{eff}}(\mathbf{r})`,
    },
];


function clampTheoryIndex(index) {
    return Math.min(
        Math.max(index ?? 0, 0),
        COLLEAGUE_STEPS.length - 1
    );
}

function ManyElectronOverlay() {
    return (
        <svg
            className="
                dft-theory-visual-overlay
                dft-theory-visual-overlay--interactions
            "
            viewBox="0 0 100 100"
            aria-hidden="true"
        >
            <g className="dft-interaction-network">
                <path d="M27 39 Q50 19 72 38" />
                <path d="M27 39 Q42 62 70 62" />
                <path d="M72 38 Q55 58 30 65" />
                <path d="M30 65 Q53 81 70 62" />

                <circle cx="27" cy="39" r="1.5" />
                <circle cx="72" cy="38" r="1.5" />
                <circle cx="30" cy="65" r="1.5" />
                <circle cx="70" cy="62" r="1.5" />
            </g>
        </svg>
    );
}

function DensityScanOverlay() {
    return (
        <div
            className="
                dft-theory-visual-overlay
                dft-theory-visual-overlay--density
            "
            aria-hidden="true"
        >
            <span className="dft-density-scan-line" />
        </div>
    );
}

function KohnShamPotentialOverlay() {
    return (
        <div
            className="
                dft-theory-visual-overlay
                dft-theory-visual-overlay--ks
            "
        >
            <svg
                className="dft-ks-potential-lines"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d="M28 69 Q38 61 48 57" />
                <path d="M50 72 L50 58" />
                <path d="M72 69 Q62 61 52 57" />

                <circle cx="50" cy="56" r="1.4" />
            </svg>

            <div
                className="dft-colleague-overlay__potentials"
                aria-label="Components of the effective potential"
            >
                <span>
                    <InlineMath math={String.raw`V_{\mathrm{ext}}`} />
                </span>

                <span>
                    <InlineMath math={String.raw`V_{\mathrm{H}}`} />
                </span>

                <span>
                    <InlineMath math={String.raw`V_{\mathrm{XC}}`} />
                </span>
            </div>
        </div>
    );
}
function ColleagueOverlay({ theoryIndex }) {
    const activeStep = COLLEAGUE_STEPS[
        clampTheoryIndex(theoryIndex)
    ];

    return (
        <div className="dft-colleague-overlay">
            <div className="dft-colleague-overlay__notation">
                <InlineMath math={activeStep.notation} />
            </div>
        </div>
    );
}

function HYQCallouts() {
    return (
        <>
            <svg
                className="dft-hyq-callout-lines"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <polyline
                    className="
                        dft-hyq-callout-line
                        dft-hyq-callout-line--density
                    "
                    points="25,20 37,35"
                />

                <circle
                    className="
                        dft-hyq-callout-point
                        dft-hyq-callout-point--density
                    "
                    cx="37"
                    cy="35"
                    r="1.15"
                />

                <polyline
                    className="
                        dft-hyq-callout-line
                        dft-hyq-callout-line--molecule
                    "
                    points="75,85 57,59"
                />

                <circle
                    className="
                        dft-hyq-callout-point
                        dft-hyq-callout-point--molecule
                    "
                    cx="57"
                    cy="59"
                    r="1.15"
                />
            </svg>

            <span className="dft-hyq-callout dft-hyq-callout--density">
                Electron Density
            </span>

            <span className="dft-hyq-callout dft-hyq-callout--molecule">
                Molecule
            </span>
        </>
    );
}

function ColleagueFlow({ theoryIndex }) {
    const activeIndex = clampTheoryIndex(theoryIndex);

    return (
        <div
            className="dft-colleague-flow"
            data-active-step={activeIndex}
        >
            <svg
                className="dft-colleague-flow__lines"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <defs>
                    <marker
                        id="dft-colleague-arrow"
                        markerWidth="7"
                        markerHeight="7"
                        refX="5.5"
                        refY="3.5"
                        orient="auto"
                    >
                        <path
                            className="dft-colleague-flow__arrowhead"
                            d="M0,0 L7,3.5 L0,7 Z"
                        />
                    </marker>
                </defs>

                <path
                    className={[
                        "dft-colleague-flow__line",
                        activeIndex >= 1 ? "is-active" : "",
                    ].filter(Boolean).join(" ")}
                    d="M28 52 H39"
                    markerEnd="url(#dft-colleague-arrow)"
                />

                <path
                    className={[
                        "dft-colleague-flow__line",
                        activeIndex >= 2 ? "is-active" : "",
                    ].filter(Boolean).join(" ")}
                    d="M61 52 H72"
                    markerEnd="url(#dft-colleague-arrow)"
                />
            </svg>

            {COLLEAGUE_STEPS.map((step, index) => {
                const stateClass =
                    index === activeIndex
                        ? "is-active"
                        : index < activeIndex
                            ? "is-complete"
                            : "";

                return (
                    <div
                        key={step.id}
                        className={[
                            "dft-colleague-flow__node",
                            `dft-colleague-flow__node--${step.position}`,
                            stateClass,
                        ].filter(Boolean).join(" ")}
                    >
                        <span>{step.eyebrow}</span>
                        <strong>{step.title}</strong>
                        <code>{step.notation}</code>
                    </div>
                );
            })}

            <span className="dft-colleague-flow__bridge">
                same ground-state density
            </span>
        </div>
    );
}

export default function HYQDensityVisual({ mode, state }) {
    const isColleague = mode === "colleague";
    const theoryIndex = clampTheoryIndex(
        state?.theoryIndex
    );

    const visualState =
        COLLEAGUE_VISUAL_STATES[theoryIndex] ??
        COLLEAGUE_VISUAL_STATES[0];

    return (
        <div
            className={[
                "dft-chapter-hyq",
                isColleague
                    ? "dft-chapter-hyq--colleague"
                    : "dft-chapter-hyq--friends",
                isColleague
                    ? `is-theory-${theoryIndex}`
                    : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {!isColleague && (
                <span
                    className="dft-chapter-hyq__ring"
                    aria-hidden="true"
                />
            )}

            {isColleague && (
                <span
                    className="dft-colleague-halo"
                    aria-hidden="true"
                />
            )}

            <div
                className="dft-chapter-hyq__canvas"
                aria-hidden="true"
            >
                <Canvas
                    frameloop="demand"
                    dpr={[1, 1.5]}
                    camera={{
                        position: [0, 0, 8],
                        fov: 28,
                        near: 0.1,
                        far: 100,
                    }}
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: "high-performance",
                    }}
                >
                    <ambientLight intensity={0.85} />

                    <directionalLight
                        position={[4, 5, 7]}
                        intensity={3.6}
                    />

                    <directionalLight
                        position={[-4, 1, 5]}
                        color="#9B5CFF"
                        intensity={0.65}
                    />

                    <directionalLight
                        position={[0, -4, 4]}
                        color="#C19A3F"
                        intensity={0.45}
                    />

                    <Suspense fallback={null}>
                        <Bounds
                            fit
                            clip
                            observe
                            margin={isColleague ? 1.1 : 1.18}
                        >
                            <HYQModel
                                densityOpacity={visualState.densityOpacity}
                                rotation={[0.12, -0.08, -0.05]}
                            />
                        </Bounds>
                    </Suspense>
                </Canvas>
            </div>

            {isColleague && visualState.overlay === "coordinates" && (
                <ManyElectronOverlay />
            )}

            {isColleague && visualState.overlay === "density" && (
                <DensityScanOverlay />
            )}

            {isColleague && visualState.overlay === "potentials" && (
                <KohnShamPotentialOverlay />
            )}

            {isColleague ? (
                <ColleagueOverlay
                    theoryIndex={theoryIndex}
                />
            ) : (
                <HYQCallouts />
            )}
        </div>
    );
}