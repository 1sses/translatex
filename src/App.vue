<template>
  <el-main>
    <Header />
    <el-divider />
    <router-view />
  </el-main>
</template>

<script setup>
import Header from '@/components/Header'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
body {
  font-family: 'Inter', sans-serif;
}

h2, h3, h4 {
  font-weight: 300;
}

h1 {
  font-weight: 500;
}
</style>
