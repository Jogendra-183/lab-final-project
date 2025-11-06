import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitMessage = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully! (Demo)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-hero" data-animate="blur-up">
      <div className="contact-wrapper">
        <div className="contact-glass" data-animate="zoom-in">
          <h1 data-animate="fade-up">Let’s Start a Conversation</h1>
          <p className="tagline" data-animate="fade-up">We’re here to create, collaborate, and connect.</p>

          <form onSubmit={submitMessage} className="contact-form-premium" data-animate="fade-up">
            <label>Your Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g., Alex Doe" required />
            <label>Your Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            <label>Your Message</label>
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} placeholder="Tell us how we can support you..." required />
            <button type="submit" className="btn-premium">Send Message</button>
          </form>

          <div className="social-links" data-animate="fade-up">
            <p>Follow Us</p>
            <div className="icons">
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
