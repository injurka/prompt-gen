import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,

  rules: {
    'node/prefer-global/process': 'off',
    'no-console': 'off',
  },
})
