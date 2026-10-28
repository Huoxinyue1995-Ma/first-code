// Single source of truth for the brand and domain.
export const BRAND = "Resizet";
export const PRIMARY_HOST = "www.resizet.com";
export const PRIMARY_SITE_URL = `https://${PRIMARY_HOST}`;

// Previous domain. Every request to it is permanently redirected to the same path on PRIMARY_HOST.
export const LEGACY_HOSTS = ["opensourcephotoeditor.com", "www.opensourcephotoeditor.com"];
