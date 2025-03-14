document.addEventListener("DOMContentLoaded", function() {
    console.log("Script loaded!");

    // Reference to the elevator door element
    const elevatorDoor = document.getElementById("elevator-door");

    // Track if elevator is currently in animation to prevent spam clicking
    let isElevatorMoving = false;

    // Button click event listeners
    document.querySelectorAll(".menu-button").forEach(button => {
        button.addEventListener("click", function() {
            const buttonId = this.id;
            pressButton(buttonId);
        });
    });

    function pressButton(buttonId) {
        console.log(`Button pressed: ${buttonId}`);

        // Handle animation for each button
        switch (buttonId) {
            case "btn-intro":
                animateButton("btn-intro", 2, 1500, "Attachments/homepageimage/kuchipachi1.png", "Attachments/homepageimage/kuchipachi0.png");
                break;

            case "btn-laser":
                animateButton("btn-laser", 1, 1000, "Attachments/homepageimage/kittylaser1.png", "Attachments/homepageimage/kittylaser0.png");
                break;

            case "btn-psi":
                animateButton("btn-psi", 3, 700, "Attachments/homepageimage/phi_pressed.png", "Attachments/homepageimage/phi0.png", true);
                break;

            case "btn-game":
                animateGameButton("btn-game");
                break;

            case "btn-books":
                animateButton("btn-books", 2, 1500, "Attachments/homepageimage/bookicon1.png", "Attachments/homepageimage/bookicon0.png");
                break;

            case "btn-meme1":
                animateButton("btn-meme1", 1, 300, "Attachments/homepageimage/face1.png", "Attachments/homepageimage/face0.png");
                break;

            case "btn-meme2":
                let memeButton = document.getElementById("btn-meme2");
                memeButton.style.backgroundImage = "url('Attachments/homepageimage/skeletonicon1.png')";
                setTimeout(() => {
                    memeButton.style.backgroundImage = "url('Attachments/homepageimage/skeletonicon0.png')"; // Reset when returning
                }, 4000); // Adjust reset time
                break;

            case "btn-info":
                console.log("Info button clicked! No animation set yet.");
                break;
        }

        // Open the elevator door
        openElevator();
    }

    function animateButton(id, flickerCount, duration, activeImage, defaultImage, eerie = false) {
        let button = document.getElementById(id);
        let count = 0;

        function flicker() {
            if (count < flickerCount * 2) {
                button.style.backgroundImage = count % 2 === 0 ? `url('${activeImage}')` : `url('${defaultImage}')`;
                count++;
                setTimeout(flicker, eerie ? duration / 2 : duration); // Faster for eerie effect
            }
        }

        flicker();
    }

    function animateGameButton(id) {
        let button = document.getElementById(id);
        let frames = [
            { src: "Attachments/homepageimage/mush1.png", width: "52px", height: "118px" },
            { src: "Attachments/homepageimage/mush2.png", width: "91px", height: "119px" },
            { src: "Attachments/homepageimage/mush3.png", width: "108px", height: "130px" },
            { src: "Attachments/homepageimage/gameicon0.png", width: "77px", height: "56px" }
        ];

        let index = 0;

        function nextFrame() {
            if (index < frames.length) {
                button.style.backgroundImage = `url('${frames[index].src}')`;
                button.style.width = frames[index].width;
                button.style.height = frames[index].height;
                index++;
                setTimeout(nextFrame, 500);
            }
        }

        nextFrame();
    }

    function openElevator() {
        if (isElevatorMoving) return; // Prevent multiple animations

        isElevatorMoving = true;
        elevatorDoor.classList.add("open");

        // Close door after 3.14s (length of animation)
        setTimeout(() => {
            elevatorDoor.classList.remove("open");
            isElevatorMoving = false;
        }, 3140);
    }
});
