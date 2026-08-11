import { ChatProvider } from "@/components/ai-interface/ChatContext";
import VisualTreeOfLife from "@/components/TreeOfLife";
import { SITE_URL, siteDescription } from "@/lib/discovery";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Genosphere",
      alternateName: "Genosphere Evolution Atlas",
      description: siteDescription,
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#application`,
      name: "Genosphere",
      url: SITE_URL,
      description: siteDescription,
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "Evolutionary biology and biodiversity",
      operatingSystem: "Any operating system with a modern web browser",
      isAccessibleForFree: true,
      license: "https://opensource.org/license/mit",
      sameAs: "https://github.com/yakshb/tree-of-life",
      audience: [
        { "@type": "EducationalAudience", educationalRole: "teacher" },
        { "@type": "EducationalAudience", educationalRole: "student" },
        { "@type": "Audience", audienceType: "Researchers and naturalists" },
      ],
      featureList: [
        "Interactive Tree of Life navigation",
        "Node-grounded adaptive evolution tutor",
        "Live GBIF and iNaturalist taxonomic enrichment",
      ],
    },
  ],
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden py-4 sm:py-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[880px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div id="explorer" className="scroll-mt-20">
        <ChatProvider>
          <VisualTreeOfLife />
        </ChatProvider>
      </div>
    </div>
  );
}
