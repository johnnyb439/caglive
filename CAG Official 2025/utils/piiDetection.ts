// PII Detection Utility for Secure Messaging
export interface PIIDetectionResult {
  hasPII: boolean
  type?: string
  message: string
}

export const detectPII = (text: string): PIIDetectionResult => {
  // Social Security Number patterns
  const ssnPatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/,  // 123-45-6789
    /\b\d{9}\b/,              // 123456789
    /\bSSN\s*[:=]?\s*\d{3}-?\d{2}-?\d{4}\b/i,  // SSN: 123-45-6789
  ]

  // Date of Birth patterns
  const dobPatterns = [
    /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/,  // MM/DD/YYYY or MM-DD-YYYY
    /\b\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}\b/,    // YYYY/MM/DD
    /\b(DOB|Date of Birth|Born)\s*[:=]?\s*\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/i,
  ]

  // Passport/ID patterns (basic 9-digit check)
  const idPatterns = [
    /\b[A-Z]{1,2}\d{6,9}\b/,  // Passport format
    /\bPassport\s*[:=]?\s*[A-Z0-9]{6,9}\b/i,
    /\b(ID|License)\s*[:=]?\s*[A-Z0-9]{6,}\b/i,
  ]

  // Email patterns (non-platform emails)
  const emailPatterns = [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  ]

  // Credit Card patterns
  const creditCardPatterns = [
    /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/,  // 1234 5678 9012 3456
    /\b\d{16}\b/,  // 1234567890123456
  ]

  // Phone number patterns (to prevent personal phone sharing)
  const phonePatterns = [
    /\b\d{3}[\s\-\.]?\d{3}[\s\-\.]?\d{4}\b/,  // 123-456-7890
    /\b\(\d{3}\)\s*\d{3}[\s\-\.]?\d{4}\b/,    // (123) 456-7890
    /\b\+?1?\s*\d{3}[\s\-\.]?\d{3}[\s\-\.]?\d{4}\b/,  // +1 123-456-7890
  ]

  // Address patterns (basic street address detection)
  const addressPatterns = [
    /\b\d+\s+[A-Za-z\s]+\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Plaza|Pl)\b/i,
  ]

  // Check each pattern type
  for (const pattern of ssnPatterns) {
    if (pattern.test(text)) {
      return {
        hasPII: true,
        type: 'SSN',
        message: 'Social Security Numbers cannot be sent through this system.'
      }
    }
  }

  for (const pattern of dobPatterns) {
    if (pattern.test(text)) {
      return {
        hasPII: true,
        type: 'DOB',
        message: 'Date of birth information cannot be shared.'
      }
    }
  }

  for (const pattern of idPatterns) {
    if (pattern.test(text)) {
      return {
        hasPII: true,
        type: 'ID',
        message: 'Passport or ID numbers are not allowed.'
      }
    }
  }

  for (const pattern of creditCardPatterns) {
    if (pattern.test(text)) {
      return {
        hasPII: true,
        type: 'Credit Card',
        message: 'Credit card information cannot be sent.'
      }
    }
  }

  for (const pattern of phonePatterns) {
    if (pattern.test(text)) {
      return {
        hasPII: true,
        type: 'Phone',
        message: 'Please do not share personal phone numbers. Recruiters will contact you through the platform.'
      }
    }
  }

  for (const pattern of addressPatterns) {
    if (pattern.test(text)) {
      return {
        hasPII: true,
        type: 'Address',
        message: 'Please do not share personal addresses for your security.'
      }
    }
  }

  // Check for email only if it's not a cleared advisory email
  for (const pattern of emailPatterns) {
    if (pattern.test(text) && !text.includes('@clearedadvisory')) {
      return {
        hasPII: true,
        type: 'Email',
        message: 'Please use the platform messaging system instead of sharing personal emails.'
      }
    }
  }

  // Context-based detection
  const sensitiveContext = [
    /my\s+(ssn|social|social security)/i,
    /my\s+(dob|birth|birthday)/i,
    /my\s+(passport|license|id\s+number)/i,
    /my\s+(address|home|street)/i,
    /here'?s?\s+my\s+(number|phone|cell)/i,
  ]

  for (const pattern of sensitiveContext) {
    if (pattern.test(text)) {
      return {
        hasPII: true,
        type: 'Context',
        message: 'Your message appears to contain sensitive personal information. Please remove it before sending.'
      }
    }
  }

  return {
    hasPII: false,
    message: 'Message is secure and ready to send.'
  }
}

// Additional helper to sanitize display of blocked content
export const sanitizeMessage = (text: string): string => {
  // Replace detected PII with [REDACTED]
  const patterns = [
    { regex: /\b\d{3}-\d{2}-\d{4}\b/g, label: '[SSN REDACTED]' },
    { regex: /\b\d{9}\b/g, label: '[ID REDACTED]' },
    { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, label: '[EMAIL REDACTED]' },
    { regex: /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/g, label: '[CARD REDACTED]' },
  ]

  let sanitized = text
  patterns.forEach(({ regex, label }) => {
    sanitized = sanitized.replace(regex, label)
  })

  return sanitized
}