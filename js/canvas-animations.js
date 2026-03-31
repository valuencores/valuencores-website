/* ══════════════════════════════════════════════════════════════
   VALUENCORES — ALL CANVAS ANIMATIONS
   Hero Network · Core Particle Sphere · Rhythm Wave Chart ·
   Structure Grid Dots · Algorithm Radial · AI Neural · 
   Flow Lissajous · Business Orbs · Architect Portraits
══════════════════════════════════════════════════════════════ */

/* ── Utility: resize canvas to its CSS display size ── */
function resizeCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr  = window.devicePixelRatio || 1;
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return rect;
}

/* ══════════════════════════════════════════════════════════════
   HERO — NETWORK / CONSTELLATION (warm off-white BG)
══════════════════════════════════════════════════════════════ */
(function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const NODES = 90;
  const CONNECT_DIST = 140;
  let nodes = [];
  let raf;

  function createNodes() {
    nodes = [];
    for (let i = 0; i < NODES; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1
      });
    }
  }

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W * (window.devicePixelRatio || 1);
    canvas.height = H * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    createNodes();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* radial light-ray effect on right side */
    const cx = W * 0.72, cy = H * 0.5;
    const rays = 28;
    for (let i = 0; i < rays; i++) {
      const angle = (i / rays) * Math.PI * 2;
      const len   = Math.min(W, H) * 0.65;
      const grd = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle)*len, cy + Math.sin(angle)*len);
      grd.addColorStop(0,   'rgba(210,200,190,0.18)');
      grd.addColorStop(1,   'rgba(210,200,190,0)');
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle)*len, cy + Math.sin(angle)*len);
      ctx.strokeStyle = grd;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    /* nodes */
    for (let n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0) n.x = W;
      if (n.x > W) n.x = 0;
      if (n.y < 0) n.y = H;
      if (n.y > H) n.y = 0;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120,110,100,0.45)';
      ctx.fill();
    }

    /* edges */
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < CONNECT_DIST) {
          const a = 1 - d / CONNECT_DIST;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(140,130,118,${a * 0.55})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
})();

