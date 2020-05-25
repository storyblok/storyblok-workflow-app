module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    // allow v-bind without use of a state variable
    // https://tailwindcss.com/docs/controlling-file-size/#writing-purgeable-html
    'vue/valid-v-bind': 'off'
  }
}
