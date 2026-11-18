<template>
  <span
    aria-hidden="true"
    :class="['tick', half ? 'tick-half' : '', `tick-${position}`]"
  />
</template>

<script setup>
defineProps({
  position: { type: String, default: 'tl' },
  half: { type: Boolean, default: true }
});
</script>
