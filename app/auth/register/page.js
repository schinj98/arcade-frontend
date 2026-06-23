'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { UserPlus, Mail, Lock, Phone, User, Link2, Eye, EyeOff, Bell } from 'lucide-react';

const GOOGLE_PROFILE_RE = /^https:\/\/(www\.skills\.google|www\.cloudskillsboost\.google)\/public_profiles\/[a-z0-9-]+$/i;

export default function RegisterPage() {
  const { isDarkMode } = useContext(ThemeContext);
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    google_profile_url: '',
    password: '',
    newsletter_opt_in: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const tc = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-blue-50',
    card: isDarkMode ? 'bg-slate-900 border-slate-700/50' : 'bg-white border-gray-200',
    text: isDarkMode ? 'text-slate-100' : 'text-gray-900',
    textSub: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    label: isDarkMode ? 'text-slate-300' : 'text-gray-700',
    input: isDarkMode
      ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-sky-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500',
    inputError: 'border-red-500 focus:border-red-500',
    hint: isDarkMode ? 'text-slate-500' : 'text-gray-400',
    checkbox: isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-300',
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    setError('');
  };

  const validate = () => {
    const errors = {};
    if (!form.first_name.trim()) errors.first_name = 'First name is required';
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errors.email = 'A valid email is required';
    if (!form.google_profile_url.trim() || !GOOGLE_PROFILE_RE.test(form.google_profile_url.trim()))
      errors.google_profile_url = 'Enter a valid Google Cloud public profile URL';
    if (!form.password || form.password.length < 8)
      errors.password = 'Password must be at least 8 characters';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const result = await register({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim() || null,
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        google_profile_url: form.google_profile_url.trim(),
        password: form.password,
        newsletter_opt_in: form.newsletter_opt_in,
      });
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors ${tc.input} ${fieldErrors[field] ? tc.inputError : ''}`;

  return (
    <div className={`min-h-screen ${tc.bg} flex items-center justify-center px-4 py-16`}>
      <div className={`w-full max-w-lg rounded-2xl border shadow-sm p-8 ${tc.card}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${isDarkMode ? 'bg-sky-900/40' : 'bg-blue-50'}`}>
            <UserPlus size={26} className={isDarkMode ? 'text-sky-400' : 'text-blue-600'} />
          </div>
          <h1 className={`text-2xl font-bold ${tc.text}`}>Create your account</h1>
          <p className={`mt-1 text-sm ${tc.textSub}`}>Track your Google Cloud Arcade progress</p>
        </div>

        {/* Global error */}
        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First name */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${tc.label}`} htmlFor="first_name">
                First name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${tc.textSub}`} />
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Alex"
                  className={`${inputClass('first_name')} pl-10 pr-4`}
                />
              </div>
              {fieldErrors.first_name && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.first_name}</p>
              )}
            </div>

            {/* Last name */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${tc.label}`} htmlFor="last_name">
                Last name <span className={`text-xs font-normal ${tc.hint}`}>(optional)</span>
              </label>
              <div className="relative">
                <User size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${tc.textSub}`} />
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Johnson"
                  className={`${inputClass('last_name')} pl-10 pr-4`}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${tc.label}`} htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${tc.textSub}`} />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`${inputClass('email')} pl-10 pr-4`}
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${tc.label}`} htmlFor="phone">
              Phone <span className={`text-xs font-normal ${tc.hint}`}>(optional)</span>
            </label>
            <div className="relative">
              <Phone size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${tc.textSub}`} />
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 555 000 0000"
                className={`${inputClass('phone')} pl-10 pr-4`}
              />
            </div>
          </div>

          {/* Google Cloud Profile URL */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${tc.label}`} htmlFor="google_profile_url">
              Google Cloud Profile URL <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Link2 size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${tc.textSub}`} />
              <input
                id="google_profile_url"
                name="google_profile_url"
                type="url"
                value={form.google_profile_url}
                onChange={handleChange}
                placeholder="https://www.skills.google/public_profiles/…"
                className={`${inputClass('google_profile_url')} pl-10 pr-4`}
              />
            </div>
            {fieldErrors.google_profile_url ? (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.google_profile_url}</p>
            ) : (
              <p className={`mt-1 text-xs ${tc.hint}`}>
                e.g. https://www.skills.google/public_profiles/b139c19a-…
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${tc.label}`} htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${tc.textSub}`} />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className={`${inputClass('password')} pl-10 pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${tc.textSub} hover:opacity-70`}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>
            )}
          </div>

          {/* Newsletter opt-in */}
          <label className="flex items-start gap-3 cursor-pointer pt-1 select-none">
            <div className="relative mt-0.5">
              <input
                name="newsletter_opt_in"
                type="checkbox"
                checked={form.newsletter_opt_in}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                ${form.newsletter_opt_in
                  ? 'bg-blue-600 border-blue-600'
                  : isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-300'}`}>
                {form.newsletter_opt_in && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div>
              <span className={`flex items-center gap-1.5 text-sm font-medium ${tc.label}`}>
                <Bell size={13} />
                Subscribe to our newsletter
              </span>
              <p className={`text-xs mt-0.5 ${tc.hint}`}>
                Get the latest Arcade updates, tips, and swag alerts.
              </p>
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        {/* Footer */}
        <p className={`mt-6 text-center text-sm ${tc.textSub}`}>
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className={`font-medium ${isDarkMode ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
