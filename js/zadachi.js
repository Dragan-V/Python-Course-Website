document.querySelectorAll(".carousel").forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel__item");
    const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel__button"></span>`;
    });

    carousel.insertAdjacentHTML(
        "beforeend",
        `
      <div class="carousel__nav">
          ${buttonsHtml.join("")}
      </div>
      `
    );

    const buttons = carousel.querySelectorAll(".carousel__button");

    buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
            // un-select all the items
            items.forEach((item) =>
                item.classList.remove("carousel__item--selected")
            );
            buttons.forEach((button) =>
                button.classList.remove("carousel__button--selected")
            );

            items[i].classList.add("carousel__item--selected");
            button.classList.add("carousel__button--selected");
        });
    });

    // Select the second item on page load
    items[0].classList.add("carousel__item--selected");
    buttons[0].classList.add("carousel__button--selected");

    const prevButton = document.createElement("span");
    prevButton.classList.add("carousel__button", "carousel__button--prev");
    prevButton.addEventListener("click", () => {
        const selectedItem = carousel.querySelector(".carousel__item--selected");
        const prevItem = selectedItem.previousElementSibling;

        if (prevItem) {
            selectedItem.classList.remove("carousel__item--selected");
            prevItem.classList.add("carousel__item--selected");

            const selectedIndex = Array.from(items).indexOf(prevItem);

            buttons.forEach((button) =>
                button.classList.remove("carousel__button--selected")
            );
            buttons[selectedIndex].classList.add("carousel__button--selected");
        } else {
            // Reached the first item, sends you to the last
            selectedItem.classList.remove("carousel__item--selected");
            items[items.length - 1].classList.add("carousel__item--selected");

            buttons.forEach((button) =>
                button.classList.remove("carousel__button--selected")
            );
            buttons[items.length - 1].classList.add("carousel__button--selected");
        }
    });
    carousel.querySelector(".carousel__nav").prepend(prevButton);

    const nextButton = document.createElement("span");
    nextButton.classList.add("carousel__button", "carousel__button--next");
    nextButton.addEventListener("click", () => {
        const selectedItem = carousel.querySelector(".carousel__item--selected");
        const nextItem = selectedItem.nextElementSibling;

        if (
            nextItem &&
            !nextItem.classList.contains("carousel__button--next") &&
            !nextItem.classList.contains("carousel__nav")
        ) {
            selectedItem.classList.remove("carousel__item--selected");
            nextItem.classList.add("carousel__item--selected");

            const selectedIndex = Array.from(items).indexOf(nextItem);

            buttons.forEach((button) =>
                button.classList.remove("carousel__button--selected")
            );
            buttons[selectedIndex].classList.add("carousel__button--selected");
        } else {
            // Reached the last item, send you to the first
            selectedItem.classList.remove("carousel__item--selected");
            items[0].classList.add("carousel__item--selected");

            buttons.forEach((button) =>
                button.classList.remove("carousel__button--selected")
            );
            buttons[0].classList.add("carousel__button--selected");
        }
    });
    carousel.querySelector(".carousel__nav").appendChild(nextButton);
});
