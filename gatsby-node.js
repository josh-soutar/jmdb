const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    console.log("Page - ", page.path);
    createPage({
        path: "/title",
        matchPath: "/title/*",
        component: path.resolve(`src/templates/title.js`)
    })
}