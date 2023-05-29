module.exports = {
  root:false,
  dev: {
  },
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  css: {
    less: {
      globalVars: {
        background: 'transparent'
      }
    }
  }
}
