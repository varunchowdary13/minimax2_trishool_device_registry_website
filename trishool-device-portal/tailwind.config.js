/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// Swiss Design Color Palette
				black: '#000000',
				charcoal: '#1A1A1A',
				'dark-gray': '#333333',
				'medium-gray': '#666666',
				'light-gray': '#999999',
				'border-gray': '#CCCCCC',
				'surface-gray': '#E5E5E5',
				'background-light': '#F5F5F5',
				white: '#FFFFFF',
				// Accent Colors
				'tech-blue': '#0057B7',
				'tech-blue-dark': '#003D82',
				// Semantic Colors
				success: '#008A00',
				error: '#CC0000',
				warning: '#CC5500',
				// Legacy support
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
			},
			fontFamily: {
				primary: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
				monospace: ['Monaco', '"Courier New"', 'monospace'],
			},
			fontSize: {
				'display': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
				'headline': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
				'subhead': ['20px', { lineHeight: '1.3', fontWeight: '500' }],
				'body-large': ['18px', { lineHeight: '1.5' }],
				'body': ['16px', { lineHeight: '1.5' }],
				'small': ['14px', { lineHeight: '1.5' }],
				'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
			},
			spacing: {
				'xs': '8px',
				'sm': '16px',
				'md': '24px',
				'lg': '32px',
				'xl': '48px',
				'2xl': '64px',
				'3xl': '96px',
			},
			borderRadius: {
				'none': '0px',
				'subtle': '2px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			borderWidth: {
				'thin': '1px',
				'medium': '2px',
				'thick': '4px',
			},
			animation: {
				'fade-in': 'fadeIn 200ms ease-out',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}