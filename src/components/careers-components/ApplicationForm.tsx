'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { Upload, CheckCircle2 } from 'lucide-react'
import TText from '@/translations/TText'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function ApplicationForm({ role }: { role: string }) {
  let { t } = useTranslation()
  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    linkedin: '',
    message: '',
  })
  let [file, setFile] = useState<File | null>(null)
  let [isSubmitting, setIsSubmitting] = useState(false)
  let [submitted, setSubmitted] = useState(false)

  let handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  let handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  let textFields = [
    { name: 'firstName', type: 'text', placeholderKey: 'careers.form.placeholderFirstName', labelKey: 'careers.form.firstName', required: true },
    { name: 'lastName', type: 'text', placeholderKey: 'careers.form.placeholderLastName', labelKey: 'careers.form.lastName', required: true },
    { name: 'email', type: 'email', placeholderKey: 'careers.form.placeholderEmail', labelKey: 'careers.form.email', required: true },
    { name: 'phone', type: 'tel', placeholderKey: 'careers.form.placeholderPhone', labelKey: 'careers.form.phone', required: true },
    { name: 'linkedin', type: 'url', placeholderKey: 'careers.form.placeholderLinkedin', labelKey: 'careers.form.linkedin', required: false },
  ]

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col justify-center items-center space-y-4 text-center p-8"
      >
        <CheckCircle2 size={48} className="text-main" />
        <h3 className="font-mono text-xl tracking-wider">
          <TText tKey="careers.form.success" />
        </h3>
        <p className="max-w-sm text-text/60 text-sm">
          <TText tKey="careers.form.successDesc" />
        </p>
        <MainBtn onClick={() => setSubmitted(false)} look="mono" size="sm" className="mt-4">
          <TText tKey="common.seeMore" />
        </MainBtn>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-x-2 space-y-6 grid md:grid-cols-2">
        {textFields.map((field) => (
          <div key={field.name}>
            <label className="block opacity-60 font-mono text-[10px] tracking-widest mb-2">
              <TText tKey={field.labelKey} />
            </label>

            <input
              required={field.required}
              name={field.name}
              type={field.type}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={t(field.placeholderKey)}
              className="w-full border focus:border-main! rounded-lg outline-none text-sm transition-colors px-3 py-2.5 placeholder-main/20"
            />
          </div>
        ))}

        <div>
          <label className="block opacity-60 font-mono text-[10px] tracking-widest mb-2">
            <TText tKey="careers.form.experience" />
          </label>

          <select
            required
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border focus:border-main! rounded-lg outline-none text-sm transition-colors px-4 py-3 appearance-none"
          >
            <option value="" disabled>
              {t('careers.form.selectExp')}
            </option>
            <option value="0-2">{t('careers.form.exp02')}</option>
            <option value="3-5">{t('careers.form.exp35')}</option>
            <option value="5-10">{t('careers.form.exp510')}</option>
            <option value="10+">{t('careers.form.exp10plus')}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block opacity-60 font-mono text-[10px] tracking-widest mb-2">
          <TText tKey="careers.form.resume" />
        </label>

        <div className="group relative">
          <input
            required
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="z-10 absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex justify-between items-center border group-hover:border-main border-dashed rounded-lg transition-colors px-3 py-4">
            <div className="flex items-center gap-3">
              <Upload size={20} className="text-main/50 group-hover:text-main transition-colors" />
              <span className="max-w-48 opacity-60 group-hover:opacity-100 text-sm truncate transition-opacity">
                {file ? file.name : t('careers.form.chooseFile')}
              </span>
            </div>
            <span className="opacity-40 text-[10px] uppercase tracking-widest">
              <TText tKey="careers.form.maxSize" />
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="block opacity-60 font-mono text-[10px] tracking-widest mb-2">
          <TText tKey="careers.form.message" />
        </label>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder={t('careers.form.placeholderMessage')}
          className="w-full border focus:border-main! rounded-lg outline-none text-sm transition-colors p-3 resize-none placeholder-main/20"
        />
      </div>

      <div className="flex justify-end pt-4">
        <MainBtn disabled={isSubmitting} type="submit" look="wideMono" size="sm">
          {isSubmitting ? <TText tKey="common.loading" /> : t('careers.form.submit')}
        </MainBtn>
      </div>
    </form>
  )
}
