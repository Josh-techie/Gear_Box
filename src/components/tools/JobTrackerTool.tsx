'use client';

import { useState, useEffect } from 'react';
import { LocalStorage } from '@/lib/storage';

interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: string;
  dateApplied: string;
  offerLink?: string;
}

const statusOptions = [
  'Pending',
  'Applied', 
  'To Be Interviewed',
  'Interviewed',
  'Offer',
  'Rejected',
  'Ghosted (Cricket)'
];

const statusColors: { [key: string]: string } = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Applied': 'bg-blue-100 text-blue-800',
  'To Be Interviewed': 'bg-purple-100 text-purple-800',
  'Interviewed': 'bg-indigo-100 text-indigo-800',
  'Offer': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800',
  'Ghosted (Cricket)': 'bg-gray-100 text-gray-800'
};

export default function JobTrackerTool() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('');
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Pending',
    dateApplied: new Date().toISOString().split('T')[0],
    offerLink: ''
  });

  useEffect(() => {
    const savedJobs = LocalStorage.get<JobApplication[]>('job-applications', []);
    setJobs(savedJobs || []);
  }, []);

  useEffect(() => {
    LocalStorage.set('job-applications', jobs);
  }, [jobs]);

  const filteredJobs = filter 
    ? jobs.filter(job => job.status === filter)
    : jobs;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobApplication = {
      id: Date.now().toString(),
      ...formData
    };
    setJobs([...jobs, newJob]);
    setFormData({
      company: '',
      role: '',
      status: 'Pending',
      dateApplied: new Date().toISOString().split('T')[0],
      offerLink: ''
    });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    ));
  };

  if (showAddForm) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Job Application</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              required
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateApplied" className="block text-sm font-medium text-gray-700 mb-2">
              Date Applied
            </label>
            <input
              type="date"
              id="dateApplied"
              value={formData.dateApplied}
              onChange={(e) => setFormData({...formData, dateApplied: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="offerLink" className="block text-sm font-medium text-gray-700 mb-2">
              Offer Link (optional)
            </label>
            <input
              type="url"
              id="offerLink"
              value={formData.offerLink}
              onChange={(e) => setFormData({...formData, offerLink: e.target.value})}
              placeholder="https://example.com/job-posting"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Job
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-6">
          <label htmlFor="status" className="font-medium text-gray-700">Filter:</label>
          <select
            name="status"
            id="status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            <option value="">All</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Job Applications</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Add Job
          </button>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No jobs yet.</p>
          <p className="text-sm mt-2">Click "Add Job" to get started tracking your applications.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date Applied</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{job.company}</div>
                    {job.offerLink && (
                      <a 
                        href={job.offerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        View Job Posting
                      </a>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{job.role}</td>
                  <td className="py-3 px-4">
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer text-black ${statusColors[job.status]}`}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(job.dateApplied).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
