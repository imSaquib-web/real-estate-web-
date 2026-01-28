import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../authContext";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get(`/properties?page=${page}&limit=6`);
      // Access properties from res.data IF res.data exists
      setProperties(res.data?.properties || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load properties");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/properties/${id}`);
      setProperties(properties.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete property");
    }
  };

  const applyFilter = async () => {
    try {
      setLoading(true);
      setError(null);
      const query = new URLSearchParams(filters).toString();
      const res = await API.get(`/properties/filter?${query}`);
      setProperties(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="properties-container">
      {/* FILTERS */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Property Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Min Price</label>
          <input
            type="number"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
        </div>

        <div className="filter-group">
          <label>Max Price</label>
          <input
            type="number"
            placeholder="999999"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>

        <button
          onClick={applyFilter}
          className="btn-filter bg-primary w-full h-full"
        >
          Apply Filte
        </button>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="error-state">
          <p>❌ {error}</p>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="loading-state">
          <p>⏳ Loading properties...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && properties.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏠</div>
          <h2>No Properties Found</h2>
          <p>Try adjusting filters or come back later</p>
        </div>
      ) : (
        <div className="properties-grid">
          {properties.map((p) => (
            <div className="property-card" key={p._id}>
              {/* IMAGE */}
              <div className="property-image">
                <img src={p.image || "/no-image.png"} alt={p.title} />
                <span className={`badge ${p.type}`}>
                  {p.type.toUpperCase()}
                </span>
              </div>

              {/* CONTENT */}
              <div className="property-content">
                <h3 className="property-title">{p.title}</h3>
                <p className="property-location">{p.location}</p>

                <div className="property-price">₹{p.price}</div>

                <p className="property-owner">
                  Owner: {p.createdBy?.name || "Unknown"}
                </p>

                {/* CONTACT */}
                <div className="property-contact">
                  <a href={`tel:${p.createdBy.phone}`} className="btn call">
                    📞 Call
                  </a>

                  <a
                    href={`https://wa.me/${p.createdBy.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn whatsapp"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                {/* OWNER ACTIONS */}
                {user?.id === p.createdBy?._id && (
                  <div className="property-actions">
                    <Link to={`/edit/${p._id}`} className="btnEdit">
                      Edit
                    </Link>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Properties;
