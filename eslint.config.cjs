const globals = require('globals');

const eslint = require('@eslint/js');
const tsEslint = require('typescript-eslint');

const importPlugin = require('eslint-plugin-import');

const tsConfig = require('./tsconfig.json');

const config = tsEslint.config(
    // Default rules
    eslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    ...tsEslint.configs.recommendedTypeChecked,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
        settings: {
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },
    },
    {
        ignores: tsConfig.exclude,
    },
    {
        rules: {
            'no-console': 'warn',
            curly: 'warn',
            'prefer-template': 'warn',
            'no-useless-concat': 'warn',
            '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
            '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            '@typescript-eslint/dot-notation': ['error', { allowPrivateClassPropertyAccess: true }],
            '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
            '@typescript-eslint/consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
            'import/no-cycle': 'warn',
        },
    },
    // Rules for JavaScript files
    {
        files: ['**/*.js', '**/*.cjs'],
        ...tsEslint.configs.disableTypeChecked,
        rules: {
            ...tsEslint.configs.disableTypeChecked.rules,
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    // Rules for test files
    {
        files: ['**/*.test.ts', '**/*.test.tsx'],
        rules: {
            '@typescript-eslint/unbound-method': 'off',
        },
    },
);

module.exports = config;
