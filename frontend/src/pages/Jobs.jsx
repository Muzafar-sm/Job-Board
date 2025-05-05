import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/common/Button';
import './Jobs.scss';

const Jobs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const queryParams = new URLSearchParams(searchParams);
        const response = await fetch(`http://localhost:5000/api/jobs?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          credentials: 'omit'
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setJobs(data.jobs || []);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Unable to load jobs. Please check if the server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs">
        <div className="jobs__empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="jobs__empty-title">{error}</h2>
          <Button
            onClick={() => window.location.reload()}
            variant="secondary"
            size="small"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs">
      <div className="jobs__header">
        <h1 className="jobs__title">Available Jobs</h1>
        <p className="jobs__count">{jobs.length} positions found</p>
      </div>

      <div className="jobs__grid">
        {jobs.map((job) => (
          <div key={job._id} className="jobs__card">
            <div className="jobs__content">
              <div className="jobs__header-content">
                <div>
                  <h2 className="jobs__job-title">{job.title}</h2>
                  <p className="jobs__company">{job.company}</p>
                </div>
                <span className="jobs__type-badge">{job.type}</span>
              </div>

              <div className="jobs__details">
                <div className="jobs__detail">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{job.location}</span>
                </div>

                <div className="jobs__detail">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <Button
                onClick={() => navigate(`/jobs/${job._id}`)}
                variant="secondary"
                fullWidth
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="jobs__empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="jobs__empty-title">No jobs found matching your criteria</h2>
          <p className="jobs__empty-text">Try adjusting your search filters or check back later</p>
        </div>
      )}
    </div>
  );
};

export default Jobs;