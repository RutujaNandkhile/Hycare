export const PERMISSIONS = [
  { key: "manage_gallery", label: "Gallery" },
  { key: "manage_slider", label: "Home Slider" },
  { key: "manage_users", label: "Manage Users" },
  { key: "manage_content", label: "Website Content" },
  { key: "manage_news", label: "News & Events" },
] as const;

export type PermissionKey = typeof PERMISSIONS[number]["key"];

export function hasPermission(
  user: { role?: string; permissions?: string[] } | null | undefined,
  key: PermissionKey
) {
  if (!user) return false;
  if (user.role === "admin") return true;
  return !!user.permissions?.includes(key);
}