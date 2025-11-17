import Header from '@/components/sanztech/Header';
import HeroSection from '@/components/sanztech/HeroSection';
import TemplateShowcase from '@/components/sanztech/TemplateShowcase';
import AuthorityBuilder from '@/components/sanztech/AuthorityBuilder';
import Footer from '@/components/sanztech/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TemplateShowcase />
        <AuthorityBuilder />
      </main>
      <Footer />
    </div>
  );
}
