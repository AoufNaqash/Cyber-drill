<script setup>
import { computed } from 'vue';
import { store } from '../store';

const results = computed(() => {
  const me = store.currentUser?.name;
  if (!me) return [];
  return store.myResults.filter(r => r.student === me);
});

// Visual metrics
const average = computed(() => {
  if (results.value.length === 0) return 0;
  const sum = results.value.reduce((a,b) => a + b.score, 0);
  return Math.round(sum / results.value.length);
});
const passRate = computed(() => {
  if (results.value.length === 0) return 0;
  const passed = results.value.filter(r => r.score >= (r.maxScore * 0.7)).length;
  return Math.round((passed / results.value.length) * 100);
});
const recent = computed(() => results.value.slice(-8));

// Chart point generation for SVG line chart (visual-only)
const chartPoints = computed(() => {
  const pts = [];
  const data = recent.value;
  if (data.length === 0) return pts;
  const xStart = 40, xEnd = 340;
  const yTop = 10, yBottom = 130; // SVG coordinates
  const width = xEnd - xStart;
  const height = yBottom - yTop;
  const values = data.map(d => (d.score / d.maxScore) * 100);
  const step = data.length > 1 ? width / (data.length - 1) : 0;
  values.forEach((v, i) => {
    const x = Math.round(xStart + step * i);
    const y = Math.round(yBottom - (v / 100) * height);
    pts.push({ x, y, value: Math.round(v) });
  });
  return pts;
});
const chartPointsString = computed(() => chartPoints.value.map(p => `${p.x},${p.y}`).join(' '));
const chartAreaString = computed(() => {
  const pts = chartPoints.value;
  if (pts.length === 0) return '';
  const xStart = pts[0].x;
  const xEnd = pts[pts.length - 1].x;
  const baseY = 140;
  const areaPts = [ `${xStart},${baseY}` , ...pts.map(p => `${p.x},${p.y}`), `${xEnd},${baseY}` ];
  return areaPts.join(' ');
});

const getDrillName = (id) => {
  const drill = store.drills.find(d => d.id === id);
  return drill ? drill.title : 'Unknown Drill';
};

const getScoreClass = (score) => {
  if (score >= 80) return 'text-secondary font-bold';
  if (score >= 60) return 'text-warning font-bold';
  return 'text-danger font-bold';
};

// Circular progress ring for average display
const avgRadius = 34;
const avgCircumference = 2 * Math.PI * avgRadius;
const dashOffset = computed(() => Math.round(avgCircumference * (1 - (average.value / 100))));
const progressStroke = computed(() => average.value >= 85 ? 'url(#avgGradient)' : average.value >= 70 ? '#f59e0b' : '#ef4444');
</script>

