// ===== Data: Outfits, Hair, Accessories =====

const OUTFITS = [
  { id: 'princess', label: 'Princess', icon: '👸', torso: '#e91e8c', skirt: '#ff69b4', arms: '#e91e8c', name: 'Princess Barbie' },
  { id: 'mermaid',  label: 'Mermaid',  icon: '🧜', torso: '#00bcd4', skirt: '#006994', arms: '#00bcd4', name: 'Mermaid Barbie' },
  { id: 'fairy',    label: 'Fairy',    icon: '🧚', torso: '#ab47bc', skirt: '#e040fb', arms: '#ab47bc', name: 'Fairy Barbie' },
  { id: 'doctor',   label: 'Doctor',   icon: '👩‍⚕️', torso: '#ffffff', skirt: '#eeeeee', arms: '#ffffff', name: 'Doctor Barbie' },
  { id: 'astronaut',label: 'Astronaut',icon: '👩‍🚀', torso: '#3f51b5', skirt: '#283593', arms: '#3f51b5', name: 'Astronaut Barbie' },
  { id: 'beach',    label: 'Beach',    icon: '🏖️', torso: '#ff7043', skirt: '#ffccbc', arms: '#ff7043', name: 'Beach Barbie' },
  { id: 'ballerina',label: 'Ballerina',icon: '🩰', torso: '#f8bbd0', skirt: '#f48fb1', arms: '#f8bbd0', name: 'Ballerina Barbie' },
  { id: 'chef',     label: 'Chef',     icon: '👩‍🍳', torso: '#fff9c4', skirt: '#f57f17', arms: '#fff9c4', name: 'Chef Barbie' },
];

const HAIRSTYLES = [
  { id: 'blonde',  label: 'Blonde',  icon: '✨', color: '#f5c518', leftH: '60px', rightH: '60px' },
  { id: 'brown',   label: 'Brown',   icon: '🌰', color: '#6d3a1f', leftH: '60px', rightH: '60px' },
  { id: 'black',   label: 'Black',   icon: '🖤', color: '#1a1a1a', leftH: '60px', rightH: '60px' },
  { id: 'red',     label: 'Red',     icon: '🔴', color: '#c0392b', leftH: '60px', rightH: '60px' },
  { id: 'pink',    label: 'Pink',    icon: '💗', color: '#ff69b4', leftH: '60px', rightH: '60px' },
  { id: 'purple',  label: 'Purple',  icon: '💜', color: '#8e44ad', leftH: '60px', rightH: '60px' },
  { id: 'long',    label: 'Long',    icon: '🌊', color: '#f5c518', leftH: '100px', rightH: '100px' },
  { id: 'short',   label: 'Short',   icon: '✂️', color: '#f5c518', leftH: '30px', rightH: '30px' },
];

const ACCESSORIES = [
  { id: 'none',   label: 'None',     icon: '❌', crown: false, wand: false, glasses: false, necklace: false },
  { id: 'crown',  label: 'Crown',    icon: '👑', crown: true,  wand: false, glasses: false, necklace: false },
  { id: 'wand',   label: 'Wand',     icon: '🪄', crown: false, wand: true,  glasses: false, necklace: false },
  { id: 'glasses',label: 'Glasses',  icon: '👓', crown: false, wand: false, glasses: true,  necklace: false },
  { id: 'necklace',label:'Necklace', icon: '📿', crown: false, wand: false, glasses: false, necklace: true  },
  { id: 'all',    label: 'All!',     icon: '🌟', crown: true,  wand: true,  glasses: true,  necklace: true  },
];

// ===== State =====
let selected = {
  outfit: OUTFITS[0],
  hair: HAIRSTYLES[0],
  accessory: ACCESSORIES[0],
};
let changeCount = 0;

// ===== Init =====
window.addEventListener('DOMContentLoaded', () => {
  buildStars();
  buildGrid('outfitGrid', OUTFITS, 'outfit', selectOutfit);
  buildGrid('hairGrid', HAIRSTYLES, 'hair', selectHair);
  buildGrid('accGrid', ACCESSORIES, 'accessory', selectAccessory);

  applyOutfit(selected.outfit);
  applyHair(selected.hair);
  applyAccessory(selected.accessory);

  markSelected('outfitGrid', OUTFITS[0].id);
  markSelected('hairGrid', HAIRSTYLES[0].id);
  markSelected('accGrid', ACCESSORIES[0].id);

  document.getElementById('dollWrap').addEventListener('click', () => {
    burst(document.getElementById('sparkles'), 8);
  });
});

// ===== Build grids =====
function buildGrid(gridId, items, type, handler) {
  const grid = document.getElementById(gridId);
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.dataset.id = item.id;
    card.dataset.type = type;
    card.innerHTML = `<span class="item-icon">${item.icon}</span><span class="item-label">${item.label}</span>`;
    card.addEventListener('click', () => {
      handler(item);
      markSelected(gridId, item.id);
      triggerSparkles();
      changeCount++;
    });
    grid.appendChild(card);
  });
}

