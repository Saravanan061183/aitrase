import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CalendarDays, Check, Clock3, FlaskConical, Gamepad2, MapPin, Menu, MessageCircle, Bot, Cpu, Trophy, Sparkles, Phone, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/camp-hands-on.jpg";
import rocketImage from "@/assets/camp-rocket-launch.jpg";
import foamImage from "@/assets/camp-foam-experiment.jpg";
import aitraLogo from "@/assets/aitra-logo.png.asset.json";
import canopyLogo from "@/assets/canopy-logo.jpeg.asset.json";

const heroSlides = [
  { src: heroImage, alt: "Children's hands assembling an educational robot with circuits and sensors" },
  { src: rocketImage, alt: "Kids cheering as their model rocket launches at science camp" },
  { src: foamImage, alt: "Kids in safety goggles laughing as a chemistry foam experiment erupts" },
];

const batches = [
  { id: "oct2-morning", date: "2026-10-02", label: "October 2, 2026", name: "Morning Batch", time: "10:00 AM – 1:00 PM" },
  { id: "oct4-morning", date: "2026-10-04", label: "October 4, 2026", name: "Morning Batch", time: "10:00 AM – 1:00 PM" },
  { id: "oct4-evening", date: "2026-10-04", label: "October 4, 2026", name: "Evening Batch", time: "4:00 PM – 7:00 PM" },
];
const experiences = [
  { icon: FlaskConical, title: "10 Hands-on Science Projects", description: "Explore science through practical projects that encourage children to build, test and discover." },
  { icon: Bot, title: "Robotics", description: "See how robots move, sense and respond through engaging demonstrations." },
  { icon: Cpu, title: "IoT Exploration", description: "Discover how sensors, electronics and connected devices work together." },
  { icon: Trophy, title: "Robot Soccer", description: "Watch educational robots compete on the field and discover the technology behind them." },
  { icon: Sparkles, title: "Generative AI", description: "Get a child-friendly introduction to Generative AI and see what today's AI tools can create." },
  { icon: Gamepad2, title: "Create Games with AI", description: "Discover how ideas can be transformed into simple games using AI." },
];
const steps = [
  ["01", "EXPLORE", "Discover exciting science concepts through hands-on activities."],
  ["02", "BUILD", "Work on practical science projects."],
  ["03", "EXPERIMENT", "Test ideas, observe results and discover what happens."],
  ["04", "ROBOTICS & IoT", "Discover sensors, electronics and robots."],
  ["05", "ROBOT SOCCER", "See educational robots in action."],
  ["06", "AI & GAME CREATION", "Experience Generative AI and discover how games can be created using AI."],
];
const faqs = [
  ["What age group is the camp for?", "The camp is designed for children aged 9–14 years."],
  ["How long is the program?", "Each batch is a 3-hour hands-on experience."],
  ["What dates are available?", "October 2, 2026 has a morning batch from 10 AM–1 PM. October 4, 2026 has morning and evening batches."],
  ["Does my child need prior robotics or coding experience?", "No. The activities are designed as an introductory hands-on experience."],
  ["What will children experience?", "Science projects, robotics, IoT, robot soccer, Generative AI and AI-assisted game creation."],
  ["Where is the camp conducted?", `The camp is conducted at AITRA — 5.3.12, First Floor, Kalai Nagar Second Main Road, 1st Cross Street, near Army Canteen, Madurai, Tamil Nadu 625017. Tap "Get directions" in the registration section to open it in Google Maps.`],
  ["What is the registration fee?", "The registration fee is ₹299 per child, and a participation certificate is included. The fee is collected by the organisers when they confirm your registration."],
  ["How do I register?", "Use the registration form or contact us on WhatsApp or phone at 7299515354 or +91 96002 63760."],
];
const whatsappUrl = "https://wa.me/917299515354";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("AITRA Centre for Robotics and Artificial Intelligence, 5.3.12 First Floor, Kalai Nagar Second Main Road, 1st Cross St, near Army Canteen, Madurai, Tamil Nadu 625017");
const venueAddress = "5.3.12, First Floor, Kalai Nagar Second Main Road, 1st Cross Street, near Army Canteen, Madurai, Tamil Nadu 625017";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Science & Future Tech Camp in Madurai | AITRA × Canopy" },
    { name: "description", content: "One-Day Science & Future Tech Camp for children aged 9–14 in Madurai. Explore science projects, robotics, IoT, robot soccer, Generative AI and AI game creation on October 2 and October 4, 2026." },
    { property: "og:title", content: "One-Day Science & Future Tech Camp | Madurai" },
    { property: "og:description", content: "10 hands-on science projects + Robotics + IoT + Robot Soccer + Generative AI + AI Game Creation." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const [selectedBatch, setSelectedBatch] = useState("oct2-morning");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("2026-10-02");
  const availableBatches = batches.filter((batch) => batch.date === date);
  const chooseBatch = (id: string) => {
    const batch = batches.find((item) => item.id === id);
    if (!batch) return;
    setDate(batch.date);
    setSelectedBatch(id);
    document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const chosen = batches.find((batch) => batch.id === selectedBatch);
    if (!chosen) return;
    const message = `Hello, I would like to register my child for the AITRA Science & Future Tech Camp. Parent Name: ${parentName.trim()}. Child Name: ${childName.trim()}. Age: ${childAge}. Parent Mobile: ${mobile.trim()}. Date: ${chosen.label}. Batch: ${chosen.name} (${chosen.time}).`;
    window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  return <>
    <header className="bg-background border-b border-border">
      <div className="section-wrap flex h-[82px] items-center justify-between gap-5">
        <a href="#top" aria-label="AITRA camp home" className="flex shrink-0 items-center gap-3"><img src={aitraLogo.url} alt="AITRA Robotics and AI Research Lab" className="brand-logo" /><span className="hidden lg:block h-8 w-px bg-border" /><span className="hidden lg:block text-xs font-bold leading-tight text-muted-foreground">SCIENCE &<br />FUTURE TECH CAMP</span></a>
        <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-foreground" aria-label="Main navigation"><a href="#experience" className="hover:text-primary">The experience</a><a href="#journey" className="hover:text-primary">How it works</a><a href="#batches" className="hover:text-primary">Dates & batches</a><a href="#faq" className="hover:text-primary">FAQs</a></nav>
        <div className="hidden md:block"><Button variant="camp" size="lg" asChild><a href="#registration">Register now <ArrowRight /></a></Button></div>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={mobileMenu ? "Close menu" : "Open menu"} onClick={() => setMobileMenu(!mobileMenu)}><Menu /></Button>
      </div>
      {mobileMenu && <nav className="section-wrap flex flex-col gap-4 pb-5 font-bold md:hidden" aria-label="Mobile navigation">{[["The experience", "#experience"], ["How it works", "#journey"], ["Dates & batches", "#batches"], ["FAQs", "#faq"]].map(([label, href]) => <a href={href} key={href} onClick={() => setMobileMenu(false)}>{label}</a>)}</nav>}
    </header>
    <main id="top">
      <section className="hero" aria-roledescription="carousel" aria-label="Camp highlights">{heroSlides.map(({ src, alt }, index) => <img key={src} src={src} alt={index === slide ? alt : ""} className="hero-image" width={1600} height={1008} aria-hidden={index !== slide} style={{ opacity: index === slide ? 1 : 0 }} />)}<div className="hero-dots" role="tablist" aria-label="Camp photos">{heroSlides.map((item, index) => <button key={item.src} role="tab" aria-selected={index === slide} aria-label={`Show photo ${index + 1}`} className="hero-dot" data-active={index === slide} onClick={() => setSlide(index)} />)}</div><div className="section-wrap hero-content"><div className="hero-kicker">Madurai · October 2 & 4, 2026</div><h1 className="display hero-title mt-6 mb-5">ONE-DAY SCIENCE & <span className="hero-highlight">FUTURE TECH</span> CAMP</h1><p className="hero-copy">Let your child build, experiment, explore and create. A 3-hour hands-on experience combining science, robotics, IoT, AI and game creation.</p><div className="hero-meta"><span><Check size={17} /> Ages 9–14</span><span><Check size={17} /> 10 hands-on projects</span><span><Check size={17} /> No experience needed</span><span className="hero-fee"><Check size={17} /> ₹299 · Certificate included</span></div><div className="flex flex-wrap gap-3 mt-9"><Button variant="camp" size="lg" className="h-12 px-7" asChild><a href="#registration">Register now <ArrowRight /></a></Button><Button variant="outline" size="lg" className="h-12 border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp us</a></Button></div></div></section>
      <div className="info-strip"><div className="section-wrap info-strip-inner"><div className="info-cell"><CalendarDays size={26} /><div><strong>October 2 & 4</strong><small>2026</small></div></div><div className="info-cell"><Clock3 size={26} /><div><strong>3-hour camp</strong><small>Morning & evening batches</small></div></div><div className="info-cell"><MapPin size={26} /><div><strong>Madurai</strong><small>Tamil Nadu</small></div></div><div className="info-cell"><Zap size={26} /><div><strong>Ages 9–14</strong><small>Curiosity welcome</small></div></div></div></div>
      <section className="section-pad" id="experience"><div className="section-wrap"><span className="eyebrow">Made for curious minds</span><h2 className="display section-heading">One camp. Six experiences.</h2><p className="section-lead">This isn't a lecture. It's three hours of building, testing, discovering and making technology come alive.</p><div className="experience-grid">{experiences.map(({ icon: Icon, title, description }) => <article className="experience-card" key={title}><div className="experience-icon"><Icon size={25} strokeWidth={1.9} /></div><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
      <section className="section-pad blue-band" id="journey"><div className="section-wrap"><span className="eyebrow">The day, their way</span><h2 className="display section-heading">3 hours. A lot to discover.</h2><p className="section-lead">From first questions to new creations, every moment invites them to get involved.</p><div className="step-list">{steps.map(([number, title, description]) => <div className="step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>
      <section className="section-pad"><div className="section-wrap feature-split"><div><span className="eyebrow">Beyond the textbook</span><h2 className="display section-heading">What if science was something they <span className="text-primary">experienced?</span></h2><p className="section-lead">At AITRA's Science & Future Tech Camp, children don't just sit and listen. They build, test, observe, question and create.</p><ul className="feature-list"><li><Check size={20} /> Watch educational robots play soccer</li><li><Check size={20} /> Explore sensors and connected devices</li><li><Check size={20} /> See ideas become games with AI</li><li><Check size={20} /> No prior technical experience required</li></ul></div><img className="feature-photo" src={heroImage} alt="Hands building a robot with circuits and components" loading="lazy" width={1600} height={1008} /></div></section>
      <section className="section-pad bg-secondary" id="batches"><div className="section-wrap"><span className="eyebrow">Pick a time that works</span><h2 className="display section-heading">Choose your batch.</h2><p className="section-lead">One day of science, robotics and future tech. Select a batch to fill in your registration.</p><div className="batch-grid">{batches.map((batch) => <Button key={batch.id} variant="ghost" className="batch-card" data-selected={selectedBatch === batch.id} onClick={() => chooseBatch(batch.id)}><span className="batch-date">{batch.label}</span><span className="batch-selected"><span className="batch-name">{batch.name}</span><ChevronRight size={20} className="text-primary" /></span><span className="batch-time">{batch.time} · 3 hours</span></Button>)}</div></div></section>
      <section className="section-pad registration-area" id="registration"><div className="section-wrap registration-grid"><div><span className="eyebrow">Take the next step</span><h2 className="display section-heading">Ready to let them experience it?</h2><p className="section-lead">Share your details and continue to WhatsApp to request your child's place. The organisers will confirm your registration directly.</p><div className="mt-9 border-t border-border pt-7"><p className="text-sm font-bold mb-4">Prefer to speak with us?</p><a className="flex items-center gap-3 text-primary font-bold mb-3" href="tel:+917299515354"><Phone size={18} /> 72995 15354</a><a className="flex items-center gap-3 text-primary font-bold" href="tel:+919600263760"><Phone size={18} /> +91 96002 63760</a></div><div className="venue-box"><p className="venue-title"><MapPin size={16} /> Camp venue</p><address>{venueAddress}</address><a className="venue-directions" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} /></a></div></div><form className="registration-form" onSubmit={submit}><h3 className="font-display text-xl font-extrabold mb-6">Register your interest</h3><div className="form-grid"><label className="field">Parent name<input required autoComplete="name" value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Your full name" /></label><label className="field">Child name<input required value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Child's full name" /></label><label className="field">Child age<input required type="number" min={9} max={14} value={childAge} onChange={(e) => setChildAge(e.target.value)} placeholder="9–14" /></label><label className="field">Parent mobile number<input required type="tel" inputMode="tel" pattern="[+0-9 ()-]{10,18}" autoComplete="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Your mobile number" /></label><label className="field">Preferred date<select value={date} onChange={(e) => { const next = e.target.value; setDate(next); const first = batches.find((batch) => batch.date === next); if (first) setSelectedBatch(first.id); }}><option value="2026-10-02">October 2, 2026</option><option value="2026-10-04">October 4, 2026</option></select></label><label className="field">Preferred batch<select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>{availableBatches.map((batch) => <option key={batch.id} value={batch.id}>{batch.name} · {batch.time}</option>)}</select></label></div><div className="fee-line"><span>Registration fee</span><strong>₹299 · Certificate included</strong></div><Button variant="camp" type="submit" size="lg" className="mt-5 w-full h-12">Continue on WhatsApp <ArrowRight /></Button><p className="form-note">This opens WhatsApp with your details ready to send. Your place is not confirmed until the organisers respond.</p></form></div></section>
      <section className="section-pad"><div className="section-wrap"><span className="eyebrow">The people behind the camp</span><h2 className="display section-heading">Where science meets future technology.</h2><p className="section-lead">AITRA Robotics & AI Research Centre, in association with Canopy Science Hub, brings science and technology into one engaging hands-on experience for children in Madurai.</p><div className="organiser-grid"><div className="organiser"><img src={aitraLogo.url} className="brand-logo" loading="lazy" alt="AITRA Robotics and AI Research Lab logo" /><small>Organised by AITRA</small></div><div className="organiser"><img src={canopyLogo.url} className="partner-logo" loading="lazy" alt="Canopy Science Hub logo" /><small>In association with Canopy</small></div></div></div></section>
      <section className="section-pad bg-muted" id="faq"><div className="section-wrap"><span className="eyebrow">Good to know</span><h2 className="display section-heading">Frequently asked questions.</h2><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
      <section className="section-pad blue-band"><div className="section-wrap text-center"><span className="eyebrow">October 2 & 4 · Madurai</span><h2 className="display section-heading mx-auto">Build curiosity. Create possibilities.</h2><p className="section-lead mx-auto">Give your child three hours to explore science, robotics and AI — hands-on.</p><Button variant="camp" size="lg" className="h-12 mt-7 px-8" asChild><a href="#registration">Register now <ArrowRight /></a></Button></div></section>
    </main>
    <footer className="bg-background border-t border-border py-9"><div className="section-wrap flex flex-col md:flex-row justify-between gap-5 items-start md:items-center"><div className="flex items-center gap-4"><img src={aitraLogo.url} alt="AITRA" className="brand-logo" /><span className="text-xs text-muted-foreground">In association with Canopy Science Hub</span></div><div className="text-sm text-muted-foreground">Science & Future Tech Camp · Madurai, Tamil Nadu</div></div></footer>
    <div className="mobile-cta"><Button variant="camp" className="w-full h-12" asChild><a href="#registration">Register now <ArrowRight /></a></Button></div>
  </>;
}
