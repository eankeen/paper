import { Component, State, h } from '@stencil/core';
import { ICategoryCard } from '../category-card/category-card';

async function get(): Promise<ICategoryCard[]> {
  try {
    const res = await fetch("/api/store");
    if (res.status === 200) {
      const json = await res.json()
      // @ts-ignore
      return json
    } else {
      throw new Error("status not 200");
    }
  } catch (err) {
    console.error(err);
  }
}

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {
  @State() cards: any[]
  @State() selected: { x: number, y: number } = {
	  x: 1,
	  y: 0
  }
  @State() i: Record<string, any>

  componentWillLoad() {
    get()
      .then((data: any) => {
			const statuses = ["thinking-about", "stalled", "todo", "in-progress", "waiting", "done"]
			const cards = [];
			for (const status of statuses) {
				cards.push(data.cards.filter(c => {
					return c.status === status
				}))
			}
			this.cards = cards
		})


		// TODO: remove event listeners on component removal /
		// use frameowork method
		document.addEventListener("keydown", (ev) => {
if (ev.altKey && ev.shiftKey && ev.code === "KeyL") {
	const card = this.cards[this.selected.x][this.selected.y]
	// let arr = this.cards[this.selected.x][this.selected.y].splice(this.selected.y, 1)
	const cards = this.cards
	cards[this.selected.x].splice(this.selected.y, 1)
	this.cards = cards
	console.log(cards)
	return
}

		if (ev.altKey && ev.code === "KeyJ") {
			this.selected = {
				x: this.selected.x,
				y: this.selected.y + 1
			}
		} else if (ev.altKey && ev.code === "KeyK") {
			this.selected = {
  x: this.selected.x,
  y: this.selected.y - 1,
};
		} else if (ev.altKey && ev.code === "KeyH") {
			this.selected = {
				x: this.selected.x - 1,
				y: this.selected.y
			}
		} else if (ev.altKey && ev.code === "KeyL") {
			this.selected = {
  x: this.selected.x + 1,
  y: this.selected.y,
};
		}console.log(this.selected);
});
  }

  render() {
    return (
      <div class='app-home'>
			<category-panel>
				{
					this.cards && [
						"thinking-about",
						"stalled",
						"todo",
						"in-progress",
						"waiting",
						"done"
					].map((columnName, columnIndex) => {
						return (
							<category-column key={columnIndex} cards={this.cards[columnIndex]}
							selectedCard={this.selected}
							columnIndex={columnIndex}></category-column>
						)
					})
				}
			</category-panel>


        {/* <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link> */}
      </div>
    );
  }
}
