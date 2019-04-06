/**
 * Created by easterCat on 2019/4/3.
 */

const babel = require("babel-core");
const types = require("babel-types");
const array_types = require("./types/arrayTypes");
const cookie_types = require("./types/cookieTypes");
const local_types = require("./types/localTypes");
const session_types = require("./types/sessionTypes");
const util_types = require("./types/utilTypes");

module.exports = function (babel) {
  return {
    visitor: {
      ImportDeclaration(path, ref = {opts: {}}) {
        let node = path.node;
        let {specifiers} = node;
        if (ref.opts.library === node.source.value
          && !types.isImportDefaultSpecifier(specifiers[0])
          && !types.isImportNamespaceSpecifier(specifiers[0])) {
          let newImports = specifiers.map(specifier => {

            //数组的引用
            if (array_types.includes(`${specifier.local.name}`)) {
              //node.source.value => kiana-js
              //specifier.local.name => flatten
              //path => kiana-js/arrays/flatten
              return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/kiana/arrays/${specifier.local.name}`))
            }

            //cookie的引用
            if (cookie_types.includes(`${specifier.local.name}`)) {
              return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/kiana/cookie/${specifier.local.name}`))
            }


            //localStorage的引用
            if (local_types.includes(`${specifier.local.name}`)) {
              return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/kiana/localStorage/${specifier.local.name}`))
            }

            //sessionStorage的引用
            if (session_types.includes(`${specifier.local.name}`)) {
              return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/kiana/sessionStorage/${specifier.local.name}`))
            }


            //util的引用
            if (util_types.includes(`${specifier.local.name}`)) {
              return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/kiana/utils/${specifier.local.name}`))
            }

            return types.importDeclaration([types.importDefaultSpecifier(specifier.local)], types.stringLiteral(`${node.source.value}/kiana/${specifier.local.name}`))
          });
          path.replaceWithMultiple(newImports)
        }
      }
    }
  }
};
