/* =========================================
   SETTINGS
========================================= */

const CONFIG = {
    passcode: "150726",

    friendName: "Vasundra",

    yourName: "samrat",

    songTitle: "W♡men 💀",

    artistName: "YOUR ARTIST"
};


/* =========================================
   DOM ELEMENTS
========================================= */

const lockScreen =
    document.getElementById("lockScreen");

const app =
    document.getElementById("app");

const pageContainer =
    document.getElementById("pageContainer");

const pinDots =
    [
        ...document.querySelectorAll(
            "#pinDots span"
        )
    ];

const pinMessage =
    document.getElementById("pinMessage");

const homeButton =
    document.getElementById("homeButton");

const soundButton =
    document.getElementById("soundButton");

const audioPlayer =
    document.getElementById("audioPlayer");

const toast =
    document.getElementById("toast");


/* =========================================
   PASSCODE
========================================= */
/* =========================================
   PASSCODE
========================================= */

// IMPORTANT: this was missing in your code
let enteredCode = "";

const keypad =
    document.getElementById("keypad");


keypad.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");

        if (!button) return;


        const number =
            button.dataset.number;

        const action =
            button.dataset.action;


        // Add number
        if (
            number !== undefined &&
            enteredCode.length <  6
               ) {
            enteredCode += number;
        }


        // Delete number
        if (action === "delete") {
            enteredCode =
                enteredCode.slice(0, -1);
        }


        // Update circles
        updatePinDots();


        // Check automatically after 4 digits
        if (enteredCode.length === 6) {

            checkPasscode();

        }
    }
);


/* =========================================
   UPDATE PIN DOTS
========================================= */

function updatePinDots() {

    pinDots.forEach(
        function (dot, index) {

            dot.classList.toggle(
                "filled",
                index < enteredCode.length
            );

        }
    );
}


/* =========================================
   CHECK PASSCODE
========================================= */

function checkPasscode() {

    // CORRECT PASSWORD
    if (enteredCode === CONFIG.passcode) {

        pinMessage.textContent =
            "Unlocked ♡";


        // Open website FIRST
        lockScreen.classList.add(
            "hidden"
        );

        app.classList.remove(
            "hidden"
        );


        // Load home page
        loadPage("home");


        // Effects
        createEffects(25);


        // Play song after correct password
        if (audioPlayer) {

            audioPlayer.volume = 0.7;

            audioPlayer.play()
                .then(function () {

                    console.log(
                        "Song started successfully 🎵"
                    );

                })
                .catch(function (error) {

                    console.error(
                        "Song play error:",
                        error
                    );

                    showToast(
                        "Tap ♪ to start music"
                    );

                });
        }


        return;
    }


    // WRONG PASSWORD
    pinMessage.textContent =
        "Wrong code... try again 💌";


    // Reset entered code
    enteredCode = "";


    // Reset circles
    updatePinDots();


    // Shake animation
    const lockCard =
        document.querySelector(
            ".lock-card"
        );


    if (lockCard) {

        lockCard.animate(
            [
                {
                    transform:
                        "translateX(0)"
                },

                {
                    transform:
                        "translateX(-8px)"
                },

                {
                    transform:
                        "translateX(8px)"
                },

                {
                    transform:
                        "translateX(0)"
                }
            ],
            {
                duration: 300
            }
        );
    }
}
/* =========================================
   AJAX PAGE LOADER
========================================= */

async function loadPage(pageName) {

    showLoader();


    try {

        const response =
            await fetch(
                `pages/${pageName}.html`
            );


        if (!response.ok) {

            throw new Error(
                "Page could not be loaded."
            );
        }


        const html =
            await response.text();


        pageContainer.innerHTML =
            html;


        homeButton.classList.toggle(
            "hidden",
            pageName === "home"
        );


        bindPageEvents(
            pageName
        );


    } catch (error) {

        pageContainer.innerHTML = `
            <section class="ajax-page">

                <p class="eyebrow">
                    SOMETHING WENT WRONG
                </p>

                <h1 class="page-title">
                    Page could not load
                </h1>

                <p class="page-subtitle">
                    Run this project with
                    VS Code Live Server.
                    Fetch/AJAX usually does not
                    work by double-clicking
                    index.html.
                </p>

                <button
                    class="primary-button"
                    onclick="loadPage('home')"
                >
                    Go Home
                </button>

            </section>
        `;


        console.error(
            error
        );
    }
}


