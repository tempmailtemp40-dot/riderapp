import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_REVIEWS } from '../data/mockData';
import {
  MapPin,
  Star,
  Bookmark,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Award,
  ChevronLeft,
  Share2,
  CheckCircle2,
  Send,
  UserCheck,
} from 'lucide-react';

export const VehicleDetails: React.FC = () => {
  const {
    selectedVehicle,
    savedVehicleIds,
    toggleSaveCaptain,
    recordContact,
    navigateTo,
    t,
  } = useApp();

  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [copied, setCopied] = useState(false);

  if (!selectedVehicle) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto">
        <p className="text-sm font-semibold text-slate-600">No vehicle selected.</p>
        <button
          onClick={() => navigateTo('user_dashboard')}
          className="px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl"
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  const isSaved = savedVehicleIds.includes(selectedVehicle.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `MyTirri - ${selectedVehicle.driverName}`,
        text: `Check out ${selectedVehicle.driverName} (${selectedVehicle.category}) in ${selectedVehicle.mohalla}, ${selectedVehicle.city} on MyTirri!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setReviews([
      {
        id: 'r-' + Date.now(),
        userName: 'Passenger User',
        rating: newRating,
        comment: newComment,
        date: 'Just now',
        city: selectedVehicle.city,
      },
      ...reviews,
    ]);
    setNewComment('');
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-5 pb-28">
      {/* Navigation & Header Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('vehicle_listing')}
          className="p-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-1 text-xs font-bold transition-colors shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors shadow-2xs relative"
          >
            <Share2 className="w-4 h-4" />
            {copied && (
              <span className="absolute -bottom-7 right-0 text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md whitespace-nowrap z-30">
                Link Copied!
              </span>
            )}
          </button>

          <button
            onClick={() => toggleSaveCaptain(selectedVehicle.id)}
            className={`p-2 border rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center gap-1 ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Hero Vehicle Photo & Badge overlay */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md">
        <img
          src={selectedVehicle.vehiclePhoto}
          alt={selectedVehicle.vehicleNumber}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          {selectedVehicle.isFounderCaptain && (
            <span className="px-2.5 py-1 bg-amber-500/95 text-white backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
              👑 Founder Captain
            </span>
          )}
          {selectedVehicle.isVerified && (
            <span className="px-2.5 py-1 bg-blue-600/95 text-white backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3" /> Verified Driver
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-xs font-mono font-extrabold px-3 py-1.5 bg-slate-900/90 text-white backdrop-blur-md rounded-xl shadow-xs">
            {selectedVehicle.vehicleNumber}
          </span>
          <span className="text-xs font-extrabold px-3 py-1.5 bg-emerald-600 text-white backdrop-blur-md rounded-xl shadow-xs">
            {selectedVehicle.priceRate}
          </span>
        </div>
      </div>

      {/* Driver Card */}
      <div className="p-4 bg-white border border-slate-200 rounded-3xl shadow-xs flex items-center gap-3.5">
        <img
          src={selectedVehicle.driverPhoto}
          alt={selectedVehicle.driverName}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/30 shrink-0"
        />
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-1.5">
            <h2 className="font-extrabold text-slate-900 text-lg truncate">
              {selectedVehicle.driverName}
            </h2>
          </div>
          <p className="text-xs text-slate-600 flex items-center gap-1 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            {selectedVehicle.mohalla}, {selectedVehicle.city}
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-amber-600 font-extrabold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {selectedVehicle.rating} ({selectedVehicle.reviewCount} reviews)
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
              {selectedVehicle.availableStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Description & Route Info */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">About This Vehicle & Route</h3>
        <p className="text-xs text-slate-700 leading-relaxed">{selectedVehicle.description}</p>
      </div>

      {/* Specifications Table */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle Details</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 text-[10px] block font-semibold">Category</span>
            <span className="font-bold text-slate-900">{selectedVehicle.category}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 text-[10px] block font-semibold">Captain Type</span>
            <span className="font-bold text-slate-900 capitalize">{selectedVehicle.captainType}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 text-[10px] block font-semibold">Accepted Payments</span>
            <span className="font-bold text-slate-900">{selectedVehicle.acceptedPayments.join(', ')}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 text-[10px] block font-semibold">Commission</span>
            <span className="font-bold text-emerald-700">0% Direct Pay</span>
          </div>
        </div>
      </div>

      {/* Direct Contact Sticky Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-40 shadow-xl">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
          <a
            href={`https://wa.me/${selectedVehicle.whatsappNumber?.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordContact(selectedVehicle, 'whatsapp')}
            className="py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${selectedVehicle.phone}`}
            onClick={() => recordContact(selectedVehicle, 'call')}
            className="py-3.5 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 active:scale-[0.99] transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t('callNow')}</span>
          </a>
        </div>
      </div>

      {/* Passenger Reviews Section */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Passenger Reviews</h3>

        {/* Add Review Form */}
        <form onSubmit={handleAddReview} className="p-3.5 bg-slate-100 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Leave a Review</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="p-0.5 focus:outline-hidden"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write feedback for this driver..."
              className="flex-1 px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0"
            >
              Post
            </button>
          </div>
        </form>

        {/* Reviews List */}
        <div className="space-y-2.5">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
