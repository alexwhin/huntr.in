(function() {
  'use strict'

var stripe = Stripe('pk_test_4NRmWSmuK3OEV3PL4GxPAeeN');

function registerElements(elements, exampleName) {
  var formClass = '.' + exampleName;
  var example = document.querySelector(formClass);

  var form = example.querySelector('form');
  var resetButton = example.querySelector('a.reset');
  var error = form.querySelector('.error');
  var errorMessage = error.querySelector('.message');

  function enableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.removeAttribute('disabled');
      }
    );
  }

  function disableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.setAttribute('disabled', 'true');
      }
    );
  }

  // Listen for errors from each Element, and show error messages in the UI.
  elements.forEach(function(element) {
    element.on('change', function(event) {
      if (event.error) {
        error.classList.add('visible');
        errorMessage.innerText = event.error.message;
      } else {
        error.classList.remove('visible');
      }
    });
  });

  // Listen on the form's 'submit' handler...
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show a loading screen...
    example.classList.add('submitting');

    // Disable all inputs.
    disableInputs();

    // Gather additional customer data we may have collected in our form.
    var name = form.querySelector('#' + exampleName + '-name');
    var address1 = form.querySelector('#' + exampleName + '-address');
    var city = form.querySelector('#' + exampleName + '-city');
    var state = form.querySelector('#' + exampleName + '-state');
    var additionalData = {
      name: name ? name.value : undefined,
      address_line1: address1 ? address1.value : undefined,
      address_city: city ? city.value : undefined,
      address_state: state ? state.value : undefined
    };

    // Use Stripe.js to create a token. We only need to pass in one Element
    // from the Element group in order to create a token. We can also pass
    // in the additional customer data we collected in our form.
    stripe.createToken(elements[0], additionalData).then(function(result) {
      // Stop loading!
      example.classList.remove('submitting');

      if (result.token) {
        // If we received a token, show the token ID.
        example.querySelector('.token').innerText = result.token.id;
        example.classList.add('submitted');
      } else {
        // Otherwise, un-disable inputs.
        enableInputs();
      }
    });
  });

  resetButton.addEventListener('click', function(e) {
    e.preventDefault();
    // Resetting the form (instead of setting the value to `''` for each input)
    // helps us clear webkit autofill styles.
    form.reset();

    // Clear each Element.
    elements.forEach(function(element) {
      element.clear();
    });

    // Reset error state as well.
    error.classList.remove('visible');

    // Resetting the form does not un-disable inputs, so we need to do it separately:
    enableInputs();
    example.classList.remove('submitted');
  });
}



//


  var elements = stripe.elements({
    fonts: [
      {
        cssSrc: "https://rsms.me/inter/inter-ui.css"
      }
    ]
  })

  /**
   * Card Element
   */
  var card = elements.create("card", {
    style: {
      base: {
        color: "#32325D",
        fontWeight: 500,
        fontFamily: "Inter UI, Open Sans, Segoe UI, sans-serif",
        fontSize: "15px",
        fontSmoothing: "antialiased",

        "::placeholder": {
          color: "#CFD7DF"
        }
      },
      invalid: {
        color: "#E25950"
      }
    }
  })

  card.mount("#example4-card")


  /**
   * Payment Request Element
   */
  var paymentRequest = stripe.paymentRequest({
    country: "US",
    currency: "usd",
    total: {
      amount: 2000,
      label: "Total"
    }
  })
  paymentRequest.on("token", function(result) {
    var example = document.querySelector(".example4")
    example.querySelector(".token").innerText = result.token.id
    example.classList.add("submitted")
    result.complete("success")
  })

  var paymentRequestElement = elements.create("paymentRequestButton", {
    paymentRequest: paymentRequest,
    style: {
      paymentRequestButton: {
        type: "donate"
      }
    }
  })

  paymentRequest.canMakePayment().then(function(result) {
    if (result) {
      document.querySelector(".example4 .card-only").style.display = "none"
      document.querySelector(
        ".example4 .payment-request-available"
      ).style.display =
        "block"
      paymentRequestElement.mount("#example4-paymentRequest")
    }
  })

  registerElements([card, paymentRequestElement], "example4")
})()
