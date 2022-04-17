<template>
  <el-collapse>
    <el-collapse-item
      v-for="message in messages"
      :key="message.line"
    >
      <template #title>
        <h3>
          <span :style="{color: message.type.color}">{{message.type.text}}</span>
          in line <span style="font-size: 20px">{{message.line}}</span>
        </h3>
      </template>
      <p>1 => {{message.file1Line}}</p>
      <p>2 => {{message.file2Line}}</p>
      <h4>{{message.helper}}</h4>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  messages: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>

</style>
