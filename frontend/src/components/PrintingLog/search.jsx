import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Example() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        // Perform search action with searchQuery
        console.log('Searching for:', searchQuery);
    };

    return (
        <form className="d-flex justify-content-end m-4" onSubmit={handleSearch} style={{ width: '100%' }}>
            <input
                className="form-control me-2 mt-3"
                type="search"
                placeholder="Tìm kiếm tại đây"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '25%' }}
            />
            <button className="btn btn-outline-info mt-3 " type="submit">Search</button>
        </form>
    );
}

export default Example;