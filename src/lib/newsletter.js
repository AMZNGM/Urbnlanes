'use server'

/**
 * Server action to handle newsletter subscription.
 *
 * @param {any} prevState - The previous state of the form.
 * @param {FormData} formData - The form data submitted.
 * @returns {Promise<{success: boolean, message: string, errors?: {email?: string}}>}
 */
export async function subscribeToNewsletter(prevState, formData) {
  const email = formData.get('email')

  // 1. Basic Validation
  if (!email || typeof email !== 'string') {
    return {
      success: false,
      message: 'Email is required.',
      errors: { email: 'Email is required.' },
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Invalid email address.',
      errors: { email: 'Please enter a valid email address.' },
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
      message: 'Thank you for subscribing!',
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }
}
