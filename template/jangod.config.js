const path = require('path');
module.exports = {
    /**
     * build command
     * prefix       可以指定特定的前缀，防止注册的组件名称发生冲突
     * entry        指定需要发布的组件路径(.vue)
     *     示例：    entry:[{path:()=>import("./src/widget/index.vue"),name:"Test"}]
     *     path     文件路径
     *     name     默认使用文件名作为组件名,可设置name自定义组件名
     * output       指定放置编译后文件(.js)的目录
     * generateZip  打包完成是否生成zip包(默认生成,可自定义包名)[Boolean,string]
     * alias        如果组件中使用了alias，需要在此处指定
     */
    build:{
        prefix: 'My',
        entry: [
            {path: ()=>import("./demo/index.vue"),name:"Demo"}
        ],
        output: 'dist/widget',
        alias: {}
    },
    /**
     * Inject components through configuration files
     * 本地开发依赖组件可使用 cnpm link 方式调试(https://www.npmjs.cn/cli/link/)
     * 在依赖包中的jangod.config.js配置build.entry即可将配置的组件注册到当前项目
     * 例如：将@jangod/iweb-ui依赖下的组件注入到该项目(在@jangod/iweb-ui根目录创建jangod.config.js文件)
     * injection:[()=>import("@jangod/iweb-ui/jangod.config.js")]
     */
    injection:[],
    /**
     * publish command
     * server       服务器地址
     * type         资源类型 <cdn--资源/package--应用>
     * resources    上传资源(array)
     *       示例：  resources:[{path:"target/jquery.js",code:"jquery"}]
     *       path   资源路径
     *       code   资源标识
     * data         上传时附带的额外参数
     */
    publish:{
        server: "http://203.175.139.40:9250/om",
        type: "cdn",
        resources: [
            {path:"dist/widget/widget.zip",code:"remote-widget"}
        ],
        data: {}
    }
};