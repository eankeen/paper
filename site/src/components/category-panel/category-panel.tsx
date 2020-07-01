import { Component, h } from '@stencil/core';

@Component({
    tag: 'category-panel',
    styleUrl: 'category-panel.css'
})
export class CategoryPanel {
	render() {
		return (
			<section class="category-panel">
				<slot></slot>
			</section>
		);
	}
}
