import { FlatCompat } from "@eslint/eslintrc";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	...compat.extends(
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
		// "plugin:nestjs-typed/recommended"
	),
	{
		plugins: {
			"@typescript-eslint": tseslintPlugin,
		},

		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},

			parser: tsParser,
			ecmaVersion: 5,
			sourceType: "module",

			parserOptions: {
				project: "tsconfig.json",
				tsconfigRootDir: "./",
			},
		},

		rules: {
			"prettier/prettier": [
				"error",
				{
					endOfLine: "auto",
					tabWidth: 2,
					semi: true,
					useTabs: true,
					singleQuote: false,
					trailingComma: "es5",
				},
			],
			"comma-dangle": 0,
			"@typescript-eslint/interface-name-prefix": 0,
			"@typescript-eslint/explicit-function-return-type": 0,
			"@typescript-eslint/explicit-module-boundary-types": 0,
			"@typescript-eslint/no-explicit-any": 2,
			"@typescript-eslint/no-var-requires": 0,
			"@typescript-eslint/no-explicit-any": 2,
			"@typescript-eslint/no-unused-vars": [
				2,
				{
					argsIgnorePattern: "^prisma|^schema|Service$|Repository$",
					ignoreRestSiblings: true,
				},
			],
		},
	},
	{
		ignores: ["node_modules", "dist", "test/**/*", "eslint.config.mjs"],
	},
];
