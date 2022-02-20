let initProducts = () => {
    const main = document.querySelector("main");

    const content = createElement("div", "content");
    main.append(content);

    const contentShirts = createElement("div", "content_shirts");
    content.append(contentShirts);

    const nameTitle = createInfoElement("h2", "Our T-Shirts");
    contentShirts.append(nameTitle);

    const infoTShirts = createElement("div", "shirts")
    contentShirts.append(infoTShirts);

    shirts.forEach((shirt) => {
        const tShirt = createTShirt(shirt);
        infoTShirts.append(tShirt);
    });
};

function createTShirt(shirt) {
    const tShirt = document.createElement("div");
    tShirt.className = "t-shirt";

    const imageTShirt = document.createElement("img");
    if (getNumberColors(shirt) != 0) imageTShirt.src = shirt.colors[Object.keys(shirt.colors)[0]].front;
    else imageTShirt.src = shirt.default.front;
    tShirt.append(imageTShirt);

    const tShirtInfo = createElement("div", "t-shirt_info")
    tShirt.append(tShirtInfo);

    const headerTShirt = createInfoElement("h3", getParametrTShirt(shirt, "name"));
    tShirtInfo.append(headerTShirt);

    const avaliableColors = document.createElement("p");
    if (getNumberColors(shirt) != 0) avaliableColors.textContent = "Avaliable in " + getNumberColors(shirt) + " colors";
    else avaliableColors.textContent = "Not avaliable";
    tShirtInfo.append(avaliableColors);

    const tShirtButtons = createElement("div", "t-shirt_buttons");
    tShirtInfo.append(tShirtButtons);

    const buttonQuickView = document.createElement("button");
    buttonQuickView.className = "btn_quick_view";
    buttonQuickView.textContent = "Quick View";
    tShirtButtons.append(buttonQuickView);

    let buttonSeePage = document.createElement("button");
    buttonSeePage.className = "btn_see_page";
    buttonSeePage.textContent = "See Page";
    tShirtButtons.append(buttonSeePage);

    windowQuickView(buttonQuickView, tShirt, shirt);

    const btnSeePage = tShirt.querySelector(".btn_see_page");
    btnSeePage.addEventListener("click", () => {
        localStorage.setItem("indexTShirt", shirts.indexOf(shirt));
        document.location = "details.html";
    });

    return tShirt;
}

function windowQuickView(buttonQuickView, tShirt, shirt) {
    const main = document.querySelector("main");
    
    buttonQuickView.addEventListener("click", () => {
        const qView = document.querySelector(".quick_view");
        if (qView) qView.remove();

        const quickView = createElement("div", "quick_view")
        main.append(quickView);

        const quickViewInfo = createElement("div", "quick_view_info");
        quickView.append(quickViewInfo);

        const quickViewImages = createElement("div", "quick_view_images");
        quickViewInfo.append(quickViewImages);

        const imageTShirt = shirt.colors[Object.keys(shirt.colors)[0]];

        const imageTShirtFront = document.createElement("img");
        imageTShirtFront.src = imageTShirt.front;
        quickViewImages.append(imageTShirtFront);

        const imageTShirtBack = document.createElement("img");
        imageTShirtBack.src = imageTShirt.back;
        quickViewImages.append(imageTShirtBack);

        const quickViewInfoTShirt = createElement("div", "quick_view_info_t-shirt");
        quickViewInfo.append(quickViewInfoTShirt);

        const headerTShirt = createInfoElement("h3", tShirt.querySelector("h3").textContent);
        quickViewInfoTShirt.append(headerTShirt);

        const infoPriceTShirt = createInfoElement("p", getParametrTShirt(shirt, "price"));
        quickViewInfoTShirt.append(infoPriceTShirt);

        const btnClose = createInfoElement("button", "Close");
        quickViewInfoTShirt.append(btnClose);

        quickView.scrollIntoView({behavior: "smooth"});

        btnClose.addEventListener("click", () => {
            quickView.remove();
        });
    });
}

