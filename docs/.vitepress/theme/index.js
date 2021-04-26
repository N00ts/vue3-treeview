import DefaultTheme from 'vitepress/theme'
import test from "./test.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('test', test);
  }
}
