function subscribeUser(event) {
    event.preventDefault();

    const email = document.getElementById('subscriberEmail').value;
    const isSubscribed = document.getElementById('checkbox').checked;

    if(!email || !email.includes('@')) {
        Toastify({
            text: "Please enter a valid email address.",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "red",
        }).showToast();
        return;
    }

    const subscribeUser = {
        email: email,
        subscribed: isSubscribed  
    }

    localStorage.setItem('subscriber', JSON.stringify(subscribeUser));

    Toastify({
        text: "Subscribed successfully! You are now subscribed.",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#28a745",
    }).showToast();
}

function checkSubscriptionStatus() {
    const subscriber = JSON.parse(localStorage.getItem('subscriber'));

    if(subscriber && subscriber.subscribed) {
        document.getElementById('subscriberEmail').value = subscriber.email;
    }

    Toastify({
        text: "Welcome back " + subscriber.email + "!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#28a745",
    }).showToast();
}

document.getElementById('subscribeForm').addEventListener('submit', subscribeUser);

document.addEventListener('DOMContentLoaded', checkSubscriptionStatus);
