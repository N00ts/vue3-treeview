import DefaultTheme from 'vitepress/theme'
import basic from "./components/basic.vue";
import events from "./components/events.vue";
import slots from "./components/slots.vue";
import async from "./components/async.vue";
import iconShape from "./components/iconShape.vue";
import iconClass from "./components/iconClass.vue";
import iconImage from "./components/iconImage.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('basic', basic);
    app.component('events', events);
    app.component('slots', slots);
    app.component('async', async);
    app.component('iconShape', iconShape);
    app.component('iconClass', iconClass);
    app.component('iconImage', iconImage);
  }
}
