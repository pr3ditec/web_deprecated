module.exports = {
    parser: "vue-eslint-parser",
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["vue", "prettier"],
    rules: {
        "vue/component-tags-order": [
            "error",
            {
                order: ["script", "template", "style"],
            },
        ],
        "prettier/prettier": "error",
    },
};
