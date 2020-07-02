import { Component, Prop, State, h } from "@stencil/core";
import { ICategoryCard } from "../category-card/category-card";

@Component({
	tag: "category-column",
	styleUrl: "category-column.css",
	shadow: true,
})
export class CategoryColumn {
	@Prop() cards!: ICategoryCard[];
	@Prop() columnIndex!: number;
	@Prop() selectedCard!: { x: number; y: number };
	@State() currentlySelected: number = 0;

	render() {
		const defaultCards = [{ name: "default item", status: "defualt status" }];

		const shouldBeSelected = (index: number) => {
			// console.info(this.selectedCard, 'col num,x', this.columnIndex ,index)
			return (
				this.selectedCard.y === index &&
				this.selectedCard.x === this.columnIndex
			);
		};

		return (
			<article class="category-column">
				{(this.cards || defaultCards).map(({ name, status }, rowIndex) => {
					return (
						<category-card
							key={rowIndex}
							name={name}
							status={status}
							isSelected={shouldBeSelected(rowIndex)}
						></category-card>
					);
				})}
			</article>
		);
	}
}
