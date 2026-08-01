import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod, Vehicle } from '../types';
import { Check, ShieldCheck, Sparkles, ArrowRight, IndianRupee, FileText } from 'lucide-react';

export const AddVehicleFormPart2: React.FC = () => {
  const { newVehicleDraft, addVehicle, navigateTo, t } = useApp();

  const [acceptedPayments, setAcceptedPayments] = useState<PaymentMethod[]>(
    newVehicleDraft.acceptedPayments || ['Cash', 'UPI']
  );
  const [priceRate, setPriceRate] = useState(newVehicleDraft.priceRate || '₹30 - ₹100 per trip');
  const [description, setDescription] = useState(
    newVehicleDraft.description ||
      'Available for fast local trips and goods transportation. On-time service and friendly behavior.'
  );

  const togglePayment = (method: PaymentMethod) => {
    setAcceptedPayments((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalVehicle: Vehicle = {
      id: 'v-' + Date.now(),
      driverName: newVehicleDraft.driverName || 'Captain Owner',
      driverPhoto:
        newVehicleDraft.driverPhoto ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      vehiclePhoto:
        newVehicleDraft.vehiclePhoto ||
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600',
      phone: newVehicleDraft.phone || '9876543210',
      whatsappNumber: newVehicleDraft.phone || '9876543210',
      city: newVehicleDraft.city || 'Lucknow',
      mohalla: newVehicleDraft.mohalla || 'Aminabad',
      category: newVehicleDraft.category || 'E-Rickshaw',
      vehicleNumber: newVehicleDraft.vehicleNumber || 'UP 32 ER 8899',
      captainType: newVehicleDraft.captainType || 'individual',
      acceptedPayments: acceptedPayments.length > 0 ? acceptedPayments : ['Cash'],
      description,
      rating: 5.0,
      reviewCount: 1,
      isVerified: true,
      isFounderCaptain: true,
      priceRate,
      availableStatus: 'Available Now',
      totalViews: 1,
      searchAppearances: 10,
      phoneClicks: 0,
      registeredDate: new Date().toISOString().split('T')[0],
    };

    addVehicle(finalVehicle);
    navigateTo('registration_success');
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-20">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Step 2 of 2
          </span>
          <span className="text-xs font-semibold text-slate-500">Payment & Details</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('addVehiclePart2Title')}</h1>
        <p className="text-xs text-slate-600">Specify payment options & fare rates so customers can reach you easily.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Accepted Payment Methods */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">{t('acceptedPayments')} *</label>
          <div className="grid grid-cols-3 gap-2">
            {(['Cash', 'UPI', 'Card'] as PaymentMethod[]).map((method) => {
              const isChecked = acceptedPayments.includes(method);
              return (
                <div
                  key={method}
                  onClick={() => togglePayment(method)}
                  className={`p-3 rounded-xl border-2 text-center cursor-pointer font-bold text-xs transition-all flex flex-col items-center gap-1 ${
                    isChecked
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="text-lg">
                    {method === 'Cash' ? '💵' : method === 'UPI' ? '📱' : '💳'}
                  </span>
                  <span>{method}</span>
                  {isChecked && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Fare / Price Rate */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">Estimated Fare / Rate</label>
          <div className="relative">
            <IndianRupee className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              value={priceRate}
              onChange={(e) => setPriceRate(e.target.value)}
              placeholder="e.g. ₹20 per km or ₹400 per trip"
              className="w-full pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">{t('description')}</label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe available routes, vehicle condition, timing..."
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Founder Captain Highlight */}
        <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 rounded-2xl flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
              Founder Captain Badge
            </h4>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              As an early driver on MyTirri, your vehicle will be highlighted with the exclusive Founder Captain badge!
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>{t('submitVehicle')}</span>
        </button>
      </form>
    </div>
  );
};
