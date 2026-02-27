'use client';

import { motion } from 'motion/react';

export default function AboutMe() {
  return (
    <section className="w-full py-32 px-8 md:px-16 lg:px-24 bg-bg text-text relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-12 leading-tight">
            The Bridge Between <span className="text-accent italic">Logic</span> and <span className="text-accent italic">People</span>.
          </h2>
        </motion.div>

        <div className="space-y-8 font-sans text-lg md:text-xl text-subtitle leading-relaxed tracking-wide">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My career is built on the belief that even the most complex systems follow a logic, but the most challenging &apos;bugs&apos; exist in the gaps between vision and execution. With a Master&apos;s in Probability Theory and a background in development, I have spent the last decade bridging these gaps—translating high-level complexity into technical clarity.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            In my current role at a Big Four client, I navigate an ecosystem of 15+ simultaneous teams, where I specialize in managing the cross-platform dependencies that keep a massive product moving. Having delivered 10+ global product versions, I&apos;ve learned that a 70-person team is a living ecosystem, not just a resource pod. When I led the structural split of that team into three units, my priority was the people—mentoring analysts and simplifying procedures so no one was lost in the transition.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Today, the world of Tech is changing and I am keeping up with using AI in my everyday work. But while AI is an incredible tool for efficiency, I believe a leader must always be a human who can empathize with a stakeholder, mentor a rising QA, and find the one edge case that a model might miss.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
