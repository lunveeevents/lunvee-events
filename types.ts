
export enum UserRole {
  CLIENT = 'CLIENT',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN'
}

export enum EventStatus {
  CREATED = 'Event Created',
  MANAGER_ASSIGNED = 'Event Manager Assigned',
  INITIAL_PLANNING = 'Initial Planning',
  INITIAL_PLANNING_DONE = 'Initial Planning Done',
  VENDOR_SELECTION = 'Vendor Selection',
  FINAL_PLANNING = 'Final Planning',
  FINAL_PLANNING_DONE = 'Final Planning Done',
  FINAL_PREPARATIONS = 'Final Preparations',
  EXECUTION = 'Execution',
  FEEDBACK_COLLECTION = 'Feedback Collection',
  SUCCESSFULLY_CREATED = 'Event Successfully Created'
}

export const EVENT_STATUS_ORDER: EventStatus[] = [
  EventStatus.CREATED,
  EventStatus.MANAGER_ASSIGNED,
  EventStatus.INITIAL_PLANNING,
  EventStatus.INITIAL_PLANNING_DONE,
  EventStatus.VENDOR_SELECTION,
  EventStatus.FINAL_PLANNING,
  EventStatus.FINAL_PLANNING_DONE,
  EventStatus.FINAL_PREPARATIONS,
  EventStatus.EXECUTION,
  EventStatus.FEEDBACK_COLLECTION,
  EventStatus.SUCCESSFULLY_CREATED
];

export enum EventType {
  FULL_WEDDING = 'Full Wedding Package',
  ONLY_WEDDING = 'Only Wedding',
  BIRTHDAY = 'Birthdays',
  PRIVATE_PARTY = 'Private Parties',
  CONCERT = 'Concerts',
  CORPORATE = 'Corporate Events',
  CONFERENCE = 'Conferences',
  OTHERS = 'Others'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  password?: string;
}

export interface EventData {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientDob: string;
  type: EventType;
  otherDescription?: string;
  date: string;
  guestCount: number;
  status: EventStatus;
  managerId?: string;
  createdAt: string;
}

