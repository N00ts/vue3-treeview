<template>
  <template
    v-if="useIcons"
  >
    <Icon
      v-if="opened"
      :icon="openedIcon"
    />

    <Icon
      v-else
      :icon="closedIcon"
    />
  </template>

  <Icon
    v-else
    :icon="fakeIcon"
  />
</template>
<script lang="ts">
import useIcon from "../setup/useIcon";
import Icon from './Icon.vue';
import { createDefaultIcon } from "../misc/default";

export default {
    components: {
        Icon
    },
    props: {
        isLeaf: {
            type: Boolean
        },
        opened: {
            type: Boolean
        }
    },
    setup(props) {
        return useIcon(props);
    },
    computed: {
        fakeIcon() {
            return createDefaultIcon(null);
        }
    }
};
</script>