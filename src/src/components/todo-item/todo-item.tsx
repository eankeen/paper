import { Component, Prop, h } from '@stencil/core';

export interface ITodoItem {
  name: string
  status: string
}

@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.css',
  shadow: true
})
export class TodoItem {
  @Prop() name: string
  @Prop() status: string

  render() {
    return (
      <div class="todo-item">
        <article>
          <h2>{this.name}</h2>
          <p>{this.status}</p>
        </article>
      </div>
    )
  }
}
