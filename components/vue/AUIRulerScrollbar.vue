<template>
  <aside
    v-if="mounted"
    ref="railRef"
    class="aui-ruler-rail"
    :style="{ width: railWidth + 'px' }"
    @pointerdown="handlePointerDown"
    aria-label="Precision Scroll Gauge"
  >
    <div class="aui-ruler-ticks-track">
      <span
        v-for="t in ticks"
        :key="t.pct"
        class="aui-ruler-tick-mark"
        :data-major="t.isMajor ? 'true' : 'false'"
        :style="{ top: t.pct + '%' }"
      />
    </div>

    <div ref="cursorRef" class="aui-ruler-cursor">
      <span class="aui-ruler-needle" />
      <div class="aui-ruler-readout">
        <span class="ruler-digits">
          <span
            v-for="col in 3"
            :key="col"
            :ref="el => digitCols[col - 1] = el"
            class="ruler-digit-col"
          >
            <span v-for="d in 10" :key="d">{{ d - 1 }}</span>
          </span>
        </span>
        <span style="margin-left: 2px;">%</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  side: { type: String, default: 'right' },
  railWidth: { type: Number, default: 48 },
  minorStep: { type: Number, default: 1 },
  majorStep: { type: Number, default: 5 },
  enableScrub: { type: Boolean, default: true }
});

const mounted = ref(false);
const railRef = ref(null);
const cursorRef = ref(null);
const digitCols = ref([]);
const prevDigits = [-1, -1, -1];
let isDragging = false;

const ticks = computed(() => {
  const list = [];
  for (let pct = 0; pct <= 100; pct += props.minorStep) {
    list.push({ pct, isMajor: pct % props.majorStep === 0 });
  }
  return list;
});

const updateScroll = () => {
  const docH = document.documentElement.scrollHeight;
  const vh = window.innerHeight;
  const maxScroll = Math.max(1, docH - vh);
  const scrollY = window.scrollY;
  const pct = Math.min(Math.max(scrollY / maxScroll, 0), 1);
  const pct100 = Math.round(pct * 100);

  if (cursorRef.value && railRef.value) {
    const railH = railRef.value.clientHeight;
    const cursorY = pct * railH;
    cursorRef.value.style.transform = `translate3d(0, ${cursorY}px, 0)`;
  }

  const str = String(pct100).padStart(3, '0');
  for (let i = 0; i < 3; i++) {
    const digit = parseInt(str[i], 10);
    const col = digitCols.value[i];
    if (col && prevDigits[i] !== digit) {
      prevDigits[i] = digit;
      col.style.transform = `translateY(-${digit * 1}em)`;
    }
  }
};

const handlePointerDown = (e) => {
  if (!props.enableScrub || e.button !== 0 || !railRef.value) return;
  isDragging = true;
  document.body.style.userSelect = 'none';

  const scrub = (clientY) => {
    if (!railRef.value) return;
    const rect = railRef.value.getBoundingClientRect();
    const pct = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pct * maxScroll, behavior: 'auto' });
  };

  scrub(e.clientY);

  const onPointerMove = (ev) => { if (isDragging) scrub(ev.clientY); };
  const onPointerUp = () => {
    isDragging = false;
    document.body.style.userSelect = '';
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
};

onMounted(() => {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const isMobile = window.innerWidth < 1024;
  if (isTouch || isMobile) return;

  mounted.value = true;
  document.documentElement.dataset.ruler = 'on';
  document.documentElement.dataset.rulerSide = props.side;
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll);
  setTimeout(updateScroll, 50);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
  window.removeEventListener('resize', updateScroll);
  delete document.documentElement.dataset.ruler;
});
</script>
