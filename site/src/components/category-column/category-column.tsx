import { Component, Prop, h } from '@stencil/core'
import { IItem } from "../category-item/category-item";

const defaultItems = [
	{ name: "default item", status: "defualt status" }
]

@Component({
  tag: 'category-column',
  styleUrl: 'category-column.css',
  shadow: true
})
export class CategoryColumn {
	@Prop() items!: IItem[]
	@Prop() column!: string

  render() {
    return (
      <article class="category-column">
        {
				(this.items || defaultItems).map(({name, status }) => {
					return status === this.column
						? <category-item name={name} status={status}></category-item>
						: undefined
					})
			}
      </article>
    )
  }
}
