import { useEffect, useState } from "react";
import PolicyEditor from "../components/PolicyEditor";

export default function PolicyDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("/policy_records.json")
      .then(res => res.json())
      .then(setRecords)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧾 Policy Editor Dashboard</h1>
      {records.map((record, index) => (
        <PolicyEditor key={index} record={record} />
      ))}
    </div>
  );
}
