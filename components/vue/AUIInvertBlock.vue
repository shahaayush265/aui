<template>
  <component
    :is="as"
    :data-active="active ? 'true' : 'false'"
    class="invert-block inline-flex items-center justify-center font-mono text-xs tracking-wider uppercase px-4 py-2 cursor-pointer transition-colors border border-line bg-bg text-ink hover:bg-invert-bg hover:text-invert-fg"
  >
    <slot />
  </component>
</template>

<script setup>
defineProps({
  as: { type: String, default: 'button' },
  active: { type: Boolean, default: false }
});
</script>
