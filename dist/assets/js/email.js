(function () {
  emailjs.init("qo2PBVc4hv0YvUVNO"); // Still required on the client
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("service_zx3hcp8", "template_s94cawb", this)
      .then(() => {
        document.getElementById("form-alert").classList.remove("hidden");
        form.reset();
      })
      .catch((error) => {
        alert("Failed to send message: " + error.text);
      });
  });
});
