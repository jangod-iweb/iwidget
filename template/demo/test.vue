<template>
  <div class="filed-demo">
    <el-input @change="onChange" v-model="data"></el-input>
  </div>
</template>

<script>
export default {
  name: "test",
  components: {},
  data() {
    return {
      data:""
    }
  },
  props:{
    //字段属性配置数据
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    //组件数据
    widgetData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    // console.log(this.options.demo);//输出结果：456
    // console.log(this.options.value);//输出结果：张三
    this.data = this.widgetData.options[this.options.name]||this.options.value||""
  },
  methods: {
    //修改组件数据
    onChange(val){
      let data = this.widgetData
      let type = this.options.dataType || 'options'
      this.$set(data[type], this.options.name, (val && val) || '')
      this.$emit('update:widgetData', data)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
