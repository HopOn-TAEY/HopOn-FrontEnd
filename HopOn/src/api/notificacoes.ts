import { authenticatedFetch } from './config';

export async function listarNotificacoes({ naoLidas = false, limit = 10, page = 1 } = {}) {
  const params = new URLSearchParams();
  if (naoLidas) params.append('naoLidas', 'true');
  params.append('limit', String(limit));
  params.append('page', String(page));

  return await authenticatedFetch(`/notificacoes?${params.toString()}`);
}

export async function marcarNotificacaoComoLida(id: string) {
  await authenticatedFetch(`/notificacoes/${id}/marcar-como-lida`, { method: 'POST', body: JSON.stringify({}) });
}

export async function marcarTodasComoLidas() {
  await authenticatedFetch(`/notificacoes/marcar-todas-como-lidas`, { method: 'POST', body: JSON.stringify({}) });
} 