"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "./i18n/context";

type ChatMessage = {
  id: number;
  role: "assistant" | "visitor";
  text: string;
};

type ChatLanguage = "en" | "mn";

type ChatState = {
  lang: ChatLanguage;
  messages: ChatMessage[];
};

const chatCopy = {
  en: {
    launcher: "May I help you?",
    eyebrow: "Automatic assistant",
    title: "PrimaRoas Assistant",
    close: "Close chat",
    inputLabel: "Ask PrimaRoas assistant",
    placeholder: "Type your question...",
    send: "Send",
    welcome:
      "Welcome to PrimaRoas. We are here to help you. Ask me about our services, timelines, AI integration, SEO, or how to contact the team.",
    quickQuestions: [
      "What services do you offer?",
      "Tell me about AI integration",
      "How can I contact you?",
    ],
    replies: {
      greeting:
        "Hi! I can help you understand PrimaRoas services, development timelines, AI integration, SEO, UI/UX, mobile apps, and contact details.",
      services:
        "PrimaRoas builds web applications, mobile apps, UI/UX design systems, SEO optimization, and custom local AI integrations for businesses of different sizes.",
      ai:
        "Our AI integration service helps businesses automate workflows, add AI assistants, analyze data, and run privacy-first local AI solutions on their own infrastructure when needed.",
      seo:
        "Our SEO service improves search visibility through technical SEO, performance optimization, content strategy, keyword research, and tracking.",
      web:
        "For web development, we create responsive, modern, SEO-friendly websites and web apps using scalable frontend and backend architecture.",
      mobile:
        "We build mobile apps for iOS and Android, including native and cross-platform solutions with clean UI, reliable performance, and business-focused features.",
      design:
        "Our UI/UX work includes user research, wireframes, prototypes, visual design, responsive layouts, and smooth user experiences.",
      timeline:
        "Typical timelines range from 2–8 weeks for smaller websites or design work, and longer for advanced apps, AI systems, or custom platforms. The team can confirm after reviewing your requirements.",
      contact:
        "You can contact PrimaRoas by email at contact@primaroas.com, phone at +976 7250 3910 or +1 571 671 5661, or use the Contact us button on the website.",
      project:
        "One featured PrimaRoas project is Klinder, a modern music looping application. You can visit it at klinder.us.",
      location:
        "PrimaRoas works with clients internationally and can be reached through the Mongolia number +976 7250 3910 or the US number +1 571 671 5661.",
      fallback:
        "I can help with services, project timelines, AI integration, SEO, mobile apps, UI/UX, and contact details. For a custom answer, please email contact@primaroas.com or ask your question in a little more detail.",
    },
  },
  mn: {
    launcher: "Танд туслах уу?",
    eyebrow: "Автомат туслах",
    title: "PrimaRoas туслах",
    close: "Чатыг хаах",
    inputLabel: "PrimaRoas туслахаас асуух",
    placeholder: "Асуултаа бичнэ үү...",
    send: "Илгээх",
    welcome:
      "PrimaRoas-д тавтай морил. Бид танд туслахад бэлэн байна. Үйлчилгээ, хугацаа, AI интеграц, SEO эсвэл холбоо барих мэдээллийн талаар асуугаарай.",
    quickQuestions: [
      "Та ямар үйлчилгээ үзүүлдэг вэ?",
      "AI интеграцийн талаар хэлээрэй",
      "Яаж холбоо барих вэ?",
    ],
    replies: {
      greeting:
        "Сайн байна уу! Би PrimaRoas-ийн үйлчилгээ, хөгжүүлэлтийн хугацаа, AI интеграц, SEO, UI/UX, мобайл апп болон холбоо барих мэдээллийн талаар тусалж чадна.",
      services:
        "PrimaRoas нь вэб аппликейшн, мобайл апп, UI/UX дизайн, SEO оновчлол болон бизнесийн хэрэгцээнд тохирсон локал AI интеграцийн шийдлүүд хөгжүүлдэг.",
      ai:
        "Манай AI интеграцийн үйлчилгээ нь ажлын урсгалыг автоматжуулах, AI туслах нэмэх, өгөгдөл шинжлэх болон шаардлагатай үед өөрийн сервер дээр ажиллах нууцлал төвтэй локал AI шийдэл нэвтрүүлэхэд тусална.",
      seo:
        "Манай SEO үйлчилгээ нь техникийн SEO, хурд болон гүйцэтгэлийн оновчлол, контент стратеги, түлхүүр үгийн судалгаа, үр дүнгийн хяналтаар хайлтын илэрцийг сайжруулна.",
      web:
        "Вэб хөгжүүлэлтийн хувьд бид responsive, орчин үеийн, SEO-д ээлтэй вэбсайт болон вэб аппуудыг өргөтгөх боломжтой frontend/backend архитектураар бүтээдэг.",
      mobile:
        "Бид iOS болон Android-д зориулсан native болон cross-platform мобайл аппуудыг цэвэр UI, найдвартай ажиллагаа, бизнесийн хэрэгцээнд нийцсэн функцтэйгээр хөгжүүлдэг.",
      design:
        "Манай UI/UX ажилд хэрэглэгчийн судалгаа, wireframe, prototype, visual design, responsive layout болон ойлгомжтой хэрэглэгчийн туршлага багтдаг.",
      timeline:
        "Жижиг вэбсайт эсвэл дизайны ажил ихэвчлэн 2–8 долоо хоног үргэлжилдэг. Нарийн апп, AI систем, custom платформ илүү урт хугацаа шаарддаг. Танай шаардлагыг харсны дараа баг хугацааг баталгаажуулна.",
      contact:
        "PrimaRoas-тай contact@primaroas.com имэйлээр, +976 7250 3910 эсвэл +1 571 671 5661 утсаар холбогдох боломжтой. Мөн сайтын Contact us товчийг ашиглаж болно.",
      project:
        "PrimaRoas-ийн онцлох төслийн нэг бол Klinder — хөгжимчдөд зориулсан орчин үеийн music looping апп юм. Та klinder.us хаягаар үзэж болно.",
      location:
        "PrimaRoas нь олон улсын клиентүүдтэй ажилладаг. Монгол дахь +976 7250 3910 болон АНУ дахь +1 571 671 5661 дугаараар холбогдож болно.",
      fallback:
        "Би үйлчилгээ, төслийн хугацаа, AI интеграц, SEO, мобайл апп, UI/UX болон холбоо барих мэдээллийн талаар тусалж чадна. Илүү нарийн асуулт байвал contact@primaroas.com руу бичих эсвэл асуултаа дэлгэрэнгүй бичнэ үү.",
    },
  },
} as const;

