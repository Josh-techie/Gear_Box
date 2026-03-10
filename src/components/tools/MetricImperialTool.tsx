'use client';

import { useState } from 'react';

export default function MetricImperialTool() {
  const [metricValue, setMetricValue] = useState<number | string>('');
  const [imperialValue, setImperialValue] = useState<number | string>('');
  const [metricUnit, setMetricUnit] = useState('kg');
  const [imperialUnit, setImperialUnit] = useState('lb');
  const [conversionType, setConversionType] = useState('weight');
  const [conversionDirection, setConversionDirection] = useState<'metric-to-imperial' | 'imperial-to-metric'>('metric-to-imperial');

  const conversionFactors: { [key: string]: { [key: string]: number } } = {
    weight: {
      kg_to_lb: 2.20462,
      lb_to_kg: 0.453592,
      g_to_lb: 0.00220462,
      lb_to_g: 453.592,
      kg_to_oz: 35.274,
      oz_to_kg: 0.0283495,
      kg_to_st: 0.157473,
      st_to_kg: 6.35029
    },
    length: {
      m_to_ft: 3.28084,
      ft_to_m: 0.3048,
      m_to_in: 39.3701,
      in_to_m: 0.0254,
      km_to_mi: 0.621371,
      mi_to_km: 1.60934
    },
    area: {
      m2_to_ft2: 10.7639,
      ft2_to_m2: 0.092903,
      km2_to_acre: 247.105,
      acre_to_m2: 4046.86,
      ha_to_m2: 10000,
      m2_to_ha: 0.0001
    },
    volume: {
      l_to_gal: 0.264172,
      gal_to_l: 3.78541,
      l_to_cup: 4.22675,
      cup_to_l: 0.236588,
      ml_to_l: 0.001,
      l_to_ml: 1000
    }
  };

  const temperatureConversions = {
    c_to_f: (c: number) => (c * 9/5) + 32,
    f_to_c: (f: number) => (f - 32) * 5/9
  };

  const calculateConversion = () => {
    if (conversionDirection === 'metric-to-imperial') {
      const value = parseFloat(metricValue.toString());
      if (isNaN(value)) {
        setImperialValue('');
        return;
      }

      if (conversionType === 'weight') {
        if (metricUnit === 'kg' && imperialUnit === 'lb') {
          setImperialValue((value * conversionFactors.weight.kg_to_lb).toFixed(2));
        } else if (metricUnit === 'g' && imperialUnit === 'lb') {
          setImperialValue((value * conversionFactors.weight.g_to_lb).toFixed(2));
        } else if (metricUnit === 'kg' && imperialUnit === 'oz') {
          setImperialValue((value * conversionFactors.weight.kg_to_oz).toFixed(2));
        } else if (metricUnit === 'kg' && imperialUnit === 'st') {
          setImperialValue((value * conversionFactors.weight.kg_to_st).toFixed(2));
        } else if (metricUnit === 'g' && imperialUnit === 'oz') {
          setImperialValue((value * conversionFactors.weight.g_to_lb / 16).toFixed(2));
        }
      } else if (conversionType === 'length') {
        if (metricUnit === 'm' && imperialUnit === 'ft') {
          setImperialValue((value * conversionFactors.length.m_to_ft).toFixed(2));
        } else if (metricUnit === 'm' && imperialUnit === 'in') {
          setImperialValue((value * conversionFactors.length.m_to_in).toFixed(2));
        } else if (metricUnit === 'km' && imperialUnit === 'mi') {
          setImperialValue((value * conversionFactors.length.km_to_mi).toFixed(2));
        }
      } else if (conversionType === 'area') {
        if (metricUnit === 'm²' && imperialUnit === 'ft²') {
          setImperialValue((value * conversionFactors.area.m2_to_ft2).toFixed(2));
        } else if (metricUnit === 'm²' && imperialUnit === 'ac') {
          setImperialValue((value * conversionFactors.area.m2_to_acre).toFixed(4));
        } else if (metricUnit === 'ha' && imperialUnit === 'ac') {
          setImperialValue((value * conversionFactors.area.ha_to_m2 * conversionFactors.area.m2_to_acre).toFixed(4));
        }
      } else if (conversionType === 'volume') {
        if (metricUnit === 'L' && imperialUnit === 'gal') {
          setImperialValue((value * conversionFactors.volume.l_to_gal).toFixed(2));
        } else if (metricUnit === 'L' && imperialUnit === 'cup') {
          setImperialValue((value * conversionFactors.volume.l_to_cup).toFixed(2));
        } else if (metricUnit === 'mL' && imperialUnit === 'L') {
          setImperialValue((value / conversionFactors.volume.ml_to_l).toFixed(2));
        }
      } else if (conversionType === 'temperature') {
        if (metricUnit === '°C' && imperialUnit === '°F') {
          setImperialValue(temperatureConversions.c_to_f(value).toFixed(1));
        }
      }
    } else {
      // Imperial to Metric conversion
      const value = parseFloat(imperialValue.toString());
      if (isNaN(value)) {
        setMetricValue('');
        return;
      }

      if (conversionType === 'weight') {
        if (imperialUnit === 'lb' && metricUnit === 'kg') {
          setMetricValue((value * conversionFactors.weight.lb_to_kg).toFixed(2));
        } else if (imperialUnit === 'lb' && metricUnit === 'g') {
          setMetricValue((value * conversionFactors.weight.lb_to_g).toFixed(0));
        } else if (imperialUnit === 'oz' && metricUnit === 'kg') {
          setMetricValue((value * conversionFactors.weight.oz_to_kg).toFixed(2));
        } else if (imperialUnit === 'st' && metricUnit === 'kg') {
          setMetricValue((value * conversionFactors.weight.st_to_kg).toFixed(2));
        } else if (imperialUnit === 'oz' && metricUnit === 'g') {
          setMetricValue((value * 16 * conversionFactors.weight.lb_to_kg).toFixed(0));
        }
      } else if (conversionType === 'length') {
        if (imperialUnit === 'ft' && metricUnit === 'm') {
          setMetricValue((value * conversionFactors.length.ft_to_m).toFixed(2));
        } else if (imperialUnit === 'in' && metricUnit === 'm') {
          setMetricValue((value * conversionFactors.length.in_to_m).toFixed(2));
        } else if (imperialUnit === 'mi' && metricUnit === 'km') {
          setMetricValue((value * conversionFactors.length.mi_to_km).toFixed(2));
        }
      } else if (conversionType === 'area') {
        if (imperialUnit === 'ft²' && metricUnit === 'm²') {
          setMetricValue((value * conversionFactors.area.ft2_to_m2).toFixed(2));
        } else if (imperialUnit === 'ac' && metricUnit === 'm²') {
          setMetricValue((value / conversionFactors.area.m2_to_acre).toFixed(2));
        } else if (imperialUnit === 'ac' && metricUnit === 'ha') {
          setMetricValue((value / conversionFactors.area.ha_to_m2).toFixed(2));
        }
      } else if (conversionType === 'volume') {
        if (imperialUnit === 'gal' && metricUnit === 'L') {
          setMetricValue((value * conversionFactors.volume.gal_to_l).toFixed(2));
        } else if (imperialUnit === 'cup' && metricUnit === 'L') {
          setMetricValue((value * conversionFactors.volume.cup_to_l).toFixed(2));
        } else if (imperialUnit === 'L' && metricUnit === 'mL') {
          setMetricValue((value * conversionFactors.volume.l_to_ml).toFixed(0));
        }
      } else if (conversionType === 'temperature') {
        if (imperialUnit === '°F' && metricUnit === '°C') {
          setMetricValue(temperatureConversions.f_to_c(value).toFixed(1));
        }
      }
    }
  };

  const handleConversionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConversionType(e.target.value);
    setMetricValue('');
    setImperialValue('');
    
    // Reset units based on conversion type
    if (e.target.value === 'weight') {
      setMetricUnit('kg');
      setImperialUnit('lb');
    } else if (e.target.value === 'length') {
      setMetricUnit('m');
      setImperialUnit('ft');
    } else if (e.target.value === 'area') {
      setMetricUnit('m²');
      setImperialUnit('ft²');
    } else if (e.target.value === 'volume') {
      setMetricUnit('L');
      setImperialUnit('gal');
    } else if (e.target.value === 'temperature') {
      setMetricUnit('°C');
      setImperialUnit('°F');
    }
  };

  const handleMetricUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMetricUnit(e.target.value);
    setMetricValue('');
    setImperialValue('');
  };

  const handleImperialUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImperialUnit(e.target.value);
    setMetricValue('');
    setImperialValue('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Metric & Imperial Converter</h1>
      
      {/* Conversion Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Type of conversion</label>
        <select
          value={conversionType}
          onChange={handleConversionTypeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        >
          <option value="weight">Weight / Mass</option>
          <option value="length">Length</option>
          <option value="area">Area</option>
          <option value="volume">Volume</option>
          <option value="temperature">Temperature</option>
        </select>
      </div>

      {/* Conversion Direction */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Direction</label>
        <div className="flex gap-4">
          <button
            onClick={() => setConversionDirection('metric-to-imperial')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              conversionDirection === 'metric-to-imperial'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Metric → Imperial
          </button>
          <button
            onClick={() => setConversionDirection('imperial-to-metric')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              conversionDirection === 'imperial-to-metric'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Imperial → Metric
          </button>
        </div>
      </div>

      {/* Conversion Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* From Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {conversionDirection === 'metric-to-imperial' ? 'From (Metric)' : 'From (Imperial)'}
          </label>
          <div className="flex gap-2 mb-3">
            <select
              value={conversionDirection === 'metric-to-imperial' ? metricUnit : imperialUnit}
              onChange={conversionDirection === 'metric-to-imperial' ? handleMetricUnitChange : handleImperialUnitChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            >
              {conversionDirection === 'metric-to-imperial' && (
                <>
                  {conversionType === 'weight' && (
                    <>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                    </>
                  )}
                  {conversionType === 'length' && (
                    <>
                      <option value="m">m</option>
                      <option value="km">km</option>
                      <option value="cm">cm</option>
                    </>
                  )}
                  {conversionType === 'area' && (
                    <>
                      <option value="m²">m²</option>
                      <option value="ha">ha</option>
                    </>
                  )}
                  {conversionType === 'volume' && (
                    <>
                      <option value="L">L</option>
                      <option value="mL">mL</option>
                    </>
                  )}
                  {conversionType === 'temperature' && (
                    <>
                      <option value="°C">°C</option>
                    </>
                  )}
                </>
              )}
              {conversionDirection === 'imperial-to-metric' && (
                <>
                  {conversionType === 'weight' && (
                    <>
                      <option value="lb">lb</option>
                      <option value="oz">oz</option>
                      <option value="st">st</option>
                    </>
                  )}
                  {conversionType === 'length' && (
                    <>
                      <option value="ft">ft</option>
                      <option value="in">in</option>
                      <option value="mi">mi</option>
                    </>
                  )}
                  {conversionType === 'area' && (
                    <>
                      <option value="ft²">ft²</option>
                      <option value="ac">ac</option>
                    </>
                  )}
                  {conversionType === 'volume' && (
                    <>
                      <option value="gal">gal</option>
                      <option value="cup">cup</option>
                    </>
                  )}
                  {conversionType === 'temperature' && (
                    <>
                      <option value="°F">°F</option>
                    </>
                  )}
                </>
              )}
            </select>
            
            <input
              type="number"
              value={conversionDirection === 'metric-to-imperial' ? metricValue : imperialValue}
              onChange={(e) => conversionDirection === 'metric-to-imperial' ? setMetricValue(e.target.value) : setImperialValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
          </div>
        </div>

        {/* To Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {conversionDirection === 'metric-to-imperial' ? 'To (Imperial)' : 'To (Metric)'}
          </label>
          <div className="flex gap-2 mb-3">
            <select
              value={conversionDirection === 'metric-to-imperial' ? imperialUnit : metricUnit}
              onChange={conversionDirection === 'metric-to-imperial' ? handleImperialUnitChange : handleMetricUnitChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            >
              {conversionDirection === 'metric-to-imperial' && (
                <>
                  {conversionType === 'weight' && (
                    <>
                      <option value="lb">lb</option>
                      <option value="oz">oz</option>
                      <option value="st">st</option>
                    </>
                  )}
                  {conversionType === 'length' && (
                    <>
                      <option value="ft">ft</option>
                      <option value="in">in</option>
                      <option value="mi">mi</option>
                    </>
                  )}
                  {conversionType === 'area' && (
                    <>
                      <option value="ft²">ft²</option>
                      <option value="ac">ac</option>
                    </>
                  )}
                  {conversionType === 'volume' && (
                    <>
                      <option value="gal">gal</option>
                      <option value="cup">cup</option>
                    </>
                  )}
                  {conversionType === 'temperature' && (
                    <>
                      <option value="°F">°F</option>
                    </>
                  )}
                </>
              )}
              {conversionDirection === 'imperial-to-metric' && (
                <>
                  {conversionType === 'weight' && (
                    <>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                    </>
                  )}
                  {conversionType === 'length' && (
                    <>
                      <option value="m">m</option>
                      <option value="km">km</option>
                      <option value="cm">cm</option>
                    </>
                  )}
                  {conversionType === 'area' && (
                    <>
                      <option value="m²">m²</option>
                      <option value="ha">ha</option>
                    </>
                  )}
                  {conversionType === 'volume' && (
                    <>
                      <option value="L">L</option>
                      <option value="mL">mL</option>
                    </>
                  )}
                  {conversionType === 'temperature' && (
                    <>
                      <option value="°C">°C</option>
                    </>
                  )}
                </>
              )}
            </select>
            
            <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
              <span className="text-lg font-semibold text-gray-800">
                {conversionDirection === 'metric-to-imperial' ? imperialValue : metricValue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="flex justify-center mt-6 mb-6">
        <button
          onClick={calculateConversion}
          className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Calculate
        </button>
      </div>

      {/* Quick Reference */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Weight:</strong> 1kg = 2.205lb = 35.27oz
          </div>
          <div>
            <strong>Length:</strong> 1m = 3.281ft = 39.37in
          </div>
          <div>
            <strong>Area:</strong> 1m² = 10.764ft² = 0.00025ac
          </div>
          <div>
            <strong>Volume:</strong> 1L = 0.264gal = 4.227cup
          </div>
          <div>
            <strong>Temperature:</strong> 0°C = 32°F
          </div>
        </div>
      </div>
    </div>
  );
}
