import { useNavigate } from 'react-router-dom'
import { FileText, GraduationCap, Briefcase, Car, Home as HomeIcon, HeartHandshake, ArrowRight, ChevronRight, Calendar, Tag } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceCard from '../components/ServiceCard'
import SearchBar from '../components/SearchBar'

const popularServices = [
  { icon: FileText, title: 'Certificates', desc: 'Birth, death, income, caste and other official certificates', dept: 'Civil Registry' },
  { icon: GraduationCap, title: 'Education', desc: 'Scholarships, admissions, university registrations', dept: 'Ministry of Education' },
  { icon: Briefcase, title: 'Employment', desc: 'Job portal, skill development, employment exchanges', dept: 'Ministry of Labour' },
  { icon: Car, title: 'Transport', desc: 'Driving license, vehicle registration, permits', dept: 'Ministry of Road Transport' },
  { icon: HomeIcon, title: 'Property', desc: 'Registration, land records, tax payments', dept: 'Revenue Department' },
  { icon: HeartHandshake, title: 'Public Welfare', desc: 'Pension, ration cards, social security schemes', dept: 'Ministry of Social Justice' },
]

const announcements = [
  { date: '02 Sep 2026', category: 'Important', title: 'Digital India Week 2026 — New services launched for citizens' },
  { date: '01 Sep 2026', category: 'Update', title: 'Aadhaar-PAN linking deadline extended to 31 December 2026' },
  { date: '28 Aug 2026', category: 'Alert', title: 'Maintenance window for tax filing portal on 5 September' },
  { date: '25 Aug 2026', category: 'Info', title: 'New scholarship scheme announced for students from economically weaker sections' },
]

const steps = [
  { num: '01', title: 'Register', desc: 'Create your account with basic details' },
  { num: '02', title: 'Login', desc: 'Sign in securely to your portal' },
  { num: '03', title: 'Choose Service', desc: 'Browse and select the service you need' },
  { num: '04', title: 'Track Application', desc: 'Monitor your application status in real-time' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border" style={{ backgroundColor: 'var(--color-accent)', color: '#fff', borderColor: 'var(--color-accent)' }}>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Secure & Trusted Platform
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Citizen Services<br />
                <span style={{ color: 'var(--color-accent)' }}>Portal</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
                Access government services quickly, securely and conveniently from one place.
              </p>
              <div className="mb-8">
                <SearchBar onSearch={() => navigate('/services')} />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="group px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Login
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-3 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-200"
                >
                  Register
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {[
                { value: '50L+', label: 'Citizens Served' },
                { value: '200+', label: 'Services Online' },
                { value: '99.9%', label: 'Platform Uptime' },
                { value: '24/7', label: 'Available Always' },
              ].map(stat => (
                <div key={stat.label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Popular Services</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Quick access to the most used government services</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map(svc => (
            <ServiceCard key={svc.title} icon={svc.icon} title={svc.title} description={svc.desc} department={svc.dept} onClick={() => navigate('/services')} />
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => navigate('/services')} className="group inline-flex items-center gap-2 font-semibold text-sm transition-colors" style={{ color: 'var(--color-accent)' }}>
            View All Services <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* Announcements */}
      <section className="border-y" style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: 'var(--color-text)' }}>Important Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {announcements.map((a, i) => (
              <div key={i} className="rounded-xl border p-5 transition-all duration-200 hover:shadow-md" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{a.date}</span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-medium mb-2" style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}>
                  {a.category}
                </span>
                <h3 className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>{a.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center" style={{ color: 'var(--color-text)' }}>How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(step => (
            <div key={step.num} className="text-center p-6 rounded-xl border transition-all duration-200 hover:shadow-md" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
                {step.num}
              </div>
              <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{step.title}</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: 'var(--color-primary-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-6">Register now to access all government services from a single dashboard.</p>
          <button onClick={() => navigate('/register')} className="group px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 inline-flex items-center gap-2" style={{ backgroundColor: 'var(--color-accent)' }}>
            Create Free Account <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
