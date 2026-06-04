import { useEffect, useRef } from 'react'
import { Icon } from './Icon'

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', onConfirm, onCancel, danger = false }) {
  const confirmRef = useRef(null)

  useEffect(() => {
    if (open) {
      confirmRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel?.()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-content" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="dialog-icon">
          <Icon name={danger ? 'alert' : 'info'} size={24} />
        </div>
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="btn btn-outline" onClick={onCancel}>{cancelLabel}</button>
          <button ref={confirmRef} className={`btn ${danger ? 'btn-danger-solid' : 'btn-primary'}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
