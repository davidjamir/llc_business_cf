export type SiteConfig = {
	/** Hostnames that map to this site (no port). */
	hosts: string[];
	name: string;
	phone: string;
	email: string;
	address: string;
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
		email: "info@thetimenews.us",
		address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
	},
	// Example: add more domains here
	// {
	//   hosts: ["example.com", "www.example.com"],
	//   name: "Example LLC",
	//   phone: "10000000000",
	//   email: "hello@example.com",
	//   address: "123 Main St, City, ST 00000, United States",
	// },
];

export function normalizeHost(host: string): string {
	return host.trim().toLowerCase().split(":")[0] ?? "";
}

export function resolveSite(host: string): SiteConfig | undefined {
	const hostname = normalizeHost(host);
	return sites.find((site) => site.hosts.some((h) => normalizeHost(h) === hostname));
}
