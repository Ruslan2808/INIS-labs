const workspace = document.querySelector("#workspace");
const blocks = workspace.querySelectorAll(".target");

let isDblClick = false;
let isTouched = false;
let isResizing = false;

blocks.forEach(block => {

    block.isActive = false;
    block.isMoving = false;
    block.countDbClick = 0;
    
    block.startPosition = { 
        'x': 0, 
        'y': 0
    };

    block.initialSize = {
        'x': 0,
        'y': 0
    };

    let x = 0;
    let y = 0;

    block.addEventListener("mousedown", (event) => {

        if (!isDblClick) {
            x = block.offsetLeft - event.clientX;
            y = block.offsetTop - event.clientY;
            block.isActive = true;
        }

        block.startPosition.x = block.offsetLeft;
        block.startPosition.y = block.offsetTop;

    });

    block.addEventListener("mouseup", () => {

        if (!isDblClick) {

            if (!block.isMoving) {
                resetColor();
                block.style.backgroundColor = "blue";
            }

            blocks.forEach(block => {
                block.isActive = false;
                block.isMoving = false;
            });

        }

    });

    window.addEventListener("mousemove", (event) => {

        if (block.isActive) {
            block.isMoving = true;
            block.style.left = event.clientX + x + "px";
            block.style.top = event.clientY + y + "px";
        }
        
    });

    block.addEventListener("dblclick", () => {

        block.countDbClick++;

        if (block.countDbClick === 1 && !isDblClick) {

            resetColor();
            block.style.backgroundColor = "blue";
            block.isActive = true;
            isDblClick = true;

        } else {

            blocks.forEach(block => {
                block.isActive = false;
                block.isMoving = false;
                block.countDbClick = 0;
            });

            isDblClick = false;

        }

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (block.isActive) {
                block.style.left = block.startPosition.x + "px";
                block.style.top = block.startPosition.y + "px";
            }

            resetColor();
            block.isActive = false;
            block.isMoving = false;
            block.countDbClick = 0;
            isDblClick = false;

        }
        
    });

    let distance = 0;

    block.minWidth = Number.parseInt(block.style.width.split("p")[0]);
    block.minHeight = Number.parseInt(block.style.height.split("p")[0]);

    block.addEventListener("touchstart", (event) => {
        
        if (!isTouched) {
            x = block.offsetLeft - event.changedTouches[0].clientX;
            y = block.offsetTop - event.changedTouches[0].clientY;
            block.isActive = true;
            isTouched = true;
        }

        block.startPosition.x = block.offsetLeft;
        block.startPosition.y = block.offsetTop;

        block.initialSize.width = block.style.width;
        block.initialSize.height = block.style.height;

        if (event.changedTouches.length === 2 && event.changedTouches[0].target === event.changedTouches[1].target) {
                
            distance = Math.hypot(event.changedTouches[0].clientX - event.changedTouches[1].clientX, 
                                  event.changedTouches[0].clientY - event.changedTouches[1].clientY);

        }

    });

    block.addEventListener("touchend", () => {

        blocks.forEach(activeBlock => {
                
            if (activeBlock.isActive && activeBlock === block) {
                
                if (!block.isMoving) {
                    resetColor();
                    block.style.backgroundColor = "blue";
                }

                block.isActive = false;
                block.isMoving = false;
                isTouched = false;
                isResizing = false;

            }

        });

    });

    block.addEventListener("touchmove", (event) => {
        
        if (block.isActive) {

            event.preventDefault();

            if (event.changedTouches.length === 2 && event.changedTouches[0].target === event.changedTouches[1].target) {

                isResizing = true;

                let currentDistance = Math.hypot(event.changedTouches[0].clientX - event.changedTouches[1].clientX, 
                                                 event.changedTouches[0].clientY - event.changedTouches[1].clientY);

                
                let left = Number.parseInt(block.style.left.split("p")[0]);
                let top = Number.parseInt(block.style.top.split("p")[0]);

                let width = Number.parseInt(block.style.width.split("p")[0]);
                let height = Number.parseInt(block.style.height.split("p")[0]);

                if (currentDistance > distance) {

                    block.style.left = (left - 1) + "px";
                    block.style.top = (top - 1) + "px";

                    block.style.width = (width + 2) + "px";
                    block.style.height = (height + 2) + "px";

                } else {

                    if (width + 2 > block.minWidth && height + 2 > block.minHeight) {

                        block.style.left = (left + 1) + "px";
                        block.style.top = (top + 1) + "px";

                        block.style.width = (width - 2) + "px";
                        block.style.height = (height - 2) + "px";

                    }

                }

                distance = currentDistance;

            } else { 

                if (!isResizing) {

                    block.isMoving = true;
                    block.style.left = event.changedTouches[0].clientX + x + "px";
                    block.style.top = event.changedTouches[0].clientY + y + "px";

                }
                
            }

        }
    
    }, {passive: false});

});

workspace.addEventListener("click", (event) => {

    if (event.target.className !== "target") {
        resetColor();
    }

});

workspace.addEventListener("touchstart", (event) => {

    if (event.target.className !== "target") {

        blocks.forEach(block => {
            
            if (block.isActive) {

                block.style.left = block.startPosition.x + "px";
                block.style.top = block.startPosition.y + "px";

                block.style.width = block.initialSize.width;
                block.style.height = block.initialSize.height;

                resetColor();
                block.isActive = false;
                block.isMoving = false;
                isTouched = false;
                isResizing = false;

            }

        });

    }

});

function resetColor() {

    blocks.forEach(block => {
        block.style.backgroundColor = "red";
    });

}