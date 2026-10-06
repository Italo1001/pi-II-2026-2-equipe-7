export function normalizeSearch(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
export function searchTerms(terms, query) {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  return terms.filter(term => normalizeSearch(`${term.term} ${term.short_definition}`).includes(normalized));
}
