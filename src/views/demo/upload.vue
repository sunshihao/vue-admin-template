<template>
  <Oel-screen>
    <el-upload
      ref="upload"
      class="upload-demo"
      action="_"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :auto-upload="false"
      :limit="1"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过XXXkb</div>
    </el-upload>
  </Oel-screen>
</template>

<script>

import { uploadFile } from '@/api/file'

export default {
  data() {
    return {
      // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      fileList: []
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    submitUpload() {
    //   this.$refs.upload.submit()
      console.log('fileList', this.fileList)
      if (this.fileList && this.fileList.length > 0) {
        const { raw } = this.fileList[0]
        const fmdata = new FormData()
        fmdata.append('file', raw)
        uploadFile(fmdata)
      }
    },
    handleExceed(file, fileList) {
      console.log(file, fileList)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleChange(file, fileList) {
      this.fileList = []
      this.fileList.push(file)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
