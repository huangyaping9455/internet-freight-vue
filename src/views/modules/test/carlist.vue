<template>
  <div id="app">
    <el-cascader
      filterable
      clearable
      show-all-levels="false"
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>

<script>
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
  data () {
    return {
      options: regionDataPlus,
      selectedOptions: [],
      val: []
    }
  },
  methods: {
    handleChange (value) {
      console.log(value) // value值为区域码
      console.log(value[value.length - 1]) // value值为区域码
      // 用CodeToText转换成中文
      console.log(CodeToText[value[0]])
      console.log(CodeToText[value[value.length - 1]])
      this.val = [value[value.length - 1]]
      console.log(this.selectedOptions)
    }
  }
}
</script>
