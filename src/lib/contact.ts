export const SITE_URL = "https://emcsolucoes.com.br";
export const WHATSAPP_NUMBER = "5598981271251";
export const WHATSAPP_DISPLAY = "(98) 98127-1251";
export const CONTACT_EMAIL = "contato@emcsolucoes.com.br";
export const GA_MEASUREMENT_ID = "G-8F2N3YCKRG";
export const CONSENT_STORAGE_KEY = "emc-cookie-consent";
export const CONSENT_EVENT = "emc-cookie-consent-change";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Quero saber mais sobre as soluções da EMC.";
