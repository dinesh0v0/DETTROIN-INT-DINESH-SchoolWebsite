import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { SectionNav } from '@/components/SectionNav';
import { SEO } from '@/components/SEO';
import { Briefcase, Users, Award, Megaphone, Upload, FileText, X } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function JoinUs() {
  const sections = ['Overview', 'Vacancy', 'Why Join Us', 'Registration'];

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // File state for the resume upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (fileInputRef.current) {
        // Create a DataTransfer to set the file on the input
        const dt = new DataTransfer();
        dt.items.add(file);
        fileInputRef.current.files = dt.files;
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setFormStatus('error');
      setStatusMessage('Please upload your resume (PDF, DOC, or DOCX).');
      return;
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFormStatus('error');
      setStatusMessage('File size exceeds the 5MB limit.');
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type) && !selectedFile.name.match(/\.(pdf|doc|docx)$/i)) {
      setFormStatus('error');
      setStatusMessage('Invalid file type. Only PDF, DOC, and DOCX are accepted.');
      return;
    }

    setFormStatus('loading');
    setStatusMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    // Ensure the file is attached under the key 'resume'
    formData.set('resume', selectedFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs`, {
        method: 'POST',
        // Do NOT set Content-Type header; browser sets it with boundary for multipart
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        const errMsg =
          json.errors?.length > 0 ? json.errors.join(' ') : json.message || 'Submission failed.';
        throw new Error(errMsg);
      }

      setFormStatus('success');
      setStatusMessage(json.message);
      form.reset();
      setSelectedFile(null);
    } catch (err: unknown) {
      setFormStatus('error');
      setStatusMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="flex-1 w-full bg-canvas-primary">
      <SEO
        title="Join Us — Careers"
        description="Explore teaching and staff vacancies at Krishna International School, Aligarh. Join a collaborative team committed to shaping future leaders."
        keywords="school jobs, teaching vacancies, KIS careers, school recruitment Aligarh"
        path="/join-us"
      />
      <SectionNav sections={sections} />
      
      <div className="container mx-auto px-4 md:px-6 py-20" id="overview">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="flex flex-col gap-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight leading-[0.85]"
            >
              Join KIS <br/> Team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-body text-lg max-w-lg border-l-4 border-accent-primary pl-4"
            >
              We are always looking for passionate, dedicated, and innovative educators and staff to join our community. At KIS, we believe in nurturing talent and providing a collaborative environment for professional growth. Be part of shaping the future.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <Card className="p-4 bg-accent-primary">
              <div className="w-full aspect-[4/3] border-brutal overflow-hidden bg-white">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Team collaboration" className="w-full h-full object-cover" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Vacancy */}
        <section id="vacancy" className="mb-24 pt-12 border-t-2 border-ink">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-6 md:mb-8">Current Vacancies</h2>
          <div className="border-brutal bg-canvas-alternate">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto scrollbar-hide">
              <table className="w-full text-left font-body whitespace-nowrap min-w-[800px]">
                <thead className="bg-accent-primary text-white border-b-2 border-ink font-display uppercase tracking-wider text-sm">
                  <tr>
                    <th className="p-4 border-r-2 border-ink">Position</th>
                    <th className="p-4 border-r-2 border-ink">Department</th>
                    <th className="p-4 border-r-2 border-ink">Location</th>
                    <th className="p-4 text-center">Apply</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-ink font-medium">
                  {[
                    { pos: "Teacher - Science", dept: "Academics", loc: "Aligarh" },
                    { pos: "Teacher - Mathematics", dept: "Academics", loc: "Aligarh" },
                    { pos: "Sports Coach", dept: "Sports", loc: "Aligarh" },
                    { pos: "Administrative Assistant", dept: "Administration", loc: "Aligarh" },
                    { pos: "Librarian", dept: "Library", loc: "Aligarh" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-canvas-alternate transition-colors">
                      <td className="p-4 border-r-2 border-ink font-display">{row.pos}</td>
                      <td className="p-4 border-r-2 border-ink">{row.dept}</td>
                      <td className="p-4 border-r-2 border-ink">{row.loc}</td>
                      <td className="p-4 text-center">
                        <Button size="sm" className="bg-accent-primary hover:bg-accent-primary-hover" onClick={() => {
                          const el = document.getElementById('registration');
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.scrollY - 120;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }}>Apply Now</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden flex flex-col divide-y-2 divide-ink font-body">
              {[
                { pos: "Teacher - Science", dept: "Academics", loc: "Aligarh" },
                { pos: "Teacher - Mathematics", dept: "Academics", loc: "Aligarh" },
                { pos: "Sports Coach", dept: "Sports", loc: "Aligarh" },
                { pos: "Administrative Assistant", dept: "Administration", loc: "Aligarh" },
                { pos: "Librarian", dept: "Library", loc: "Aligarh" }
              ].map((row, idx) => (
                <div key={idx} className="p-5 flex flex-col gap-4 bg-canvas-alternate/30">
                  <h3 className="font-display text-xl tracking-tight text-accent-primary">{row.pos}</h3>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2">
                      <span className="text-ink/70 text-sm uppercase font-display tracking-wider">Department</span>
                      <span className="font-medium text-right">{row.dept}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <span className="text-ink/70 text-sm uppercase font-display tracking-wider">Location</span>
                      <span className="font-medium text-right">{row.loc}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full bg-accent-primary hover:bg-accent-primary-hover mt-2" onClick={() => {
                    const el = document.getElementById('registration');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 120;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}>Apply Now</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section id="why-join-us" className="mb-24 pt-12 border-t-2 border-ink">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-6 md:mb-8">Why Join Us</h2>
          <div className="flex flex-col gap-4">
            {[
              { title: "PROFESSIONAL DEVELOPMENT", desc: "Continuous learning opportunities", icon: Briefcase },
              { title: "COLLABORATIVE CULTURE", desc: "Supportive team environment", icon: Users },
              { title: "COMPETITIVE BENEFITS", desc: "Attractive compensation and perks", icon: Award },
              { title: "IMPACTFUL WORK", desc: "Shape the minds of future leaders", icon: Megaphone }
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="flex items-center gap-4 p-4 bg-canvas-alternate hover:bg-canvas-primary transition-colors">
                  <div className="w-12 h-12 border-brutal bg-canvas-primary flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg lg:text-xl uppercase">{item.title}: <span className="font-body font-normal text-ink/80 normal-case text-base">{item.desc}</span></h4>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section id="registration" className="pt-12 border-t-2 border-ink">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-6 md:mb-8">Application Form</h2>
          <Card className="p-8 md:p-12 bg-canvas-alternate max-w-4xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-display text-sm uppercase tracking-wider">Full Name</label>
                  <input required name="fullName" type="text" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-display text-sm uppercase tracking-wider">Email Address</label>
                  <input required name="email" type="email" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-display text-sm uppercase tracking-wider">Phone Number</label>
                  <input required name="phoneNumber" type="tel" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-display text-sm uppercase tracking-wider">Position Applied For</label>
                  <select required name="positionAppliedFor" className="h-12 border-brutal px-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate appearance-none rounded-none">
                    <option value="">Select a position...</option>
                    <option value="science">Teacher - Science</option>
                    <option value="math">Teacher - Mathematics</option>
                    <option value="sports">Sports Coach</option>
                    <option value="admin">Administrative Assistant</option>
                    <option value="library">Librarian</option>
                  </select>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Upload Resume (PDF/DOC/DOCX — max 5MB)</label>
                {selectedFile ? (
                  // File selected preview
                  <div className="border-brutal border-2 border-accent-primary bg-canvas-alternate p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-6 h-6 text-accent-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="font-body text-sm font-medium truncate">{selectedFile.name}</p>
                        <p className="font-body text-xs text-ink/60">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="shrink-0 w-8 h-8 flex items-center justify-center border-brutal hover:bg-red-50 transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ) : (
                  // Drop zone
                  <div
                    className="border-brutal border-dashed bg-canvas-alternate p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-canvas-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                  >
                    <Upload className="w-8 h-8 text-ink/50" />
                    <span className="font-body text-sm font-medium text-ink/70">Click to upload or drag &amp; drop</span>
                    <span className="font-body text-xs text-ink/50">PDF, DOC, DOCX up to 5MB</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-display text-sm uppercase tracking-wider">Cover Letter</label>
                <textarea name="coverLetter" rows={4} className="border-brutal p-4 font-body focus:outline-none focus:ring-2 focus:ring-accent-primary bg-canvas-alternate resize-none" />
              </div>

              {/* Status Messages */}
              {formStatus === 'success' && (
                <div className="border-2 border-green-600 bg-green-50 p-4 font-body text-green-800 text-sm">
                  ✅ {statusMessage}
                </div>
              )}
              {formStatus === 'error' && (
                <div className="border-2 border-red-600 bg-red-50 p-4 font-body text-red-800 text-sm">
                  ❌ {statusMessage}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="mt-4 text-xl bg-accent-primary hover:bg-accent-primary-hover"
                disabled={formStatus === 'loading'}
              >
                {formStatus === 'loading' ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </Card>
        </section>

      </div>
    </div>
  );
}
