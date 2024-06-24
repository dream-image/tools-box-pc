<script setup lang="ts">
import { createWorker } from 'tesseract.js';
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

const toast = useToast();
const fileupload = ref();
const files = ref<File[]>([]);
const onSelectedFiles = (event: { originalEvent: Event, files: File[] }) => {
    console.log('files', event.files);

    files.value = event.files;

};
const showWarn = ({ summary, detail, life = 3000 }: { summary: string, detail: string, life?: number }) => {
    toast.add({ severity: 'warn', summary, detail, life });
};
const recognize = async (language: string) => {
    if (files.value.length === 0) {
        showWarn({
            summary: '警告',
            detail: '请先选择文件',
            life: 2000
        })
        return
    }

    const worker = await createWorker(language);
    const ret = await worker.recognize(files.value[0]);
    console.log(ret.data.text);
    result.value = ret.data.text
    await worker.terminate();
}
const language = ref('chi_sim');
const options = ref([
    {
        label: '中文',
        value: 'chi_sim'
    },
    {
        label: '英文',
        value: 'eng'
    },
    {
        label: '日文',
        value: 'jpn'
    },
    {
        label: '韩文',
        value: 'kor'
    },
    {
        label: '法文',
        value: 'fra'
    },
])
const Window = window
const result = ref("")
</script>
<template>
    <div>
        <Toast position="top-center" />
        <FileUpload ref="fileupload" name="image" accept="image/*" :multiple="true" :fileLimit="1" :maxFileSize="0"
            @select="onSelectedFiles">
            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <div style="display: flex; justify-content: space-between; align-items: center;width: 100%;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined
                            severity="secondary"></Button>
                        <SelectButton v-model="language" optionLabel="label" optionValue="value" :options="options"
                            aria-labelledby="basic" />
                        <Button @click="recognize(language)">识别</Button>
                    </div>
                    <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger"
                        :disabled="!files || files.length === 0"></Button>
                </div>
            </template>
        </FileUpload>
        <div style="margin-top: 10px;">
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <span>结果</span>
                <Button style="padding: 0;" icon="pi pi-copy" text @click="() => {
                    Window.navigator.clipboard.writeText(result)

                    toast.add({ severity: 'success', summary: '成功', detail: '复制成功', life: 1000 });
                }"></Button>
            </div>

            <Textarea v-model="result" autoResize style="width: 100%;" cols="30" />
        </div>

    </div>
</template>
<style lang=''>

</style>