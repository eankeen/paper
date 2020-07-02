import { Component, State, h } from "@stencil/core";
import { ICategoryCard } from "../category-card/category-card";

const cardStatuses = [
	"thinking-about",
	"stalled",
	"todo",
	"in-progress",
	"waiting",
	"done",
];

interface SelectedCard {
	x: number;
	y: number;
}

@Component({
	tag: "app-home",
	styleUrl: "app-home.css",
	shadow: true,
})
export class AppHome {
	@State() cards: Record<string, ICategoryCard[]> = {};
	@State()
	selectedCard: SelectedCard = {
		x: 1,
		y: 0,
	};

	setNewCard(direction: "previous" | "next"): void {
		const adjustment = direction === "previous" ? -1 : 1;

		const columnStatus = cardStatuses[this.selectedCard.x];
		const nextColumnStatus = cardStatuses[this.selectedCard.x + adjustment];

		const columnStatusArray = Object.create(this.cards[columnStatus]);
		const nextColumnStatusArray = Object.create(this.cards[nextColumnStatus]);

		// remove element from first array and add it to the beginning of the next
		const selectedCard = columnStatusArray.splice(this.selectedCard.y, 1)[0];
		nextColumnStatusArray.unshift(selectedCard);

		let cards = this.cards;
		cards[columnStatus] = columnStatusArray;
		cards[nextColumnStatus] = nextColumnStatusArray;
		this.cards = cards;

		this.selectedCard = Object.create(this.selectedCard);
	}

	newLocationOutOfBounds({
		x: newX,
		y: newY,
	}: {
		x?: number;
		y?: number;
	}): boolean {
		if (newX !== void 0) {
			if (newX >= 0 && newX < Object.keys(this.cards).length) return false;
			return true;
		}
		if (newY !== void 0) {
			const columnStatusArray = this.cards[
				cardStatuses[this.selectedCard.x]
			];
			if (newY >= 0 && newY < columnStatusArray.length) return false;
			return true;
			// return true;
		}
		throw new Error(`invalid parameters to function: ${newX}, ${newY}`);
	}

	onKeyPress(ev) {
		console.log(this.selectedCard.x);

		if (ev.altKey && ev.shiftKey && ev.code === "KeyL") {
			const newX = this.selectedCard.x + 1;
			if (this.newLocationOutOfBounds({ x: newX })) return;

			this.setNewCard("next");
		} else if (ev.altKey && ev.shiftKey && ev.code === "KeyH") {
			const newX = this.selectedCard.x - 1;
			if (this.newLocationOutOfBounds({ x: newX })) return;

			this.setNewCard("previous");
		}

		if (ev.altKey && ev.code === "KeyJ") {
			const newY = this.selectedCard.y + 1;
			if (this.newLocationOutOfBounds({ y: newY })) return;

			this.selectedCard = {
				x: this.selectedCard.x,
				y: newY,
			};
		} else if (ev.altKey && ev.code === "KeyK") {
			const newY = this.selectedCard.y - 1;
			if (this.newLocationOutOfBounds({ y: newY })) return;

			this.selectedCard = {
				x: this.selectedCard.x,
				y: newY,
			};
		} else if (ev.altKey && ev.code === "KeyH") {
			const newX = this.selectedCard.x - 1;
			if (this.newLocationOutOfBounds({ x: newX })) return;

			this.selectedCard = {
				x: newX,
				y: this.selectedCard.y,
			};
		} else if (ev.altKey && ev.code === "KeyL") {
			const newX = this.selectedCard.x + 1;
			if (this.newLocationOutOfBounds({ x: newX })) return;

			this.selectedCard = {
				x: newX,
				y: this.selectedCard.y,
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
						if (!data) throw new Error("data not valid");
					} catch (err) {
						console.error(err);
					}

					const cards = {};
					for (const status of cardStatuses) {
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
						cardStatuses.map((status, columnIndex) => {
							return (
								<category-column
									key={columnIndex}
									cards={this.cards[status]}
									selectedCard={this.selectedCard}
									columnIndex={columnIndex}
								></category-column>
							);
						})}
				</category-panel>
				{/* <stencil-route-link url="/profile/stencil">
					<button>Profile fpage</button>
				</stencil-route-link> */}
			</div>
		);
	}
}
