
import React, { useState, useEffect } from 'react';
import { User, EventData, UserRole, EventStatus } from '../types';
import { getUsers, getEvents, updateEvent } from '../store';

export const DashboardAdmin: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [managers, setManagers] = useState<User[]>([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const allEvents = getEvents();
    const allUsers = getUsers();
    setEvents(allEvents);
    setUsers(allUsers);
    setManagers(allUsers.filter(u => u.role === UserRole.MANAGER));
  };

  const assignManager = (eventId: string, managerId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const updated = { ...event, managerId, status: event.status === EventStatus.CREATED ? EventStatus.MANAGER_ASSIGNED : event.status };
      updateEvent(updated);
      refreshData();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-slate-900">Administrator Panel</h1>
        <p className="text-slate-600">System overview and event assignments.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-800 mb-4">All Events</h2>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-slate-600">Event Info</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Client</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Status</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Assign Manager</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No events found in the system.</td>
                  </tr>
                ) : (
                  events.map(event => (
                    <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{event.type}</p>
                        <p className="text-xs text-slate-500">{new Date(event.date).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700">{event.clientName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === EventStatus.SUCCESSFULLY_CREATED ? 'bg-green-100 text-green-700' : 'bg-indigo-50 text-indigo-700'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          className="w-full px-2 py-1 border border-slate-300 rounded focus:ring-indigo-500 outline-none"
                          value={event.managerId || ''}
                          onChange={(e) => assignManager(event.id, e.target.value)}
                        >
                          <option value="">Select Manager</option>
                          {managers.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">All Users</h2>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
            {users.map(u => (
              <div key={u.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-tighter uppercase ${
                  u.role === UserRole.ADMIN ? 'bg-amber-100 text-amber-700' :
                  u.role === UserRole.MANAGER ? 'bg-indigo-100 text-indigo-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

