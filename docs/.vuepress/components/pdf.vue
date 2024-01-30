<template>
    <div class="pdf">
        <pdf ref="pdf" :src="url">
        </pdf>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
    name: 'pdf',
    props: {
        url: {
            type: String,
            default: '',
        },
    },
    components: {
        pdf
    },
    data() {
        return {
            // pdfUrl: "http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf",
        }
    }
}
</script>
