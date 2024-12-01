import { init } from '@emailjs/browser';

// Initialize EmailJS with public key
init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');

export const emailConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

export function validateEmailConfig() {
    const { serviceId, templateId, publicKey } = emailConfig;

    if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS configuration is missing. Please check your environment variables.');
        return false;
    }

    return true;
}