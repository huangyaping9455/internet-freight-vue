<template>
  <div>
    {{this.$store.state.user.organization.id}}
    <Echart/>
  </div>

</template>

<script>
import Echart from '../demo/echarts'
export default {
  components: {
    Echart
  }

}
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
</style>
