(function ($) { 
    let editFormElement = document.getElementById("edit-form");
    if (editFormElement !== null) {
    editFormElement.addEventListener("submit", (event) => {
        if (!isFormValid()) {
        event.preventDefault();
        }

        let formData = new FormData(editFormElement);
        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let username = formData.get("username");
        let password = formData.get("password");
        let confirmPassword = formData.get("confirmPassword");
        let email = formData.get("email");
        let gender = formData.get("gender");
        let heightFt = formData.get("heightFt");
        let heightIn = formData.get("heightIn");
        let weightNum = formData.get("weightNum");
        let weightUnit = formData.get("weightUnit");
        let sports = formData.get("sports");
        let data = {};
        if (firstName) data.firstName = firstName;
        if (lastName) data.lastName = lastName;
        if (username) data.username = username;
        if (password) data.password = password;
        if (confirmPassword) data.confirmPassword = confirmPassword;
        if (email) data.email = email;
        if (gender) data.gender = gender;
        if (heightFt) data.heightFt = heightFt;
        if (heightIn) data.heightIn = heightIn;
        if (weightNum) data.weightNum = weightNum;
        if (sports) data.sports = sports;

        $.ajax({
        type: "PATCH",
        url: "profile/edit",
        dataType: json,
        data: data,
        })
        .done(function (response) {
            console.log("Edit successful");
            window.location.replace("/profile");
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            let errorMessage;
            if (xhr.responseJSON && xhr.responseJSON.message) {
            errorMessage = xhr.responseJSON.message;
            } else {
            errorMessage =
                "An error occured when trying to edit. Please try again";
            }
            $(".registerError").text(errorMessage);
        });
    })
}
})