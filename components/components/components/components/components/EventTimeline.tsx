
import React from 'react';
import { EventStatus, EVENT_STATUS_ORDER } from '../types';

interface EventTimelineProps {
  currentStatus: EventStatus;
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ currentStatus }) => {
  const currentIndex = EVENT_STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="w-full py-6">
      <div className="flex flex-col space-y-4">
        {EVENT_STATUS_ORDER.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={status} className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-400'
                } ${isCurrent ? 'ring-4 ring-indigo-100' : ''}`}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                {index < EVENT_STATUS_ORDER.length - 1 && (
                  <div className={`w-0.5 h-8 my-1 transition-colors duration-300 ${
                    index < currentIndex ? 'bg-indigo-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
              <div className="pt-1">
                <p className={`text-sm font-medium ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                  {status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

