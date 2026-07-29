export type SiteConfig = {
	/** Hostnames that map to this site (no port). */
	hosts: string[];
	name: string;
	phone: string;
	email: string;
	address: string;
	facebookAuth: string;
};

/**
 * Domain → site content.
 * Match by request hostname (lowercase, without port).
 */
export const sites: SiteConfig[] = [
	{
		hosts: [
			"edutz.thetimenews.us",
			"edutz7.thetimenews.us",
			"edutztop.thetimenews.us",
			"localhost",
			"127.0.0.1",
			"llc.workers.dev", // update after deploy if needed
		],
		name: "Edutz LLC",
		phone: "18566483757",
		email: "info.edutz@thetimenews.us",
		address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
		facebookAuth: ""
	},
	{
		hosts: [
			"edutz7.thetimenews.us",
		],
		name: "Edutz LLC",
		phone: "18566483757",
		email: "info.edutz7@thetimenews.us",
		address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
		facebookAuth: ""
	},
	{
		hosts: [
			"edutztop.thetimenews.us",
		],
		name: "Edutz LLC",
		phone: "18566483757",
		email: "info.edutztop@thetimenews.us",
		address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
		facebookAuth: ""
	},
];

export function normalizeHost(host: string): string {
	return host.trim().toLowerCase().split(":")[0] ?? "";
}

export function resolveSite(host: string): SiteConfig | undefined {
	const hostname = normalizeHost(host);
	return sites.find((site) => site.hosts.some((h) => normalizeHost(h) === hostname));
}
