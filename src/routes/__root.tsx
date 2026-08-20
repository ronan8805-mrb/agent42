import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppProviders } from "@/components/providers";
import { AppErrorComponent } from "@/lib/error-component";
import { NotFoundPage } from "@/components/not-found";
import appCss from "../styles.css?url";

const APP_NAME = "Agent 42";
const THEME_BOOT = `(function(){try{var t=localStorage.getItem("agent42.theme");var p=location.pathname;var app=p.indexOf("/app")===0||p.indexOf("/admin")===0;if(t==="light"){document.documentElement.classList.remove("dark")}else if(t==="dark"||app){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Agent 42 is the receptionist that never sleeps. Answers calls, books appointments, and briefs you — 24/7.",
      },
      { name: "theme-color", content: "#0A0A0B" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  errorComponent: AppErrorComponent,
  notFoundComponent: NotFoundPage,
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className="antialiased">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <PreviewHostBridge />
        <AuthProvider>
          <AppProviders>
            <Outlet />
          </AppProviders>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
