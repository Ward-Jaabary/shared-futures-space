/**
 * This is a minimal config.
 *
 * If you need the full config, get it from here:
 * https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
 */
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
    /**
     * Stylesheet generation mode.
     *
     * Set mode to "jit" if you want to generate your styles on-demand as you author your templates;
     * Set mode to "aot" if you want to generate the stylesheet in advance and purge later (aka legacy mode).
     */

    content: [
        /**
         * HTML. Paths to Django template files that will contain Tailwind CSS classes.
         */

        /*  Templates within theme app (<tailwind_app_name>/templates), e.g. base.html. */
        "../templates/**/*.html",

        /*
         * Main templates directory of the river (BASE_DIR/templates).
         * Adjust the following line to match your river structure.
         */
        "../../templates/**/*.html",

        /*
         * Templates in other django apps (BASE_DIR/<any_app_name>/templates).
         * Adjust the following line to match your river structure.
         */
        "../../**/templates/**/*.html",
        "../../../templates/**/*.html",

        /**
         * JS: If you use Tailwind CSS in JavaScript, uncomment the following lines and make sure
         * patterns match your river structure.
         */
        /* JS 1: Ignore any JavaScript in node_modules folder. */
        // '!../../**/node_modules',
        /* JS 2: Process all JavaScript files in the river. */
        // '../../**/*.js',

        /**
         * Python: If you use Tailwind CSS classes in Python, uncomment the following line
         * and make sure the pattern below matches your river structure.
         */
        // '../../**/*.py'
    ],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                white: {
                    DEFAULT: "#FFFFFF",
                },
                gray: {
                    lightest: "#DCDCDC",
                    light: "rgba(240, 240, 240, 1)",
                    DEFAULT: "rgba(0, 0, 0, 0.5)", //#777777
                },
                black: {
                    DEFAULT: "#000000",
                    meta: "rgba(0, 0, 0, 0.30);",
                    large: "rgba(0, 0, 0, 0.55);",
                    text: "rgba(0, 0, 0, 0.75);",
                },
                purple: {
                    DEFAULT: "#9759FF",
                },
                blue: {
                    second: "rgba(229, 241, 248, 1)",
                    pale: "#EAF3F9",
                    button: "rgba(190, 236, 223, 1)",
                    done: "rgba(147, 255, 224, 1)",
                    blur: "rgba(229, 241, 248, 0.5)",
                },
                resources: {
                    one: "#CEDFF2",
                    two: "#C4F5F8",
                    three: "#DFF5F6",
                },
                yellow: {
                    pale: "rgba(255, 252, 192, 1)",
                    DEFAULT: "rgba(255, 250, 142, 1)",
                },
                red: {
                    important: "rgba(255, 134, 134, 1)",
                },
                correct: "#228b22",
                incorrect: "#fe2712",
            },
            fontSize: {
                xxxs: ["0.5625rem", "0.75rem"],
                xxs: ["0.625rem", "0.625rem"],
                22: ["1.375rem", "1.75rem"],
            },
            spacing: {
                4.5: ["1.125em"],
                7.5: ["1.875em"],
            },
            boxShadow: {
                input: "0px 1px 1px 0px rgba(0, 0, 0, 0.15) inset",
            },
            backgroundImage: {
                "landing-enter": "linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.4)), url('/static/images/landing/landing-temporary.png'), url('/static/images/landing/landing-temporary.png')",
                "north-belfast": "url('/static/images/landing/areas/northbelfast.jpg')",
                "east-belfast": "url('/static/images/landing/areas/eastbelfast.jpg')",
                "south-belfast": "url('/static/images/landing/areas/southbelfast.jpg')",
                "west-belfast": "url('/static/images/landing/areas/westbelfast.jpg')",
                "derrylondonderry": "url('/static/images/landing/areas/derrylondonderry.jpg')",
                "donegal": "url('/static/images/landing/areas/donegal.jpg')",
                "location": "url('/static/images/dashboard/location.png')",
            },
            opacity: {
                '55': '.55',
                '75': '.75',
            }
        },
        fontFamily: {
            "kanit-400": ["Kanit_Regular", "sans-serif"],
            "kanit-500": ["Kanit_Medium", "sans-serif"],
            "kanit-600": ["Kanit_SemiBold", "sans-serif"],
            "kanit-700": ["Kanit_Bold", "sans-serif"],
            "garamond-400": ["EB_Garamond_Regular", "serif"],
            "garamond-500": ["EB_Garamond_Medium", "serif"],
        },
    },
    safelist: [
        "h-3",
        "h-4",
        "h-5",
        "h-6",
        "h-7",
        "h-8",
        "h-7.5",
        "h-9",
        "bg-purple/25",
        "bg-north-belfast",
        "bg-east-belfast",
        "bg-south-belfast",
        "bg-west-belfast",
        "bg-derrylondonderry",
        "bg-donegal",
        "bg-location",
        "w-4.5",
        "w-7.5"
    ],
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({addVariant}) {
            // Add a `third` variant, ie. `third:pb-0`
            addVariant("third-1", "&:nth-child(3n)");
            addVariant("third-2", "&:nth-child(3n+1)");
            addVariant("third-3", "&:nth-child(3n+2)");
            addVariant("borken", '&[borken="true"]');
        }),
        /**
         * '@tailwindcss/forms' is the forms plugin that provides a minimal styling
         * for forms. If you don't like it or have own styling for forms,
         * comment the line below to disable '@tailwindcss/forms'.
         */
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/aspect-ratio"),
    ],
};
