import { Component, Prop, State, h } from '@stencil/core'
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
	@Prop() columnName!: string
	@Prop() columnIndex!: number
	@Prop() selected!: { x: number, y: number }
	@State() currentlySelected: number = 0

  render() {
		const shouldBeSelected = (index: number) =>{
			console.info(this.selected, 'col num,x', this.columnIndex ,index)
			return this.selected.y === index && this.selected.x === this.columnIndex
		}
/* it's getting index of 11 because remember everything from store/store.json is in one
long array, and 11 means that it's the 11th element in there. we need to filter the
elements on a different level to fix this (before the loops) */

		return (
      <article class="category-column">

        {
				(this.items || defaultItems).map(({name, status }, rowIndex) => {
					console.log(rowIndex)
					return status === this.columnName
						? (<div><p>{this.columnIndex}  {rowIndex}</p><category-item key={rowIndex} name={name} status={status}
						isSelected={shouldBeSelected(rowIndex)}></category-item></div>)
						: undefined
					})
			}
      </article>
    )
  }
}
