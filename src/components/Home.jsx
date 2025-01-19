import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Eye, ArrowUpCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <main>
        <section className="w-full py-12 md:py-24 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 to-neutral-600">
                Manage Your Tasks with Ease
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl">
                TaskFicient helps you organize, prioritize, and accomplish your
                goals efficiently.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                onClick={() =>
                  toast("Please login to continue!", {
                    icon: "😊",
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  })
                }
                className="bg-black text-white hover:bg-gray-600"
              >
                Get Started
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<PlusCircle className="h-10 w-10 text-slate-500" />}
              title="Add Tasks"
              description="Quickly add new tasks to your list with just a few clicks."
            />
            <FeatureCard
              icon={<Trash2 className="h-10 w-10 text-slate-500" />}
              title="Delete Tasks"
              description="Remove completed or unnecessary tasks to keep your list clean."
            />
            <FeatureCard
              icon={<Eye className="h-10 w-10 text-slate-500" />}
              title="View Tasks"
              description="Get a clear overview of all your tasks in one place."
            />
            <FeatureCard
              icon={<ArrowUpCircle className="h-10 w-10 text-slate-500" />}
              title="Prioritize Tasks"
              description="Easily set priorities to focus on what matters most."
            />
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-center">
        <p className="text-xs text-gray-500">
          © 2025 TaskFicient. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
