# 远程组件库

## 一、远程组件上传及使用说明
### 1、安装依赖
**1.安装node最新环境**

**2.安装cnpm `npm install -g cnpm`**

**3.切换到私有仓库`cnpm config set registry http://117.73.3.108:7001/`**

**3.安装@jangod/iweb-cli-service `cnpm install @jangod/iweb-cli-service -g`**

###2、远程组件打包上传
```
   首先在package.json文件中设置
   script:{
      export: "iweb-cli-service build",
      publish:"iweb-cli-service publish"
   }
   注意: 执行script中命令时控制台提示：
            是否创建配置文件:(yes/no/fileName) > y
            请输入(y/yes)回车，生成jangod.config.js配置文件
            
   ***组件打包***
   1. 打开生成的jangod.config.js配置文件(build为打包配置)
   2. 按照配置文件中的说明进行组件打包配置
   3. 执行 npm run export
      
   ***组件上传***
   1. 打开生成的jangod.config.js配置文件(publish为上传配置)
   2. 按照配置文件中的说明进行组件上传配置(资源类型<cdn>)
   3. 执行 npm run publish
   温馨提示： resources上传资源有多个时，执行命令控制台会有操作提示，按提示完成上传操作
            (多个资源上传时，支持自选上传资源)
            
   配置文件：
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
        * config       自定义配置合并vue.condig.js配置
        */
       build:{
           prefix: 'My',
           entry: [],
           output: 'dist/widget',
           alias: {},
           config: {}
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
        *       示例：  resources:[{path:"./target/jquery.js",code:"jquery"}]
        *       path   资源路径
        *       code   资源标识
        * data         上传时附带的额外参数
        */
       publish:{
           server: "",
           type: "cdn",
           resources: [],
           data: {}
       }
   };
```
###3、远程组件使用
**1.安装@jangod/iweb-ui `cnpm install @jangod/iweb-ui --save`**

**2.在main.js中进行全局注册**

```
import IWebUI from '@jangod/iweb-ui';
Vue.use(IWebUI);
IWebUI.setCdnServer({assets:"http://203.175.139.40/cdn"});
```
**3.页面中使用远程组件**
```
    w-name      <string> 组件名称(非必须,建议设置节约资源加载)
    w-src       <string> 远程组件资源地址
    w-loading   <string,boolean> 组件加载中提示(可自定义提示内容)[默认无加载提示]
    w-server    <object> assets(资源地址) api(接口请求地址，需要与JANGOD_WIDGET_PARAMS结合使用)
    w-success   <function> 组件加载完成触发事件(返回当前注册组件名称)
    <iu-widget w-name="Temp" @w-success="loadSuccess" w-src="/widget/Temp.js"></iu-widget>
    
    未使用@jangod/iweb-saas框架
        在router路由文件中添加以下内容：(导入@jangod/iweb-ui，添加路由地址)
        import IWebUI from '@jangod/iweb-ui';
        {
            path: '/jangod-widget-middleware',
            component: IWebUI.WidgetMiddleware
        }
```

## iweb-cli-service服务使用到的全局变量记录
```
1、JANGOD_SDK_CONTEXT            当前项目路径
2、JANGOD_SDK_CONFIG             配置文件路径
3、JANGOD_WIDGET_CONTEXT         组件静态资源虚拟路径
4、JANGOD_WIDGET_JSONP           组件加载回调函数
5、JANGOD_WIDGET_CALLBACK        组件注册回调函数
6、JANGOD_WIDGET_MAP             组件已注册记录对象
7、JANGOD_WIDGET_CALLBACK_ALL    同一组件异步注册回调
```
