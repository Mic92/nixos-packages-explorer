import html from "../lib/html";
import append from "../lib/append";
import on_change from "../lib/on_change";
import eventable from "../mixins/eventable";
import gui_helpers from "../mixins/gui_helpers";
import Pager from "./pager";
import {PER_PAGE} from "../conf";

/**
 */
class Results {
	constructor() {
		eventable(this);
		gui_helpers(this);

		this.$node = html(`<div></div>`)[0];
		this.$results_count = this.appendChild(html(`<p />`)[0]);
		this.update_results_count(1, 99999);

		// Two pagers instances are in the page.
		this.$pagers = [];
		this.$pagers.push(
			this.appendChild(new Pager())
		);

		this.$pagers.push(
			this.appendChild(new Pager())
		);

		this.$pagers.forEach((pager) => {
			[
				"first",
				"previous",
				"next",
				"last",
			].forEach(
				(name) => pager.addEventListener(`${name}_click`, (...args) => this.sendEvent(`${name}_click`, ...args))
			);
		});
	}

	/**
	 * Updates the "widget"'s text.
	 */
	update_results_count(page, amount) {
		const first = (page - 1) * PER_PAGE + 1;
		const last = page * PER_PAGE;
		this.$results_count.innerHTML = "";
		this.$results_count.appendChild(
			html(`<em>Showing results ${first}-${last} of ${amount}</em>`)[0]
		);
	}
}

export default Results;
