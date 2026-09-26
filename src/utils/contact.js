export function validateContact(values, minLength = 20) {
  const errors = {};
  const name = (values.name || '').trim();
  const email = (values.email || '').trim();
  const subject = (values.subject || '').trim();
  const message = (values.message || '').trim();
  if (name.length < 2 || name.length > 80) errors.name = 'Please enter a name between 2 and 80 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) errors.email = 'Please enter a valid email address.';
  if (subject.length < 3 || subject.length > 120 || /[\r\n]/.test(subject)) errors.subject = 'Use a subject between 3 and 120 characters.';
  if (message.length < minLength || message.length > 5000) errors.message = `Please write between ${minLength} and 5,000 characters.`;
  return errors;
}

export function createMessageText(values) {
  return `To: Mohammad Naved\nFrom: ${values.name.trim()} <${values.email.trim()}>\nSubject: ${values.subject.trim()}\n\n${values.message.trim()}\n`;
}

export function downloadMessage(values) {
  const blob = new Blob([createMessageText(values)], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'message-for-mohammad-naved.txt';
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
