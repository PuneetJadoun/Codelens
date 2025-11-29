import React, { useState, useEffect } from "react";
import "../styles/contact.css";
import { 
    FaEnvelope, 
    FaPaperPlane,
    FaCheckCircle 
} from 'react-icons/fa';
import FaqChatbot from './FaqChatbot';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState({ submitted: false, error: false });

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out'
        });
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus({ submitted: false, error: true });
            return;
        }

        try {
            console.log('Form submitted:', formData);
            setFormStatus({ submitted: true, error: false });
            
            setTimeout(() => {
                setFormData({ name: '', email: '', message: '' });
                setFormStatus({ submitted: false, error: false });
            }, 3000);
        } catch (error) {
            setFormStatus({ submitted: false, error: true });
        }
    };

    return (
        <div className="contact">
            {/* Contact Form Section */}
            <section className="form-section" data-aos="fade-up">
                <div className="form-container">
                    <div className="form-header">
                        <h1>Let's Start a Conversation</h1>
                        <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>
                    </div>
                    
                    <form className="contact-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-grid">
                            <div className="input-group">
                                <label htmlFor="name">
                                    Name <span className="required">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            
                            <div className="input-group">
                                <label htmlFor="email">
                                    Email <span className="required">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="input-group full-width">
                            <label htmlFor="message">
                                Message <span className="required">*</span>
                            </label>
                            <textarea 
                                id="message"
                                name="message"
                                placeholder="Tell us about your project, questions, or how we can help..."
                                rows="6"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        
                        <div className="submit-container">
                            <button 
                                type="submit" 
                                className={`submit-btn ${formStatus.submitted ? 'success' : ''}`}
                                disabled={formStatus.submitted}
                            >
                                {formStatus.submitted ? (
                                    <>
                                        <FaCheckCircle />
                                        <span>Message Sent!</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                            
                            {formStatus.error && (
                                <div className="form-error" role="alert">
                                    Please fill in all required fields correctly.
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </section>

            {/* FAQ Chatbot */}
            <section className="chatbot-section">
                <FaqChatbot />
            </section>
        </div>
    );
}
