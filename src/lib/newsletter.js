'use server'

export async function subscribeToNewsletter(prevState, formData) {
  const email = formData.get('email')

  // 1. Basic Validation
  if (!email || typeof email !== 'string') {
    return {
      success: false,
      message: 'newsletter.messages.emailRequired',
      errors: { email: 'newsletter.messages.emailRequired' },
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'newsletter.messages.invalidEmail',
      errors: { email: 'newsletter.messages.invalidEmail' },
    }
  }

  // 2. Simulate API Call / DB Usage
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // TODO: Replace with actual API call to newsletter service (e.g., Mailchimp, SendGrid)
    // const response = await fetch('...', { ... })
    // if (!response.ok) throw new Error('Failed to subscribe')

    // Simulate success
    return {
      success: true,
      message: 'newsletter.messages.success',
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'newsletter.messages.error',
    }
  }
}
