import { useState } from 'react'
import { FileText, GraduationCap, Briefcase, Car, Home, HeartHandshake, Landmark, Users, ShieldCheck, CreditCard } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceCard from '../components/ServiceCard'
import SearchBar from '../components/SearchBar'

const allServices = [
  { icon: FileText, title: 'Certificates', desc: 'Birth, death, income, caste and other official certificates', dept: 'Civil Registry', cat: 'certificates' },
  { icon: GraduationCap, title: 'Education', desc: 'Scholarships, admissions, university registrations', dept: 'Ministry of Education', cat: 'education' },
  { icon: Briefcase, title: 'Employment', desc: 'Job portal, skill development, employment exchanges', dept: 'Ministry of Labour', cat: 'employment' },
  { icon: Car, title: 'Transport', desc: 'Driving license, vehicle registration, permits', dept: 'Ministry of Road Transport', cat: 'transport' },
  { icon: Home, title: 'Property', desc: 'Registration, land records, tax payments', dept: 'Revenue Department', cat: 'property' },
  { icon: HeartHandshake, title: 'Public Welfare', desc: 'Pension, ration cards, social security schemes', dept: 'Ministry of Social Justice', cat: 'welfare' },
  { icon: CreditCard, title: 'Tax & Revenue', desc: 'File income tax, view challans, property tax', dept: 'Income Tax Department', cat: 'certificates' },
  { icon: Landmark, title: 'Municipal', desc: 'Water bills, building permissions, complaints', dept: 'Municipal Corporation', cat: 'welfare' },
  { icon: Users, title: 'Social Welfare', desc: 'Pension schemes, ration cards, social programs', dept: 'Ministry of Social Justice', cat: 'welfare' },
  { icon: ShieldCheck, title: 'Public Safety', desc: 'Police verification, FIR filing, emergency services', dept: 'Ministry of Home Affairs', cat: 'certificates' },
]

const categories = ['All', 'Certificates', 'Education', 'Employment', 'Transport', 'Property', 'Welfare']

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = allServices.filter(s => {
    const matchCat = activeCategory === 'All' || s.cat === activeCategory.toLowerCase().replace(/ /g, '')
    const matchSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <section className="relative" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Government Services</h1>
          <p className="text-gray-300 mb-6">Browse and access all available government services</p>
          <div className="flex justify-center">
            <SearchBar onSearch={(q) => setSearchQuery(q)} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
              style={{
                backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-surface)',
                color: activeCategory === cat ? '#fff' : 'var(--color-text)',
                borderColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(svc => (
            <ServiceCard key={svc.title} icon={svc.icon} title={svc.title} description={svc.desc} department={svc.dept} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-medium" style={{ color: 'var(--color-text-muted)' }}>No services found matching your criteria.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
