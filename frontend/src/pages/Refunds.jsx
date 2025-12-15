import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000";

export default function Refunds() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    bookingNumber: "",
    guestName: "",
    email: "",
    phone: "",
    amountRequested: "",
    reason: "",
    details: "",
  });

  const [files, setFiles] = useState({
    windcaveLetter: null,
    operaReceipt: null,
    refundForm: null,
  });

  const loadRefunds = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/refunds`);
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setRefunds(data);
    } catch (err) {
      console.error("Error loading refunds", err);
      setError("Error loading refunds");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRefunds();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: inputFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: inputFiles[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (files.windcaveLetter) {
        formData.append("windcaveLetter", files.windcaveLetter);
      }
      if (files.operaReceipt) {
        formData.append("operaReceipt", files.operaReceipt);
      }
      if (files.refundForm) {
        formData.append("refundForm", files.refundForm);
      }

      const res = await fetch(`${API_BASE}/api/refunds`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create refund");
      }

      setForm({
        bookingNumber: "",
        guestName: "",
        email: "",
        phone: "",
        amountRequested: "",
        reason: "",
        details: "",
      });
      setFiles({
        windcaveLetter: null,
        operaReceipt: null,
        refundForm: null,
      });
      setShowForm(false);
      await loadRefunds();
    } catch (err) {
      console.error("Error creating refund", err);
      setError("Error creating refund");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h2>Refunds</h2>
          <p className="page-subtitle">
            Manage guest refund requests from Front Office.
          </p>
        </div>
        <button
          className="fullview-button"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "Close" : "New Refund"}
        </button>
      </header>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="fun-card"
          style={{ marginTop: 16 }}
        >
          <h3>New Refund Request</h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Booking Number</label>
              <input
                name="bookingNumber"
                value={form.bookingNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Guest Name</label>
              <input
                name="guestName"
                value={form.guestName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Amount Requested</label>
              <input
                name="amountRequested"
                type="number"
                step="0.01"
                value={form.amountRequested}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Reason</label>
              <input
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <label>Details</label>
              <textarea
                name="details"
                rows={3}
                value={form.details}
                onChange={handleChange}
              />
            </div>

            <div className="form-group form-group-full">
              <label>Windcave confirmation letter</label>
              <input
                type="file"
                name="windcaveLetter"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-group form-group-full">
              <label>Opera official receipt</label>
              <input
                type="file"
                name="operaReceipt"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-group form-group-full">
              <label>Refund request form</label>
              <input
                type="file"
                name="refundForm"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            className="fullview-button"
            type="submit"
            disabled={submitting}
            style={{ marginTop: 12 }}
          >
            {submitting ? "Saving..." : "Save Refund"}
          </button>
        </form>
      )}

      <section style={{ marginTop: 24 }}>
        <h3>Existing Refund Requests</h3>

        {loading ? (
          <p>Loading...</p>
        ) : refunds.length === 0 ? (
          <p>No refund requests yet.</p>
        ) : (
          <div className="table-wrapper fun-card" style={{ marginTop: 12 }}>
            <table className="refund-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Booking No.</th>
                  <th>Guest Name</th>
                  <th>Amount</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.bookingNumber}</td>
                    <td>{r.guestName}</td>
                    <td>{r.amountRequested}</td>
                    <td>{r.reason}</td>
                    <td>{r.status}</td>
                    <td>
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
