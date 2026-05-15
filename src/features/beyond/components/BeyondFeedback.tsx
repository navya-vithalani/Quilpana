// src/components/beyond/BeyondFeedback.tsx
// Section 4: Feedback — closing form with backend integration placeholders

import React, { useState } from 'react';

/* ── Types ─────────────────────────────────────────────────── */

interface FeedbackFormState {
  name: string;
  contact: string;  // optional
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

/* ── Component ─────────────────────────────────────────────── */

const BeyondFeedback: React.FC = () => {
  const [form, setForm] = useState<FeedbackFormState>({
    name: '',
    contact: '',
    message: '',
  });

  const [status, setStatus] = useState<SubmitStatus>('idle');

  /* ── Field handler ───────────────────────────────────────── */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ── Submit handler ──────────────────────────────────────── */

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      /*
       * ── BACKEND INTEGRATION POINT ─────────────────────────
       * Replace this block with actual API call.
       *
       * Steps to implement:
       *  1. Check if user is logged in (read userId from auth context / localStorage)
       *  2. Attach userId to the payload if available
       *  3. POST to your feedback endpoint:
       *
       *    const payload = {
       *      userId: currentUser?.id ?? null,
       *      name: form.name,
       *      contact: form.contact || null,
       *      message: form.message,
       *    };
       *
       *    const res = await fetch('/api/feedback', {
       *      method: 'POST',
       *      headers: { 'Content-Type': 'application/json' },
       *      body: JSON.stringify(payload),
       *    });
       *
       *    if (!res.ok) throw new Error('Failed');
       *
       *  4. Optionally send email notification via your mail service
       *     (Resend, SendGrid, Nodemailer, etc.) inside the API route.
       * ─────────────────────────────────────────────────────────
       */

      // Placeholder: simulate network delay
      await new Promise(resolve => setTimeout(resolve, 900));

      setStatus('success');
      setForm({ name: '', contact: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  /* ── Render ──────────────────────────────────────────────── */

  return (
    <section className="beyond-feedback-section">
      <div className="beyond-feedback-inner">

        <p className="beyond-section-label">open channel</p>

        {/* Replace section title */}
        <h2 className="beyond-feedback-title">Send a signal</h2>

        {/* Replace with actual feedback intro text later */}
        <p className="beyond-feedback-intro">
          have ideas, suggestions, or strange thoughts about Quilpana?{' '}
          <br />
          send a signal.
        </p>

        {/* ── Form ─────────────────────────────────────────── */}
        {/* Note: intentionally not using <form> to avoid default submit behaviour in React */}
        <div className="beyond-form">

          <div className="beyond-form-row">
            {/* Name field */}
            <input
              className="beyond-input"
              type="text"
              name="name"
              placeholder="your name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              aria-label="Your name"
            />

            {/* Optional contact field */}
            {/* Can be email or any contact handle — optional */}
            <input
              className="beyond-input"
              type="text"
              name="contact"
              placeholder="email or handle (optional)"
              value={form.contact}
              onChange={handleChange}
              autoComplete="email"
              aria-label="Contact (optional)"
            />
          </div>

          {/* Message textarea */}
          <textarea
            className="beyond-textarea"
            name="message"
            placeholder="what's on your mind?"
            value={form.message}
            onChange={handleChange}
            aria-label="Message"
          />

          {/* Submit */}
          <div className="beyond-form-footer">
            <button
              className="beyond-submit-btn"
              onClick={handleSubmit}
              disabled={status === 'loading'}
              aria-label="Send feedback"
            >
              {status === 'loading' ? 'Sending…' : 'Send Feedback'}
              {status !== 'loading' && (
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Status messages */}
          <div
            className={`beyond-form-status ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`}
            role="status"
            aria-live="polite"
          >
            {status === 'success' && 'signal received — thanks ✦'}
            {status === 'error' && !form.name && 'please add your name and a message'}
            {status === 'error' && form.name && 'something went wrong — try again?'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondFeedback;