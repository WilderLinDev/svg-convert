'use client';

import Image from 'next/image'
import type { ChangeEvent } from 'react'
import './DpiSelector.css'

const ICON_DPI = '/svg/icon-dpi.svg'

const DPI_OPTIONS = [
  { value: 72, label: '72 DPI', description: 'Web/Screen' },
  { value: 150, label: '150 DPI', description: 'Print Draft' },
  { value: 300, label: '300 DPI', description: 'High Quality Print' }
] as const

interface DpiSelectorProps {
  dpi: number
  onDpiChange: (value: number) => void
  disabled?: boolean
}

function DpiSelector({ dpi, onDpiChange, disabled = false }: DpiSelectorProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onDpiChange(Number(event.target.value))
  }

  return (
    <div className="dpi-selector">
      <h3>
        <Image
          src={ICON_DPI}
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
          className="section-icon"
        />
        Resolution (DPI)
      </h3>
      <div className="dpi-options">
        {DPI_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`dpi-option ${dpi === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              value={option.value}
              checked={dpi === option.value}
              onChange={handleChange}
              disabled={disabled}
            />
            <span className="dpi-label">
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </span>
          </label>
        ))}
      </div>
      <div className="dpi-info">
        Higher DPI = Larger file size but better quality for print
      </div>
    </div>
  )
}

export default DpiSelector
