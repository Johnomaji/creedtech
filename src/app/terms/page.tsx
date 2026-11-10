import { site } from "@/content/site"
import { LegalPage } from "@/components/layout/legal-page"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Terms of service",
  description: `The terms that apply when you use the ${site.name} website.`,
  path: "/terms",
})

// TODO: replace with terms reviewed by a lawyer.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="9 November 2026">
      <p>
        These terms apply to your use of this website, operated by{" "}
        {site.legalName} (&quot;{site.name}&quot;, &quot;we&quot;,
        &quot;us&quot;). By using the site, you agree to them. Our products and
        client services are covered by separate agreements.
      </p>

      <h2>Using this website</h2>
      <p>
        You may use this website for lawful purposes only. Don&apos;t attempt to
        disrupt it, gain unauthorized access to it, or use it to send spam or
        harmful content.
      </p>

      <h2>Content and intellectual property</h2>
      <p>
        The content on this site, including text, graphics, logos and product
        names, belongs to {site.name} or its licensors. You may view and share
        it for personal, non-commercial purposes with attribution.
      </p>

      <h2>Product information</h2>
      <p>
        We describe our products as accurately as we can, but features,
        availability and status (such as beta or coming soon) may change without
        notice. Nothing on this site is a binding offer.
      </p>

      <h2>Health information</h2>
      <p>
        Information about our health products is general and is not medical
        advice. Screening tools give a likelihood indication only and are not a
        diagnosis. Always consult a qualified healthcare professional.
      </p>

      <h2>Links to other websites</h2>
      <p>
        We may link to websites we don&apos;t control. We aren&apos;t
        responsible for their content or practices.
      </p>

      <h2>Disclaimer and liability</h2>
      <p>
        This website is provided &quot;as is&quot;. To the extent permitted by
        law, we exclude all warranties and are not liable for any loss arising
        from your use of the site.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The date at the top of this
        page shows when they were last changed.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  )
}
