<template>
  <div class="pages">
    <top-area />
    <div :class="classObj" class="app-wrapper">
      <div
        v-if="device === 'mobile' && sidebar.opened"
        class="drawer-bg"
        @click="handleClickOutside"
      />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{ 'fixed-header': fixedHeader }">
          <navbar />
        </div>
        <!-- <tags-view /> -->
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, TopArea, TagsView, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TopArea,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.pages{
  position: relative;
  width: 100%;
  height: 100vh;
}

.app-wrapper {
  @include clearfix;

  // height: calc(100% - 50px);
  height: 100%;
  overflow-y: hidden;
  position: fixed;
  width: 100%; // upd by sssh
  /* margin-top: 50px; */

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

}

.drawer-bg {
  position: relative;
  height: calc(100%);
  width: 100%;
  /* margin-top: 50px; */
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  /* height: 100%; */
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.sidebar-container {
  position: relative;
  height: calc(100% - 50px);
  width: 100%;
  margin-top: 50px;
}
</style>