function markSelected(gridId, id) {
  const grid = document.getElementById(gridId);
  grid.querySelectorAll('.item-card').forEach(c => c.classList.remove('selected'));
  const target = grid.querySelector(`[data-id="${id}"]`);
  if (target) target.classList.add('selected');
}

// ===== Apply: Outfit =====
function selectOutfit(outfit) {
  selected.outfit = outfit;
  applyOutfit(outfit);
  document.getElementById('nameTag').textContent = outfit.name + ' ✨';
}

function applyOutfit(outfit) {
  document.documentElement.style.setProperty('--outfit-color', outfit.torso);
  document.documentElement.style.setProperty('--skirt-color', outfit.skirt);
  document.getElementById('dollTorso').style.background = outfit.torso;
  document.getElementById('skirtLayer').style.background = outfit.skirt;
  document.querySelector('.left-arm').style.background = outfit.arms;
  document.querySelector('.right-arm').style.background = outfit.arms;
}

// ===== Apply: Hair =====
function selectHair(hair) {
  selected.hair = hair;
  applyHair(hair);
}

function applyHair(hair) {
  document.documentElement.style.setProperty('--hair-color', hair.color);
  const tops = document.querySelectorAll('.hair-top, .hair-left, .hair-right');
  tops.forEach(el => el.style.background = hair.color);
  document.querySelector('.hair-left').style.height = hair.leftH;
  document.querySelector('.hair-right').style.height = hair.rightH;
}

// ===== Apply: Accessory =====
function selectAccessory(acc) {
  selected.accessory = acc;
  applyAccessory(acc);
}

function applyAccessory(acc) {
  const layer = document.getElementById('accessoryLayer');
  layer.innerHTML = '';

  if (acc.crown) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute; top:-20px; left:50%; transform:translateX(-50%);
      font-size:2rem; text-align:center; z-index:25; pointer-events:none;
      animation: float-crown 2s ease-in-out infinite;
    `;
    el.textContent = '👑';
    layer.appendChild(el);
  }

  if (acc.wand) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute; top:120px; right:-36px;
      font-size:2rem; z-index:25; pointer-events:none;
      animation: float-wand 2.5s ease-in-out infinite;
    `;
    el.textContent = '🪄';
    layer.appendChild(el);
  }

  if (acc.glasses) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute; top:64px; left:50%; transform:translateX(-50%);
      font-size:1.1rem; z-index:25; pointer-events:none;
    `;
    el.textContent = '👓';
    layer.appendChild(el);
  }

  if (acc.necklace) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute; top:136px; left:50%; transform:translateX(-50%);
      font-size:1rem; z-index:25; pointer-events:none;
    `;
    el.textContent = '📿';
    layer.appendChild(el);
  }

  // Inject keyframes once
  if (!document.getElementById('acc-keyframes')) {
    const style = document.createElement('style');
    style.id = 'acc-keyframes';
    style.textContent = `
      @keyframes float-crown { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-6px)} }
      @keyframes float-wand  { 0%,100%{transform:rotate(0deg)}  50%{transform:rotate(15deg)} }
    `;
    document.head.appendChild(style);
  }
}

// ===== Sparkle burst =====
function triggerSparkles() {
  burst(document.getElementById('sparkles'), 6);
}

function burst(container, count) {
  const emojis = ['✨','⭐','💖','🌟','💎','🌸','💫'];
  for (let i = 0; i < count; i++) {
    const sp = document.createElement('div');
    sp.className = 'sparkle';
    sp.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 80 + Math.random() * 80;
    sp.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
    sp.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
    sp.style.left = '50%';
    sp.style.top = '50%';
    sp.style.animationDelay = `${Math.random() * 0.2}s`;
    container.appendChild(sp);
    setTimeout(() => sp.remove(), 1200);
  }
}

// ===== Celebration =====
function showCelebration() {
  const cel = document.getElementById('celebration');
  cel.classList.add('show');
  launchConfetti();
  setTimeout(() => cel.classList.remove('show'), 2200);
}

function launchConfetti() {
  const colors = ['#ff4daf','#ffd700','#ab47bc','#00bcd4','#ff7043','#8bc34a'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--dur', `${1.2 + Math.random() * 1.5}s`);
    piece.style.setProperty('--delay', `${Math.random() * 0.5}s`);
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
}

// ===== Background stars =====
function buildStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = 3 + Math.random() * 5;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.setProperty('--dur', `${2 + Math.random() * 3}s`);
    s.style.setProperty('--delay', `${Math.random() * 3}s`);
    container.appendChild(s);
  }
}
