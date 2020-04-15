// const {injectBabelPlugin} = require('react-app-rewired');
// module.exports = function override(config, env) {
//   config = injectBabelPlugin(['import', {libraryName: 'antd-mobile', style: 'css'}], config);
//   return config;
// }
/*config-overrides.js*/
const { override, addLessLoader, fixBabelImports } = require('customize-cra');
module.exports = override(
  addLessLoader({
    // strictMath: true,
    // noIeCompat: true,
    javascriptEnabled: true,
    modifyVars: {
      "@brand-primary": "#1cae82",
      "@brand-primary-tap": "#1DA57A"
    }
  }),
  fixBabelImports('import', { libraryName: 'antd-mobile', libraryDirectory: 'es', style: true }),
);
