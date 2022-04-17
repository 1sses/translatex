<template>
  <el-collapse>
    <el-collapse-item
      v-for="(message, index) in messages"
      :key="index"
    >
      <template #title>
        <h3>
          <span :style="{color: message.type.color}">{{message.type.text}}</span>
          in line <span style="font-size: 20px">{{message.line}}</span>
        </h3>
      </template>
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
