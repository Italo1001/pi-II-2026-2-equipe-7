import { Link } from 'react-router-dom';
import Header from '../components/Header';
export default function NotFound() {
  return <><Header /><main className="mx-auto min-h-screen max-w-3xl px-6 pb-20 pt-40">
    <p className="text-sm text-[#8C7356]">404</p>
    <h1 className="mt-4 font-serif text-5xl">Página não encontrada</h1>
    <p className="my-6">O endereço informado não existe. Volte ao dicionário para continuar.</p>
    <Link className="inline-flex min-h-12 items-center border px-6" to="/">Voltar ao dicionário</Link>
  </main></>;
}
