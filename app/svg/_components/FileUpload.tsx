'use client';

import {
  useState,
  useRef,
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
} from 'react'
import './FileUpload.css'

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  disabled?: boolean
}

function FileUpload({
  onFileSelect,
  accept = ".svg,image/svg+xml",
  disabled = false,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)

    if (disabled) return

    const files = Array.from(event.dataTransfer.files)
    const file = files[0]

    if (file && file.type === 'image/svg+xml') {
      setSelectedFile(file)
      onFileSelect(file)
    }
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const handleRemoveFile = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setSelectedFile(null)
    onFileSelect(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div
      className={`file-upload ${isDragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''} ${selectedFile ? 'has-file' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        disabled={disabled}
        style={{ display: 'none' }}
      />

      {selectedFile ? (
        <div className="file-selected">
          <div className="file-info">
            <div className="file-icon">📄</div>
            <div className="file-details">
              <div className="file-name">{selectedFile.name}</div>
              <div className="file-size">{(selectedFile.size / 1024).toFixed(1)} KB</div>
            </div>
          </div>
          <button
            className="remove-file-btn"
            onClick={handleRemoveFile}
            disabled={disabled}
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="file-upload-content">
          <div className="upload-icon">📁</div>
          <div className="upload-text">
            <strong>Click to browse</strong> or drag and drop your SVG file here
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload
