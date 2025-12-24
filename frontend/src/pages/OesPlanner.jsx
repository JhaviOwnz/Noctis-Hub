// src/pages/OesPlanner.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function OesPlanner() {
    const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/oes/sections")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load OE&S categories", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container oes-page">
      {/* Header de página */}
      <header className="page-header">
        <div>
          <h2>OE&amp;S Planner</h2>
          <p className="page-subtitle">
            Operating Equipment &amp; Supplies planning workspace for Noctis
            residences.
          </p>
        </div>

        <Link to="/oes-planner/full" className="fullview-button">
          Open Full View
        </Link>
      </header>

      {/* Tarjeta resumen clara */}
      <section className="oes-card oes-summary-card">
<h3 className="oes-heading">OE&S Brainstorming Focus</h3>

<p className="oes-subtitle">
  This session is about identifying the Operating Equipment &amp; Supplies that
  support comfort, functionality, and a seamless guest experience.
</p>

<p>
  Together, we will explore what is needed for Residences 8 &amp; 9, share ideas,
  assign ownership, and begin shaping our OE&amp;S direction.
</p>

<p className="oes-note">
  This is a working document. The objective today is alignment, not completion.
</p>


        <div className="oes-summary-body">
          <div className="oes-summary-column">
            <h4>Goal</h4>
            <p>
              Turn the existing OE&amp;S spreadsheet into a clear framework we
              can discuss live. Use this planner to list items, assign owners,
              capture notes and mark decisions as final.
            </p>
          </div>
          <div className="oes-summary-column">
            <h4>How to use this page</h4>
            <ul>
              <li>List every OE&amp;S item under the relevant category.</li>
              <li>
                Assign <strong>Who</strong> is leading the decision.
              </li>
              <li>Capture supplier options and new <strong>Ideas</strong>.</li>
              <li>
                Mark items as <strong>Finalised</strong> once locked.
              </li>
            </ul>
          </div>
        </div>

        <div className="oes-chip-row">
          <span className="oes-chip-label">Categories</span>
          <div className="oes-chip-list">
            {loading && <span className="oes-chip muted">Loading...</span>}

{!loading && categories.length === 0 && (
  <span className="oes-chip muted">No categories</span>
)}

{!loading &&
  categories.map((cat) => (
    <span key={cat.id} className="oes-chip">
      {cat.name}
    </span>
  ))}
          </div>
        </div>
      </section>

      {/* Card del iframe */}
      <section className="oes-card oes-frame-card">
        <div className="oes-frame-header">
          <div>
            <h3 className="oes-heading">Worksheet</h3>
            <p className="oes-subtitle">
              Live OE&amp;S table imported from the working document. Use this
              view during the meeting to edit details in real time.
            </p>
          </div>
          <Link to="/oes-planner/full" className="oes-fullscreen-link">
            Open in full screen
          </Link>
        </div>

        <div className="planner-frame-wrapper planner-frame-wrapper-light">
          <iframe
            title="OE&S Planner"
            src="http://localhost:4000/oes-planner.html"
            className="planner-frame"
          />
        </div>
      </section>
    </div>
  );
}

