<script setup lang="ts">
import { Ref, ref } from 'vue'
import Button from 'primevue/button'
import PanelMenu, { PanelMenuProps } from 'primevue/panelmenu';
import Card from 'primevue/card';
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
import qrBg from '../assets/illust_94819771_20220527_012550.png'
const currentKey = ref()
const menuRef = ref<typeof Card>(null)
const qrcode = ref()
const qrText = ref()
const menuItems: Ref<PanelMenuProps['model']> = ref([
  {
    key: '0',
    label: '文档处理',
    icon: "pi pi-file",
    command: (e) => {
      console.log(e.item, e.originalEvent);

    },
    items: [
      {
        key: '0_0',
        label: 'PDF转换',
        icon: 'pi pi-file-pdf',
        items: [
          {
            key: '0_0_0',
            label: 'PDF转Word',

          },
          {
            key: '0_0_1',
            label: 'PDF转图片'
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
            label: 'Word转PDF'
          },
          {
            key: '0_1_1',
            label: 'Word转图片'
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
        label: '图片压缩'
      },
      {
        key: '1_1',
        label: '图片格式转换',
      },
      {
        key: '1_2',
        label: 'GIF转图片',
      },
      {
        key: '1_3',
        label: '视频转GIF'
      },
      {
        key: '1_4',
        label: '视频处理'
      },

    ]
  },
  {
    key: '2',
    label: '二维码生成器',
    icon: 'pi pi-qrcode',
    command: (e) => {
      currentKey.value = e.item.key
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
        <span v-if="currentKey === '2'">
          二维码生成器
        </span>

      </template>
      <template #content>
        <div v-if="currentKey === '2'" class="qrcodeWrapper">
          <div style="display: flex;gap: 10px;">
            <Button label="生成二维码" severity="secondary" @click="() => {
              qrText = qrcode
            }" />
            <FloatLabel>
              <InputText id="username" style="min-width: 300px;" v-model="qrcode" />
              <label for="username">请输入内容</label>
            </FloatLabel>
          </div>

          <div v-if="qrText">
            <vue-qr :text="qrText" :bgSrc="qrBg" :size="300" :dotScale="0.5"></vue-qr>
          </div>
        </div>
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
