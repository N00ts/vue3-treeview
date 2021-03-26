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

    <Icon
        v-else
        :icon="fakeIcon"/>
</template>
<script lang="ts">
import useIcon from "@/setup/useIcon";
import Icon from './Icon.vue';
import { Prop } from "vue-property-decorator";
import { Options, setup, Vue } from "vue-class-component";
import { createDefaultIcon } from "@/misc/default";

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

    public get fakeIcon(): {} {
        return createDefaultIcon(null);
    }

    public setup = setup(() => {
        return useIcon(this.$props as any, this.$attrs, this.$emit);
    });
}
</script>