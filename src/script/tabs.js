;(function() {
	//*************** T A B S
	const tabs = document.querySelectorAll(".tab__title");
	for (const tab of tabs) {
		tab.addEventListener("click", eventHandler);
	}

	function eventHandler(e) {
		const tab = e.currentTarget;
		const content = document.querySelector(`#${tab.dataset.content}`);

		const activeTab = document.querySelector(".tab__title.active");
		const activeContent = document.querySelector(`#${activeTab.dataset.content}`);
		if (tab.dataset.content != activeTab.dataset.content) {
			activeTab.classList.remove("active");
			activeContent.style.display = "none";

			tab.classList.add("active");
			content.style.display = "block";
		}
	}	
})();
