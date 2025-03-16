import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
      setCurrentCandidate(data[0]);
    };
    fetchCandidates();
  }, []);

  const handleSaveCandidate = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    if (currentCandidate) {
      savedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    showNextCandidate();
  };

  const showNextCandidate = () => {
    const nextCandidate = candidates.shift();
    setCandidates([...candidates]);
    setCurrentCandidate(nextCandidate || null);
  };

  if (!currentCandidate) {
    return <div>No more candidates available</div>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img src={currentCandidate.avatar_url} alt={currentCandidate.name} />
        <p>Name: {currentCandidate.name}</p>
        <p>Username: {currentCandidate.login}</p>
        {currentCandidate.location && <p>Location: {currentCandidate.location}</p>}
        {currentCandidate.email && <p>Email: {currentCandidate.email}</p>}
        {currentCandidate.company && <p>Company: {currentCandidate.company}</p>}
        <a href={currentCandidate.html_url}>GitHub Profile</a>
      </div>
      <div className="candidate-buttons">
        <button onClick={handleSaveCandidate}>+</button>
        <button onClick={showNextCandidate}>-</button>
      </div>
    </div>
  );
};

export default CandidateSearch;