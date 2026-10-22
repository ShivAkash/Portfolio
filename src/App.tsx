import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'
import { ToastProvider } from '@/components/ui/Toast'
import { Home } from '@/pages/Home'
import { Work } from '@/pages/Work'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'
import { ResumeProvider } from '@/components/ResumeViewer'

export default function App() {
  return (
    <ResumeProvider>
      <HelmetProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="work" element={<Work />} />
                <Route path="work/:slug" element={<ProjectDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </HelmetProvider>
    </ResumeProvider>
  )
}
