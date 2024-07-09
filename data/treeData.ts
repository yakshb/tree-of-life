export const treeData = {
    name: "Origin of Life",
    attributes: {
      description: "The beginning of life on Earth, estimated to have occurred around 3.5 to 4 billion years ago."
    },
    children: [
      {
        name: "Prokaryotes",
        attributes: {
          description: "Single-celled organisms without a nucleus, the first form of life on Earth."
        },
        children: [
          {
            name: "Bacteria",
            attributes: {
              description: "Diverse group of prokaryotic microorganisms, found in every habitat on Earth."
            },
            children: [
              { 
                name: "Proteobacteria",
                attributes: {
                  description: "Largest and most diverse group of bacteria, including many pathogens and nitrogen-fixing bacteria."
                }
              },
              { 
                name: "Cyanobacteria",
                attributes: {
                  description: "Photosynthetic bacteria that played a crucial role in oxygenating Earth's atmosphere."
                }
              },
              { 
                name: "Firmicutes",
                attributes: {
                  description: "Gram-positive bacteria, including many common soil bacteria and some pathogens."
                }
              }
            ]
          },
          {
            name: "Archaea",
            attributes: {
              description: "Ancient prokaryotes, often found in extreme environments but also widespread in moderate ones."
            },
            children: [
              { 
                name: "Euryarchaeota",
                attributes: {
                  description: "Diverse group including methanogens and extreme halophiles."
                }
              },
              { 
                name: "Crenarchaeota",
                attributes: {
                  description: "Mostly thermophilic organisms, often found in hot springs and hydrothermal vents."
                }
              },
              { 
                name: "Thaumarchaeota",
                attributes: {
                  description: "Ammonia-oxidizing archaea, important in global nitrogen and carbon cycles."
                }
              }
            ]
          }
        ]
      },
      {
        name: "Eukaryotes",
        attributes: {
          description: "Organisms with complex cells containing a nucleus and organelles."
        },
        children: [
          {
            name: "Protists",
            attributes: {
              description: "Diverse group of eukaryotic organisms, mostly single-celled, that are not plants, animals, or fungi."
            },
            children: [
              { 
                name: "Amoebozoa",
                attributes: {
                  description: "Includes amoebas and slime molds, known for their ability to change shape."
                }
              },
              { 
                name: "Chromalveolata",
                attributes: {
                  description: "Diverse group including dinoflagellates, diatoms, and water molds."
                }
              },
              { 
                name: "Rhizaria",
                attributes: {
                  description: "Includes foraminifera and radiolarians, important in marine ecosystems."
                }
              },
              { 
                name: "Excavata",
                attributes: {
                  description: "Includes many parasitic protists, such as Giardia and Trichomonas."
                }
              }
            ]
          },
          {
            name: "Plants",
            attributes: {
              description: "Multicellular eukaryotes that produce their own food through photosynthesis."
            },
            children: [
              { 
                name: "Non-Vascular Plants",
                attributes: {
                  description: "Simple plants without a vascular system, including mosses and liverworts."
                }
              },
              { 
                name: "Vascular Plants",
                attributes: {
                  description: "Plants with specialized tissues for conducting water and nutrients."
                },
                children: [
                  { 
                    name: "Ferns",
                    attributes: {
                      description: "Seedless vascular plants that reproduce via spores."
                    }
                  },
                  { 
                    name: "Gymnosperms",
                    attributes: {
                      description: "Seed-bearing plants with 'naked' seeds, including conifers."
                    }
                  },
                  { 
                    name: "Angiosperms",
                    attributes: {
                      description: "Flowering plants, the most diverse and widespread plant group."
                    }
                  }
                ]
              }
            ]
          },
          {
            name: "Fungi",
            attributes: {
              description: "Eukaryotic organisms that digest their food externally and absorb nutrients directly."
            },
            children: [
              { 
                name: "Ascomycota",
                attributes: {
                  description: "Sac fungi, including yeasts, molds, and truffles."
                }
              },
              { 
                name: "Basidiomycota",
                attributes: {
                  description: "Club fungi, including mushrooms, puffballs, and bracket fungi."
                }
              },
              { 
                name: "Glomeromycota",
                attributes: {
                  description: "Arbuscular mycorrhizal fungi, important in plant-fungal symbiosis."
                }
              },
              { 
                name: "Microsporidia",
                attributes: {
                  description: "Parasitic fungi that infect animals, including humans."
                }
              }
            ]
          },
          {
            name: "Animals",
            attributes: {
              description: "Multicellular eukaryotes that ingest other organisms for nutrition."
            },
            children: [
              { 
                name: "Invertebrates",
                attributes: {
                  description: "Animals without a backbone, representing about 95% of all animal species."
                },
                children: [
                  { 
                    name: "Porifera",
                    attributes: {
                      description: "Sponges, simple animals with no true tissues or organs."
                    }
                  },
                  { 
                    name: "Cnidaria",
                    attributes: {
                      description: "Includes jellyfish, corals, and sea anemones."
                    }
                  },
                  { 
                    name: "Mollusca",
                    attributes: {
                      description: "Soft-bodied animals, often with shells, including snails and octopuses."
                    }
                  },
                  { 
                    name: "Arthropoda",
                    attributes: {
                      description: "Jointed-legged animals, including insects, spiders, and crustaceans."
                    }
                  },
                  { 
                    name: "Echinodermata",
                    attributes: {
                      description: "Spiny-skinned marine animals, including starfish and sea urchins."
                    }
                  }
                ]
              },
              {
                name: "Vertebrates",
                attributes: {
                  description: "Animals with a backbone or spinal column."
                },
                children: [
                  {
                    name: "Fish",
                    attributes: {
                      description: "Aquatic vertebrates with gills and fins."
                    },
                    children: [
                      {
                        name: "Jawless Fish",
                        attributes: {
                          description: "Ancient lineage of fish without jaws, including lampreys and hagfish."
                        }
                      },
                      {
                        name: "Cartilaginous Fish",
                        attributes: {
                          description: "Fish with skeletons made of cartilage, including sharks and rays."
                        }
                      },
                      {
                        name: "Bony Fish",
                        attributes: {
                          description: "Fish with bony skeletons, including most modern fish species."
                        },
                        children: [
                          {
                            name: "Ray-finned Fish",
                            attributes: {
                              description: "The most diverse group of fish, including most common fish species."
                            }
                          },
                          {
                            name: "Lobe-finned Fish",
                            attributes: {
                              description: "Fish with fleshy, lobed fins that are ancestors to tetrapods."
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: "Amphibians",
                    attributes: {
                      description: "Vertebrates that live both in water and on land, such as frogs and salamanders."
                    },
                    children: [
                      {
                        name: "Anura",
                        attributes: {
                          description: "Frogs and toads, known for their jumping abilities and lack of tails in adulthood."
                        }
                      },
                      {
                        name: "Caudata",
                        attributes: {
                          description: "Salamanders and newts, retaining tails throughout their lives."
                        }
                      },
                      {
                        name: "Gymnophiona",
                        attributes: {
                          description: "Caecilians, limbless amphibians that resemble worms or snakes."
                        }
                      }
                    ]
                  },
                  {
                    name: "Reptiles",
                    attributes: {
                      description: "Cold-blooded vertebrates with scales, including snakes and lizards."
                    },
                    children: [
                      {
                        name: "Squamata",
                        attributes: {
                          description: "Largest order of reptiles, including snakes and lizards."
                        }
                      },
                      {
                        name: "Testudines",
                        attributes: {
                          description: "Turtles and tortoises, characterized by their protective shells."
                        }
                      },
                      {
                        name: "Crocodilia",
                        attributes: {
                          description: "Crocodiles, alligators, and caimans, large predatory semi-aquatic reptiles."
                        }
                      },
                      {
                        name: "Rhynchocephalia",
                        attributes: {
                          description: "Tuatara, a rare reptile found only in New Zealand."
                        }
                      }
                    ]
                  },
                  {
                    name: "Birds",
                    attributes: {
                      description: "Warm-blooded vertebrates with feathers, adapted for flight."
                    },
                    children: [
                      {
                        name: "Paleognathae",
                        attributes: {
                          description: "Flightless birds and tinamous, including ostriches and emus."
                        }
                      },
                      {
                        name: "Neognathae",
                        attributes: {
                          description: "Most modern birds, including songbirds, waterfowl, and raptors."
                        },
                        children: [
                          {
                            name: "Galloanserae",
                            attributes: {
                              description: "Includes chickens, ducks, and geese."
                            }
                          },
                          {
                            name: "Neoaves",
                            attributes: {
                              description: "The most diverse group of modern birds."
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: "Mammals",
                    attributes: {
                      description: "Warm-blooded vertebrates that nurse their young with milk."
                    },
                    children: [
                      {
                        name: "Monotremes",
                        attributes: {
                          description: "Egg-laying mammals, such as platypus and echidnas."
                        }
                      },
                      {
                        name: "Marsupials",
                        attributes: {
                          description: "Mammals with pouches for carrying young, like kangaroos and koalas."
                        }
                      },
                      {
                        name: "Placentals",
                        attributes: {
                          description: "Mammals that give birth to well-developed young, including humans and most familiar mammals."
                        },
                        children: [
                          {
                            name: "Primates",
                            attributes: {
                              description: "Mammals including lemurs, monkeys, apes, and humans."
                            },
                            children: [
                              {
                                name: "Hominidae",
                                attributes: {
                                  description: "Great apes, including humans, chimpanzees, gorillas, and orangutans."
                                },
                                children: [
                                  {
                                    name: "Homo",
                                    attributes: {
                                      description: "The genus that includes modern humans and extinct human species."
                                    },
                                    children: [
                                      {
                                        name: "Homo sapiens",
                                        attributes: {
                                          description: "Modern humans, characterized by complex cognitive abilities and cultural development."
                                        },
                                        children: [
                                          {
                                            name: "Digital Entities",
                                            attributes: {
                                              description: "Non-biological systems created by humans that exhibit some characteristics of life."
                                            },
                                            children: [
                                              {
                                                name: "Artificial Intelligence",
                                                attributes: {
                                                  description: "Systems capable of performing tasks that typically require human intelligence."
                                                }
                                              },
                                              {
                                                name: "Virtual Life Forms",
                                                attributes: {
                                                  description: "Digital creatures that simulate aspects of biological life."
                                                }
                                              },
                                              {
                                                name: "Distributed Systems",
                                                attributes: {
                                                  description: "Networks of interconnected digital entities that can exhibit emergent behaviors."
                                                }
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    ]
  };