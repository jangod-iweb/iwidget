<template>
  <div class="ib-btn">
    <el-button @click="onClick">{{btnText}}</el-button>
  </div>
</template>

<script>
const config = {
  title: '按钮',
  fields: [
    {
      name: 'desc',
      type: 'props-rich-editor',
      title: '描述信息',
      value: '',
    },
    {
      name: 'btnText',
      type: 'props-default-val',
      title: '按钮文字',
    },
    {
      type: 'props-check-list',
      list: [
        {
          label: '可见',
          name: 'show',
          value: true,
        },
        {
          label: '可编辑',
          name: 'edit',
          value: true,
        },
      ],
      desc: '启用流程后，字段权限以流程节点的设置为准',
      title: '字段权限',
    },
    {
      name: 'dataType',
      type: 'props-select',
      list: [{ label: 'String', value: 'string' }],
      title: '字段类型',
      value: 'string',
      disabled: true
    }
  ]
}
export default {
  name: "index",
  components: {},
  data() {
    return {
      btnText:"我是按钮"
    }
  },
  props:{
    //当前组件属性数据
    widgetData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    //基础数据
    baseData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // 是否預覽模式,預覽模式不允許拖拽
    showonly: {
      default: false,
      type: Boolean,
    },
    isCallApi: {
      default: true,
      type: Boolean,
    },
    // 預覽方式
    showtype: {
      default: 'pc',
      type: String,
    }
  },
  watch: {

  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onClick(){

    },
    //获取组件字段属性配置
    getConfig() {
      return config
    }
  }
}
</script>

<style lang="less" scoped>
</style>