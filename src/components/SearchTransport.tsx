import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_CONFIG, CITIES_AND_MOHALLAS } from '../data/mockData';
import { VehicleCategory, PaymentMethod } from '../types';
import { Search, MapPin, SlidersHorizontal, ArrowRight, RotateCcw, Check } from 'lucide-react';

export const SearchTransport: React.FC = () => {
  const { searchFilters, setSearchFilters, resetSearchFilters, navigateTo, t } = useApp();

  const cities = Object.keys(CITIES_AND_MOHALLAS);
  const selectedCityMohallas = searchFilters.city
    ? CITIES_AND_MOHALLAS[searchFilters.city] || []
    : [];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('vehicle_listing');
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Search & Filters</h1>
          <p className="text-xs text-slate-500">Find transport in your city and mohalla</p>
        </div>
        <button
          onClick={resetSearchFilters}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <form onSubmit={handleApply} className="space-y-5">
        {/* Keyword Search */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">Keyword Search</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchFilters.searchQuery}
              onChange={(e) => setSearchFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="e.g. Salim, Tata Ace, Dzire, Aminabad..."
              className="w-full pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* City Select */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">{t('city')}</label>
          <select
            value={searchFilters.city}
            onChange={(e) => setSearchFilters((prev) => ({ ...prev, city: e.target.value, mohalla: '' }))}
            className="w-full px-3 py-3 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Mohalla Select */}
        {searchFilters.city && (
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">{t('mohalla')}</label>
            <select
              value={searchFilters.mohalla}
              onChange={(e) => setSearchFilters((prev) => ({ ...prev, mohalla: e.target.value }))}
              className="w-full px-3 py-3 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
            >
              <option value="">All Mohallas in {searchFilters.city}</option>
              {selectedCityMohallas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category Picker */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Vehicle Category</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSearchFilters((prev) => ({ ...prev, category: 'All' }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                searchFilters.category === 'All'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSearchFilters((prev) => ({ ...prev, category: cat.name }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  searchFilters.category === cat.name
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accepted Payment Method Filter */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Accepted Payment Method</label>
          <div className="grid grid-cols-4 gap-2">
            {(['All', 'Cash', 'UPI', 'Card'] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setSearchFilters((prev) => ({ ...prev, paymentMethod: method }))}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                  searchFilters.paymentMethod === method
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Verified Captains Toggle */}
        <div
          onClick={() =>
            setSearchFilters((prev) => ({ ...prev, isVerifiedOnly: !prev.isVerifiedOnly }))
          }
          className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between cursor-pointer hover:border-blue-500 transition-colors"
        >
          <div className="space-y-0.5">
            <span className="text-xs font-extrabold text-slate-900">Verified Captains Only</span>
            <p className="text-[11px] text-slate-500">Show drivers with verified mobile & vehicle details</p>
          </div>
          <div
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              searchFilters.isVerifiedOnly ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform shadow-xs ${
                searchFilters.isVerifiedOnly ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </div>
        </div>

        {/* Apply Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
        >
          <Search className="w-5 h-5" />
          <span>Apply Filters & View Results</span>
        </button>
      </form>
    </div>
  );
};
