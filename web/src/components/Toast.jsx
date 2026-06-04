import { createContext, useContext, useState, useCallback } from 'react'
import { Icon } from './Icon'

const ToastContext = createContext()

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`} role="status">
            <Icon name={t.type === 'error' ? 'alert' : 'check'} size={18} />
            <span>{t.message}</span>
            <button className="toast-close" onClick={() => removeToast(t.id)} aria-label="Cerrar">
              <Icon name="close" size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
