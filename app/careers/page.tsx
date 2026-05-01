"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Zap, Globe } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / Neo Tokyo",
    type: "Full-time",
    description: "Join our team to build the future of e-commerce with cutting-edge technologies.",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create beautiful and intuitive user experiences for our global audience.",
  },
  {
    id: 3,
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York",
    type: "Full-time",
    description: "Drive our growth and build our brand across international markets.",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black mb-8 gradient-text"
        >
          Join Our Team
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/60 leading-relaxed"
        >
          Help us shape the future of commerce. We're always looking for talented individuals to join our mission.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Users, title: "200+", subtitle: "Team Members" },
          { icon: Globe, title: "150+", subtitle: "Countries" },
          { icon: Zap, title: "100%", subtitle: "Remote Friendly" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glassmorphism rounded-[3rem] p-10 text-center"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <stat.icon className="text-primary" size={32} />
            </div>
            <p className="text-4xl font-black mb-2">{stat.title}</p>
            <p className="text-white/40">{stat.subtitle}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Open Positions</h2>
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism rounded-[3rem] p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-white/60">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="bg-primary hover:bg-primary/80 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
