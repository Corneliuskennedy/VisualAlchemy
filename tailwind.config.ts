import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";

const config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts}",
        "./src/hooks/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        'opacity-0', 'opacity-100',
        'animate-spin',
        'prose', 'prose-invert',
        'bg-green-50', 'border-green-200', 'text-green-700',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                'octo-blue': '#324c9e',
                'electric-blue': '#4585f4',
                'blog-blue': '#6B8AE6',
                'cyan-500': '#06B6D4',
                'deep-space': '#121212',
                'page-bg': '#18191A',
                'glow-blue': '#4585F4',
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans], // Inter for body & UI
                archivo: ["var(--font-archivo)", ...fontFamily.sans], // Archivo for headlines
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-slow": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "float-delayed": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                "pulse-slow": {
                    "0%": { opacity: "0.5", transform: "scale(0.97)" },
                    "50%": { opacity: "1", transform: "scale(1.03)" },
                    "100%": { opacity: "0.5", transform: "scale(0.97)" },
                },
                "shimmer": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "fade-in-slow": "fade-in-slow 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                "float": "float 6s ease-in-out infinite",
                "float-delayed": "float-delayed 6s ease-in-out infinite 1s",
                "pulse-slow": "pulse-slow 4s ease-in-out infinite",
                "shimmer": "shimmer 1s ease-in-out",
            },
            typography: ({ theme }: any) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-headings': theme('colors.blog-blue'),
                        '--tw-prose-bullets': theme('colors.blog-blue'),
                        color: theme('colors.gray[300]'),
                        maxWidth: '65ch',
                        h2: {
                            color: theme('colors.blog-blue'),
                            fontWeight: '600',
                            fontSize: '1.75em',
                            marginTop: '1.6em',
                            marginBottom: '0.8em',
                            lineHeight: '1.3',
                        },
                        h3: {
                            color: theme('colors.blog-blue'),
                            fontWeight: '600',
                            fontSize: '1.4em',
                            marginTop: '1.25em',
                            marginBottom: '0.6em',
                            lineHeight: '1.4',
                        },
                        'ul:not(:where([class~="not-prose"] *))': {
                            listStyleType: 'disc',
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            paddingLeft: '1.625em',
                        },
                        'ul > li:not(:where([class~="not-prose"] *))': {
                            position: 'relative',
                            paddingLeft: '0.375em',
                            marginTop: '0.25em',
                            marginBottom: '0.25em',
                        },
                        'ul > li:not(:where([class~="not-prose"] *))::marker': {
                            color: theme('colors.blog-blue'),
                        },
                        p: {
                            marginTop: '1.25em',
                            marginBottom: '1.25em',
                            lineHeight: '1.75',
                        },
                        strong: {
                            color: 'inherit',
                            fontWeight: '600',
                        },
                    },
                },
            }),
            fontWeight: {
                'archivo-thin': '100',
                'archivo-black': '900',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [
        animatePlugin,
        require("@tailwindcss/typography"),
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
} satisfies Config;

export default config;
