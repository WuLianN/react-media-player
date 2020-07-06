const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/Netease', createProxyMiddleware({
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/Netease": ""
        }
    }))

    app.use('/itooi', createProxyMiddleware({
        target: "https://api.itooi.cn",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/itooi": ""
        }
    }))
}