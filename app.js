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
        // eEffects(25);


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
// Home page music
  if (pageName === "home") {

    audioPlayer.pause();

    audioPlayer.src = "./assets/song.1.mp3";

    audioPlayer.load();

    audioPlayer.play().catch(() => {});

  }

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
        // eEffects(35);
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
/* =========================================
   GIFTS
========================================= */

const SHEET_API =
"https://script.google.com/macros/s/AKfycbyXjR3Qq0MYIB7RiUHhNQBzJXBRdUF1SnauJIP1OY_y86xYkVgaXM_9PiOG1BDNIKuG/exec";

async function sendReply(gift, reply) {

    if (reply.trim() === "") {
        alert("Please type your reply ❤️");
        return;
    }

    const formData = new FormData();
    formData.append("gift", gift);
    formData.append("reply", reply);
    formData.append("browser", navigator.userAgent);

    try {

        await fetch(SHEET_API, {
            method: "POST",
            body: formData
        });

        alert("❤️ Reply Sent Successfully!");

    }catch (error) {
    console.error(error);

    alert(error);

    if (error.stack) {
        console.log(error.stack);
    }
}
    }




function setupGifts() {

    const content =
        document.getElementById("giftContent");



    // -------------------------
    // BIRYANI
    // -------------------------

    document
        .getElementById("giftBiryani")
        .onclick = function () {

        content.innerHTML = `

            <h2>🍗 Chicken Biryani</h2>

            <p>
                Hey...
                <br><br>

                Will you come with me
                to eat Chicken Biryani? ❤️
            </p>

            <textarea
                id="replyBox"
                placeholder="Type your reply here..."
            ></textarea>

            <br><br>

            <button
                class="primary-button"
                id="sendReply"
            >
                Send Reply ❤️
            </button>

        `;

        document
            .getElementById("sendReply")
            .onclick = function () {

            sendReply(
                "Chicken Biryani",
                document.getElementById("replyBox").value
            );

        };

    };



    // -------------------------
    // CHOCOLATE
    // -------------------------

    document
        .getElementById("giftChocolate")
        .onclick = function () {

        content.innerHTML = `

            <h2>🍫 Dairy Milk Silk</h2>

            <p>
                Will you buy me
                a Dairy Milk Silk? ❤️
            </p>

            <textarea
                id="replyBox"
                placeholder="Type your reply here..."
            ></textarea>

            <br><br>

            <button
                class="primary-button"
                id="sendReply"
            >
                Send Reply ❤️
            </button>

        `;

        document
            .getElementById("sendReply")
            .onclick = function () {

            sendReply(
                "Chocolate",
                document.getElementById("replyBox").value
            );

        };

    };



    // -------------------------
    // OFFLINE GIFT
    // -------------------------

    document
        .getElementById("giftOffline")
        .onclick = function () {

        content.innerHTML = `

            <h2>🎁 Surprise Gift</h2>

            <p>
                When we meet...

                <br><br>

                Will you bring me
                a surprise gift? ❤️
            </p>

            <textarea
                id="replyBox"
                placeholder="Type your reply here..."
            ></textarea>

            <br><br>

            <button
                class="primary-button"
                id="sendReply"
            >
                Send Reply ❤️
            </button>

        `;

        document
            .getElementById("sendReply")
            .onclick = function () {

            sendReply(
                "Offline Gift",
                document.getElementById("replyBox").value
            );

        };

    };

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


                        eEffects(
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


            eEffects(
                5
            );
        }
    );


    showReason();
}


/* =========================================
   MUSIC
========================================= */

/* =========================================
   MUSIC PAGE
========================================= */

function setupMusicPage() {

    // Change to the Music Page song
    audioPlayer.pause();

    audioPlayer.src = "./assets/song.2.mp3";

    audioPlayer.load();

    const playButton =
        document.getElementById("playMusic");

    const vinyl =
        document.getElementById("vinyl");


    if (!playButton) return;


    playButton.textContent = "▶";

    vinyl.classList.remove("playing");


    playButton.addEventListener(
        "click",
        async function () {

            try {

                if (audioPlayer.paused) {

                    await audioPlayer.play();

                    playButton.textContent = "❚❚";

                    vinyl.classList.add("playing");

                } else {

                    audioPlayer.pause();

                    playButton.textContent = "▶";

                    vinyl.classList.remove("playing");

                }

            }

            catch (error) {

                console.error(error);

                showToast(
                    "Music could not be played 🎵"
                );

            }

        }

    );

}



audioPlayer.addEventListener(

    "ended",

    function () {

        const playButton =
            document.getElementById("playMusic");

        const vinyl =
            document.getElementById("vinyl");


        if (playButton) {

            playButton.textContent = "▶";

        }

        if (vinyl) {

            vinyl.classList.remove("playing");

        }

    }

);