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
      "localhost",
      "127.0.0.1",
      "llc.workers.dev", // update after deploy if needed
    ],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
  {
    hosts: ["edutz7.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.edutz7@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "gkklowzbujb5a6kwcoomdemg0tyyt2",
  },
  {
    hosts: ["edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.edutztop@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "9ulyhb17uq2cxwrp2el8fgz956fl9o",
  },
  {
    hosts: ["1edutz.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.1edutzp@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "0o28efxb4fpc6f1pnklef8wm1vlai0",
  },
  {
    hosts: ["2edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.2edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "58bcip9x19ssb1cezred7ebh3kd7sg",
  },
  {
    hosts: ["3edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.3edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "ke9zpizt10hhcu85pmupf69pyp9uy7",
  },
  {
    hosts: ["4edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.4edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "xkwiv6qxy1v28onloosesq37drtfc7",
  },
  {
    hosts: ["5edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.5edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "d99r9jj08w8eo2ygpog38rzfvjcubl",
  },
  {
    hosts: ["6edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.6edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "782jk6qtq9qv1jzi11lk2l3d66c7ig",
  },
  {
    hosts: ["7edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.7edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
  {
    hosts: ["8edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.8edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
  {
    hosts: ["9edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.9edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
  {
    hosts: ["10edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.10edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
  {
    hosts: ["11edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.11edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
  {
    hosts: ["12edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.12edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
  {
    hosts: ["13edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.13edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
  {
    hosts: ["14edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.14edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
  {
    hosts: ["15edutztop.thetimenews.us"],
    name: "Edutz LLC",
    phone: "18566483757",
    email: "info.15edutz@thetimenews.us",
    address: "2954 West Canyon Ave., San Diego, CA 92123, United States",
    facebookAuth: "",
  },
];

export function normalizeHost(host: string): string {
  return host.trim().toLowerCase().split(":")[0] ?? "";
}

export function resolveSite(host: string): SiteConfig | undefined {
  const hostname = normalizeHost(host);
  return sites.find((site) =>
    site.hosts.some((h) => normalizeHost(h) === hostname),
  );
}
