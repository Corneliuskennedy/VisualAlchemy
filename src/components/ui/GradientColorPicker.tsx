'use client';

import { useState } from 'react';
import { MonopoGradient } from './MonopoGradient';
import { OceanGradient } from './OceanGradient';

/**
 * Premium Gradient Color Picker
 * 
 * Professional, beautiful UI for experimenting with gradient colors and parameters.
 * Looks expensive and premium, not like MS Paint.
 */
export function GradientColorPicker() {
  const [color1, setColor1] = useState('#0ea5e9');
  const [color2, setColor2] = useState('#0284c7');
  const [color3, setColor3] = useState('#0369a1');
  const [color4, setColor4] = useState('#00d9ff');
  
  const [colorSize, setColorSize] = useState(0.85);
  const [colorSpacing, setColorSpacing] = useState(1.5);
  const [colorRotation, setColorRotation] = useState(0.8);
  const [displacement, setDisplacement] = useState(0.5);
  const [zoom, setZoom] = useState(1.0);
  const [spacing, setSpacing] = useState(1.8);

  // Ocean color presets with contrasty accents
  const oceanPresets = {
    'Deep Ocean': {
      color1: '#0ea5e9',
      color2: '#0284c7',
      color3: '#0369a1',
      color4: '#00d9ff', // Bright cyan accent
    },
    'Tropical Waters': {
      color1: '#06b6d4',
      color2: '#0891b2',
      color3: '#0e7490',
      color4: '#14b8a6', // Emerald accent
    },
    'Ocean Sunset': {
      color1: '#f0f9ff',
      color2: '#38bdf8',
      color3: '#0284c7',
      color4: '#f97316', // Orange accent
    },
    'Arctic Ocean': {
      color1: '#e0f2fe',
      color2: '#7dd3fc',
      color3: '#0ea5e9',
      color4: '#06b6d4', // Cyan accent
    },
    'Midnight Ocean': {
      color1: '#1e40af',
      color2: '#1e3a8a',
      color3: '#1e293b',
      color4: '#3b82f6', // Bright blue accent
    },
    'Shallow Reef': {
      color1: '#22d3ee',
      color2: '#06b6d4',
      color3: '#0891b2',
      color4: '#10b981', // Green accent
    },
  };

  const applyPreset = (preset: typeof oceanPresets[keyof typeof oceanPresets]) => {
    setColor1(preset.color1);
    setColor2(preset.color2);
    setColor3(preset.color3);
    setColor4(preset.color4);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Full-screen gradient preview */}
      <div className="fixed inset-0 z-0">
        <MonopoGradient
          color1={color1}
          color2={color2}
          color3={color3}
          color4={color4}
          colorSize={colorSize}
          colorSpacing={colorSpacing}
          colorRotation={colorRotation}
          displacement={displacement}
          zoom={zoom}
          spacing={spacing}
          parallax={false}
          grain={true}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen p-8 md:p-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 pt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-archivo font-bold text-white">
              Gradient Studio
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Experiment with ocean gradients. Find the perfect colors for your hero section.
            </p>
          </div>

          {/* Controls - Premium Card Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Color Controls */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 space-y-6">
              <h3 className="text-2xl font-archivo font-bold text-white mb-6">Colors</h3>
              
              {[
                { label: 'Color 1 (Surface)', value: color1, setter: setColor1 },
                { label: 'Color 2 (Shallow)', value: color2, setter: setColor2 },
                { label: 'Color 3 (Deep)', value: color3, setter: setColor3 },
                { label: 'Color 4 (Accent)', value: color4, setter: setColor4 },
              ].map(({ label, value, setter }, idx) => (
                <div key={idx} className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">{label}</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-16 h-16 rounded-lg border-2 border-white/30 cursor-pointer hover:border-white/50 transition-colors"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Parameter Controls */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 space-y-6">
              <h3 className="text-2xl font-archivo font-bold text-white mb-6">Parameters</h3>
              
              {[
                { label: 'Color Spacing', value: colorSpacing, setter: setColorSpacing, min: 0.5, max: 3, step: 0.1 },
                { label: 'Rotation', value: colorRotation, setter: setColorRotation, min: 0, max: 6.28, step: 0.1 },
                { label: 'Displacement', value: displacement, setter: setDisplacement, min: 0, max: 2, step: 0.1 },
                { label: 'Zoom', value: zoom, setter: setZoom, min: 0.5, max: 2, step: 0.1 },
                { label: 'Spacing', value: spacing, setter: setSpacing, min: 0.5, max: 5, step: 0.1 },
              ].map(({ label, value, setter, min, max, step }) => (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-white/90">{label}</label>
                    <span className="text-sm font-mono text-white/70">{value.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => setter(parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white/50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Presets */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
            <h3 className="text-2xl font-archivo font-bold text-white mb-6">Ocean Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(oceanPresets).map(([name, preset]) => (
                <button
                  key={name}
                  onClick={() => applyPreset(preset)}
                  className="group relative p-6 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all text-left"
                >
                  <div className="font-semibold text-white mb-3">{name}</div>
                  <div className="flex gap-2">
                    {[preset.color1, preset.color2, preset.color3, preset.color4].map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-lg"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Code Output */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
            <h3 className="text-2xl font-archivo font-bold text-white mb-4">Code to Copy</h3>
            <div className="bg-black/60 rounded-lg p-6 border border-white/10">
              <pre className="text-sm text-white/90 overflow-x-auto font-mono">
{`<OceanGradient
  color1="${color1}"
  color2="${color2}"
  color3="${color3}"
  color4="${color4}"
  colorSpacing={${colorSpacing}}
  colorRotation={${colorRotation}}
  displacement={${displacement}}
  zoom={${zoom}}
  spacing={${spacing}}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
