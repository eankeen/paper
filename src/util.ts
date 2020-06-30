import { Store } from './Store.js'

export const commonStyleInjection = `
	*, *::before, *::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0 none;
		font-family: system-ui, Arial, sans-serif;
	}
`

// @ts-ignore
export function globalStyleInjector(d: typeof document) {
	const style = d.createElement('style')
	d.head.appendChild(style)
	// @ts-ignore
	style.sheet.insertRule(commonStyleInjection)
}