let initDetails = () => {
    const indexTShirt = localStorage.getItem("indexTShirt");
    const tShirt = shirts[indexTShirt];

    const main = document.querySelector("main");

    const content = createElement("div", "content");
    main.append(content);

    const contentTShirt = createElement("div", "content_t-shirt");
    content.append(contentTShirt);

    const headerTShirt = createInfoElement("h2", getParametrTShirt(tShirt, "name"));
    contentTShirt.append(headerTShirt);

    const blockTShirt = createElement("div", "shirt");
    contentTShirt.append(blockTShirt);

    let image = tShirt.colors[Object.keys(tShirt.colors)[0]];
    let sideTShirt = "front";

    let imageTShirt = document.createElement("img");
    if (getNumberColors(tShirt) != 0) imageTShirt.src = image.front;
    else {
        image = tShirt.default;
        imageTShirt.src = image.front;
    }
    blockTShirt.append(imageTShirt);

    const tShirtInfo = createElement("div", "info_t-shirt");
    blockTShirt.append(tShirtInfo);

    const infoPriceTShirt = createInfoElement("h2", getParametrTShirt(tShirt, "price"));
    tShirtInfo.append(infoPriceTShirt);

    const infoDescriptionTShirt = createInfoElement("p", getParametrTShirt(tShirt, "description"));
    tShirtInfo.append(infoDescriptionTShirt);

    const buttonsTShirt = createElement("div", "buttons_t-shirt");
    tShirtInfo.append(buttonsTShirt);

    const sideButtons = createElement("div", "side_buttons");
    buttonsTShirt.append(sideButtons);

    const titleSideButtons = createInfoElement("p", "Side: ");
    sideButtons.append(titleSideButtons);

    const btnFront = document.createElement("button");
    btnFront.className = "button_front";
    btnFront.textContent = "Front";
    sideButtons.append(btnFront);

    btnFront.addEventListener("click", () => {
        const frontSize = Object.keys(image.front).length;
        if (frontSize != 0) {
            imageTShirt.src = image.front + "";
            sideTShirt = "front";
        }
    });

    const btnBack = document.createElement("button");
    btnBack.className = "button_back";
    btnBack.textContent = "Back";
    sideButtons.append(btnBack);

    btnBack.addEventListener("click", () => {
        const backSize = Object.keys(image.back).length;
        if (backSize != 0) {
            imageTShirt.src = image.back + "";
            sideTShirt = "back";
        }
    });

    if (getNumberColors(tShirt) != 0) {
        const colorButtons = createElement("div", "color_buttons");
        buttonsTShirt.append(colorButtons);

        const titleColorButtons = createInfoElement("p", "Color: ");
        colorButtons.append(titleColorButtons);

        const colorsTShirt = Object.keys(tShirt.colors);
        colorsTShirt.forEach((colorTShirt) => {
            const colorButton = document.createElement("button");
            colorButton.className = "color_button";
            colorButton.textContent = colorTShirt;
            colorButton.style.setProperty("--backgroundColor", colorTShirt);
            colorButtons.append(colorButton);

            colorButton.addEventListener("click", () => {
                image = tShirt.colors[colorTShirt];
                if (sideTShirt === "front") imageTShirt.src = image.front;
                else imageTShirt.src = image.back;
            });
        });
    }
};

function createElement(typeElement, className) {
    const element = document.createElement(typeElement);
    element.className = className;
    return element;
}

function createInfoElement(typeElement, textContent) {
    const element = document.createElement(typeElement);
    element.textContent = textContent;
    return element;
}

function getParametrTShirt(tShirt, parameter) {
    const parameterSize = Object.keys(tShirt[parameter]).length;
    return parameterSize != 0 ? tShirt[parameter] : "No " + parameter;
}

function getNumberColors(tShirt) {
    return Object.keys(tShirt.colors).length;
}