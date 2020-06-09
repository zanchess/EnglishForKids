module.exports = {
  "extends": "airbnb-base",
  "env": {
      "browser": true,
      "node": true
  },
  "rules": {
      "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false, "allowImplicit": false}],
      "import/extensions": ['error', 'always', {ignorePackages: true}],
      "no-param-reassign": [2, {"props": false}],
      "max-classes-per-file": ["error", 3],
      "class-methods-use-this": "error",
      "no-restricted-syntax": [
        "error",
        {
            "selector": "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
            "message": "setTimeout must always be invoked with two arguments."
        }
    ]
      
  }
};