# Deployment

The public site is static HTML, CSS and JavaScript. Deploy the tracked public files to Netlify, with form detection enabled. Do not upload the ignored admin directory or its data.

The contact form uses Netlify Forms, with a honeypot. Enable email notifications for the contact form to hello@gwentdigital.co.uk in Netlify. Verify one authorised test enquiry arrives after deployment; a local static server cannot deliver enquiries. Failed HTTP responses retain the entered details and show an error.

No admin proxy or booking placeholder is configured. The call link opens an email request. Analytics remains disabled until a real GTM ID is supplied.

Run python tools/smoke_check.py and node --check assets/js/main.js before deployment.

Portfolio layouts are explicitly labelled Studio build. Add named client work, results and testimonials only with supporting evidence and permission. The mark is a vector reconstruction from the supplied written brand specification.
