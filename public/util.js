export const commonStyleInjection = `
	*, *::before, *::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0 none;
		font-family: system-ui, Arial, sans-serif;
	}
`;
// @ts-ignore
export function globalStyleInjector(d) {
    const style = d.createElement('style');
    d.head.appendChild(style);
    // @ts-ignore
    style.sheet.insertRule(commonStyleInjection);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHOzs7Ozs7OztDQVFuQyxDQUFBO0FBRUQsYUFBYTtBQUNiLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxDQUFrQjtJQUNyRCxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pCLGFBQWE7SUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQzdDLENBQUMifQ==