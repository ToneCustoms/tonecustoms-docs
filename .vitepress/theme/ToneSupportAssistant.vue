<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { withBase } from 'vitepress'

type Topic = 'install' | 'broken' | 'purchase' | 'custom' | 'bug' | 'contact'
const isOpen = ref(false)
const topic = ref<Topic | null>(null)
const dialog = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const topics: { id: Topic; icon: string; label: string }[] = [
  { id: 'install', icon: '⚙', label: 'Install a script' },
  { id: 'broken', icon: '🛠', label: 'My script is not working' },
  { id: 'purchase', icon: '🛒', label: 'Purchases & delivery' },
  { id: 'custom', icon: '✦', label: 'Custom development' },
  { id: 'bug', icon: '✎', label: 'Report a documentation issue' },
  { id: 'contact', icon: '◉', label: 'Talk to support' }
]
const guidance: Record<Topic, { title: string; text: string; links: { label: string; href: string; external?: boolean }[] }> = {
  install: {
    title: 'Installing a ToneCustoms script',
    text: 'Start with the installation hub, then follow the guide for your specific resource. Check its required framework and dependencies before making changes.',
    links: [
      { label: 'Installation hub', href: '/INSTALLATION' },
      { label: 'Customer checklist', href: '/CUSTOMER_CHECKLIST' },
      { label: 'Ask on Discord', href: 'https://discord.gg/JdZ7NTG5KF', external: true }
    ]
  },
  broken: {
    title: 'Let’s troubleshoot your script',
    text: 'Use our troubleshooting guides for startup errors, inventory items, missing interactions, database issues and UI problems. Keep credentials and private source files out of public messages.',
    links: [
      { label: 'Troubleshooting center', href: '/TROUBLESHOOTING' },
      { label: 'Product guides', href: '/products/' },
      { label: 'Contact technical support', href: 'https://discord.gg/JdZ7NTG5KF', external: true }
    ]
  },
  purchase: {
    title: 'Purchases, delivery & access',
    text: 'Check the order confirmation and the delivery instructions for your specific product. For billing disputes, missing entitlements or refund cases, use the original Tebex order-support channel.',
    links: [
      { label: 'Purchase & delivery guide', href: '/PURCHASE_AND_DELIVERY' },
      { label: 'Customer policies', href: '/policies/' },
      { label: 'Official store', href: 'https://tonecustoms.tebex.store/', external: true }
    ]
  },
  custom: {
    title: 'Discuss a custom FiveM project',
    text: 'Tell us what players or server staff should be able to do, your framework, dependencies and the essential gameplay features. Availability and terms are confirmed individually.',
    links: [
      { label: 'Custom development guide', href: '/CUSTOM_DEVELOPMENT' },
      { label: 'Contact ToneCustoms', href: 'https://discord.gg/JdZ7NTG5KF', external: true }
    ]
  },
  bug: {
    title: 'Improve our documentation',
    text: 'Report broken links, incorrect instructions or missing information using our documentation feedback forms. For actual script errors, use technical support instead.',
    links: [
      { label: 'Documentation feedback', href: 'https://github.com/ToneCustoms/tonecustoms-docs/issues/new/choose', external: true },
      { label: 'Technical troubleshooting', href: '/TROUBLESHOOTING' }
    ]
  },
  contact: {
    title: 'Contact ToneCustoms support',
    text: 'For resource setup and technical questions, join the official Discord. For billing and order disputes, reply through your existing Tebex order-support thread.',
    links: [
      { label: 'Join Discord support', href: 'https://discord.gg/JdZ7NTG5KF', external: true },
      { label: 'Support information', href: '/SUPPORT' },
      { label: 'Frequently asked questions', href: '/FAQ' }
    ]
  }
}
function open() {
  isOpen.value = true
  topic.value = null
  nextTick(() => dialog.value?.focus())
}
function close() {
  isOpen.value = false
  topic.value = null
  nextTick(() => trigger.value?.focus())
}
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close()
}
function urlFor(link: { href: string; external?: boolean }) {
  return link.external ? link.href : withBase(link.href)
}
onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="tc-assistant">
    <section v-if="isOpen" ref="dialog" class="tc-assistant-panel" role="dialog" aria-label="ToneCustoms support assistant" aria-modal="false" tabindex="-1">
      <header class="tc-assistant-header">
        <div class="tc-assistant-avatar" aria-hidden="true">TC</div>
        <div class="tc-assistant-heading">
          <strong>ToneCustoms Support</strong>
          <span>Interactive help center</span>
        </div>
        <button class="tc-assistant-close" type="button" aria-label="Close support assistant" @click="close">×</button>
      </header>
      <div class="tc-assistant-content">
        <template v-if="!topic">
          <p class="tc-assistant-greeting">Welcome to ToneCustoms.</p>
          <p class="tc-assistant-intro">What do you need help with today?</p>
          <div class="tc-assistant-options">
            <button v-for="item in topics" :key="item.id" type="button" class="tc-assistant-option" @click="topic = item.id">
              <span class="tc-assistant-option-icon" aria-hidden="true">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
              <span class="tc-assistant-chevron" aria-hidden="true">›</span>
            </button>
          </div>
        </template>
        <template v-else>
          <button class="tc-assistant-back" type="button" @click="topic = null">← All help topics</button>
          <h2 class="tc-assistant-topic-title">{{ guidance[topic].title }}</h2>
          <p class="tc-assistant-topic-copy">{{ guidance[topic].text }}</p>
          <div class="tc-assistant-links">
            <a v-for="link in guidance[topic].links" :key="link.href" :href="urlFor(link)" :target="link.external ? '_blank' : undefined" :rel="link.external ? 'noopener noreferrer' : undefined" @click="!link.external && close()">
              {{ link.label }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </template>
      </div>
      <footer class="tc-assistant-footer">
        <span>Built for Roleplay. Made with Purpose.</span>
        <span class="tc-assistant-note">Guided help · Not live chat</span>
      </footer>
    </section>
    <button ref="trigger" class="tc-assistant-trigger" type="button" :aria-expanded="isOpen" aria-label="Open ToneCustoms support assistant" @click="isOpen ? close() : open()">
      <svg v-if="!isOpen" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 8.8 8.8 0 0 1-3.7-.8L3 21l1.3-4.6a8.5 8.5 0 1 1 15.7-4.9Z"/><path d="M8 11.5h8M8 15h5"/></svg>
      <span v-else aria-hidden="true" class="tc-assistant-x">×</span>
      <span class="tc-assistant-trigger-label">{{ isOpen ? 'Close help' : 'Need help?' }}</span>
    </button>
  </div>
</template>
