<template>
  <div>
    角色
    <a @click="back">返回上一页</a>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
