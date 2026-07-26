export const PAGE_META = [
    [
        "Focus",
        "Hydroquinone, DFT, TDDFT, PCET, and organic radical behavior",
    ],
    [
        "Qualification",
        "M.S. & B.S. in Chemistry, with a focus in Photochemical Science",
    ],
    [
        "Tools",
        "ORCA 6, Avogadro, Chimera, VMD, Python, Blender, Three.js, and React",
    ],
    [
        "Project Purpose",
        "Investigate hydroquinone’s role as a quenching agent in PCET reactions and translate the calculation outputs into visual and auditory experiences.",
    ],
];

export const CHAPTERS = [
    {
        id: "density",
        nav: "DFT",
        number: "01",
        content: {
            friends: {
                eyebrow: "Why DFT exists",
                title: "Studying Complex Systems\nWithout Tracking\nEvery Detail",
                summary: "Electrons influence properties and behavior of one another. Therefore, a complete many-electron (or complex system mechanistic) description becomes difficult very quickly. Density Functional Theory (DFT) replaces that overwhelming task with a more manageable map of where electron density is distributed.",
            },
            colleague: {
                eyebrow: "Density Functional Theory",
                title: "From Wavefunctions to\nElectron Density",
                summary: "Molecular states and their energies arise from a system’s electronic structure, which is formally described by the many-electron wavefunction obtained from the Schrödinger equation. Because this wavefunction becomes too complex to solve directly for most molecules, density functional theory uses the electron density as a more manageable central variable for interpreting experiments, comparing structures, and predicting chemical behavior.",
            },
        },
    },
    {
        id: "pcet",
        nav: "PCET",
        number: "02",
        visual: "Electron + proton motion",
        content: {
            friends: {
                eyebrow: "Why hydroquinone matters",
                title: "Coupled Entwinement of\nElectron and Proton",
                summary: `DFT helps us predict electron behavior in chemical reactions. PCET (proton-coupled electron transfer) looks at what happens when an electron and a proton move "at the same time". Under specific conditions, the finalized radicals can find stability long enough to study its thermodynamic and photophysical behavior. Nature uses this strategy in photosynthesis, water oxidation, and many other energy-changing reactions.`,
            },
            colleague: {
                eyebrow: "Proton-coupled electron transfer",
                title: "Proton-Coupled Reality",
                summary: "DFT describes how electronic structure shapes molecular properties. Proton-coupled electron transfer, or PCET, applies this relationship to reactions in which electron and proton movement are linked. This coupling can prevent unstable charge buildup and lower the energetic cost of redox chemistry. It is central to photosynthesis, water oxidation, and many catalytic and biological processes.",
            },
        },
    },
    {
        id: "orca",
        nav: "ORCA",
        number: "03",
        visual: "Question → model → evidence",
        content: {
            friends: {
                eyebrow: "The calculation engine",
                title: "From Molecular Sketch to\nUnderstandable Evidence",
                summary: "ORCA is a quantum-chemistry program that helps us explore molecular structures, energies, spectra, and electron behavior using calculations. Programs such as Avogadro make it possible to build and inspect a molecule before the calculation begins, while Chimera helps turn the finished data into structures, surfaces, and other visuals we can examine. Because these tools are open-source, free for academic use, or accessible for noncommercial work, they lower the barrier to scientific research and give curious learners a way to investigate questions that might otherwise require expensive software.",
            },
            colleague: {
                eyebrow: "ORCA 6 workflow",
                title: "From Molecular Model Construction to\nValidated Computational Evidence",
                summary: "ORCA is a quantum-chemistry program used to calculate molecular structures, electronic states, spectra, and other properties that cannot be observed directly. Alongside programs such as Avogadro, which helps researchers build and inspect molecular structures, and Chimera, which helps visualize calculated structures and density data, these softwares create accessible paths from a chemical question to a testable computational model. Because these tools are open-source, free for academic use, or free for noncommercial use, they support both formal research and the curiosity-driven exploration that often leads to new questions.",
            },
        },
    },
    {
        id: "evidence",
        nav: "HYQ Evidence",
        number: "04",
        visual: "Calculated HYQ properties",
        content: {
            friends: {
                eyebrow: "My HYQ calculations",
                title: "What can one small molecule reveal?",
                summary: "The same HYQ model can be examined from several angles: its relaxed structure, how it vibrates, how it absorbs light, and where unpaired spin appears after oxidation. Together, those views connect molecular structure to properties that experiments can observe.",
            },
            colleague: {
                eyebrow: "HYQ computational evidence",
                title: "Geometry, vibrational, excited-state, and radical-state results",
                summary: "The calculation set connects an optimized ground-state structure with normal-mode validation, functional-dependent TDDFT transitions, and an open-shell radical model. The goal is not to claim a complete bimolecular mechanism, but to establish molecular evidence relevant to HYQ participation in PCET.",
            },
        },
    },
    {
        id: "meaning",
        nav: "Meaning",
        number: "05",
        visual: "Evidence with limits",
        content: {
            friends: {
                eyebrow: "Interpretation",
                title: "What does the computation let us say?",
                summary: "The calculations narrow the possibilities. They show plausible structures and properties and help explain what experimental signals might mean. They do not prove that every ruthenium–HYQ system follows one universal pathway.",
            },
            colleague: {
                eyebrow: "Interpretation and limitations",
                title: "Mechanistic relevance without overclaiming",
                summary:"These calculations support structure–property interpretation and comparison with spectroscopy, but HYQ-only calculations do not establish a full bimolecular rate law or uniquely distinguish CPET from stepwise ET–PT or PT–ET pathways. That requires an appropriately defined reaction coordinate and comparison under matched experimental conditions.",
            },
        },
    },
];

