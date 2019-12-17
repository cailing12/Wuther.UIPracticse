<template>
  <div>
    组
    <a @click="back">返回上一页</a>
  </div>
</template>

<script>
export default {
  name: 'Group',
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
