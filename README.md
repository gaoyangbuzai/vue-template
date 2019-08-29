vue_template模板
模板目录结构
├── public  #打包所需静态资源
├── src
    ├── api  #axios请求接口封装
    └── assets  #项目静态资源
        ├── fonts  #iconfont字体图标文件
        ├── image  #图片资源，按模块分文件夹储存
        └── scss #sass文件
           ├── helpers 
           ├── _functions.scss #自定义sass函数
           ├── _mixins.scss #自定义混合宏
           └── _variables #sass变量，例如主题色、通用字体颜色..
           ├── pages #文件夹将包含一些特殊页面的CSS
           ├── _reset.scss #重置页面样式及第三方组件样式
           ├── components #页面中公共样式
               ├── _button.scss #列如
           ├── _layouts.scss #页面布局样式
           └── main.scss #一个文件导入所有规则,通过@import将所有子文件导入进来
    ├── components  #全局组件
    ├── directive  #自定义指令
    ├── utils  #封装工具函数,全局公共函数，请求拦截等
    ├── router  #路由配置
          ├── module #多人协同公开发可以切分出每个人的模块出来，把自己的模块路由文件放此文件中
    	   └── router-z.js #文件命名由router+名字字母缩写
          └── index.js  #导入所有module下所有模块
    ├── store  #Vuex配置
       ├── actions.js #根级别的 action
       ├── mutation.js #根级别的 mutation
       ├── modules.js 
           ├── user.js #用户模块
       └── index.js 我们组装模块并导出store的地方
    ├── view  #页面文件
    ├── app.vue  #入口页面
    ├── main.js  #入口文件，加载组件、初始化等
    └── tests  #测试相关
 ├── .env.producion #打包到producion 环境配置
 ├── .env.review #打包到review环境配置
 ├── .env.staging #打包到staging环境配置
 ├── .gitignore #配置不提交git仓库的相关文件
 ├── .postcss.config.js #postcss相关配置（移动端适配视窗单位转换）
 ├── .babel.config.js 
 └── vue.config.js 
关于移动端适配方案
此模板默认做了移动端的适配，使用方案为vw来达到适配，vw单位目前兼容安卓4.4以上和ios8以上 此处输入图片的描述

使用方法
//你的样式文件直接写px 按照设计图给的尺寸来写 例如设计图中给出盒子的width为100px
.box{
  width:100px
}
//编译后的
.box{
  width:13.333vw
}
vw单位不适用于pc端，所以如果使用该模板开发pc网站的话只需把postcss.config.js下注释掉即可 vw适配方案资料

 module.exports = {
   "plugins": {
     // "postcss-import": {},
     // "postcss-url": {},
     // "postcss-aspect-ratio-mini": {},
     // "postcss-write-svg": {
     //   utf8: false
     // },
     // "postcss-cssnext": {},
     // "postcss-px-to-viewport": {
     //   viewportWidth: 750,     //视窗的宽度，对应的是我们设计稿的宽度，一般是750.
     //   viewportHeight: 1334,    // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置。
     //   unitPrecision: 3,       // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）.
     //   viewportUnit: 'vw',     // 指定需要转换成的视窗单位，建议使用vw.
     //   selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名。
     //   minPixelValue: 1,       // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值。
     //   mediaQuery: false       // 允许在媒体查询中转换`px`
     // },
     // "postcss-viewport-units":{},
     // "cssnano": {
     //   preset: "advanced",
     //   autoprefixer: false,
     //   "postcss-zindex": false
     // },
   }
 }
Getting started
     # clone the project
     git clone http://192.168.40.3:8099/shuangln/vue_template.git
     
     # enter the project directory
     cd vue_template
     
     # install dependency
     npm install
     
     # develop
     npm run serve