function getAssistantReply(question: string, lang: ChatLanguage) {
  const text = question.toLowerCase();
  const replies = chatCopy[lang].replies;

  if (text.match(/hello|hi|hey|sain|start|help|сайн|тусла|эхл/)) {
    return replies.greeting;
  }

  if (text.match(/service|offer|do you do|what do you build|үйлчилгээ|юу хийдэг|хийдэг вэ/)) {
    return replies.services;
  }

  if (text.match(/ai|automation|chatbot|assistant|local|integration|автомат|туслах|интеграц|локал/)) {
    return replies.ai;
  }

  if (text.match(/seo|search|google|rank|traffic|visibility|хайлт|харагдац|оновчлол/)) {
    return replies.seo;
  }

  if (text.match(/web|website|site|landing|frontend|backend|вэб|сайт/)) {
    return replies.web;
  }

  if (text.match(/mobile|app|ios|android|react native|мобайл|апп/)) {
    return replies.mobile;
  }

  if (text.match(/ui|ux|design|prototype|figma|interface|дизайн|интерфейс/)) {
    return replies.design;
  }

  if (text.match(/time|timeline|duration|how long|deadline|week|month|хугацаа|долоо хоног|сар|хэзээ/)) {
    return replies.timeline;
  }

  if (text.match(/contact|email|phone|call|meeting|consultation|talk|холбоо|имэйл|утас|залгах|уулзалт/)) {
    return replies.contact;
  }

  if (text.match(/project|portfolio|klinder|work|example|төсөл|жишээ|ажил/)) {
    return replies.project;
  }

  if (text.match(/location|where|mongolia|usa|united states|байршил|монгол|америк|хаана/)) {
    return replies.location;
  }

  return replies.fallback;
}