export const THEORY_STEPS = [
    {
        id: "many-electron",
        short: "many-electron problem",
        friends: {
            title: "The full problem grows too quickly",
            body: "Each electron moves under the influence of the nuclei and every other electron around it. The wavefunction is the mathematical description of all those electrons; this includes possible positions, motions, and interactions. But as more electrons enter the picture, that story becomes far too complicated to follow directly. DFT takes a simpler route by focusing on where the electrons are most likely to be found.",
            bullets: ["Many interacting particles", "Cannot understand all of its detailed behavior", "DFT offers a good approximate solution"],
        },
        colleague: {
            title: "The Many-Electron Problem",
            body: [
                {
                    type: "text",
                    value:
                        "Under the Born–Oppenheimer approximation, the nuclei are treated as fixed while the electrons adjust to their positions:",
                },
                {
                    type: "equation",
                    value: String.raw`\hat{H}_{\mathrm{BO}}\Psi = \hat{E}\Psi`,
                },
                {
                    type: "text",
                    value:
                        "The Hamiltonian includes electron kinetic energy, electron–nuclear attraction, electron–electron repulsion, and nuclear repulsion. Electron–electron repulsion creates the central difficulty because every electron responds to all the others.",
                },
                {
                    type: "text",
                    value:
                        "For N electrons, the wavefunction depends on every electron’s position and spin while also satisfying the Pauli principle. This prevents exact solutions for systems with more than one electron.",
                },
                {
                    type: "text",
                    value:
                        "Electronic-structure methods therefore require approximations. DFT simplifies the problem by using the three-dimensional electron density instead of the full many-electron wavefunction.",
                },
            ],
            bullets: [],
        },
    },
    {
        id: "hk",
        short: "Hohenberg–Kohn",
        friends: {
            title: "The density contains the ground-state story",
            body:
                "That simpler route gained its foundation in 1964, when Pierre Hohenberg and Walter Kohn showed that the electron density contains everything needed to describe a system in its ground state. In other words, all ground-state properties are uniquely determined by the density. They also showed that the correct density is the one that gives the lowest possible energy, giving DFT a practical way to sea",
            bullets: ["Density determines the system", "Energy is a functional of density", "The ground state minimizes that energy"],
        },
        colleague: {
            title: "The Hohenberg–Kohn Theorems",
            body: [
                {
                    type: "text",
                    value: "In 1964, Pierre Hohenberg and Walter Kohn placed density-based electronic structure on a rigorous foundation. Nearly four decades after the Thomas–Fermi model first treated electron density as the central variable, their work showed that this choice was exact in principle rather than merely convenient."
                },
                {
                    type: "text",
                    value: "The first theorem states that the ground-state electron density uniquely determines the external potential and, therefore, the Hamiltonian and all ground-state properties, up to an additive constant. The second theorem establishes a variational principle: among all physically valid trial densities, the true ground-state density minimizes the energy functional.",
                },
                {
                    type: "text",
                    value: "Together, the theorems define the foundation of ground-state DFT. They prove that the exact energy can be obtained from the density, although they do not provide the exact form of the universal functional required to calculate it.",
                }
            ],
            bullets: [],
        },
    },
    {
        id: "ks",
        short: "Kohn–Sham",
        friends: {
            title: "A practical stand-in makes DFT usable",
            body:
                "In 1965, Walter Kohn and Lu Jeu Sham found a way to make DFT practical, helping it become one of the most widely used methods in computational chemistry. Instead of following every electron interaction directly, they imagined a simpler system where each electron moves on its own but still feels the combined pull of the nuclei, the repulsion from the other electrons, and the remaining many-electron effects. This simpler model reproduces the electron density of the real system.",
            bullets: ["Solve simpler orbital equations", "Recover the target density", "Approximate the missing interactions"],
        },
        colleague: {
            title: "The Kohn–Sham Method",
            body: [
                {
                    type: "text",
                    value:
                        "In 1965, Walter Kohn and Lu Jeu Sham turned the Hohenberg–Kohn theorems into a practical calculation. Their approach replaces the interacting many-electron system with an auxiliary set of non-interacting electrons constructed to reproduce the same ground-state density.",
                },
                {
                    type: "equation",
                    value: String.raw`\left[ -\frac{\hbar^2}{2m}\nabla^2 + V_{\mathrm{eff}}(\mathbf{r}) \right] \psi_i(\mathbf{r}) = \varepsilon_i\psi_i(\mathbf{r})`,
                },
                {
                    type: "text",
                    value: "The effective potential contains the attraction to the nuclei, the classical electron–electron repulsion, and an exchange–correlation term that collects the remaining many-body effects.",
                },
                {
                    type: "equation",
                    value: String.raw`V_{\mathrm{eff}}(\mathbf{r}) = V_{\mathrm{ext}}(\mathbf{r}) + V_{\mathrm{H}}(\mathbf{r}) + V_{\mathrm{XC}}(\mathbf{r})`,
                },
                {
                    type: "text",
                    value: "The equations are solved self-consistently. An initial density is used to build the effective potential, the resulting Kohn–Sham orbitals produce a new density, and the cycle repeats until the density stops changing.",
                },
                {
                    type: "text",
                    value: "The exact exchange–correlation functional remains unknown, so practical DFT depends on approximations to this term. Even so, the Hohenberg–Kohn theorems provide an exact foundation, while the Kohn–Sham construction makes that foundation usable. That balance between rigor and approximation is why DFT remains both widely used and scientifically fascinating.",
                },
            ],
            bullets: [],
        },
    },
];

