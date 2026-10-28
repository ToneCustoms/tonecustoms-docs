import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ToneSupportAssistant from './ToneSupportAssistant.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h('div', { class: 'tc-site-shell' }, [
      h(DefaultTheme.Layout),
      h(ToneSupportAssistant)
    ])
  }
}
