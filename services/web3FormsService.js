const submitToWeb3Forms = async (data, metadata) => {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    const error = new Error('Web3Forms is not configured.');
    error.status = 500;
    throw error;
  }

  const payload = {
    access_key: accessKey,
    subject: data.subject || 'New Rynex Security contact form submission',
    from_name: data.name,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    company: data.company || '',
    message: data.message,
    timestamp: metadata.timestamp,
    ip_address: metadata.ipAddress,
    user_agent: metadata.userAgent
  };

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    const error = new Error(result.message || 'Web3Forms could not process the submission.');
    error.status = 502;
    error.web3FormsResult = result;
    throw error;
  }

  return result;
};

module.exports = { submitToWeb3Forms };
