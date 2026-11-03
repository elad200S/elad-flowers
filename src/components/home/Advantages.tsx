import { Truck, Leaf, Heart, ShieldCheck } from "lucide-react";

const advantages = [
  { icon: Truck, title: "משלוח מהיר", text: "משלוחים בכל אזור השרון והמרכז, כולל הזמנה למשלוח דחוף" },
  { icon: Leaf, title: "פרחים טריים", text: "אנחנו עובדים עם הפרחים הטריים ביותר שמגיעים אלינו כל יום" },
  { icon: Heart, title: "עיצוב אישי", text: "כל זר מורכב ביד, בהתאמה אישית לאירוע ולמקבל המתנה" },
  { icon: ShieldCheck, title: "שירות אמין", text: "אלפי לקוחות מרוצים ומענה אישי בוואטסאפ לכל שאלה" },
];

export default function Advantages() {
  return (
    <section className="py-16 md:py-20 bg-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {advantages.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center">
            <Icon size={28} className="text-ink/70 mb-3" strokeWidth={1.5} />
            <h3 className="font-serif text-lg text-ink mb-1">{title}</h3>
            <p className="text-xs text-ink/60 leading-6">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
