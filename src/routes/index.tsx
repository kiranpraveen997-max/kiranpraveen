import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Mail, Github, Linkedin, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kiran Praveen — Game Developer Portfolio" },
      {
        name: "description",
        content:
          "A clean, modern starter portfolio blueprint for Kiran Praveen, a beginner game developer.",
      },
      { property: "og:title", content: "Kiran Praveen — Game Developer Portfolio" },
      {
        property: "og:description",
        content:
          "A clean, modern starter portfolio blueprint for Kiran Praveen, a beginner game developer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HomeSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function HomeSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-24 md:px-6"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-accent-cyan/10 blur-3xl" />
      </div>

      <div className="max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent-cyan">
          Beginner Game Developer
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
          Hi, I'm <span className="gradient-text">Kiran Praveen</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
          I'm learning to build games and interactive experiences. This is my starter portfolio —
          replace this intro with your own story.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="glow-purple">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll to About"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="px-4 py-24 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                [Placeholder] Write a short introduction here. Mention how you got into game
                development, what excites you about it, and what you're currently learning.
              </p>
              <p>
                [Placeholder] Add a sentence or two about your goals — the kinds of games you want
                to make, the studios or indie projects you admire, or the skills you're building
                next.
              </p>
              <p>
                [Placeholder] Keep it honest and beginner-friendly. This section is easy to edit in
                the code.
              </p>
            </div>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent-cyan/20 md:h-80 md:w-80">
              <Gamepad2 className="h-24 w-24 text-muted-foreground/50 md:h-32 md:w-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: "Project One",
      description:
        "Short placeholder description for your first game or prototype. Replace this with a real summary.",
      tags: ["Unity", "C#"],
    },
    {
      title: "Project Two",
      description:
        "Short placeholder description for your second project. Add what you learned or built.",
      tags: ["Godot", "GDScript"],
    },
    {
      title: "Project Three",
      description:
        "Short placeholder description for your third project. Keep it brief and easy to scan.",
      tags: ["Game Design", "Prototype"],
    },
    {
      title: "Project Four",
      description:
        "Short placeholder description for another project. Swap in your own work later.",
      tags: ["Unreal", "Blueprints"],
    },
  ];

  return (
    <section id="projects" className="bg-card/30 px-4 py-24 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Placeholder projects for your portfolio. Replace these cards with your own games as you
            build them.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="border-border/60 bg-card transition-colors hover:border-primary/50"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/10 to-accent-cyan/10">
                <Gamepad2 className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-accent-cyan hover:bg-accent-cyan/10 hover:text-accent-cyan"
                >
                  View Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const skills = [
    "Unity",
    "C#",
    "Game Development",
    "Godot",
    "GDScript",
    "Level Design",
    "Prototyping",
    "Git",
    "Game Design",
    "Blender Basics",
  ];

  return (
    <section id="skills" className="px-4 py-24 md:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Skills & <span className="text-primary">Tools</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-muted-foreground">
          A starter list of skills. Update these tags to match what you actually know or are
          learning.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-card/30 px-4 py-24 md:px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-muted-foreground">
          Replace the placeholders below with your real email, GitHub, and LinkedIn links.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="outline" size="lg">
            <a href="mailto:your.email@example.com" className="gap-2">
              <Mail className="h-4 w-4" />
              your.email@example.com
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