export default function ChatAssistant() {
  const { lang } = useI18n();
  const chatLang: ChatLanguage = lang === "mn" ? "mn" : "en";
  const copy = chatCopy[chatLang];
  const [isOpen, setIsOpen] = useState(false);
  const welcomeMessage = useMemo<ChatMessage>(
    () => ({ id: 1, role: "assistant", text: copy.welcome }),
    [copy.welcome],
  );
  const [chatState, setChatState] = useState<ChatState>({
    lang: chatLang,
    messages: [welcomeMessage],
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const nextMessageId = useRef(2);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const visibleMessages = useMemo(
    () => (chatState.lang === chatLang ? chatState.messages : [welcomeMessage]),
    [chatLang, chatState.lang, chatState.messages, welcomeMessage],
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, isTyping, isOpen]);

  function sendMessage(messageText: string) {
    const trimmed = messageText.trim();
    if (!trimmed || isTyping) return;

    const visitorMessage: ChatMessage = {
      id: nextMessageId.current,
      role: "visitor",
      text: trimmed,
    };
    nextMessageId.current += 1;

    setChatState((current) => {
      const messages = current.lang === chatLang ? current.messages : [welcomeMessage];
      return { lang: chatLang, messages: [...messages, visitorMessage] };
    });
    setInput("");
    setIsTyping(true);

    const replyLang = chatLang;
    window.setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: nextMessageId.current,
        role: "assistant",
        text: getAssistantReply(trimmed, replyLang),
      };
      nextMessageId.current += 1;
      setChatState((current) => {
        if (current.lang !== replyLang) return current;
        return { ...current, messages: [...current.messages, assistantMessage] };
      });
      setIsTyping(false);
    }, 520);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className={`chat-assistant ${isOpen ? "chat-assistant--open" : ""}`}>
      {!isOpen && (
        <button className="chat-assistant__launcher" type="button" onClick={() => setIsOpen(true)}>
          <span className="chat-assistant__pulse" aria-hidden="true" />
          <span className="chat-assistant__launcher-text">{copy.launcher}</span>
          <span className="chat-assistant__launcher-icon" aria-hidden="true">
            {"\u2726"}
          </span>
        </button>
      )}

      {isOpen && (
        <section className="chat-assistant__panel" aria-label={copy.title}>
          <div className="chat-assistant__header">
            <div>
              <span className="chat-assistant__eyebrow">{copy.eyebrow}</span>
              <h2>{copy.title}</h2>
            </div>
            <button
              className="chat-assistant__close"
              type="button"
              aria-label={copy.close}
              onClick={() => setIsOpen(false)}
            >
              {"\u00d7"}
            </button>
          </div>

          <div className="chat-assistant__messages">
            {visibleMessages.map((message) => (
              <div
                className={`chat-assistant__message chat-assistant__message--${message.role}`}
                key={message.id}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-assistant__message chat-assistant__message--assistant chat-assistant__typing">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="chat-assistant__quick">
            {copy.quickQuestions.map((question) => (
              <button type="button" key={question} onClick={() => sendMessage(question)}>
                {question}
              </button>
            ))}
          </div>

          <form className="chat-assistant__form" onSubmit={handleSubmit}>
            <input
              aria-label={copy.inputLabel}
              placeholder={copy.placeholder}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit" disabled={!input.trim() || isTyping}>
              {copy.send}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
