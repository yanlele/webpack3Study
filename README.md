## 一、基本概念
首先webpack是个最重要的概念：入口、出口、loader、插件 

要知道webpack在前端开发的作用，如果我们用纯静态页面来写我们的前端，一页页面对对应会有大量的图片，会有大量的js文件，大量的css样式文件，这些静态资源文件，当用户输入域名之后，在网络请求的时候，每一个资源都要发送一次请求，这个过程是消耗资源性能和时间的。

所以我们可以通过webpack，把所有的分散的资源都整理模块化，我们让入口进入，出口打包，打包出来的资源都是整理好的资源，打包成一个输出资源，这样在一个页面加载请求静态资源的时候，就只会一次请求，这样会大大节约请求的时间，达到提升效率的作用。

loader的作用：我们在编程中可能会使用到sass，less，se6，jsx，vue等等一些列的非浏览器可以直接解释的编程，我们传统的做法，就是通过一些编译软件，一个一个的手动编译，然后编译完成了在导入项目中。这种做法费时费力，而且很有可能出错，这个时候我们就可以用到webpack的loader了，都可以交给我们webpack处理编译的问题，只要配置好loader，在出口文件，他们就会自动编译好，放置到我们需要的位置。

plugins:的作用就是对我们webpack 不能做到的一些事情，进行的一些扩展，让它更加功能强大，健壮。