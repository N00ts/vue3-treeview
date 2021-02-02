<template>
    <icon 
        v-if="opened"
        :width="width"
        :height="height"
        :viewbox="'0 0 451.847 451.847'">
        <icon-opened/>
    </icon>

    <icon 
        v-else
        :width="width"
        :height="height"
        :viewbox="'0 0 451.847 451.847'">
        <icon-closed/>
    </icon>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import Icon from './Icon.vue';
import IconOpened from "./IconOpened.vue";
import IconClosed from "./IconClosed.vue";
import { Prop } from "vue-property-decorator";
import { defaultHeight, defaultWidth } from "@/structure/IIcon";

@Options({
  components: {
    Icon,
    IconOpened,
    IconClosed
  },
})
export default class DefaultIcon extends Vue {
    @Prop({required: true})
    public opened!: boolean;
    
    public get width(): number {
        return defaultWidth;
    }

    public get height(): number {
        return defaultHeight;
    }
}
</script>