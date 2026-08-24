export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
}

const RATE_LIMIT_KEY = 'wh_inquiry_last_submit';
const RATE_LIMIT_SECONDS = 10;

export function validateEmailAndAntiBot(email: string, honeypotValue: string = ''): EmailValidationResult {
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return { isValid: false, error: 'Automated bot activity detected.' };
  }

  const cleanEmail = email.trim().toLowerCase();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. user@gmail.com, outlook, or company domain).' };
  }

  const domain = cleanEmail.split('@')[1];
  const disposableDomains = [
    'tempmail.com', 'temp-mail.org', 'mailinator.com', '10minutemail.com',
    'dispostable.com', 'yopmail.com', 'guerrillamail.com', 'trashmail.com',
    'getnada.com', 'sharklasers.com', 'throwawaymail.com', 'mytemp.email',
    'mohmal.com', 'maildrop.cc', 'crazymailing.com', 'bupmail.com', 'generator.email',
    'fakemailgenerator.com', 'emailondeck.com', 'tempmailo.com'
  ];

  if (disposableDomains.includes(domain)) {
    return { isValid: false, error: 'Disposable/temporary emails are not allowed. Please use Gmail, Outlook, Yahoo, or a business domain.' };
  }

  try {
    const lastSubmit = sessionStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmit) {
      const timePassed = (Date.now() - parseInt(lastSubmit, 10)) / 1000;
      if (timePassed < RATE_LIMIT_SECONDS) {
        return { isValid: false, error: `Please wait ${Math.ceil(RATE_LIMIT_SECONDS - timePassed)} seconds before submitting another inquiry.` };
      }
    }
  } catch (e) {}

  return { isValid: true };
}

export function recordSuccessfulSubmission() {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
  } catch (e) {}
}
