const feedbackContainer = document.getElementById("feedback-container");
const thankyouContainer = document.getElementById("thankyou-container");
const ratingButtons = document.querySelectorAll(".rating-btn");
const submitButton = document.querySelector(".submit-btn");
const button = document.getElementById("myButton");
let selectedRating = null;

ratingButtons.forEach(button => {
    button.addEventListener("click", function () {
        ratingButtons.forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");
        selectedRating = this.getAttribute("data-value");
    });
});

submitButton.addEventListener("click", function () {
    if (selectedRating) {
        feedbackContainer.style.display = "none";
        thankyouContainer.style.display = "block";
        document.getElementById("selected-rating").textContent = selectedRating;
    } else {
        alert("Iltimos, reyting tanlang!");
    }
});

button.addEventListener("click", function () {
    button.style.backgroundColor = "white";
    button.style.color = "black";
});