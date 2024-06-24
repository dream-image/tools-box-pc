<script setup lang="ts">
import Button from 'primevue/button'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
import qrBg from '@/assets/illust_94819771_20220527_012550.png'
import { ref } from 'vue';
const qrText = ref('')
const qrcode = ref('')
</script>
<template>
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
</template>
<style lang=''>

</style>