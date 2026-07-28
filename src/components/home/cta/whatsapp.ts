// Shared WhatsApp deep link for the home CTAs. Matches the number used
// elsewhere in the app (see PremiumTravelAssistance / packageCTA).
const WHATSAPP_NUMBER = "919999999999";

export const whatsappLink = (
  message = "Hi! I'd like to plan a Kashmir trip. Can you help?"
) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
