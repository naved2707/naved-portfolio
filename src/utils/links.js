export function whatsappUrl({ number, message = '' }) {
  const digits = number.replace(/[\s()+-]/g, '');
  if (!/^[1-9]\d{6,14}$/.test(digits)) return '';
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
