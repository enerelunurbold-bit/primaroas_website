"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "../i18n/context";

const contactEmail = "contact@primaroas.com";

const quoteCopy = {
  en: {
    label: "Project quote",
    title: "Tell us about your project",
    intro:
      "Fill out the form and your answers will be prepared as an email to PrimaRoas. We will review it and contact you back with the next steps.",
    fields: {
      name: "Full name",
      email: "Email address",
      phone: "Phone number",
      company: "Company / organization",
      service: "Service",
      plan: "Selected package",
      price: "Budget / listed price",
      timeline: "Preferred timeline",
      contactMethod: "Preferred contact method",
      details: "Project details / questions",
    },
    placeholders: {
      name: "Your name",
      company: "Company name",
      service: "Web Development, Mobile Apps...",
      plan: "Basic, Standard, Premium...",
      price: "$5,000 or custom",
      details:
        "Tell us what you want to build, your main goals, existing website/app links, integrations, or any special requirements.",
    },
    timelinePlaceholder: "Select timeline",
    timelineOptions: ["As soon as possible", "Within 1 month", "1–3 months", "3+ months", "Not sure yet"],
    contactOptions: ["Email", "Phone call", "Either email or phone"],
    submit: "Send request to PrimaRoas",
    hintBefore: "This opens an email draft to",
    hintAfter: "with your answers included.",
    notice: "Your email draft has been opened. Please press send in your email app to deliver the request.",
    notProvided: "Not provided",
    notSelected: "Not selected",
    emailTitle: "New project quote request from primaroas.com",
    emailSubject: "New quote request",
    emailFrom: "from",
    emailLabels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      contactMethod: "Preferred contact method",
      service: "Service",
      plan: "Selected plan",
      price: "Listed price/budget",
      timeline: "Preferred timeline",
      details: "Project details",
    },
  },
  mn: {
    label: "Төслийн хүсэлт",
    title: "Төслийнхөө талаар бидэнд хэлээрэй",
    intro:
      "Маягтыг бөглөсний дараа таны хариултууд PrimaRoas руу илгээх имэйл хэлбэрээр бэлтгэгдэнэ. Бид мэдээллийг хянаад дараагийн алхмаар тантай холбогдоно.",
    fields: {
      name: "Овог нэр",
      email: "Имэйл хаяг",
      phone: "Утасны дугаар",
      company: "Компани / байгууллага",
      service: "Үйлчилгээ",
      plan: "Сонгосон багц",
      price: "Төсөв / жагсаасан үнэ",
      timeline: "Хүсэж буй хугацаа",
      contactMethod: "Холбогдох хэлбэр",
      details: "Төслийн дэлгэрэнгүй / асуулт",
    },
    placeholders: {
      name: "Таны нэр",
      company: "Компанийн нэр",
      service: "Вэб хөгжүүлэлт, мобайл апп...",
      plan: "Basic, Standard, Premium...",
      price: "$5,000 эсвэл custom",
      details:
        "Юу бүтээхийг хүсэж байгаа, гол зорилго, одоо байгаа сайт/аппын холбоос, интеграц эсвэл тусгай шаардлагуудаа бичнэ үү.",
    },
    timelinePlaceholder: "Хугацаа сонгох",
    timelineOptions: ["Аль болох хурдан", "1 сарын дотор", "1–3 сарын дотор", "3+ сар", "Одоогоор тодорхойгүй"],
    contactOptions: ["Имэйл", "Утасны дуудлага", "Имэйл эсвэл утас аль аль нь"],
    submit: "PrimaRoas руу хүсэлт илгээх",
    hintBefore: "Энэ нь таны хариулттай имэйл draft-ийг",
    hintAfter: "хаяг руу нээнэ.",
    notice: "Таны имэйл draft нээгдлээ. Хүсэлтээ хүргэхийн тулд имэйл апп дээрээ Send дарна уу.",
    notProvided: "Оруулаагүй",
    notSelected: "Сонгоогүй",
    emailTitle: "primaroas.com сайтаас ирсэн шинэ төслийн хүсэлт",
    emailSubject: "Шинэ төслийн хүсэлт",
    emailFrom: "илгээсэн",
    emailLabels: {
      name: "Нэр",
      email: "Имэйл",
      phone: "Утас",
      company: "Компани",
      contactMethod: "Холбогдох хэлбэр",
      service: "Үйлчилгээ",
      plan: "Сонгосон багц",
      price: "Үнэ/төсөв",
      timeline: "Хүсэж буй хугацаа",
      details: "Төслийн дэлгэрэнгүй",
    },
  },
} as const;

