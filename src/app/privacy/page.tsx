import { site } from "@/content/site"
import { LegalPage } from "@/components/layout/legal-page"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects personal information.`,
  path: "/privacy",
})

// TODO: replace with a privacy policy reviewed by a lawyer.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="9 November 2026">
      <p>
        This policy explains how {site.legalName} (&quot;{site.name}&quot;,
        &quot;we&quot;, &quot;us&quot;) handles personal information when you
        visit this website or contact us. It does not cover our products, which
        have their own privacy policies.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us.</strong> When you use our contact
          form we collect your name, email address, company (optional), the
          topic of your enquiry and your message.
        </li>
        <li>
          <strong>Technical information.</strong> Our hosting provider
          automatically records standard request data, such as IP address,
          browser type and pages requested, to operate and secure the site.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and provide information you asked for.</li>
        <li>To operate, secure and improve this website.</li>
        <li>To meet legal obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Service providers</h2>
      <p>
        We use trusted providers to run this site: our hosting provider, and an
        email delivery provider that sends contact form messages to our team.
        They process data only on our instructions.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        This site does not use advertising or analytics cookies. It stores your
        light or dark theme preference in your browser&apos;s local storage,
        which never leaves your device.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for as long as needed to respond and to maintain a
        record of our correspondence, then delete them.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct
        or delete your personal information, or to object to how we use it. To
        make a request, email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of this
        page shows when it was last changed.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  )
}
