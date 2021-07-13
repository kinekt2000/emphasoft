const path = require("path");


const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            "@root": resolvePath("./src"),
            "@components": resolvePath("./src/components"),
            "@modules": resolvePath("./src/modules"),
            "@hooks": resolvePath("./src/hooks")
        }
    }
}