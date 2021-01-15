<template>
  <div
    class="site-wrapper"
    :class="{ 'site-sidebar--fold': sidebarFold }"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中">
    <template v-if="!loading">
      <main-navbar/>
      <main-sidebar/>
      <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
        <main-content v-if="!$store.state.common.contentIsNeedRefresh"/>
      </div>
    </template>
  </div>
</template>

<script>
import MainNavbar from './main-navbar'
import MainSidebar from './main-sidebar'
import MainContent from './main-content'
import {clearLoginInfo} from '@/utils'
import {getLoginUserInfo} from '@/api/api'
export default {
  provide() {
    return {
      // 刷新
      refresh() {
        this.$store.commit('common/updateContentIsNeedRefresh', true)
        this.$nextTick(() => {
          this.$store.commit('common/updateContentIsNeedRefresh', false)
        })
      }
    }
  },
  data() {
    return {
      loading: true
    }
  },
  components: {
    MainNavbar,
    MainSidebar,
    MainContent
  },
  computed: {
    documentClientHeight: {
      get() {
        return this.$store.state.common.documentClientHeight
      },
      set(val) {
        this.$store.commit('common/updateDocumentClientHeight', val)
      }
    },
    sidebarFold: {
      get() {
        return this.$store.state.common.sidebarFold
      }
    },
    userId: {
      get() {
        return this.$store.state.user.id
      },
      set(val) {
        this.$store.commit('user/updateId', val)
      }
    },
    userName: {
      get() {
        return this.$store.state.user.name
      },
      set(val) {
        this.$store.commit('user/updateName', val)
      }
    },

    organizationId:{
      get() {
        return this.$store.state.user.organizationId
      },
      set(val) {
        this.$store.commit('user/updateOrganizationId', val)
      }
    },

    organizationName:{
      get() {
        return this.$store.state.user.organizationName
      },
      set(val) {
        this.$store.commit('user/updateOrganizationName', val)
      }
    }

  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    this.resetDocumentClientHeight()
  },
  methods: {
    // 重置窗口可视高度
    resetDocumentClientHeight() {
      this.documentClientHeight = document.documentElement['clientHeight']
      window.onresize = () => {
        this.documentClientHeight = document.documentElement['clientHeight']
      }
    },
    // 获取当前管理员信息
    getUserInfo() {
     getLoginUserInfo().then(({data}) => {
        if (data && data.code === 0) {
          this.loading = false
          this.userId = data.data.id
          this.userName = data.data.name
          this.organizationId = data.data.organizationId
          this.organizationName = data.data.organizationName
        }
      })

    }
  }
}
</script>
