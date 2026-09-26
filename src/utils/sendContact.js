import axios from 'axios';

export function contactMode(contact, email) {
  if (contact.provider === 'web3forms') return 'web3forms';
  return contact.endpoint ? 'send' : email ? 'email' : 'draft';
}

export async function sendContact(values, contact, { signal, client = axios } = {}) {
  const web3forms = contact.provider === 'web3forms';
  if (web3forms && !contact.accessKey) throw new Error('Message delivery is not configured. Please use email or WhatsApp.');
  const fields = Object.fromEntries(['name', 'email', 'subject', 'message'].map(key => [key, values[key].trim()]));
  const payload = web3forms ? {
    ...fields,
    access_key: contact.accessKey,
    from_name: 'Mohammad Naved · Portfolio',
    subject: `Portfolio enquiry: ${fields.subject}`,
    botcheck: Boolean(values.website),
  } : { ...fields, website: values.website || '' };
  try {
    const response = await client.post(web3forms ? 'https://api.web3forms.com/submit' : contact.endpoint, payload, {
      timeout: 20000, signal, headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    if (!(web3forms ? response.data?.success === true : response.data?.ok === true)) {
      throw new Error('The message service did not accept your submission. Please try again or contact me directly.');
    }
  } catch (error) {
    if (axios.isCancel(error)) throw error;
    if (error.response?.status === 429) throw new Error('Too many attempts. Please wait a few minutes, or contact me by email or WhatsApp.');
    if (error.response?.status === 400 || error.response?.status === 403) throw new Error('The message service could not accept this request. Please use email or WhatsApp to reach me.');
    if (error.code === 'ECONNABORTED') throw new Error('Delivery could not be confirmed in time. Your message is still here. Please wait before retrying to avoid duplicates.');
    if (error.isAxiosError) throw new Error('Unable to reach the message service. Check your connection or contact me by email or WhatsApp.');
    throw error;
  }
}
