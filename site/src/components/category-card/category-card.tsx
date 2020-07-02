import { Component, Prop, h } from "@stencil/core";

export interface ICategoryCard {
	name: string;
	status: string;
}

@Component({
	tag: "category-card",
	styleUrl: "category-card.css",
	shadow: true,
})
export class CategoryItem {
	@Prop() name!: string;
	@Prop() status!: string;
	@Prop() isSelected!: boolean;

	render() {
		return (
			<section class={this.isSelected ? "selected" : ""}>
				<h2>{this.name}</h2>
				<p>{this.status}</p>
			</section>
		);
	}
}
