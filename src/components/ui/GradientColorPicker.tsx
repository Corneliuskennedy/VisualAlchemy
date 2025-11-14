'use client';

import { useState } from 'react';
import { MonopoGradient } from './MonopoGradient';
import { OceanGradient } from './OceanGradient';

/**
 * GradientColorPicker Component
 * 
 * Interactive tool to experiment with gradient colors and parameters.
 * Perfect for finding the right ocean colors and settings.
 * 
 * Usage: Add to a page temporarily to experiment, then copy the values.
 */
export function GradientColorPicker() {
  const [color1, setColor1] = useState('#0ea5e9');
  const [color2, setColor2] = useState('#0284c7');
  const [color3, setColor3] = useState('#0369a1');
  const [color4, setColor4] = useState('#075985');
  
  const [colorSize, setColorSize] = useState(0.85);
  const [colorSpacing, setColorSpacing] = useState(0.35);
  const [colorRotation, setColorRotation] = useState(1.2);
  const [displacement, setDisplacement] = useState(2.0);
  const [zoom, setZoom] = useState(0.8);
  const [spacing, setSpacing] = useState(4.5);

  // Ocean color presets
  const oceanPresets = {
    'Deep Ocean': {
      color1: '#0ea5e9',
      color2: '#0284c7',
      color3: '#0369a1',
      color4: '#075985',
    },
    'Tropical Waters': {
      color1: '#06b6d4',
      color2: '#0891b2',
      color3: '#0e7490',
      color4: '#155e75',
    },
    'Ocean Sunset': {
      color1: '#f0f9ff',
      color2: '#38bdf8',
      color3: '#0284c7',
      color4: '#075985',
    },
    'Arctic Ocean': {
      color1: '#e0f2fe',
      color2: '#7dd3fc',
      color3: '#0ea5e9',
      color4: '#0369a1',
    },
    'Midnight Ocean': {
      color1: '#1e40af',
      color2: '#1e3a8a',
      color3: '#1e293b',
      color4: '#0f172a',
    },
    'Shallow Reef': {
      color1: '#22d3ee',
      color2: '#06b6d4',
      color3: '#0891b2',
      color4: '#0e7490',
    },
  };

  const applyPreset = (preset: typeof oceanPresets[keyof typeof oceanPresets]) => {
    setColor1(preset.color1);
    setColor2(preset.color2);
    setColor3(preset.color3);
    setColor4(preset.color4);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Preview - Full Viewport Height */}
        <div className="relative min-h-screen rounded-lg overflow-hidden border border-border/20">
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
            className="!fixed"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-background/80 backdrop-blur-sm px-6 py-4 rounded-lg border border-border/20">
              <h2 className="text-2xl font-bold text-heading">Gradient Preview</h2>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Color Controls */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Colors</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Color 1 (Surface)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-16 h-10 rounded border border-border"
                  />
                  <input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="flex-1 px-3 py-2 rounded border border-border bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color 2 (Shallow)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-16 h-10 rounded border border-border"
                  />
                  <input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="flex-1 px-3 py-2 rounded border border-border bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color 3 (Deep)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    className="w-16 h-10 rounded border border-border"
                  />
                  <input
                    type="text"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    className="flex-1 px-3 py-2 rounded border border-border bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color 4 (Deepest)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color4}
                    onChange={(e) => setColor4(e.target.value)}
                    className="w-16 h-10 rounded border border-border"
                  />
                  <input
                    type="text"
                    value={color4}
                    onChange={(e) => setColor4(e.target.value)}
                    className="flex-1 px-3 py-2 rounded border border-border bg-background"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Parameter Controls */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Parameters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Color Size: {colorSize.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.05"
                  value={colorSize}
                  onChange={(e) => setColorSize(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Color Spacing: {colorSpacing.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={colorSpacing}
                  onChange={(e) => setColorSpacing(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Rotation: {colorRotation.toFixed(2)} rad
                </label>
                <input
                  type="range"
                  min="0"
                  max="6.28"
                  step="0.1"
                  value={colorRotation}
                  onChange={(e) => setColorRotation(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Displacement: {displacement.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={displacement}
                  onChange={(e) => setDisplacement(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Zoom: {zoom.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Spacing: {spacing.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={spacing}
                  onChange={(e) => setSpacing(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Ocean Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(oceanPresets).map(([name, preset]) => (
              <button
                key={name}
                onClick={() => applyPreset(preset)}
                className="px-4 py-2 rounded border border-border hover:bg-accent/10 transition-colors text-left"
              >
                <div className="font-medium mb-1">{name}</div>
                <div className="flex gap-1">
                  {[preset.color1, preset.color2, preset.color3, preset.color4].map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded border border-border/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Code Output */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Code to Copy</h3>
          <div className="bg-muted/50 p-4 rounded-lg border border-border/20">
            <pre className="text-sm overflow-x-auto">
{`<OceanGradient
  color1="${color1}"
  color2="${color2}"
  color3="${color3}"
  color4="${color4}"
  colorSize={${colorSize}}
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
  );
}

