
import React, { useState, useEffect } from 'react';
import { User, EventData, EventStatus, EVENT_STATUS_ORDER } from '../types';
import { getEvents, updateEvent } from '../store';

interface DashboardManagerProps {
  user: User;
}

export const DashboardManager: React.FC<DashboardManagerProps> = ({ user }) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);

  useEffect(() => {
    setEvents(getEvents().filter(e => e.managerId === user.id));
  }, [user.id]);

  const handleUpdate = (event: EventData) => {
    updateEvent(event);
    setEvents(getEvents().filter(e => e.managerId === user.id));
    setEditingEvent(null);
  };

  const advanceStatus = (event: EventData) => {
    const currentIndex = EVENT_STATUS_ORDER.indexOf(event.status);
    if (currentIndex < EVENT_STATUS_ORDER.length - 1) {
      const nextStatus = EVENT_STATUS_ORDER[currentIndex + 1];
      const updated = { ...event, status: nextStatus };
      handleUpdate(updated);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-slate-900">Manager Console</h1>
        <p className="text-slate-600">Managing assigned events for {user.name}.</p>
      </header>

      <div className="space-y-6">
        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No events assigned to you yet.</p>
          </div>
        ) : (
          events.map(event => (
            <div key={event.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded">
                      {event.type}
                    </span>
                    <span className="text-slate-400 text-xs">#{event.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Event Date: {new Date(event.date).toLocaleDateString()}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div>
                      <p className="text-slate-500">Client Name</p>
                      <p className="font-medium text-slate-900">{event.clientName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Client Phone</p>
                      <p className="font-medium text-slate-900">{event.clientPhone}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Current Status</p>
                      <p className="font-semibold text-indigo-600">{event.status}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Guest Count</p>
                      <p className="font-medium text-slate-900">{event.guestCount}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors"
                  >
                    Edit Event Details
                  </button>
                  <button
                    onClick={() => advanceStatus(event)}
                    disabled={event.status === EventStatus.SUCCESSFULLY_CREATED}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Status Update
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editingEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Event: {editingEvent.id}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Event Date</label>
                <input
                  type="date"
                  value={editingEvent.date}
                  onChange={e => setEditingEvent({...editingEvent, date: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Update Status</label>
                <select
                  value={editingEvent.status}
                  onChange={e => setEditingEvent({...editingEvent, status: e.target.value as EventStatus})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {EVENT_STATUS_ORDER.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => handleUpdate(editingEvent)}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="flex-1 border border-slate-300 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
