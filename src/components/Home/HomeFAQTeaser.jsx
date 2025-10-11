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

const HomeFAQTeaser = () => {
 
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const faqData = [
    {
      id: 'account-1',
      category: 'Account',
      question: '1. What is Marcus Finance?',
      answer: 'Marcus Finance is a stock market analytics platform that helps users track market trends, daily highs and lows, and short-term momentum — all in one place. It focuses on data analysis, not trading.'
    },
    {
      id: 'account-2',
      category: 'Account',
      question: '2. Can I trade or invest using Marcus Finance?',
      answer: 'No, Marcus Finance does not offer trading or brokerage services. It’s purely an analysis and insights platform to help you understand market movements before making your own decisions.'
    },
    {
      id: 'billing-1',
      category: 'Billing',
      question: '3. What kind of data and tools does Marcus Finance provide?',
      answer: 'We provide real-time market data, including day high/low values, 5-minute momentum, historical charts, and technical indicators — perfect for traders and analysts who want deep market insights without trading directly.'
    },
    
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
    <>
<div className='w-full px-5 mt-10'>
      {/* Header */}
      <div className='text-center'>
        <div className='flex items-start justify-start gap-4 mb-3'>
          <h2 className='text-[20px] dark:text-white text-black font-bold'>
            Frequently Asked Questions
          </h2>
        </div>
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
                className='dark:bg-white/10 bg-black/10 backdrop-blur-sm border dark:border-white/20 border-black/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/15 hover:border-white/30'
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className='w-full flex items-center justify-between p-6 text-left transition-all duration-200'
                >
                  <div className='flex items-start gap-4 flex-1'>
                    {/* <div className='flex-shrink-0 mt-1'>
                      <QuestionMarkCircleIcon className='h-6 w-6 dark:text-white text-black/80' />
                    </div> */}
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold dark:text-white text-black mb-2'>
                        {item.question}
                      </h3>
                      {/* <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span> */}
                    </div>
                  </div>
                  <div className='flex-shrink-0 ml-4'>
                    {isExpanded ? (
                      <ChevronUpIcon className='h-6 w-6 dark:text-white text-black/80 transition-transform duration-200' />
                    ) : (
                      <ChevronDownIcon className='h-6 w-6 dark:text-white text-black/80 transition-transform duration-200' />
                    )}
                  </div>
                </button>
                {isExpanded && (
                  <div className='px-6 pb-6 border-t border-white/10'>
                    <div className='pt-4 pl-10'>
                      <p className='dark:text-white text-black/90 leading-relaxed text-base'>
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
    </>
  )
}

export default HomeFAQTeaser


