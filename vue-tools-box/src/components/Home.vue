<script setup lang="ts">
import { Ref, ref } from 'vue'

import PanelMenu, { PanelMenuProps } from 'primevue/panelmenu';
import Card from 'primevue/card';
import Qrcode from '@/components/Qrcode/index.vue'
import { flatMap } from 'lodash-es'
import { watch } from 'vue';
import type { Component } from 'vue';
import { shallowRef } from 'vue';
import Ocr from '@/components/OCR/index.vue'
const currentKey = ref<string>('')
const menuRef = ref<typeof Card>(null)
type MenuProps = Required<PanelMenuProps>['model']
const title = ref('')
const currentComponent = shallowRef<{
  component: Component | undefined,
  props?: {
    [k: string]: any
  }

}>()
const menuItems = ref<MenuProps>([
  {
    key: '0',
    label: '文档处理',
    icon: "pi pi-file",
    items: [
      {
        key: '0_0',
        label: 'PDF转换',
        icon: 'pi pi-file-pdf',
        items: [
          {
            key: '0_0_0',
            label: 'PDF转Word',
            command: (e) => {
              currentKey.value = e.item.key ?? ''
            }
          },
          {
            key: '0_0_1',
            label: 'PDF转图片',
            command: (e) => {
              currentKey.value = e.item.key ?? ''
            }
          }
        ],
      },
      {
        key: '0_1',
        label: 'Word转换',
        icon: "pi pi-file-word",
        items: [
          {
            key: '0_1_0',
            label: 'Word转PDF',
            command: (e) => {
              currentKey.value = e.item.key ?? ''
            }
          },
          {
            key: '0_1_1',
            label: 'Word转图片',
            command: (e) => {
              currentKey.value = e.item.key ?? ''
            }
          }
        ]
      }
    ]
  },
  {
    key: '1',
    label: '音视频图片处理',
    icon: "pi pi-video",
    items: [
      {
        key: '1_0',
        label: '图片压缩',
        command: (e) => {
          currentKey.value = e.item.key ?? ''
          title.value = e.item.label as string ?? ''
          currentComponent.value = {
            component: undefined,
          }
        }
      },
      {
        key: '1_1',
        label: '图片格式转换',
        command: (e) => {
          currentKey.value = e.item.key ?? ''
          title.value = e.item.label as string ?? ''
          currentComponent.value = {
            component: undefined,
          }
        }
      },
      {
        key: '1_2',
        label: 'GIF转图片',
        command: (e) => {
          currentKey.value = e.item.key ?? ''
          title.value = e.item.label as string ?? ''
          currentComponent.value = {
            component: undefined,
          }
        }
      },
      {
        key: '1_3',
        label: '视频转GIF',
        command: (e) => {
          currentKey.value = e.item.key ?? ''
          title.value = e.item.label as string ?? ''
          currentComponent.value = {
            component: undefined,
          }
        }
      },
      {
        key: '1_4',
        label: '视频处理',
        command: (e) => {
          currentKey.value = e.item.key ?? ''
          title.value = e.item.label as string ?? ''
          currentComponent.value = {
            component: undefined,
          }
        }
      },
      {
        key: '1_5',
        label: '图片OCR识别',
        command: (e) => {
          currentKey.value = e.item.key ?? ''
          title.value = e.item.label as string ?? ''
          currentComponent.value = {
            component: Ocr,
          }
        }
      },
    ]
  },
  {
    key: '2',
    label: '二维码生成器',
    icon: 'pi pi-qrcode',
    command: (e) => {
      currentKey.value = e.item.key ?? ''
      title.value = e.item.label as string ?? ''
      currentComponent.value = {
        component: Qrcode,
      }
    }
  }
])

</script>

<template>
  <div class="wrapper">
    <Card class="menu-container" style="height: calc(100vh - 16px);overflow: auto;" :ref="menuRef">
      <template #title>
        菜单
      </template>
      <template #content>
        <PanelMenu :model="menuItems" multiple />
      </template>
    </Card>
    <Card :style="{ width: `calc(100vw - 8px - ${menuRef?.getBoundingClientRect()?.width ?? 0}px)` }">
      <template #title>
        <span>
          {{ title }}
        </span>
      </template>
      <template #content>
        <component :is="currentComponent?.component" v-bind="{ ...currentComponent?.props }"></component>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 10px;
}

.menu-container {
  width: max-content;
  min-width: 250px;
  scrollbar-width: none;
}

.qrcodeWrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
