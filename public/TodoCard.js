import { commonStyleInjection } from './util.js';
export class TodoCard extends HTMLElement {
    static get observedAttributes() {
        return [
            "title",
            "status",
            "selected"
        ];
    }
    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === "selected" && newVal === "true") {
            this.shadowRoot.children[1].classList.add("selected");
        }
    }
    constructor() {
        super();
        const s = this.attachShadow({ mode: 'open' });
        s.innerHTML = `
			<style>
				${commonStyleInjection}
				article {
					padding: var(--space);
					margin-block-end: var(--space);
					border-radius: 4px;
					border: 1px solid #adb5bd;
				}

				article.selected {
					border: 1px solid black;
				}

				h2 {
					font-size: 18px;
					font-weight: bold;
				}

				p {
					font-size: 14px;
				}
			</style>
			<article>
				<h2>${this.getAttribute('title')}</h2>
				<p>${this.getAttribute("status")}</p>
			</article>
		`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9kb0NhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvVG9kb0NhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sV0FBVyxDQUFBO0FBRWhELE1BQU0sT0FBTyxRQUFTLFNBQVEsV0FBVztJQUN4QyxNQUFNLEtBQUssa0JBQWtCO1FBQzVCLE9BQU87WUFDTixPQUFPO1lBQ1AsUUFBUTtZQUNSLFVBQVU7U0FDVixDQUFBO0lBQ0YsQ0FBQztJQUVELHdCQUF3QixDQUFDLElBQVksRUFBRSxNQUFjLEVBQUUsTUFBYztRQUNwRSxJQUFJLElBQUksS0FBSyxVQUFVLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1NBQ3JEO0lBQ0YsQ0FBQztJQUVEO1FBQ0MsS0FBSyxFQUFFLENBQUE7UUFFUCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDN0MsQ0FBQyxDQUFDLFNBQVMsR0FBRzs7TUFFVixvQkFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFzQmhCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1NBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDOztHQUVqQyxDQUFBO0lBQ0YsQ0FBQztDQUNEIn0=