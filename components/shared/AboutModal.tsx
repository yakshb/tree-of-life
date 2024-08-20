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
import { Leaf, Brain, Code, Users, TreesIcon } from "lucide-react";
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
                <CardTitle className="text-3xl">Welcome to Tree of Life AI</CardTitle>
                <CardDescription className="text-lg">
                  Discover the interconnectedness of all living things
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
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Our Mission</h3>
                  <p>
                    Tree of Life AI is an innovative application that harnesses the power of artificial intelligence to explore and visualize the vast network of biological relationships connecting all living organisms on Earth. Our mission is to make the complex world of evolutionary biology accessible and engaging for everyone, from curious students to seasoned researchers.
                  </p>
                  <h3 className="text-2xl font-semibold">Why Tree of Life AI?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Explore the intricate web of life with interactive visualizations</li>
                    <li>Discover evolutionary connections between species</li>
                    <li>Contribute to and benefit from a global community of researchers</li>
                    <li>Leverage cutting-edge AI to enhance your understanding of biodiversity</li>
                  </ul>
                  <h3 className="text-2xl font-semibold">Our Approach</h3>
                  <p>
                    By combining state-of-the-art artificial intelligence with comprehensive biological databases, Tree of Life AI offers a unique platform for exploring the rich tapestry of life on Earth. Our intuitive interface and powerful tools make it easy for users of all backgrounds to dive into the fascinating world of evolutionary biology.
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Badge variant="outline" className="text-sm py-1 px-2">
                    <Leaf className="w-4 h-4 mr-1" />
                    Biodiversity
                  </Badge>
                  <Badge variant="outline" className="text-sm py-1 px-2">
                    <Brain className="w-4 h-4 mr-1" />
                    AI-Powered
                  </Badge>
                  <Badge variant="outline" className="text-sm py-1 px-2">
                    <Users className="w-4 h-4 mr-1" />
                    Collaborative
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>
                  Explore the powerful capabilities of Tree of Life AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Interactive Phylogenetic Trees
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Visualize evolutionary relationships with stunning,
                        interactive tree diagrams.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Brain className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        AI-Powered Species Identification
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Upload images to identify species and learn about their
                        evolutionary history.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Code className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Genetic Sequence Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Analyze and compare genetic sequences to understand
                        evolutionary relationships.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Collaborative Research Tools
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Share findings, collaborate on projects, and contribute
                        to the global scientific community.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="using-ai" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Using AI in Tree of Life</CardTitle>
                <CardDescription>
                  Discover how artificial intelligence enhances your exploration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <p>
                  Tree of Life AI leverages cutting-edge artificial intelligence
                  to revolutionize the way we understand and explore
                  biodiversity. Here&apos;s how AI enhances your experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Advanced image recognition for species identification</li>
                  <li>
                    Natural language processing for intuitive search and
                    discovery
                  </li>
                  <li>
                    Machine learning algorithms for predicting evolutionary
                    relationships
                  </li>
                  <li>
                    AI-assisted data analysis for genetic sequence comparisons
                  </li>
                </ul>
                <p>
                  Our AI models are continuously learning and improving,
                  ensuring that you always have access to the most up-to-date
                  and accurate information about the tree of life.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contributing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contributing to Tree of Life AI</CardTitle>
                <CardDescription>
                  Join our community and help shape the future of biodiversity
                  research
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We believe in the power of collaboration and open-source
                  development. Tree of Life AI is a community-driven project,
                  and we welcome contributions from researchers, developers, and
                  enthusiasts alike.
                </p>
                <h3 className="text-lg font-semibold">How to Contribute:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Submit bug reports and feature requests on our GitHub
                    repository
                  </li>
                  <li>
                    Contribute code improvements and new features through pull
                    requests
                  </li>
                  <li>Help improve our documentation and user guides</li>
                  <li>
                    Share your research findings and datasets to enhance our AI
                    models
                  </li>
                </ul>
                <div className="flex justify-center mt-4">
                  <Button>
                    <Code className="mr-2 h-4 w-4" />
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