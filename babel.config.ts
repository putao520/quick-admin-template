import {type BabelConfig} from "ts-jest";

const babelConfig: BabelConfig = {
    presets: [
        [
        "@babel/preset-env",
        {
            targets: {
            node: "current",
            },
        },
        ],
        "@babel/preset-typescript",
    ],
};

export default babelConfig;