/* ══════════════════════════════════════════════════════════════
   CORE — Particle Sphere (black dot center, scattered orbit)
══════════════════════════════════════════════════════════════ */
(function initCore() {
  const canvas = document.getElementById('core-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;
  const PARTICLES = 200;
  let particles = [];

  function buildParticles() {
    particles = [];
    for (let i = 0; i < PARTICLES; i++) {
      const angle   = Math.random() * Math.PI * 2;
      const radius  = 30 + Math.pow(Math.random(), 0.6) * (Math.min(W,H)*0.42 - 30);
      const size    = Math.random() * 3 + 0.5;
      const speed   = (Math.random() - 0.5) * 0.008;
      particles.push({ angle, radius, size, speed });
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width  = W * (window.devicePixelRatio||1);
    canvas.height = H * (window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
    buildParticles();
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    const cx = W*0.5, cy = H*0.5;

    for (let p of particles) {
      p.angle += p.speed;
      const x = cx + Math.cos(p.angle) * p.radius;
      const y = cy + Math.sin(p.angle) * p.radius * 0.6; // flatten to ellipse
      ctx.beginPath();
      ctx.arc(x, y, p.size * 0.5, 0, Math.PI*2);
      ctx.fillStyle = `rgba(30,30,30,${0.15 + (p.size/3.5)*0.7})`;
      ctx.fill();
    }

    /* central black dot */
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI*2);
    ctx.fillStyle = '#111';
    ctx.fill();

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
})();

/* ══════════════════════════════════════════════════════════════
   RHYTHM — Wave Chart with grid & scatter dots
══════════════════════════════════════════════════════════════ */
(function initRhythm() {
  const canvas = document.getElementById('rhythm-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf, t = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width  = W * (window.devicePixelRatio||1);
    canvas.height = H * (window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
  }

  /* pre-built scatter points */
  const scatPts = [];
  for (let i = 0; i < 55; i++) {
    scatPts.push({ x: Math.random(), y: Math.random() * 0.6 + 0.2, r: Math.random()*2.5+1 });
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    t += 0.012;

    /* ── Grid ── */
    const cols = 10, rows = 8;
    ctx.strokeStyle = 'rgba(80,80,80,0.18)';
    ctx.lineWidth = 0.8;
    for (let c = 0; c <= cols; c++) {
      const x = (c/cols)*W;
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      const y = (r/rows)*H;
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
    }

    /* ── Scatter dots ── */
    for (let p of scatPts) {
      ctx.beginPath();
      ctx.arc(p.x*W, p.y*H, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(50,50,50,0.55)';
      ctx.fill();
    }

    /* ── Wave lines (3 overlapping) ── */
    const waves = [
      { amp: H*0.12, freq: 1.8, phase: 0,    lw: 2,   alpha: 0.6 },
      { amp: H*0.07, freq: 3.0, phase: 1.2,  lw: 1.5, alpha: 0.4 },
      { amp: H*0.05, freq: 4.5, phase: 2.5,  lw: 1,   alpha: 0.28 }
    ];
    for (let w of waves) {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = H*0.5 + Math.sin((x/W)*Math.PI*2*w.freq + t + w.phase) * w.amp;
        x === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.strokeStyle = `rgba(40,40,40,${w.alpha})`;
      ctx.lineWidth = w.lw;
      ctx.stroke();
    }

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
})();

/* ══════════════════════════════════════════════════════════════
   STRUCTURE — Grid + scatter dots of varying sizes
══════════════════════════════════════════════════════════════ */
(function initStructure() {
  const canvas = document.getElementById('structure-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;
  const dots = [];

  function buildDots() {
    dots.length = 0;
    const cx = W*0.5, cy = H*0.5;
    for (let i = 0; i < 220; i++) {
      const angle  = Math.random() * Math.PI * 2;
      const r      = Math.random() * Math.min(W,H) * 0.47;
      const size   = Math.pow(Math.random(), 1.5) * 8 + 1;
      const gray   = Math.random() > 0.2 ? 30 : 140;
      dots.push({ x: cx + Math.cos(angle)*r, y: cy + Math.sin(angle)*r, size, gray });
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width  = W * (window.devicePixelRatio||1);
    canvas.height = H * (window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
    buildDots();
  }

  function draw() {
    ctx.clearRect(0,0,W,H);

    /* grid */
    const step = W / 14;
    ctx.strokeStyle = 'rgba(80,80,80,0.22)';
    ctx.lineWidth = 0.6;
    for (let x = 0; x <= W; x += step) {
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += step) {
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
    }

    /* dots */
    for (let d of dots) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size*0.5, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${d.gray},${d.gray},${d.gray},0.6)`;
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
})();

/* ══════════════════════════════════════════════════════════════
   ALGORITHM — Radial starburst network
══════════════════════════════════════════════════════════════ */
(function initAlgorithm() {
  const canvas = document.getElementById('algorithm-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf, t = 0;
  const SPOKES = 64;
  const NODES_PER_SPOKE = 7;
  let pts = [];

  function buildPts() {
    pts = [];
    for (let s = 0; s < SPOKES; s++) {
      const baseAngle = (s / SPOKES) * Math.PI * 2;
      for (let n = 0; n < NODES_PER_SPOKE; n++) {
        const frac  = (n + 1) / NODES_PER_SPOKE;
        const jitter = (Math.random()-0.5)*0.18;
        const angle  = baseAngle + jitter;
        const r      = frac * Math.min(W,H)*0.46;
        const size   = Math.pow(Math.random(),0.7)*6+1;
        pts.push({ s, n, angle, r, size, baseAngle });
      }
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width  = W * (window.devicePixelRatio||1);
    canvas.height = H * (window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
    buildPts();
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    t += 0.004;
    const cx = W*0.5, cy = H*0.5;
    const spinAngle = t * 0.15;

    /* spokes */
    ctx.strokeStyle = 'rgba(30,30,30,0.2)';
    ctx.lineWidth = 0.6;
    for (let s = 0; s < SPOKES; s++) {
      const a = (s/SPOKES)*Math.PI*2 + spinAngle;
      const len = Math.min(W,H)*0.47;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a)*len, cy + Math.sin(a)*len);
      ctx.stroke();
    }

    /* nodes on spokes */
    for (let p of pts) {
      const a = p.angle + spinAngle;
      const x = cx + Math.cos(a)*p.r;
      const y = cy + Math.sin(a)*p.r;
      ctx.beginPath();
      ctx.arc(x, y, p.size*0.5, 0, Math.PI*2);
      ctx.fillStyle = `rgba(20,20,20,${0.3 + (p.size/7)*0.55})`;
      ctx.fill();
    }

    /* center hub */
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI*2);
    ctx.fillStyle = '#111';
    ctx.fill();

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
})();

/* ══════════════════════════════════════════════════════════════
   AI — Neural / circuit burst (white glow on dark gray)
══════════════════════════════════════════════════════════════ */
(function initAI() {
  const canvas = document.getElementById('ai-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf, t = 0;
  const BRANCHES = 18;
  const DEPTH = 5;
  let tree = [];

  function buildTree() {
    tree = [];
    const cx = W*0.5, cy = H*0.5;
    function branch(x, y, angle, len, depth) {
      if (depth <= 0) return;
      const ex = x + Math.cos(angle)*len;
      const ey = y + Math.sin(angle)*len;
      const size = Math.random()*3+1;
      tree.push({ x, y, ex, ey, depth, size });
      const spread = (Math.PI * 2) / (depth === DEPTH ? BRANCHES : 3);
      const numB   = depth === DEPTH ? BRANCHES : Math.floor(Math.random()*2)+2;
      for (let i = 0; i < numB; i++) {
        const a = depth === DEPTH
          ? (i/BRANCHES)*Math.PI*2
          : angle + (Math.random()-0.5)*spread*2.2;
        branch(ex, ey, a, len*0.52, depth-1);
      }
    }
    branch(cx, cy, 0, Math.min(W,H)*0.22, DEPTH);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width  = W * (window.devicePixelRatio||1);
    canvas.height = H * (window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
    buildTree();
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    t += 0.012;
    const pulse = 0.65 + Math.sin(t)*0.35;

    for (let b of tree) {
      const alpha = (b.depth / DEPTH) * 0.75 * pulse;
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.ex, b.ey);
      ctx.strokeStyle = `rgba(230,230,230,${alpha})`;
      ctx.lineWidth = b.depth * 0.4 + 0.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(b.ex, b.ey, b.size*0.5, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${alpha*0.9})`;
      ctx.fill();
    }

    /* AI text label in center */
    ctx.font = `bold ${Math.min(W,H)*0.16}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `rgba(255,255,255,${0.85 * pulse})`;
    ctx.fillText('AI', W*0.5, H*0.5);

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
})();

/* ══════════════════════════════════════════════════════════════
   FLOW — Lissajous / parametric ribbon (white on dark gray)
══════════════════════════════════════════════════════════════ */
(function initFlow() {
  const canvas = document.getElementById('flow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf, t = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width  = W * (window.devicePixelRatio||1);
    canvas.height = H * (window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    t += 0.005;
    const cx = W*0.5, cy = H*0.5;
    const rx = Math.min(W,H)*0.38, ry = Math.min(W,H)*0.38;
    const CURVES = 6;

    for (let c = 0; c < CURVES; c++) {
      const phase = (c / CURVES) * Math.PI * 2;
      const alpha = 0.1 + (c / CURVES) * 0.35;
      ctx.beginPath();
      const steps = 600;
      for (let i = 0; i <= steps; i++) {
        const u   = (i / steps) * Math.PI * 2;
        const x   = cx + rx * Math.sin(2.001 * u + t + phase) * Math.cos(u * 0.5);
        const y   = cy + ry * Math.sin(3.001 * u + t * 1.3 + phase) * Math.sin(u * 0.7);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(240,240,240,${alpha})`;
      ctx.lineWidth = 1.4 - c * 0.08;
      ctx.stroke();
    }

    /* central glow */
    const grd = ctx.createRadialGradient(cx,cy,2,cx,cy,rx*0.18);
    grd.addColorStop(0,'rgba(255,255,255,0.9)');
    grd.addColorStop(1,'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(cx,cy,rx*0.18,0,Math.PI*2);
    ctx.fillStyle = grd;
    ctx.fill();

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
})();

/* ══════════════════════════════════════════════════════════════
   BUSINESS ORBS — 4 orbiting dot-sphere nodes
══════════════════════════════════════════════════════════════ */
(function initOrbs() {
  const canvas = document.getElementById('orbs-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf, t = 0;

  const ORB_DEFS = [
    { tx: 0.2,  ty: 0.35, r: 65, ptCount: 120 },
    { tx: 0.5,  ty: 0.25, r: 50, ptCount: 90  },
    { tx: 0.8,  ty: 0.35, r: 65, ptCount: 120 },
    { tx: 0.5,  ty: 0.75, r: 80, ptCount: 160 }
  ];
  let orbParticles = [];

  function buildOrbs() {
    orbParticles = ORB_DEFS.map(orb => {
      const pts = [];
      for (let i = 0; i < orb.ptCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist  = (0.4 + Math.pow(Math.random(), 0.5) * 0.6) * orb.r;
        const s     = Math.random() * 2.5 + 0.5;
        const speed = (Math.random()-0.5)*0.006;
        pts.push({ angle, dist, size: s, speed });
      }
      return { ...orb, pts };
    });
  }

  function drawOrb(orb, cx, cy, t) {
    for (let p of orb.pts) {
      p.angle += p.speed;
      const x = cx + Math.cos(p.angle + t*0.3) * p.dist;
      const y = cy + Math.sin(p.angle + t*0.3) * p.dist * 0.55;
      ctx.beginPath();
      ctx.arc(x, y, p.size * 0.5, 0, Math.PI*2);
      ctx.fillStyle = `rgba(220,220,220,${0.15 + p.size/2.5 * 0.5})`;
      ctx.fill();
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width  = W * (window.devicePixelRatio||1);
    canvas.height = H * (window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
    buildOrbs();
  }

  /* connecting lines between orbs */
  function drawConnections(positions) {
    ctx.strokeStyle = 'rgba(200,200,200,0.15)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < positions.length; i++) {
      for (let j = i+1; j < positions.length; j++) {
        ctx.beginPath();
        ctx.moveTo(positions[i].x, positions[i].y);
        ctx.lineTo(positions[j].x, positions[j].y);
        ctx.stroke();
      }
    }
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    t += 0.008;
    const positions = orbParticles.map(orb => ({
      x: orb.tx * W,
      y: orb.ty * H
    }));
    drawConnections(positions);
    for (let i = 0; i < orbParticles.length; i++) {
      drawOrb(orbParticles[i], positions[i].x, positions[i].y, t);
    }

    /* central white glow for bottom orb */
    const bx = orbParticles[3].tx * W;
    const by = orbParticles[3].ty * H;
    const grd = ctx.createRadialGradient(bx,by,1,bx,by,18);
    grd.addColorStop(0,'rgba(255,255,255,0.9)');
    grd.addColorStop(1,'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(bx,by,18,0,Math.PI*2);
    ctx.fillStyle = grd;
    ctx.fill();

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
})();

/* ══════════════════════════════════════════════════════════════
   (Portrait canvas section removed — replaced by governance org chart)
══════════════════════════════════════════════════════════════ */
