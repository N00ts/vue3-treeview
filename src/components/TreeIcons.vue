<template>
    <template
        v-if="setup.useIcons">

        <Icon
            v-if="opened"
            :icon="setup.openedIcon"/>

        <Icon
            v-else
            :icon="setup.closedIcon"/>
    </template>

    <div v-else :style="setup.fakeNodeStyle"/>
</template>
<script lang="ts">
import useIcon from "@/setup/useIcon";
import { Options, setup, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Icon from './Icon.vue';

@Options({
    components: {
        Icon
    }
})
export default class TreeIcons extends Vue {
    @Prop({ type: Boolean })
    public isLeaf: boolean;

    @Prop({ type: Boolean })
    public opened: boolean;

    public setup = setup(() => {
        return useIcon(this.$props as any, this.$attrs, this.$emit);
    });

    public created(): void {
        console.log("created");
    }
}
</script>