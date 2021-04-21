import { DefaultThemeOptions, defineUserConfig } from "vuepress"

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig<DefaultThemeOptions>({
    base: "vue3-treeview"
});