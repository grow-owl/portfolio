import fs from "fs";
import path from "path";

const CALENDARS_FILE = path.join(process.cwd(), "src", "data", "cms", "calendars.json");

export function readCalendars() {
  try {
    if (!fs.existsSync(CALENDARS_FILE)) return [];
    const raw = fs.readFileSync(CALENDARS_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Error reading calendars.json:", err);
    return [];
  }
}

export function writeCalendars(data) {
  try {
    const dir = path.dirname(CALENDARS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CALENDARS_FILE, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing calendars.json:", err);
    return false;
  }
}

export function getCalendarByClient(clientId) {
  const all = readCalendars();
  if (!clientId || clientId === "all") return all[0] || null;
  return all.find((c) => c.id === clientId) || null;
}

/**
 * Validate client key.
 * If clientId is supplied, verifies key matches that exact client.
 * If clientId is not supplied, finds any client whose accessKey matches.
 */
export function authenticateClientCalendar(clientId, accessKey) {
  if (!accessKey) return null;
  const cleanKey = String(accessKey).trim().toLowerCase();
  if (!cleanKey) return null;

  const all = readCalendars();

  if (clientId) {
    const cal = all.find((c) => c.id === clientId);
    if (!cal) return null;
    const clientKey = String(cal.accessKey || `${cal.id}@grow26`).trim().toLowerCase();
    if (clientKey === cleanKey) {
      return cal;
    }
    return null;
  }

  // Look up by access key alone
  const matched = all.find((c) => {
    const k = String(c.accessKey || `${c.id}@grow26`).trim().toLowerCase();
    return k === cleanKey;
  });

  return matched || null;
}

export function saveCalendarItem(clientId, item) {
  const all = readCalendars();
  let cal = all.find((c) => c.id === clientId);

  if (!cal) {
    cal = {
      id: clientId,
      clientName: clientId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      category: "General Business",
      planName: "Growth Starter Plan",
      planPrice: "",
      accessKey: `${clientId}@grow26`,
      month: "October 2026",
      deliverables: "8 Reels / 6 Posts / 10-12 Stories",
      frequency: "2 Every Week Reel / 1 Post / 3 Stories",
      targets: { reels: 8, posts: 6, stories: 12 },
      items: [],
    };
    all.push(cal);
  }

  const existingIdx = cal.items.findIndex((i) => i.id === item.id);
  if (existingIdx !== -1) {
    cal.items[existingIdx] = { ...cal.items[existingIdx], ...item, updated_at: new Date().toISOString() };
  } else {
    const newItem = {
      ...item,
      id: item.id || `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
    };
    cal.items.push(newItem);
  }

  writeCalendars(all);
  return { success: true, calendar: cal };
}

export function deleteCalendarItem(clientId, itemId) {
  const all = readCalendars();
  const cal = all.find((c) => c.id === clientId);
  if (!cal) return { success: false, message: "Calendar not found" };

  cal.items = cal.items.filter((i) => i.id !== itemId);
  writeCalendars(all);
  return { success: true, calendar: cal };
}

export function updateCalendarSettings(
  clientId,
  { clientName, category, planName, planPrice, month, deliverables, frequency, targets, accessKey }
) {
  const all = readCalendars();
  let cal = all.find((c) => c.id === clientId);

  const cleanAccessKey = accessKey ? String(accessKey).trim() : `${clientId}@grow26`;

  if (!cal) {
    cal = {
      id: clientId,
      clientName: clientName || clientId,
      category: category || "Business",
      planName: planName || "Custom Plan",
      planPrice: planPrice || "",
      accessKey: cleanAccessKey,
      month: month || "October 2026",
      deliverables: deliverables || "8 Reels / 6 Posts / 10 Stories",
      frequency: frequency || "2 Every Week Reel",
      targets: targets || { reels: 8, posts: 6, stories: 10 },
      items: [],
    };
    all.push(cal);
  } else {
    if (clientName) cal.clientName = clientName;
    if (category) cal.category = category;
    if (planName) cal.planName = planName;
    if (planPrice) cal.planPrice = planPrice;
    if (month) cal.month = month;
    if (deliverables) cal.deliverables = deliverables;
    if (frequency) cal.frequency = frequency;
    if (targets) cal.targets = targets;
    if (accessKey !== undefined && accessKey !== null) {
      cal.accessKey = String(accessKey).trim() || `${clientId}@grow26`;
    } else if (!cal.accessKey) {
      cal.accessKey = `${clientId}@grow26`;
    }
  }

  writeCalendars(all);
  return { success: true, calendar: cal };
}
