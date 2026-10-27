export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-6">צור קשר</h1>
      <div className="hidden w-16 mx-auto mb-8" />
      <ul className="space-y-3 text-ink/80">
        <li>רחוב סוקולוב 20, חולון</li>
        <li dir="ltr">03-0000000</li>
        <li>info@eladflowers.co.il</li>
      </ul>
      <a
        href="https://wa.me/972000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 bg-ink text-white px-8 py-3 hover:bg-ink/85 transition-colors"
      >
        שלחו לנו הודעה בוואטסאפ
      </a>
    </div>
  );
}
