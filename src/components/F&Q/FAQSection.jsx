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
      question: '1. What is Marcus Finance?',
      answer: 'Marcus Finance is a stock market analytics platform that provides real-time data insights such as daily highs and lows, 5-minute momentum updates, and trend analysis — helping users make informed market decisions.'
    },
    {
      id: 'account-2',
      category: 'Account',
      question: '2. Can I trade or invest directly through Marcus Finance?',
      answer: 'No. Marcus Finance is a market analysis and research platform only. We do not offer trading, investing, or brokerage services.'
    },
    {
      id: 'billing-1',
      category: 'Billing',
      question: '3. What type of market data do you provide?',
      answer: 'We offer analytical data including day high/low values, 5-minute momentum trends, price movements, and technical indicators to help users understand market behavior.'
    },
    {
      id: 'billing-2',
      category: 'Billing',
      question: '4. Is the data shown on Marcus Finance real-time?',
      answer: 'Yes, we provide real-time or near real-time market data updates depending on the data source and exchange feed.'
    },
    {
      id: 'technical-1',
      category: 'Technical',
      question: '5. Do I need to create an account to use Marcus Finance?',
      answer: 'Some features like personalized dashboards or saved watchlists may require an account, but basic market insights are accessible to all users.'
    },
    {
      id: 'technical-2',
      category: 'Technical',
      question: '6. Does Marcus Finance charge any fees or commissions?',
      answer: 'No. We do not charge any brokerage or commission since trading is not available on our platform. Our focus is purely analytical.'
    },
    {
      id: 'security-1',
      category: 'Security',
      question: '7. Can I view historical stock data?',
      answer: 'Yes. Marcus Finance provides access to historical price charts and analysis tools to study past performance and identify patterns.'
    },
    {
      id: 'features-1',
      category: 'Features',
      question: '8. What kind of analysis tools are available?',
      answer: 'We offer tools such as momentum trackers, trend lines, market sentiment indicators, and 5-minute candle summaries for short-term analysis.'
    },
    {
      id: 'support-1',
      category: 'Support',
      question: '9. Is Marcus Finance suitable for beginners?',
      answer: 'Absolutely. Our clean interface and educational insights make it ideal for both beginners and experienced market analysts.'
    },
    {
      id: 'data-1',
      category: 'Data',
      question: '10. How accurate is the market data on Marcus Finance?',
      answer: 'We source data from reliable and verified market providers to ensure accuracy and consistency, though minor delays may occur due to data feed limitations.'
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
                  aria-expanded={isExpanded}
                  aria-controls={`faq-${item.id}`}
                >
                  <div className='flex items-start gap-4 flex-1'>
                    {/* <div className='flex-shrink-0 mt-1'>
                      <QuestionMarkCircleIcon className='h-6 w-6 text-white/80' />
                    </div> */}
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
                    <ChevronDownIcon className={`h-6 w-6 text-white/80 transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
                  </div>
                </button>
                <div
                  id={`faq-${item.id}`}
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'border-t border-white/10 max-h-96 opacity-100 pb-6' : 'border-transparent max-h-0 opacity-0 pb-0'}`}
                >
                  <div className='pt-4 pl-10'>
                    <p className='text-white/90 leading-relaxed text-base'>
                      {item.answer}
                    </p>
                  </div>
                </div>
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