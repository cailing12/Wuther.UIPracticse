<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in tagNavList"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path}"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>

  </div>
</template>

<script>
import ScrollPane from './ScrollBar'

export default {
  components: { ScrollPane },
  data() {
    return {
      defaultPage: '/home'
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.tagNav.openedPageList
    }
  },
  watch: {
    $route() {
      this.addTagNav()
      this.scrollToCurTag()
    }
  },
  mounted() {
    // 首次加载时将默认页面加入缓存
    this.addTagNav()
  },
  methods: {
    addTagNav() {
      // 如果需要缓存则必须使用组件自身的name，而不是router的name
      this.$store.commit('tagNav/addTagNav', {
        name: this.$router.getMatchedComponents()[1].name,
        path: this.$route.path,
        title: this.$router.getMatchedComponents()[1].name
      })
    },
    isActive(item) {
      return item.path === this.$route.path
    },
    scrollToCurTag() {
      this.$nextTick(() => {
        for (const item of this.$refs.tag) {
          if (item.to === this.$route.path) {
            this.$refs.scrollBar.scrollToCurTag(item.$el)
            break
          }
        }
      })
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    closeSelectedTag(view) {
      this.$store.commit('tagNav/removeTagNav', view)
      if (this.$route.path === view.path) {
        var index = this.tagNavList.length - 1
        if (index > 0) {
          this.$router.push(this.tagNavList[this.tagNavList.length - 1].path)
        } else {
          this.$router.push(this.defaultPage)
          if (this.$route.path === '/home') {
            this.addTagNav()
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
