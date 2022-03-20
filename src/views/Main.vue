<template>
  <el-input placeholder="Hello" v-model="text" class="input" />
  <el-button>Hello</el-button>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style>
.input {
  width: 200px;
  margin-right: 1rem;
}
</style>
