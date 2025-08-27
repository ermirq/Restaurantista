const contactUs = document.querySelector(".email-form")

contactUs.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const subject = document.getElementById("subject").value;

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    if(!nameRegex.test(name.trim())) {
       Toastify({
        text: "Please enter a valid name without any symbols or numbers.",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "red",
    }).showToast();
    return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    if(!emailRegex.test(email.trim())) {
        Toastify({
            text: "Please enter a valid email address.",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "red",
        }).showToast();
        return;
    }

    const contact = {
        name: name,
        email: email,
        subject: subject,
        message: message
    }

    localStorage.setItem("contact", JSON.stringify(contact));

    Toastify({
        text: "Message sent successfully! We will get back to you soon.",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#28a745",
    }).showToast();

    contactUs.reset();
})