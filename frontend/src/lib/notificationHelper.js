export const WATCHED_FIELDS = {
  status: "status",
  due_date: "due date",
  priority: "priority",
  title: "title",
  assigned_user_id: "assignee",
};

export function getTaskChanges(prev, next) {
  if (!prev) return [];

  return Object.entries(WATCHED_FIELDS)
    .filter(([field]) => {
      const oldVal = prev[field] ?? null;
      const newVal = next[field] ?? null;
      return oldVal !== newVal;
    })
    .map(([field, label]) => ({
      field,
      label,
      from: prev[field],
      to: next[field],
    }));
}

export function buildDescription(changes, taskTitle) {
  if (changes.length === 1) {
    const { label, from, to } = changes[0];
    return `changed ${label} from "${from}" to "${to}" on "${taskTitle}"`;
  }

  const labels = changes.map((c) => c.label).join(", ");
  return `updated ${labels} on "${taskTitle}"`;
}