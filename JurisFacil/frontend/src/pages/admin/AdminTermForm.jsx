import { useState } from 'react';
import { Link } from 'react-router-dom';
import { legalTerms } from '../../data/legalTerms';

export default function AdminTermForm() {
  const [message, setMessage] = useState('');
  const fields = [
    ['nome', 'Nome do termo', 'Ex.: Dano moral', false],
    ['tecnica', 'Definição técnica', 'Descreva o significado jurídico.', true],
    ['simples', 'Explicação simples', 'Explique de forma acessível.', true],
    ['exemplo', 'Exemplo de uso', 'Apresente uma situação prática.', true],
    ['fonte', 'Fonte ou referência', 'Ex.: Código Civil', false],
  ];
  return <>
    <Link to="/admin/previa/termos" className="inline-flex min-h-10 items-center text-sm underline">Voltar aos termos</Link>
    <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Novo termo</h1>
    <form className="mt-8 max-w-3xl space-y-6" onSubmit={event => { event.preventDefault(); setMessage('Não foi possível salvar o termo. Tente novamente mais tarde.'); }}>
      {fields.map(([id, label, placeholder, multiline]) => <div key={id}>
        <label htmlFor={`term-${id}`} className="mb-2 block text-sm font-semibold">{label}</label>
        {multiline ? <textarea id={`term-${id}`} rows={3} placeholder={placeholder} className="w-full border border-[#D4D1CC] bg-white p-3" /> : <input id={`term-${id}`} placeholder={placeholder} className="min-h-12 w-full border border-[#D4D1CC] bg-white px-3" />}
      </div>)}
      <div className="grid gap-6 sm:grid-cols-2">
        <div><label htmlFor="term-area" className="mb-2 block text-sm font-semibold">Área do Direito</label>
          <select id="term-area" defaultValue="" className="min-h-12 w-full border border-[#D4D1CC] bg-white px-3"><option value="">Selecione uma área</option>{[...new Set(legalTerms.map(term => term.category))].sort().map(area => <option key={area}>{area}</option>)}</select>
        </div>
        <div><label htmlFor="term-category" className="mb-2 block text-sm font-semibold">Categoria</label>
          <select id="term-category" disabled className="min-h-12 w-full border border-[#D4D1CC] px-3"><option>Nenhuma categoria disponível</option></select>
        </div>
      </div>
      {message && <p role="alert" className="border-l-2 border-[#8C7356] bg-[#EEEAE4] p-4 text-sm leading-6">{message}</p>}
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="min-h-12 bg-[#1A1C1E] px-5 text-white">Salvar termo</button>
        <Link to="/admin/previa/termos" className="inline-flex min-h-12 items-center border border-[#D4D1CC] px-5">Cancelar</Link>
      </div>
    </form>
  </>;
}
