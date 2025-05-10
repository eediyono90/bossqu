import React from "react";

function formatMonthYear(date) {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

function groupConversations(conversations) {
  const now = new Date();
  const today = now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  const prev30 = new Date(now);
  prev30.setDate(now.getDate() - 30);

  const groups = {
    Today: [],
    Yesterday: [],
    "Previous 30 Days": [],
    Monthly: {},
  };

  conversations.forEach((conv) => {
    const d = new Date(conv.createdAt);
    if (d.toDateString() === today) {
      groups.Today.push(conv);
    } else if (d.toDateString() === yesterdayStr) {
      groups.Yesterday.push(conv);
    } else if (d > prev30) {
      groups["Previous 30 Days"].push(conv);
    } else {
      const key = formatMonthYear(d);
      if (!groups.Monthly[key]) groups.Monthly[key] = [];
      groups.Monthly[key].push(conv);
    }
  });
  return groups;
}

export default function ConversationHistory({ conversations = [], onSelect }) {
  // fallback example data with createdAt
  const items = conversations.length
    ? conversations
    : [
        { id: 1, title: "Chat with AI", createdAt: new Date() },
        { id: 2, title: "Project Ideas", createdAt: new Date(Date.now() - 86400000) }, // yesterday
        { id: 3, title: "Daily Notes", createdAt: new Date(Date.now() - 3 * 86400000) }, // 3 days ago
        { id: 4, title: "Old Chat", createdAt: new Date(Date.now() - 40 * 86400000) }, // 40 days ago
      ];
  const groups = groupConversations(items);

  return (
    <div className="flex-1 overflow-y-auto">
      {groups.Today.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs text-gray-400 uppercase">Today</div>
          {groups.Today.map((conv) => (
            <li
              key={conv.id}
              className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer list-none"
              onClick={() => onSelect && onSelect(conv)}
            >
              {conv.title}
            </li>
          ))}
        </div>
      )}
      {groups.Yesterday.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs text-gray-400 uppercase">Yesterday</div>
          {groups.Yesterday.map((conv) => (
            <li
              key={conv.id}
              className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer list-none"
              onClick={() => onSelect && onSelect(conv)}
            >
              {conv.title}
            </li>
          ))}
        </div>
      )}
      {groups["Previous 30 Days"].length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs text-gray-400 uppercase">Previous 30 Days</div>
          {groups["Previous 30 Days"].map((conv) => (
            <li
              key={conv.id}
              className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer list-none"
              onClick={() => onSelect && onSelect(conv)}
            >
              {conv.title}
            </li>
          ))}
        </div>
      )}
      {Object.entries(groups.Monthly).map(([month, convs]) => (
        <div key={month}>
          <div className="px-4 py-2 text-xs text-gray-400 uppercase">{month}</div>
          {convs.map((conv) => (
            <li
              key={conv.id}
              className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer list-none"
              onClick={() => onSelect && onSelect(conv)}
            >
              {conv.title}
            </li>
          ))}
        </div>
      ))}
    </div>
  );
}
