const { resolve } = require("path")
module.exports = {
    // 模板初始前询问是使用ts还是js
    async beforeInit({
        print,
        fs,
        prompt,
        configs
    }) {
        const question = [
            {
                type: "list",
                name: "useWhichEsType",
                message: "whether use ts or js?",
                choices: ["typescript", "ecmascript"]
            }
        ]

        try {
            const TS_FOLDER_PATH = resolve(configs.resourcePath, "./template/ts")
            const JS_FOLDER_PATH = resolve(configs.resourcePath, "./template/js")
            const ROOT_TEMPLATE_PATH = resolve(configs.resourcePath, "./template")
            const ROOT_TEMPLATE_PATH_TEMP = resolve(configs.resourcePath, "./temp")
            let targetDir = ""

            const { useWhichEsType } = await prompt(question)
            if(useWhichEsType === "typescript") {
                targetDir = TS_FOLDER_PATH
                fs.remove(JS_FOLDER_PATH)
            }
            if(useWhichEsType === "ecmascript") {
                targetDir = JS_FOLDER_PATH
                fs.remove(TS_FOLDER_PATH)
            }
            await fs.move(targetDir, ROOT_TEMPLATE_PATH_TEMP)
            await fs.move(ROOT_TEMPLATE_PATH_TEMP, ROOT_TEMPLATE_PATH)
        } catch (error) {
            print.error(error)
        }
    },
    afterInit({
        print,
        configs
    }) {
        const { cliMessage } = configs
        print.warn(
        `
        cd ${cliMessage.name}

        npm install or yarn 安装依赖
        npm start 运行main文件，启动服务器
        npm run watch 监听src目录
        npm run watch:quiet 监听src目录，不输出日志
        npm test 运行测试
        npm run build 打包代码
        `
        )
    }
}