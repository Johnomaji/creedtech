import { Quote } from "lucide-react"

import { testimonials } from "@/content/testimonials"
import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/layout/section-heading"
import { InitialsAvatar } from "@/components/people/initials-avatar"

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section aria-labelledby="testimonials-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Partners"
          title="What working with us is like"
          align="center"
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={index} className="reveal">
              <figure className="flex h-full flex-col rounded-2xl border bg-card p-7">
                <Quote className="size-6 text-brand/50" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground/90">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t pt-6">
                  <InitialsAvatar
                    name={testimonial.name}
                    src={testimonial.avatar}
                    size="sm"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground">
                      {testimonial.role}, {testimonial.organization}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
