import { newE2EPage } from "@stencil/core/testing";

describe("category-panel", () => {
	it("renders", async () => {
		const page = await newE2EPage();

		await page.setContent("<category-panel></category-panel>");
		const element = await page.find("category-panel");
		expect(element).toHaveClass("hydrated");
	});
});
