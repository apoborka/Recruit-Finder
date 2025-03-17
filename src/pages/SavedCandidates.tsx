import React, { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>('name');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    console.log('Retrieved candidates from local storage:', candidates); // Debug log
    setSavedCandidates(candidates);
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleRemoveCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  const filteredCandidates = savedCandidates
    .filter(candidate => candidate.name?.toLowerCase().includes(filter.toLowerCase()) || candidate.login.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      const aValue = (a as any)[sortCriteria] || '';
      const bValue = (b as any)[sortCriteria] || '';
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });

  if (filteredCandidates.length === 0) {
    return <div>No candidates have been accepted</div>;
  }

  return (
    <div>
      <h1>Saved Candidates</h1>
      <div className="filter-sort">
        <label>
          Sort by:
          <select value={sortCriteria} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="company">Company</option>
          </select>
        </label>
        <label>
          Filter by name:
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map(candidate => (
            <tr key={candidate.id}>
              <td><img src={candidate.avatar_url} alt={candidate.name || candidate.login} width="50" /></td>
              <td>{candidate.name || 'N/A'}</td>
              <td>{candidate.login}</td>
              <td>{candidate.location || 'N/A'}</td>
              <td>{candidate.email || 'N/A'}</td>
              <td>{candidate.company || 'N/A'}</td>
              <td>{candidate.bio || 'N/A'}</td>
              <td>
                <button onClick={() => handleRemoveCandidate(candidate.id)}>Remove from list</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;