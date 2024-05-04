let tagsArray = [];
document.addEventListener("DOMContentLoaded", function () {
    const filterForm = document.getElementById("filterForm");
    filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let filterTag = document.getElementById("filterTag").value;
        filterTag = filterTag.trim().toLowerCase();
        filter(filterTag);
    });

    filterForm.addEventListener("reset", (event) => {
        let posts = document.querySelectorAll('.profile-post');
        posts.forEach(post => {
            post.style.display = "";
        });
    });
});


function filter(tag) {
    let posts = document.querySelectorAll('.profile-post');
    posts.forEach(post => {
        let tags = post.querySelector('.post-tags');
        if (tags) {
            if (tag === "") {
                post.parentElement.style.display = "block";
            }
            else {
                let text = tags.textContent.toLowerCase();
                let postTags = text.split(': ');
                if (postTags.length > 1) {
                    postTags = postTags[1].split(",");
                    postTags = postTags.map(t => t.trim().toLowerCase());
                    if (postTags.includes(tag)) {
                        post.style.display = '';
                    }
                    else {
                        post.style.display = 'none';
                    }
                }
            }
        }
    });
}
