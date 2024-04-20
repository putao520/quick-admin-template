const plugin = require('tailwindcss/plugin')

const plug = plugin(function ({ addUtilities, matchUtilities, theme }) {
    addUtilities({
        "@keyframes shake": theme("keyframes.shake"),
        '.bubble-ani-shake': {
            animationName: "shake",
            animationDuration: "1s",
            animationTimingFunction: "ease-in-out",
        },
        ".bubble-ani-infinite": {
            animationIterationCount: "infinite"
        },
    });

    //span加载动画
    addUtilities({
        "@keyframes loading1": theme("keyframes.loading1"),

        ".bubble-span-loading1-before,.bubble-span-loading1-after": {
            content: "''",
            "border-radius": "50%",
            position: "absolute",
            inset: "0",
            "box-shadow": "0 0 10px 2px rgba(0, 0, 0, 0.3) inset"
        },
        ".bubble-span-loading1-after": {
            "box-shadow": "0 2px 0 #FF3D00 inset",
            animation: "loading1 2s linear infinite"
        }
    });

    matchUtilities({
        "bubble-span-loading1": (value) => ({
            position: "relative",
            width: `${value}px`,
            height: `${value}px`,
        })
    }, { values: theme('spanAniBoxSize') })

    matchUtilities(
        {
            "bubble-ani-shake": (value) => ({
                animationName: "shake",
                animationDuration: `${value}s`,
                animationTimingFunction: "ease-in-out",
            })
        }
    )
}, {
    theme: {
        extend: {
            animation: {
                shake: "shake 2s ease-in-out infinite"
            },
            //常用的span加载动画容器大小
            spanAniBoxSize: {
                1: '100',
                2: '200',
                3: '300',
                4: '400',
            },
            keyframes: {
                shake: {
                    "0%": {
                        transformOrigin: "50% 50%",
                        transform: "scale(1)",
                    },
                    "50%": {
                        transformOrigin: "50% 50%",
                        transform: "scale(1.3)",
                    },
                    "100%": {
                        transformOrigin: "50% 50%",
                        transform: "scale(1)",
                    },
                },
                loading1: {
                    "0%": { transform: "rotate(0)" },
                    "100%": { transform: "rotate(360deg)" }
                }
            }
        }
    }
})

module.exports = plug