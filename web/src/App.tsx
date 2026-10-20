import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteBootLoader } from '@/components/effects/SiteBootLoader'
import { Layout } from '@/components/layout/Layout'
import { QuoteDialogProvider } from '@/context/QuoteDialogContext'
import { AboutPage } from '@/pages/AboutPage'
import { ContactsPage } from '@/pages/ContactsPage'
import { EquipmentPage } from '@/pages/EquipmentPage'
import { HomePage } from '@/pages/HomePage'
import { PortfolioPage } from '@/pages/PortfolioPage'
import { ProcessPage } from '@/pages/ProcessPage'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export default function App() {
  return (
    <SiteBootLoader>
      <QuoteDialogProvider>
        <BrowserRouter basename={routerBasename}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="equipment" element={<EquipmentPage />} />
              <Route path="process" element={<ProcessPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="contacts" element={<ContactsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QuoteDialogProvider>
    </SiteBootLoader>
  )
}
