import { BASE_PATH } from "@/lib/assets";

// Static hosting can't run a server redirect, so the root page forwards to /en/ itself.
export default function Root() {
  const to = `${BASE_PATH}/en/`;
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${to}`} />
        <title>United Flowers</title>
      </head>
      <body>
        <p>
          Redirecting to <a href={to}>the United Flowers website</a>…
        </p>
      </body>
    </html>
  );
}
