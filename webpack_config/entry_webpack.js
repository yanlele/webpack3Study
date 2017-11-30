module.exports=function () {
    // 打包地址
    const buildPath = path.resolve(__dirname, './dist');
// 模板地址
    const templateRoot = path.resolve(__dirname, './src');
// NODEJS FS 删除文件
    let emptyDir = function (fileUrl) {
        let files = fs.readdirSync(fileUrl); //读取该文件夹
        files.forEach(function (file) {
            let stats = fs.statSync(fileUrl + '/' + file);
            if (stats.isDirectory()) {
                emptyDir(fileUrl + '/' + file);
            } else {
                fs.unlinkSync(fileUrl + '/' + file);
                console.log("删除文件 " + fileUrl + ' ````' + file + "```` 成功");
            }
        });
    };

    const entry={};
// 页面入口
    const pageEntry = {};
// 页面模板
    const pageHtml = [];
// 导航JSON
    const navigation = {
        "navList": []
    };
// 检查是否有打包目录
    !fs.existsSync(buildPath) && fs.mkdirSync(buildPath);
// 读取文件目录
    const pages = fs.readdirSync(templateRoot)
    pages.forEach((name, index) => {
        // 页面入口配置
        const enterPath = path.join(templateRoot, name)
        pageEntry[name] = path.join(enterPath, 'entry.js')

        // 输出页面模板
        pageHtml.push(new HtmlWebpackPlugin({
            entryName: name,
            filename: `${name}.html`,
            template: `${enterPath}/index.html`,
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['main', 'common', name]
        }))

        // 输出导航JSON
        navigation.navList.push({
            "name": name,
            "href": `/${name}.html`
        })
        fs.writeFileSync(path.resolve(__dirname, './Navigation.json'), JSON.stringify(navigation));
    })
}();