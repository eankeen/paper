import { Component, State, h } from "@stencil/core";
import { ICategoryCard } from "../category-card/category-card";

const statuses = [
	"thinking-about",
	"stalled",
	"todo",
	"in-progress",
	"waiting",
	"done",
];

@Component({
	tag: "app-home",
	styleUrl: "app-home.css",
	shadow: true,
})
export class AppHome {
	@State() cards: Record<string, ICategoryCard[]>;
	@State()
	selected: { x: number; y: number } = {
		x: 1,
		y: 0,
	};

	// returns current column 'thin king-about', 'done', etc.
	getCurrentColumnArray() {
		const currentColumnName = statuses[this.selected.x];
		return this.cards[currentColumnName];
	}

	onKeyPress(ev) {
		if (ev.altKey && ev.shiftKey && ev.code === "KeyL") {
			const currentColumnName = statuses[this.selected.x];
			const nextColumnName = statuses[this.selected.x + 1];

			// this will be modified
			const currentColumnArray = this.getCurrentColumnArray();
			const selectedCard = currentColumnArray.splice(this.selected.y, 1)[0];

			// next column
			this.cards[nextColumnName].unshift(selectedCard);
			const nextColumnArray = this.cards[nextColumnName];

			let cards = this.cards;
			cards[currentColumnName] = currentColumnArray;
			cards[nextColumnName] = nextColumnArray;

			console.log(selectedCard);
			this.cards = cards;

			this.selected = Object.create(this.selected);
		} else if (ev.altKey && ev.shiftKey && ev.code === "KeyH") {
			const currentColumnName = statuses[this.selected.x];
			const nextColumnName = statuses[this.selected.x - 1];

			// this will be modified
			const currentColumnArray = this.getCurrentColumnArray();
			const selectedCard = currentColumnArray.splice(this.selected.y, 1)[0];

			// next column
			this.cards[nextColumnName].unshift(selectedCard);
			const nextColumnArray = this.cards[nextColumnName];

			let cards = this.cards;
			cards[currentColumnName] = currentColumnArray;
			cards[nextColumnName] = nextColumnArray;

			console.log(selectedCard);
			this.cards = cards;

			this.selected = Object.create(this.selected);
		}

		if (ev.altKey && ev.code === "KeyJ") {
			this.selected = {
				x: this.selected.x,
				y: this.selected.y + 1,
			};
		} else if (ev.altKey && ev.code === "KeyK") {
			this.selected = {
				x: this.selected.x,
				y: this.selected.y - 1,
			};
		} else if (ev.altKey && ev.code === "KeyH") {
			this.selected = {
				x: this.selected.x - 1,
				y: this.selected.y,
			};
		} else if (ev.altKey && ev.code === "KeyL") {
			this.selected = {
				x: this.selected.x + 1,
				y: this.selected.y,
			};
		}
	}

	connectedCallback() {
		fetch("/api/store")
			.then(async (res) => {
				if (res.status === 200) {
					let data;
					try {
						data = await res.json();
					} catch (err) {
						console.error(err);
					}

					const cards = {};
					for (const status of statuses) {
						cards[status] = data.cards.filter((card: ICategoryCard) => {
							return card.status === status;
						});
					}
					this.cards = cards;
				} else {
					throw new Error("Status not 200");
				}
			})
			.catch((err) => {
				console.error(err);
			});

		document.addEventListener("keydown", this.onKeyPress.bind(this));
	}

	disconnectedCallback() {
		document.removeEventListener("keydown", this.onKeyPress.bind(this));
	}

	render() {
		return (
			<div class="app-home">
				<category-panel>
					{this.cards &&
						statuses.map((status, columnIndex) => {
							return (
								<category-column
									key={columnIndex}
									cards={this.cards[status]}
									selectedCard={this.selected}
									columnIndex={columnIndex}
								></category-column>
							);
						})}
				</category-panel>
				<stencil-route-link url="/profile/stencil">
					<button>Profile page</button>
				</stencil-route-link>
			</div>
		);
	}
}
