import { useState } from 'react';
import { legalTerms } from '../data/legalTerms';
import Header from '../components/Header';
import SearchHero from '../components/SearchHero';
import AlphabetIndex from '../components/AlphabetIndex';
import TermIndex from '../components/TermIndex';
import CategoryLibrary from '../components/CategoryLibrary';
import Footer from '../components/Footer';

export default function Home() {
  const [query, setQuery] = useState('');
  return (
    <main className="bg-[#F9F8F6] text-[#1A1C1E]">
      <Header />
      <SearchHero terms={legalTerms} query={query} setQuery={setQuery} />
      <AlphabetIndex terms={legalTerms} />
      <TermIndex terms={legalTerms} />
      <CategoryLibrary />
      <Footer />
    </main>
  );
}