export const DFT_SCOPE = {
    strong: ["Optimized geometries", "Relative energetics", "Densities and selected orbitals", "Vibrations and many molecular properties"],
    dependent: ["Excitation energies", "Charge-transfer descriptions", "Open-shell states", "Solvation and reaction barriers"],
    limit: "A calculation is not, by itself, proof of a complete experimental mechanism.",
};


export const PCET_STEPS = [
    {
        id: "photoexcitation",
        number: "01",
        friends: {
            title: "Light In",
            body: "The Ru(II) complex absorbs light and enters an excited state.",
        },
        colleague: {
            title: "Photoexcitation",
            body: "The Ru(II) complex absorbs hν and is promoted to an electronically excited state.",
        },
    },
    {
        id: "charge-transfer",
        number: "02",
        friends: {
            title: "Charge Shifts",
            body: "An electron moves from ruthenium onto the bpz ligand, leaving Ru(III) and a ligand radical.",
        },
        colleague: {
            title: "Metal-to-Ligand Charge Transfer",
            body: "MLCT oxidizes Ru(II) to Ru(III) while reducing the bpz ligand to a radical state.",
        },
    },
    {
        id: "concerted-pcet",
        number: "03",
        friends: {
            title: "HYQ Steps In",
            body: "HYQ gives an electron back to ruthenium while passing a proton to the bpz ligand. Both movements happen together.",
        },
        colleague: {
            title: "Concerted PCET with HYQ",
            body: "HYQ transfers an electron to Ru(III), restoring Ru(II), while its proton transfers to the bpz ligand in the same elementary step.",
        },
    },
    {
        id: "radical-separation",
        number: "04",
        friends: {
            title: "Radicals Separate",
            body: "The partners separate with one radical on the bpz ligand of the Ru(II) complex and another on HYQ.",
        },
        colleague: {
            title: "Radical Separation",
            body: "The products separate into a Ru(II) complex with a bpz-centered ligand radical and an HYQ radical.",
        },
    },
];