type QuoteFormProps = {
  initialService: string;
  initialPlan: string;
  initialPrice: string;
};

function getField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export default function QuoteForm({ initialService, initialPlan, initialPrice }: QuoteFormProps) {
  const { lang } = useI18n();
  const copy = lang === "mn" ? quoteCopy.mn : quoteCopy.en;
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = getField(formData, "name");
    const service = getField(formData, "service");
    const plan = getField(formData, "plan");
    const price = getField(formData, "price");
    const body = [
      copy.emailTitle,
      "",
      `${copy.emailLabels.name}: ${name}`,
      `${copy.emailLabels.email}: ${getField(formData, "email")}`,
      `${copy.emailLabels.phone}: ${getField(formData, "phone")}`,
      `${copy.emailLabels.company}: ${getField(formData, "company") || copy.notProvided}`,
      `${copy.emailLabels.contactMethod}: ${getField(formData, "contactMethod")}`,
      "",
      `${copy.emailLabels.service}: ${service || copy.notSelected}`,
      `${copy.emailLabels.plan}: ${plan || copy.notSelected}`,
      `${copy.emailLabels.price}: ${price || copy.notSelected}`,
      `${copy.emailLabels.timeline}: ${getField(formData, "timeline") || copy.notProvided}`,
      "",
      `${copy.emailLabels.details}:`,
      getField(formData, "details") || copy.notProvided,
    ].join("\n");

    const subject = `${copy.emailSubject}${service ? ` - ${service}` : ""}${name ? ` ${copy.emailFrom} ${name}` : ""}`;
    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
    window.location.href = mailto;
  }

  return (
    <main className="quote-page">
      <section className="quote-hero">
        <p className="section-label">{copy.label}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </section>

      <section className="quote-shell">
        <form className="quote-form" onSubmit={handleSubmit}>
          <div className="quote-form__grid">
            <label>
              {copy.fields.name}
              <input name="name" placeholder={copy.placeholders.name} required />
            </label>

            <label>
              {copy.fields.email}
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>

            <label>
              {copy.fields.phone}
              <input name="phone" type="tel" placeholder="+976 7250 3910" required />
            </label>

            <label>
              {copy.fields.company}
              <input name="company" placeholder={copy.placeholders.company} />
            </label>

            <label>
              {copy.fields.service}
              <input name="service" defaultValue={initialService} placeholder={copy.placeholders.service} />
            </label>

            <label>
              {copy.fields.plan}
              <input name="plan" defaultValue={initialPlan} placeholder={copy.placeholders.plan} />
            </label>

            <label>
              {copy.fields.price}
              <input name="price" defaultValue={initialPrice} placeholder={copy.placeholders.price} />
            </label>

            <label>
              {copy.fields.timeline}
              <select name="timeline" defaultValue="">
                <option value="" disabled>
                  {copy.timelinePlaceholder}
                </option>
                {copy.timelineOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              {copy.fields.contactMethod}
              <select name="contactMethod" defaultValue={copy.contactOptions[0]}>
                {copy.contactOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="quote-form__details">
            {copy.fields.details}
            <textarea name="details" rows={7} placeholder={copy.placeholders.details} required />
          </label>

          <div className="quote-form__actions">
            <button type="submit">{copy.submit}</button>
            <p>
              {copy.hintBefore} <a href={`mailto:${contactEmail}`}>{contactEmail}</a> {copy.hintAfter}
            </p>
          </div>

          {submitted && <p className="quote-form__notice">{copy.notice}</p>}
        </form>
      </section>
    </main>
  );
}
