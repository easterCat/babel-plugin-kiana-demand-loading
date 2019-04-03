/**
 * Created by easterCat on 2019/4/3.
 */

const babel = require('babel-core');
const types = require('babel-types');

const array_types = ["flatten"];

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
                        if (array_types.includes(`${specifier.local.name}`)) {
                            //node.source.value => kiana-js
                            //specifier.local.name => flatten
                            //path => kiana-js/kiana/arrays/flatten
                            return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/kiana/arrays/${specifier.local.name}`))
                        }
                        return types.importDeclaration([types.importDefaultSpecifier(specifier.local)], types.stringLiteral(`${node.source.value}/kiana/${specifier.local.name}`))
                    });
                    path.replaceWithMultiple(newImports)
                }
            }
        }
    }
};
