import { commonStyleInjection } from './util.js'

export class TodoCard extends HTMLElement {
	static get observedAttributes() {
		return [
			"title",
			"status",
			"selected"
		]
	}

	attributeChangedCallback(prop: string, oldVal: string, newVal: string) {
		if (prop === "selected" && newVal === "true") {
			this.shadowRoot.children[1].classList.add("selected")
		}
	}

	constructor() {
		super()

		const s = this.attachShadow({ mode: 'open' })
		s.innerHTML = `
			<style>
				${commonStyleInjection}
				article {
					padding: var(--space);
					margin-block-end: var(--space);
					border-radius: 4px;
					border: 1px solid #adb5bd;
				}

				article.selected {
					border: 1px solid black;
				}

				h2 {
					font-size: 18px;
					font-weight: bold;
				}

				p {
					font-size: 14px;
				}
			</style>
			<article>
				<h2>${this.getAttribute('title')}</h2>
				<p>${this.getAttribute("status")}</p>
			</article>
		`
	}
}
