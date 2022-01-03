const text = document.querySelector(".quote"),
  button = document.querySelector("button"),
  author = document.querySelector(".name"),
  speech = document.querySelector(".speech"),
  copy = document.querySelector(".copy"),
  twitter = document.querySelector(".twitter"),
  synth = speechSynthesis;
wrap = document.querySelector(".wrapper");
body1 = document.querySelector(".bo");

function randomQuote() {
  button.classList.add("loading");
  button.innerText = "Loading Quote...";
  fetch("http://api.quotable.io/random")
    .then((response) => response.json())
    .then((result) => {
      text.innerText = result.content;
      author.innerText = result.author;

      var red = Math.round(Math.random() * 255);
      var blue = Math.round(Math.random() * 255);
      var green = Math.round(Math.random() * 255);
      var bg = "background:rgb(" + red + "," + green + "," + blue + ");";
      var colors = [
        "#F0F8FF",
        "#FAEBD7",
        "#F5F5DC",
        "#F0FFFF",
        "#FFEBCD",
        "#FFF8DC",
        "#A9A9A9",
        "#8FBC8F",
        "#FFFAF0",
        "#DCDCDC",
        "#F8F8FF",
        "#F0FFF0",
        "#FFFFF0",
        "#F0E68C",
        "#E6E6FA",
        "#FFF0F5",
        "#FFFACD",
        "#E0FFFF",
        "#D3D3D3",
        "#FFFFE0",
        "#FAF0E6",
        "#FFE4E1",
        "#FFDEAD",
        "#FFEFD5",
        "#FFC0CB",
        "#FFFAFA",
        "#F5F5F5",
      ];
      var random_color = colors[Math.floor(Math.random() * colors.length)];
      wrap.style.background = random_color;
      body1.style = bg;
      button.classList.remove("loading");
      button.innerText = "New Quote";
    });
}
speech.addEventListener("click", () => {
  if (!button.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${text.innerText} by ${author.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speech.classList.remove("active")
        : speech.classList.add("active");
    }, 10);
  }
});

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(text.innerText);
});

twitter.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${text.innerText}`;
  window.open(tweetUrl, "_blank");
});

button.addEventListener("click", randomQuote);
