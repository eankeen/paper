import { TodoCard } from './TodoCard.js';
import { Store } from './store.js';
export async function main() {
    let store;
    try {
        const res = await fetch("/store");
        if (res.status !== 200) {
            throw new Error('status not 200');
        }
        store = new Store(await res.json());
        const todo = new DocumentFragment();
        const inProgress = new DocumentFragment();
        const done = new DocumentFragment();
        for (const card of store.cards) {
            const todoCard = document.createElement('todo-card');
            todoCard.setAttribute('title', card.title);
            todoCard.setAttribute('description', card.description);
            todoCard.setAttribute('status', card.status);
            if (card.status === "todo") {
                todo.appendChild(todoCard);
            }
            else if (card.status === "in-progress") {
                inProgress.appendChild(todoCard);
            }
            else if (card.status === "done") {
                done.appendChild(todoCard);
            }
        }
        const t = document.querySelector('.todo-column.todo');
        if (!t)
            console.error('element not found');
        else
            t.appendChild(todo);
        const i = document.querySelector('.todo-column.in-progress');
        if (!i)
            console.error('element not found');
        else
            i.appendChild(inProgress);
        const d = document.querySelector('.todo-column.done');
        if (!d)
            console.error('element not found');
        else
            d.appendChild(done);
    }
    catch (err) {
        console.error(err);
    }
    const tc = document.querySelector('todo-card');
    document.addEventListener('keydown', (ev) => {
        if (ev.altKey && ev.code === "KeyJ") {
            console.log(ev);
            // @ts-ignore
            tc.setAttribute('selected', true);
        }
        else if (ev.altKey && ev.code === "KeyK") {
            console.log(ev);
        }
    }, {
        passive: true
    });
    globalThis.customElements.define('todo-card', TodoCard);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUdsQyxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUk7SUFDekIsSUFBSSxLQUFnQixDQUFBO0lBRXBCLElBQUk7UUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNqQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtTQUNqQztRQUNELEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQWUsQ0FBQyxDQUFBO1FBRWhELE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQTtRQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUE7UUFDekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFBO1FBQ25DLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUMvQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3BELFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMxQyxRQUFRLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDdEQsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRTVDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7YUFDMUI7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLGFBQWEsRUFBRTtnQkFDekMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTthQUNoQztpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQzFCO1NBRUQ7UUFFRCxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDckQsSUFBSSxDQUFDLENBQUM7WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7O1lBRWxDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFcEIsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO1FBQzVELElBQUksQ0FBQyxDQUFDO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBOztZQUVsQyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRTFCLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUNyRCxJQUFJLENBQUMsQ0FBQztZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTs7WUFFbEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUVwQjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNsQjtJQUVELE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDOUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQzNDLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2YsYUFBYTtZQUNiLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ2pDO2FBQ0ksSUFBRyxFQUFFLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDZjtJQUNGLENBQUMsRUFBRTtRQUNGLE9BQU8sRUFBRSxJQUFJO0tBQ2IsQ0FBQyxDQUFBO0lBRUYsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQ3hELENBQUMifQ==