console.log("profile page js linked");

document.addEventListener("DOMContentLoaded", function () {
  // Select all placeholder elements
  let placeholders = document.querySelectorAll(
    ".profile-post-comments-placeholder"
  );

  // Add click event listener to each placeholder
  placeholders.forEach(function (placeholder) {
    placeholder.addEventListener("click", function () {
      let commentsContainer = placeholder.nextElementSibling;
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

  const addPostButton = document.getElementById("profile-posts-create-button");
  let openPostForm = false;

  addPostButton.addEventListener("click", function () {
    if (openPostForm === true) {
      return;
    }
    else {
      let postUsername = document.getElementById("profile-personal-username").textContent.slice(1).trim();
      let postHeaderContainer = document.getElementById("profile-posts-header-container");
      let newPostForm = `
    <form action="/feed" method="POST" name="new-post-form" id="new-post-form" class="profile-post-individual">
    <input type="hidden" value="${postUsername}", id="post-username" name="username" style="hidden"></input>
    <div class="profile-post-title">Title
      <input id="post-title" name="title" type="text" placeholder="Title" class="post-title"></input>
    </div>
    <div id="post-titleError"></div>
    <div class="profile-post-body">
      <textarea id="post-body" name="body"> </textarea>
    </div>
    <div id="post-bodyError"></div>
    <div class="profile-post-tag">Tags
      <input id="post-tag" name="tags" type="text" placeholder="sport1,sport2" class="post-tag"></input>
    </div>
    <div id="post-tagError"></div>
    <div class="profile-post-button-container">
      <button id="postButton" name="postButton" type="submit" class="profile-post-post-button flex">Post</button>
      <button id="cancelPostButton" name="cancelPostButton" type="submit" class="profile-post-cancel-button flex">Cancel</button>
    </div>
    </form>`;

      postHeaderContainer.insertAdjacentHTML('afterend', newPostForm);
      openPostForm = true;

      const cancelNewPostButton = document.getElementById("cancelPostButton");
      cancelNewPostButton.addEventListener("click", function (event) {
        openPostForm = false;
        event.preventDefault();
        let newPostForm = document.getElementById('new-post-form');
        if (newPostForm) {
          newPostForm.remove();
        }
      });
    }




    const newPostFormElement = document.getElementById("new-post-form");
    console.log("checking form exists");
    if (newPostFormElement !== null) {
      console.log("form exists");
      newPostFormElement.addEventListener("submit", (event) => {
        console.log("form tried to be submitted");
        console.log(isFormValid);
        if (!isFormValid()) {
          const titleInput = document.getElementById("post-title");
          const titleError = document.getElementById("post-titleError");
          if (titleError !== null) {
            titleInput.addEventListener("input", function () {
              titleError.textContent = "";
              titleInput.classList.remove("errorBorder");
            });
          }
          const bodyInput = document.getElementById("post-body");
          const bodyError = document.getElementById("post-bodyError");
          if (bodyError !== null) {
            bodyInput.addEventListener("input", function () {
              bodyError.textContent = "";
              bodyInput.classList.remove("errorBorder");
            });
          }
          const tagsInput = document.getElementById("post-tag");
          const tagsError = document.getElementById("post-tagError");
          if (tagsError !== null) {
            tagsInput.addEventListener("input", function () {
              tagsError.textContent = "";
              tagsInput.classList.remove("errorBorder");
            });
          }
          event.preventDefault();
        }
      });
    }

    function isFormValid() {
      let badFields = false;

      const titleElement = document.getElementById("post-title");
      if (titleElement !== null) {
        let titleValue = titleElement.value;
        titleValue = titleValue.trim();
        let titleError = document.getElementById("post-titleError");
        if (!titleValue) {
          titleError.textContent = "Title must be provided";
          titleElement.classList.add("errorBorder");
          badFields = true;
        }
      }

      const bodyElement = document.getElementById("post-body");
      if (bodyElement !== null) {
        let bodyValue = bodyElement.value;
        bodyValue = bodyValue.trim();
        let bodyError = document.getElementById("post-bodyError");
        if (!bodyValue) {
          bodyError.textContent = "Post body not provided";
          bodyElement.classList.add("errorBorder");
          badFields = true;
        }
        else if(bodyValue.length < 2 || bodyValue.length > 255){
          bodyError.textContent = "Post body must be at least 2 characters and a max of 255 characters";
          bodyElement.classList.add("errorBorder");
          badFields = true;
        }
      }

      const tagsElement = document.getElementById("post-tag");
      if (tagsElement !== null) {
        let tagsValue = tagsElement.value;
        let tagsError = document.getElementById("post-tagError");
        if (tagsValue.trim().length === 0) {
          tagsError.textContent = "Tags must be provided";
          tagsElement.classList.add("errorBorder");
          badFields = true;
        }
        else {
          let t = tagsValue.replace(/,/g, '');
          let tagsArray = t.split(" ");
          for (let i = 0; i < tagsArray.length; i++) {
            if (!isNaN(tagsArray[i])) {
              tagsError.textContent = "Tags must be a sport";
              tagsElement.classList.add("errorBorder");
              badFields = true;
            }
          }
        }
      }

      if (badFields === true) {
        return false;
      }
      else {
        return true;
      }
    }
  });
});