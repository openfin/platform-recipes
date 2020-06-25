module.exports = {
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint'
    ],
    rules: {
        'import/extensions': 0
    },
    parserOptions: {
        project: './tsconfig.json'
    },
    globals: {
        fin: true
    },
    root: true
};
