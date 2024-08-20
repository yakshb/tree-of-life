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
  TreesIcon,
  Sparkles,
  Network,
  Check,
  Dna,
  Microscope,
  Globe,
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
import logo from "@/assets/TOLai-logo.svg";
import cover from "@/assets/about-page-cover.jpg";

export default function AboutModal() {
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full ${
            activeTab === "about" ? "bg-primary text-primary-foreground" : ""
          }`}
        >
          <TreesIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">About Tree of Life AI</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold flex items-center gap-3">
            <Image
              src={logo}
              alt="Tree of Life Explorer AI Logo"
              width={40}
              height={40}
            />
            Tree of Life Explorer
          </DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="introduction"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="introduction">Introduction</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="using-ai">Using AI</TabsTrigger>
            <TabsTrigger value="contributing">Contributing</TabsTrigger>
          </TabsList>
          <TabsContent value="introduction" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Welcome to Tree of Life AI
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                      <Globe className="h-6 w-6 text-primary" />
                      Our Mission
                    </h3>
                    <p className="text-muted-foreground">
                      Tree of Life AI is an innovative application that
                      harnesses the power of artificial intelligence to explore
                      and visualize the vast network of biological relationships
                      connecting all living organisms on Earth. Our mission is
                      to make the complex world of evolutionary biology
                      accessible and engaging for everyone, from curious
                      students to seasoned researchers.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                      <Microscope className="h-6 w-6 text-primary" />
                      Our Approach
                    </h3>
                    <p className="text-muted-foreground">
                      By combining state-of-the-art artificial intelligence with
                      comprehensive biological databases, Tree of Life AI offers
                      a unique platform for exploring the rich tapestry of life
                      on Earth. Our intuitive interface and powerful tools make
                      it easy for users of all backgrounds to dive into the
                      fascinating world of evolutionary biology.
                    </p>
                  </div>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Dna className="h-6 w-6 text-primary" />
                    Why Tree of Life AI?
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Explore the intricate web of life with interactive visualizations",
                      "Discover evolutionary connections between species",
                      "Contribute to and benefit from a global community of researchers",
                      "Leverage cutting-edge AI to enhance your understanding of biodiversity",
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
                    Collaborative Research
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Key Features
                </CardTitle>
                <CardDescription>
                  Discover the innovative capabilities of Tree of Life AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800">
                    <CardHeader className="pb-2">
                      <div className="bg-green-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                        <Network className="h-6 w-6" />
                      </div>
                      <CardTitle>Interactive Phylogenetic Trees</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Explore the tree of life with stunning, interactive
                        visualizations. Zoom, pan, and click through branches to
                        discover evolutionary relationships in an intuitive
                        interface.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800">
                    <CardHeader className="pb-2">
                      <div className="bg-blue-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                        <Brain className="h-6 w-6" />
                      </div>
                      <CardTitle>AI-Powered Exploration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Harness the power of AI to identify species, analyze
                        genetic sequences, and uncover hidden patterns in
                        biological data. Our AI assistant guides you through
                        complex evolutionary concepts.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800">
                    <CardHeader className="pb-2">
                      <div className="bg-purple-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <CardTitle>Multiple LLM Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Leverage the latest open-source models in our beta, with
                        planned support for OpenAI, Anthropic, and custom
                        fine-tuned models. Enhance your research with
                        cutting-edge language models and image generation
                        capabilities.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900 dark:to-orange-800">
                    <CardHeader className="pb-2">
                      <div className="bg-orange-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                        <Users className="h-6 w-6" />
                      </div>
                      <CardTitle>Collaboration Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        <span className="font-semibold text-orange-600 dark:text-orange-400">
                          Coming Soon:
                        </span>{" "}
                        Share your findings, collaborate on projects, and
                        contribute to the global scientific community. Join
                        forces with researchers worldwide to unlock the secrets
                        of biodiversity.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="using-ai" className="mt-6">
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

                <div className="bg-muted p-6 rounded-lg">
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

                <div className="flex items-center justify-center gap-4 bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
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
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
                  <p className="text-center text-muted-foreground italic">
                    "Alone we can do so little; together we can do so much." -
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
