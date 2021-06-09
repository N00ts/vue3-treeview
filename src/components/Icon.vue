<template v-if="icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    v-if="icon.type === 'shape'"
    :width="icon.width"
    :height="icon.height"
    :class="icon.class"
    :style="icon.style"
    :viewBox="icon.viewBox"
  >

    <path 
      :d="icon.draw"
      :fill="icon.fill"
      :stroke="icon.stroke"
      :stroke-width="icon.strokeWidth"
    />
  </svg>

  <i
    v-else-if="icon.type === 'class'" 
    :class="icon.class"
    :style="icon.style"
  />

  <img 
    v-else-if="icon.type === 'img'"
    :src="icon.src" 
    :alt="icon.alt"
    :width="icon.width"
    :height="icon.height"
    :class="icon.class"
    :style="icon.style"
  >    
</template>
<script lang="ts">
export default {
  props: {
    icon: {
      required: true,
      type: Object
    }
  }
};
</script>
