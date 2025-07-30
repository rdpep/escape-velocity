'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const base = 'https://escape-velocity-api.onrender.com';
  const [materials, setMaterials] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [form, setForm] = useState({
    material: '',
    fuel_type: '',
    height: '',
    diameter: '',
    fuel_fill_percentage: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function loadOptions() {
      const matRes = await fetch(`${base}/materials`);
      const fuelRes = await fetch(`${base}/fuels`);
      setMaterials(await matRes.json());
      setFuels(await fuelRes.json());
    }
    loadOptions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setResult(null); // Clear prior result

    try {
      const res = await fetch(`${base}/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-8"
    style={{
      backgroundImage: 'url(/earth_from_space.jpg)'
    }}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 backdrop-blur-sm bg-black/70 text-white p-10 rounded-xl shadow-lg">
        {/* LEFT SIDE – Instructions/explanation */}
        <div className="flex flex-col h-full">
          <h1 className="text-3xl font-bold mb-4">Rocket Escape Velocity Calculator</h1>
          <p className="text-gray-300 mb-4">
            This tool estimates the delta-v of a rocket using basic parameters like height, diameter, material, fuel type,
            and fuel fill percentage. This is then used to calculate whether or not the rocket would achieve escape velocity 
            and escape Earth&apos;s gravitational pull.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Select a material for the rocket&apos;s shell.</li>
            <li>Choose a fuel type and how full the tank should be.</li>
            <li>Input the rocket&apos;s height and diameter in meters.</li>
            <li>Click &quot;Calculate&quot; to get an estimate of the rocket&apos;s delta-v.</li>
          </ul>
          <p className="text-sm text-gray-500 mt-auto pt-10">
            Note: This calculator is a simplified model and does not account for aerodynamic drag or real-world engine performance.
          </p>
        </div>

        {/* RIGHT SIDE – Form */}
        <div className="bg-gray-800/70 p-6 rounded-lg shadow-inner">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="font-semibold">Material</label>
            <select name="material" onChange={handleChange} required className="p-2 rounded border">
              <option value="">Select Material</option>
              {materials.map((mat) => (
                <option key={mat} value={mat}>{mat}</option>
              ))}
            </select>

            <label className="font-semibold">Fuel Type</label>
            <select name="fuel_type" onChange={handleChange} required className="p-2 rounded border">
              <option value="">Select Fuel</option>
              {fuels.map((fuel) => (
                <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>

            <label className="font-semibold">Height (m)</label>
            <input
              type="number"
              name="height"
              onChange={handleChange}
              required
              className="p-2 rounded border"
            />

            <label className="font-semibold">Diameter (m)</label>
            <input
              type="number"
              name="diameter"
              onChange={handleChange}
              required
              className="p-2 rounded border"
            />

            <label className="font-semibold">Fuel Fill Percentage (0 to 100)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              name="fuel_fill_percentage"
              onChange={handleChange}
              required
              className="p-2 rounded border"
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 py-2 px-4 rounded transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
              `}
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
          </form>
          {loading && (
            <div className="flex justify-center items-center mt-4">
               <div className="w-8 h-8 border-4 border-white border-t-blue-500 rounder-full animate-spin"></div>
            </div>
          )}

          {!loading && result && (
            <div className="mt-6 text-center">
              <h2 className="text-lg font-semibold text-green-700">Delta-V: {result.delta_v.toFixed(2)} m/s</h2>
              {result.delta_v >= 11200 ? (
                <div>
                  <p className="text-green-300 mt-2">Your rocket can escape Earth&apos;s gravity!</p>
                  <Image src="/good_escape_velo.gif" alt="Launch success" width={160} height={160} className="mx-auto mt-4 filter grayscale" />
                </div>
              ) : (
                <div>
                  <p className="text-red-300 mt-2">Your rocket cannot escape Earth&apos;s gravity.</p>
                  <Image src="/bad_escape_velo.jpg" alt="Launch fail" width={160} height={160} className="mx-auto mt-4 filter grayscale" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
