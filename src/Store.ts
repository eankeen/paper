type status = 'todo' | 'in-progress' | 'done'

interface Card {
	title: string
	description: string
	status: status
}

export interface StoreData {
	cards: Card[]
}

export class Store {
	#cards: Card[]
	#currentlySelected: HTMLElement

	constructor(store: StoreData) {
		this.#cards = store.cards
		this.#currentlySelected: document.querySelector('.todo-card')
	}

	get cards() {
		return this.#cards
	}
}
