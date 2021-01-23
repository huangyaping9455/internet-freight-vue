<template>
  <div>
    <el-upload drag multiple
               name="file"
               ref="upload"
               :limit="limit"
               action=""
               :data="uploadData"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :file-list="fileList"
               :beforeUpload="beforeAVatarUpload"
               :on-exceed="onExceed"
               :onError="uploadError"
               :onSuccess="uploadSuccess"
               :auto-upload="true"
               :http-request="uploadImage">

      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传'jpg/png/jpeg/gif'</div>
    </el-upload>
  </div>

</template>

<script>
import {uploadImage} from '@/api/api'

export default {
  data () {
    return {

      // 。。。我才刚知道token可以不放在header中，直接放在路径后面也行
      limit: 1,
      fileList: [],
      uploadData: {}
    }
  },
  methods: {
    // 当设置了取消自动上传的时候，调用此方法开始上传
    // submitUpload () {
    //   this.$refs.upload.submit()
    // },

    uploadImage (param) {
      let formData = new FormData()
      formData.append(param.filename, param.file)
      console.log(param)
      console.log(formData)
      uploadImage(formData).then(({data}) => {
        console.log(data)
        if (data || data.code === 0) {
          this.$message.success('上传成功')
        }
      })
    },

    handleRemove (file, fileList) {
      alert('移除')
      if (file.status === 'success') {
        this.$http({
          url: this.$http.addUrl('/filesystem/fileFastDFS/delete'),
          method: 'post',
          data: this.$http.addData()
        }).then(({data}) => {
          this.$message.success('删除图片成功！')
        })
      }
    },
    handlePreview (file) {
      if (file.status === 'success') {
        this.imageVisiable = true
        this.$nextTick(() => {
          this.$refs.showImage.init(file.url)
        })
      }
    },
    onExceed (files, fileList) {
      this.$message.error('提示：只能上传一张图片！')
    },
    // 图片上传
    beforeAVatarUpload (file) {
      if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        this.$message.error('只支持jpg、png、gif格式的图片！')
        return false
      }
    },
    uploadSuccess (response, file, fileList) {
      this.fileIds = response.fileIds
      console.log('上传图片成功')
    },
    uploadError (response, file, fileList) {
      this.$message.error('上传图片失败！')
    }
  }
}
</script>

