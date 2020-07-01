import { Component, State, h } from '@stencil/core';
import { ITodoItem } from '../todo-item/todo-item';

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
        console.log(data)
        this.todoItems = data
      })
  }

  render() {
    const todoItems = [
      { name: "name", status: "status"},
      { name: "name2", status: "status2"}
    ];

    return (
      <div class='app-home'>
        {
          (this.todoItems || todoItems).map(({name, status }) => {
            return <todo-item name={name} status={status}></todo-item>;
          })
        }
        <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link>
      </div>
    );
  }
}
