<template>
  <div class="wrapper">
    <el-header style="text-align: left; font-size: 18px">
      <template>
        <span>Wuther</span>
        <el-button type="primary" icon="el-icon-menu" @click="hideMenu"/>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            caicai<i class="el-icon-arrow-down el-icon--right"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div>
              <el-dropdown-item><i class="el-icon-setting"/>修改密码</el-dropdown-item>
            </div>
            <div @click="exitSystem">
              <el-dropdown-item><i class="el-icon-warning"/>退出系统</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-header>
    <el-container style="height:100%;width:100%">
      <template>
        <el-menu
          :collapse="isCollapse"
          :unique-opened="true"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="el-menu-vertical">
          <template v-for="(item) in menuList">
            <el-submenu v-if="item.isContent" :index="String(item.id)" :key="item.id">
              <template slot="title">
                <i class="el-icon-menu"/>
                <span slot="title">{{ item.name }}</span>
              </template>
              <treemenu :menulist="item.list"/>
            </el-submenu>
            <el-menu-item v-else :index="String(item.id)" :key="item.id" :route="item.url">
              <template slot="title">
                <i :class="item.icon"/>
                <span slot="title">{{ item.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </template>
      <div class="rightPanel">
        <el-row class="tagNavBar">
          <tag-nav/>
        </el-row>
        <el-row>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </el-row>
      </div>
    </el-container>
  </div>
</template>

<script>
import treemenu from './components/tree-menu'
import Auth from '@/utils/auth'
import TagNav from './components/TagsView'
export default {
  name: 'Layout',
  components: {
    treemenu,
    TagNav
  },
  data() {
    return {
      isCollapse: false,
      name: 'Vue.js',
      tabIndex: 2,
      menuList: []
    }
  },
  beforeCreate() {
    this.$axios({
      url: 'api/menus',
      method: 'get'
    }).then(res => {
      if (res.code === 200) {
        this.menuList = res.data
        console.log(res.data)
      }
    }).catch(err => {
      console.warn(`获取数据失败。${err}`)
    })
  },
  methods: {
    hideMenu() {
      this.isCollapse = !this.isCollapse
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    exitSystem() {
      Auth.removeLoginStatus()
      this.$router.push({ path: '/login', query: {}})
    }
  }

}
</script>
<style>
        .el-header {
            background-color: #409EFF;
            color: #333;
            height: 50px !important;
            line-height: 50px;
        }

        .el-menu-vertical:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }

        .el-tabs__content, .el-tab-pane {
            width: 100%;
            height: 100%;
        }

        .el-dropdown-link {
            margin-left: 20px;
            color: #FFFFFF;
        }

        #app {
            width: 100%;
            height: 100%;
        }

        html {
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            line-height: 1.15;
            box-sizing: inherit;
        }

        body {
            height: 92%;
            width: 100%;
            margin: 0px;
            padding: 0px;
            line-height: 12px;
            font: 12px Helvetica Neue,Helvetica,PingFang SC,\5FAE\8F6F\96C5\9ED1,Tahoma,Arial,sans-serif;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            min-width: 320px;
        }
        .wrapper{
          width: 100%;
          height: 100%;
        }
        .rightPanel{
          width: 100%
        }
        .tagNavBar{
          text-align: left
        }
    </style>
