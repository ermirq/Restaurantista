const paymentModal = document.getElementById("payment-modal");
const payButton = document.querySelector(".pay-button");
const successModal = document.getElementById("success-modal");

window.onclick = function(event) {
    if (event.target === paymentModal) {
        paymentModal.style.display = "none";
    }
};

const paymentForm = document.getElementById("payment-form");

paymentForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    const cardNumber = document.getElementById("card-number").value;
    const expirationDate = document.getElementById("expiration-date").value;
    const cvv = document.getElementById("cvv").value;

    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber.replace(/\s+/g, ''))) {
        alert("Please enter a valid 16-digit card number.");
        return;
    }

    const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationDateRegex.test(expirationDate)) {
        alert("Please enter a valid expiration date in MM/YY format.");
        return;
    }

    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return;
    }

    showSuccessModal();

    paymentModal.style.display = "none";
})

const cardNumberInput = document.getElementById("card-number");
cardNumberInput.addEventListener("input", (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    input = input.substring(0, 16);
    const formattedValue = input.match(/.{1,4}/g)?.join(' ') || input;
    event.target.value = formattedValue;
});

const expirationDateInput = document.getElementById("expiration-date");
expirationDateInput.addEventListener("input", (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    input = input.substring(0, 4);

    if(input.length >= 3) {
        event.target.value = `${input.substring(0,2)}/${input.substring(2)}`;
    } else {
        event.target.value = input;
    }
})

function showSuccessModal () {
    successModal.style.display = "flex";

    clearCartItems();

    setTimeout(() => {
        successModal.style.display = "none";
    }, 5000);
}

function clearCartItems() {
    localStorage.removeItem("cart");
    
    updateCartBadge();
    renderInvoice();
}