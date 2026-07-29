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

		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;

async function handleApi(request: Request, url: URL): Promise<Response> {
	const headers = {
		"Content-Type": "application/json; charset=utf-8",
		"Cache-Control": "no-store",
	};

	if (url.pathname === "/api/health") {
		return Response.json({ ok: true, service: "llc-business-cf" }, { headers });
	}

	if (url.pathname === "/api/contact" && request.method === "POST") {
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
