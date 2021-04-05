const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("E:\\React repos\\jmdb\\.cache\\dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("E:\\React repos\\jmdb\\src\\pages\\404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("E:\\React repos\\jmdb\\src\\pages\\index.js"))),
  "component---src-pages-person-js": hot(preferDefault(require("E:\\React repos\\jmdb\\src\\pages\\person.js"))),
  "component---src-pages-placeholder-js": hot(preferDefault(require("E:\\React repos\\jmdb\\src\\pages\\placeholder.js"))),
  "component---src-pages-search-js": hot(preferDefault(require("E:\\React repos\\jmdb\\src\\pages\\search.js"))),
  "component---src-pages-title-js": hot(preferDefault(require("E:\\React repos\\jmdb\\src\\pages\\title.js")))
}

