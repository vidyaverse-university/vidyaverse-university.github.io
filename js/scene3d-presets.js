/* VidyaVerse v2 — scene3d preset library (procedural geometry + labels + info text). Loaded with js/scene3d-engine.js.
   Every preset is a function(spec) returning { title, intro, objects, tour?, goals?, param?, mode? }.
   Shapes: box sphere cylinder cone torus plane capsule arrow label (+ internal: gear, multi). Positions are abstract units, y = up.
   Facts are mainstream textbook-level; where a model is simplified or not to scale, the info text says so. */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : this;
  var VV2 = root.VV2 = root.VV2 || {};
  var S3 = VV2.Scene3D = VV2.Scene3D || {};
  var P = S3.presets = S3.presets || {};
  var PI = Math.PI;
  function o(id, shape, pos, size, color, label, info, explode, extra) {
    var r = { id: id, shape: shape, pos: pos, size: size, color: color };
    if (label) r.label = label; if (info) r.info = info; if (explode) r.explode = explode;
    if (extra) for (var k in extra) r[k] = extra[k];
    return r;
  }
  function seg(id, shape, from, to, d, color, label, info, explode, extra) { var r = o(id, shape, null, [d, 1, d], color, label, info, explode, extra); r.from = from; r.to = to; delete r.pos; return r; }
  function of(parent, x) { x.of = parent; delete x.label; return x; }

  /* ======================= TECHNOLOGY ======================= */
  P.smartphone = function () {
    return {
      title: 'Smartphone — exploded view', intro: 'A modern phone is a stack of layers. Press 💥 Explode to pull them apart, then tap each layer. Front of the phone faces you.',
      cam: { yaw: 0.9, pitch: 0.25 },
      objects: [
        o('back-cover', 'box', [0, 0, -0.38], [7, 14.6, 0.08], '#2b3a55', 'Back cover', 'Usually toughened glass (needed for wireless charging) or plastic/aluminium, glued on with adhesive. It protects the internals and carries the camera lens covers.', [0, 0, -4.4]),
        o('coil', 'torus', [0, -0.6, -0.3], [3.2, 0.14, 3.2], '#c77b3a', 'Wireless-charging coil', 'A flat copper coil. A Qi charger\'s coil makes a changing magnetic field that induces current in this coil (induction). A ferrite sheet behind it shields the electronics; an NFC antenna often sits around it.', [0, 0, -3.5], { rot: [90, 0, 0] }),
        o('camera-main', 'cylinder', [-2.0, 5.6, -0.2], [1.6, 0.7, 1.6], '#111827', 'Main camera module', 'Lens stack, autofocus and optical image stabilisation (tiny voice-coil motors), an infrared-cut filter and a CMOS image sensor. The image signal processor (ISP) inside the SoC turns the raw sensor data into a photo.', [0, 0, -2.4], { rot: [90, 0, 0] }),
        o('camera-ultra', 'cylinder', [-2.0, 3.8, -0.2], [1.2, 0.6, 1.2], '#1f2937', 'Ultra-wide camera', 'A shorter focal length gives a much wider field of view (often about 120°). It usually has a smaller sensor and simpler focusing than the main camera.', [0, 0, -2.4], { rot: [90, 0, 0] }),
        o('flash', 'cylinder', [-0.6, 5.9, -0.28], [0.45, 0.25, 0.45], '#fff6c8', 'Flash LED', 'A bright white LED (often two colour temperatures) used as a flash and torch.', [0, 0, -2.4], { rot: [90, 0, 0] }),
        o('battery', 'box', [0, -2.9, -0.05], [6.0, 7.4, 0.42], '#3d7a4f', 'Battery (Li-ion polymer)', 'A lithium-ion polymer pouch cell, about 3.85 V nominal and typically 3,000–5,000 mAh. Inside: graphite anode, lithium metal-oxide cathode, separator and electrolyte. A punctured or swollen cell can catch fire (thermal runaway) — never pry it with metal tools.', [0, 0, -1.6]),
        o('mainboard', 'box', [0, 4.0, -0.1], [6.2, 5.6, 0.1], '#1f6f5c', 'Main logic board (PCB)', 'A many-layer printed circuit board (often two boards stacked as a "sandwich") carrying the SoC, memory, power management, modem/RF parts and the connectors for display, battery and cameras.', [0, 0, -1.2]),
        o('soc', 'box', [-0.6, 4.6, 0.0], [1.5, 1.5, 0.12], '#4b5563', 'SoC (System-on-Chip)', 'One chip containing the CPU cores (big + efficient cores), GPU, NPU for AI, image signal processor, memory controllers and often the modem — made on a 3–5 nm-class process. Heat spreads out through graphite sheets or a vapour chamber.', [0, 0, -0.5]),
        o('ram', 'box', [-0.6, 4.6, 0.1], [1.5, 1.5, 0.08], '#6b7280', 'RAM (LPDDR, stacked on the SoC)', 'Low-power DDR memory, commonly stacked directly on top of the SoC (package-on-package) to keep wires short and fast. Typically 6–16 GB. It is volatile: it forgets everything when power is cut.', [0, 0, 0.4]),
        o('storage', 'box', [1.7, 5.5, 0.0], [1.3, 1.0, 0.1], '#374151', 'Flash storage (UFS)', 'Non-volatile NAND flash with its own controller (UFS standard) holding the operating system, apps and photos — commonly 128 GB to 1 TB. Unlike RAM it keeps data without power.', [0, 0, -0.5]),
        o('pmic', 'box', [1.7, 3.8, 0.0], [0.8, 0.8, 0.08], '#52525b', 'Power-management IC', 'Converts the battery voltage into the many supply "rails" each chip needs, controls charging and measures the battery (fuel gauge).', [0, 0, -0.5]),
        o('modem-rf', 'box', [1.6, 2.3, 0.0], [1.2, 0.9, 0.08], '#3f3f46', 'Modem & RF front-end', 'Amplifiers, filters and switches for 4G/5G, Wi-Fi and Bluetooth. The antennas are often sections of the metal frame separated by thin plastic bands.', [0, 0, -0.5]),
        o('speaker', 'box', [1.8, -6.8, -0.05], [1.6, 0.5, 0.3], '#27272a', 'Loudspeaker', 'A small speaker in a sealed acoustic box; a second earpiece speaker at the top often gives stereo.', [0, 0, -1.4]),
        o('haptics', 'box', [-1.8, -6.8, -0.05], [1.4, 0.6, 0.3], '#71717a', 'Vibration motor (linear actuator)', 'A small mass on a spring driven by a coil (linear resonant actuator) — it gives the crisp taps you feel.', [0, 0, -1.4]),
        o('usb-c', 'box', [0, -7.15, 0], [0.9, 0.35, 0.3], '#a1a1aa', 'USB-C port', 'A reversible 24-pin connector supporting USB Power Delivery fast charging. It often sits on a small sub-board with the microphone, linked to the main board by a flex cable.', [0, -1.6, 0]),
        o('sim', 'box', [3.55, 2.0, 0], [0.2, 1.2, 0.18], '#d4d4d8', 'SIM tray', 'Holds a nano-SIM card; many phones also (or only) have an eSIM chip soldered on the board.', [1.6, 0, 0]),
        o('frame', 'box', [0, 0, 0.12], [7.0, 14.6, 0.26], '#9ca3af', 'Mid-frame (aluminium)', 'The structural skeleton of the phone (aluminium, steel or titanium). Board and battery sit in it from the back; the display is glued on the front. Parts of its rim work as antennas.', [0, 0, 1.2], { opacity: 0.45 }),
        o('front-camera', 'cylinder', [0, 6.6, 0.25], [0.35, 0.2, 0.35], '#0f172a', 'Front (selfie) camera', 'Looks out through a small hole punched in the display.', [0, 0, 1.6], { rot: [90, 0, 0] }),
        o('display', 'box', [0, 0, 0.31], [6.8, 14.4, 0.12], '#111827', 'OLED display panel', 'Each OLED pixel makes its own light (true black = pixel off). Pixels are switched by a thin-film-transistor backplane (often LTPO, allowing 1–120 Hz refresh). A touch-sensor layer and polariser sit on top; an optical or ultrasonic fingerprint sensor may sit underneath.', [0, 0, 2.4]),
        o('glass', 'box', [0, 0, 0.39], [7.0, 14.6, 0.06], '#9ad0ff', 'Cover glass', 'Chemically strengthened aluminosilicate glass (ion-exchanged so its surface is in compression) with an oil-repellent coating. Most scratches come from sand — quartz is harder than glass.', [0, 0, 3.6], { opacity: 0.35 })
      ],
      tour: [
        { text: 'A phone looks like one slab, but it is a careful stack. Let us take it apart.', explode: true },
        { text: 'At the back: the glass back cover. Glass (not metal) lets the wireless-charging field pass through.', focus: 'back-cover' },
        { text: 'The wireless-charging coil picks up energy by magnetic induction.', focus: 'coil' },
        { text: 'The largest part is the battery — a lithium-ion polymer pouch.', focus: 'battery' },
        { text: 'The main board is the phone\'s "city": every chip lives here.', focus: 'mainboard' },
        { text: 'The SoC is the brain: CPU, GPU, AI engine and camera processor on one chip.', focus: 'soc' },
        { text: 'RAM is stacked right on top of the SoC (package-on-package).', focus: 'ram' },
        { text: 'Camera modules: lenses, stabilisation motors and an image sensor.', focus: 'camera-main' },
        { text: 'The OLED display: millions of self-lit pixels.', focus: 'display' },
        { text: 'Finally the tough cover glass protects everything.', focus: 'glass', explode: false }
      ]
    };
  };

  P.laptop = function () {
    var tilt = [-15, 0, 0];
    return {
      title: 'Laptop — inside view', intro: 'Explode the laptop to see the chassis, mainboard, cooling and lid. Tap any part.', cam: { yaw: 0.7, pitch: 0.45 },
      objects: [
        o('bottom-case', 'box', [0, 0.06, 0], [12, 0.12, 8.4], '#6b7280', 'Bottom case (D-cover)', 'The base cover with air intake vents and rubber feet. Removing its screws gives access to the battery, SSD and sometimes RAM.', [0, -3.4, 0]),
        o('mainboard', 'box', [-0.6, 0.25, -2.2], [9.2, 0.08, 3.4], '#1f5f4f', 'Mainboard', 'The laptop motherboard: CPU, memory, power circuits, USB/Thunderbolt and display connectors on one board.', [0, -1.7, 0]),
        o('cpu', 'box', [-2.6, 0.35, -2.2], [1.4, 0.12, 1.4], '#9ca3af', 'CPU (with integrated GPU)', 'Laptop processors are usually soldered to the board. They run at modest power (about 15–55 W) and boost briefly when cooling allows.', [0, -1.1, 0]),
        o('heatpipe', 'cylinder', null, [0.25, 1, 0.25], '#c77b3a', 'Heat pipe', 'A sealed copper tube with a little fluid inside: it evaporates at the hot CPU end and condenses at the fins near the fan, moving heat very efficiently.', [0, -0.7, 0], { from: [-2.6, 0.48, -2.2], to: [3.6, 0.48, -3.2] }),
        o('fan', 'cylinder', [4.3, 0.42, -2.6], [2.0, 0.4, 2.0], '#52525b', 'Blower fan', 'Pulls air in from the bottom vents and blows it through a copper fin stack and out of the back/side exhaust.', [0, -0.7, 0]),
        o('ram', 'box', [0.4, 0.33, -2.7], [2.6, 0.08, 1.0], '#2563eb', 'RAM', 'Either an SO-DIMM module (upgradeable) or LPDDR chips soldered to the board (faster and more efficient, but not upgradeable).', [0, -1.1, 0]),
        o('ssd', 'box', [0.4, 0.33, -1.3], [2.2, 0.06, 0.6], '#111827', 'M.2 NVMe SSD', 'A 22 × 80 mm (M.2 2280) solid-state drive on the PCIe bus — much faster than old SATA hard disks.', [0, -1.1, 0]),
        o('wifi', 'box', [-4.6, 0.33, -1.6], [0.8, 0.06, 0.9], '#0f766e', 'Wi-Fi / Bluetooth card', 'A small M.2 card (or soldered chip); thin antenna cables run up through the hinge into the lid.', [0, -1.1, 0]),
        o('battery', 'box', [0, 0.3, 1.9], [10, 0.35, 3.2], '#3d7a4f', 'Battery', 'Lithium-ion polymer, often 50–100 Wh. Airlines generally allow batteries up to 100 Wh in cabin baggage without special approval.', [0, -1.7, 0]),
        o('top-case', 'box', [0, 0.66, 0], [12, 0.12, 8.4], '#c9ced6', 'Top case / palm rest (C-cover)', 'The upper shell of the base; the keyboard is often riveted into it.', [0, 1.7, 0], { opacity: 0.85 }),
        o('keyboard', 'box', [0, 0.76, -1.6], [10.6, 0.08, 3.4], '#2a2f36', 'Keyboard', 'Scissor-switch keys over a membrane, usually with an LED backlight layer.', [0, 2.7, 0]),
        o('touchpad', 'box', [0, 0.74, 2.4], [4.4, 0.06, 2.6], '#a9b0ba', 'Touchpad', 'A capacitive sensor that tracks fingers; it "clicks" by a hinge mechanism or a haptic motor that fakes the click.', [0, 2.7, 0]),
        o('hinge', 'cylinder', [0, 0.5, -4.2], [0.45, 10, 0.45], '#9ca3af', 'Hinges', 'Friction hinges hold the lid at any angle; display and antenna cables pass through or beside them.', [0, 0, -1.4], { rot: [0, 0, 90] }),
        o('lid-cover', 'box', [0, 4.18, -5.33], [12, 8, 0.12], '#7c8594', 'Lid back cover (A-cover)', 'The outer shell of the lid; it protects the panel and often hides the Wi-Fi antennas along its top edge.', [0, -0.8, -3.0], { rot: tilt }),
        o('display', 'box', [0, 4.24, -5.12], [11.6, 7.6, 0.12], '#10151f', 'Display panel', 'An IPS LCD (needs an LED backlight and light-guide sheet) or an OLED panel, connected to the board by an eDP cable.', [0, 0.3, 1.2], { rot: tilt }),
        o('webcam', 'cylinder', [0, 7.83, -6.04], [0.3, 0.15, 0.3], '#0f172a', 'Webcam & microphones', 'A tiny camera module in the bezel, usually next to a privacy LED and microphones.', [0, 0.3, 1.2], { rot: [75, 0, 0] })
      ],
      tour: [
        { text: 'Let us open the laptop.', explode: true },
        { text: 'The mainboard holds the processor, memory and connectors.', focus: 'mainboard' },
        { text: 'The CPU makes the heat; the heat pipe carries it to the fan.', focus: 'heatpipe' },
        { text: 'The blower fan pushes the heat out of the vents. Blocked vents = hot, slow laptop.', focus: 'fan' },
        { text: 'Storage is an M.2 NVMe SSD.', focus: 'ssd' },
        { text: 'The battery fills most of the front half.', focus: 'battery' },
        { text: 'The display panel sits in the lid, connected through the hinge.', focus: 'display', explode: false }
      ]
    };
  };

  P['pc-build'] = function () {
    return {
      title: 'Desktop PC — build it', intro: 'An ATX tower seen from its open side. Explode it to see each part, or take the build tour in the real assembly order.', cam: { yaw: 1.2, pitch: 0.25 },
      objects: [
        o('case', 'box', [0, 4.5, 0], [4.4, 9, 9], '#9aa5b1', 'Case (ATX mid-tower)', 'Holds and protects everything and organises airflow — cool air in at the front, hot air out at the back/top. Brass standoffs keep the motherboard off the metal.', null, { opacity: 0.12 }),
        o('motherboard', 'box', [-1.9, 5.4, 0.6], [0.12, 6.1, 4.9], '#1f4d3a', 'Motherboard (ATX)', 'The main circuit board (305 × 244 mm for ATX): CPU socket, RAM slots, PCIe slots, M.2 slots, power connectors and the chipset. Every other part plugs into it.', [-1.2, 0, 0]),
        o('cpu', 'box', [-1.78, 6.9, 0.9], [0.1, 0.9, 0.9], '#c0c4c8', 'CPU (processor)', 'Executes the instructions of every program. Match the socket (e.g. AM5 or LGA1700), line up the small triangle marker, drop it in with zero force and close the retention lever. Never touch the pins or pads.', [1.6, 0, 0]),
        o('cooler', 'box', [-0.95, 6.9, 0.9], [1.5, 1.8, 0.6], '#b8c2cc', 'CPU cooler (tower heatsink)', 'Copper heat pipes carry heat from the CPU into aluminium fins. A thin layer of thermal paste (about pea-sized) fills microscopic gaps; tighten the mounting screws evenly in a cross pattern.', [3.4, 0, 0]),
        of('cooler', o('cooler-fan', 'cylinder', [-0.95, 6.9, 1.45], [1.5, 0.35, 1.5], '#475569', null, null, [3.4, 0, 0.6], { rot: [90, 0, 0] })),
        o('ram-1', 'box', [-1.5, 6.6, 2.0], [0.65, 2.66, 0.08], '#2563eb', 'RAM (DDR5 DIMMs)', 'Working memory. Line up the off-centre notch and press until the latches click. With two sticks use the slots the manual recommends (often A2 + B2) for dual-channel speed.', [2.2, 0, 0]),
        of('ram-1', o('ram-2', 'box', [-1.5, 6.6, 2.35], [0.65, 2.66, 0.08], '#2563eb', null, null, [2.2, 0, 0])),
        o('m2-ssd', 'box', [-1.8, 4.8, 0.6], [0.06, 0.44, 1.6], '#111827', 'M.2 NVMe SSD', 'A 22 × 80 mm stick that slots into the board at an angle and is held by a tiny screw or latch. It talks over PCIe — several times faster than a SATA SSD.', [1.6, 0, 0]),
        o('gpu', 'box', [-0.6, 3.6, 0.4], [2.4, 1.0, 6.0], '#303845', 'Graphics card (GPU)', 'Thousands of small cores for 3D graphics and AI, with its own fast memory (GDDR). It goes in the top PCIe x16 slot and needs power cables from the PSU (8-pin PCIe or 12V-2x6).', [2.8, -0.6, 0]),
        of('gpu', o('gpu-fan-1', 'cylinder', [-0.6, 3.05, -1.2], [1.8, 0.1, 1.8], '#1f2937', null, null, [2.8, -0.6, 0])),
        of('gpu', o('gpu-fan-2', 'cylinder', [-0.6, 3.05, 1.8], [1.8, 0.1, 1.8], '#1f2937', null, null, [2.8, -0.6, 0])),
        o('psu', 'box', [-0.4, 0.95, -2.9], [3.0, 1.72, 2.8], '#2b2b2b', 'Power supply (PSU)', 'Turns mains AC (230 V in India) into steady 12 V, 5 V and 3.3 V DC. Choose enough wattage with headroom and a good efficiency rating (80 PLUS). Main cables: 24-pin ATX, 8-pin CPU (EPS) and GPU power.', [3.0, -1.0, 0]),
        o('sata-ssd', 'box', [0.4, 1.0, 3.0], [1.4, 0.14, 2.0], '#334155', '2.5-inch SATA drive', 'Extra storage (SSD or hard disk) in a drive bay, connected with a SATA data cable and a SATA power cable.', [2.5, 0, 1.0]),
        o('fan-front', 'cylinder', [0.2, 6.0, 4.45], [2.4, 0.5, 2.4], '#64748b', 'Front intake fan', 'Pulls cool room air in. Slightly more intake than exhaust (positive pressure) keeps dust out of gaps.', [0, 0, 2.0], { rot: [90, 0, 0] }),
        o('fan-rear', 'cylinder', [0.2, 7.2, -4.45], [2.4, 0.5, 2.4], '#64748b', 'Rear exhaust fan', 'Pushes hot air out behind the CPU cooler.', [0, 0, -2.0], { rot: [90, 0, 0] })
      ],
      tour: [
        { text: 'Build order step 1: on the desk, install the CPU in the motherboard socket — triangle to triangle, no force.', focus: 'cpu', explode: true },
        { text: 'Step 2: thermal paste and the CPU cooler.', focus: 'cooler' },
        { text: 'Step 3: RAM into the recommended slots until both latches click.', focus: 'ram-1' },
        { text: 'Step 4: the M.2 SSD.', focus: 'm2-ssd' },
        { text: 'Step 5: screw the motherboard onto the case standoffs (I/O shield first if separate).', focus: 'motherboard' },
        { text: 'Step 6: power supply in the bottom; route the 24-pin and 8-pin CPU cables.', focus: 'psu' },
        { text: 'Step 7: graphics card into the top PCIe x16 slot, then its power cable.', focus: 'gpu' },
        { text: 'Step 8: fans for airflow — front in, rear out.', focus: 'fan-front' },
        { text: 'Step 9: front-panel connectors, close up, power on and enter the BIOS/UEFI to check every part is detected.', focus: 'case', explode: false }
      ]
    };
  };

  P['server-rack'] = function () {
    function U(u, n) { return 0.1 + (u - 1) * 0.2 + n * 0.1; }
    var srv = [];
    [10, 12, 14].forEach(function (u, i) { var x = o('server-2u-' + (i + 1), 'box', [0, U(u, 2), 0.1], [2.4, 0.38, 4.4], '#5b6b80', null, null, [0, 0, 2.2 + i * 0.4]); if (i === 0) { x.label = '2U servers'; x.info = 'Two rack units tall: room for more drives, PCIe cards or GPUs. Each usually has two redundant power supplies — one fed from PDU A, one from PDU B.'; } else x.of = 'server-2u-1'; srv.push(x); });
    [17, 18, 19, 20].forEach(function (u, i) { var x = o('server-1u-' + (i + 1), 'box', [0, U(u, 1), 0.1], [2.4, 0.18, 4.4], '#64748b', null, null, [0, 0, 3.4 + i * 0.3]); if (i === 0) { x.label = '1U servers'; x.info = '"Pizza-box" servers 1.75 in (44.45 mm) tall: dense compute for web, app or virtualisation hosts. They slide out on rails for service.'; } else x.of = 'server-1u-1'; srv.push(x); });
    return {
      title: 'Server rack (42U)', intro: 'A standard 19-inch rack, 42 rack units tall. Heavy kit goes at the bottom; networking at the top.', cam: { yaw: 0.5, pitch: 0.2 },
      objects: [
        o('rack', 'box', [0, 4.3, 0], [2.6, 8.6, 5.0], '#94a3b8', 'Rack frame', 'A 19-inch-wide frame (the width of the mounting rails). Height is counted in rack units: 1U = 1.75 in = 44.45 mm, so 42U is about 1.9 m of mounting space. Cold air enters at the front, hot air leaves at the back.', null, { opacity: 0.12 }),
        o('ups', 'box', [0, U(1, 3), 0.1], [2.4, 0.58, 4.0], '#1f2937', 'UPS (3U)', 'Uninterruptible power supply: batteries that keep servers running through short outages and let them shut down safely. Very heavy, so it lives at the bottom.', [0, 0, 1.5]),
        o('storage', 'box', [0, U(5, 4), 0.1], [2.4, 0.78, 4.4], '#4a5a72', 'Storage array (4U)', 'Dozens of disks or SSDs with redundant controllers, shared to the servers over iSCSI, Fibre Channel or NVMe-oF. Also heavy — low in the rack.', [0, 0, 1.9])
      ].concat(srv).concat([
        o('kvm', 'box', [0, U(24, 1), 0.2], [2.4, 0.18, 3.4], '#334155', 'KVM / console drawer', 'Keyboard-video-mouse switch with a fold-out screen for local access (most admins use remote management such as iDRAC/iLO/IPMI instead).', [0, 0, 2.6]),
        o('cable-mgr', 'box', [0, U(39, 1), 0.9], [2.4, 0.16, 0.9], '#0f172a', 'Cable manager', 'Brushes and rings that keep patch cables tidy — messy cabling blocks airflow and causes mistakes.', [0, 0, 1.4]),
        o('patch-panel', 'box', [0, U(40, 1), 0.7], [2.4, 0.16, 1.2], '#e5e7eb', 'Patch panel', 'The end point of the building\'s structured cabling; short patch cords connect its ports to the switch.', [0, 0, 1.8]),
        o('tor-switch', 'box', [0, U(41, 1), 0.3], [2.4, 0.18, 3.0], '#0ea5e9', 'Top-of-rack switch', 'Connects every server in the rack (often 25 Gb/s) and uplinks to the data-centre spine/aggregation switches. Usually two, for redundancy.', [0, 0, 2.2]),
        o('pdu-a', 'box', [-1.1, 4.3, -2.35], [0.15, 7.6, 0.15], '#dc2626', 'PDUs (A and B power feeds)', 'Vertical power strips at the back. Feed A and feed B come from separate circuits, so a single failure does not take the rack down.', [-0.8, 0, -1.2]),
        of('pdu-a', o('pdu-b', 'box', [1.1, 4.3, -2.35], [0.15, 7.6, 0.15], '#2563eb', null, null, [0.8, 0, -1.2]))
      ]),
      tour: [
        { text: 'A rack is measured in U. 1U = 44.45 mm.', focus: 'rack' },
        { text: 'Heavy things low: the UPS at the very bottom…', focus: 'ups', explode: true },
        { text: '…then the storage array.', focus: 'storage' },
        { text: 'Servers in the middle: 2U and 1U units slide out on rails.', focus: 'server-1u-1' },
        { text: 'Networking at the top: patch panel and top-of-rack switch.', focus: 'tor-switch' },
        { text: 'Two PDUs at the back give every dual-PSU server two independent power feeds.', focus: 'pdu-a', explode: false }
      ]
    };
  };

  P.datacenter = function () {
    var racks = [], i;
    for (i = 0; i < 5; i++) {
      var a = o('rack-a' + (i + 1), 'box', [-4 + 2 * i, 2, -1.6], [1.2, 4, 2], '#334155'), b = o('rack-b' + (i + 1), 'box', [-4 + 2 * i, 2, 1.6], [1.2, 4, 2], '#334155');
      if (i === 0) { a.label = 'Server racks'; a.info = 'Two rows of racks face each other across the cold aisle. Servers breathe in at the front and exhaust heat at the back — never mix the directions.'; } else a.of = 'rack-a1';
      b.of = 'rack-a1'; racks.push(a, b);
    }
    return {
      title: 'Data centre hall — hot and cold aisles', intro: 'Cooling is the hard part of a data centre. Follow the air: cold from the floor tiles, through the servers, hot into the hot aisles.', cam: { yaw: 0.8, pitch: 0.55 },
      objects: [
        o('raised-floor', 'box', [0, -0.25, 0], [16, 0.5, 12], '#8892a0', 'Raised floor & PUE', 'Cold air is pushed through the space under a raised floor. Efficiency is measured by PUE = total facility power ÷ IT equipment power: 1.0 would be perfect; recent industry surveys average about 1.5–1.6, and the best large sites reach about 1.1.', null, { opacity: 0.55 })
      ].concat(racks).concat([
        o('cold-aisle', 'box', [0, 2, 0], [10.4, 4, 1.2], '#3b82f6', 'Cold aisle', 'Rack fronts face each other here. Chilled supply air (ASHRAE recommends about 18–27 °C at server inlets) rises from perforated floor tiles.', null, { opacity: 0.18 }),
        o('containment', 'box', [0, 4.06, 0], [10.4, 0.06, 1.2], '#93c5fd', 'Aisle containment', 'A roof and end doors over the cold aisle stop hot and cold air from mixing — one of the cheapest big efficiency wins.', null, { opacity: 0.35 }),
        o('tiles', 'plane', [0, 0.01, 0], [10.4, 1, 1.2], '#bfdbfe', 'Perforated floor tiles', 'Tiles with holes (or grilles) let cold air up only where the servers need it.'),
        o('hot-aisle-a', 'box', [0, 2, -3.2], [10.4, 4, 1.2], '#ef4444', 'Hot aisles', 'The backs of the racks face here; exhaust air is often 35–45 °C. It returns to the cooling units, often through a ceiling plenum.', null, { opacity: 0.15 }),
        of('hot-aisle-a', o('hot-aisle-b', 'box', [0, 2, 3.2], [10.4, 4, 1.2], '#ef4444', null, null, null, { opacity: 0.15 })),
        o('crah-1', 'box', [-7, 1.6, 0], [1.4, 3.2, 3.6], '#e2e8f0', 'Cooling units (CRAH / CRAC)', 'Computer-room air handlers blow air over chilled-water coils and push it under the floor. (A CRAC unit has its own refrigerant compressor instead.)'),
        of('crah-1', o('crah-2', 'box', [7, 1.6, 0], [1.4, 3.2, 3.6], '#e2e8f0')),
        o('airflow', 'arrow', null, [0.35, 1, 0.35], '#60a5fa', 'Airflow', 'Cold air: up from the tiles → through the servers front to back → out as hot air → up and back to the cooling units.', null, { from: [0, 0.2, 0], to: [0, 3.0, 0] }),
        of('airflow', o('airflow-2', 'arrow', null, [0.35, 1, 0.35], '#f97316', null, null, null, { from: [2, 2.5, -0.5], to: [2, 2.5, -3.4] })),
        of('airflow', o('airflow-3', 'arrow', null, [0.35, 1, 0.35], '#ef4444', null, null, null, { from: [0, 4.2, -3.2], to: [0, 5.8, -3.2] })),
        o('cable-tray', 'box', [0, 4.6, -1.6], [10.4, 0.15, 0.6], '#f59e0b', 'Overhead cable trays', 'Network and power cables run above the racks so they do not block the underfloor airflow.'),
        of('cable-tray', o('cable-tray-2', 'box', [0, 4.6, 1.6], [10.4, 0.15, 0.6], '#f59e0b')),
        o('ups-room', 'box', [-10.5, 1.2, 4.5], [2.6, 2.4, 2.6], '#6b7280', 'UPS & battery room', 'Batteries bridge the seconds between a grid failure and the generators taking over.'),
        o('generator', 'box', [-10.5, 1.2, -4.5], [2.6, 2.4, 2.6], '#065f46', 'Backup generators', 'Diesel (or gas) generators start automatically within seconds of a power cut and can run for many hours with fuel on site.')
      ]),
      tour: [
        { text: 'Racks are arranged in rows: fronts face fronts, backs face backs.', focus: 'rack-a1' },
        { text: 'Cold aisle between the fronts, with containment on top.', focus: 'cold-aisle' },
        { text: 'Cold air comes up through perforated tiles…', focus: 'tiles' },
        { text: '…through the servers and out into the hot aisles.', focus: 'hot-aisle-a' },
        { text: 'Cooling units close the loop.', focus: 'crah-1' },
        { text: 'Power resilience: UPS batteries, then generators.', focus: 'generator' },
        { text: 'PUE tells you how much of the power reaches the computers.', focus: 'raised-floor' }
      ]
    };
  };

  P['network-topology'] = function () {
    var L = [], k = 0;
    function ln(a, b, wifi) { var x = seg('link-' + (++k), 'cylinder', a, b, wifi ? 0.04 : 0.07, wifi ? '#c4b5fd' : '#94a3b8'); if (k === 1) { x.label = 'Cables (links)'; x.info = 'Copper Ethernet (Cat6, up to 100 m) to desks; fibre between switches and to the internet provider. Dotted purple = Wi-Fi radio links.'; } else x.of = 'link-1'; L.push(x); }
    var nodes = {
      internet: [0, 7, 0], router: [0, 5.6, 0], firewall: [0, 4.4, 0], core: [0, 3.2, 0], a1: [-4, 1.8, 0], a2: [0, 1.8, 0], a3: [4, 1.8, 0],
      s1: [-5, 0.4, 0.4], s2: [-3, 0.4, 0.4], p1: [-1, 0.4, 0.6], p2: [1, 0.4, 0.6], pr: [0, 0.4, -1.1], ap: [4, 0.6, 0], lap: [3.2, -0.8, 1.2], ph: [5, -0.8, 1.2]
    };
    ln(nodes.internet, nodes.router); ln(nodes.router, nodes.firewall); ln(nodes.firewall, nodes.core);
    ln(nodes.core, nodes.a1); ln(nodes.core, nodes.a2); ln(nodes.core, nodes.a3);
    ln(nodes.a1, nodes.s1); ln(nodes.a1, nodes.s2); ln(nodes.a2, nodes.p1); ln(nodes.a2, nodes.p2); ln(nodes.a2, nodes.pr); ln(nodes.a3, nodes.ap); ln(nodes.ap, nodes.lap, true); ln(nodes.ap, nodes.ph, true);
    return {
      title: 'A small office network', intro: 'A hierarchical (core → access) star network. Tap each device to see its job and which network layer it works at.', cam: { yaw: 0.35, pitch: 0.3 },
      objects: [
        o('internet', 'sphere', nodes.internet, [2.6, 1.3, 2.0], '#bfdbfe', 'Internet (ISP)', 'The provider\'s network. Your public IP address lives on the router\'s outside interface.', null, { opacity: 0.85 }),
        o('router', 'cylinder', nodes.router, [1.2, 0.5, 1.2], '#2563eb', 'Edge router', 'Works at Layer 3 (IP): forwards packets between your network and the internet and usually does NAT, translating many private addresses (192.168.x.x / 10.x.x.x) to one public one.'),
        o('firewall', 'box', nodes.firewall, [1.6, 0.7, 0.6], '#dc2626', 'Firewall', 'Allows or blocks traffic by rules (stateful inspection: replies to connections you started are allowed back in). Next-generation firewalls also inspect applications.'),
        o('core-switch', 'box', nodes.core, [2.0, 0.4, 0.9], '#0ea5e9', 'Core switch', 'A fast Layer 2/3 switch joining everything together; often routes between VLANs (separate virtual networks for staff, guests, servers).'),
        o('access-1', 'box', nodes.a1, [1.6, 0.3, 0.7], '#22c55e', 'Access switches', 'Layer 2: they learn which device (MAC address) is on which port and forward frames only there. Many supply PoE power to phones and access points.'),
        of('access-1', o('access-2', 'box', nodes.a2, [1.6, 0.3, 0.7], '#22c55e')), of('access-1', o('access-3', 'box', nodes.a3, [1.6, 0.3, 0.7], '#22c55e')),
        o('server-1', 'box', nodes.s1, [0.7, 0.9, 0.7], '#64748b', 'Servers', 'File, print or application servers with fixed (static) IP addresses; the DHCP server that hands out addresses often lives here too.'),
        of('server-1', o('server-2', 'box', nodes.s2, [0.7, 0.9, 0.7], '#64748b')),
        o('pc-1', 'box', nodes.p1, [0.8, 0.6, 0.15], '#a3a3a3', 'Desktop PCs', 'End devices — they get an IP address, gateway and DNS server from DHCP.'),
        of('pc-1', o('pc-2', 'box', nodes.p2, [0.8, 0.6, 0.15], '#a3a3a3')),
        o('printer', 'box', nodes.pr, [0.9, 0.5, 0.7], '#e5e7eb', 'Network printer', 'Usually given a reserved IP address so computers can always find it.'),
        o('wifi-ap', 'cylinder', nodes.ap, [0.9, 0.18, 0.9], '#f5f5f5', 'Wi-Fi access point', 'Bridges radio clients (Wi-Fi 6/7) onto the wired network. Guests should land on a separate VLAN/SSID.'),
        o('laptop', 'box', nodes.lap, [0.9, 0.08, 0.6], '#475569', 'Wireless clients', 'Laptops and phones join by Wi-Fi with WPA2/WPA3 security.'),
        of('laptop', o('phone', 'box', nodes.ph, [0.3, 0.55, 0.06], '#1f2937'))
      ].concat(L),
      tour: [
        { text: 'Traffic to the internet leaves through the edge router.', focus: 'router' },
        { text: 'The firewall decides what is allowed in and out.', focus: 'firewall' },
        { text: 'The core switch is the centre of the star.', focus: 'core-switch' },
        { text: 'Access switches connect each group of devices.', focus: 'access-1' },
        { text: 'Wi-Fi access points turn radio into Ethernet.', focus: 'wifi-ap' }
      ]
    };
  };

  /* ---------- semiconductors ---------- */
  P.wafer = function () {
    var good = [], bad = [], edge = [], pitch = 0.44, die = 0.4, Rw = 5, excl = 4.85, seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var i = -12; i <= 12; i++) for (var j = -12; j <= 12; j++) {
      var cx = i * pitch, cz = j * pitch, far = Math.hypot(Math.abs(cx) + die / 2, Math.abs(cz) + die / 2), near = Math.hypot(cx, cz);
      var part = { t: 'box', c: [cx, 0.07, cz], s: [die, 0.04, die] };
      if (far <= excl) (rnd() < 0.1 ? bad : good).push(part); else if (near < Rw - 0.15) edge.push(part);
    }
    var nGood = good.length, nBad = bad.length;
    return {
      title: '300 mm silicon wafer', intro: 'One wafer holds hundreds of identical chips ("dies"). Here ' + (nGood + nBad) + ' complete dies fit; ' + nBad + ' failed the electrical test, so this wafer\'s yield is about ' + Math.round(nGood / (nGood + nBad) * 100) + '%.', cam: { yaw: 0.4, pitch: 0.85 },
      objects: [
        o('wafer', 'cylinder', [0, 0, 0], [10, 0.08, 10], '#a5b4c8', 'Wafer (single-crystal silicon)', 'A 300 mm disc about 0.775 mm thick, sliced from a single-crystal silicon ingot grown by the Czochralski method and polished mirror-flat. Hundreds of process steps build transistors and wiring on its surface; the gaps between dies are scribe lines (saw streets).'),
        o('die', 'multi', [0, 0, 0], [1, 1, 1], '#3b5bdb', 'Good dies', 'Each square is one chip. After fabrication every die is probed electrically (wafer sort); good ones are later sawn apart and packaged.', null, { parts: good }),
        o('bad-die', 'multi', [0, 0.001, 0], [1, 1, 1], '#e03131', 'Failed dies', 'Dies that failed the wafer-sort test (a particle, a defect…). Yield = good dies ÷ total dies; it is a huge driver of chip cost, and bigger dies are hit harder by each random defect.', null, { parts: bad }),
        o('edge-die', 'multi', [0, -0.002, 0], [1, 1, 1], '#868e96', 'Edge dies (partial)', 'Squares that run off the round edge (or into the edge-exclusion zone) cannot become working chips — one reason large dies waste more silicon.', null, { parts: edge }),
        o('reticle', 'box', [0.22, 0.14, 0.22], [0.88, 0.06, 0.88], '#fcc419', 'Exposure field (reticle)', 'A lithography scanner prints one field at a time (at most 26 × 33 mm), then steps across the wafer. Here one field holds 2 × 2 dies.', null, { opacity: 0.55 }),
        o('notch', 'box', [0, 0.04, -4.98], [0.3, 0.12, 0.12], '#212529', 'Orientation notch', 'A tiny notch marks the crystal orientation so every machine aligns the wafer the same way (older, smaller wafers used a flat edge).')
      ]
    };
  };

  P.finfet = function () {
    var fins = [], src = [], drn = [], ch = [], sp = [], ctc = [];
    [-1.2, 0, 1.2].forEach(function (z) { fins.push({ t: 'box', c: [0, 0.7, z], s: [7, 1.4, 0.3] }); src.push({ t: 'box', c: [-2.4, 0.8, z], s: [2.2, 1.6, 0.6] }); drn.push({ t: 'box', c: [2.4, 0.8, z], s: [2.2, 1.6, 0.6] }); ch.push({ t: 'box', c: [0, 0.71, z], s: [1.0, 1.42, 0.32] }); });
    sp.push({ t: 'box', c: [-0.62, 1.1, 0], s: [0.24, 2.2, 4.4] }, { t: 'box', c: [0.62, 1.1, 0], s: [0.24, 2.2, 4.4] });
    ctc.push({ t: 'cyl', c: [-2.4, 2.4, 0], s: [0.45, 1.6, 0.45] }, { t: 'cyl', c: [2.4, 2.4, 0], s: [0.45, 1.6, 0.45] }, { t: 'cyl', c: [0, 3.0, 1.6], s: [0.45, 1.6, 0.45] });
    return {
      title: 'FinFET transistor (3 fins)', intro: 'In a FinFET the channel is a thin vertical fin and the gate wraps over it. Explode it to see every layer. (Not to scale: real fins are only nanometres wide.)', cam: { yaw: 0.7, pitch: 0.5 },
      objects: [
        o('substrate', 'box', [0, -0.5, 0], [8, 1.0, 5], '#64748b', 'Silicon substrate', 'The bulk silicon wafer the fins are etched out of (p-type for an n-channel FinFET).', [0, -1.6, 0]),
        o('sti', 'box', [0, 0.3, 0], [8, 0.6, 5], '#bae6fd', 'Shallow-trench isolation', 'Silicon dioxide filling the trenches between fins, electrically isolating neighbouring devices.', [0, -0.8, 0], { opacity: 0.45 }),
        o('fins', 'multi', [0, 0, 0], [1, 1, 1], '#94a3b8', 'Fins', 'Thin vertical silicon ridges — roughly 5–10 nm wide and 40–60 nm tall in modern processes. Several fins in parallel give one transistor more drive current.', null, { parts: fins }),
        o('channel', 'multi', [0, 0, 0], [1, 1, 1], '#22d3ee', 'Channel', 'The part of each fin under the gate. When the gate voltage passes the threshold, a conducting layer forms on the top AND both sidewalls, so current flows from source to drain.', null, { parts: ch }),
        o('source', 'multi', [0, 0, 0], [1, 1, 1], '#f59e0b', 'Source', 'Heavily doped (n⁺) silicon, usually regrown epitaxially on the fin ends to lower resistance. Electrons enter the channel here.', [-1.6, 0, 0], { parts: src }),
        o('drain', 'multi', [0, 0, 0], [1, 1, 1], '#f97316', 'Drain', 'The other heavily doped end; electrons leave the channel here.', [1.6, 0, 0], { parts: drn }),
        o('gate-oxide', 'box', [0, 0.82, 0], [1.3, 1.56, 4.0], '#a7f3d0', 'High-k gate dielectric', 'An ultra-thin insulator (a hafnium-oxide "high-k" film, about 1–2 nm) between gate and fin. High-k lets it stay physically thicker than old SiO₂ for the same control, cutting leakage.', [0, 1.6, 0], { opacity: 0.45 }),
        o('spacers', 'multi', [0, 0, 0], [1, 1, 1], '#e2e8f0', 'Spacers', 'Silicon-nitride walls insulating the gate from the source/drain contacts.', [0, 2.3, 0], { parts: sp, opacity: 0.6 }),
        o('gate', 'box', [0, 1.1, 0], [1.0, 2.2, 4.4], '#dc2626', 'Metal gate (wraps 3 sides)', 'The control electrode wraps over the top and both sides of every fin. Better electrostatic control than a flat (planar) gate = less leakage when off. FinFETs entered volume production around the 22 nm node (2011–2012); the newest nodes move to gate-all-around nanosheets, where the gate surrounds the channel completely.', [0, 3.1, 0], { opacity: 0.85 }),
        o('contacts', 'multi', [0, 0, 0], [1, 1, 1], '#fbbf24', 'Contacts', 'Metal plugs (tungsten, cobalt or copper) connecting source, drain and gate up to the wiring layers above.', [0, 4.4, 0], { parts: ctc })
      ],
      tour: [
        { text: 'Start with the substrate and isolation oxide.', focus: 'sti', explode: true },
        { text: 'Silicon fins stand up through the oxide.', focus: 'fins' },
        { text: 'Source and drain sit at the two ends of each fin.', focus: 'source' },
        { text: 'A thin high-k dielectric covers the fins…', focus: 'gate-oxide' },
        { text: '…and the metal gate wraps over three sides.', focus: 'gate' },
        { text: 'Gate on → a channel forms under the gate on all three faces.', focus: 'channel', explode: false }
      ]
    };
  };

  P['cmos-inverter'] = function () {
    var ct = [];
    [-4.4, -1.6, 1.8, 4.6].forEach(function (x) { ct.push({ t: 'cyl', from: [x, 0.02, 0.4], to: [x, 2.0, 0.4], s: [0.3, 1, 0.3] }); });
    [-3.0, 3.2].forEach(function (x) { ct.push({ t: 'cyl', from: [x, 0.6, -0.9], to: [x, 1.0, -0.9], s: [0.3, 1, 0.3] }); });
    return {
      title: 'CMOS inverter (NOT gate) — cross-section', intro: 'Two transistors make the simplest logic gate. Input high → output low; input low → output high. Explode to separate wiring from silicon.', cam: { yaw: 0.35, pitch: 0.45 },
      objects: [
        o('p-substrate', 'box', [0, -0.8, 0], [12, 1.6, 3], '#94a3b8', 'p-type substrate', 'Silicon lightly doped with boron (extra holes). The NMOS transistor is built directly in it.', [0, -1.2, 0]),
        o('n-well', 'box', [3.2, -0.695, 0], [5.2, 1.4, 3.02], '#c4b5fd', 'n-well', 'A region doped n-type (phosphorus) so the PMOS transistor can be built in the same chip — that is what "complementary" means.', [0, -1.2, 0]),
        o('nmos-source', 'box', [-4.4, -0.245, 0], [1.4, 0.5, 3.03], '#f59e0b', 'NMOS source (n⁺) → GND', 'Heavily doped n-type region tied to ground.', [0, -1.2, 0]),
        o('nmos-drain', 'box', [-1.6, -0.245, 0], [1.4, 0.5, 3.03], '#fb923c', 'NMOS drain (n⁺)', 'Connected to the output. When the NMOS is on it pulls the output down to 0 V.', [0, -1.2, 0]),
        o('nmos-gate', 'box', [-3.0, 0.35, 0], [1.0, 0.5, 2.4], '#dc2626', 'NMOS gate', 'Input high (VDD) on this gate attracts electrons under it → the NMOS turns ON.', [0, 0.5, 0]),
        o('nmos-oxide', 'box', [-3.0, 0.06, 0], [1.2, 0.08, 2.4], '#a7f3d0', 'Gate oxide', 'Nanometre-thin insulator under each gate; the gate controls the channel through it by its electric field — no current flows into the gate.', [0, 0.25, 0]),
        o('pmos-source', 'box', [4.6, -0.245, 0], [1.4, 0.5, 3.03], '#38bdf8', 'PMOS source (p⁺) → VDD', 'Heavily doped p-type region tied to the supply.', [0, -1.2, 0]),
        o('pmos-drain', 'box', [1.8, -0.245, 0], [1.4, 0.5, 3.03], '#0ea5e9', 'PMOS drain (p⁺)', 'Also connected to the output. When the PMOS is on it pulls the output up to VDD.', [0, -1.2, 0]),
        o('pmos-gate', 'box', [3.2, 0.35, 0], [1.0, 0.5, 2.4], '#dc2626', 'PMOS gate', 'Input low (0 V) turns the PMOS ON — it is the mirror image of the NMOS.', [0, 0.5, 0]),
        of('nmos-oxide', o('pmos-oxide', 'box', [3.2, 0.06, 0], [1.2, 0.08, 2.4], '#a7f3d0', null, null, [0, 0.25, 0])),
        o('contacts', 'multi', [0, 0, 0], [1, 1, 1], '#fbbf24', 'Contacts / vias', 'Vertical metal plugs joining silicon and gates to the metal wires above.', [0, 1.0, 0], { parts: ct }),
        o('gnd', 'box', [-4.4, 2.15, 0.4], [2.2, 0.3, 1.0], '#64748b', 'GND (VSS) rail', 'The ground wire (0 V) shared by every gate on the chip; the NMOS source connects to it.', [0, 1.8, 0]),
        o('vdd', 'box', [4.6, 2.15, 0.4], [2.2, 0.3, 1.0], '#ef4444', 'VDD rail', 'Supply voltage (well under 1 V in modern chips).', [0, 1.8, 0]),
        o('out', 'box', [0.1, 2.15, 0.4], [3.6, 0.3, 1.0], '#22c55e', 'Output Y = NOT A', 'Joins both drains. Exactly one transistor is on at a time, so the output is firmly pulled high or low and (ideally) no current flows from VDD to GND when the gate is not switching. Power is mainly used while switching: P ≈ α·C·V²·f.', [0, 1.8, 0]),
        o('in', 'box', [0.1, 1.05, -0.9], [6.8, 0.25, 0.4], '#a855f7', 'Input A', 'One wire drives BOTH gates. A = 1 → NMOS on, PMOS off → Y = 0. A = 0 → PMOS on, NMOS off → Y = 1.', [0, 1.4, 0])
      ],
      tour: [
        { text: 'The NMOS lives in the p-substrate; the PMOS lives in an n-well.', focus: 'n-well' },
        { text: 'The input wire drives both gates at once.', focus: 'in', explode: true },
        { text: 'Input high: NMOS on → output connected to GND → 0.', focus: 'nmos-gate' },
        { text: 'Input low: PMOS on → output connected to VDD → 1.', focus: 'pmos-gate' },
        { text: 'The output joins both drains — that is the inverter.', focus: 'out', explode: false }
      ]
    };
  };

  P['chip-package'] = function () {
    var balls = [], bumps = [], caps = [], fins = [], i, j;
    for (i = 0; i < 8; i++) for (j = 0; j < 8; j++) balls.push({ t: 'sphere', c: [-2.8 + i * 0.8, 0.22, -2.8 + j * 0.8], s: [0.45, 0.45, 0.45] });
    for (i = 0; i < 7; i++) for (j = 0; j < 7; j++) bumps.push({ t: 'sphere', c: [-1.08 + i * 0.36, 0.91, -1.08 + j * 0.36], s: [0.18, 0.16, 0.18] });
    [[-2.9, -2.9], [2.9, -2.9], [-2.9, 2.9], [2.9, 2.9], [0, -2.9], [0, 2.9]].forEach(function (p) { caps.push({ t: 'box', c: [p[0], 0.92, p[1]], s: [0.45, 0.2, 0.28] }); });
    fins.push({ t: 'box', c: [0, 1.85, 0], s: [6, 0.3, 6] }); for (i = 0; i < 11; i++) fins.push({ t: 'box', c: [-2.75 + i * 0.55, 2.7, 0], s: [0.14, 1.5, 6] });
    return {
      title: 'Flip-chip BGA package', intro: 'How a silicon die becomes a chip you can solder onto a board. Explode it: each layer has one job — connect, protect or cool.', cam: { yaw: 0.6, pitch: 0.4 },
      objects: [
        o('pcb', 'box', [0, -0.15, 0], [8, 0.3, 8], '#166534', 'Motherboard (PCB)', 'The circuit board the package is soldered onto.', [0, -2.6, 0]),
        o('bga-balls', 'multi', [0, 0, 0], [1, 1, 1], '#d1d5db', 'BGA solder balls', 'A grid of solder balls (ball-grid array) on the package underside, typically 0.4–1.0 mm apart, melted onto matching pads on the PCB in a reflow oven.', [0, -1.5, 0], { parts: balls }),
        o('substrate', 'box', [0, 0.62, 0], [7, 0.4, 7], '#a16207', 'Package substrate', 'A multilayer organic laminate with fine copper wiring. It "fans out" the die\'s tiny bump pitch (well under 0.2 mm) to the much larger ball pitch a PCB can handle.', [0, -0.4, 0]),
        o('decaps', 'multi', [0, 0, 0], [1, 1, 1], '#a8a29e', 'Decoupling capacitors', 'Tiny charge reservoirs right next to the die that smooth the supply voltage during sudden current spikes.', [0, -0.2, 0], { parts: caps }),
        o('bumps', 'multi', [0, 0, 0], [1, 1, 1], '#e5e7eb', 'Bumps (C4 / copper pillars)', 'Thousands of microscopic solder or copper-pillar bumps connect the flipped die\'s pads straight to the substrate — shorter, better connections than old wire bonds.', [0, 0.7, 0], { parts: bumps }),
        o('underfill', 'box', [0, 0.91, 0], [3.0, 0.17, 3.0], '#fef3c7', 'Underfill', 'Epoxy flowed between die and substrate around the bumps. It shares the stress caused by silicon and laminate expanding by different amounts when heated.', [0, 0.7, 0], { opacity: 0.35 }),
        o('beol', 'box', [0, 1.03, 0], [2.6, 0.06, 2.6], '#7c3aed', 'Transistors + metal layers (face down)', 'The active side of the die: billions of transistors with a dozen or more copper wiring layers above them (the "back end of line"). In flip-chip it faces DOWN towards the bumps.', [0, 1.4, 0]),
        o('die', 'box', [0, 1.2, 0], [2.6, 0.28, 2.6], '#1e293b', 'Silicon die', 'The chip itself, cut from a wafer. Its back side faces up so heat can be pulled out through the lid.', [0, 1.9, 0]),
        o('tim1', 'box', [0, 1.36, 0], [2.6, 0.04, 2.6], '#e2e8f0', 'Thermal interface material (TIM1)', 'Solder (e.g. indium) or a polymer paste filling microscopic gaps between die and lid so heat flows well.', [0, 2.6, 0]),
        o('ihs', 'box', [0, 1.5, 0], [5.4, 0.24, 5.4], '#cbd5e1', 'Integrated heat spreader (lid)', 'A nickel-plated copper lid that spreads the die\'s heat over a bigger area and protects the fragile silicon.', [0, 3.5, 0]),
        o('heatsink', 'multi', [0, 0, 0], [1, 1, 1], '#94a3b8', 'Heatsink', 'Aluminium or copper fins (with thermal paste — TIM2 — on the lid) hand the heat to moving air.', [0, 4.8, 0], { parts: fins })
      ],
      tour: [
        { text: 'From the bottom: the motherboard.', focus: 'pcb', explode: true },
        { text: 'Solder balls attach the package to the board.', focus: 'bga-balls' },
        { text: 'The substrate re-routes thousands of fine connections.', focus: 'substrate' },
        { text: 'Microscopic bumps join the flipped die to the substrate.', focus: 'bumps' },
        { text: 'Transistors and wiring face down…', focus: 'beol' },
        { text: '…the die\'s back faces up for cooling.', focus: 'die' },
        { text: 'Heat path: TIM → lid → paste → heatsink → air.', focus: 'ihs', explode: false }
      ]
    };
  };

  P['bloch-sphere'] = function () {
    var r = 2;
    return {
      title: 'Bloch sphere — one qubit', mode: 'bloch', intro: 'Every pure state of one qubit is a point on this sphere: |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)·sin(θ/2)|1⟩. Drag the orange arrow (or use the θ/φ sliders and gates). Measuring gives 0 with probability cos²(θ/2).',
      cam: { yaw: 0.75, pitch: 0.3 },
      goals: [{ key: 'one', goal: 'Turn |0⟩ into |1⟩ (P(1) = 100%)' }, { key: 'super', goal: 'Make an equal superposition (P(0) = P(1) = 50%)' }, { key: 'hadamard', goal: 'Apply a Hadamard (H) gate' }, { key: 'measure', goal: 'Measure the qubit at least once' }],
      objects: [
        o('sphere', 'sphere', [0, 0, 0], [2 * r, 2 * r, 2 * r], '#93c5fd', 'Bloch sphere', 'The surface holds every pure single-qubit state. Opposite points are orthogonal (perfectly distinguishable) states. Points inside the sphere would be mixed (noisy) states.', null, { opacity: 0.14 }),
        o('equator', 'torus', [0, 0, 0], [2 * r, 0.03, 2 * r], '#64748b', null, null, null, { pick: false, opacity: 0.6 }),
        o('meridian-1', 'torus', [0, 0, 0], [2 * r, 0.03, 2 * r], '#64748b', null, null, null, { pick: false, opacity: 0.4, rot: [90, 0, 0] }),
        o('meridian-2', 'torus', [0, 0, 0], [2 * r, 0.03, 2 * r], '#64748b', null, null, null, { pick: false, opacity: 0.4, rot: [0, 0, 90] }),
        seg('z-axis', 'arrow', [0, -2.4, 0], [0, 2.7, 0], 0.08, '#3b82f6', 'Z axis', 'Measurement in the standard basis compares the arrow with this axis: P(0) = (1 + z)/2.'),
        seg('x-axis', 'arrow', [0, 0, -2.4], [0, 0, 2.7], 0.08, '#ef4444', 'X axis', 'Points to |+⟩ = (|0⟩ + |1⟩)/√2. The X gate rotates states 180° around this axis.'),
        seg('y-axis', 'arrow', [-2.4, 0, 0], [2.7, 0, 0], 0.08, '#22c55e', 'Y axis', 'Points to |+i⟩ = (|0⟩ + i|1⟩)/√2.'),
        o('ket0', 'sphere', [0, r, 0], [0.18, 0.18, 0.18], '#1d4ed8', '|0⟩', 'North pole, θ = 0: measuring always gives 0.'),
        o('ket1', 'sphere', [0, -r, 0], [0.18, 0.18, 0.18], '#b91c1c', '|1⟩', 'South pole, θ = 180°: measuring always gives 1.'),
        o('plus', 'sphere', [0, 0, r], [0.16, 0.16, 0.16], '#f97316', '|+⟩', 'On the equator (θ = 90°, φ = 0): a 50/50 superposition. H|0⟩ = |+⟩.'),
        o('minus', 'sphere', [0, 0, -r], [0.16, 0.16, 0.16], '#f97316', '|−⟩', '(|0⟩ − |1⟩)/√2: also 50/50 if measured, but with the opposite phase to |+⟩ — interference can tell them apart.'),
        o('plus-i', 'sphere', [r, 0, 0], [0.16, 0.16, 0.16], '#16a34a', '|+i⟩', '(|0⟩ + i|1⟩)/√2, φ = 90°. S|+⟩ = |+i⟩.'),
        o('minus-i', 'sphere', [-r, 0, 0], [0.16, 0.16, 0.16], '#16a34a', '|−i⟩', '(|0⟩ − i|1⟩)/√2, φ = 270°.'),
        seg('state', 'arrow', [0, 0, 0], [0, r, 0], 0.14, '#f59e0b', '|ψ⟩ (the state)', 'The qubit\'s state. θ (from the north pole) sets the measurement odds; φ (around the equator) is the relative phase, invisible to a single measurement but vital for interference in algorithms.'),
        of('state', o('state-tip', 'sphere', [0, r, 0], [0.32, 0.32, 0.32], '#f59e0b'))
      ]
    };
  };

  function ndPreset(kind) {
    return function (spec) {
      var n = Math.max(4, Math.min(8, Math.round((spec && spec.dims) || 4)));
      return {
        title: kind === 'simplex' ? n + '-simplex' : n + '-dimensional hypercube', mode: 'nd', nd: { kind: kind, dims: n }, objects: [],
        goals: [{ key: 'rot2', goal: 'Rotate in two different planes that use a 4th (or higher) axis' }, { key: 'dims', goal: 'Change the number of dimensions' }, n === 4 ? { key: 'slice', goal: 'Turn on 4D slice mode and move the slice' } : { key: 'proj', goal: 'Switch between perspective and orthographic projection' }]
      };
    };
  }
  P.hypercube = ndPreset('hypercube');
  P.simplex = ndPreset('simplex');

  /* ======================= SCIENCE ======================= */
  P['solar-system'] = function () {
    var pl = [
      ['mercury', 'Mercury', 3.2, 0.25, '#a8a29e', 'Smallest planet and closest to the Sun; a year lasts 88 Earth days. Almost no atmosphere, so it swings from about 430 °C by day to −180 °C at night.'],
      ['venus', 'Venus', 4.2, 0.45, '#fcd34d', 'The hottest planet (about 465 °C) because its thick carbon-dioxide atmosphere traps heat (runaway greenhouse effect). It spins backwards very slowly: its day (243 Earth days) is longer than its year (225).'],
      ['earth', 'Earth', 5.4, 0.48, '#3b82f6', 'The only world known to have life. Liquid water covers about 71% of the surface; one large Moon; a year of about 365.25 days.'],
      ['mars', 'Mars', 6.8, 0.34, '#dc2626', 'Iron-oxide (rust) dust makes it red. Home of Olympus Mons, the largest known volcano in the Solar System, and two tiny moons, Phobos and Deimos. A year is about 687 Earth days.'],
      ['jupiter', 'Jupiter', 9.6, 1.5, '#d6a26b', 'The largest planet, a gas giant of mostly hydrogen and helium. Its Great Red Spot is a storm wider than Earth. Its moon Ganymede is the largest moon in the Solar System.'],
      ['saturn', 'Saturn', 12.2, 1.25, '#eab308', 'Gas giant famous for bright rings of ice and rock. Its average density is lower than water\'s. Its moon Titan has a thick nitrogen atmosphere.'],
      ['uranus', 'Uranus', 14.6, 0.8, '#67e8f9', 'An ice giant tilted about 98°, so it rolls around the Sun on its side. Methane in its atmosphere makes it blue-green.'],
      ['neptune', 'Neptune', 16.8, 0.78, '#3b5bdb', 'The farthest planet, an ice giant with the fastest winds measured in the Solar System (over 2,000 km/h). It was found in 1846 after mathematicians predicted where it must be.']
    ];
    var objs = [o('sun', 'sphere', [0, 0, 0], [3, 3, 3], '#fbbf24', 'Sun', 'A G-type main-sequence star about 4.6 billion years old, holding about 99.8% of the Solar System\'s mass. It shines by fusing hydrogen into helium; its light takes about 8 minutes 20 seconds to reach Earth.')];
    pl.forEach(function (p, i) {
      var a = i * 2.1, d = p[2], w = 0.9 * Math.pow(3.2 / d, 1.5);
      objs.push(o(p[0], 'sphere', [d * Math.cos(a), 0, d * Math.sin(a)], [p[3], p[3], p[3]], p[4], p[1], p[5], null, { spin: { c: [0, 0, 0], axis: [0, 1, 0], w: w } }));
      objs.push(o('orbit-' + p[0], 'torus', [0, 0, 0], [2 * d, 0.03, 2 * d], '#64748b', null, null, null, { pick: false, opacity: 0.45 }));
      if (p[0] === 'saturn') objs.push(of('saturn', o('saturn-rings', 'torus', [d * Math.cos(a), 0, d * Math.sin(a)], [2.9, 0.18, 2.9], '#fde68a', null, null, null, { spin: { c: [0, 0, 0], axis: [0, 1, 0], w: w }, opacity: 0.8 })));
    });
    objs.push(o('asteroid-belt', 'torus', [0, 0, 0], [16.4, 0.55, 16.4], '#a8a29e', 'Asteroid belt', 'Millions of rocky bodies between Mars and Jupiter; the largest, Ceres, is a dwarf planet. All of them together have far less mass than our Moon.', null, { opacity: 0.25 }));
    return { title: 'The Solar System (not to scale)', intro: 'Sizes and distances are NOT to scale — at true scale the planets would be invisible dots. Inner planets orbit faster (Kepler\'s third law). Press ▶/⏸ to play or pause the orbits.', cam: { yaw: 0.3, pitch: 0.6 }, objects: objs,
      tour: [{ text: 'Everything orbits the Sun.', focus: 'sun' }, { text: 'Rocky inner planets: Mercury, Venus, Earth, Mars.', focus: 'earth' }, { text: 'The asteroid belt separates the inner and outer planets.', focus: 'asteroid-belt' }, { text: 'Gas giants: Jupiter and Saturn.', focus: 'jupiter' }, { text: 'Ice giants: Uranus and Neptune.', focus: 'neptune' }] };
  };

  P['earth-layers'] = function () {
    return {
      title: 'Inside the Earth', intro: 'Four main layers. Explode to lay them side by side. The crust is drawn much thicker than reality — at true scale it would be thinner than an apple\'s skin.', cam: { yaw: 0.3, pitch: 0.2 },
      objects: [
        o('crust', 'sphere', [0, 0, 0], [4, 4, 4], '#8d6e4f', 'Crust', 'The thin rocky outer skin: about 5–10 km under oceans and 30–70 km under continents. Broken into tectonic plates that move a few centimetres a year.', [-7.4, 0, 0], { opacity: 0.28 }),
        o('mantle', 'sphere', [0, 0, 0], [3.8, 3.8, 3.8], '#ea580c', 'Mantle', 'Hot solid rock down to about 2,900 km. Over millions of years it flows very slowly (convection), dragging the plates above it.', [3.4, 0, 0], { opacity: 0.38 }),
        o('outer-core', 'sphere', [0, 0, 0], [2.2, 2.2, 2.2], '#f59e0b', 'Outer core', 'Liquid iron and nickel from about 2,900 to 5,150 km deep. Its swirling flow generates Earth\'s magnetic field, which shields us from the solar wind.', [-2.6, 0, 0], { opacity: 0.6 }),
        o('inner-core', 'sphere', [0, 0, 0], [0.77, 0.77, 0.77], '#fde047', 'Inner core', 'A solid ball of iron and nickel about 1,220 km in radius, roughly as hot as the Sun\'s surface (over 5,000 °C). It stays solid because the pressure is enormous.')
      ],
      tour: [{ text: 'The crust — where we live.', focus: 'crust', explode: true }, { text: 'The mantle — solid rock that creeps.', focus: 'mantle' }, { text: 'The liquid outer core makes the magnetic field.', focus: 'outer-core' }, { text: 'The solid inner core.', focus: 'inner-core', explode: false }]
    };
  };

  P['atom-bohr'] = function () {
    var t = (1 + Math.sqrt(5)) / 2, ico = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]], objs = [];
    ico.forEach(function (v, i) {
      var p = M3s(v, 0.2), isP = i % 2 === 0, id = (isP ? 'proton-' : 'neutron-') + (Math.floor(i / 2) + 1);
      var x = o(id, 'sphere', p, [0.36, 0.36, 0.36], isP ? '#ef4444' : '#9ca3af');
      if (i === 0) { x.label = 'Proton (+)'; x.info = 'Positive particle in the nucleus. The number of protons (6) is the atomic number — it is what makes this atom carbon.'; }
      else if (i === 1) { x.label = 'Neutron (0)'; x.info = 'Neutral particle in the nucleus. Carbon-12 has 6 neutrons; carbon-14 (used in radiocarbon dating) has 8.'; }
      else x.of = isP ? 'proton-1' : 'neutron-1';
      objs.push(x);
    });
    function shell(id, R, tilt, n, w, label, info) {
      var k = PI / 180 * tilt, nrm = [0, Math.cos(k), Math.sin(k)], v = [0, -Math.sin(k), Math.cos(k)];
      objs.push(o(id, 'torus', [0, 0, 0], [2 * R, 0.04, 2 * R], '#64748b', label, info, null, { rot: [tilt, 0, 0], opacity: 0.55 }));
      for (var j = 0; j < n; j++) { var a = 2 * PI * j / n, p = [R * Math.cos(a), R * Math.sin(a) * v[1], R * Math.sin(a) * v[2]]; var e = o(id + '-e' + (j + 1), 'sphere', p, [0.22, 0.22, 0.22], '#3b82f6', null, null, null, { spin: { c: [0, 0, 0], axis: nrm, w: w } }); if (id === 'shell-1' && j === 0) { e.id = 'electron'; e.label = 'Electron (−)'; e.info = 'Tiny negative particle, about 1/1836 of a proton\'s mass. In reality electrons are not little balls on tracks: they occupy orbitals — clouds of probability.'; } else e.of = 'electron'; objs.push(e); }
    }
    shell('shell-1', 2, 70, 2, 1.1, 'First shell (K): 2 electrons', 'The first shell can hold at most 2 electrons.');
    shell('shell-2', 3.5, 110, 4, 0.7, 'Second shell (L): 4 electrons', 'Carbon has 4 electrons in its outer shell (valence electrons), so it forms 4 bonds — the basis of organic chemistry.');
    return { title: 'Carbon-12 atom (Bohr model)', intro: 'The Bohr model (1913) is a helpful picture but a simplified one; quantum mechanics replaced orbits with orbitals. Not to scale: if the nucleus were a marble, the atom would be the size of a stadium.', cam: { yaw: 0.5, pitch: 0.3 }, objects: objs };
  };
  function M3s(v, s) { return [v[0] * s, v[1] * s, v[2] * s]; }

  P['dna-helix'] = function () {
    var seq = 'ATGCGTACCGATTGCA', comp = { A: 'T', T: 'A', G: 'C', C: 'G' }, col = { A: '#22c55e', T: '#ef4444', G: '#f59e0b', C: '#3b82f6' };
    var names = { A: ['Adenine (A)', 'A purine base; pairs with thymine through 2 hydrogen bonds.'], T: ['Thymine (T)', 'A pyrimidine base; pairs with adenine (2 hydrogen bonds). In RNA, uracil (U) takes its place.'], G: ['Guanine (G)', 'A purine base; pairs with cytosine through 3 hydrogen bonds, so G–C pairs are a little stronger.'], C: ['Cytosine (C)', 'A pyrimidine base; pairs with guanine (3 hydrogen bonds).'] };
    var b1 = [], b2 = [], halves = { A: [], T: [], G: [], C: [] }, R = 1.0, rise = 0.34, twist = 2 * PI / 10.5, off = 155 * PI / 180, y0 = -seq.length * rise / 2;
    for (var i = 0; i < seq.length; i++) {
      var a = i * twist, y = y0 + i * rise, p1 = [R * Math.cos(a), y, R * Math.sin(a)], p2 = [R * Math.cos(a + off), y, R * Math.sin(a + off)], mid = [(p1[0] + p2[0]) / 2, y, (p1[2] + p2[2]) / 2];
      b1.push({ t: 'sphere', c: p1, s: [0.26, 0.26, 0.26] }); b2.push({ t: 'sphere', c: p2, s: [0.26, 0.26, 0.26] });
      var s = seq[i], c = comp[s];
      halves[s].push({ t: 'cyl', from: p1, to: mid, s: [0.13, 1, 0.13] }); halves[c].push({ t: 'cyl', from: mid, to: p2, s: [0.13, 1, 0.13] });
    }
    var objs = [
      o('backbone-1', 'multi', [0, 0, 0], [1, 1, 1], '#a78bfa', 'Sugar-phosphate backbone (strand 1)', 'Alternating deoxyribose sugars and phosphate groups. The two strands run in opposite directions (antiparallel: 5′→3′ and 3′→5′).', [-0.9, 0, 0], { parts: b1 }),
      o('backbone-2', 'multi', [0, 0, 0], [1, 1, 1], '#f472b6', 'Sugar-phosphate backbone (strand 2)', 'The complementary strand. Because A pairs only with T and G only with C, each strand is a template for copying the other — the secret of DNA replication.', [0.9, 0, 0], { parts: b2 })
    ];
    ['A', 'T', 'G', 'C'].forEach(function (b) { objs.push(o('base-' + b.toLowerCase(), 'multi', [0, 0, 0], [1, 1, 1], col[b], names[b][0], names[b][1], null, { parts: halves[b] })); });
    objs.push(o('helix-facts', 'label', [0, -y0 + 0.8, 0], [0.1, 0.1, 0.1], '#ffffff', 'B-DNA: ~10.5 base pairs per turn, 3.4 nm per turn, 2 nm wide', 'These are the classic dimensions of the right-handed B-form double helix described by Watson and Crick in 1953, using Rosalind Franklin\'s X-ray data. The uneven spacing of the two backbones creates the major and minor grooves where proteins read the sequence.'));
    return { title: 'DNA double helix', intro: 'A short stretch of B-DNA (16 base pairs). Tap the backbones and the four bases. Explode to pull the strands apart, as happens when DNA is copied.', cam: { yaw: 0.2, pitch: 0.15 }, objects: objs };
  };

  P['cell-animal'] = function () {
    var ribo = [], i, seed = 3; function r() { seed = (seed * 48271) % 2147483647; return seed / 2147483647 - 0.5; }
    for (i = 0; i < 26; i++) ribo.push({ t: 'sphere', c: [r() * 6, r() * 5, r() * 6], s: [0.15, 0.15, 0.15] });
    return {
      title: 'Animal cell', intro: 'A typical animal cell (not to scale; real cells are ~10–30 µm). Explode to pull organelles out of the cytoplasm.', cam: { yaw: 0.5, pitch: 0.3 },
      objects: [
        o('membrane', 'sphere', [0, 0, 0], [8, 7, 8], '#fca5a5', 'Cell membrane & cytoplasm', 'A flexible phospholipid bilayer studded with proteins; it controls what enters and leaves (selectively permeable). Inside is the cytoplasm: watery cytosol plus the organelles. Animal cells have no cell wall.', null, { opacity: 0.16 }),
        o('nucleus', 'sphere', [0.2, 0.2, 0], [2.6, 2.6, 2.6], '#7c3aed', 'Nucleus', 'Holds the DNA (as chromatin) inside a double membrane, the nuclear envelope, with pores for RNA to get out. It controls the cell by deciding which genes are read.', [0, 4, 0], { opacity: 0.6 }),
        o('nucleolus', 'sphere', [0.5, 0.45, 0.2], [0.9, 0.9, 0.9], '#4c1d95', 'Nucleolus', 'A dense region in the nucleus that makes ribosomal RNA and assembles ribosome parts.', [0, 4, 0]),
        o('rough-er', 'torus', [0.2, 0.2, 0], [3.7, 0.3, 3.7], '#60a5fa', 'Rough endoplasmic reticulum', 'Folded membranes covered in ribosomes, continuous with the nuclear envelope. Proteins for membranes or export are made and folded here.', [0, 2.6, 0], { rot: [20, 0, 0] }),
        of('rough-er', o('rough-er-2', 'torus', [0.2, 0.2, 0], [4.5, 0.3, 4.5], '#60a5fa', null, null, [0, 2.6, 0], { rot: [-15, 0, 10] })),
        o('smooth-er', 'torus', [-2.0, -1.4, 1.0], [2.2, 0.3, 1.6], '#93c5fd', 'Smooth endoplasmic reticulum', 'No ribosomes. Makes lipids, helps detoxify drugs (lots in liver cells) and stores calcium.', [-2.2, -2.0, 0], { rot: [30, 20, 0] }),
        o('golgi', 'multi', [0, 0, 0], [1, 1, 1], '#f59e0b', 'Golgi apparatus', 'A stack of flattened sacs: it modifies, sorts and packages proteins into vesicles — the cell\'s post office.', [3, -1.5, 0], { parts: [0, 1, 2, 3].map(function (k) { return { t: 'cyl', c: [2.3 + k * 0.05, -1.0 - k * 0.22, 0.6], s: [1.7 - k * 0.15, 0.1, 1.1 - k * 0.1] }; }) }),
        o('vesicle', 'sphere', [3.2, -0.5, 1.3], [0.45, 0.45, 0.45], '#fde68a', 'Transport vesicle', 'A small membrane bubble carrying proteins from the Golgi to the membrane (or out of the cell by exocytosis).', [3.6, -0.8, 0.6]),
        o('mitochondrion', 'capsule', [-2.4, 1.2, 1.2], [0.7, 1.6, 0.7], '#f97316', 'Mitochondria', 'Power stations: aerobic respiration here makes most of the cell\'s ATP. The inner membrane is folded into cristae, and mitochondria carry their own small DNA.', [-2.6, 1.4, 1.4], { rot: [0, 0, 60] }),
        of('mitochondrion', o('mitochondrion-2', 'capsule', [1.8, 1.8, -1.6], [0.7, 1.6, 0.7], '#f97316', null, null, [2.2, 2.2, -2], { rot: [50, 0, 20] })),
        of('mitochondrion', o('mitochondrion-3', 'capsule', [-1.0, -2.2, -1.4], [0.7, 1.6, 0.7], '#f97316', null, null, [-1.2, -2.6, -1.8], { rot: [0, 40, 80] })),
        o('lysosome', 'sphere', [2.6, 0.7, 1.9], [0.55, 0.55, 0.55], '#10b981', 'Lysosomes', 'Vesicles full of digestive enzymes working at acidic pH (about 4.5–5). They break down worn-out parts, food particles and microbes.', [2.8, 1.0, 2.2]),
        of('lysosome', o('lysosome-2', 'sphere', [-2.8, -0.5, -1.5], [0.5, 0.5, 0.5], '#10b981', null, null, [-3.2, -0.6, -1.8])),
        o('ribosomes', 'multi', [0, 0, 0], [1, 1, 1], '#1e3a8a', 'Ribosomes', 'Tiny machines (RNA + protein) that read messenger RNA and join amino acids into proteins. Free ones make proteins used inside the cell.', null, { parts: ribo }),
        o('centrosome', 'multi', [0, 0, 0], [1, 1, 1], '#be185d', 'Centrosome (two centrioles)', 'Organises the microtubule skeleton and helps pull chromosomes apart during cell division. Animal cells have centrioles; most plant cells do not.', [1.2, -2.2, 1.5], { parts: [{ t: 'cyl', c: [0.9, -2.3, 1.6], s: [0.25, 0.7, 0.25] }, { t: 'cyl', c: [0.9, -2.3, 1.6], s: [0.25, 0.7, 0.25], r: [90, 0, 0] }] })
      ],
      tour: [{ text: 'The membrane surrounds everything.', focus: 'membrane' }, { text: 'The nucleus holds the DNA.', focus: 'nucleus', explode: true }, { text: 'Ribosomes on the rough ER build proteins…', focus: 'rough-er' }, { text: '…the Golgi packs and ships them.', focus: 'golgi' }, { text: 'Mitochondria release energy from food as ATP.', focus: 'mitochondrion' }, { text: 'Lysosomes digest and recycle.', focus: 'lysosome', explode: false }]
    };
  };

  P['cell-plant'] = function () {
    var chl = [[-3.6, -1.8, 1.2], [-1.2, 2.2, 1.5], [1.8, 2.2, -1.4], [3.6, -1.6, 1.3], [2.0, -2.2, -1.5], [-3.4, 1.6, -1.4]].map(function (c) { return { t: 'sphere', c: c, s: [1.3, 0.5, 0.7] }; });
    return {
      title: 'Plant cell', intro: 'A typical plant leaf cell. Compare with the animal cell: a rigid wall, a big central vacuole and chloroplasts.', cam: { yaw: 0.5, pitch: 0.3 },
      objects: [
        o('cell-wall', 'box', [0, 0, 0], [9, 6, 5], '#65a30d', 'Cell wall', 'A rigid layer mostly of cellulose outside the membrane. It gives the cell a fixed box-like shape and stops it bursting. Animal cells do not have one.', null, { opacity: 0.16 }),
        o('membrane', 'box', [0, 0, 0], [8.6, 5.6, 4.6], '#bbf7d0', 'Cell membrane', 'The same phospholipid bilayer as in animal cells, pressed against the wall by the vacuole\'s pressure.', null, { opacity: 0.15 }),
        o('vacuole', 'capsule', [0.6, 0, 0], [3.2, 5.6, 3.0], '#7dd3fc', 'Large central vacuole', 'A sac of cell sap (water, ions, sugars, pigments). It can fill most of the cell; its pressure (turgor) keeps leaves and stems firm — a wilted plant has lost turgor.', [0, 0, 3.2], { rot: [0, 0, 90], opacity: 0.4 }),
        o('nucleus', 'sphere', [-3.2, 1.2, 0.3], [1.6, 1.6, 1.6], '#7c3aed', 'Nucleus', 'Contains the DNA; usually pushed to the side by the big vacuole.', [-1.6, 2.4, 0], { opacity: 0.7 }),
        o('chloroplasts', 'multi', [0, 0, 0], [1, 1, 1], '#16a34a', 'Chloroplasts', 'Where photosynthesis happens: light energy + carbon dioxide + water → glucose + oxygen. Inside are stacks of thylakoid discs (grana) holding green chlorophyll. Like mitochondria they have their own DNA.', [0, 0, -2.6], { parts: chl }),
        o('mitochondrion', 'capsule', [3.4, 1.6, -1.2], [0.5, 1.2, 0.5], '#f97316', 'Mitochondria', 'Plant cells have mitochondria too — they release energy from the sugar the chloroplasts make, day and night.', [2, 2, -1], { rot: [0, 0, 70] }),
        o('golgi', 'multi', [0, 0, 0], [1, 1, 1], '#f59e0b', 'Golgi apparatus', 'Packages proteins and also builds materials for the cell wall.', [2.4, -2, 0], { parts: [0, 1, 2].map(function (k) { return { t: 'cyl', c: [-1.6 + k * 0.05, -2.0 - k * 0.2, 1.4], s: [1.3, 0.1, 0.8] }; }) }),
        o('er', 'torus', [-3.2, 1.2, 0.3], [2.6, 0.24, 2.6], '#60a5fa', 'Endoplasmic reticulum', 'Membrane network around the nucleus where proteins (rough ER) and lipids (smooth ER) are made.', [-1.6, 2.4, 0], { rot: [70, 0, 0] }),
        o('plasmodesmata', 'multi', [0, 0, 0], [1, 1, 1], '#854d0e', 'Plasmodesmata', 'Tiny channels through the walls that connect neighbouring plant cells, letting water and small molecules pass.', null, { parts: [{ t: 'cyl', c: [4.45, 0.8, 0], s: [0.18, 0.6, 0.18], r: [0, 0, 90] }, { t: 'cyl', c: [-4.45, -1, 0.5], s: [0.18, 0.6, 0.18], r: [0, 0, 90] }] })
      ],
      tour: [{ text: 'The cell wall gives plant cells their shape.', focus: 'cell-wall' }, { text: 'The central vacuole keeps the cell firm.', focus: 'vacuole', explode: true }, { text: 'Chloroplasts turn light into food.', focus: 'chloroplasts' }, { text: 'Mitochondria are here too.', focus: 'mitochondrion' }, { text: 'Plasmodesmata link cell to cell.', focus: 'plasmodesmata', explode: false }]
    };
  };

  P.heart = function () {
    return {
      title: 'The human heart (simplified)', intro: 'Front view, as if facing a person: their LEFT side is on YOUR right. Blue = oxygen-poor blood, red = oxygen-rich. General education, not medical advice.', cam: { yaw: 0.25, pitch: 0.15 },
      objects: [
        o('right-atrium', 'sphere', [-1.4, 1.1, 0], [2.0, 2.2, 2.0], '#3b82f6', 'Right atrium', 'Receives oxygen-poor blood from the body through the venae cavae. The heart\'s natural pacemaker (the sinoatrial node) sits in its wall.', [-1.2, 0.6, 0.6], { opacity: 0.92 }),
        o('right-ventricle', 'sphere', [-0.7, -0.9, 0.5], [2.6, 3.0, 2.2], '#2563eb', 'Right ventricle', 'Pumps blood a short way to the lungs through the pulmonary valve and artery. Its wall is thinner than the left ventricle\'s.', [-1.2, -0.8, 1.0], { rot: [0, 0, 15], opacity: 0.92 }),
        o('left-atrium', 'sphere', [1.2, 1.5, -0.8], [2.0, 1.8, 1.8], '#ef4444', 'Left atrium', 'Receives oxygen-rich blood back from the lungs through the pulmonary veins.', [1.2, 0.8, -0.8], { opacity: 0.92 }),
        o('left-ventricle', 'sphere', [1.2, -0.9, -0.2], [2.6, 3.6, 2.6], '#dc2626', 'Left ventricle', 'The strongest chamber, with the thickest wall: it pumps blood through the aortic valve to the whole body. It forms the heart\'s tip (apex), which points down and to the left.', [1.4, -1.0, 0], { rot: [0, 0, 25], opacity: 0.92 }),
        o('vena-cava', 'capsule', null, [0.75, 1, 0.75], '#1d4ed8', 'Venae cavae', 'The superior (from head and arms) and inferior (from the lower body) venae cavae bring oxygen-poor blood into the right atrium.', [-2.2, 0.6, 0.6], { from: [-1.7, 2.0, 0], to: [-1.7, 4.6, 0] }),
        of('vena-cava', o('vena-cava-inf', 'capsule', null, [0.8, 1, 0.8], '#1d4ed8', null, null, [-2.2, -0.6, 0.6], { from: [-1.7, 0.1, -0.2], to: [-1.7, -3.2, -0.4] })),
        o('pulmonary-artery', 'capsule', null, [0.75, 1, 0.75], '#60a5fa', 'Pulmonary artery', 'Carries oxygen-poor blood from the right ventricle to both lungs — the only artery carrying oxygen-poor blood (in adults).', [0, 1.4, 1.4], { from: [-0.4, 0.9, 0.8], to: [0.2, 2.9, 0.9] }),
        of('pulmonary-artery', o('pulmonary-artery-l', 'capsule', null, [0.55, 1, 0.55], '#60a5fa', null, null, [0, 1.4, 1.4], { from: [0.2, 2.9, 0.9], to: [2.8, 3.1, -0.2] })),
        of('pulmonary-artery', o('pulmonary-artery-r', 'capsule', null, [0.55, 1, 0.55], '#60a5fa', null, null, [0, 1.4, 1.4], { from: [0.2, 2.9, 0.9], to: [-2.6, 3.1, -0.4] })),
        o('pulmonary-veins', 'capsule', null, [0.45, 1, 0.45], '#f87171', 'Pulmonary veins', 'Bring oxygen-rich blood from the lungs into the left atrium (usually four veins).', [1.6, 0.6, -1.4], { from: [3.2, 1.6, -1.0], to: [1.6, 1.6, -0.9] }),
        of('pulmonary-veins', o('pulmonary-veins-r', 'capsule', null, [0.45, 1, 0.45], '#f87171', null, null, [1.6, 0.6, -1.4], { from: [-2.8, 1.8, -1.3], to: [0.4, 1.6, -1.0] })),
        o('aorta', 'capsule', null, [0.9, 1, 0.9], '#b91c1c', 'Aorta', 'The body\'s largest artery. It rises from the left ventricle, arches over, and runs down behind the heart, branching to every organ. The coronary arteries that feed the heart muscle itself branch off its base.', [0.4, 1.6, 0], { from: [0.25, 1.4, 0], to: [0.45, 3.9, 0] }),
        of('aorta', o('aorta-arch', 'capsule', null, [0.9, 1, 0.9], '#b91c1c', null, null, [0.4, 1.6, 0], { from: [0.45, 3.9, 0], to: [1.7, 4.3, -0.6] })),
        of('aorta', o('aorta-desc', 'capsule', null, [0.8, 1, 0.8], '#b91c1c', null, null, [0.4, 1.6, 0], { from: [1.7, 4.3, -0.6], to: [1.9, -3.0, -1.6] })),
        o('tricuspid', 'cylinder', [-1.05, 0.2, 0.3], [0.8, 0.12, 0.8], '#fde68a', 'Tricuspid valve', 'Between right atrium and right ventricle; three flaps stop blood flowing backwards.', [-2.4, 0, 1.6], { rot: [0, 0, 20] }),
        o('pulmonary-valve', 'cylinder', [-0.35, 0.9, 0.8], [0.6, 0.1, 0.6], '#fde68a', 'Pulmonary valve', 'Opens as the right ventricle squeezes, then snaps shut.', [0, 0.8, 2.4]),
        o('mitral', 'cylinder', [1.2, 0.35, -0.5], [0.8, 0.12, 0.8], '#fde68a', 'Mitral valve', 'Between left atrium and left ventricle; it has two flaps. Valve closures make the "lub-dub" sound.', [2.6, 0, -1.6], { rot: [0, 0, -15] }),
        o('aortic-valve', 'cylinder', [0.25, 1.35, 0.05], [0.7, 0.1, 0.7], '#fde68a', 'Aortic valve', 'Opens to let the left ventricle eject blood into the aorta.', [0, 1.6, 2.0])
      ],
      tour: [
        { text: 'Oxygen-poor blood from the body enters through the venae cavae…', focus: 'vena-cava' },
        { text: '…into the right atrium.', focus: 'right-atrium' },
        { text: 'Through the tricuspid valve into the right ventricle.', focus: 'right-ventricle' },
        { text: 'Pumped through the pulmonary valve and artery to the lungs to pick up oxygen.', focus: 'pulmonary-artery' },
        { text: 'Oxygen-rich blood returns through the pulmonary veins…', focus: 'pulmonary-veins' },
        { text: '…into the left atrium.', focus: 'left-atrium' },
        { text: 'Through the mitral valve into the powerful left ventricle.', focus: 'left-ventricle' },
        { text: 'Out through the aortic valve into the aorta and the whole body. About 60–100 beats a minute at rest.', focus: 'aorta' }
      ]
    };
  };

  P['brain-lobes'] = function () {
    function pair(id, pos, size, col, label, info, ex) {
      var L = o(id, 'sphere', pos, size, col, label, info, [ex[0], ex[1], ex[2] + 1.2]), Rr = o(id + '-r', 'sphere', [pos[0], pos[1], -pos[2]], size, col, null, null, [ex[0], ex[1], -ex[2] - 1.2]); Rr.of = id; return [L, Rr];
    }
    return {
      title: 'Lobes of the brain', intro: 'Front of the brain points right (+x); you are looking at the LEFT hemisphere. Remember: abilities come from networks across lobes, not tidy boxes. General education, not medical advice.', cam: { yaw: 0.15, pitch: 0.2 },
      objects: [].concat(
        pair('frontal', [1.6, 0.6, 1.15], [3.4, 2.6, 2.2], '#60a5fa', 'Frontal lobe', 'Planning, decisions, self-control, personality and voluntary movement (the primary motor cortex is its back strip). Broca\'s area, for producing speech, is usually in the left frontal lobe. It matures last — into the mid-20s.', [0.8, 0, 0]),
        pair('parietal', [-0.8, 1.3, 1.15], [2.6, 2.0, 2.2], '#34d399', 'Parietal lobe', 'Touch, pain, temperature and body position (somatosensory cortex), plus spatial awareness and attention — knowing where things and your limbs are.', [0, 0.8, 0]),
        pair('temporal', [0.4, -0.8, 1.35], [2.8, 1.3, 2.0], '#fbbf24', 'Temporal lobe', 'Hearing (auditory cortex), understanding language (Wernicke\'s area, usually on the left), recognising faces and objects. The hippocampus, deep inside, is vital for forming new memories.', [0.4, -0.8, 0]),
        pair('occipital', [-2.5, 0.2, 1.05], [1.8, 1.8, 2.0], '#f472b6', 'Occipital lobe', 'Vision: the primary visual cortex at the back of the head processes signals from the eyes — which is why a blow to the back of the head can make you "see stars".', [-0.9, 0, 0]),
        [o('cerebellum', 'sphere', [-2.2, -1.5, 0], [2.2, 1.3, 3.4], '#a78bfa', 'Cerebellum', '"Little brain": balance, posture, coordination and learning smooth movements (riding a bike, typing). It holds more than half of the brain\'s neurons.', [-1.4, -0.9, 0]),
          o('brainstem', 'capsule', [-0.6, -2.4, 0], [0.9, 2.6, 0.9], '#f87171', 'Brainstem', 'Midbrain, pons and medulla: automatic life support — breathing, heart rate, blood pressure, swallowing, sleep and wakefulness. It connects the brain to the spinal cord.', [0, -1.6, 0], { rot: [0, 0, 15] }),
          o('corpus-callosum', 'capsule', [0, 0.6, 0], [0.45, 3.8, 0.5], '#e5e7eb', 'Corpus callosum', 'A thick bridge of roughly 200 million nerve fibres linking the left and right hemispheres.', null, { rot: [0, 0, 90] })]
      ),
      tour: [{ text: 'The frontal lobe: planning and movement.', focus: 'frontal' }, { text: 'The parietal lobe: touch and space.', focus: 'parietal' }, { text: 'The temporal lobe: hearing, language, memory.', focus: 'temporal' }, { text: 'The occipital lobe: vision.', focus: 'occipital' }, { text: 'The cerebellum: balance and coordination.', focus: 'cerebellum' }, { text: 'The brainstem keeps you breathing.', focus: 'brainstem' }]
    };
  };

  P.tooth = function () {
    return {
      title: 'Inside a molar tooth', intro: 'Explode the tooth to see its layers from the hard outside to the living inside. General education, not dental advice.', cam: { yaw: 0.5, pitch: 0.2 },
      objects: [
        o('enamel', 'sphere', [0, 2.4, 0], [2.7, 1.9, 2.5], '#f8fafc', 'Enamel', 'The hardest substance in the human body (about 96% mineral, mainly hydroxyapatite). It has no living cells, so it cannot regrow; acids made by plaque bacteria from sugar dissolve it, causing cavities. Fluoride helps it resist.', [0, 2.4, 0], { opacity: 0.55 }),
        o('dentin', 'capsule', [0, 1.4, 0], [2.0, 3.4, 1.8], '#fde68a', 'Dentin', 'Yellowish layer under the enamel, about 70% mineral, full of microscopic tubules. When gums recede and dentin is exposed, cold or sweet things can cause sensitivity.', [0, 1.1, 0], { opacity: 0.72 }),
        o('pulp', 'capsule', [0, 1.6, 0], [0.9, 1.8, 0.8], '#ef4444', 'Pulp', 'Living soft tissue with nerves and blood vessels. Decay that reaches the pulp causes severe toothache; root canal treatment removes infected pulp.', [3.2, 0.6, 0]),
        o('root-1', 'cone', [-0.55, -1.2, 0], [1.0, 3.2, 1.0], '#fcd34d', 'Roots (covered with cementum)', 'Roots anchor the tooth in the jaw. They are dentin covered by a thin bone-like layer, cementum. Lower molars usually have 2 roots, upper molars 3.', [0, -0.8, 0], { rot: [180, 0, 8] }),
        of('root-1', o('root-2', 'cone', [0.55, -1.2, 0], [1.0, 3.2, 1.0], '#fcd34d', null, null, [0, -0.8, 0], { rot: [180, 0, -8] })),
        o('canal', 'cylinder', [-0.55, -0.9, 0], [0.15, 3.0, 0.15], '#dc2626', 'Root canals (nerve & blood vessels)', 'Narrow channels running from the pulp down to the root tip, where nerves and vessels enter.', [3.2, 0.6, 0], { rot: [0, 0, 8] }),
        of('canal', o('canal-2', 'cylinder', [0.55, -0.9, 0], [0.15, 3.0, 0.15], '#dc2626', null, null, [3.2, 0.6, 0], { rot: [0, 0, -8] })),
        o('gum', 'torus', [0, 0.45, 0], [3.4, 0.9, 3.2], '#f9a8d4', 'Gum (gingiva)', 'Soft tissue sealing around the neck of the tooth. Bleeding when brushing is an early sign of gum inflammation (gingivitis), usually reversible with good cleaning.', [-3.2, 0, 0], { opacity: 0.8 }),
        o('ligament', 'capsule', [0, -1.0, 0], [2.6, 3.6, 1.6], '#fb7185', 'Periodontal ligament', 'Thousands of tiny fibres joining the root\'s cementum to the jawbone — a shock absorber for chewing.', [-2.4, -1.4, 0], { opacity: 0.2 }),
        o('bone', 'box', [0, -1.6, 0], [5, 4, 3.6], '#e7e5e4', 'Jawbone (alveolar bone)', 'The bony socket that holds the roots. Long-term gum disease (periodontitis) can destroy it and loosen teeth.', [0, -2.8, 0], { opacity: 0.25 })
      ],
      tour: [{ text: 'Enamel: the hard outer shield.', focus: 'enamel', explode: true }, { text: 'Dentin: the bulk of the tooth.', focus: 'dentin' }, { text: 'Pulp: the living centre.', focus: 'pulp' }, { text: 'Roots anchor it in the bone.', focus: 'root-1' }, { text: 'Gums seal it.', focus: 'gum', explode: false }]
    };
  };

  P['skeleton-simple'] = function () {
    var verts = [], i;
    for (i = 0; i < 14; i++) verts.push({ t: 'box', c: [0, 7.7 + i * 0.44, -0.3], s: [0.75 - i * 0.015, 0.34, 0.6] });
    var ribs = [];
    for (i = 0; i < 6; i++) { var w = 3.0 - Math.abs(i - 2) * 0.25; ribs.push(o('rib-' + (i + 1), 'torus', [0, 12.4 - i * 0.5, 0.2], [w, 0.22, 2.2], '#e7e5e4', null, null, null, { of: i ? 'rib-1' : undefined })); }
    ribs[0].label = 'Rib cage'; ribs[0].info = '12 pairs of ribs: 7 "true" ribs attach to the sternum, 3 "false" ribs attach through cartilage, and 2 "floating" ribs attach only at the back. They protect the heart and lungs and move with each breath.';
    ribs.forEach(function (r, k) { if (k) r.of = 'rib-1'; else delete r.of; });
    function lr(id, shape, a, b, d, col, label, info) { var L = seg(id, shape, a, b, d, col, label, info), R = seg(id + '-r', shape, [-a[0], a[1], a[2]], [-b[0], b[1], b[2]], d, col); R.of = id; return [L, R]; }
    function lrBox(id, pos, size, col, label, info) { var L = o(id, 'box', pos, size, col, label, info), R = o(id + '-r', 'box', [-pos[0], pos[1], pos[2]], size, col); R.of = id; return [L, R]; }
    var C = '#f5f5f4';
    return {
      title: 'The human skeleton (simplified)', intro: 'Adults have 206 bones; babies are born with around 300 that fuse as they grow. Bone is living tissue: its marrow makes blood cells and it stores calcium.', cam: { yaw: 0.5, pitch: 0.1 },
      objects: [
        o('skull', 'sphere', [0, 15.6, 0], [2.0, 2.4, 2.2], C, 'Skull (cranium)', 'Protects the brain. It is made of several plates joined by seams called sutures — still soft "fontanelles" in babies.'),
        o('mandible', 'box', [0, 14.2, 0.5], [1.4, 0.5, 1.0], C, 'Mandible (lower jaw)', 'The only skull bone that moves, hinged at the temporomandibular joint just in front of each ear.'),
        o('spine', 'multi', [0, 0, 0], [1, 1, 1], '#d6d3d1', 'Spine (vertebral column)', '33 vertebrae at birth: 7 neck (cervical), 12 chest (thoracic), 5 lower back (lumbar), then 5 fused into the sacrum and about 4 into the tailbone — 26 separate bones in adults. It protects the spinal cord; its S-curve absorbs shocks.', null, { parts: verts })
      ].concat(ribs).concat([
        o('sternum', 'box', [0, 11.4, 1.15], [0.4, 2.6, 0.2], C, 'Sternum (breastbone)', 'The flat bone in the middle of the chest where the upper ribs attach — the place where chest compressions are given in CPR.')
      ]).concat(lr('clavicle', 'capsule', [0.25, 13.4, 0.6], [1.9, 13.6, 0.1], 0.25, C, 'Clavicle (collarbone)', 'Links the arm to the trunk; one of the most commonly broken bones in falls.'))
        .concat(lr('humerus', 'capsule', [2.0, 13.3, 0], [2.4, 10.0, 0], 0.45, C, 'Humerus', 'The upper-arm bone, from shoulder to elbow.'))
        .concat(lr('forearm', 'capsule', [2.4, 9.8, 0], [2.7, 7.2, 0.3], 0.4, C, 'Radius & ulna (forearm)', 'Two parallel bones that can rotate around each other, turning the palm up or down.'))
        .concat(lrBox('hand', [2.8, 6.5, 0.35], [0.6, 1.0, 0.3], C, 'Hand', '27 bones in each hand: 8 carpals (wrist), 5 metacarpals (palm) and 14 phalanges (fingers).'))
        .concat([o('pelvis', 'torus', [0, 7.2, 0], [3.0, 0.7, 2.0], '#e7e5e4', 'Pelvis', 'The hip bones and sacrum form a basin that carries the body\'s weight to the legs and protects the bladder and reproductive organs. It is usually wider and shallower in females, for childbirth.', null, { rot: [15, 0, 0] })])
        .concat(lr('femur', 'capsule', [0.9, 6.8, 0], [0.8, 3.2, 0], 0.55, C, 'Femur (thigh bone)', 'The longest and strongest bone in the body — roughly a quarter of a person\'s height.'))
        .concat([o('patella', 'sphere', [0.8, 3.0, 0.35], [0.35, 0.35, 0.3], C, 'Patella (kneecap)', 'A bone embedded in the thigh-muscle tendon; it acts like a pulley for straightening the knee.'), of('patella', o('patella-r', 'sphere', [-0.8, 3.0, 0.35], [0.35, 0.35, 0.3], C))])
        .concat(lr('tibia', 'capsule', [0.8, 2.9, 0], [0.75, 0.6, 0], 0.5, C, 'Tibia & fibula (lower leg)', 'The tibia (shin bone) carries the weight; the thin fibula beside it anchors muscles.'))
        .concat(lrBox('foot', [0.8, 0.2, 0.4], [0.7, 0.3, 1.4], C, 'Foot', '26 bones in each foot, arranged in arches that act like springs when you walk and run.')),
      tour: [{ text: 'The skull protects the brain.', focus: 'skull' }, { text: 'The spine protects the spinal cord.', focus: 'spine' }, { text: 'Ribs guard the heart and lungs.', focus: 'rib-1' }, { text: 'The pelvis carries your weight to the legs.', focus: 'pelvis' }, { text: 'The femur is the longest bone.', focus: 'femur' }]
    };
  };

  P['crystal-nacl'] = function () {
    var na = [], cl = [], bonds = [], s = 1.41, i, j, k;
    for (i = -1; i <= 1; i++) for (j = -1; j <= 1; j++) for (k = -1; k <= 1; k++) {
      var c = [i * s, j * s, k * s];
      if (Math.abs(i + j + k) % 2 === 1) cl.push({ t: 'sphere', c: c, s: [0.9, 0.9, 0.9] }); else na.push({ t: 'sphere', c: c, s: [0.5, 0.5, 0.5] });
      if (i < 1) bonds.push({ t: 'cyl', from: c, to: [(i + 1) * s, j * s, k * s], s: [0.08, 1, 0.08] });
      if (j < 1) bonds.push({ t: 'cyl', from: c, to: [i * s, (j + 1) * s, k * s], s: [0.08, 1, 0.08] });
      if (k < 1) bonds.push({ t: 'cyl', from: c, to: [i * s, j * s, (k + 1) * s], s: [0.08, 1, 0.08] });
    }
    return {
      title: 'Sodium chloride crystal (rock salt)', intro: 'One cubic unit cell of table salt. Purple = sodium ions Na⁺, green = chloride ions Cl⁻. Ion sizes are shrunk so you can see inside.', cam: { yaw: 0.6, pitch: 0.45 },
      objects: [
        o('na', 'multi', [0, 0, 0], [1, 1, 1], '#a855f7', 'Sodium ion (Na⁺)', 'A sodium atom that has given away its single outer electron. Each Na⁺ is surrounded by 6 Cl⁻ ions (octahedral arrangement). Na⁺ is smaller (radius about 102 pm) than Cl⁻ (about 181 pm).', null, { parts: na }),
        o('cl', 'multi', [0, 0, 0], [1, 1, 1], '#22c55e', 'Chloride ion (Cl⁻)', 'A chlorine atom that has gained one electron. Each Cl⁻ also has 6 Na⁺ neighbours. The corners and face centres of this cube are chloride; edge centres and the body centre are sodium — 4 of each per unit cell, matching the formula NaCl (1 : 1).', null, { parts: cl }),
        o('bonds', 'multi', [0, 0, 0], [1, 1, 1], '#cbd5e1', 'Ionic bonding', 'Not separate "sticks": every ion attracts all its opposite neighbours electrostatically. That strong, all-round attraction makes salt hard, brittle and high-melting (801 °C), and it conducts electricity only when melted or dissolved. Nearest Na–Cl distance ≈ 282 pm; cube edge ≈ 564 pm.', null, { parts: bonds }),
        o('unit-cell', 'box', [0, 0, 0], [2.82, 2.82, 2.82], '#fde68a', 'Unit cell', 'The smallest repeating box of the crystal. Repeat it in every direction and you get the whole crystal — a salt grain contains about 10¹⁸ of them.', null, { opacity: 0.1, pick: true })
      ]
    };
  };

  P['molecule-water'] = function () {
    var L = 1.9, half = 104.5 / 2 * PI / 180, h1 = [L * Math.sin(half), -L * Math.cos(half), 0], h2 = [-L * Math.sin(half), -L * Math.cos(half), 0];
    return {
      title: 'Water molecule (H₂O)', intro: 'Bent, polar and tiny — and the reason life is possible. Tap the atoms, bonds and lone pairs.', cam: { yaw: 0.3, pitch: 0.2 },
      objects: [
        o('oxygen', 'sphere', [0, 0, 0], [1.3, 1.3, 1.3], '#ef4444', 'Oxygen atom', 'Oxygen is much more electronegative (3.44) than hydrogen (2.20), so it pulls the shared electrons towards itself and becomes slightly negative (δ−).'),
        o('hydrogen-1', 'sphere', h1, [0.75, 0.75, 0.75], '#f8fafc', 'Hydrogen atoms', 'Each hydrogen shares one electron pair with oxygen and is left slightly positive (δ+). These δ+ hydrogens form hydrogen bonds with neighbouring molecules.'),
        of('hydrogen-1', o('hydrogen-2', 'sphere', h2, [0.75, 0.75, 0.75], '#f8fafc')),
        seg('bond-1', 'cylinder', [0, 0, 0], h1, 0.22, '#cbd5e1', 'O–H covalent bonds', 'Polar covalent bonds about 96 pm long. The angle between them is about 104.5° — less than the 109.5° of a perfect tetrahedron because the two lone pairs push the bonds closer together.'),
        of('bond-1', seg('bond-2', 'cylinder', [0, 0, 0], h2, 0.22, '#cbd5e1')),
        o('lone-pair-1', 'capsule', [0, 0.75, 0.55], [0.55, 1.0, 0.55], '#93c5fd', 'Lone pairs', 'Two pairs of oxygen\'s electrons not used in bonding. With the two bonds they point roughly to the corners of a tetrahedron, which is why water is bent, not straight.', null, { rot: [35, 0, 0], opacity: 0.45 }),
        of('lone-pair-1', o('lone-pair-2', 'capsule', [0, 0.75, -0.55], [0.55, 1.0, 0.55], '#93c5fd', null, null, null, { rot: [-35, 0, 0], opacity: 0.45 })),
        o('dipole', 'label', [0, 1.9, 0], [0.1, 0.1, 0.1], '#ffffff', 'δ− (oxygen end)', 'Because the molecule is bent, the charges do not cancel: water is a polar molecule (a dipole). Hydrogen bonding between water molecules gives water its unusually high boiling point and surface tension, and makes ice less dense than liquid water — so ice floats.'),
        o('delta-plus', 'label', [0, -1.9, 0], [0.1, 0.1, 0.1], '#ffffff', 'δ+ (hydrogen end)', 'The slightly positive hydrogen side attracts the negative ends of other molecules — that is how water dissolves salts and sugar so well.')
      ]
    };
  };

  P['molecule-methane'] = function () {
    var s = 1.6 / Math.sqrt(3), d = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(function (v) { return [v[0] * s, v[1] * s, v[2] * s]; }), objs = [
      o('carbon', 'sphere', [0, 0, 0], [1.1, 1.1, 1.1], '#374151', 'Carbon atom', 'Carbon has 4 valence electrons and forms 4 single bonds here (sp³ hybridised).')
    ];
    d.forEach(function (p, i) {
      var hh = o('hydrogen-' + (i + 1), 'sphere', p, [0.7, 0.7, 0.7], '#f8fafc'), b = seg('bond-' + (i + 1), 'cylinder', [0, 0, 0], p, 0.2, '#cbd5e1');
      if (!i) { hh.label = 'Hydrogen atoms'; hh.info = 'Four hydrogens at the corners of a regular tetrahedron, as far apart as they can get.'; b.label = 'C–H bonds'; b.info = 'Four identical covalent bonds, each about 109 pm long, separated by 109.5° (exactly arccos(−1/3)).'; }
      else { hh.of = 'hydrogen-1'; b.of = 'bond-1'; }
      objs.push(hh, b);
    });
    objs.push(o('angle', 'label', [0.55, 0.55, 0.0], [0.1, 0.1, 0.1], '#ffffff', '109.5°', 'The tetrahedral angle. Because the shape is perfectly symmetric, the small bond polarities cancel and methane is a non-polar molecule.'));
    objs.push(o('facts', 'label', [0, -1.9, 0], [0.1, 0.1, 0.1], '#ffffff', 'CH₄ — natural gas', 'Methane is the main component of natural gas and is also made by microbes in wetlands, rice paddies and cattle. It is a potent greenhouse gas — roughly 80 times more warming than CO₂ over 20 years.'));
    return { title: 'Methane molecule (CH₄)', intro: 'The simplest hydrocarbon: a perfect tetrahedron.', cam: { yaw: 0.4, pitch: 0.3 }, objects: objs };
  };

  /* ======================= ENGINEERING ======================= */
  P['building-frame'] = function () {
    var objs = [o('soil', 'box', [0, -0.9, 0], [10, 1.8, 7.6], '#a16207', 'Soil', 'The ground must safely carry all loads — its "safe bearing capacity" is measured by a soil investigation before design.', null, { opacity: 0.22, pick: true })], xs = [-3, 0, 3], zs = [-2, 2], k = 0;
    xs.forEach(function (x) { zs.forEach(function (z) {
      var f = o('footing-' + (++k), 'box', [x, -1.2, z], [1.4, 0.6, 1.4], '#9ca3af', null, null, [0, -1.0, 0]), c = o('column-' + k, 'box', [x, 4.2, z], [0.4, 9.6, 0.4], '#cbd5e1');
      if (k === 1) { f.label = 'Footings (foundations)'; f.info = 'Spread footings widen the column\'s load over enough soil area that the soil is not over-stressed. Their size depends on the load and the soil\'s bearing capacity.'; c.label = 'Columns'; c.info = 'Vertical members mainly in compression. RCC columns have vertical steel bars tied by stirrups/ties; they carry every floor above down to the footings.'; }
      else { f.of = 'footing-1'; c.of = 'column-1'; }
      objs.push(f, c);
    }); });
    [3, 6, 9].forEach(function (y, fi) {
      var ex = [0, (fi + 1) * 1.3, 0];
      zs.forEach(function (z, zi) { var b = o('beam-x-' + fi + zi, 'box', [0, y - 0.25, z], [6.4, 0.5, 0.3], '#94a3b8', null, null, ex); if (fi + zi === 0) { b.id = 'beam'; b.label = 'Beams'; b.info = 'Horizontal members that carry the slab to the columns by bending. Under load the bottom of mid-span is in tension, so the main steel bars go near the bottom there (and near the top over supports). Indian RCC design follows IS 456.'; } else b.of = 'beam'; objs.push(b); });
      xs.forEach(function (x) { objs.push(of('beam', o('beam-z-' + fi + x, 'box', [x, y - 0.25, 0], [0.3, 0.5, 4.4], '#94a3b8', null, null, ex))); });
      var sl = o('slab-' + (fi + 1), 'box', [0, y + 0.075, 0], [6.6, 0.15, 4.6], '#e2e8f0', null, null, ex, { opacity: 0.6 });
      if (!fi) { sl.label = 'Floor slabs'; sl.info = 'Flat plates of reinforced concrete that carry people, furniture and finishes (live and dead loads) to the beams. The top slab is the roof.'; } else sl.of = 'slab-1';
      objs.push(sl);
    });
    objs.push(seg('load', 'arrow', [0, 11.8, 0], [0, 9.4, 0], 0.5, '#ef4444', 'Load path', 'Load flows slab → beams → columns → footings → soil. Every element must be strong enough for its share, with safety factors. In earthquake zones (IS 1893) frames also resist sideways forces with ductile detailing.', [0, 3.9, 0]));
    return { title: 'RCC building frame (3 storeys)', intro: 'A reinforced-concrete frame: the skeleton that carries a building\'s weight. Explode to separate the floors and follow the load path.', cam: { yaw: 0.7, pitch: 0.3 }, objects: objs,
      tour: [{ text: 'Loads start on the slabs.', focus: 'slab-1' }, { text: 'Slabs pass load to the beams.', focus: 'beam' }, { text: 'Beams pass it to the columns.', focus: 'column-1' }, { text: 'Columns pass it to the footings…', focus: 'footing-1' }, { text: '…and footings spread it into the soil.', focus: 'soil' }] };
  };

  P['truss-bridge'] = function () {
    var objs = [], CMP = '#3b82f6', TEN = '#ef4444', first = {};
    function m(kind, a, b, col, label, info) { var x = seg(kind + '-' + (objs.length + 1), 'cylinder', a, b, 0.16, col); if (!first[kind]) { first[kind] = x.id; x.label = label; x.info = info; } else x.of = first[kind]; objs.push(x); }
    [-1.5, 1.5].forEach(function (z) {
      m('top-chord', [-4, 2, z], [4, 2, z], CMP, 'Top chord (compression)', 'Under the weight of traffic the top chord is squeezed (compression, shown blue). Compression members must be stocky enough not to buckle.');
      m('bottom-chord', [-6, 0, z], [6, 0, z], TEN, 'Bottom chord (tension)', 'The bottom chord is stretched (tension, shown red) — like the bottom of a bending beam.');
      m('end-post', [-6, 0, z], [-4, 2, z], CMP, 'End posts (compression)', 'Inclined end members carrying the load down into the supports.');
      m('end-post', [6, 0, z], [4, 2, z], CMP);
      [-4, -2, 0, 2, 4].forEach(function (x) { m('vertical', [x, 0, z], [x, 2, z], CMP, 'Verticals (mostly compression)', 'In a Pratt truss under deck loads the verticals are mostly in compression; the one at mid-span may carry little force, depending on where the load is.'); });
      [[-4, -2], [-2, 0], [4, 2], [2, 0]].forEach(function (p) { m('diagonal', [p[0], 2, z], [p[1], 0, z], TEN, 'Diagonals (tension)', 'Pratt diagonals slope down towards the middle, so under gravity loads they are in TENSION — slender steel members are fine in tension. (A Howe truss slopes them the other way and puts them in compression.)'); });
    });
    [-4, -2, 0, 2, 4].forEach(function (x) { m('bracing', [x, 2, -1.5], [x, 2, 1.5], '#94a3b8', 'Lateral bracing', 'Cross members tie the two trusses together against wind and twisting.'); });
    objs.push(o('deck', 'box', [0, -0.15, 0], [12.4, 0.2, 3.2], '#78716c', 'Deck', 'The roadway. Its loads reach the truss at the bottom joints (panel points) through floor beams.'));
    objs.push(o('abutment-w', 'box', [-6.9, -1.15, 0], [1.4, 2, 4], '#a8a29e', 'Abutments (supports)', 'Supports at each end; usually one end is a pin and the other a roller/bearing so the bridge can expand and contract with temperature.'));
    objs.push(of('abutment-w', o('abutment-e', 'box', [6.9, -1.15, 0], [1.4, 2, 4], '#a8a29e')));
    objs.push(o('truck', 'box', [0, 0.45, 0], [1.8, 0.9, 1.1], '#facc15', 'Moving load', 'As the truck crosses, member forces change — engineers check every position, plus impact and wind.', null, { spin: null }));
    return { title: 'Pratt truss bridge', intro: 'A truss turns bending into pure pull (tension, red) and push (compression, blue) in straight members arranged in triangles — triangles cannot change shape without a member changing length. The Pratt truss was patented in 1844.', cam: { yaw: 0.45, pitch: 0.3 }, objects: objs,
      tour: [{ text: 'Triangles make a truss rigid: verticals, diagonals and chords lock each panel.', focus: first.vertical }, { text: 'Top chord: compression.', focus: first['top-chord'] }, { text: 'Bottom chord: tension.', focus: first['bottom-chord'] }, { text: 'Pratt diagonals: tension.', focus: first.diagonal }, { text: 'Supports allow for expansion.', focus: 'abutment-w' }] };
  };

  P['gear-train'] = function () {
    var w = 0.9, mo = 0.25;
    function gear(id, N, pos, wv, col, label, info, a0) { return o(id, 'gear', pos, [(N + 2) * mo, 0.6, (N + 2) * mo], col, label, info, null, { teeth: N, spin: { c: pos, axis: [0, 1, 0], w: wv, a0: a0 || 0 } }); }
    var A = [-4.5, 0, 0], B = [0, 0, 0], Cc = [0, 0.8, 0], Dd = [2.5, 0.8, 4.33];
    return {
      title: 'Compound gear train (6 : 1 reduction)', intro: 'Driver 12 teeth → 24 teeth (2 : 1). On the same shaft a 10-tooth gear drives a 30-tooth gear (3 : 1). Total ratio 2 × 3 = 6 : 1: the output turns 6 times slower with (ideally) 6 times the torque. Press ▶/⏸ to run it.', cam: { yaw: 0.4, pitch: 0.75 },
      objects: [
        o('motor', 'box', [-4.5, -1.3, 0], [1.4, 1.4, 1.4], '#475569', 'Motor (input)', 'Turns the driver gear fast with low torque.'),
        seg('shaft-a', 'cylinder', [-4.5, -0.6, 0], [-4.5, 0.6, 0], 0.3, '#9ca3af', 'Input shaft', 'Carries the motor\'s rotation to the driver gear.'),
        gear('gear-a', 12, A, w, '#f59e0b', 'Driver gear — 12 teeth', 'The input gear. Each full turn pushes 12 teeth past the next gear.', 0),
        gear('gear-b', 24, B, -w * 12 / 24, '#3b82f6', 'Gear B — 24 teeth', 'Twice as many teeth, so it turns half as fast and in the opposite direction. Ratio of this stage = 24 / 12 = 2.', PI / 24),
        gear('gear-c', 10, Cc, -w * 12 / 24, '#22c55e', 'Gear C — 10 teeth (same shaft as B)', 'Fixed to gear B, so it has the same speed. Putting two gears on one shaft is what makes the train "compound".', 0),
        gear('gear-d', 30, Dd, w * 12 / 24 * 10 / 30, '#a855f7', 'Output gear — 30 teeth', 'Stage 2 ratio = 30 / 10 = 3. Overall 2 × 3 = 6 : 1. Spur gear meshes lose only about 1–2% of power each, so torque rises almost 6 times.', PI / 30),
        seg('shaft-b', 'cylinder', [0, -0.6, 0], [0, 1.4, 0], 0.3, '#9ca3af', 'Intermediate shaft', 'Holds gears B and C together.'),
        seg('shaft-d', 'cylinder', [2.5, 0.2, 4.33], [2.5, 2.2, 4.33], 0.35, '#9ca3af', 'Output shaft', 'Delivers slow, high-torque rotation (for a conveyor, winch or wheel).')
      ],
      tour: [{ text: 'The motor turns the small driver gear.', focus: 'gear-a' }, { text: 'Meshing with 24 teeth halves the speed and reverses direction.', focus: 'gear-b' }, { text: 'Gear C shares B\'s shaft and speed.', focus: 'gear-c' }, { text: 'The 30-tooth output: overall 6 : 1.', focus: 'gear-d' }]
    };
  };

  P['ic-engine'] = function () {
    var r = 0.9, l = 3.0;
    function strokeOf(a) { return a < 180 ? 'Intake ↓ — intake valve open, piston draws in air–fuel mixture' : a < 360 ? 'Compression ↑ — both valves closed, mixture squeezed (about 10 : 1)' : a < 540 ? 'Power ↓ — spark near top dead centre, burning gas pushes the piston down' : 'Exhaust ↑ — exhaust valve open, piston pushes burnt gas out'; }
    return {
      title: 'Four-stroke petrol engine (one cylinder)', intro: 'Intake, compression, power, exhaust — two crankshaft turns (720°) per cycle. Press ▶ or drag the crank angle. The head and cylinder are see-through.', cam: { yaw: 0.6, pitch: 0.15 },
      param: {
        label: 'Crank angle', min: 0, max: 720, step: 1, value: 0, speed: 200,
        apply: function (v, by, S) {
          var th = v * PI / 180, px = r * Math.sin(th), py = r * Math.cos(th), pin = r * Math.cos(th) + Math.sqrt(l * l - Math.pow(r * Math.sin(th), 2));
          function put(id, f) { var x = by[id]; if (x) { f(x); S.place(x); } }
          put('piston', function (x) { x.pos = [0, pin + 0.2, 0]; });
          put('rod', function (x) { x.from = [px, py, 0]; x.to = [0, pin, 0]; });
          put('crank', function (x) { x.from = [0, 0, 0.35]; x.to = [px, py, 0.35]; });
          put('crank-2', function (x) { x.from = [0, 0, -0.35]; x.to = [px, py, -0.35]; });
          put('crankpin', function (x) { x.pos = [px, py, 0]; });
          var li = v < 180 ? 0.32 * Math.sin(PI * v / 180) : 0, le = v >= 540 ? 0.32 * Math.sin(PI * (v - 540) / 180) : 0;
          put('intake-valve', function (x) { x.pos = [-0.55, 5.12 - li, 0]; }); put('intake-stem', function (x) { x.from = [-0.55, 5.16 - li, 0]; x.to = [-0.55, 6.3 - li, 0]; });
          put('exhaust-valve', function (x) { x.pos = [0.55, 5.12 - le, 0]; }); put('exhaust-stem', function (x) { x.from = [0.55, 5.16 - le, 0]; x.to = [0.55, 6.3 - le, 0]; });
          var c = by.combustion; if (c) { var burn = v >= 355 && v < 470; c.hidden = !burn; if (burn) { c._a = Math.max(0.1, 0.85 * (1 - (v - 355) / 115)); c.pos = [0, (5.1 + pin + 0.9) / 2, 0]; c._size = [2.0, Math.max(0.2, 5.1 - (pin + 0.9)), 2.0]; S.place(c); } }
          var sp = by['spark-plug']; if (sp) sp._col = (v >= 345 && v <= 375) ? [1, 0.95, 0.4] : [0.85, 0.85, 0.9];
          return Math.round(v) + '° · ' + strokeOf(v);
        }
      },
      objects: [
        o('cylinder-block', 'cylinder', [0, 3.3, 0], [2.5, 3.6, 2.5], '#94a3b8', 'Cylinder (bore)', 'The precisely machined tube the piston slides in. Displacement = bore area × stroke; here the stroke is twice the crank radius.', null, { opacity: 0.22 }),
        o('head', 'box', [0, 5.55, 0], [3.2, 0.9, 2.8], '#64748b', 'Cylinder head', 'Closes the top of the cylinder and holds the valves, ports and spark plug; the combustion chamber is formed between it and the piston.', null, { opacity: 0.4 }),
        o('piston', 'cylinder', [0, 4.1, 0], [2.2, 1.4, 2.2], '#9ca3af', 'Piston', 'Slides up and down; piston rings seal the gas pressure and scrape oil off the cylinder wall.'),
        seg('rod', 'box', [0, 0.9, 0], [0, 3.9, 0], 0.32, '#cbd5e1', 'Connecting rod', 'Links the piston pin to the crankpin, turning straight-line motion into rotation.', null, { size: [0.32, 1, 0.22] }),
        seg('crank', 'box', [0, 0, 0.35], [0, 0.9, 0.35], 0.6, '#71717a', 'Crankshaft & crank webs', 'The offset crankpin (radius r) makes the piston travel a stroke of 2r. Counterweights on the webs balance the moving parts.', null, { size: [0.7, 1, 0.2] }),
        of('crank', seg('crank-2', 'box', [0, 0, -0.35], [0, 0.9, -0.35], 0.6, '#71717a', null, null, null, { size: [0.7, 1, 0.2] })),
        of('crank', o('crankpin', 'cylinder', [0, 0.9, 0], [0.35, 0.9, 0.35], '#a1a1aa', null, null, null, { rot: [90, 0, 0] })),
        of('crank', o('crankshaft', 'cylinder', [0, 0, 0], [0.6, 3.0, 0.6], '#a1a1aa', null, null, null, { rot: [90, 0, 0] })),
        o('flywheel', 'cylinder', [0, 0, -1.7], [3.0, 0.35, 3.0], '#52525b', 'Flywheel', 'A heavy wheel that stores energy from the power stroke and keeps the crank turning through the other three strokes.', null, { rot: [90, 0, 0] }),
        o('intake-valve', 'cylinder', [-0.55, 5.12, 0], [0.6, 0.08, 0.6], '#38bdf8', 'Intake valve', 'Opens during the intake stroke to let the air–fuel mixture in, then seals for compression and power.'),
        of('intake-valve', seg('intake-stem', 'cylinder', [-0.55, 5.16, 0], [-0.55, 6.3, 0], 0.12, '#38bdf8')),
        o('exhaust-valve', 'cylinder', [0.55, 5.12, 0], [0.6, 0.08, 0.6], '#fb923c', 'Exhaust valve', 'Opens during the exhaust stroke so the rising piston can push out the burnt gases.'),
        of('exhaust-valve', seg('exhaust-stem', 'cylinder', [0.55, 5.16, 0], [0.55, 6.3, 0], 0.12, '#fb923c')),
        seg('spark-plug', 'cylinder', [0, 5.1, 0.6], [0, 6.4, 0.6], 0.22, '#d4d4d8', 'Spark plug', 'Fires a spark just before the piston reaches the top of the compression stroke (ignition timing), lighting the compressed mixture. Diesel engines have no spark plug: compression alone ignites the fuel.'),
        o('camshaft', 'cylinder', [0, 6.6, 0], [0.3, 2.6, 0.3], '#a8a29e', 'Camshaft', 'Its cams push the valves open at exactly the right moments. Driven by a belt or chain at half crankshaft speed — one turn per 720° cycle.', null, { rot: [90, 0, 0] }),
        seg('intake-port', 'cylinder', [-0.55, 5.45, 0], [-2.2, 5.9, 0], 0.45, '#0ea5e9', 'Intake port', 'Air (and fuel in port-injected engines) flows in here from the intake manifold.', null, { opacity: 0.7 }),
        seg('exhaust-port', 'cylinder', [0.55, 5.45, 0], [2.2, 5.9, 0], 0.45, '#ea580c', 'Exhaust port', 'Hot burnt gas leaves here towards the catalytic converter and silencer.', null, { opacity: 0.7 }),
        o('sump', 'box', [0, -1.5, 0], [3.6, 1.0, 2.6], '#713f12', 'Oil sump', 'Holds the engine oil that an oil pump circulates to lubricate and cool the moving parts.', null, { opacity: 0.3 }),
        o('combustion', 'cylinder', [0, 4.95, 0], [2.0, 0.3, 2.0], '#f97316', 'Combustion', 'Burning fuel releases heat; the hot gas pressure pushes the piston down — the only stroke that produces work.', null, { opacity: 0.8, hidden: true })
      ],
      tour: [
        { text: 'Intake: the piston moves down and the intake valve opens.', focus: 'intake-valve', param: 90 },
        { text: 'Compression: both valves shut, the piston rises.', focus: 'piston', param: 270 },
        { text: 'Power: the spark plug fires and burning gas drives the piston down.', focus: 'spark-plug', param: 365 },
        { text: 'Exhaust: the exhaust valve opens and the piston pushes the gas out.', focus: 'exhaust-valve', param: 630 },
        { text: 'The connecting rod and crankshaft turn up-and-down into rotation; the flywheel smooths it.', focus: 'crank', param: 120 }
      ]
    };
  };

  P['wind-turbine'] = function () {
    var hub = [0, 20.9, 2.6], blades = [];
    for (var k = 0; k < 3; k++) {
      var a = k * 2 * PI / 3, d = [Math.sin(a), Math.cos(a), 0], b = seg('blade-' + (k + 1), 'box', [hub[0] + d[0] * 0.6, hub[1] + d[1] * 0.6, hub[2]], [hub[0] + d[0] * 11.6, hub[1] + d[1] * 11.6, hub[2]], 0.9, '#f8fafc', null, null, [d[0] * 2.5, d[1] * 2.5, 1.5], { size: [0.9, 1, 0.25], spin: { c: hub, axis: [0, 0, 1], w: 0.9 } });
      if (!k) { b.label = 'Blades'; b.info = 'Shaped like aircraft wings: air flowing over them creates lift that turns the rotor. Big blades are 50–100+ m long, made of glass/carbon-fibre composite.'; } else b.of = 'blade-1';
      blades.push(b);
    }
    return {
      title: 'Wind turbine', intro: 'Power from wind grows with the CUBE of wind speed: P = ½·ρ·A·v³·Cp. Double the wind = 8× the power. No turbine can capture more than 59.3% of the wind\'s energy (the Betz limit). Press ▶/⏸ to spin.', cam: { yaw: 0.9, pitch: 0.15 },
      objects: [
        o('foundation', 'cylinder', [0, -0.5, 0], [5, 1, 5], '#a8a29e', 'Foundation', 'A massive reinforced-concrete base that stops the tall tower from overturning in storms.'),
        o('tower', 'cylinder', [0, 10, -0.6], [1.4, 20, 1.4], '#e5e7eb', 'Tower', 'A tapered steel (or concrete) tube; onshore hub heights are often 80–120 m or more, because wind is stronger and steadier higher up.', null, { top: 0.6 }),
        o('nacelle', 'box', [0, 20.9, -0.6], [2.2, 2.0, 5.6], '#cbd5e1', 'Nacelle', 'The housing on top of the tower that holds the drivetrain and controls.', null, { opacity: 0.45 }),
        o('hub', 'sphere', hub, [1.6, 1.6, 1.6], '#94a3b8', 'Hub & pitch system', 'The blades bolt to the hub. Pitch motors twist each blade to control power and to "feather" them in storms; turbines typically start (cut in) around 3 m/s, reach rated power near 11–13 m/s and shut down (cut out) around 25 m/s.', [0, 0, 1.5], { spin: { c: hub, axis: [0, 0, 1], w: 0.9 } })
      ].concat(blades).concat([
        seg('main-shaft', 'cylinder', [0, 20.9, 1.9], [0, 20.9, 0.7], 0.4, '#71717a', 'Main shaft', 'The slow-turning shaft from the rotor (around 10–20 rpm on big turbines).'),
        o('gearbox', 'box', [0, 20.9, 0.0], [1.1, 1.1, 1.3], '#f59e0b', 'Gearbox', 'Steps the slow rotor speed up to roughly 1,000–1,800 rpm for the generator. "Direct-drive" turbines skip the gearbox with a large multi-pole generator.'),
        o('generator', 'cylinder', [0, 20.9, -1.6], [1.1, 1.5, 1.1], '#2563eb', 'Generator', 'Converts rotation into electricity; power electronics then match it to the grid\'s frequency.', null, { rot: [90, 0, 0] }),
        o('yaw-drive', 'cylinder', [0, 19.95, -0.6], [1.4, 0.35, 1.4], '#64748b', 'Yaw drive', 'Motors turn the whole nacelle to keep the rotor facing into the wind.'),
        o('anemometer', 'cylinder', [0, 22.1, -2.7], [0.5, 0.25, 0.5], '#facc15', 'Wind sensors', 'An anemometer (speed) and wind vane (direction) on the nacelle roof feed the controller.'),
        o('transformer', 'box', [2.2, 0.6, 0], [1.2, 1.2, 1.2], '#16a34a', 'Transformer', 'Raises the generator\'s voltage for the cables to the substation and the grid.')
      ]),
      tour: [{ text: 'Wind pushes on the blades and creates lift.', focus: 'blade-1' }, { text: 'Pitch control in the hub manages the power.', focus: 'hub' }, { text: 'The gearbox speeds up the rotation.', focus: 'gearbox' }, { text: 'The generator makes electricity.', focus: 'generator' }, { text: 'The yaw drive faces the wind.', focus: 'yaw-drive' }]
    };
  };

  S3.PRESET_IDS = Object.keys(P);
})();
