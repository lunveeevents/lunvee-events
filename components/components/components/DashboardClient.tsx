
import React, { useState, useEffect } from 'react';
import { User, EventData, EventType, EventStatus } from '../types';
import { EVENT_TYPES } from '../constants';
import { getEvents, saveEvent } from '../store';
import { EventTimeline } from './EventTimeline';

interface DashboardClientProps {
  user: User;
}

export const DashboardClient: React.FC<DashboardClientProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'create' | 'my-events'>('create');
  const [events, setEvents] = useState<EventData[]>([]);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '',
    dob: '',
    type: EventType.FULL_WEDDING,
    otherDescription: '',
    date: '',
    guestCount: 10
  });

  useEffect(() => {
    setEvents(getEvents().filter(e => e.clientId === user.id));
  }, [user.id, activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: EventData = {
      id: Math.random().toString(36).substr(2, 9),
      clientId: user.id,
      clientName: formData.name,
      clientPhone: formData.phone,
      clientDob: formData.dob,
      type: formData.type,
      otherDescription: formData.type === EventType.OTHERS ? formData.otherDescription : undefined,
      date: formData.date,
      guestCount: formData.guestCount,
      status: EventStatus.CREATED,
      createdAt: new Date().toISOString()
    };
    saveEvent(newEvent);
    alert('Event created successfully!');
    setActiveTab('my-events');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-slate-900">Welcome, {user.name}</h1>
        <p className="text-slate-600">Plan your next extraordinary moment with Lunvée.</p>
      </header>

      <div className="flex space-x-4 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('create')}
          className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'create' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Create New Event
        </button>
        <button
          onClick={() => setActiveTab('my-events')}
          className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'my-events' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          My Events
        </button>
      </div>

      {activeTab === 'create' ? (
        <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input
                required
                type="date"
                value={formData.dob}
                onChange={e => setFormData({...formData, dob: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Event Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as EventType})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {EVENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>

          {formData.type === EventType.OTHERS && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-medium text-slate-700 mb-1">Please describe your event</label>
              <textarea
                required
                value={formData.otherDescription}
                onChange={e => setFormData({...formData, otherDescription: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Event Date</label>
              <input
                required
                type="date"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <p className="text-xs text-slate-400 mt-1">Note: Only an event manager can change this date once submitted.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Guest Count</label>
              <input
                required
                type="number"
                min="1"
                value={formData.guestCount}
                onChange={e => setFormData({...formData, guestCount: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Create Event
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {events.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500">You haven't created any events yet.</p>
              <button
                onClick={() => setActiveTab('create')}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                Create your first event
              </button>
            </div>
          ) : (
            events.map(event => (
              <div key={event.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {event.type}
                      </span>
                      <span className="text-slate-400 text-xs">ID: {event.id}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-slate-900 mb-4">Event on {new Date(event.date).toLocaleDateString()}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div>
                        <p className="text-slate-500">Guest Count</p>
                        <p className="font-semibold text-slate-900">{event.guestCount}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Current Status</p>
                        <p className="font-semibold text-indigo-600">{event.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-64 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Progress</h4>
                    <EventTimeline currentStatus={event.status} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