export const PCET_PATHWAYS = [
    { 
        id: "definition", 
        label: "What is PCET", 
        friends: {
            title: "What is PCET",
            body: "In PCET, an electron and a proton moves from one location (donor) to another (receiver). PCET can be either concerted or sequential under strict coupling conditions. In concerted PCET, the reaction moves in a single step, though not necessarily to the same destination. There are different mechanistic and directional class that exist under PCET reactions.",
        }, 
        colleague: {
            title: "PCET Definition",
            body: "The electron and proton are more likely to move together when sending either one alone would create an unstable intermediate. They may still move separately when the first step is energetically possible, even if the intermediate disappears too quickly to observe. Scientists piece together the pathway using reaction energies, rates, hydrogen–deuterium comparisons, and changes in solvent, temperature, pressure, or available energy.",
        },

    },
    { 
        id: "cnditions", 
        label: "PCET Conditions", 
        friends: {
            title: "What Sets PCET Path?",
            body: "The electron and proton are more likely to move together when sending either one alone would create an unstable intermediate. They may still move separately when the first step is energetically possible, even if the intermediate disappears too quickly to observe. Scientists piece together the pathway using reaction energies, rates, hydrogen–deuterium comparisons, and changes in solvent, temperature, pressure, or available energy.",
        },
        colleague: {
            title: "Conditions Considered for PCET",
            body: [
                {
                    type: "text",
                    value: "Concerted transfer is favored when an electron-only or proton-only step would produce a high-energy intermediate. Strong coupling is often indicated by large changes in reduction potential after protonation or large changes in pKₐ after oxidation.",
                },
                {
                    type: "text",
                    value: "Sequential pathways can still occur when the first transfer is energetically accessible. The resulting intermediate may be too short-lived to detect, so its absence does not establish a concerted mechanism.",
                },
                {
                    type: "text",
                    value: "PCET mechanisms are therefore assigned using several forms of evidence. Thermodynamic estimates can exclude unfavorable sequential pathways, while kinetic isotope effects, driving-force trends, solvent effects, pressure, and temperature can reveal proton involvement and rate-limiting steps. No single measurement is usually conclusive.",
                }
            ],
        },
    },
    { 
        id: "nature-future", 
        label: "Nature + Future", 
        friends: {
            title: "PCET in Nature &\nFuture of PCET Research",
            body: "Plants use PCET during photosynthesis to move electrons without allowing too much charge to collect in one place, and similar chemistry helps organisms and catalysts split water. Researchers now combine experiments with computer models to understand these movements and design better catalysts and more efficient renewable energy sources.",
        },
        colleague: {
            title: "PCET in Nature &\nFuture of PCET Research",
            body: [
                {
                    type: "text",
                    value: "Photosynthesis uses PCET to coordinate light-driven electron transfer with proton movement while avoiding excessive charge accumulation. Related strategies enable multistep processes such as biological and catalytic water oxidation.",
                },
                {
                    type: "text",
                    value: "Future work will combine spectroscopy, kinetics, and electronic-structure calculations to clarify how molecular structure and environment control PCET and to guide the design of more efficient catalysts.",
                }
            ],
        },
    },
];

export const ORCA_PROCESS_INTRO = {
    friends: "Theoretical calculations are built step by step and checked as they go. A molecule is drawn, translated into coordinates and settings, calculated, compared with evidence, and then revised when a new question appears.",
    colleague: "A general electronic-structure workflow proceeds from molecular construction and model definition through numerical execution, validation, property extraction, comparison, and iterative refinement.",
};

