<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    :viewBox="viewbox"
    role="presentation">

    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot></slot>
    </g>
  </svg>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class Icon extends Vue {
    @Prop({ default: 18, required: false, type: Number })
    public width!: number;

    @Prop({ default: 18, required: false, type: Number })
    public height!: number;

    @Prop({ default: "", reuqired: true, type: String })
    public viewbox!: string;

    @Prop({ default: null, required: false, type: String })
    public name!: string;

    @Prop({ default: "black", required: false, type: String })
    public color!: string;
}
</script>
