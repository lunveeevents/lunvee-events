
import { User, EventData, UserRole, EventStatus } from './types';

const USERS_KEY = 'lunvee_users';
const EVENTS_KEY = 'lunvee_events';

// Initialize Admin
const initAdmin = () => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const adminExists = users.some((u: User) => u.role === UserRole.ADMIN);
  if (!adminExists) {
    const admin: User = {
      id: 'admin-001',
      name: 'Lunvée Admin',
      email: 'admin@lunvee.com',
      role: UserRole.ADMIN,
      password: 'admin'
    };
    users.push(admin);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

initAdmin();

export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getEvents = (): EventData[] => {
  return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
};

export const saveEvent = (event: EventData) => {
  const events = getEvents();
  events.push(event);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

export const updateEvent = (updatedEvent: EventData) => {
  const events = getEvents();
  const index = events.findIndex(e => e.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  }
};

