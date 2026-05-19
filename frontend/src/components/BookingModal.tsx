"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Car, Wrench, Clock, User, Phone, CheckCircle, ArrowRight } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function BookingModal({ isOpen, onClose, initialService = "" }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carModel: "",
    serviceType: initialService,
    pickupDrop: "No",
    date: "",
    time: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `Hello Sangat Motor Centre, I would like to book a service.

*Booking Details:*
• *Name:* ${formData.name}
• *Phone:* ${formData.phone}
• *Car Model:* ${formData.carModel}
• *Service:* ${formData.serviceType}
• *Pickup & Drop:* ${formData.pickupDrop === "Yes" ? "Required" : "Not Required"}
• *Preferred Date:* ${formData.date}
• *Preferred Time:* ${formData.time}
${formData.notes ? `• *Notes:* ${formData.notes}` : ""}`;

    const whatsappUrl = `https://wa.me/919386992921?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Simulate API request completion locally
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      carModel: "",
      serviceType: "",
      pickupDrop: "No",
      date: "",
      time: "",
      notes: "",
    });
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-[#0d0d0c] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {isSubmitted ? "Booking Confirmed" : "Book Your Service"}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Sangat Motor Centre Premium Care</p>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-zinc-400 mb-1.5">FULL NAME</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Rahul Sharma"
                          className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider text-zinc-400 mb-1.5">PHONE NUMBER</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 93869 92921"
                          className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-zinc-400 mb-1.5">PICKUP & DROP SERVICE</label>
                    <div className="relative">
                      <Car className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                      <select
                        required
                        value={formData.pickupDrop}
                        onChange={(e) => setFormData({ ...formData, pickupDrop: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                      >
                        <option value="No">No, I will drop off & pick up the vehicle myself</option>
                        <option value="Yes">Yes, arrange pickup & drop-off service</option>
                      </select>
                    </div>
                  </div>

                  {/* Car & Service Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-zinc-400 mb-1.5">CAR MODEL / YEAR</label>
                      <div className="relative">
                        <Car className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          required
                          value={formData.carModel}
                          onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                          placeholder="Porsche 911 (2024)"
                          className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider text-zinc-400 mb-1.5">SERVICE TYPE</label>
                      <div className="relative">
                        <Wrench className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <select
                          required
                          value={formData.serviceType}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                        >
                          <option value="" disabled>Select a service</option>
                          <option value="Car Servicing">Full Scheduled Servicing</option>
                          <option value="Diagnostics & Repairs">Diagnostics & Repairs</option>
                          <option value="Premium Car Wash">Premium Foam Wash</option>
                          <option value="Professional Detailing">Ceramic Detailing</option>
                          <option value="Brake Repair & Services">Brake Maintenance</option>
                          <option value="Genuine Spare Parts">Spare Parts Replacement</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-zinc-400 mb-1.5">PREFERRED DATE</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 transition-colors [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider text-zinc-400 mb-1.5">PREFERRED TIME</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <select
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                        >
                          <option value="" disabled>Select a slot</option>
                          <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                          <option value="11:30 AM">11:30 AM - 01:30 PM</option>
                          <option value="02:30 PM">02:30 PM - 04:30 PM</option>
                          <option value="05:00 PM">05:00 PM - 07:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-zinc-400 mb-1.5">ADDITIONAL NOTES (OPTIONAL)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Specify any issues or custom requests here..."
                      rows={3}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Confirm Booking
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 bg-orange-500/10 border border-orange-500 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-orange-500" />
                  </motion.div>

                  <h4 className="text-xl font-bold text-white mb-2">Thank You, {formData.name}!</h4>
                  <p className="text-sm text-zinc-400 max-w-sm mb-6">
                    Your appointment has been successfully requested. Our service advisor will call you shortly to confirm your booking details.
                  </p>

                  {/* Summary Card */}
                  <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-left space-y-3 mb-8">
                    <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800">
                      <span className="text-zinc-500 font-mono">APPOINTMENT SUMMARY</span>
                      <span className="text-orange-500 font-mono font-semibold">PENDING CONFIRMATION</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                      <div>
                        <span className="text-zinc-500 block mb-0.5">VEHICLE</span>
                        <span className="text-white font-medium">{formData.carModel}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block mb-0.5">SERVICE</span>
                        <span className="text-white font-medium">{formData.serviceType}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block mb-0.5">PICKUP & DROP</span>
                        <span className="text-white font-medium">{formData.pickupDrop === "Yes" ? "Required" : "Not Required"}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block mb-0.5">CONTACT PHONE</span>
                        <span className="text-white font-medium">{formData.phone}</span>
                      </div>
                      <div className="col-span-2 mt-1">
                        <span className="text-zinc-500 block mb-0.5">PREFERRED DATE & TIME</span>
                        <span className="text-white font-medium">{formData.date} at {formData.time}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white rounded-lg text-sm transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
