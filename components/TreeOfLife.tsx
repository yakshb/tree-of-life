"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

const TreeNode = ({ node, isRoot = false, onNodeClick }) => {
  const [isExpanded, setIsExpanded] = useState(isRoot);
  const [showDescription, setShowDescription] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    onNodeClick(node);
  };

  const toggleDescription = (e) => {
    e.stopPropagation();
    setShowDescription(!showDescription);
  };

  return (
    <div className={`tree-node ${isRoot ? 'root' : ''}`}>
      <div 
        className={`node-content p-2 rounded cursor-pointer ${
          isExpanded ? 'bg-blue-100' : 'hover:bg-gray-100'
        }`}
        onClick={toggleExpand}
      >
        <div className="font-semibold">{node.name}</div>
        {node.description && (
          <button 
            className="text-sm text-blue-500 hover:text-blue-700 mt-1"
            onClick={toggleDescription}
          >
            {showDescription ? 'Hide Info' : 'Show Info'}
          </button>
        )}
      </div>
      {showDescription && node.description && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
          {node.description}
        </div>
      )}
      {isExpanded && node.children && (
        <div className={`children-container ${isRoot ? 'flex space-x-4 mt-4' : 'ml-4 mt-2'}`}>
          {node.children.map((child, index) => (
            <TreeNode 
              key={index} 
              node={typeof child === 'string' ? { name: child } : child}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const evolutionaryTree = {
  name: "Origin of Life",
  description: "The beginning of life on Earth, estimated to have occurred around 3.5 to 4 billion years ago.",
  children: [
    {
      name: "Prokaryotes",
      description: "Single-celled organisms without a nucleus, the first form of life on Earth.",
      children: [
        { 
          name: "Bacteria", 
          description: "Diverse group of prokaryotic microorganisms, found in every habitat on Earth.",
          children: ["Proteobacteria", "Cyanobacteria", "Firmicutes"]
        },
        { 
          name: "Archaea", 
          description: "Ancient prokaryotes, often found in extreme environments but also widespread in moderate ones.",
          children: ["Euryarchaeota", "Crenarchaeota", "Thaumarchaeota"]
        }
      ]
    },
    {
      name: "Eukaryotes",
      description: "Organisms with complex cells containing a nucleus and organelles.",
      children: [
        {
          name: "Protists",
          description: "Diverse group of eukaryotic organisms, mostly single-celled, that are not plants, animals, or fungi.",
          children: ["Amoebozoa", "Chromalveolata", "Rhizaria", "Excavata"]
        },
        {
          name: "Plants",
          description: "Multicellular eukaryotes that produce their own food through photosynthesis.",
          children: [
            "Non-Vascular Plants",
            { 
              name: "Vascular Plants", 
              description: "Plants with specialized tissues for conducting water and nutrients.",
              children: ["Ferns", "Gymnosperms", "Angiosperms"]
            }
          ]
        },
        {
          name: "Fungi",
          description: "Eukaryotic organisms that digest their food externally and absorb nutrients directly.",
          children: ["Ascomycota", "Basidiomycota", "Glomeromycota", "Microsporidia"]
        },
        {
          name: "Animals",
          description: "Multicellular eukaryotes that ingest other organisms for nutrition.",
          children: [
            { 
              name: "Invertebrates", 
              description: "Animals without a backbone, representing about 95% of all animal species.",
              children: ["Porifera", "Cnidaria", "Mollusca", "Arthropoda", "Echinodermata"] 
            },
            { 
              name: "Vertebrates", 
              description: "Animals with a backbone or spinal column.",
              children: [
                "Fish",
                "Amphibians",
                "Reptiles",
                "Birds",
                { 
                  name: "Mammals", 
                  description: "Warm-blooded vertebrates that nurse their young with milk.",
                  children: ["Monotremes", "Marsupials", "Placentals"]
                }
              ] 
            }
          ]
        }
      ]
    },
    {
      name: "Digital Entities",
      description: "Non-biological systems that exhibit some characteristics of life.",
      children: [
        { 
          name: "Artificial Intelligence", 
          description: "Systems capable of performing tasks that typically require human intelligence.",
          children: ["Machine Learning", "Neural Networks", "Expert Systems"]
        },
        { 
          name: "Virtual Life Forms", 
          description: "Digital creatures that simulate aspects of biological life.",
          children: ["Cellular Automata", "Artificial Life Simulations", "Digital Ecosystems"]
        },
        { 
          name: "Distributed Systems", 
          description: "Networks of interconnected digital entities that can exhibit emergent behaviors.",
          children: ["Blockchain Networks", "Internet of Things", "Swarm Intelligence"]
        }
      ]
    }
  ]
};

const BreadcrumbTrail = ({ path, onNavigate }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>}
            <BreadcrumbItem>
              {index === path.length - 1 ? (
                <BreadcrumbPage>{item}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink onClick={() => onNavigate(index)}>{item}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const AIAssistant = ({ onResponse }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate AI response (in a real app, this would call an AI service)
    const response = `Here's what I found about "${query}": [AI-generated content would go here]`;
    onResponse(response);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about any life form..."
          className="flex-grow"
        />
        <Button type="submit">Ask AI</Button>
      </div>
    </form>
  );
};

const VisualTreeOfLife = () => {
  const [aiResponse, setAIResponse] = useState('');
  const [explorationPath, setExplorationPath] = useState(["Origin of Life"]);
  const [aiSuggestion, setAISuggestion] = useState('');

  const handleNodeClick = (node) => {
    setExplorationPath(prev => [...prev, node.name]);
    // Simulate AI suggestion based on the clicked node
    setAISuggestion(`Based on your interest in ${node.name}, you might want to explore: [AI suggestion would go here]`);
  };

  const handleBreadcrumbNavigate = (index) => {
    setExplorationPath(prev => prev.slice(0, index + 1));
  };

  useEffect(() => {
    // Simulate periodic AI insights
    const interval = setInterval(() => {
      setAISuggestion(`Did you know? [Random AI-generated fact about life would go here]`);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center mb-4">AI-Interactive Tree of Life Explorer</h2>
        <p className="text-center text-gray-600 mb-6">
          Explore the diversity of life with AI assistance. Ask questions or click on branches to learn more.
        </p>
        <AIAssistant onResponse={setAIResponse} />
      </CardHeader>
      <CardContent>
        {aiResponse && (
          <div className="mb-4 p-3 bg-blue-50 rounded">
            <h3 className="font-semibold">AI Response:</h3>
            <p>{aiResponse}</p>
          </div>
        )}
        {aiSuggestion && (
          <div className="mb-4 p-3 bg-green-50 rounded">
            <h3 className="font-semibold">AI Suggestion:</h3>
            <p>{aiSuggestion}</p>
          </div>
        )}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Your Exploration Path:</h3>
          <BreadcrumbTrail path={explorationPath} onNavigate={handleBreadcrumbNavigate} />
        </div>
        <div className="overflow-auto bg-gray-50 p-6 rounded" style={{ maxHeight: '60vh' }}>
          <TreeNode 
            node={evolutionaryTree} 
            isRoot={true} 
            onNodeClick={handleNodeClick}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualTreeOfLife;