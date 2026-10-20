import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const NotificationToast = () => {
  const { notification, notify } = useApp();

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <aside aria-label="Notification" className="fixed top-16 right-4 z-50 max-w-sm w-[90vw] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={`p-4 rounded-2xl border backdrop-blur-xl shadow-xl flex items-start gap-3 bg-white ${
        isSuccess
          ? 'border-amber-300 shadow-amber-500/10'
          : isError
          ? 'border-rose-300 shadow-rose-500/10'
          : 'border-slate-200 shadow-slate-500/10'
      }`}>
        <div className="mt-0.5 flex-shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-amber-600" />}
          {isError && <AlertTriangle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-slate-700" />}
        </div>
        
        <div className="flex-1 text-left">
          <h2 className="text-sm font-extrabold text-slate-900 leading-tight">{notification.title}</h2>
          <p className="text-xs text-slate-600 mt-0.5 leading-snug">{notification.message}</p>
        </div>

        <button
          onClick={() => notify(null, null)}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
