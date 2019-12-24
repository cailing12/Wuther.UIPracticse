<template>
  <div class="menu-tree">
    <div v-for="item in menulist" :key="item.id">
      <el-submenu v-if="item.IsContent" :key="item.id" :index="String(item.id)">
        <template slot="title">
          <i class="el-icon-location"/>
          <span slot="title">{{ item.name }}</span>
        </template>
        <treemenu menulist="menu.list"/>
      </el-submenu>
      <el-menu-item v-else :index="String(item.id)" :key="item.id" :route="item.url">
        {{ item.name }}
      </el-menu-item>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    menulist: {
      type: Array,
      default: function name() {
        return []
      }
    }
  }
}
</script>
