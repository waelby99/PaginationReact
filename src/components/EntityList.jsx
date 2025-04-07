import { useState, useEffect } from 'react';
import axios from 'axios';
import './EntityList.css';

function EntityList() {
    const [entities, setEntities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchEntities = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/entities?page=${page}&limit=6`);
            setEntities(response.data.entities);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            console.error('Error fetching entities:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntities(currentPage);
    }, [currentPage]);

    return (
        <div className="container">
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <div className="entities-grid">
                        {entities.map((entity) => (
                            <div key={entity._id} className="entity-card">
                                <h3>{entity.title}</h3>
                                <img src={entity.image} alt={entity.title} className="entity-image" />
                                <p>{entity.description}</p>
                                <div className="entity-details">
                                    <span>Category: {entity.category}</span>
                                    <span>Status: {entity.active ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default EntityList;