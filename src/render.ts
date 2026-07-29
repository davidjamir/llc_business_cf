import type { SiteConfig } from "./sites";

const PLACEHOLDERS = {
	name: "__SITE_NAME__",
	phone: "__SITE_PHONE__",
	email: "__SITE_EMAIL__",
	address: "__SITE_ADDRESS__",
	facebookAuth: "__SITE_FACEBOOK_AUTH__",
} as const;

/** Inject site fields into the HTML template. */
export function renderSite(html: string, site: SiteConfig): string {
	return html
		.replaceAll(PLACEHOLDERS.name, site.name)
		.replaceAll(PLACEHOLDERS.phone, site.phone)
		.replaceAll(PLACEHOLDERS.email, site.email)
		.replaceAll(PLACEHOLDERS.address, site.address)
		.replaceAll(PLACEHOLDERS.facebookAuth, site.facebookAuth);
}
