 window.addEventListener('load', function() {
    var btnForm = document.getElementsByClassName("signin-btn")[0];
    btnForm.addEventListener('click', function() {
        var email = document.getElementById("formEmail").value;
        var password = document.getElementById("formPassword").value;
        params = {
            email,
            password
        }

        var url = "https://mars.theblueground.net/api/auth/login";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var responseText = xhr.responseText;
                if (xhr.status === 200 && responseText) {
                    username = JSON.parse(responseText)?.user?.name;
                    document.cookie = JSON.stringify({
                        username
                    });
                    window.location.href = 'index.html';
                }
            }
        };

        var data = JSON.stringify(params);
        xhr.send(data);

    });
});