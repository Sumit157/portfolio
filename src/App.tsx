import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/hero/Hero';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { LabSection } from '@/components/lab/LabSection';
import { AboutSection } from '@/components/about/AboutSection';
import { StackSection } from '@/components/stack/StackSection';
import { ContactSection } from '@/components/contact/ContactSection';

function App() {
  return (
    <Layout>
      <Hero />
      <ProjectsSection />
      <LabSection />
      <AboutSection />
      <StackSection />
      <ContactSection />
    </Layout>
  );
}

export default App;
