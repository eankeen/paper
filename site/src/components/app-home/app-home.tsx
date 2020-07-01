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

  componentWillLoad() {
    get()
      .then(data => {
        this.todoItems = data
      })
  }

  render() {
    return (
      <div class='app-home'>
			<category-panel>
				<category-column items={this.todoItems} column="thinking-about"></category-column>
				<category-column items={this.todoItems} column="stalled"></category-column>
				<category-column items={this.todoItems} column="todo"></category-column>
				<category-column items={this.todoItems} column="in-progress"></category-column>
				<category-column items={this.todoItems} column="waiting"></category-column>
				<category-column items={this.todoItems} column="done"></category-column>
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
