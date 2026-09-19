export type InsightLink={label:string;href:string};
export type InsightSection={id:string;title:string;paragraphs:string[];bullets?:string[];links?:InsightLink[]};
export const insightContent:Record<string,InsightSection[]>={
  "why-google-is-not-indexing-my-website":[
    {
      id:"confirm-the-problem",
      title:"1. Confirm that the page is actually not indexed",
      paragraphs:[
        "Start with the specific URL rather than the whole website. Search Console's URL Inspection tool can show whether Google knows the page, whether it was crawled, which canonical Google selected and whether indexing is currently allowed.",
        "Do not treat the Page indexing report as a target for 100% coverage. A healthy site can have many URLs excluded for valid reasons, including duplicates, redirects, removed pages and filtered variants. The question is whether the pages you genuinely want in search are being indexed."
      ],
      bullets:[
        "Inspect the exact preferred URL in URL Inspection.",
        "Confirm whether the URL is indexed, not indexed, or represented by another canonical.",
        "Check the last crawl date and the reported indexing reason.",
        "Compare the inspected URL with the URL in your sitemap and internal links.",
        "Prioritise commercially important pages before investigating low-value variants."
      ],
      links:[
        {label:"Google: Page indexing report",href:"https://support.google.com/webmasters/answer/7440203"},
        {label:"Technical SEO audit checklist",href:"/insights/technical-seo-audit-checklist-london"}
      ]
    },
    {
      id:"crawled-not-indexed",
      title:"2. Crawled - currently not indexed",
      paragraphs:[
        "This status means Google crawled the page but did not index it at that time. Google's documentation explicitly says the page may or may not be indexed later and that repeatedly resubmitting the same URL for crawling is not required.",
        "Because Google has already accessed the page, the diagnosis should move beyond crawl access. Review whether the page is genuinely distinct, useful, internally supported and aligned with the site's preferred URL signals. If many similar pages share the status, look for a pattern rather than treating each URL as an isolated technical error."
      ],
      bullets:[
        "Compare the page with similar pages for substantial overlap or thin differentiation.",
        "Check whether another URL is a stronger or more consistent version of the same content.",
        "Review internal links and whether the page is part of a clear site structure.",
        "Confirm the page returns 200 and does not contain noindex or conflicting canonical signals.",
        "Improve the page because it serves a real search need, not simply to force an index request."
      ],
      links:[
        {label:"Google: Page indexing reasons",href:"https://support.google.com/webmasters/answer/7440203"},
        {label:"SEO & Organic Growth",href:"/services/seo"}
      ]
    },
    {
      id:"discovered-not-indexed",
      title:"3. Discovered - currently not indexed",
      paragraphs:[
        "This status means Google knows the URL exists but has not crawled it yet. Google's Page indexing documentation says crawling may be rescheduled when Google expects crawling the site could create too much load.",
        "If only a small number of new URLs are affected, time can be part of the answer. If large sections remain discovered for long periods, review how many URLs the site creates, how easily important pages are reached, server reliability and whether the architecture is asking crawlers to spend attention on low-value variants."
      ],
      bullets:[
        "Check whether the page is linked from a relevant crawlable page.",
        "Confirm the preferred URL appears in the XML sitemap.",
        "Look for very large numbers of filter, parameter, tag or duplicate URLs.",
        "Review server stability and response times across important templates.",
        "Do not create more URLs simply to solve a crawl-demand problem."
      ],
      links:[
        {label:"Technical SEO London",href:"/services/technical-seo-london"}
      ]
    },
    {
      id:"noindex",
      title:"4. Excluded by noindex",
      paragraphs:[
        "A noindex directive is appropriate when a crawlable page should not appear in search. Problems arise when noindex remains on a template after staging, is added by a CMS setting, appears in an X-Robots-Tag header, or conflicts with the intended purpose of the page.",
        "Google needs to be able to crawl a page to read a page-level noindex directive. Blocking the same URL in robots.txt can prevent Google from seeing that directive, so robots.txt and noindex should not be treated as interchangeable controls."
      ],
      bullets:[
        "Check the rendered HTML for a robots meta tag.",
        "Check HTTP headers for X-Robots-Tag.",
        "Inspect CMS or SEO-plugin visibility settings.",
        "Remove noindex only when the page is meant to be searchable.",
        "After changing the directive, verify the live production response before requesting recrawl."
      ],
      links:[
        {label:"Google: Block search indexing with noindex",href:"https://developers.google.com/search/docs/crawling-indexing/block-indexing"}
      ]
    },
    {
      id:"robots",
      title:"5. Blocked by robots.txt",
      paragraphs:[
        "robots.txt is primarily a crawl-control file. A robots.txt block does not by itself guarantee that a URL can never appear in Google's index, because Google may know the URL from other signals even if it cannot crawl the page content.",
        "If an important page is blocked accidentally, remove the relevant disallow rule and make sure Google can fetch the page and its critical resources. If the page should stay out of search, use the appropriate indexing or removal method rather than assuming a crawl block is enough."
      ],
      bullets:[
        "Test the exact URL against the live robots.txt rules.",
        "Check broad folder rules before editing individual URLs.",
        "Look for blocked CSS or JavaScript resources needed to render important content.",
        "Do not use robots.txt as a substitute for noindex on crawlable pages.",
        "Re-test production after any robots.txt change because one rule can affect many URLs."
      ]
    },
    {
      id:"canonical",
      title:"6. Duplicate, Google chose different canonical than user",
      paragraphs:[
        "When Google sees multiple URLs with the same or very similar primary content, it can cluster them and choose one representative canonical. The selected canonical can differ from the canonical you declare.",
        "Treat 'Google chose different canonical' as a signal to compare the full cluster. A rel=canonical tag helps, but redirects, internal links, sitemap URLs, HTTPS consistency and content similarity can all contribute to Google's canonical selection."
      ],
      bullets:[
        "Inspect the user-declared canonical and Google-selected canonical.",
        "Check whether duplicate versions are linked internally.",
        "Keep only preferred canonical URLs in the XML sitemap.",
        "Use direct redirects when an old URL has a clear permanent replacement.",
        "Make pages meaningfully different if both genuinely need to exist and rank separately."
      ],
      links:[
        {label:"Google: Canonicalisation",href:"https://developers.google.com/search/docs/crawling-indexing/canonicalization"},
        {label:"Technical SEO audit checklist",href:"/insights/technical-seo-audit-checklist-london"}
      ]
    },
    {
      id:"redirects-errors",
      title:"7. Redirect errors, soft 404s and server failures",
      paragraphs:[
        "Google can exclude a URL because the response itself prevents reliable indexing. Redirect loops, excessively long redirect chains, 5xx errors and access restrictions can stop Google from reaching a usable final page.",
        "A soft 404 is different from a normal 404 response: the server may return a success status while the page effectively says the content is missing or provides too little useful content to function as the requested page. Fix the response and destination logic instead of trying to optimise an error state."
      ],
      bullets:[
        "Follow the full redirect path and remove loops or unnecessary hops.",
        "Confirm the final destination returns 200 when it is a real live page.",
        "Check 5xx and timeout patterns in server or edge logs where available.",
        "Return a genuine 404 or 410 for removed content with no replacement.",
        "Do not redirect every removed URL to the homepage."
      ],
      links:[
        {label:"Web & Conversion",href:"/services/web-conversion"}
      ]
    },
    {
      id:"discovery-signals",
      title:"8. Check internal links, sitemaps and orphan pages",
      paragraphs:[
        "A page may be technically indexable but weakly connected to the rest of the site. Important pages should be discoverable through normal internal links, not only present in a sitemap or accessible through a form, search box or JavaScript interaction.",
        "Use internal links to explain the page's role in the site. Supporting articles should link to the service or category they support, and commercial pages should link to useful evidence and deeper guidance where that helps the visitor."
      ],
      bullets:[
        "Find orphan pages with no crawlable internal links.",
        "Check click depth for priority pages.",
        "Use descriptive anchor text rather than generic repeated phrases.",
        "Keep sitemap URLs aligned with canonical live pages.",
        "Remove obsolete redirected and error URLs from active sitemaps."
      ],
      links:[
        {label:"Technical SEO London",href:"/services/technical-seo-london"},
        {label:"SEO & Organic Growth",href:"/services/seo"}
      ]
    },
    {
      id:"rendering",
      title:"9. Verify rendering and the final HTML Google can process",
      paragraphs:[
        "If important content or links depend on JavaScript, verify the rendered result rather than assuming the application framework exposes everything correctly. Rendering issues can also appear after deployment when client-side errors, blocked resources or environment-specific code behave differently from development.",
        "Check the live page's main content, headings, links, robots directives and canonical. If Google can fetch the URL but the meaningful content is missing or unstable in the rendered result, fixing the application can be more important than submitting another indexing request."
      ],
      bullets:[
        "Compare initial HTML with the rendered page on JavaScript-heavy routes.",
        "Check that primary content and internal links are present and stable.",
        "Look for duplicated or client-rewritten canonical and robots tags.",
        "Review browser console and runtime errors on affected templates.",
        "Test the production URL, not only localhost or staging."
      ]
    },
    {
      id:"request-and-monitor",
      title:"10. Request indexing only after the page is ready",
      paragraphs:[
        "URL Inspection includes a Request Indexing option, but it is not a substitute for correcting the reason a page is weak, duplicated, blocked or technically inconsistent. Use it selectively after meaningful fixes to important URLs.",
        "After the change, allow time for Google to recrawl and reprocess the page. Record the release date and monitor indexing state, canonical selection, impressions and clicks separately. A technically indexable page is eligible to compete; it is not guaranteed to rank."
      ],
      bullets:[
        "Validate the live page before requesting indexing.",
        "Use Request Indexing for important corrected URLs, not every page on the site.",
        "Monitor the Page indexing report for broader patterns.",
        "Track the selected canonical in URL Inspection.",
        "Review search performance only after Google has had time to recrawl and process the change."
      ],
      links:[
        {label:"Technical SEO London",href:"/services/technical-seo-london"},
        {label:"Technical SEO audit checklist",href:"/insights/technical-seo-audit-checklist-london"},
        {label:"SEO & Organic Growth",href:"/services/seo"}
      ]
    }
  ],
  "technical-seo-audit-checklist-london":[
    {
      id:"priority-urls",
      title:"1. Start with the URLs that matter commercially",
      paragraphs:[
        "A technical audit becomes noisy when every warning is treated as equally important. Start by identifying the pages that actually matter to the business: core service pages, important category or product routes, high-value location pages and the pages already receiving useful search demand.",
        "Record the preferred URL for each priority page before crawling the site. This gives the audit a reference point for canonicals, redirects, sitemap inclusion, internal links and indexation."
      ],
      bullets:[
        "List the 10–30 URLs most closely tied to revenue or qualified enquiries.",
        "Confirm the preferred HTTPS and hostname version for each URL.",
        "Note pages that recently changed URL, template, CMS or purpose.",
        "Export current clicks, impressions and index status from Search Console where available."
      ],
      links:[
        {label:"Technical SEO London",href:"/services/technical-seo-london"},
        {label:"SEO & Organic Growth",href:"/services/seo"}
      ]
    },
    {
      id:"crawl-access",
      title:"2. Check crawl access, robots.txt and HTTP responses",
      paragraphs:[
        "The first question is whether search engines can request the pages and resources they need. Review robots.txt, status codes and crawl paths together. A blocked URL and a noindex URL are not the same thing: robots.txt controls crawling, while an indexing directive generally needs to be accessible to the crawler to be read.",
        "Look beyond obvious 404s. Repeated 5xx responses, redirect loops, long redirect chains and blocked JavaScript or CSS resources can all create avoidable uncertainty."
      ],
      bullets:[
        "Test priority URLs for 200, 3xx, 4xx and 5xx responses.",
        "Review robots.txt for accidental blocks on important paths or resources.",
        "Find redirect loops and unnecessary multi-hop chains.",
        "Check whether important linked resources can be fetched.",
        "Confirm obsolete URLs return an intentional redirect or a genuine 404/410."
      ],
      links:[
        {label:"Google: Page indexing report",href:"https://support.google.com/webmasters/answer/7440203"}
      ]
    },
    {
      id:"indexation",
      title:"3. Compare crawlability with actual indexation",
      paragraphs:[
        "A page being crawlable does not mean it will be indexed, and a URL appearing in Search Console does not mean it is the preferred version. Compare the site's intended index with what Google reports.",
        "Investigate patterns rather than reacting to every excluded URL. Filter pages, duplicate variants, old redirects and utility routes may be excluded correctly. The useful question is whether commercially important pages are eligible, unique and being interpreted as intended."
      ],
      bullets:[
        "Inspect priority URLs in Search Console rather than relying only on site: searches.",
        "Separate valid exclusions from unexpected exclusions.",
        "Check noindex directives in both HTML and HTTP headers where relevant.",
        "Review soft 404s and pages with very thin or duplicate primary content.",
        "Confirm important URLs are present in the XML sitemap."
      ]
    },
    {
      id:"canonicals",
      title:"4. Align canonical signals and duplicate URLs",
      paragraphs:[
        "Google treats canonicalisation as a process of selecting a representative URL from a cluster of duplicate or very similar pages. A rel=canonical element is a signal, not a command, so it should not contradict stronger site-wide signals.",
        "For each important duplicate pattern, decide which URL should win and make redirects, internal links, sitemap entries and canonical annotations point in the same direction wherever practical."
      ],
      bullets:[
        "Check self-referencing canonicals on indexable priority pages.",
        "Find canonicals pointing to redirects, errors or unrelated pages.",
        "Review HTTP/HTTPS, www/non-www, trailing-slash and parameter variants.",
        "Remove duplicate URLs from the sitemap when they are not intended to rank.",
        "Compare the declared canonical with Google's selected canonical in URL Inspection."
      ],
      links:[
        {label:"Google: Canonicalisation guidance",href:"https://developers.google.com/search/docs/crawling-indexing/canonicalization"}
      ]
    },
    {
      id:"redirects",
      title:"5. Audit redirects and legacy URLs before they become dead weight",
      paragraphs:[
        "Redirects are part of technical SEO architecture, not just housekeeping. During redesigns, CMS changes and domain migrations, old URLs should map directly to the most relevant live replacement rather than all falling into the homepage or a broad category.",
        "Keep the map understandable. A direct 301 from an old page to its new equivalent is easier to reason about, test and maintain than chains created by several generations of migrations."
      ],
      bullets:[
        "Export legacy URLs from analytics, Search Console, old sitemaps and backlink tools.",
        "Map high-value legacy URLs to the closest relevant live page.",
        "Replace redirect chains with a direct final destination where possible.",
        "Check internal links so the website no longer relies on redirects for navigation.",
        "Retest redirects after deployment on the production domain."
      ],
      links:[
        {label:"Web & Conversion",href:"/services/web-conversion"}
      ]
    },
    {
      id:"architecture",
      title:"6. Inspect architecture, click depth and internal links",
      paragraphs:[
        "Search engines discover context partly through links. A technically clean page can still be weakly connected if it sits several layers deep, has no meaningful internal links or competes with several pages covering the same intent.",
        "Use the audit to make important pages easier to reach and to make the relationship between service pages, supporting content and evidence clearer."
      ],
      bullets:[
        "Identify orphan pages and important URLs with very few internal links.",
        "Measure click depth from the main navigation and relevant hub pages.",
        "Check that anchor text describes the destination naturally.",
        "Find pages competing for the same primary intent and decide whether to differentiate, consolidate or redirect.",
        "Create deliberate links from supporting content to the relevant commercial page."
      ]
    },
    {
      id:"rendering",
      title:"7. Test rendered HTML and JavaScript-dependent content",
      paragraphs:[
        "Modern websites can render important content through JavaScript, but the audit should verify what is available in the final rendered page rather than assume the framework handles everything correctly.",
        "Check headings, links, canonical elements, structured data and primary page content in the rendered output. Also confirm that error responses behave as intended, because non-200 pages may not be processed in the same way as healthy pages."
      ],
      bullets:[
        "Compare server output and rendered output on JavaScript-heavy templates.",
        "Confirm primary content and internal links exist after rendering.",
        "Check metadata and canonical tags are not duplicated or changed unexpectedly.",
        "Test pages with disabled or delayed third-party scripts where practical.",
        "Review hydration or runtime errors that can affect navigation or content."
      ]
    },
    {
      id:"performance",
      title:"8. Review Core Web Vitals by template, not as a vanity score",
      paragraphs:[
        "Performance work should focus on real templates and real user experience. Core Web Vitals can reveal loading, interaction and layout problems, but a perfect lab score is not a substitute for relevance, authority or a useful page.",
        "Prioritise repeated problems that affect many important URLs: oversized hero media, blocking scripts, layout shifts from late-loading components, excessive client JavaScript and slow server or edge responses."
      ],
      bullets:[
        "Review LCP, INP and CLS using field data where enough data exists.",
        "Compare mobile and desktop rather than assuming one represents the other.",
        "Identify the heaviest shared scripts, fonts and media assets.",
        "Reserve dimensions for images, video and dynamic interface elements.",
        "Re-test the affected template after the change instead of checking only the homepage."
      ]
    },
    {
      id:"structured-data",
      title:"9. Validate structured data against the visible page",
      paragraphs:[
        "Structured data should describe content that genuinely exists on the page. More schema is not automatically better. Use supported types that fit the content, keep business details consistent and validate the live implementation.",
        "Article, breadcrumb, organisation, service and other structured data can provide machine-readable context, but eligibility for a search feature never guarantees that Google will display it."
      ],
      bullets:[
        "Validate JSON-LD syntax and required properties.",
        "Make sure marked-up facts match visible page content.",
        "Remove duplicated or conflicting schema emitted by multiple plugins or templates.",
        "Check canonical URLs inside structured data where URLs are supplied.",
        "Test the final production URL after deployment."
      ],
      links:[
        {label:"Google: Article structured data",href:"https://developers.google.com/search/docs/appearance/structured-data/article"}
      ]
    },
    {
      id:"validate-release",
      title:"10. Re-crawl and validate the release",
      paragraphs:[
        "An audit is incomplete when it ends at a spreadsheet. After implementation, re-crawl the affected URLs, test the production responses and record what changed. Search engines still need time to revisit and reprocess pages, so separate technical validation from later ranking evaluation.",
        "For high-priority URLs, use Search Console to confirm live behaviour and monitor indexation, canonical selection, impressions and clicks. The goal is a technical system you can explain and verify."
      ],
      bullets:[
        "Re-crawl the affected template or URL set.",
        "Verify redirects, canonicals, robots directives and sitemap output on production.",
        "Check that important pages return 200 and remain reachable through internal links.",
        "Monitor Search Console for new indexing or canonical issues.",
        "Record the release date so later performance changes have context."
      ],
      links:[
        {label:"Technical SEO London",href:"/services/technical-seo-london"},
        {label:"SEO & Organic Growth",href:"/services/seo"},
        {label:"Web & Conversion",href:"/services/web-conversion"}
      ]
    }
  ],
  "seo-that-generates-leads":[
    {id:"commercial-intent",title:"Start with the service you can sell",paragraphs:["Choose one service that the business can deliver profitably in the locations it actually covers. Define the customer problem, likely job value and qualification criteria before building a keyword list. A page with modest traffic can be useful when its visitors have a clear reason to enquire.","Group search phrases by the problem and service behind them. A repair enquiry, a replacement project and a person researching materials should not automatically lead to the same page."]},
    {id:"page-design",title:"Build a page that answers the buying questions",paragraphs:["Explain the service, who it suits, the area covered and the next step. Use genuine project examples and clear process information. Make the enquiry route easy to find, but do not replace useful answers with repeated calls to action.","Use location detail when it reflects real delivery capability. Avoid creating dozens of nearly identical place-name pages before the core service pages provide a convincing reason to choose the business."]},
    {id:"lead-quality",title:"Connect search data to lead quality",paragraphs:["Record where an enquiry came from, what the customer requested and whether it was relevant. Compare qualified enquiries, booked appointments and quoted work with the pages and campaigns that contributed to them. Keep enquiries and clicks as different measures.","Agree definitions with the team answering the phone. A form submission does not become a qualified lead simply because an analytics tool counted it."]},
    {id:"priorities",title:"Choose the next change from evidence",paragraphs:["Review one bottleneck at a time: missing demand coverage, weak relevance, insufficient proof or a difficult contact journey. Write down what you expect a change to improve and how you will judge it.","Treat this as a working framework, not a promise of ranking or revenue. The appropriate priority depends on the business, competition, available evidence and capacity to deliver."]}
  ],
  "landing-page-before-more-ad-spend":[
    {id:"message-match",title:"Check the promise after the click",paragraphs:["Read the ad and landing page together. The service, location, offer and call to action should tell the same story. A visitor who clicked for a specific solution should not have to search a broad homepage to find it.","Before changing the bid strategy, make a list of unanswered buying questions. A confusing scope, missing price context or unclear next step can be more useful to investigate than another headline variation."]},
    {id:"inspect-friction",title:"Walk through the enquiry yourself",paragraphs:["Open the page on a phone. Read the first screen, open the navigation and complete the form using realistic details. Check validation errors, required fields, submission feedback and what happens when delivery fails.","Ask whether each field is necessary at this stage. Information that is useful during a sales call may not be necessary before a customer can start the conversation."]},
    {id:"qualified-conversions",title:"Define success beyond the form",paragraphs:["Separate all enquiries from qualified opportunities. Track whether requests match the service area, budget, availability and service offered. Share that feedback with the person managing the campaigns.","Do not label a button click as a completed enquiry or show a successful submission message without confirmation from the receiving system. The measurement should describe what really happened."]},
    {id:"test-changes",title:"Test the suspected bottleneck",paragraphs:["Choose a specific hypothesis: clearer service coverage, stronger project evidence or a shorter enquiry form. Keep a record of the change, the period and the traffic mix so later results have context.","A landing-page review is not a universal instruction to stop advertising. Sometimes the offer or traffic quality is the main constraint. Use the evidence to decide which part of the journey deserves attention first."]}
  ],
  "growth-stack-for-local-services":[
    {id:"offer-and-capacity",title:"Define the offer and operating limits",paragraphs:["Start with services, coverage, availability and the types of work the business wants. Make those decisions visible in the website and in the team’s qualification process. Generating demand for work that cannot be delivered creates a different problem rather than solving the original one."]},
    {id:"capture-demand",title:"Give each demand source a useful destination",paragraphs:["Create a clear page for each priority service and connect it to genuine project evidence. Use organic search and paid campaigns where they fit the commercial objective. Avoid buying a large collection of tools before the customer journey is understood.","Every important page should have a practical next step: call, request a quote or submit a short brief. Choose the action that matches how the business actually sells."]},
    {id:"follow-up",title:"Make follow-up part of the system",paragraphs:["Decide who receives new enquiries, how they are assigned and how progress is recorded. A simple pipeline can separate new, contacted, qualified, quoted and completed opportunities without pretending every enquiry is a sale.","Use automation for predictable hand-offs, reminders and data entry. Keep judgement, exceptions and customer context with the people responsible for the work."]},
    {id:"review-the-loop",title:"Review outcomes, not just channel reports",paragraphs:["Bring acquisition spend, enquiry quality and sales outcomes into the same review. Look for recurring problems: irrelevant requests, missed calls, slow follow-up or quotes that do not progress. Then choose the next experiment.","The aim is an understandable operating system. More dashboards do not fix missing definitions, unreliable data or an unclear offer. Start small enough that the team can maintain the process and learn from it."]}
  ]
};
export function readingTime(slug:string){const words=(insightContent[slug]||[]).flatMap(section=>section.paragraphs).join(" ").split(/\s+/).length;return `${Math.max(1,Math.ceil(words/200))} min read`;}
