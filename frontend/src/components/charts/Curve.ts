/** smooth curve through the points that never overshoots the data (monotone cubic) */
export function monotonePath(p: [number, number][]) {
  const n = p.length;
  if (n === 0) return "";
  if (n === 1) return `M${p[0][0]},${p[0][1]}`;

  const dx: number[] = [];
  const s: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = p[i + 1][0] - p[i][0];
    s[i] = dx[i] === 0 ? 0 : (p[i + 1][1] - p[i][1]) / dx[i];
  }
  const t: number[] = new Array(n);
  t[0] = s[0];
  t[n - 1] = s[n - 2];
  for (let i = 1; i < n - 1; i++) t[i] = s[i - 1] * s[i] <= 0 ? 0 : (s[i - 1] + s[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
    } else {
      const a = t[i] / s[i];
      const b = t[i + 1] / s[i];
      const h = Math.hypot(a, b);
      if (h > 3) {
        const k = 3 / h;
        t[i] = k * a * s[i];
        t[i + 1] = k * b * s[i];
      }
    }
  }

  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${p[i][0] + h},${p[i][1] + t[i] * h} ${p[i + 1][0] - h},${p[i + 1][1] - t[i + 1] * h} ${p[i + 1][0]},${p[i + 1][1]}`;
  }
  return d;
}