<template>
  <div>
    <div class="mb-8 pb-6 border-b border-gray-200">
      <h1 class="text-3xl font-extrabold text-dark">My Results</h1>
      <p class="text-gray-500 mt-2">Track your performance history</p>
    </div>

    <!-- Visual Summary -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gradient-to-r from-indigo-50 to-sky-50 rounded-2xl p-6 shadow-md border border-surface-border flex items-center gap-4">
        <div class="relative w-24 h-24 flex-none">
          <svg viewBox="0 0 100 100" class="avg-ring" width="96" height="96" aria-hidden="true">
            <defs>
              <linearGradient id="avgGradient" x1="0" x2="1">
                <stop offset="0%" stop-color="#06b6d4" />
                <stop offset="100%" stop-color="#6366f1" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="34" class="ring-bg" fill="none" stroke="#e6eef9" stroke-width="12"/>
            <circle cx="50" cy="50" r="34" class="ring-progress" fill="none" :stroke="progressStroke" stroke-width="12" stroke-linecap="round" :stroke-dasharray="avgCircumference" :stroke-dashoffset="dashOffset"/>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-xl font-extrabold text-indigo-700">{{ average }}%</div>
          </div>
        </div>

        <div>
          <div class="text-sm text-muted">Overall Average</div>
          <div class="text-lg font-bold text-dark">{{ average }}%</div>
          <div class="text-sm text-muted mt-1">Pass rate: <span class="font-semibold">{{ passRate }}%</span></div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-indigo-50 to-sky-50 rounded-2xl p-6 shadow-md border border-surface-border md:col-span-2">
        <div class="flex items-center justify-between mb-3">
          <div class="font-semibold text-dark">Recent Performance</div>
          <div class="text-sm text-muted">Last {{ recent.length }} attempts</div>
        </div>
        <div class="line-chart-wrap">
          <svg class="line-chart" viewBox="0 0 360 160" preserveAspectRatio="none" role="img" aria-label="Recent performance line chart">
            <defs>
              <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="rgba(99,102,241,0.18)" />
                <stop offset="100%" stop-color="rgba(99,102,241,0.02)" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" x2="1">
                <stop offset="0%" stop-color="#06b6d4" />
                <stop offset="100%" stop-color="#6366f1" />
              </linearGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <!-- grid lines -->
            <g class="chart-grid" stroke="rgba(15,23,42,0.06)" stroke-width="1">
              <line x1="40" y1="10" x2="350" y2="10" />
              <line x1="40" y1="50" x2="350" y2="50" />
              <line x1="40" y1="90" x2="350" y2="90" />
              <line x1="40" y1="130" x2="350" y2="130" />
            </g>

            <!-- axes -->
            <g class="chart-axis" stroke="rgba(15,23,42,0.08)">
              <line x1="40" y1="10" x2="40" y2="140" />
              <line x1="40" y1="140" x2="350" y2="140" />
            </g>

            <!-- y labels -->
            <g class="chart-ylabels text-muted" fill="currentColor">
              <text x="10" y="15" class="axis-label">100</text>
              <text x="10" y="55" class="axis-label">75</text>
              <text x="10" y="95" class="axis-label">50</text>
              <text x="10" y="135" class="axis-label">25</text>
            </g>

            <!-- filled area under curve -->
            <polygon :points="chartAreaString" class="chart-area" fill="url(#areaGradient)" opacity="0.95" />

            <!-- line and points -->
            <polyline :points="chartPointsString" class="chart-line" fill="none" stroke="url(#lineGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

            <g v-for="(pt, i) in chartPoints" :key="i">
              <circle :cx="pt.x" :cy="pt.y" r="6" class="chart-point" :fill="pt.value >= 85 ? '#059669' : pt.value >= 70 ? '#f59e0b' : '#ef4444'" stroke="#fff" stroke-width="2" :filter="'url(#softGlow)'">
                <title>{{ `${getDrillName(recent[i].drillId)} — ${recent[i].score}/${recent[i].maxScore}` }}</title>
              </circle>
            </g>

            <!-- x labels -->
            <g class="chart-xlabels text-muted" fill="currentColor">
              <text v-for="(r, i) in recent" :key="'xl'+i" :x="chartPoints[i]?.x" :y="155" text-anchor="middle" class="axis-label">{{ new Date(r.date).toLocaleDateString(undefined,{month:'short',day:'numeric'}) }}</text>
            </g>
          </svg>
          <div v-if="recent.length === 0" class="text-muted p-4">No attempts yet</div>
        </div>
      </div>
    </div>

    <div class="bg-surface rounded-2xl shadow-sm border border-surface-border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-slate-50 border-b border-gray-200">
              <th class="p-5 font-bold text-dark text-sm">Drill Name</th>
              <th class="p-5 font-bold text-dark text-sm">Date</th>
              <th class="p-5 font-bold text-dark text-sm">Score</th>
              <th class="p-5 font-bold text-dark text-sm">Status</th>
              <th class="p-5 font-bold text-dark text-sm">Feedback</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(res, index) in results" :key="index" class="hover:bg-slate-50 transition-colors">
              <td class="p-5 font-bold text-dark">{{ getDrillName(res.drillId) }}</td>
              <td class="p-5 text-gray-500 text-sm">{{ res.date }}</td>
              <td class="p-5 text-lg">
                <span :class="getScoreClass(res.score)">{{ res.score }}/{{ res.maxScore }}</span>
              </td>
              <td class="p-5">
                <span class="bg-green-100 text-secondary border border-green-200 px-3 py-1 rounded-full text-xs font-bold uppercase">{{ res.status }}</span>
              </td>
              <td class="p-5 text-gray-500 text-sm italic">"{{ res.feedback }}"</td>
            </tr>
            <tr v-if="results.length === 0">
              <td colspan="5" class="p-10 text-center text-gray-400">No results found. Start a drill!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avg-ring { display: block; }
.avg-ring .ring-bg { stroke-linecap: round; }
.avg-ring .ring-progress {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.8s ease, stroke 0.3s ease;
  filter: drop-shadow(0 6px 12px rgba(99,102,241,0.12));
}
/* small utility to keep muted text consistent if not already present */
.text-muted { color: #6b7280; }
.line-chart { width: 100%; height: 160px; }
.chart-area { transition: opacity 0.5s ease; }
.chart-line { stroke-dasharray: 400; stroke-dashoffset: 400; animation: drawLine 900ms cubic-bezier(.2,.9,.2,1) forwards; filter: drop-shadow(0 6px 18px rgba(99,102,241,0.12)); }
.chart-point { transition: transform 150ms ease, r 150ms ease; cursor: pointer; }
.chart-point:hover { transform: scale(1.2); }
.chart-grid line { stroke-opacity: 0.06; }
.axis-label { font-size: 11px; fill: #9ca3af; }
@keyframes drawLine { to { stroke-dashoffset: 0; } }
</style>