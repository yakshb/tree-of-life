export const treeData = {
  name: "Origin of Life",
  attributes: {
    description:
      "The beginning of life on Earth, estimated to have occurred around 3.5 to 4 billion years ago. Early Earth conditions included a reducing atmosphere, high temperatures, and frequent bombardment by asteroids and comets. Possible mechanisms for abiogenesis include RNA world hypothesis, iron-sulfur world theory, and lipid world scenario.",
    age: "~3.8 billion years ago",
    status: "Developing",
  },
  children: [
    {
      name: "Prokaryotes",
      attributes: {
        description:
          "Single-celled organisms without a nucleus, the first form of life on Earth. Characterized by simple cellular structure and circular DNA.",
        age: "~3.8 billion years ago",
        status: "Living",
      },
      children: [
        {
          name: "Bacteria",
          attributes: {
            description:
              "Diverse group of prokaryotic microorganisms, found in every habitat on Earth. They play crucial roles in nutrient cycling and many form symbiotic relationships with other organisms.",
            age: "~3.5 billion years ago",
            status: "Living",
          },
          children: [
            {
              name: "Proteobacteria",
              attributes: {
                description:
                  "Largest and most diverse group of bacteria, including many pathogens and nitrogen-fixing bacteria. Includes E. coli, Salmonella, and Helicobacter.",
                age: "~2.5 billion years ago",
                status: "Living",
              },
            },
            {
              name: "Cyanobacteria",
              attributes: {
                description:
                  "Photosynthetic bacteria that played a crucial role in oxygenating Earth's atmosphere. Some can fix nitrogen and form symbiotic relationships with plants.",
                age: "~2.7 billion years ago",
                status: "Living",
              },
            },
            {
              name: "Firmicutes",
              attributes: {
                description:
                  "Gram-positive bacteria, including many common soil bacteria and some pathogens. Includes Bacillus, Staphylococcus, and Clostridium species.",
                age: "~3 billion years ago",
                status: "Living",
              },
            },
          ],
        },
        {
          name: "Archaea",
          attributes: {
            description:
              "Ancient prokaryotes, often found in extreme environments but also widespread in moderate ones. They have unique cell membrane lipids and many have metabolic pathways distinct from bacteria.",
            age: "~3.8 billion years ago",
            status: "Living",
          },
          children: [
            {
              name: "Euryarchaeota",
              attributes: {
                description:
                  "Diverse group including methanogens and extreme halophiles. Methanogens play a crucial role in carbon cycling and are important in anaerobic environments.",
                age: "~3.5 billion years ago",
                status: "Living",
              },
            },
            {
              name: "Crenarchaeota",
              attributes: {
                description:
                  "Mostly thermophilic organisms, often found in hot springs and hydrothermal vents. Some species can oxidize ammonia and are important in marine ecosystems.",
                age: "~3.5 billion years ago",
                status: "Living",
              },
            },
            {
              name: "Thaumarchaeota",
              attributes: {
                description:
                  "Ammonia-oxidizing archaea, important in global nitrogen and carbon cycles. They are among the most abundant microorganisms in marine environments.",
                age: "~2.7 billion years ago",
                status: "Living",
              },
            },
          ],
        },
        {
          name: "Candidate Phyla Radiation (CPR)",
          attributes: {
            description:
              "Also known as Patescibacteria, this is a recently proposed superphylum of bacteria characterized by small genomes and cells. They are widespread but difficult to culture, and their role in ecosystems is still being studied.",
            age: "Unknown, but likely very ancient",
            status: "Living",
          },
        },
      ],
    },
    {
      name: "Eukaryotes",
      attributes: {
        description:
          "Organisms with complex cells containing a nucleus and organelles. Evolved through endosymbiosis, where primitive eukaryotic cells engulfed prokaryotes that became mitochondria and chloroplasts.",
        age: "~2.1 billion years ago",
        status: "Living",
      },
      children: [
        {
          name: "Protists",
          attributes: {
            description:
              "Diverse group of eukaryotic organisms, mostly single-celled, that are not plants, animals, or fungi. This is a paraphyletic group and its classification is continually revised.",
            age: "~1.8 billion years ago",
            status: "Living",
          },
          children: [
            {
              name: "Amoebozoa",
              attributes: {
                description:
                  "Includes amoebas and slime molds, known for their ability to change shape. They move and feed by extending pseudopodia.",
                age: "~1 billion years ago",
                status: "Living",
              },
            },
            {
              name: "SAR supergroup",
              attributes: {
                description:
                  "A large group including Stramenopiles, Alveolates, and Rhizaria. This supergroup includes many important marine microorganisms.",
                age: "~1.5 billion years ago",
                status: "Living",
              },
              children: [
                {
                  name: "Stramenopiles",
                  attributes: {
                    description:
                      "Includes diatoms, brown algae, and water molds. Many are important primary producers in aquatic ecosystems.",
                    age: "~1.2 billion years ago",
                    status: "Living",
                  },
                },
                {
                  name: "Alveolates",
                  attributes: {
                    description:
                      "Includes dinoflagellates, apicomplexans, and ciliates. Some form symbiotic relationships with corals, while others are parasites.",
                    age: "~1.2 billion years ago",
                    status: "Living",
                  },
                },
                {
                  name: "Rhizaria",
                  attributes: {
                    description:
                      "Includes foraminifera and radiolarians, important in marine ecosystems and as microfossils for studying past climates.",
                    age: "~1 billion years ago",
                    status: "Living",
                  },
                },
              ],
            },
            {
              name: "Excavata",
              attributes: {
                description:
                  "Includes many parasitic protists, such as Giardia and Trichomonas. Many have modified mitochondria and unique cellular structures.",
                age: "~1.5 billion years ago",
                status: "Living",
              },
            },
          ],
        },
        {
          name: "Plants",
          attributes: {
            description:
              "Multicellular eukaryotes that produce their own food through photosynthesis. They evolved from green algae and their transition to land was a major evolutionary event.",
            age: "~1 billion years ago (for green algae), ~470 million years ago (for land plants)",
            status: "Living",
          },
          children: [
            {
              name: "Non-Vascular Plants",
              attributes: {
                description:
                  "Simple plants without a vascular system, including mosses, liverworts, and hornworts. They require moist environments and represent the earliest land plants.",
                age: "~470 million years ago",
                status: "Living",
              },
            },
            {
              name: "Vascular Plants",
              attributes: {
                description:
                  "Plants with specialized tissues for conducting water and nutrients. Their evolution allowed plants to colonize diverse terrestrial habitats.",
                age: "~420 million years ago",
                status: "Living",
              },
              children: [
                {
                  name: "Ferns and allies",
                  attributes: {
                    description:
                      "Seedless vascular plants that reproduce via spores. Includes ferns, horsetails, and club mosses.",
                    age: "~390 million years ago",
                    status: "Living",
                  },
                },
                {
                  name: "Gymnosperms",
                  attributes: {
                    description:
                      "Seed-bearing plants with 'naked' seeds, including conifers, cycads, and ginkgoes. They were the dominant land plants before the rise of angiosperms.",
                    age: "~310 million years ago",
                    status: "Living",
                  },
                },
                {
                  name: "Angiosperms",
                  attributes: {
                    description:
                      "Flowering plants, the most diverse and widespread plant group. They have evolved complex relationships with pollinators and have dominated terrestrial ecosystems since the Cretaceous period.",
                    age: "~140 million years ago",
                    status: "Living",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "Fungi",
          attributes: {
            description:
              "Eukaryotic organisms that digest their food externally and absorb nutrients directly. They play crucial roles in decomposition and form symbiotic relationships with many organisms.",
            age: "~1 billion years ago",
            status: "Living",
          },
          children: [
            {
              name: "Ascomycota",
              attributes: {
                description:
                  "Sac fungi, including yeasts, molds, and truffles. Many are important in food production and as plant pathogens.",
                age: "~500 million years ago",
                status: "Living",
              },
            },
            {
              name: "Basidiomycota",
              attributes: {
                description:
                  "Club fungi, including mushrooms, puffballs, and bracket fungi. Many form mycorrhizal associations with plants and are important decomposers in forest ecosystems.",
                age: "~500 million years ago",
                status: "Living",
              },
            },
            {
              name: "Glomeromycota",
              attributes: {
                description:
                  "Arbuscular mycorrhizal fungi, important in plant-fungal symbiosis. They form associations with around 80% of land plant species.",
                age: "~460 million years ago",
                status: "Living",
              },
            },
            {
              name: "Microsporidia",
              attributes: {
                description:
                  "Parasitic fungi that infect animals, including humans. They have highly reduced genomes and cellular structures.",
                age: "~500 million years ago",
                status: "Living",
              },
            },
          ],
        },
        {
          name: "Animals",
          attributes: {
            description:
              "Multicellular eukaryotes that ingest other organisms for nutrition. They evolved from a colonial protist ancestor and have developed complex body plans and behaviors.",
            age: "~650 million years ago",
            status: "Living",
          },
          children: [
            {
              name: "Invertebrates",
              attributes: {
                description:
                  "Animals without a backbone, representing about 95% of all animal species. This is a paraphyletic group that includes a vast diversity of body plans and lifestyles.",
                age: "~650 million years ago",
                status: "Living and Extinct",
              },
              children: [
                {
                  name: "Porifera",
                  attributes: {
                    description:
                      "Sponges, simple animals with no true tissues or organs. They are filter feeders and represent one of the earliest branches of the animal tree.",
                    age: "~600 million years ago",
                    status: "Living",
                  },
                },
                {
                  name: "Cnidaria",
                  attributes: {
                    description:
                      "Includes jellyfish, corals, and sea anemones. They have radial symmetry and specialized stinging cells called cnidocytes.",
                    age: "~580 million years ago",
                    status: "Living",
                  },
                },
                {
                  name: "Mollusca",
                  attributes: {
                    description:
                      "Soft-bodied animals, often with shells, including snails, clams, and octopuses. They have a muscular foot, a mantle, and a radula for feeding.",
                    age: "~540 million years ago",
                    status: "Living",
                  },
                },
                {
                  name: "Arthropoda",
                  attributes: {
                    description:
                      "Jointed-legged animals, including insects, spiders, and crustaceans. They are the most diverse animal phylum and have evolved to occupy nearly every habitat on Earth.",
                    age: "~540 million years ago",
                    status: "Living",
                  },
                },
                {
                  name: "Echinodermata",
                  attributes: {
                    description:
                      "Spiny-skinned marine animals, including starfish and sea urchins. They have a unique water vascular system and exhibit pentaradial symmetry as adults.",
                    age: "~530 million years ago",
                    status: "Living",
                  },
                },
              ],
            },
            {
              name: "Vertebrates",
              attributes: {
                description:
                  "Animals with a backbone or spinal column. They evolved from a common ancestor with invertebrate chordates and have developed complex nervous systems and sensory organs.",
                age: "~525 million years ago",
                status: "Living and Extinct",
              },
              children: [
                {
                  name: "Fish",
                  attributes: {
                    description:
                      "Aquatic vertebrates with gills and fins. They were the first vertebrates to evolve and have diversified into a wide range of forms.",
                    age: "~520 million years ago",
                    status: "Living and Extinct",
                  },
                  children: [
                    {
                      name: "Jawless Fish",
                      attributes: {
                        description:
                          "Ancient lineage of fish without jaws, including lampreys and hagfish. They represent the earliest vertebrates.",
                        age: "~520 million years ago",
                        status: "Living and Extinct",
                      },
                    },
                    {
                      name: "Cartilaginous Fish",
                      attributes: {
                        description:
                          "Fish with skeletons made of cartilage, including sharks and rays. They have a number of unique adaptations including electroreception.",
                        age: "~420 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Bony Fish",
                      attributes: {
                        description:
                          "Fish with bony skeletons, including most modern fish species. They have diversified into a wide range of forms and habitats.",
                        age: "~420 million years ago",
                        status: "Living and Extinct",
                      },
                      children: [
                        {
                          name: "Ray-finned Fish",
                          attributes: {
                            description:
                              "The most diverse group of fish, including most common fish species. They have fins supported by bony spines called rays.",
                            age: "~390 million years ago",
                            status: "Living",
                          },
                        },
                        {
                          name: "Lobe-finned Fish",
                          attributes: {
                            description:
                              "Fish with fleshy, lobed fins that are ancestors to tetrapods. Includes coelacanths and lungfish.",
                            age: "~390 million years ago",
                            status: "Living and Extinct",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "Amphibians",
                  attributes: {
                    description:
                      "Vertebrates that live both in water and on land, such as frogs and salamanders. They typically have a larval aquatic stage and a terrestrial adult stage.",
                    age: "~370 million years ago",
                    status: "Living and Extinct",
                  },
                  children: [
                    {
                      name: "Anura",
                      attributes: {
                        description:
                          "Frogs and toads, known for their jumping abilities and lack of tails in adulthood. They have highly specialized anatomy for jumping and unique reproductive strategies.",
                        age: "~200 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Caudata",
                      attributes: {
                        description:
                          "Salamanders and newts, retaining tails throughout their lives. They have less specialized body plans compared to frogs and some can regenerate lost limbs.",
                        age: "~200 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Gymnophiona",
                      attributes: {
                        description:
                          "Caecilians, limbless amphibians that resemble worms or snakes. They are adapted for burrowing and are found in tropical regions.",
                        age: "~170 million years ago",
                        status: "Living",
                      },
                    },
                  ],
                },
                {
                  name: "Reptiles",
                  attributes: {
                    description:
                      "Cold-blooded vertebrates with scales, including snakes and lizards. They were the first fully terrestrial vertebrates and have diverse adaptations for life on land.",
                    age: "~320 million years ago",
                    status: "Living and Extinct",
                  },
                  children: [
                    {
                      name: "Squamata",
                      attributes: {
                        description:
                          "Largest order of reptiles, including snakes and lizards. They have highly diverse body plans and behaviors, including limbless and gliding forms.",
                        age: "~200 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Testudines",
                      attributes: {
                        description:
                          "Turtles and tortoises, characterized by their protective shells. They have a unique body plan with a shell integrated with their ribcage and spine.",
                        age: "~220 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Crocodilia",
                      attributes: {
                        description:
                          "Crocodiles, alligators, and caimans, large predatory semi-aquatic reptiles. They are the closest living relatives to birds and have complex social behaviors.",
                        age: "~95 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Rhynchocephalia",
                      attributes: {
                        description:
                          "Tuatara, a rare reptile found only in New Zealand. They are the sole survivors of an ancient order of reptiles and have unique anatomical features.",
                        age: "~250 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Dinosauria",
                      attributes: {
                        description:
                          "A diverse group of reptiles that dominated terrestrial ecosystems for over 160 million years. They gave rise to birds and exhibited a wide range of body sizes and adaptations.",
                        age: "~245 million years ago",
                        status: "Extinct and Living (as birds)",
                      },
                      children: [
                        {
                          name: "Saurischia",
                          attributes: {
                            description:
                              "One of two major divisions of dinosaurs, including theropods and sauropodomorphs. Characterized by a lizard-like hip structure.",
                            age: "~230 million years ago",
                            status: "Extinct and Living (as birds)",
                          },
                          children: [
                            {
                              name: "Theropoda",
                              attributes: {
                                description:
                                  "Primarily carnivorous dinosaurs that walked on two legs. This group includes the ancestors of birds.",
                                age: "~230 million years ago",
                                status: "Extinct and Living (as birds)",
                              },
                              children: [
                                {
                                  name: "Tyrannosauroidea",
                                  attributes: {
                                    description:
                                      "Large carnivorous dinosaurs including Tyrannosaurus rex. Known for powerful jaws and reduced forelimbs.",
                                    age: "~160 million years ago",
                                    status: "Extinct",
                                  },
                                },
                                {
                                  name: "Avialae",
                                  attributes: {
                                    description:
                                      "The group that includes the common ancestor of all modern birds and its descendants.",
                                    age: "~160 million years ago",
                                    status: "Living (as modern birds)",
                                  },
                                },
                              ],
                            },
                            {
                              name: "Sauropodomorpha",
                              attributes: {
                                description:
                                  "Herbivorous dinosaurs, including the largest land animals ever. Known for long necks and tails.",
                                age: "~230 million years ago",
                                status: "Extinct",
                              },
                            },
                          ],
                        },
                        {
                          name: "Ornithischia",
                          attributes: {
                            description:
                              "The other major division of dinosaurs, all herbivorous. Characterized by a bird-like hip structure.",
                            age: "~225 million years ago",
                            status: "Extinct",
                          },
                          children: [
                            {
                              name: "Thyreophora",
                              attributes: {
                                description:
                                  "Armored dinosaurs including stegosaurs and ankylosaurs.",
                                age: "~200 million years ago",
                                status: "Extinct",
                              },
                            },
                            {
                              name: "Ornithopoda",
                              attributes: {
                                description:
                                  "Beaked herbivorous dinosaurs, including duck-billed dinosaurs.",
                                age: "~200 million years ago",
                                status: "Extinct",
                              },
                            },
                            {
                              name: "Ceratopsia",
                              attributes: {
                                description:
                                  "Horned, frilled dinosaurs including Triceratops.",
                                age: "~160 million years ago",
                                status: "Extinct",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "Birds",
                  attributes: {
                    description:
                      "Warm-blooded vertebrates with feathers, adapted for flight. They evolved from theropod dinosaurs and have developed diverse adaptations for flight, feeding, and habitat use.",
                    age: "~150 million years ago",
                    status: "Living",
                  },
                  children: [
                    {
                      name: "Paleognathae",
                      attributes: {
                        description:
                          "Flightless birds and tinamous, including ostriches and emus. They represent an early branch of bird evolution and many have adapted to terrestrial lifestyles.",
                        age: "~100 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Neognathae",
                      attributes: {
                        description:
                          "Most modern birds, including songbirds, waterfowl, and raptors. They have diversified into a wide range of forms and occupy nearly every terrestrial and many aquatic habitats.",
                        age: "~100 million years ago",
                        status: "Living",
                      },
                      children: [
                        {
                          name: "Galloanserae",
                          attributes: {
                            description:
                              "Includes chickens, ducks, and geese. They are an early branch of neognath birds and many have been domesticated.",
                            age: "~85 million years ago",
                            status: "Living",
                          },
                        },
                        {
                          name: "Neoaves",
                          attributes: {
                            description:
                              "The most diverse group of modern birds, comprising over 90% of living bird species. They underwent rapid diversification after the extinction of non-avian dinosaurs.",
                            age: "~80 million years ago",
                            status: "Living",
                          },
                          children: [
                            {
                              name: "Passeriformes",
                              attributes: {
                                description:
                                  "Perching birds, including songbirds, ravens, and finches. They are the largest order of birds, known for their vocal abilities and diverse beak shapes.",
                                age: "~50 million years ago",
                                status: "Living",
                              },
                            },
                            {
                              name: "Apodiformes",
                              attributes: {
                                description:
                                  "Swifts and hummingbirds, characterized by their ability for sustained flight and, in hummingbirds, hovering flight.",
                                age: "~50 million years ago",
                                status: "Living",
                              },
                            },
                            {
                              name: "Charadriiformes",
                              attributes: {
                                description:
                                  "Shorebirds and allies, including gulls, auks, and waders. They are often associated with aquatic or coastal environments.",
                                age: "~60 million years ago",
                                status: "Living",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "Mammals",
                  attributes: {
                    description:
                      "Warm-blooded vertebrates that nurse their young with milk. They have evolved diverse adaptations for locomotion, feeding, and environmental tolerance.",
                    age: "~225 million years ago",
                    status: "Living and Extinct",
                  },
                  children: [
                    {
                      name: "Monotremes",
                      attributes: {
                        description:
                          "Egg-laying mammals, such as platypus and echidnas. They retain reptilian features like egg-laying but produce milk and have fur.",
                        age: "~120 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Marsupials",
                      attributes: {
                        description:
                          "Mammals with pouches for carrying young, like kangaroos and koalas. They give birth to very underdeveloped young that continue to develop in the pouch.",
                        age: "~125 million years ago",
                        status: "Living",
                      },
                    },
                    {
                      name: "Placentals",
                      attributes: {
                        description:
                          "Mammals that give birth to well-developed young, including humans and most familiar mammals. They have a placenta that nourishes the fetus during gestation.",
                        age: "~100 million years ago",
                        status: "Living and Extinct",
                      },
                      children: [
                        {
                          name: "Primates",
                          attributes: {
                            description:
                              "Mammals including lemurs, monkeys, apes, and humans. They are characterized by large brains, stereoscopic vision, and grasping hands and feet.",
                            age: "~65 million years ago",
                            status: "Living and Extinct",
                          },
                          children: [
                            {
                              name: "Hominidae",
                              attributes: {
                                description:
                                  "Great apes, including humans, chimpanzees, gorillas, and orangutans. They are the most intelligent primates, with complex social structures and tool use.",
                                age: "~20 million years ago",
                                status: "Living and Extinct",
                              },
                              children: [
                                {
                                  name: "Homo",
                                  attributes: {
                                    description:
                                      "The genus that includes modern humans and extinct human species. Characterized by bipedalism, large brains, and complex culture.",
                                    age: "~2.5 million years ago",
                                    status: "Living and Extinct",
                                  },
                                  children: [
                                    {
                                      name: "Homo habilis",
                                      attributes: {
                                        description:
                                          "One of the earliest species in the genus Homo. Known for making simple stone tools.",
                                        age: "~2.3 to 1.5 million years ago",
                                        status: "Extinct",
                                      },
                                    },
                                    {
                                      name: "Homo erectus",
                                      attributes: {
                                        description:
                                          "The first human species to spread out of Africa. Known for advanced tool use and possibly the control of fire.",
                                        age: "~2 million to 100,000 years ago",
                                        status: "Extinct",
                                      },
                                    },
                                    {
                                      name: "Homo neanderthalensis",
                                      attributes: {
                                        description:
                                          "Closely related to modern humans, lived in Europe and parts of Asia. Known for advanced tools, possible symbolic thought, and interbreeding with Homo sapiens.",
                                        age: "~400,000 to 40,000 years ago",
                                        status: "Extinct",
                                      },
                                    },
                                    {
                                      name: "Homo floresiensis",
                                      attributes: {
                                        description:
                                          "A small-bodied species found on the island of Flores, Indonesia. Nicknamed 'hobbit' due to its small size.",
                                        age: "~100,000 to 50,000 years ago",
                                        status: "Extinct",
                                      },
                                    },
                                    {
                                      name: "Homo denisova",
                                      attributes: {
                                        description:
                                          "Known mostly from DNA evidence. Interbred with both Neanderthals and modern humans.",
                                        age: "~300,000 to 40,000 years ago",
                                        status: "Extinct",
                                      },
                                    },
                                    {
                                      name: "Homo sapiens",
                                      attributes: {
                                        description:
                                          "Modern humans, characterized by complex cognitive abilities and cultural development. The only extant species in the genus Homo.",
                                        age: "~300,000 years ago",
                                        status: "Living",
                                      },
                                      children: [
                                        {
                                          name: "Digital Entities",
                                          attributes: {
                                            description:
                                              "Non-biological systems created by humans that exhibit some characteristics of life. While not biological, they represent a significant human creation.",
                                            age: "~70 years ago (considering the advent of modern computing)",
                                            status: "Non-biological",
                                          },
                                          children: [
                                            {
                                              name: "Artificial Intelligence",
                                              attributes: {
                                                description:
                                                  "Systems capable of performing tasks that typically require human intelligence. Includes machine learning, neural networks, and expert systems.",
                                                age: "~70 years ago (considering early AI research in the 1950s)",
                                                status: "Non-biological",
                                              },
                                            },
                                            {
                                              name: "Virtual Life Forms",
                                              attributes: {
                                                description:
                                                  "Digital creatures that simulate aspects of biological life. Includes cellular automata, artificial life simulations, and digital ecosystems.",
                                                age: "~40 years ago (considering early artificial life simulations in the 1980s)",
                                                status: "Non-biological",
                                              },
                                            },
                                            {
                                              name: "Distributed Systems",
                                              attributes: {
                                                description:
                                                  "Networks of interconnected digital entities that can exhibit emergent behaviors. Includes the internet, blockchain systems, and peer-to-peer networks.",
                                                age: "~50 years ago (considering the early development of ARPANET in the late 1960s)",
                                                status: "Non-biological",
                                              },
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          name: "Rodentia",
                          attributes: {
                            description:
                              "Largest order of mammals, including rats, mice, squirrels, and beavers. Characterized by continuously growing incisors and diverse adaptations.",
                            age: "~60 million years ago",
                            status: "Living",
                          },
                        },
                        {
                          name: "Carnivora",
                          attributes: {
                            description:
                              "Primarily meat-eating mammals, including cats, dogs, bears, and seals. They have diverse adaptations for hunting and consuming animal prey.",
                            age: "~42 million years ago",
                            status: "Living",
                          },
                        },
                        {
                          name: "Cetartiodactyla",
                          attributes: {
                            description:
                              "Even-toed ungulates and whales, including cows, deer, hippos, and dolphins. A diverse group that has adapted to both terrestrial and aquatic lifestyles.",
                            age: "~55 million years ago",
                            status: "Living",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
