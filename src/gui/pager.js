import html from "../lib/html";
import eventable from "../mixins/eventable";
import gui_helpers from "../mixins/gui_helpers";
import {PER_PAGE} from "../conf";

/**
 * A button for the pager.
 */
// TODO : More generic button.
class Button {
	constructor(txt, classes = []) {
		eventable(this);
		gui_helpers(this);

		this.$node = html(`<li></li>`)[0];

		classes.forEach((cls) => this.$node.classList.add(cls));

		this.$button = this.appendChild(html(`<button />`)[0]);
		this.$button.innerText = txt;

		this.$button.addEventListener("click", (...args) => this.sendEvent("click", ...args));
	}

	set_disabled(disabled) {
		this.$button.disabled = disabled;
		if (disabled) {
			this.$node.classList.add("disabled");
		}
		else {
			this.$node.classList.remove("disabled");
		}
	}
}

/**
 */
class Pager {
	constructor() {
		eventable(this);
		gui_helpers(this);

		this.$node = html(`<ul class="pager"></ul>`)[0];

		this.first = this.appendChild(new Button("« First", ["first"]));
		this.first.set_disabled(true);

		this.previous = this.appendChild(new Button("‹ Previous", ["previous"]));
		this.previous.set_disabled(true);

		this.next = this.appendChild(new Button("Next ›", ["next"]));
		this.next.set_disabled(true);

		this.last = this.appendChild(new Button("Last »", ["last"]));
		this.last.set_disabled(true);

		this.delegate_events("first");
		this.delegate_events("previous");
		this.delegate_events("next");
		this.delegate_events("last");
	}

	/**
	 * Delegates events to another component.
	 */
	delegate_events(name, events = ["click"]) {
		const what = this[name];
		events.forEach((event) => {
			what.addEventListener(`${event}`, (...args) => this[`handle_${name}_${event}`](...args));

			this[`handle_${name}_${event}`] = (...args) => {
				this.sendEvent(`${name}_${event}`, ...args);
			};
		});
	}

	update_results_count(page, amount) {
		const end = Math.ceil(amount / PER_PAGE);
		this.first.set_disabled(page <= 1);
		this.previous.set_disabled(page <= 1);
		this.next.set_disabled(page >= end);
		this.last.set_disabled(page >= end);
	}

}

export default Pager;
