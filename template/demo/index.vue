<template>
  <div class="ib-input">
    <div v-if="viewMode">{{data}}</div>
    <el-input v-else @input="input" :disabled="disabled" v-model="data"></el-input>
  </div>
</template>

<script>
//表单设计右侧字段属性配置
const config = {
  title: '表单远程组件示例',
  fields: [
    {
      name: 'title',
      type: 'props-text',
      title: '标题',
      value: '单行文本',
    },
    {
      name: 'keyCode',
      type: 'props-text',
      title: '组件编码',
      value: ''
    },
    {
      name: 'test',
      type: ()=>import("./test.vue"),
      title: '自定义字段属性组件示例',
      value: '123',
    },
    {
      name: 'desc',
      type: 'props-rich-editor',
      title: '描述信息',
      value: '',
    },
    {
      name: 'defaultVal',
      type: 'props-default-val',
      title: '默认值',
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
      name: 'length',
      type: 'props-number',
      title: '输入文字长度',
      min: 0,
      max: 4000,
      value: 200,
    },
    {
      name: 'dataType',
      type: 'props-select',
      list: [{ label: 'String', value: 'string' }],
      title: '字段类型',
      value: 'string',
      disabled: true,
    }
  ]
}
export default {
  name: "demo",
  components: {},
  data() {
    return {
      data:""
    }
  },
  props:{
    //当前组件数据
    widgetData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    //是否預覽模式
    showonly: {
      default: false,
      type: Boolean,
    },
    //是否调用api
    isCallApi: {
      default: true,
      type: Boolean,
    },
    //預覽方式(pc/phone)
    showtype: {
      default: 'pc',
      type: String,
    },
    // 表单基础属性数据
    baseData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {

  },
  computed: {
    //组件是否禁用状态
    disabled: {
      get () {
        if (!this.showonly) {
          return true
        } else {
          return !this.widgetData.options.edit
        }
      }
    },
    // 是否为查看模式
    viewMode(){
      return !this.baseData.edit && this.showonly
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    //组件加载初始化赋值
    init(){
      let widgetOption = this.widgetData.options;
      if(widgetOption){
        let value = widgetOption.keyValue||widgetOption.defaultVal||"";
        this.data = value
        this.$set(this.widgetData.options, 'keyValue', value)
      }
    },
    //修改值同步更新组件属性数据
    input(val){
      this.$set(this.widgetData.options, 'keyValue', val)
    },
    //组件数据改变时触发
    onChange(data){
      /**
       * 当设置值方式setValueType为数据联动(dataLinkage)、公式计算(formula)时更新输入框值
       * 外部设置组件值类型（setValueType）
       * dataLinkage 数据联动
       * formula     公式计算
       */
      let options = data.options;
      if(options.setValueType=="dataLinkage"||options.setValueType=="formula"){
        this.data = options.keyValue;
        this.$set(this.widgetData.options,"setValueType", "");//重置
      }
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
