"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Brain,
  Code,
  Users,
  Globe,
  Sparkles,
  Network,
  Check,
  Dna,
  Microscope,
  RefreshCw,
  Search,
  GitBranch,
  ImageIcon,
  Star,
  Github,
  Database,
  FileText,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/GENOSPHERE.svg";
import cover from "@/assets/about-page-cover.jpg";

export default function AboutModal() {
  const [activeTab, setActiveTab] = useState("introduction");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={isHovered ? "default" : "icon"}
          className={`rounded-full transition-all duration-300 ${
            activeTab === "about" ? "bg-primary text-primary-foreground" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          {isHovered && (
            <span className="ml-2 tracking-tight font-semibold">About</span>
          )}
          <span className="sr-only">About Tree of Life AI</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold flex items-center gap-3">
            <Image
              src={logo}
              alt="Tree of Life Explorer AI Logo"
              width={250}
              height={100}
              className="w-[150px] md:w-[250px] h-auto"
            />
          </DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="introduction"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="introduction">Intro</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            {/* <TabsTrigger value="features">Connect</TabsTrigger> */}
            {/* <TabsTrigger value="using-ai">Using AI</TabsTrigger>
            <TabsTrigger value="contributing">Contributing</TabsTrigger> */}
          </TabsList>
          <TabsContent value="introduction" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Explore Evolution with AI
                </CardTitle>
                <CardDescription className="text-lg">
                  Uncover the intricate web of life through the lens of
                  artificial intelligence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src={cover}
                    alt="Tree of Life AI Cover"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                      <Globe className="h-6 w-6 text-primary" />
                      Welcome to the Tree of Life
                    </h3>
                    <p className="text-muted-foreground my-2">
                      Sometimes it can be hard to appreciate just how long life
                      has been on Earth and how far life has come. From the
                      origins of life, we&apos;ve developed over billions of
                      years, through a web of intricate connections and twists
                      along the way.
                    </p>
                    <p className="text-muted-foreground">
                      To see this web unfold, we created Genosphere! An
                      interactive playground to explore the tree of life.
                      We&apos;ve combined AI with biological data to create a
                      fun, engaging way to learn about evolution.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                      <Microscope className="h-6 w-6 text-primary" />
                      The Approach
                    </h3>
                    <p className="text-muted-foreground">
                      We&apos;ve mixed the latest open-soruce generative AI with
                      a treasure trove of biological data to create a unique way
                      to learn about evolution. Whether you&apos;re simply
                      curious, a biology buff, or just someone who thinks DNA is
                      neat, Genosphere is your go-to for fun, research, and
                      those &quot;wow, I didn&apos;t know that!&quot; moments
                      about life on Earth.
                    </p>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Dna className="h-6 w-6 text-primary" />
                    Why Genosphere?
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      "Explore the web of life with interactive visualizations",
                      "Discover evolutionary connections between species",
                      "Use AI to ask questions for deeper insights or for fun",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                        <span>{item}</span>{" "}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Badge
                    variant="secondary"
                    className="text-sm py-2 px-3 flex items-center gap-2"
                  >
                    <Leaf className="w-4 h-4" />
                    Biodiversity Exploration
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-sm py-2 px-3 flex items-center gap-2"
                  >
                    <Brain className="w-4 h-4" />
                    AI-Powered Analysis
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-sm py-2 px-3 flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Personalized Research
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Key Features
                </CardTitle>
                {/* <CardDescription>
                  Discover the innovative capabilities of Tree of Life AI
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="bg-primary text-primary-foreground rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                        <Network className="h-6 w-6" />
                      </div>
                      <CardTitle>Interactive Phylogenetic Trees</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Explore the tree of life with stunning, interactive
                        visualizations. Zoom, pan, and click through branches to
                        discover evolutionary relationships in an intuitive
                        interface.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="bg-primary text-primary-foreground rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                        <Brain className="h-6 w-6" />
                      </div>
                      <CardTitle>AI-Powered Exploration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Harness the power of AI to identify species, analyze
                        evolutionary features, and uncover hidden patterns in
                        biological data. Our AI assistant guides you through
                        complex evolutionary concepts.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="bg-primary text-primary-foreground rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <CardTitle>Multiple LLM Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Leverage the latest open-source models in our beta, with
                        planned support for OpenAI, Anthropic, and other models.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="bg-primary text-primary-foreground rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                        <Users className="h-6 w-6" />
                      </div>
                      <CardTitle>Image Recognition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-md text-primary">
                          Coming Soon:
                        </span>{" "}
                        We plan to add support for image models to help you turn
                        your questions into a stunning visual experience.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

{
  /* <TabsContent value="using-ai" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Brain className="h-6 w-6 text-primary" />
                  Using AI in Tree of Life
                </CardTitle>
                <CardDescription className="text-lg">
                  Discover how artificial intelligence revolutionizes
                  biodiversity exploration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <video
                    className="w-full max-w-[600px] rounded-lg shadow-lg"
                    controls
                    poster="/placeholder.svg?height=300&width=600"
                  >
                    <source src="/placeholder-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <p className="text-muted-foreground text-center italic">
                  Watch how AI enhances your Tree of Life exploration experience
                </p>

                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-4">
                    AI-Powered Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: <ImageIcon className="h-8 w-8 text-primary" />,
                        title: "Advanced Image Recognition",
                        description:
                          "Identify species from uploaded images with high accuracy",
                      },
                      {
                        icon: <Search className="h-8 w-8 text-primary" />,
                        title: "Natural Language Processing",
                        description:
                          "Intuitive search and discovery using everyday language",
                      },
                      {
                        icon: <GitBranch className="h-8 w-8 text-primary" />,
                        title: "Evolutionary Predictions",
                        description:
                          "Machine learning algorithms predict evolutionary relationships",
                      },
                      {
                        icon: <Dna className="h-8 w-8 text-primary" />,
                        title: "Genetic Sequence Analysis",
                        description:
                          "AI-assisted comparisons of genetic sequences",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-background p-4 rounded-lg shadow-sm"
                      >
                        {feature.icon}
                        <div>
                          <h4 className="font-semibold">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 bg-card p-6 rounded-lg border">
                  <RefreshCw className="h-10 w-10 text-primary animate-spin-slow" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      Continuous Learning
                    </h3>
                    <p className="text-muted-foreground">
                      Our AI models are constantly evolving, ensuring you always
                      have access to the most up-to-date and accurate
                      information about the tree of life.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contributing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Contributing to Tree of Life AI
                </CardTitle>
                <CardDescription className="text-lg">
                  Help shape the future of AI in biodiversity research
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-card p-6 rounded-lg border">
                  <p className="text-center text-muted-foreground italic">
                    &quot;Alone we can do so little; together we can do so much.&quot; -
                    Helen Keller
                  </p>
                </div>

                <p className="text-muted-foreground">
                  We believe in the power of collaboration and open-source
                  development. While this started as a fun project, Tree of Life AI can grow into a community-driven project,
                  and we welcome contributions from researchers, developers, and
                  enthusiasts alike.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Github className="h-8 w-8 text-primary" />,
                      title: "GitHub Contributions",
                      description:
                        "Submit bug reports and feature requests on our GitHub repository",
                    },
                    {
                      icon: <Code className="h-8 w-8 text-primary" />,
                      title: "Code Improvements",
                      description:
                        "Contribute code improvements and new features through pull requests",
                    },
                    {
                      icon: <FileText className="h-8 w-8 text-primary" />,
                      title: "Documentation",
                      description:
                        "Help improve our documentation and user guides",
                    },
                    {
                      icon: <Database className="h-8 w-8 text-primary" />,
                      title: "Data Sharing",
                      description:
                        "Share your research findings and datasets to enhance our AI models",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-muted p-4 rounded-lg"
                    >
                      {item.icon}
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-4 mt-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    Join Our Community
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Whether you&apos;re a student, a researcher or an enthusiast, we invite you to push the boundaries of AI-enabled research. 
                  </p>
                  <Button size="lg" className="mt-2">
                    <Github className="mr-2 h-5 w-5" />
                    Visit Our Public Repo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */
}
