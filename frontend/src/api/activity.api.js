import { BaseApi } from "./instance/api";

export async function getActivityLogs() {
  const res = await BaseApi.get("/rest/v1/activity?select=*");
  console.log("Get All activity", res);
  return res;
}

export async function createActivityLog({
  user_id,
  workspace_id,
  action,
  entity_type,
  entity_id,
  details = {},
}) {
  try {
    await BaseApi.post("/rest/v1/activity", {
      user_id,
      workspace_id,
      action,
      entity_type,
      entity_id,
      details,
    });
  } catch (err) {
    (console.log("Log error"), err?.message);
  }
}
