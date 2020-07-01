import { TodoCard } from './TodoCard.js'
import { Store } from './store.js'
import type { StoreData } from './store.js'

export async function main() {
	let store: StoreData

	try {
		const res = await fetch("/store")
		if (res.status !== 200) {
			throw new Error('status not 200')
		}
		store = new Store(await res.json() as StoreData)

		const todo = new DocumentFragment()
		const inProgress = new DocumentFragment()
		const done = new DocumentFragment()
		for (const card of store.cards) {
			const todoCard = document.createElement('todo-card')
			todoCard.setAttribute('title', card.title)
			todoCard.setAttribute('description', card.description)
			todoCard.setAttribute('status', card.status)

			if (card.status === "todo") {
				todo.appendChild(todoCard)
			} else if (card.status === "in-progress") {
				inProgress.appendChild(todoCard)
			} else if (card.status === "done") {
				done.appendChild(todoCard)
			}

		}

		const t = document.querySelector('.todo-column.todo')
		if (!t)
			console.error('element not found')
		else
			t.appendChild(todo)

		const i = document.querySelector('.todo-column.in-progress')
		if (!i)
			console.error('element not found')
		else
			i.appendChild(inProgress)

		const d = document.querySelector('.todo-column.done')
		if (!d)
			console.error('element not found')
		else
			d.appendChild(done)

	} catch (err) {
		console.error(err)
	}

	const tc = document.querySelector('todo-card')
	document.addEventListener('keydown', (ev) => {
		if (ev.altKey && ev.code === "KeyJ") {
			console.log(ev)
			// @ts-ignore
			tc.setAttribute('selected', true)
		}
		else if(ev.altKey && ev.code === "KeyK") {
			console.log(ev)
		}
	}, {
		passive: true
	})

	globalThis.customElements.define('todo-card', TodoCard)
}