function showLoader() {

    pageContainer.innerHTML = `
        <div class="loader">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
}


/* =========================================
   PAGE EVENT SYSTEM
========================================= */

function bindPageEvents(pageName) {

    bindNavigationButtons();


    if (pageName === "gifts") {
        setupGifts();
    }


    if (pageName === "memories") {
        setupMemories();
    }


    if (pageName === "reasons") {
        setupReasons();
    }


    if (pageName === "music") {
        setupMusicPage();
    }


    if (pageName === "final") {
        createEffects(35);
    }


    replaceDynamicText();
}


/* =========================================
   NAVIGATION
========================================= */

function bindNavigationButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-page]"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const page =
                        button.dataset.page;


                    loadPage(
                        page
                    );

                }
            );

        }
    );
}


homeButton.addEventListener(
    "click",
    function () {

        loadPage(
            "home"
        );

    }
);


/* =========================================
   DYNAMIC TEXT
========================================= */

function replaceDynamicText() {

    document
        .querySelectorAll(
            "[data-friend-name]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    CONFIG.friendName;

            }
        );


    document
        .querySelectorAll(
            "[data-your-name]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    CONFIG.yourName;

            }
        );


    document
        .querySelectorAll(
            "[data-song-title]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    CONFIG.songTitle;

            }
        );


    document
        .querySelectorAll(
            "[data-artist-name]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    CONFIG.artistName;

            }
        );
}


/* =========================================
   GIFTS
========================================= */

/* =========================================
   GIFTS
========================================= */

function setupGifts() {

    const content =
        document.getElementById("giftContent");

    const phone =
        "8999286657"; // Example: 919876543210


    function openWhatsApp(message) {

        const url =
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }


    // -----------------------
    // BIRYANI
    // -----------------------

    document
        .getElementById("giftBiryani")
        .addEventListener("click", function () {

            content.classList.add("show");

            content.innerHTML = `

                <h2>🍗 Chicken Biryani</h2>

                <p>
                    Hey... ❤️
                    <br><br>

                    Will you come with me
                    to eat Chicken Biryani?
                </p>

                <br>

                <button
                    class="primary-button"
                    id="biryaniYes"
                >
                    ❤️ Yes
                </button>

                <button
                    class="secondary-button"
                    id="biryaniNo"
                >
                    😊 Maybe
                </button>

            `;

            document
                .getElementById("biryaniYes")
                .addEventListener("click", function () {

                    openWhatsApp(
                        "Yes ❤️ I will come with you for Chicken Biryani."
                    );

                });

            document
                .getElementById("biryaniNo")
                .addEventListener("click", function () {

                    openWhatsApp(
                        "Maybe 😊 We will plan another day."
                    );

                });

        });



    // -----------------------
    // CHOCOLATE
    // -----------------------

    document
        .getElementById("giftChocolate")
        .addEventListener("click", function () {

            content.classList.add("show");

            content.innerHTML = `

                <h2>🍫 Dairy Milk Silk</h2>

                <p>
                    Do you want a 
                     Dairy Milk Silk? 🍫
                </p>

                <br>

                <button
                    class="primary-button"
                    id="buyChocolate"
                >
                    🍫 Yes
                </button>

                <button
                    class="secondary-button"
                    id="laterChocolate"
                >
                    😅 Later
                </button>

            `;

            document
                .getElementById("buyChocolate")
                .addEventListener("click", function () {

                    openWhatsApp(
                        "Yes 🍫 I will buy you a Dairy Milk Silk."
                    );

                });

            document
                .getElementById("laterChocolate")
                .addEventListener("click", function () {

                    openWhatsApp(
                        "Later 😅 I promise."
                    );

                });

        });



    // -----------------------
    // OFFLINE GIFT
    // -----------------------

    document
        .getElementById("giftOffline")
        .addEventListener("click", function () {

            content.classList.add("show");

            content.innerHTML = `

                <h2>🎁 One Last Wish</h2>

                <p>
                    When we meet...
                    <br><br>

                   do you want? ❤️
                </p>

                <br>

                <button
                    class="primary-button"
                    id="giftYes"
                >
                    ❤️ Of Course
                </button>

                <button
                    class="secondary-button"
                    id="giftNo"
                >
                    🤔 I'll Think
                </button>

            `;

            document
                .getElementById("giftYes")
                .addEventListener("click", function () {

                    openWhatsApp(
                        "Of course ❤️ I will bring you a surprise gift."
                    );

                });

            document
                .getElementById("giftNo")
                .addEventListener("click", function () {

                    openWhatsApp(
                        "I'll think about the surprise gift 😊"
                    );

                });

        });

}


    document
        .querySelectorAll(
            "[data-gift]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const gift =
                            button.dataset.gift;


                        result.innerHTML =
                            messages[gift];


                        result.classList.add(
                            "show"
                        );


                        createEffects(
                            10
                        );

                    }
                );

            }
        );



/* =========================================
   MEMORIES
========================================= */

function setupMemories() {

    document
        .querySelectorAll(
            ".memory-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const targetId =
                            button.dataset.target;


                        const target =
                            document.getElementById(
                                targetId
                            );


                        target.classList.toggle(
                            "open"
                        );

                    }
                );

            }
        );
}


/* =========================================
   REASONS
========================================= */

function setupReasons() {

    const reasons = [

        "मनाने चांगली, पण रिप्लायमध्ये थोडी “प्रिमियम” 😜",

        "स्पोर्ट्समध्ये ऑलराउंडर आणि मेसेज रिप्लायमध्ये स्पीड कंट्रोल मोडवर 🚦😂",

        "राग नाही येत तिला… फक्त तिचा नॉर्मल मोडच थोडा रागीट वाटतो. 😎",

        "क्रश आहे की नाही हे अजूनही महाराष्ट्रातील सर्वात मोठं रहस्य आहे. 🤫😜",

    ];


    let currentReason = 0;


    const number =
        document.getElementById(
            "reasonNumber"
        );


    const text =
        document.getElementById(
            "reasonText"
        );


    const nextButton =
        document.getElementById(
            "nextReason"
        );


    function showReason() {

        number.textContent =
            String(
                currentReason + 1
            ).padStart(
                2,
                "0"
            );


        text.textContent =
            reasons[currentReason];
    }


    nextButton.addEventListener(
        "click",
        function () {

            currentReason =
                (
                    currentReason + 1
                )
                %
                reasons.length;


            showReason();


            createEffects(
                5
            );
        }
    );


    showReason();
}


/* =========================================
   MUSIC
========================================= */

function setupMusicPage() {

    const playButton =
        document.getElementById(
            "playMusic"
        );


    const vinyl =
        document.getElementById(
            "vinyl"
        );


    if (!playButton) return;


    if (!audioPlayer.paused) {

        playButton.textContent =
            "❚❚";

        vinyl.classList.add(
            "playing"
        );
    }


    playButton.addEventListener(
        "click",
        async function () {

            try {

                if (audioPlayer.paused) {

                    await audioPlayer.play();


                    playButton.textContent =
                        "❚❚";


                    vinyl.classList.add(
                        "playing"
                    );

                } else {

                    audioPlayer.pause();


                    playButton.textContent =
                        "▶";


                    vinyl.classList.remove(
                        "playing"
                    );
                }

            } catch (error) {

                showToast(
                    "Add assets/song.mp3 first 🎵"
                );

            }
        }
    );
}


audioPlayer.addEventListener(
    "ended",
    function () {

        const button =
            document.getElementById(
                "playMusic"
            );


        const vinyl =
            document.getElementById(
                "vinyl"
            );


        if (button) {
            button.textContent = "▶";
        }


        if (vinyl) {
            vinyl.classList.remove(
                "playing"
            );
        }
    }
);


/* =========================================
   HEADER SOUND BUTTON
========================================= */

soundButton.addEventListener(
    "click",
    function () {

        if (audioPlayer.paused) {

            showToast(
                "Open the Music gift to play your song ♪"
            );

        } else {

            audioPlayer.pause();

            showToast(
                "Music paused"
            );
        }
    }
);


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    clearTimeout(
        toastTimer
    );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );
}


/* =========================================
   EFFECTS
========================================= */

function createEffects(
    count = 20
) {

    const layer =
        document.getElementById(
            "effectsLayer"
        );


    const symbols = [
        "♡",
        "✦",
        "✿",
        "★"
    ];


    for (
        let index = 0;
        index < count;
        index++
    ) {

        const effect =
            document.createElement(
                "span"
            );


        effect.className =
            "falling-effect";


        effect.textContent =
            symbols[
                Math.floor(
                    Math.random()
                    *
                    symbols.length
                )
            ];


        effect.style.left =
            Math.random()
            *
            100
            +
            "vw";


        effect.style.fontSize =
            (
                10
                +
                Math.random()
                *
                18
            )
            +
            "px";


        effect.style.color =
            Math.random() > 0.5
                ? "#7d3441"
                : "#d7a09e";


        effect.style.animationDuration =
            (
                3
                +
                Math.random()
                *
                4
            )
            +
            "s";


        effect.style.animationDelay =
            Math.random()
            *
            0.8
            +
            "s";


        layer.appendChild(
            effect
        );


        setTimeout(
            function () {

                effect.remove();

            },
            8000
        );
    }
}