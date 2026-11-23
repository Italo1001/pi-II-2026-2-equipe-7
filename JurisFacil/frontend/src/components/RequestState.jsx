import { canRetry, getRequestMessage, requestMessages } from '../utils/requestMessages';

export default function RequestState({ loading, loadingMessage, error, empty, emptyMessage, onRetry }) {
  if (loading) return <p role="status" className="py-5 text-[#55585B]">{loadingMessage}</p>;
  if (error) return <div role="alert" className="py-5 text-[#55585B]">
    <p>{getRequestMessage(error)}</p>
    {onRetry && canRetry(error) && <button type="button" onClick={onRetry}
      className="mt-3 min-h-12 underline">{requestMessages.retry}</button>}
  </div>;
  if (empty) return <p role="status" className="py-5 text-[#55585B]">{emptyMessage}</p>;
  return null;
}
