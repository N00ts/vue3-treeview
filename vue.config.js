module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue3-treeview/'
    : '/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  }
}
