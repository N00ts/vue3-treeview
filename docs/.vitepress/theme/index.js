import DefaultTheme from 'vitepress/theme'
import basic from "./basic.vue";
import events from "./events.vue";
import slots from "./slots.vue";
import lazy from "./lazy.vue";


export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('basic', basic);
    app.component('events', events);
    app.component('slots', slots);
    app.component('lazy', lazy);
  }
}
