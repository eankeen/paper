import { Component, State, h } from '@stencil/core';
import { ITodoItem } from '../category-item/category-item';

async function get(): Promise<ITodoItem[]> {
  try {
    const res = await fetch("/api/store");
    if (res.status === 200) {
      const json = await res.json()
      // @ts-ignore
      return json.cards
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
  @State() todoItems: ITodoItem[]
  @State() selected: { x: number, y: number } = {
	  x: 1,
	  y: 0
  }
  @State() i: Record<string, any>

  componentWillLoad() {
    get()
      .then(data => {
        this.todoItems = data
			this.i = {
				'thinking-about': data.filter(item => item.status === 'thinking-about'),
				'stalled': data.filter(item => item.status === 'stalled')
			}
		})
  }

  render() {
    return (
      <div class='app-home'>
			<category-panel>
				{
					this.i && [
						"thinking-about",
						"stalled",
						// "todo",
						// "in-progress",
						// "waiting",
						// "done"
					].map((columnName, columnIndex) => {
						return (
							<category-column key={columnIndex} items={this.todoItems} selected={this.i[columnName]} columnName={columnName} columnIndex={columnIndex}></category-column>
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