export const ORCA_PIPELINE = [
    {
        id: "build-molecule",
        number: "01",
        friends: "Build the molecule",
        colleague: "Construct the molecular model",
        friendsBody: "“Draw” the molecule in a program such as Avogadro, clean up its initial structure, and export the atomic positions as XYZ coordinates.",
        colleagueBody: "Construct and inspect an initial molecular geometry, then export the atomic coordinates in XYZ or another ORCA-compatible format.",
    },
    {
        id: "define-calculation",
        number: "02",
        friends: "Define the calculation",
        colleague: "Define the electronic-structure model",
        friendsBody: "Prepare the input file by choosing the molecular charge, spin, computational method, basis set, solvent model, and other numerical settings.",
        colleagueBody: "Finalize the ORCA input by specifying charge, multiplicity, functional or method, basis set, solvation treatment, dispersion correction, and numerical controls.",
    },
    {
        id: "run-verify",
        number: "03",
        friends: "Run and verify",
        colleague: "Execute and validate the calculation",
        friendsBody: "Run the calculation in quantum-chemistry software such as ORCA 6. Confirm that the job finished normally, met its convergence checks, and produced a chemically reasonable result.",
        colleagueBody: "Run the ORCA 6 calculation and inspect termination status, SCF and geometry convergence, warnings, and any required vibrational validation before interpreting the output.",
    },
    {
        id: "extract-compare",
        number: "04",
        friends: "Extract and compare",
        colleague: "Extract properties and compare evidence",
        friendsBody: "Collect the structures, energies, spectra, densities, or other properties needed for the question. Compare them with experiments, published literature, and related calculations.",
        colleagueBody: "Extract the relevant geometries, energies, spectra, densities, spin properties, or response parameters and compare them with experimental observations, literature values, and sensitivity tests.",
    },
    {
        id: "repeat",
        number: "05",
        friends: "Repeat",
        colleague: "Refine and repeat",
        friendsBody: "Use the output file as a starting point to adjust the structure, settings, or scientific question, then calculate again.",
        colleagueBody: "Use the converged output as the basis for revised coordinates, settings, follow-up properties, or a refined hypothesis, and repeat the workflow as needed.",
    },
];

export const ORCA_LAYER_INTRO = {
    friends: "A calculation involves more than drawing a molecule and pressing Run. First, we decide how the molecule should be represented. Then we check that the computer completed the calculation properly. Finally, we examine the results and ask whether they help answer the original chemical question.",
    colleague: "A quantum-chemical calculation moves through three connected stages: defining the molecular model and its approximations, validating the numerical calculation, and interpreting the resulting chemical observables.",
};

export const ORCA_LAYERS = [
    {
        id: "model-setup",
        title: "Model setup",
        friendsTitle: "Setup choices",
        colleagueTitle: "Model definition",

        friendsContext:
            "First, we define the molecule and the rules used to model it.",
        colleagueContext:
            "Defines the system and its theoretical approximations.",

        friends:
            "What molecule and assumptions am I using?",
        colleague:
            "Method, basis set, charge, spin, solvent, and numerical settings.",

        friendsQuestion:
            "What molecule and assumptions am I using?",
        colleagueQuestion: null,

        friendsDetails:
            "Structure, charge, spin, solvent, and level of theory.",
        colleagueDetails:
            "Functional, basis set, multiplicity, solvation, and numerical controls.",
    },
    {
        id: "calculation-validation",
        title: "Calculation check",
        friendsTitle: "Calculation check",
        colleagueTitle: "Calculation validation",

        friendsContext:
            "Next, we check whether the calculation finished correctly.",
        colleagueContext:
            "Confirms numerical convergence and structural stability.",

        friends:
            "Did the calculation finish, and is the structure stable?",
        colleague:
            "SCF convergence, optimization, warnings, and frequency validation.",

        friendsQuestion:
            "Did the calculation finish, and is the structure stable?",
        colleagueQuestion: null,

        friendsDetails:
            "Convergence, geometry changes, warnings, and stability checks.",
        colleagueDetails:
            "SCF behavior, optimization convergence, and vibrational confirmation.",
    },
    {
        id: "computed-evidence",
        title: "Results and evidence",
        friendsTitle: "Results and evidence",
        colleagueTitle: "Computed evidence",

        friendsContext:
            "Finally, we examine the useful results.",
        colleagueContext:
            "Collects properties for comparison with experiment and literature.",

        friends:
            "Which results help answer the chemical question?",
        colleague:
            "Geometry, energies, spectra, density, spin, and magnetic properties.",

        friendsQuestion:
            "Which results help answer the chemical question?",
        colleagueQuestion: null,

        friendsDetails:
            "Shape, vibrations, spectra, electron density, and spin.",
        colleagueDetails:
            "Geometry, normal modes, spectra, densities, g tensors, and hyperfine terms.",
    },
];

