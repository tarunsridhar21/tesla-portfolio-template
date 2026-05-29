"use client";

import { IDENTITY, SOCIAL, CONTACT } from "@/content/profile";

export function Contact() {
  return (
    <section className="screen contact" id="contact" data-screen-label="07 Contact">
      <div className="contact-inner">
        <div>
          <p className="section-eyebrow">Contact</p>
          <h2 className="contact-headline">
            {CONTACT.headline}
          </h2>
        </div>

        <div className="contact-grid">
          <a className="contact-cell" href={`mailto:${SOCIAL.email}`}>
            <span className="k">Email</span>
            <span className="v">{SOCIAL.email}</span>
          </a>
          <a className="contact-cell" href={`tel:${SOCIAL.phone}`}>
            <span className="k">Phone</span>
            <span className="v">{SOCIAL.phone}</span>
          </a>
          <div className="contact-cell">
            <span className="k">Based</span>
            <span className="v" style={{ cursor: "default" }}>
              {IDENTITY.locationShort}
            </span>
          </div>
          <a
            className="contact-cell"
            href={SOCIAL.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="k">LinkedIn</span>
            <span className="v">{SOCIAL.linkedinHandle}</span>
          </a>
          <a
            className="contact-cell"
            href={SOCIAL.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="k">GitHub</span>
            <span className="v">{SOCIAL.githubHandle}</span>
          </a>
          <a className="contact-cell" href={IDENTITY.cvFile} target="_blank" rel="noopener noreferrer">
            <span className="k">CV / Résumé</span>
            <span className="v">Download PDF</span>
          </a>
        </div>

        <div className="contact-footer">
          <span>© {IDENTITY.copyrightYear} · {IDENTITY.fullName}</span>
          <span>{CONTACT.footerCenter}</span>
          <span>{IDENTITY.versionTag}</span>
        </div>
      </div>
    </section>
  );
}
