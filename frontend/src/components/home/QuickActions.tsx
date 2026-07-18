import { useNavigate } from "react-router-dom";

import {
  Upload,
  MessageSquare,
  BookOpen,
  Users,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const actions = [
  {
    title: "Upload Documents",
    icon: Upload,
    route: "/documents",
  },
  {
    title: "AI Chat",
    icon: MessageSquare,
    route: "/chat",
  },
  {
    title: "Knowledge Base",
    icon: BookOpen,
    route: "/knowledge-base",
  },
  {
    title: "Users",
    icon: Users,
    route: "/users",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    route: "/analytics",
  },
  {
    title: "Audit Logs",
    icon: ShieldCheck,
    route: "/audit",
  },
];

export default function QuickActions() {

  const navigate = useNavigate();

  return (

    <section className="mt-7">

      <div
        className="
          mx-auto
          flex
          max-w-6xl
          flex-wrap
          justify-center
          gap-3
        "
      >

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.title}
              onClick={() => navigate(action.route)}
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
              "
              style={{
                background:
                  "linear-gradient(180deg,#22496F,#1A3E61)",
                borderColor:
                  "rgba(255,255,255,.08)",
              }}
            >

              <Icon
                size={16}
                className="text-[#A5C5FF]"
              />

              {action.title}

            </button>

          );

        })}

      </div>

    </section>

  );

}