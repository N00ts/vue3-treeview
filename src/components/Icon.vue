<template v-if="icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    v-if="icon.type === 'shape'"
    :width="icon.width"
    :height="icon.height"
    :class="icon.iconClass"
    :style="icon.iconStyle"
    :viewBox="icon.viewBox">

    <path 
      :d="icon.draw"
      :fill="icon.fill"
      :strok="icon.stroke">
    </path>
  </svg>

  <i
    v-else-if="icon.type === 'class'" 
    :class="icon.class"
    :style="icon.style">
  </i>

  <img 
    v-else-if="icon.type === 'img'"
    :src="icon.src" 
    :alt="icon.alt"
    :width="icon.width"
    :height="icon.height"
  >    
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import IIcon from '../structure/IIcon';

export default class Icon extends Vue {
    @Prop({ type: Object, required: true })
    public icon: IIcon;
}
</script>
