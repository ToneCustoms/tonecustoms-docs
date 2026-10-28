import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ToneSupportAssistant from './ToneSupportAssistant.vue'
import ToneAnalytics from './ToneAnalytics.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ToneAnalytics', ToneAnalytics)
  },
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(ToneSupportAssistant)
    })
}
