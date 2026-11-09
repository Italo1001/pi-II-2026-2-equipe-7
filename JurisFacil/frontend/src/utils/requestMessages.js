// Textos provisórios: substituir pelos textos aprovados pelo Design.
export const requestMessages = {
  loadingTerms: 'Carregando termos…',
  loadingTerm: 'Carregando termo…',
  loadingData: 'Carregando dados…',
  emptyAreas: 'Nenhuma área cadastrada no momento.',
  emptyCategories: 'Nenhuma categoria cadastrada no momento.',
  invalidForm: 'Confira os campos preenchidos e tente novamente.',
  invalidCredentials: 'E-mail ou senha incorretos.',
  sessionExpired: 'Sua sessão expirou. Entre novamente para continuar.',
  sessionInvalid: 'Sua sessão não é mais válida. Entre novamente para continuar.',
  loginRequired: 'Entre com sua conta administrativa para continuar.',
  signedOut: 'Você saiu da sua conta.',
  signingIn: 'Entrando…',
  pendingFields: 'Estes campos aguardam implementação e ainda não são salvos. O preenchimento está desabilitado.',
  saved: 'Termo cadastrado com sucesso!',
  missingOptions: 'Cadastre uma área e uma categoria antes de cadastrar um termo.',
  searching: 'Pesquisando…',
  emptyTerms: 'Nenhum termo cadastrado no momento.',
  emptyCategory: 'Nenhum termo encontrado nesta área.',
  emptySearch: 'Nenhum termo encontrado. Tente outra palavra.',
  notFound: 'Termo não encontrado.',
  network: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
  unauthorized: 'O servidor exige autenticação para acessar este conteúdo.',
  forbidden: 'Você não tem permissão para acessar este conteúdo.',
  unavailable: 'O serviço está indisponível no momento. Tente novamente.',
  invalidResponse: 'Não foi possível interpretar a resposta do servidor. Tente novamente.',
  generic: 'Não foi possível carregar os dados. Tente novamente.',
  retry: 'Tentar novamente',
};

export function getRequestMessage(error) {
  if (error?.code === 'SESSION_EXPIRED') return requestMessages.sessionExpired;
  if (error?.code === 'SESSION_INVALID') return requestMessages.sessionInvalid;
  if (error?.code === 'AUTH_REQUIRED') return requestMessages.loginRequired;
  if ([400, 422].includes(error?.status)) return requestMessages.invalidForm;
  if (error?.status === 401) return requestMessages.unauthorized;
  if (error?.status === 403) return requestMessages.forbidden;
  if (error?.status === 404) return requestMessages.notFound;
  if (error?.status >= 500) return requestMessages.unavailable;
  if (error?.code === 'NETWORK') return requestMessages.network;
  if (error?.code === 'INVALID_RESPONSE') return requestMessages.invalidResponse;
  return requestMessages.generic;
}

export function canRetry(error) {
  return ![401, 403, 404].includes(error?.status);
}
