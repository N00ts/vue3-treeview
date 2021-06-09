module.exports = {
  pages: {
    index: {
      entry: "src/test.ts"
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue3-treeview/'
    : '/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  }
}
