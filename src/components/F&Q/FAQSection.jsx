import React, { useState } from 'react'
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { 
  QuestionMarkCircleIcon as QuestionMarkCircleIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid
} from '@heroicons/react/24/solid'

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const faqData = [
    {
      id: 'account-1',
      category: 'Account',
      question: 'How do I create a Marcus Finance account?',
      answer: 'To create your Marcus Finance account, simply click on the "Sign Up" button on our homepage. Fill in your email address, create a secure password, and provide your basic information. You\'ll receive a verification email to confirm your account and get started with our comprehensive financial tools.'
    },
    {
      id: 'account-2',
      category: 'Account',
      question: 'How do I reset my password?',
      answer: 'If you\'ve forgotten your password, click on "Forgot Password" on the login page. Enter your registered email address, and we\'ll send you a secure link to reset your password. Follow the instructions in the email to create a new password and regain access to your account.'
    },
    {
      id: 'billing-1',
      category: 'Billing',
      question: 'What payment methods do you accept?',
      answer: 'Marcus Finance accepts all major credit cards (Visa, MasterCard, American Express), PayPal, and direct bank transfers. All transactions are processed through our secure, encrypted payment system to ensure the safety of your financial information.'
    },
    {
      id: 'billing-2',
      category: 'Billing',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you have complete flexibility with your subscription. You can cancel at any time from your account settings without any penalties. Your premium features will remain active until the end of your current billing period.'
    },
    {
      id: 'technical-1',
      category: 'Technical',
      question: 'What browsers are supported for optimal performance?',
      answer: 'For the best Marcus Finance experience, we recommend using the latest versions of Chrome, Firefox, Safari, or Edge. Our platform is optimized for modern browsers and works seamlessly across desktop and mobile devices.'
    },
    {
      id: 'technical-2',
      category: 'Technical',
      question: 'Is there a mobile app available?',
      answer: 'Yes! Marcus Finance mobile apps are available for both iOS and Android devices. Download them from the App Store or Google Play Store to access all your financial tools on the go with the same powerful features as our web platform.'
    },
    {
      id: 'security-1',
      category: 'Security',
      question: 'How do I enable two-factor authentication?',
      answer: 'Enhance your account security by enabling two-factor authentication in Settings > Privacy & Security. Click "Enable 2FA" and follow the setup instructions. This adds an extra layer of protection to your financial data.'
    },
    {
      id: 'features-1',
      category: 'Features',
      question: 'What makes Marcus Finance different from other platforms?',
      answer: 'Marcus Finance combines advanced market analysis tools, insider trading insights, sector analysis, and swing trading strategies in one comprehensive platform. Our unique algorithms and real-time data provide you with actionable insights that give you a competitive edge in the financial markets.'
    },
    {
      id: 'support-1',
      category: 'Support',
      question: 'How can I contact customer support?',
      answer: 'Our dedicated support team is here to help! You can reach us through the contact form on our website, email us at support@marcusfinance.com, or use the live chat feature available in the app. We typically respond within 24 hours.'
    },
    {
      id: 'data-1',
      category: 'Data',
      question: 'How often is the market data updated?',
      answer: 'Marcus Finance provides real-time market data that updates continuously throughout trading hours. Our advanced data feeds ensure you have the most current information for making informed investment decisions, with updates happening every few seconds during market hours.'
    }
  ]

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const filteredFAQs = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category) => {
    const colors = {
      'Account': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Billing': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Technical': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Security': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Features': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Support': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'Data': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }

  return (
    <div className='w-full max-w-5xl mx-auto px-5 mt-10'>
      {/* Header */}
      <div className='text-center mb-12'>
        <div className='flex items-center justify-center gap-4 mb-6'>
          <h2 className='text-[50px] text-white font-bold'>
            Frequently Asked Questions
          </h2>
        </div>
        <p className='text-white/80 text-lg max-w-2xl mx-auto'>
          Find answers to common questions about Marcus Finance platform, features, and services
        </p>
      </div>

      {/* Search Bar */}
      {/* <div className='mb-8'>
        <div className='relative max-w-2xl mx-auto'>
          <MagnifyingGlassIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60' />
          <input
            type='text'
            placeholder='Search questions or answers...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/60'
          />
        </div>
      </div> */}

      {/* FAQ Accordion */}
      <div className='space-y-4 mb-12'>
        {filteredFAQs.length === 0 ? (
          <div className='text-center py-12'>
            <QuestionMarkCircleIcon className='h-16 w-16 text-white/40 mx-auto mb-4' />
            <h3 className='text-xl font-medium text-white mb-2'>No questions found</h3>
            <p className='text-white/60'>Try adjusting your search terms</p>
          </div>
        ) : (
          filteredFAQs.map((item) => {
            const isExpanded = expandedItems.has(item.id)
            return (
              <div
                key={item.id}
                className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/15 hover:border-white/30'
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className='w-full flex items-center justify-between p-6 text-left transition-all duration-200'
                >
                  <div className='flex items-start gap-4 flex-1'>
                    <div className='flex-shrink-0 mt-1'>
                      <QuestionMarkCircleIcon className='h-6 w-6 text-white/80' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        {item.question}
                      </h3>
                      {/* <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span> */}
                    </div>
                  </div>
                  <div className='flex-shrink-0 ml-4'>
                    {isExpanded ? (
                      <ChevronUpIcon className='h-6 w-6 text-white/80 transition-transform duration-200' />
                    ) : (
                      <ChevronDownIcon className='h-6 w-6 text-white/80 transition-transform duration-200' />
                    )}
                  </div>
                </button>
                {isExpanded && (
                  <div className='px-6 pb-6 border-t border-white/10'>
                    <div className='pt-4 pl-10'>
                      <p className='text-white/90 leading-relaxed text-base'>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Contact Support Section */}
      {/* <div className='bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center'>
        <ChatBubbleLeftRightIconSolid className='h-16 w-16 text-white/80 mx-auto mb-4' />
        <h3 className='text-2xl font-bold text-white mb-2'>Still have questions?</h3>
        <p className='text-white/80 mb-6 max-w-2xl mx-auto'>
          Our support team is here to help you succeed. Get in touch and we'll provide personalized assistance.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-white/90 transition-colors duration-200'>
            Contact Support
          </button>
          <button className='px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200'>
            Live Chat
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default FAQSection