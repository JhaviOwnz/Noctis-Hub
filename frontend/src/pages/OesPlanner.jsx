// src/pages/OesPlanner.jsx
import { Link } from "react-router-dom";

const CATEGORIES = [
  "Design Objects",
  "Storage & Organization",
  "Appliance & Electronics",
  "F&B Items",
  "Linen",
  "Bathroom Amenities",
  "Stationery & Branding",
  "HSK & Back of House",
  "Misc",
  "Wellness Centre",
];

export default function OesPlanner() {
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
        <div className="oes-summary-top">
          <div>
            <h3 className="oes-heading">Meeting context</h3>
            <p className="oes-subtitle">
              Working document for Residences 8 &amp; 9 setup in March. Capture
              ideas, owners and final decisions for each OE&amp;S category.
            </p>
          </div>
          <div className="oes-meta">
            <div>
              <span className="oes-meta-label">Residences</span>
              <span className="oes-meta-value">8 &amp; 9</span>
            </div>
            <div>
              <span className="oes-meta-label">Status</span>
              <span className="oes-meta-value">Growing document</span>
            </div>
            <div>
              <span className="oes-meta-label">Focus</span>
              <span className="oes-meta-value">Clarity over perfection</span>
            </div>
          </div>
        </div>

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
            {CATEGORIES.map((cat) => (
              <span key={cat} className="oes-chip">
                {cat}
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

