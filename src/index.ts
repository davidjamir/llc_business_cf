import { renderSite } from "./render";
import { resolveSite } from "./sites";

type ContactBody = {
	full_name?: string;
	phone_number?: string;
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			return handleApi(request, url);
		}

		const site = resolveSite(url.hostname);
		if (!site) {
			return new Response("Site not configured for this domain", {
				status: 404,
				headers: { "Content-Type": "text/plain; charset=utf-8" },
			});
		}

		const isHtml =
			url.pathname === "/" ||
			url.pathname === "/index.html" ||
			url.pathname.endsWith(".html");

		if (!isHtml) {
			return env.ASSETS.fetch(request);
		}

		const assetResponse = await env.ASSETS.fetch(request);
		if (!assetResponse.ok) {
			return assetResponse;
		}

		const template = await assetResponse.text();
		const html = renderSite(template, site);

		return new Response(html, {
			status: assetResponse.status,
			headers: {
				"Content-Type": "text/html; charset=utf-8",
				"Cache-Control": "public, max-age=60",
			},
		});
	},
} satisfies ExportedHandler<Env>;

async function handleApi(request: Request, url: URL): Promise<Response> {
	const headers = {
		"Content-Type": "application/json; charset=utf-8",
		"Cache-Control": "no-store",
	};

	if (url.pathname === "/api/health") {
		const site = resolveSite(url.hostname);
		return Response.json(
			{
				ok: true,
				service: "llc-business-cf",
				host: url.hostname,
				site: site?.name ?? null,
			},
			{ headers },
		);
	}

	if (url.pathname === "/api/contact" && request.method === "POST") {
		const site = resolveSite(url.hostname);
		if (!site) {
			return Response.json({ ok: false, error: "Unknown site" }, { status: 404, headers });
		}

		let body: ContactBody;
		try {
			body = (await request.json()) as ContactBody;
		} catch {
			return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400, headers });
		}

		const fullName = (body.full_name ?? "").trim();
		const phone = (body.phone_number ?? "").trim();

		if (!fullName || !phone) {
			return Response.json(
				{ ok: false, error: "full_name and phone_number are required" },
				{ status: 400, headers },
			);
		}

		if (fullName.length > 120 || phone.length > 40) {
			return Response.json({ ok: false, error: "Input too long" }, { status: 400, headers });
		}

		console.log(
			JSON.stringify({
				event: "contact_submit",
				site: site.name,
				host: url.hostname,
				full_name: fullName,
				phone_number: phone,
				at: new Date().toISOString(),
			}),
		);

		return Response.json(
			{
				ok: true,
				message:
					"Your submission has been received! Keep an eye on your phone or email because we will contact you soon.",
			},
			{ headers },
		);
	}

	return Response.json({ ok: false, error: "Not found" }, { status: 404, headers });
}
