import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ToneSupportAssistant from './ToneSupportAssistant.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(ToneSupportAssistant)
    })
}
