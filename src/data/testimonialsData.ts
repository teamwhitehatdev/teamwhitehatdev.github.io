export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
  verified: boolean;
}

const names = ["Sarah Jenkins", "Michael Chen", "David Ross", "Elena Rostova", "James Harrison", "Amanda Perez", "Marcus Vance", "Chloe Taylor", "Liam O'Connor", "Sophia Martinez", "Daniel Wright", "Isabella Kim", "Alexander Novak", "Emily Watson", "Benjamin Scott", "Olivia Brown", "Ethan Davis", "Mia Wilson", "Lucas Miller", "Ava Anderson"];
const roles = ["Virtual Assistant", "E-commerce Founder", "SaaS CEO", "Digital Creator", "Agency Owner", "Freelance Web Developer", "Graphic Designer", "Executive Assistant", "Marketing Director", "Operations Manager"];
const locations = ["United States", "United Kingdom", "Canada", "Australia", "Philippines", "Germany", "Singapore", "New Zealand", "Netherlands", "United Arab Emirates"];
const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
];

const feedbackTemplates = [
  "Team WhiteHat Dev helped me build my portfolio website on Hostinger with code DPDCABINCEHM. I landed my first $3,000/mo client in 2 weeks!",
  "The Gumroad digital proposal templates saved our agency over 40 hours of work. Unbelievable value for Virtual Assistants!",
  "ElevenLabs AI Voice Studio allowed me to offer podcast voiceover services to US clients. My hourly rate jumped from $8 to $35/hr!",
  "Outstanding web development speed and clean code. Highly recommend Team WhiteHat Dev for any scaling digital business.",
  "The 5-step masterclass tutorials are the most practical guide for freelancers I have ever seen. 100% recommended!",
  "Exceptional executive VA support! Saved our executive team over 35 hours per week on calendar scheduling and inbox triage.",
  "Downloaded the proposal kit from Gumroad and won a 6-month retainer contract on my very first pitch!",
  "The AI voice narration workflow with ElevenLabs turned my VA service into an automated content engine."
];

export const generate100Testimonials = (): TestimonialItem[] => {
  const list: TestimonialItem[] = [];
  for (let i = 1; i <= 100; i++) {
    const name = names[i % names.length] + (i > 20 ? ` ${i}` : "");
    const role = roles[i % roles.length];
    const loc = locations[i % locations.length];
    const text = feedbackTemplates[i % feedbackTemplates.length];
    const avatar = avatars[i % avatars.length];
    list.push({
      id: `t_${i}`,
      name,
      role: `${role} (${loc})`,
      location: loc,
      text,
      rating: 5,
      avatar,
      verified: true
    });
  }
  return list;
};
