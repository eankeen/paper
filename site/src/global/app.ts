export default async () => {
  /**
   * The code to be executed should be placed within a default function that is
   * exported by the global script. Ensure all of the code in the global script
   * is wrapped in the function() that is exported.
   */

	document.addEventListener('keydown', (ev) => {
		if (ev.altKey && ev.code === "KeyJ") {
			console.info(ev)
		} else if (ev.altKey && ev.code === "KeyK") {

		} else if (ev.altKey && ev.code === "KeyH") {

		} else if (ev.altKey && ev.code === "KeyL") {

		}
	})
};
