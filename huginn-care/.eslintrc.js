module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'standard',
        'plugin:react/recommended'
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.{js,cjs}'
            ],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        semi: [2, 'always'],
        indent: ['error', 4],
        'react/prop-types': 0,
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'no-unused-vars': 'off',
        'space-before-function-paren': 0,
        'eol-last': 0,
        'no-trailing-spaces': 0
    }
};
