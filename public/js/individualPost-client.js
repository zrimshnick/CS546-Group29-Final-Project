console.log("post page js is linked");

document.addEventListener("DOMContentLoaded", function () {
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');
    const errorDiv = document.getElementById('commentError');

    commentForm.addEventListener('submit', function (event) {
        const newCommentText = commentInput.value.trim();

        if (!isFormValid()){
            event.preventDefault();
        }

        function isFormValid(){
            let badComment = false;

            if (newCommentText === '' || newCommentText.length < 2 || newCommentText.length > 225){
                badComment = true;
            }

            if (newCommentText.length < 2 || newCommentText.length > 225){
                errorDiv.textContent = 'Comment must be less than 225 characters and greater than 2 characters';
                badComment = true;
            }

            if (badComment === true){
                return false;
            }

            errorDiv.textContent = "";
            return true;
        }
    });
});