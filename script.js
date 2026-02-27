// ===================== EMAILJS CONTACT FORM =====================
// Credentials — do not commit secrets here if you ever move to a backend.
// Public keys are safe to expose in client-side code per EmailJS documentation.
(function () {
  const PUBLIC_KEY  = 'Erk2S7v24drzTzV-D';
  const SERVICE_ID  = 'service_sx827tt';
  const TEMPLATE_ID = 'template_ctkrw3p';

  // Initialise EmailJS with your public key
  emailjs.init({ publicKey: PUBLIC_KEY });

  const form    = document.getElementById('contact-form');
  const btn     = document.getElementById('form-submit');
  const status  = document.getElementById('form-status');

  if (!form) return; // Guard: only run on pages that have the form

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic HTML5 validity check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Loading state
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    status.className = '';

    // Build the template parameters.
    // Make sure these names match the variables in your EmailJS template
    // (e.g. {{from_name}}, {{from_email}}, {{company}}, {{message}}).
    const templateParams = {
      name:  document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      company:    document.getElementById('company').value.trim(),
      message:    document.getElementById('message').value.trim(),
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(function () {
        status.textContent = 'Your message has been sent. We\'ll get back to you shortly!';
        status.className = 'form-status--success';
        form.reset();
      })
      .catch(function (error) {
        console.error('EmailJS error:', error);
        status.textContent = 'Something went wrong. Please try again or email us directly at contact@boostedsignals.com.';
        status.className = 'form-status--error';
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = 'Send Message';
      });
  });
})();
