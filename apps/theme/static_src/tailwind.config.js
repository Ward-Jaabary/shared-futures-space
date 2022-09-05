/**
 * This is a minimal config.
 *
 * If you need the full config, get it from here:
 * https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
 */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

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
        '../templates/**/*.html',

        /*
         * Main templates directory of the project (BASE_DIR/templates).
         * Adjust the following line to match your project structure.
         */
        '../../templates/**/*.html',

        /*
         * Templates in other django apps (BASE_DIR/<any_app_name>/templates).
         * Adjust the following line to match your project structure.
         */
        '../../**/templates/**/*.html',
        '../../../templates/**/*.html',

        /**
         * JS: If you use Tailwind CSS in JavaScript, uncomment the following lines and make sure
         * patterns match your project structure.
         */
        /* JS 1: Ignore any JavaScript in node_modules folder. */
        // '!../../**/node_modules',
        /* JS 2: Process all JavaScript files in the project. */
        // '../../**/*.js',

        /**
         * Python: If you use Tailwind CSS classes in Python, uncomment the following line
         * and make sure the pattern below matches your project structure.
         */
        // '../../**/*.py'
    ],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                white: {
                    DEFAULT: '#FFFFFF',
                },
                gray: {
                    lightest: '#DCDCDC',
                    light: '#9C9C9C',
                    DEFAULT: 'rgba(0, 0, 0, 0.5)', //#777777
                },
                black: {
                    DEFAULT: '#000000',
                },
                purple: {
                    DEFAULT: '#9759FF',
                },
                resources: {
                    one: '#CEDFF2',
                    two: '#C4F5F8',
                    three: '#DFF5F6',
                },
                correct: '#228b22',
                incorrect:'#fe2712',
            },
            fontSize: {
                'xxs': ['0.625em', '0.625em']
            },
            spacing: {
                '4.5': ['1.125em']
            },
        },
        fontFamily: {
            'head': ['Kanit_SemiBold', 'sans-serif'],
            'button': ['Kanit_Bold', 'sans-serif'],
            'body': ['EB_Garamond_Regular', 'serif']
        },

    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addVariant }) {
            // Add a `third` variant, ie. `third:pb-0`
            addVariant('third-1', '&:nth-child(3n)')
            addVariant('third-2', '&:nth-child(3n+1)')
            addVariant('third-3', '&:nth-child(3n+2)')
        }),
        /**
         * '@tailwindcss/forms' is the forms plugin that provides a minimal styling
         * for forms. If you don't like it or have own styling for forms,
         * comment the line below to disable '@tailwindcss/forms'.
         */
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
