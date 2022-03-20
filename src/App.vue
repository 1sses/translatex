<template>
  <el-main>
    <Header />
    <el-divider />
    <router-view />
  </el-main>
</template>

<script>

import Header from '@/components/Header'

export default {
  name: 'App',
  components: { Header }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
body {
  font-family: 'Inter', sans-serif;
}
</style>
