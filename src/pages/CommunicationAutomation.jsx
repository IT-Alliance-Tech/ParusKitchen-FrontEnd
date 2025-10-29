import React, { useState } from "react";

const CommunicationAutomation = () => {
  const [logs, setLogs] = useState([]);

  const handleSendWhatsApp = () => {
    setLogs((prev) => [
      ...prev,
      { type: "WhatsApp", message: "Test WhatsApp message sent successfully!" },
    ]);
  };

  const handleSendEmail = () => {
    setLogs((prev) => [
      ...prev,
      { type: "Email", message: "Test Email sent successfully!" },
    ]);
  };

  const handleSendReminder = () => {
    setLogs((prev) => [
      ...prev,
      { type: "Reminder", message: "Renewal reminder triggered successfully!" },
    ]);
  };

  const handleSendMenuUpdate = () => {
    setLogs((prev) => [
      ...prev,
      { type: "Menu Update", message: "Tomorrow’s menu broadcasted successfully!" },
    ]);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary-800">
        Communication & Automation
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* WhatsApp Automation */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100 transition">
          <h2 className="text-lg font-semibold mb-2">WhatsApp Automation</h2>
          <p className="text-gray-600 text-sm mb-3">
            Send daily menu updates or subscription confirmations.
          </p>
          <button
            onClick={handleSendWhatsApp}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Send Test WhatsApp
          </button>
        </div>

        {/* Email Automation */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100 transition">
          <h2 className="text-lg font-semibold mb-2">Email Notifications</h2>
          <p className="text-gray-600 text-sm mb-3">
            Trigger confirmation or renewal reminder emails.
          </p>
          <button
            onClick={handleSendEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send Test Email
          </button>
        </div>

        {/* Renewal Reminders */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100 transition">
          <h2 className="text-lg font-semibold mb-2">Renewal Reminders</h2>
          <p className="text-gray-600 text-sm mb-3">
            Notify customers before subscription expiry.
          </p>
          <button
            onClick={handleSendReminder}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Send Reminder
          </button>
        </div>

        {/* Menu Updates */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100 transition">
          <h2 className="text-lg font-semibold mb-2">Menu Updates</h2>
          <p className="text-gray-600 text-sm mb-3">
            Broadcast tomorrow’s meal menu to all users.
          </p>
          <button
            onClick={handleSendMenuUpdate}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Push Menu Update
          </button>
        </div>
      </div>

      {/* Action Logs */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-primary-700">
          Automation Logs
        </h2>

        {logs.length === 0 ? (
          <p className="text-gray-500 text-sm">No automation triggered yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {logs.map((log, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <span className="font-medium text-gray-800">{log.type}</span>
                <span className="text-gray-600">{log.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommunicationAutomation;
