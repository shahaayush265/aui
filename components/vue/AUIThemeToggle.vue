<template>
  <button
    type="button"
    @click="toggleTheme"
    class="invert-block inline-flex items-center gap-2 border border-line bg-bg px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-invert-bg hover:text-invert-fg"
    aria-label="Toggle theme"
  >
    <span class="h-2 w-2 rounded-full border border-current bg-accent-ink" />
    <span>{{ isDark ? 'OBSIDIAN' : 'PAPER' }}</span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
  const next = isDark.value ? 'light' : 'dark';
  const html = document.documentElement;
  html.classList.add('theme-anim');
  html.setAttribute('data-theme', next);
  localStorage.setItem('aui-theme-pref', next);
  isDark.value = next === 'dark';

  setTimeout(() => {
    html.classList.remove('theme-anim');
  }, 450);
};

onMounted(() => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  isDark.value = current === 'dark';
});
</script>
