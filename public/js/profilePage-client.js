console.log("profile page js linked");

document.addEventListener("DOMContentLoaded", function () {
  // Select all placeholder elements
  var placeholders = document.querySelectorAll(
    ".profile-post-comments-placeholder"
  );

  // Add click event listener to each placeholder
  placeholders.forEach(function (placeholder) {
    placeholder.addEventListener("click", function () {
      var commentsContainer = placeholder.nextElementSibling;
      console.log(commentsContainer);

      if (commentsContainer.classList.contains("hidden")) {
        commentsContainer.classList.remove("hidden");
        commentsContainer.classList.add("flex");
        placeholder.textContent = "Close comments";
      } else {
        commentsContainer.classList.add("hidden");
        commentsContainer.classList.remove("flex");
        placeholder.textContent = "View comments";
      }
    });
  });
});
