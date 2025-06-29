import React from 'react';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-20">
          <div className="mb-6">
            <Construction className="mx-auto h-16 w-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming in Sprint 2-4</h3>
            <p className="text-gray-600 text-sm">
              This feature is part of our upcoming development sprints. 
              Check back soon for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}