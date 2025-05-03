import { Chip } from 'primereact/chip'
import './status-chip.css'

function StatusWon() {
  return <Chip label="Won" className="status-chip-won" />
}

function StatusPending() {
  return <Chip label="Pending" className="status-chip-pending" />
}

function StatusLost() {
  return <Chip label="Lost" className="status-chip-lost" />
}

function StatusVoid() {
  return <Chip label="Void" className="status-chip-void" />
}

function StatusCancelled() {
  return <Chip label="Cancelled" className="status-chip-cancelled" />
}

function StatusHalfWin() {
  return <Chip label="Half Win" className="status-chip-half-win" />
}

function StatusHalfLost() {
  return <Chip label="Half Lost" className="status-chip-half-lost" />
}

export function getStatusChip(status: string) {
  const cleanStatus = status.toLowerCase()
  switch (cleanStatus) {
    case 'won':
      return <StatusWon />
    case 'pending':
      return <StatusPending />
    case 'lost':
      return <StatusLost />
    case 'void':
      return <StatusVoid />
    case 'cancelled':
      return <StatusCancelled />
    case 'half win':
      return <StatusHalfWin />
    case 'half lost':
      return <StatusHalfLost />
    default:
      return <Chip label={status} className="status-chip-default" />
  }
}
