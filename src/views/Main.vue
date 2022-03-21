<template>
  <el-container>
    <el-button
      class="load-button"
      circle
      size="large"
      type="info"
      @click="dialog = true"
    >
      <el-icon :size="20">
        <files/>
      </el-icon>
    </el-button>
    <TranslatableFilesDialog v-model="dialog" />
    <el-col>
      <h3><span style="color: red">Manual</span> translation mode</h3>
      <h3 v-if="false"><span style="color: green">Automatic</span> translation mode</h3>
      <h4>English line:</h4>
      <el-input class="line-field" v-model="enLine" size="large">
        <template #prepend>{{enLine.length}}</template>
      </el-input>
      <h4>Russian line:</h4>
      <el-input class="line-field" v-model="ruLine" size="large">
        <template #prepend>{{ruLine.length}}</template>
      </el-input>
      <h3>In result:</h3>
      <el-input class="line-field" v-model="resultLine" size="large">
        <template #prepend>{{resultLine.length}}</template>
      </el-input>
      <el-row class="controls">
        <el-button size="large">Confirm line</el-button>
        <el-button-group size="large">
          <el-button :icon="ArrowLeft" :disabled="false" />
          <el-button :icon="ArrowRight" :disabled="false" />
        </el-button-group>
      </el-row>
      <el-row class="table">
        <el-table :data="tableData">
          <el-table-column prop="line" label="Number" width="100" />
          <el-table-column prop="text" label="Text" />
        </el-table>
      </el-row>
    </el-col>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { Files, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import TranslatableFilesDialog from '@/components/TranslatableFilesDialog'

const tableData = [
  { line: 1, text: 'Hello' },
  { line: 2, text: 'World this is my harboro jhsdf ksjdksj hbdfjs bfkjs dfbsdbjs ckjhlasjkas kjhs hk sbsd bd bksb ds dkjbks ds adhfhsdfh' },
  { line: 33, text: 'dhcsjkdh kjh kjldhgjkd fhgjksdfh kjhsdfjk ghkjdhgdhsfhds hd sjkdhf kjdh k kjjk sjkdfhjdskfhkjasd hkasdhfk j sdhhasd hksd s sdfsk jfhsjkdhf kjsdhfkh asdkjfh jkhsdafjkhjkasdh kfjhasd kjfhsdkahfkj hdfhasdhfh kjsdhf kjhfh hfk hsdkf hkjsdhfkjlasdhfjkh kjsdafjkh kjsdhkfhjkasdhf sdjkfhskjhfkjasdhf kjsdhfka' }
]

const dialog = ref(false)
const enLine = ref('')
const ruLine = ref('')
const resultLine = ref('')
</script>

<style scoped>
.load-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

.line-field {
  font-size: 18px;
}

.controls {
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin-top: 40px;
}

.table {
  margin-top: 40px;
}
</style>
