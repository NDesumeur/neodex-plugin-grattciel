// lancé par le test « local » de NeoDex : la vérification interne, une tour montée à la manette (parfaits en série, étages coupés), son toit à la fin,
// le plein écran et la place prise (avec NEO_SHOTS : garde des images du jeu)
module.exports = async ({ pj, sleep }) => {
  const C = code => pj(`(() => { const T = document.getElementById('gcCanvas').__gc, gc = T.st(); ${code} })()`);
  const shot = async n => { if (!process.env.NEO_SHOTS) return; const d = await pj(`document.getElementById('gcCanvas').toDataURL()`); require('fs').writeFileSync(require('path').join(process.env.NEO_SHOTS, 'grattciel-' + n + '.png'), Buffer.from(d.split(',')[1], 'base64')); };
  await pj(`window.__e = []; addEventListener('error', e => __e.push(e.message)); 0`);
  const chk = await C('return T.check();'); if (chk !== 'ok') throw new Error('vérification : ' + chk);
  await pj(`document.getElementById('gcNew').click(), 0`); await sleep(100); await shot('0-depart');
  // la manette : A pose l'étage (on place l'étage mobile juste avant, pile ou décalé)
  await pj(`(() => { const pad = {axes: [0, 0], buttons: Array.from({length: 17}, () => ({pressed: false}))}; window.__pad = pad; navigator.getGamepads = () => [pad]; return 0; })()`);
  const A = async () => { await pj(`(__pad.buttons[0].pressed = true, 0)`); await sleep(60); await pj(`(__pad.buttons[0].pressed = false, 0)`); await sleep(60); };
  await A(); if (await C('return gc.mode;') !== 'play') throw new Error('A devait lancer la partie');
  for (let i = 0; i < 16; i++) { await C(`gc.mov.x = gc.tower.at(-1).x + (${i} % 5 === 4 ? 5 : 0); return 0;`); await A(); }
  const st = await C('return gc.tower.length + "|" + gc.perf + "|" + gc.combo;'); const [n, perf] = st.split('|').map(Number);
  if (n !== 17 || perf < 12) throw new Error('la tour devait monter de 16 étages dont 12 parfaits : ' + st);
  await sleep(200); await shot('1-tour');
  await pj(`(__pad.buttons[9].pressed = true, 0)`); await sleep(60); await pj(`(__pad.buttons[9].pressed = false, 0)`); await sleep(60);
  if (await C('return gc.mode;') !== 'pause') throw new Error('Start devait mettre en pause'); await A();
  await C('gc.mov.x = 400; return 0;'); await A(); await sleep(1400); await shot('2-toit');
  if (await C('return gc.mode;') !== 'over') throw new Error('la tour devait s\'arrêter');
  await pj(`navigator.getGamepads = () => [], 0`);
  const errs = await pj(`window.__e.join(' | ')`); if (errs) throw new Error('erreur : ' + errs);
  // plein écran, et la zone de jeu qui tient dans la fenêtre
  await pj(`document.fullscreenElement && document.exitFullscreen(), 0`); await sleep(200);
  await pj(`document.getElementById('gcFs').click(), 0`); await sleep(700);
  const fs = await pj(`(() => { const c = document.getElementById('gcCanvas'), r = c.getBoundingClientRect(); return document.fullscreenElement === c.parentElement && (Math.abs(r.height - innerHeight) < 3 || Math.abs(r.width - innerWidth) < 3); })()`);
  await pj(`document.fullscreenElement && document.exitFullscreen(), 0`); await sleep(300);
  if (!fs) throw new Error('le plein écran ne remplit pas l\'écran');
  const L = await pj(`(() => { const r = document.getElementById('gcCanvas').getBoundingClientRect(); let s = 0; for (let e = document.getElementById('gcCanvas').parentElement; e; e = e.parentElement) s += e.scrollTop; return { bottom: Math.round(r.bottom + s), h: Math.round(r.height), wh: innerHeight, ww: innerWidth, sw: document.documentElement.scrollWidth }; })()`);
  if (process.env.NEO_FIT_LOG) console.log('FIT', JSON.stringify(L));
  if (L.bottom > L.wh + 1 || L.sw > L.ww + 1 || L.h < 300) throw new Error('la zone de jeu dépasse la fenêtre ou reste petite : ' + JSON.stringify(L));
  return 'vérification ok · tour de 16 étages à la manette (' + perf + ' parfaits) · pause Start · toit · plein écran · ' + L.h + ' px dans ' + L.ww + '×' + L.wh;
};
