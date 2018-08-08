module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaFeatures": {
        "generators": true,
        "experimentalObjectRestSpread": true
      },
      "sourceType": "module",
      "allowImportExportEverywhere": false
    },
    "extends": [
      "eslint:recommended",
      "plugin:css-modules/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:jest/recommended",
      "plugin:promise/recommended",
      "plugin:react/recommended",
      "plugin:react-ssr/all",
      "plugin:redux-saga/recommended",
      "plugin:security/recommended"
    ],
    "plugins": [
      "compat",
      "css-modules",
      "jest",
      "prettier",
      "promise",
      "react",
      "react-ssr",
      "redux-saga",
      "security"
    ],
    "settings": {
      "import/resolver": {
        "node": {
          "extensions": [
            ".js",
            ".jsx",
            ".json",
            ".css"
          ],
          "paths": "./src"
        }
      },
      "polyfills": [
        "fetch",
        "promises"
      ]
    },
    "env": {
      "browser": true,
      "jest/globals": true
    },
    "globals": {
      "Map": true,
      "__DEV__": true,
      "__dirname": true,
      "after": true,
      "afterAll": true,
      "afterEach": true,
      "artifacts": true,
      "before": true,
      "beforeAll": true,
      "beforeEach": true,
      "chai": true,
      "console": true,
      "cy": true,
      "Cypress": true,
      "describe": true,
      "document": true,
      "expect": true,
      "fetch": true,
      "global": true,
      "Intl": true,
      "it": true,
      "jest": true,
      "module": true,
      "process": true,
      "Promise": true,
      "require": true,
      "setTimeout": true,
      "test": true,
      "window": true,
      "web3": true,
      "xdescribe": true,
      "xit": true,
    },
    "rules": {
      "css-modules/no-unused-class": [
        2,
        {
          "camelCase": true
        }
      ],
      "css-modules/no-undef-class": [
        2,
        {
          "camelCase": true
        }
      ],
      "compat/compat": "error",
      "import/first": "error",
      "import/no-anonymous-default-export": "error",
      "import/no-unassigned-import": "error",
      "import/prefer-default-export": "error",
      "import/no-named-as-default": "off",
      "import/no-unresolved": [
        "error",
        {
          "ignore": [
            "^brickblock-platform-types$",
            "^ethereum-types$"
          ]
        }
      ],
      "prettier/prettier": [
        "error",
        {
          "semi": false,
          "singleQuote": true,
          "trailingComma": "none"
        }
      ],
      "promise/avoid-new": "off",
      "react/jsx-boolean-value": "error",
      "react/jsx-closing-bracket-location": "error",
      "react/jsx-closing-tag-location": "error",
      "react/jsx-curly-spacing": "error",
      "react/jsx-equals-spacing": "error",
      "react/jsx-first-prop-new-line": "error",
      "react/jsx-handler-names": "off",
      "react/jsx-no-bind": [
        "error",
        {
          "ignoreRefs": true
        }
      ],
      "react/jsx-no-literals": "off",
      "react/jsx-pascal-case": "error",
      "react/jsx-wrap-multilines": "error",
      "react/no-array-index-key": "error",
      "react/no-danger": "error",
      "react/no-did-mount-set-state": "error",
      "react/no-did-update-set-state": "error",
      "react/no-multi-comp": "error",
      "react/no-redundant-should-component-update": "error",
      "react/no-typos": "error",
      "react/no-unused-state": "error",
      "react/no-will-update-set-state": "error",
      "react/prefer-es6-class": [
        "error",
        "always"
      ],
      "react/prefer-stateless-function": "error",
      "react/prop-types": "off",
      "react/self-closing-comp": "error",
      "react/sort-comp": "error",
      "react/style-prop-object": "error",
      "react/void-dom-elements-no-children": "error",
      "security/detect-object-injection": "off",
      "arrow-body-style": "off",
      "lines-between-class-members": [
        "error",
        "always"
      ],
      "no-console": [
        "warn",
        {
          "allow": [
            "assert"
          ]
        }
      ],
      "no-shadow": "error",
      "no-var": "error",
      "padding-line-between-statements": [
        "error",
        {
          "blankLine": "always",
          "prev": "class",
          "next": "*"
        },
        {
          "blankLine": "always",
          "prev": "do",
          "next": "*"
        },
        {
          "blankLine": "always",
          "prev": "*",
          "next": "export"
        },
        {
          "blankLine": "always",
          "prev": "for",
          "next": "*"
        },
        {
          "blankLine": "always",
          "prev": "if",
          "next": "*"
        },
        {
          "blankLine": "always",
          "prev": "switch",
          "next": "*"
        },
        {
          "blankLine": "always",
          "prev": "try",
          "next": "*"
        },
        {
          "blankLine": "always",
          "prev": "while",
          "next": "*"
        },
        {
          "blankLine": "always",
          "prev": "with",
          "next": "*"
        }
      ],
      "prefer-const": "error"
    }
  }
  