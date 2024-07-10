import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TreeNodeDatum } from "react-d3-tree";
import {
  Info,
  NotebookPen,
  Calendar,
  Lightbulb,
  Leaf,
  Bug,
  BrainCircuit,
  GitBranch,
  Globe,
  HelpCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TreeNodeData extends TreeNodeDatum {
  attributes?: {
    scientificName?: string;
    description?: string;
    age?: string;
    status?: string;
    domain?: string;
    kingdom?: string;
    phylum?: string;
    class?: string;
    order?: string;
    family?: string;
    genus?: string;
    species?: string;
    geologicalAge?: string;
  };
}

interface InfoPanelProps {
  node: TreeNodeData | null;
}

const geologicalPeriods = {
  Hadean: 4600,
  Archean: 4000,
  Proterozoic: 2500,
  Paleoproterozoic: 2500,
  Mesoproterozoic: 1600,
  Neoproterozoic: 1000,
  Paleozoic: 541,
  Cambrian: 541,
  Ordovician: 485,
  Silurian: 444,
  Devonian: 419,
  Carboniferous: 359,
  Permian: 299,
  Mesozoic: 252,
  Triassic: 252,
  Jurassic: 201,
  Cretaceous: 145,
  Cenozoic: 66,
  Paleogene: 66,
  Neogene: 23,
  Pleistocene: 2.58,
  Holocene: 0.0117,
  Anthropocene: 0.000074, // Approximately 1950 CE
};

const InfoPanel: React.FC<InfoPanelProps> = ({ node }) => {
  if (!node) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[750px] flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6"
      >
        <Info className="w-16 h-16 mb-4 text-indigo-400" />
        <p className="text-lg font-semibold text-center">
          Select a node to view details
        </p>
      </motion.div>
    );
  }

  const taxonomyLevels = [
    "domain",
    "kingdom",
    "phylum",
    "subphylum",
    "class",
    "order",
    "family",
    "genus",
    "species",
  ];

  const getGeologicalAge = () => {
    const age = node.attributes?.geologicalAge;
    if (!age) return null;
  
    const [startPeriod, endPeriod] = age.split(" to ").map(p => p.trim());
    
    const getAge = (period: string) => {
      if (!period) return 4600; // Default to Earth's age if period is undefined
      if (period === "present") return 0;
      const exactMatch = geologicalPeriods[period];
      if (exactMatch !== undefined) return exactMatch;
      
      // If no exact match, find the most recent period that matches the start of the string
      const matchingPeriod = Object.keys(geologicalPeriods).find(key => period.startsWith(key));
      return matchingPeriod ? geologicalPeriods[matchingPeriod] : 4600; // Default to Earth's age if no match
    };
  
    const startAge = getAge(startPeriod);
    const endAge = getAge(endPeriod);
  
    const progress = ((4600 - startAge) / 4600) * 100;
    const endProgress = ((4600 - endAge) / 4600) * 100;
  
    // Calculate color based on age (red for older, green for younger)
    const startHue = Math.min(120, (progress / 100) * 120);
    const endHue = Math.min(120, (endProgress / 100) * 120);
    const startColor = `hsl(${startHue}, 100%, 50%)`;
    const endColor = `hsl(${endHue}, 100%, 50%)`;
  
    return { startPeriod, endPeriod, startAge, endAge, progress, endProgress, startColor, endColor };
  };
  
  const geologicalAge = getGeologicalAge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-[750px] overflow-auto bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg">
        <CardContent className="p-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold mb-2 text-indigo-700"
          >
            {node.name}
          </motion.h2>
          {node.attributes?.scientificName && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl italic text-indigo-600 mb-6"
            >
              {node.attributes.scientificName}
            </motion.p>
          )}

          <div className="space-y-6">
            <InfoItem
              icon={<NotebookPen className="text-indigo-500" />}
              title="Description"
              content={
                node.attributes?.description || "No description available"
              }
            />
            <InfoElement
              icon={<GitBranch className="text-indigo-500" />}
              title="Taxonomy"
              element={
                <div className="flex flex-wrap gap-2">
                  {taxonomyLevels.map(
                    (level) =>
                      node.attributes?.[level] &&
                      node.attributes[level] !== "N/A" && (
                        <span
                          key={level}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                        >
                          {level}: {node.attributes[level]}
                        </span>
                      )
                  )}
                </div>
              }
            />
            <InfoElement
              icon={<Globe className="text-indigo-500" />}
              title={
                <div className="flex items-center">
                  Geological Timeline
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 ml-2 text-indigo-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>The color gradient represents the geological age:</p>
                        <p>Red: Older periods</p>
                        <p>Green: Younger periods</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              }
              element={
                geologicalAge && (
                  <div className="bg-white bg-opacity-50 rounded-lg p-4 shadow-sm">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <div className="mb-2">
                            <Progress
                              value={geologicalAge.endProgress}
                              className="h-2"
                              style={{
                                background: `linear-gradient(to right, ${geologicalAge.startColor}, ${geologicalAge.endColor})`,
                              }}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {geologicalAge.startPeriod}:{" "}
                            {geologicalAge.startAge} mya
                          </p>
                          <p>
                            {geologicalAge.endPeriod}:{" "}
                            {geologicalAge.endAge === 0
                              ? "present"
                              : `${geologicalAge.endAge} mya`}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{geologicalAge.startPeriod}</span>
                      <span>{geologicalAge.endPeriod}</span>
                    </div>
                  </div>
                )
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                icon={<Calendar className="text-indigo-500" />}
                title="Age"
                content={node.attributes?.age || "Age not specified"}
              />
              {node.attributes?.status && (
                <InfoItem
                  icon={getStatusIcon(node.attributes.status)}
                  title="Status"
                  content={node.attributes.status}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InfoItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: string;
}> = ({ icon, title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="flex items-start bg-white bg-opacity-50 rounded-lg p-4 shadow-sm"
  >
    <div className="mr-4 mt-1">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-indigo-600 mb-2">{title}</h3>
      <p className="text-gray-700">{content}</p>
    </div>
  </motion.div>
);

const InfoElement: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode | string;
  element: React.ReactNode;
}> = ({ icon, title, element }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="flex bg-white bg-opacity-50 rounded-lg p-4 shadow-sm"
  >
    <div className="mr-4 mt-1">{icon}</div>
    <div className="w-full">
      <h3 className="text-lg font-semibold text-indigo-600 mb-2">{title}</h3>
      {element}
    </div>
  </motion.div>
);

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "living":
      return <Leaf className="text-green-500" />;
    case "extinct":
      return <Bug className="text-red-500" />;
    case "non-biological":
      return <BrainCircuit className="text-blue-500" />;
    default:
      return <Lightbulb className="text-yellow-500" />;
  }
};

export default InfoPanel;