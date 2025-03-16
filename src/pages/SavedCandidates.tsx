import React, { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>('name');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredCandidates = savedCandidates
    .filter(candidate => candidate.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      const aValue = (a as any)[sortCriteria];
      const bValue = (b as any)[sortCriteria];
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
      <ul>
        {filteredCandidates.map(candidate => (
          <li key={candidate.id} className="candidate-card">
            <img src={candidate.avatar_url} alt={candidate.name} />
            <p>Name: {candidate.name}</p>
            <p>Username: {candidate.login}</p>
            {candidate.location && <p>Location: {candidate.location}</p>}
            {candidate.email && <p>Email: {candidate.email}</p>}
            {candidate.company && <p>Company: {candidate.company}</p>}
            <a href={candidate.html_url}>GitHub Profile</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;