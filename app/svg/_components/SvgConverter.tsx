'use client';

import NextImage from 'next/image'
import { useState } from 'react'
import ImageConverter from '@/app/svg/_utils/ImageConverter'
import FileUpload from './FileUpload'
import ProgressBar from './ProgressBar'
import PetMemePromo from './PetMemePromo'
import './SvgConverter.css'

const ICON_FORMAT = '/svg/icon-format.svg'
const ICON_DPI = '/svg/icon-dpi.svg'
const ICON_BACKGROUND = '/svg/icon-background.svg'

type OutputFormat = 'png' | 'jpeg' | 'tiff'

interface ConversionResult {
  data: Blob | Uint8Array
  mimeType: string
}

function SvgConverter() {
  const [svgFile, setSvgFile] = useState<File | null>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('png')
  const [dpi, setDpi] = useState<number>(72)
  const [transparentBackground, setTransparentBackground] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setSvgFile(null)
      setSvgContent('')
      setError(null)
      return
    }

    if (file.type !== 'image/svg+xml') {
      setError('Please select a valid SVG file!')
      return
    }

    setSvgFile(file)
    setError(null)

    const reader = new FileReader()
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const content = event.target?.result
      if (typeof content === 'string' && ImageConverter.isValidSvg(content)) {
        setSvgContent(content)
      } else {
        setError('Invalid SVG file format')
      }
    }
    reader.readAsText(file)
  }

  const handleDpiChange = (newDpi: number) => {
    setDpi(newDpi)
  }

  const handleFormatChange = (format: OutputFormat) => {
    setOutputFormat(format)
    if (format === 'jpeg') {
      setTransparentBackground(false)
    }
  }

  const handleTransparentBackgroundChange = (checked: boolean) => {
    setTransparentBackground(checked)
  }

  const convertImage = async (): Promise<void> => {
    if (!svgContent || !svgFile) {
      setError('Please upload an SVG file first')
      return
    }

    setIsConverting(true)
    setProgress(0)
    setError(null)

    try {
      setProgress(25)

      const result = await ImageConverter.convertSvg(
        svgContent,
        outputFormat,
        dpi,
        1.0,
        transparentBackground
      ) as ConversionResult

      setProgress(75)
      setProgress(100)

      const filename = svgFile.name.replace(/\.svg$/i, '') || 'converted'
      const extension = outputFormat === 'jpeg' ? 'jpg' : outputFormat

      ImageConverter.downloadFile(
        result.data,
        `${filename}.${extension}`,
        result.mimeType
      )

      setTimeout(() => {
        setProgress(0)
      }, 2000)

    } catch (conversionError) {
      console.error('Conversion failed:', conversionError)
      const message = conversionError instanceof Error ? conversionError.message : 'Unknown error'
      setError(`Conversion failed: ${message}`)
      setProgress(0)
    } finally {
      setIsConverting(false)
    }
  }

  const downloadSource = () => {
    if (!svgFile) return
    const url = URL.createObjectURL(svgFile)
    const a = document.createElement('a')
    a.href = url
    a.download = svgFile.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }


  return (
    <div className="svg-converter">
      <div className="converter-header">
        <div className="header-top">
          <h1>🎨 SVG Converter</h1>
        </div>
        <p className="converter-description">
          Convert your SVG files to PNG, JPG, or TIFF formats with DPI selection
        </p>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <div className="converter-layout">
        <div className="left-panel">
          <div className="upload-section">
            <h2>📁 Upload SVG</h2>
            <FileUpload
              onFileSelect={handleFileSelect}
              disabled={isConverting}
            />
          </div>

          <div className="settings-section">
            <h2>⚙️ Configuration</h2>
            <div className="format-and-dpi">
              <div className="format-group">
                <h3>
                  <NextImage
                    src={ICON_FORMAT}
                    alt="File format selection icon"
                    width={20}
                    height={20}
                    className="section-icon"
                  />
                  Format
                </h3>
                <div className="format-options-horizontal">
                  <label className={`format-option-compact ${outputFormat === 'png' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      value="png"
                      checked={outputFormat === 'png'}
                      onChange={(e) => handleFormatChange(e.target.value as OutputFormat)}
                      disabled={isConverting}
                    />
                    <span>PNG</span>
                  </label>
                  <label className={`format-option-compact ${outputFormat === 'jpeg' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      value="jpeg"
                      checked={outputFormat === 'jpeg'}
                      onChange={(e) => handleFormatChange(e.target.value as OutputFormat)}
                      disabled={isConverting}
                    />
                    <span>JPEG</span>
                  </label>
                  <label className={`format-option-compact ${outputFormat === 'tiff' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      value="tiff"
                      checked={outputFormat === 'tiff'}
                      onChange={(e) => handleFormatChange(e.target.value as OutputFormat)}
                      disabled={isConverting}
                    />
                    <span>TIFF</span>
                  </label>
                </div>
              </div>

              <div className="dpi-group">
                <h3>
                  <NextImage
                    src={ICON_DPI}
                    alt="DPI resolution selection icon"
                    width={20}
                    height={20}
                    className="section-icon"
                  />
                  DPI
                </h3>
                <div className="dpi-options-horizontal">
                  <label className={`dpi-option-compact ${dpi === 72 ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        value="72"
                        checked={dpi === 72}
                        onChange={(e) => handleDpiChange(Number(e.target.value))}
                        disabled={isConverting}
                    />
                    <span>72</span>
                  </label>
                  <label className={`dpi-option-compact ${dpi === 150 ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        value="150"
                        checked={dpi === 150}
                        onChange={(e) => handleDpiChange(Number(e.target.value))}
                        disabled={isConverting}
                    />
                    <span>150</span>
                  </label>
                  <label className={`dpi-option-compact ${dpi === 300 ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        value="300"
                        checked={dpi === 300}
                        onChange={(e) => handleDpiChange(Number(e.target.value))}
                        disabled={isConverting}
                    />
                    <span>300</span>
                  </label>
                  <label className={`dpi-option-compact ${dpi === 600 ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        value="600"
                        checked={dpi === 600}
                        onChange={(e) => handleDpiChange(Number(e.target.value))}
                        disabled={isConverting}
                    />
                    <span>600</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Transparent Background Option */}
            {(outputFormat === 'png' || outputFormat === 'tiff') && (
                <div className="transparency-group">
                  <h3>
                    <NextImage
                      src={ICON_BACKGROUND}
                      alt="Background transparency toggle icon"
                      width={20}
                      height={20}
                      className="section-icon"
                    />
                    Background
                  </h3>
                  <label className="transparency-toggle">
                    <input
                        type="checkbox"
                        checked={transparentBackground}
                        onChange={(e) => handleTransparentBackgroundChange(e.target.checked)}
                    disabled={isConverting}
                  />
                  <span className="toggle-text">
                    {transparentBackground ? 'Transparent' : 'White Background'}
                  </span>
                </label>
              </div>
            )}

            <div className="action-section">
              <button
                className="convert-btn"
                onClick={convertImage}
                disabled={!svgContent || isConverting}
              >
                {isConverting ? (
                  <>
                    <span className="loading-spinner">⏳</span>
                    Converting...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Convert Now
                  </>
                )}
              </button>

              {(progress > 0 || isConverting) && (
                <ProgressBar
                  progress={progress}
                  status={isConverting ? 'loading' : progress === 100 ? 'success' : undefined}
                />
              )}
            </div>
          </div>
        </div>

        <div className="right-panel">
          {svgContent ? (
            <div className="preview-section">
              <div className="preview-header">
                <h3>👁️ Preview</h3>
                <button className="download-source-btn" onClick={downloadSource}>
                  ⬇ SVG
                </button>
              </div>
              <div 
                className="svg-preview-container"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </div>
          ) : (
            <div className="preview-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">🖼️</div>
                <p>Upload an SVG to see preview</p>
              </div>
            </div>
          )}
          
          <PetMemePromo />
        </div>

      </div>
    </div>
  )
}

export default SvgConverter
