import DefaultTheme from 'vitepress/theme'
import test from "./basic.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('basic', test);
  }
}
