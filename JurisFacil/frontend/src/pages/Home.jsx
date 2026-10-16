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
  const [category, setCategory] = useState('');
  const visibleTerms = category ? legalTerms.filter(term => term.category === category) : legalTerms;
  return (
    <main className="bg-[#F9F8F6] text-[#1A1C1E]">
      <Header />
      <SearchHero terms={legalTerms} query={query} setQuery={setQuery} />
      <AlphabetIndex terms={visibleTerms} />
      {category && <div className="mx-auto max-w-7xl px-6 pt-10" role="status">
        Filtrando: {category}. <button className="ml-3 underline" onClick={() => setCategory('')}>Mostrar todos os termos</button>
      </div>}
      <TermIndex terms={visibleTerms} />
      <CategoryLibrary terms={legalTerms} onSelect={setCategory} />
      <Footer />
    </main>
  );
}