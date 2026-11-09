import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validateLogin } from '../utils/validateLogin';

import { autenticar } from '../api/api';
import { startSession, safeAdminDestination } from '../auth/session';
import useSession from '../auth/useSession';
import { getRequestMessage, requestMessages } from '../utils/requestMessages';

export default function AdminLogin() {
  const { session, reason } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = safeAdminDestination(location.state?.from);
  const [loading, setLoading] = useState(false);
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (request.current) return;
    const form = new FormData(event.currentTarget);
    const nextErrors = validateLogin(form.get('email'), form.get('password'));
    setErrors(nextErrors);
    setMessage('');
    if (nextErrors.email) { emailRef.current.focus(); return; }
    if (nextErrors.password) { passwordRef.current.focus(); return; }
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    try {
      const data = await autenticar(form.get('email'), form.get('password'), { signal: controller.signal });
      if (controller.signal.aborted) return;
      startSession(data);
      if (passwordRef.current) passwordRef.current.value = '';
      navigate(destination, { replace: true });
    } catch (error) {
      if (!controller.signal.aborted) {
        setMessage(error.status === 401 ? requestMessages.invalidCredentials : getRequestMessage(error));
        if (passwordRef.current) passwordRef.current.value = '';
      }
    } finally {
      request.current = null;
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  if (session) return <Navigate to={destination} replace />;
  const notice = reason === 'expired' ? requestMessages.sessionExpired
    : reason === 'invalid' ? requestMessages.sessionInvalid
    : reason === 'signedOut' ? requestMessages.signedOut
    : location.state?.from ? requestMessages.loginRequired : '';

  return <>
    <Header />
    <main className="mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 pb-20 pt-32 lg:grid-cols-2 lg:px-10 lg:py-40">
      <section>
        <Link to="/" className="mb-12 inline-flex min-h-12 items-center gap-2 text-sm text-[#55585B]">
          <ArrowLeft size={17} aria-hidden="true" /> Voltar ao dicionário
        </Link>
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#8C7356]">JurisFácil · Administração</p>
        <h1 className="mt-6 max-w-xl font-serif text-5xl leading-tight sm:text-7xl">Conhecimento claro começa com cuidado.</h1>
        <p className="mt-7 max-w-md text-lg leading-8 text-[#55585B]">Um espaço para organizar os termos, as explicações e os exemplos que aproximam as pessoas do Direito.</p>
       {/* <p className="mt-8 max-w-md border-l-2 border-[#8C7356] pl-5 text-sm leading-6 text-[#55585B]">A consulta ao dicionário é pública. Este acesso é exclusivo para administradores autorizados.</p>*/} 
      </section>

      <section aria-labelledby="login-title" className="w-full max-w-lg border border-[#D4D1CC] bg-white/50 p-6 sm:p-10 lg:justify-self-end">
        <LockKeyhole className="text-[#8C7356]" size={26} aria-hidden="true" />
        <h2 id="login-title" className="mt-5 font-serif text-4xl">Acesso administrativo</h2>
        <form noValidate onSubmit={handleSubmit} aria-busy={loading} className="mt-8 space-y-6">
          {notice && <p role="status" className="border-l-2 border-[#8C7356] p-4 text-sm">{notice}</p>}
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold">E-mail</label>
            <input ref={emailRef} id="admin-email" name="email" type="email" autoComplete="username" required disabled={loading}
              aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}
              className="min-h-12 w-full border border-[#D4D1CC] bg-white px-4" placeholder="seu@email.com" />
            {errors.email && <p id="email-error" className="mt-2 text-sm text-red-800">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold">Senha</label>
            <div className="relative">
              <input ref={passwordRef} id="admin-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required disabled={loading}
                aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined}
                className="min-h-12 w-full border border-[#D4D1CC] bg-white py-3 pl-4 pr-16" />
              <button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} aria-pressed={showPassword}
                onClick={() => setShowPassword(value => !value)} className="absolute inset-y-0 right-0 grid min-w-12 place-items-center text-[#55585B]">
                {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
              </button>
            </div>
            {errors.password && <p id="password-error" className="mt-2 text-sm text-red-800">{errors.password}</p>}
          </div>
          {message && <p role="alert" className="border-l-2 border-[#8C7356] bg-[#EEEAE4] p-4 text-sm leading-6">{message}</p>}
          <button type="submit" disabled={loading} className="min-h-12 w-full bg-[#1A1C1E] px-6 py-3 text-white hover:bg-[#333537] disabled:opacity-50">{loading ? requestMessages.signingIn : 'Entrar'}</button>
          {loading && <p role="status" className="sr-only">{requestMessages.signingIn}</p>}
          <p className="text-sm leading-6 text-[#55585B]">Precisa de acesso? Entre em contato com a equipe responsável pelo projeto.</p>
        </form>

      </section>
    </main>
    <Footer />
  </>;
}
