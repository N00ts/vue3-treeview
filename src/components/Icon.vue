<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :aria-labelledby="name"
    :viewBox="viewbox"
    role="presentation">

    <title lang="en">{{ name }} icon</title>
    <g :fill="color">
      <slot></slot>
    </g>
  </svg>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class Icon extends Vue {
    @Prop({ default: 16, required: false, type: Number })
    public width!: number;

    @Prop({ default: 16, required: false, type: Number })
    public height!: number;

    @Prop({ default: "", reuqired: true, type: String })
    public viewbox!: string;

    @Prop({ default: null, required: false, type: String })
    public name!: string;

    @Prop({ default: "black", required: false, type: String })
    public color!: string;
}
</script>