export const EVIDENCE_TABS = [
    {
        id: "vibrations",
        label: "Structure + vibrations",
        visual: "Normal-mode HYQ animation placeholder",
        friends: {
            title: "Does the optimized molecule behave like a stable structure?",
            body:
                "A frequency calculation checks the optimized geometry and describes coordinated atomic motions. The web animation will use real displacement vectors, slowed down and exaggerated so each motion can be seen.",
            metrics: ["Selected mode: ring breathing", "Frequency: [add verified value]", "Display amplitude: exaggerated"],
        },
        colleague: {
            title: "Optimized geometry and normal-mode validation",
            body:
                "The planned Blender/Three.js animation will interpolate the positive and negative displacement vectors of selected normal modes rather than adding decorative random motion. Confirmed real frequencies support a local minimum; any imaginary mode must be investigated before interpretation.",
            metrics: ["rᵢ(t) = rᵢ,₀ + Aqᵢ sin(ωt)", "Mode frequency: [add verified value]", "Animation timescale is nonphysical and disclosed"],
        },
    },
    {
        id: "density",
        label: "Electronic structure",
        visual: "Density / orbital surface placeholder",
        friends: {
            title: "Where is the electronic structure concentrated?",
            body:
                "Structure shows where the nuclei are; density and orbital views show where electronic behavior is concentrated. The final viewer will switch between the molecule, total density, and a small set of useful orbital views.",
            metrics: ["Optimized neutral HYQ", "Total density", "Selected HOMO/LUMO or NTO view"],
        },
        colleague: {
            title: "Ground-state density and selected orbital representations",
            body:
                "The interface will compare the optimized structure with total density and carefully selected orbital or electrostatic-potential surfaces. Isovalue presets and a phase legend will prevent the visualization from implying more certainty than the calculation provides.",
            metrics: ["Three isovalue presets", "Orbital phase legend", "Optional electrostatic-potential surface"],
        },
    },
    {
        id: "excited",
        label: "Excited state",
        visual: "TDDFT spectrum placeholder",
        friends: {
            title: "Why do two models predict different colors of light?",
            body:
                "The predicted excitation changes when the exchange-correlation model changes. Comparing B3LYP and PBE0 shows that the functional is part of the interpretation, not merely a software setting.",
            metrics: ["B3LYP S1: 4.423 eV / 280 nm", "Oscillator strength: 0.162", "PBE0 S1: about 3.153 eV / 393 nm"],
        },
        colleague: {
            title: "Functional sensitivity in the TDDFT result",
            body:
                "The B3LYP and PBE0 calculations place the first relevant transition in substantially different energy regions. The final page should connect each spectral stick to an NTO or difference-density view when available, rather than reducing every excitation to a single HOMO→LUMO label.",
            metrics: ["B3LYP S1: 4.423 eV / 280 nm, f = 0.162", "PBE0 S1: ≈3.153 eV / 393 nm", "Values should be rechecked against final output before publication"],
        },
    },
    {
        id: "radical",
        label: "HYQ radical",
        visual: "Spin-density + EPR placeholder",
        friends: {
            title: "What changes after HYQ loses an electron?",
            body:
                "The radical calculation shows where the unpaired electron is distributed. Its magnetic properties create a bridge between an invisible electronic change and an EPR signal that can be measured.",
            metrics: ["Spin-density surface", "giso ≈ 2.00508", "Selected proton hyperfine couplings"],
        },
        colleague: {
            title: "Open-shell spin distribution and magnetic parameters",
            body:
                "The unrestricted HYQ radical model provides a spin-density distribution and calculated g tensor that can be compared with EPR observables. This is a property-level connection to the PCET product, not proof of a unique formation pathway.",
            metrics: ["gx 2.00210 · gy 2.00499 · gz 2.00815", "giso 2.00508", "Hyperfine values: add selected verified protons"],
        },
    },
];

export const SUPPORTS = [
    "A stable optimized structural model after frequency validation",
    "Coordinated vibrational behavior",
    "Functional-dependent excited-state predictions",
    "The distribution of unpaired spin in the radical",
    "Magnetic parameters that can be compared with EPR",
    "Molecular properties relevant to HYQ participation in PCET",
];

export const LIMITS = [
    "One universal Ru–HYQ reaction mechanism",
    "A complete bimolecular rate law",
    "A definitive CPET versus stepwise pathway without reaction-coordinate and kinetic work",
    "Direct experimental agreement under unmatched conditions",
    "The claim that hydroquinone is required for all PCET chemistry",
];

export const REFERENCES = [
    {
        label: "Ru–hydroquinone excited-state PCET literature example",
        href: "https://pubs.acs.org/doi/abs/10.1021/jp200381n",
    },
    {
        label: "ORCA manual",
        href: "https://www.faccts.de/docs/orca/manual/",
    },
];
