// app/contact/page.js
'use client'
import { useState } from 'react'
import { Mail, Clock, Send, MessageSquare, HelpCircle, Bug, Lightbulb, Users, Phone, MapPin, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      title: 'Email',
      value: 'schinj98@gmail.com',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Send us an email anytime'
    },
    {
      title: 'Support Hours',
      value: 'Mon-Fri: 9AM-6PM PST',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'We\'re here to help'
    },
    {
      title: 'Response Time',
      value: 'Within 24 hours',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Quick responses guaranteed'
    }
  ]

  const subjectOptions = [
    { value: 'general', label: 'General Inquiry', icon: HelpCircle },
    { value: 'support', label: 'Technical Support', icon: Bug },
    { value: 'feedback', label: 'Feedback', icon: Lightbulb },
    { value: 'partnership', label: 'Partnership', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl text-white">
                <MessageSquare size={24} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h1>
            <p className="text-gray-600 text-lg">
              Have questions or feedback? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${info.bgColor} rounded-xl`}>
                    <Icon size={24} className={info.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-gray-900 font-medium mb-1">{info.value}</p>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick FAQ</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">How quickly will I receive a response?</h3>
                  <p className="text-sm text-gray-600">We typically respond within 24 hours during business days.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">What topics can I ask about?</h3>
                  <p className="text-sm text-gray-600">Anything related to the arcade, technical issues, or general feedback.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Is there phone support?</h3>
                  <p className="text-sm text-gray-600">Currently, we offer support via email only.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {/* Success Message */}
              {showSuccess && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <p className="text-green-800">Thank you for your message! We&apos;ll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="">Select a subject</option>
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">Minimum 20 characters</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Need immediate assistance?</h3>
            <p className="text-gray-600">Check out our <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Help Center</a> for instant answers to common questions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}