interface CVData {
  name: string
  title: string
  summary: string
  experience: { company: string; role: string; period: string; bullets: string[] }[]
  education: { institution: string; degree: string; year: string }[]
  skills: string[]
  contact: { email: string; phone: string; location: string; linkedin: string }
}

export default function CVTemplate({ data }: { data: CVData }) {
  return (
    <div
      id="cv-template"
      className="bg-white font-sans text-gray-800"
      style={{ width: '794px', minHeight: '1123px', padding: '48px', boxSizing: 'border-box' }}
    >
      {/* Header */}
      <header className="border-b-2 border-teal-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
        <p className="text-teal-600 font-semibold text-lg mt-1">{data.title}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
          {data.contact.email    && <span>✉ {data.contact.email}</span>}
          {data.contact.phone    && <span>📞 {data.contact.phone}</span>}
          {data.contact.location && <span>📍 {data.contact.location}</span>}
          {data.contact.linkedin && <span>🔗 {data.contact.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{exp.role}</p>
                    <p className="text-teal-700 text-sm">{exp.company}</p>
                  </div>
                  <p className="text-xs text-gray-400 whitespace-nowrap">{exp.period}</p>
                </div>
                <ul className="mt-2 space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-teal-500 mt-0.5">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">
            Education
          </h2>
          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between">
              <div>
                <p className="font-semibold text-sm">{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.institution}</p>
              </div>
              <p className="text-xs text-gray-400">{edu.year}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i}
                className="bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full border border-teal-200">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
