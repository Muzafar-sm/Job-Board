import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append('keyword', searchTerm);
    if (location) queryParams.append('location', location);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSearching(false);
    navigate(`/jobs?${queryParams.toString()}`);
  };

  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__content">
          <h1 className="home__title">Find Your Dream Job Today</h1>
          <p className="home__subtitle">
            Search through thousands of job listings and find the perfect match for your career goals.
          </p>
          <form onSubmit={handleSearch} className="home__search">
            <div className="home__search-inputs">
              <Input
                type="text"
                label="Job title or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Input
                type="text"
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                type="submit"
                variant="primary"
                loading={isSearching}
                size="large"
                fullWidth
              >
                Search Jobs
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;