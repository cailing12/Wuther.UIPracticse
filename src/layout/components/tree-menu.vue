<template>
  <div class="menu-tree">
    <div v-for="item in menulist" :key="item.ID">
      <el-submenu v-if="item.IsContent" :key="item.ID" index="item.ID">
        <template slot="title">
          <i class="el-icon-location"/>
          <span slot="title">{{ item.Name }}</span>
        </template>
        <treemenu menulist="menu.List" @@addmenutab="addTab"/>
      </el-submenu>
      <el-menu-item v-else :index="item.ID" :key="item.ID" :route="item.Url">
        {{ item.Name }}
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
  },
  methods: {
    addMenuTab: function(url, name) {
      this.$emit('addmenutab', url, name)
    },
    addTab: function(url, name) {
      this.$emit('addmenutab', url, name)
    }
  }
}
</script>
