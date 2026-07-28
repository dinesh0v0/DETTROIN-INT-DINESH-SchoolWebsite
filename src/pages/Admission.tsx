import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { SectionNav } from '@/components/SectionNav';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';
import { HelpCircle, Building2, ClipboardList, FileCheck } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// ─── Helper ───────────────────────────────────────────────────────────────────
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

export function Admission() {
  const sections = ['Overview', 'Process', 'Fee Structure', 'Enroll', 'Fee Payment'];

  // Admission form state
  const [admissionStatus, setAdmissionStatus] = useState<FormStatus>('idle');
  const [admissionMessage, setAdmissionMessage] = useState('');

  // Payment form state
  const [paymentStatus, setPaymentStatus] = useState<FormStatus>('idle');
  const [paymentData, setPaymentData] = useState<{ transactionId?: string; message?: string }>({});

  // ─── Admission Submit ────────────────────────────────────────────────────
  const handleAdmissionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdmissionStatus('loading');
    setAdmissionMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      studentName: formData.get('studentName') as string,
      email: formData.get('email') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      parentGuardianName: formData.get('parentGuardianName') as string,
      gradeApplyingFor: formData.get('gradeApplyingFor') as string,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        const errMsg =
          json.errors?.length > 0 ? json.errors.join(' ') : json.message || 'Submission failed.';
        throw new Error(errMsg);
      }

      setAdmissionStatus('success');
      setAdmissionMessage(json.message);
      form.reset();
    } catch (err: unknown) {
      setAdmissionStatus('error');
      setAdmissionMessage(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    }
  };

  // ─── Payment Submit ──────────────────────────────────────────────────────
  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPaymentStatus('loading');
    setPaymentData({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      studentId: formData.get('studentId') as string,
      email: formData.get('email') as string,
      amount: formData.get('amount') as string,
      paymentMethod: formData.get('paymentMethod') as string,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        const errMsg =
          json.errors?.length > 0 ? json.errors.join(' ') : json.message || 'Payment failed.';
        throw new Error(errMsg);
      }

      setPaymentStatus('success');
      setPaymentData({ transactionId: json.data?.transactionId, message: json.message });
      form.reset();
    } catch (err: unknown) {
      setPaymentStatus('error');
      setPaymentData({ message: err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <div className="flex-1 w-full bg-canvas-primary">
      <SEO
        title="Admission 2024-25"
        description="Apply for admission at Krishna International School, Aligarh. View fee structure, admission process, and enroll your child in a premier CBSE institution."
        keywords="school admission, KIS admission, fee structure, CBSE enrollment, school fees Aligarh"
        path="/admission"
      />
      <SectionNav sections={sections} />
      
      {/* Header */}
      <section id="overview" className="py-16 md:py-20 container mx-auto px-4 md:px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display uppercase tracking-tight mb-4"
        >
          Admission 2024-25
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl lg:text-2xl font-body max-w-2xl"
        >
          Securing your child's future with KIS
        </motion.p>
      </section>

      {/* Admission Process */}
      <section id="process" className="py-12 md:py-16 container mx-auto px-4 md:px-6 border-t-2 border-ink">
        <h2 className="font-display text-3xl md:text-4xl uppercase mb-8 md:mb-12">The Admission Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-24 left-10 right-10 h-1 bg-ink -z-10" />

          {[
            { step: 1, title: "Inquiry", desc: "Submit an online inquiry or visit us. Get a feel for KIS.", icon: HelpCircle },
            { step: 2, title: "Campus Visit", desc: "Schedule a personalized tour and meet our faculty.", icon: Building2 },
            { step: 3, title: "Assessment", desc: "Student assessment and parent interaction.", icon: ClipboardList },
            { step: 4, title: "Enrollment", desc: "Offer letter, documents, and fee payment.", icon: FileCheck }
          ].map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
              <Card className="h-full p-6 flex flex-col gap-4 bg-canvas-alternate">
                <div className="w-12 h-12 bg-ink text-white flex items-center justify-center border-brutal shrink-0 mb-2">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl uppercase tracking-tight">{item.step}. {item.title}</h3>
                <p className="font-body text-sm text-ink/80">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fee Structure */}
      <section id="fee-structure" className="py-16 md:py-24 container mx-auto px-4 md:px-6 border-t-2 border-ink">
        <h2 className="font-display text-3xl md:text-4xl uppercase mb-8 md:mb-12">Fee Structure (2024-25)</h2>
        
        <div className="border-brutal bg-canvas-primary">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto scrollbar-hide">
            <table className="w-full text-left font-body whitespace-nowrap min-w-[800px]">
              <thead className="bg-canvas-alternate border-b-2 border-ink font-display uppercase tracking-wider text-sm">
                <tr>
                  <th className="p-4 border-r-2 border-ink w-1/4">Grade Level</th>
                  <th className="p-4 border-r-2 border-ink w-1/4 text-center">Tuition Fee<br/><span className="text-xs text-ink/60 lowercase tracking-normal font-body font-normal">(Annual)</span></th>
                  <th className="p-4 border-r-2 border-ink w-1/4 text-center">Admission Fee<br/><span className="text-xs text-ink/60 lowercase tracking-normal font-body font-normal">(One-time)</span></th>
                  <th className="p-4 w-1/4 text-center">Other Charges<br/><span className="text-xs text-ink/60 lowercase tracking-normal font-body font-normal">(Annual)</span></th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-ink font-medium">
                {[
                  { grade: "Pre-Primary", tuition: "₹80,000", admission: "₹25,000", other: "₹15,000" },
                  { grade: "Primary (I-V)", tuition: "₹95,000", admission: "₹30,000", other: "₹18,000" },
                  { grade: "Middle (VI-VIII)", tuition: "₹1,10,000", admission: "₹35,000", other: "₹20,000" },
                  { grade: "Senior (IX-XII)", tuition: "₹1,30,000", admission: "₹40,000", other: "₹22,000" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-canvas-alternate/50 transition-colors">
                    <td className="p-4 border-r-2 border-ink font-display">{row.grade}</td>
                    <td className="p-4 border-r-2 border-ink text-center text-lg">{row.tuition}</td>
                    <td className="p-4 border-r-2 border-ink text-center text-lg">{row.admission}</td>
                    <td className="p-4 text-center text-lg">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col divide-y-2 divide-ink font-body">
            {[
              { grade: "Pre-Primary", tuition: "₹80,000", admission: "₹25,000", other: "₹15,000" },
              { grade: "Primary (I-V)", tuition: "₹95,000", admission: "₹30,000", other: "₹18,000" },
              { grade: "Middle (VI-VIII)", tuition: "₹1,10,000", admission: "₹35,000", other: "₹20,000" },
              { grade: "Senior (IX-XII)", tuition: "₹1,30,000", admission: "₹40,000", other: "₹22,000" }
            ].map((row, idx) => (
              <div key={idx} className="p-5 flex flex-col gap-3 bg-canvas-alternate/30">
                <h3 className="font-display text-xl uppercase tracking-tight text-accent-primary">{row.grade}</h3>
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2">
                    <span className="text-ink/70 text-sm uppercase font-display tracking-wider">Tuition <span className="text-xs lowercase normal-case font-body">(Annual)</span></span>
                    <span className="font-bold text-lg">{row.tuition}</span>
                  </div>
                  <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2">
                    <span className="text-ink/70 text-sm uppercase font-display tracking-wider">Admission <span className="text-xs lowercase normal-case font-body">(One-time)</span></span>
                    <span className="font-bold text-lg">{row.admission}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ink/70 text-sm uppercase font-display tracking-wider">Other <span className="text-xs lowercase normal-case font-body">(Annual)</span></span>
                    <span className="font-bold text-lg">{row.other}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="apply-now" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/portal#resources">
            <Button variant="outline" size="lg" className="w-full text-xl">Download Prospectus</Button>
          </Link>
          <Button size="lg" className="w-full text-xl" onClick={() => scrollToSection('enroll')}>Apply Online</Button>
        </div>
      </section>

      {/* Enroll Form */}
      <section id="enroll" className="py-16 md:py-24 container mx-auto px-4 md:px-6 border-t-2 border-ink">
        <h2 className="font-display text-3xl md:text-4xl uppercase mb-6 md:mb-8">Enroll Now</h2>
        <Card className="p-8 md:p-12 bg-canvas-alternate max-w-4xl mx-auto border-brutal-lg shadow-brutal-lg">
          <form onSubmit={handleAdmissionSubmit} className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Student Name</label>
                <input required name="studentName" type="text" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Email Address</label>
                <input required name="email" type="email" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Date of Birth</label>
                <input required name="dateOfBirth" type="date" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Parent/Guardian Name</label>
                <input required name="parentGuardianName" type="text" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Grade Applying For</label>
                <select required name="gradeApplyingFor" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate appearance-none rounded-none">
                  <option value="">Select a grade...</option>
                  <option value="pre-primary">Pre-Primary</option>
                  <option value="primary">Primary (I-V)</option>
                  <option value="middle">Middle (VI-VIII)</option>
                  <option value="senior">Senior (IX-XII)</option>
                </select>
              </div>
            </div>

            {/* Status Messages */}
            {admissionStatus === 'success' && (
              <div className="border-2 border-green-600 bg-green-50 p-4 font-body text-green-800 text-sm">
                ✅ {admissionMessage}
              </div>
            )}
            {admissionStatus === 'error' && (
              <div className="border-2 border-red-600 bg-red-50 p-4 font-body text-red-800 text-sm">
                ❌ {admissionMessage}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="mt-4 text-xl bg-accent-primary border-2 border-ink transition-colors"
              disabled={admissionStatus === 'loading'}
            >
              {admissionStatus === 'loading' ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </Card>
      </section>

      {/* Fee Payment Form */}
      <section id="fee-payment" className="py-16 md:py-24 container mx-auto px-4 md:px-6 border-t-2 border-ink">
        <h2 className="font-display text-3xl md:text-4xl uppercase mb-6 md:mb-8">Fee Payment</h2>
        <Card className="p-8 md:p-12 bg-canvas-alternate max-w-4xl mx-auto border-brutal-lg shadow-brutal-lg">
          <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Student ID / Application ID</label>
                <input required name="studentId" type="text" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Email Address</label>
                <input required name="email" type="email" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Payment Amount (₹)</label>
                <input required name="amount" type="number" min="1" step="1" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-display text-sm uppercase tracking-wider">Payment Method</label>
              <select required name="paymentMethod" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate appearance-none rounded-none">
                <option value="">Select a method...</option>
                <option value="cc">Credit / Debit Card</option>
                <option value="netbanking">Net Banking</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            {/* Status Messages */}
            {paymentStatus === 'success' && (
              <div className="border-2 border-green-600 bg-green-50 p-4 font-body text-green-800 text-sm">
                ✅ {paymentData.message}
                {paymentData.transactionId && (
                  <p className="mt-1 font-display font-bold">
                    Transaction ID: <span className="font-body font-normal">{paymentData.transactionId}</span>
                  </p>
                )}
              </div>
            )}
            {paymentStatus === 'error' && (
              <div className="border-2 border-red-600 bg-red-50 p-4 font-body text-red-800 text-sm">
                ❌ {paymentData.message}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="mt-4 text-xl bg-ink text-white hover:bg-ink/90 border-2 border-ink transition-colors"
              disabled={paymentStatus === 'loading'}
            >
              {paymentStatus === 'loading' ? 'Processing...' : 'Pay Securely'}
            </Button>
          </form>
        </Card>
      </section>

    </div>
  );
}
