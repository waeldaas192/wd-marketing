export type InsightLink={label:string;href:string};
export type InsightSection={id:string;title:string;paragraphs:string[];bullets?:string[];links?:InsightLink[]};
export const insightContent:Record<string,InsightSection[]>={
  "core-web-vitals-website-speed-seo":[
    {
      id:"what-matters",
      title:"1. Start with what Core Web Vitals actually measure",
      paragraphs:[
        "Core Web Vitals are real-user experience metrics focused on three parts of a page experience: loading, responsiveness and visual stability. The current set is Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift.",
        "Google recommends good Core Web Vitals for Search and user experience, but also makes clear that there is no single page-experience signal and that perfect performance scores do not guarantee top rankings. Treat speed as one part of a useful, technically sound page rather than the entire SEO strategy."
      ],
      bullets:[
        "LCP measures how quickly the main visible content finishes loading.",
        "INP measures how responsive the page feels when people interact with it.",
        "CLS measures unexpected visual movement during the page lifecycle.",
        "Use the metrics to diagnose user experience, not as isolated vanity numbers.",
        "Keep relevance, content quality, crawlability and conversion context in the same decision."
      ],
      links:[
        {label:"Google: Core Web Vitals and Search",href:"https://developers.google.com/search/docs/appearance/core-web-vitals"},
        {label:"Technical SEO London",href:"/services/technical-seo-london"}
      ]
    },
    {
      id:"thresholds",
      title:"2. Know the current LCP, INP and CLS thresholds",
      paragraphs:[
        "The recommended good thresholds are LCP within 2.5 seconds, INP at 200 milliseconds or less, and CLS at 0.1 or less. These are evaluated at the 75th percentile so the target reflects the experience of most users rather than only the fastest devices and networks.",
        "Do not optimise to the exact threshold with no margin. Performance varies by device, connection, cache state and interaction, so a page sitting just inside a boundary can still move between categories as real-user data changes."
      ],
      bullets:[
        "Target LCP of 2.5 seconds or faster.",
        "Target INP of 200 milliseconds or less.",
        "Target CLS of 0.1 or less.",
        "Evaluate the 75th percentile rather than an average.",
        "Review mobile and desktop separately because their user conditions differ."
      ],
      links:[
        {label:"web.dev: Web Vitals",href:"https://web.dev/articles/vitals"}
      ]
    },
    {
      id:"field-vs-lab",
      title:"3. Separate field data from lab data",
      paragraphs:[
        "PageSpeed Insights can show both real-world field data and simulated lab diagnostics. The field data comes from the Chrome User Experience Report and reflects a rolling 28-day window of real users where sufficient data exists. Lab data is generated with Lighthouse under controlled conditions and is useful for debugging.",
        "The two can disagree without either being wrong. Field data captures different devices, networks and interactions over time; lab data is one simulated test under fixed conditions. Use field data to understand real experience and lab diagnostics to investigate why a page may be slow."
      ],
      bullets:[
        "Use CrUX field data to understand real-user Core Web Vitals.",
        "Use Lighthouse lab data to reproduce and debug likely bottlenecks.",
        "Do not expect a single Lighthouse run to match the 28-day field dataset.",
        "Check whether PageSpeed is showing URL-level data or falling back to origin-level data.",
        "Record repeated tests rather than treating one run as a permanent score."
      ],
      links:[
        {label:"Google: About PageSpeed Insights",href:"https://developers.google.com/speed/docs/insights/v5/about"},
        {label:"Technical SEO audit checklist",href:"/insights/technical-seo-audit-checklist-london"}
      ]
    },
    {
      id:"lcp",
      title:"4. Diagnose Largest Contentful Paint before compressing everything",
      paragraphs:[
        "LCP problems often come from the element that becomes the largest visible content block: a hero image, large heading container, background image or prominent media element. The useful diagnosis is to identify the actual LCP element and then break its delay into server response, resource discovery, download and rendering.",
        "Compressing every asset can help, but it is not a substitute for understanding why the LCP resource starts late. A correctly sized image that is discovered too late can still produce a poor result."
      ],
      bullets:[
        "Identify the actual LCP element on the affected template.",
        "Check server response and Time to First Byte as supporting diagnostics.",
        "Make important hero media discoverable early in the document.",
        "Avoid lazy-loading the above-the-fold LCP image.",
        "Use appropriately sized modern image formats and remove unnecessary render-blocking work."
      ]
    },
    {
      id:"inp",
      title:"5. Improve INP by reducing main-thread work",
      paragraphs:[
        "INP measures responsiveness across user interactions, so it is influenced by what the browser must do after a click, tap or keyboard action. Heavy JavaScript, long tasks, large hydration work and expensive event handlers can delay the next visual update.",
        "Lighthouse cannot directly measure real INP because its simulated load does not contain real user interactions. Total Blocking Time can still help identify main-thread pressure in the lab, but field data is the stronger source for the actual INP experience."
      ],
      bullets:[
        "Find long main-thread tasks and large JavaScript bundles.",
        "Reduce unnecessary client-side JavaScript and hydration work.",
        "Break expensive work into smaller tasks when appropriate.",
        "Keep interaction handlers focused on the immediate user response.",
        "Use field monitoring to confirm whether changes improve real INP."
      ],
      links:[
        {label:"web.dev: Optimize INP",href:"https://web.dev/articles/optimize-inp"}
      ]
    },
    {
      id:"cls",
      title:"6. Fix CLS by reserving space before content arrives",
      paragraphs:[
        "CLS measures unexpected layout movement. Common causes include images without dimensions, banners inserted above existing content, late-loading fonts, embeds that resize and interface components that change size after data arrives.",
        "The goal is not to freeze a dynamic site. Expected movement after a deliberate user action is different from content unexpectedly shifting while somebody is trying to read or interact."
      ],
      bullets:[
        "Set width, height or aspect-ratio for images and video.",
        "Reserve stable space for embeds, banners and dynamic modules.",
        "Avoid inserting new content above existing content without user intent.",
        "Review font loading and fallback metrics where text reflow causes shifts.",
        "Test templates with real content lengths, not only ideal demo data."
      ],
      links:[
        {label:"web.dev: Optimize CLS",href:"https://web.dev/articles/optimize-cls"}
      ]
    },
    {
      id:"page-speed-score",
      title:"7. Do not confuse a Lighthouse score with SEO success",
      paragraphs:[
        "A Lighthouse performance score is a useful lab summary, not a ranking position and not the same thing as passing Core Web Vitals in the field. Google explicitly says that good Core Web Vitals can contribute to Search success but do not guarantee top rankings.",
        "A page can score well in a lab and still deliver weak real-user performance, poor content or a confusing conversion journey. Conversely, an otherwise useful page should not be stripped of essential functionality simply to chase a perfect score."
      ],
      bullets:[
        "Use the Lighthouse score as a diagnostic summary, not a business KPI.",
        "Prioritise repeated template problems over tiny one-off score gains.",
        "Protect useful content, functionality and conversion elements during optimisation.",
        "Compare field data before and after meaningful changes.",
        "Avoid selling a 100/100 score as a ranking guarantee."
      ],
      links:[
        {label:"Google: Understanding page experience",href:"https://developers.google.com/search/docs/appearance/page-experience"},
        {label:"Web & Conversion",href:"/services/web-conversion"}
      ]
    },
    {
      id:"images-fonts-js",
      title:"8. Fix the assets that repeatedly slow important templates",
      paragraphs:[
        "Performance work scales when it targets shared causes. Oversized images, too many font files, third-party scripts and large client bundles can affect dozens or hundreds of pages because they live in common templates.",
        "Audit the assets loaded before meaningful content becomes usable. Remove work that does not support the page, delay non-critical work and make the important resource path shorter."
      ],
      bullets:[
        "Serve images close to their rendered dimensions.",
        "Prefer modern compressed formats where browser support and workflow allow.",
        "Limit font families, weights and unnecessary character sets.",
        "Defer or remove third-party scripts that do not need to block the initial experience.",
        "Track shared JavaScript growth so regressions are caught before every page becomes heavier."
      ]
    },
    {
      id:"template-monitoring",
      title:"9. Measure by template and user journey",
      paragraphs:[
        "A homepage test does not describe an entire website. Service pages, product pages, articles, checkout flows and logged-in interfaces can have completely different performance characteristics.",
        "Choose representative URLs for each important template and test both mobile and desktop. When enough traffic exists, use field data or your own real-user monitoring to understand how actual visitors experience those journeys."
      ],
      bullets:[
        "Choose representative URLs for every important page template.",
        "Compare mobile and desktop separately.",
        "Watch for route-specific scripts and media that only affect certain templates.",
        "Use Search Console's Core Web Vitals report to identify groups of similar affected URLs.",
        "Consider real-user monitoring when you need faster or more detailed diagnostics than aggregate CrUX data."
      ],
      links:[
        {label:"Why Google may not be indexing your website",href:"/insights/why-google-is-not-indexing-my-website"}
      ]
    },
    {
      id:"validate",
      title:"10. Validate performance changes without promising rankings",
      paragraphs:[
        "After implementation, re-run lab diagnostics to confirm the technical bottleneck changed, but remember that field Core Web Vitals represent a rolling real-user dataset and will not update like a one-off test. Record the release date and watch the relevant page or template over time.",
        "The objective is a faster, more stable and more responsive website for users. That supports technical quality and page experience, but it should sit alongside clear content, clean indexing signals and a useful path from search to enquiry."
      ],
      bullets:[
        "Re-test the same representative URLs after deployment.",
        "Check that fixes did not create layout, accessibility or conversion regressions.",
        "Monitor field data as new real-user samples enter the rolling period.",
        "Keep the release date with your measurement notes.",
        "Continue only when the next performance change is commercially or technically justified."
      ],
      links:[
        {label:"Technical SEO London",href:"/services/technical-seo-london"},
        {label:"Technical SEO audit checklist",href:"/insights/technical-seo-audit-checklist-london"},
        {label:"Why Google may not be indexing your page",href:"/insights/why-google-is-not-indexing-my-website"},
        {label:"Canonical tags & duplicate URLs",href:"/insights/canonical-tags-duplicate-urls"}
      ]
    }
  ],
  "canonical-tags-duplicate-urls":[
    {
      id:"canonical-basics",
      title:"1. Understand what a canonical actually does",
      paragraphs:[
        "Canonicalisation is the process of selecting one representative URL from a set of duplicate or very similar URLs. Google can cluster similar pages and choose a canonical even when you declare a preferred URL yourself.",
        "A rel=canonical element is therefore a strong hint, not an absolute command. The cleanest implementation is one where the canonical tag agrees with the other signals Google can observe."
      ],
      bullets:[
        "Use one preferred URL for each genuinely duplicate content set.",
        "Add a self-referencing canonical on important indexable pages where appropriate.",
        "Avoid canonicals that point to redirects, errors or unrelated content.",
        "Check the Google-selected canonical in URL Inspection when behaviour looks unexpected.",
        "Treat canonicalisation as a system of signals, not a single HTML tag."
      ],
      links:[
        {label:"Google: Canonicalisation",href:"https://developers.google.com/search/docs/crawling-indexing/canonicalization"},
        {label:"Technical SEO London",href:"/services/technical-seo-london"}
      ]
    },
    {
      id:"duplicate-patterns",
      title:"2. Find the duplicate URL patterns before fixing them",
      paragraphs:[
        "Duplicate content is not automatically a spam violation, and many duplicate patterns are normal. Problems start when the site creates several crawlable URLs for the same main content while sending inconsistent signals about which version should represent the set.",
        "Common sources include protocol and hostname variants, tracking parameters, sorting and filtering URLs, print or preview routes, mixed trailing-slash rules, duplicate product paths and CMS-generated archives."
      ],
      bullets:[
        "Compare HTTP and HTTPS versions.",
        "Compare www and non-www hostnames.",
        "Check uppercase, lowercase and trailing-slash variants.",
        "Review parameters used for sorting, filtering, tracking or session state.",
        "Look for duplicate CMS routes, archives, previews and legacy URLs."
      ]
    },
    {
      id:"self-canonical",
      title:"3. Use a self-referencing canonical on the preferred page",
      paragraphs:[
        "A self-referencing canonical makes the page's own preferred URL explicit. It is especially useful when the same content can be reached through extra parameters or minor URL variations.",
        "The canonical should be absolute, resolve successfully and match the production URL you actually want indexed. Avoid generating different canonical values in server HTML and client-side JavaScript."
      ],
      bullets:[
        "Point the preferred page to itself with rel=canonical.",
        "Use the final HTTPS production URL.",
        "Keep canonical generation stable across server and rendered HTML.",
        "Do not canonicalise important unique pages to a broader category simply because they share a template.",
        "Test the live page source and rendered DOM after deployment."
      ]
    },
    {
      id:"redirect-or-canonical",
      title:"4. Know when to redirect and when to canonicalise",
      paragraphs:[
        "Use a redirect when an old or duplicate URL no longer needs to remain independently accessible and has a clear permanent replacement. Use canonicalisation when duplicate or near-duplicate URLs still need to exist for users or site functionality.",
        "Do not use both mechanisms carelessly. A page that canonicals to one URL but redirects somewhere else creates unnecessary ambiguity."
      ],
      bullets:[
        "Use a 301 for replaced pages, old slugs and retired legacy URLs with a relevant successor.",
        "Use canonical tags for live duplicate variants that must remain accessible.",
        "Avoid redirect chains by pointing legacy URLs directly to the final destination.",
        "Keep canonical targets on a 200-status preferred page.",
        "Update internal links so the site links directly to the preferred URL."
      ],
      links:[
        {label:"Technical SEO audit checklist",href:"/insights/technical-seo-audit-checklist-london"},
        {label:"Why Google may not be indexing your page",href:"/insights/why-google-is-not-indexing-my-website"}
      ]
    },
    {
      id:"http-host-variants",
      title:"5. Consolidate HTTP and HTTPS, www and non-www variants",
      paragraphs:[
        "Protocol and hostname variants can create duplicate URL sets when multiple versions resolve independently. Choose one production hostname and protocol, redirect the other versions, and keep canonical, sitemap and internal-link signals aligned with that choice.",
        "This also makes reporting cleaner because backlinks, analytics and Search Console signals are less likely to be spread across unnecessary variants."
      ],
      bullets:[
        "Choose one HTTPS hostname as the production version.",
        "Redirect HTTP to HTTPS.",
        "Redirect the non-preferred www or non-www hostname.",
        "Keep canonical tags on the preferred hostname.",
        "Use the same preferred URLs in XML sitemaps and internal links."
      ]
    },
    {
      id:"parameters-filters",
      title:"6. Handle parameters, filters and faceted URLs deliberately",
      paragraphs:[
        "Parameters can be useful for tracking, sorting and filtering, but they can also create many URLs whose primary content is effectively the same. Large ecommerce and catalogue sites are especially vulnerable to crawlable combinations that add little search value.",
        "Decide which filtered or parameterised pages deserve independent search visibility and which should consolidate to a cleaner canonical or remain outside the index."
      ],
      bullets:[
        "Inventory common query parameters and what each one changes.",
        "Separate meaningful landing-page variants from sorting or tracking variants.",
        "Do not canonicalise genuinely unique search-targeted pages away by accident.",
        "Avoid linking extensively to low-value parameter combinations.",
        "Keep only intended canonical URLs in active XML sitemaps."
      ]
    },
    {
      id:"sitemaps-links",
      title:"7. Make XML sitemaps and internal links reinforce the canonical",
      paragraphs:[
        "A sitemap is another canonicalisation signal, so it should list the URLs you actually want treated as preferred. Internal links should do the same.",
        "If the sitemap contains one URL while navigation and page canonicals repeatedly point elsewhere, the site is asking Google to resolve a conflict it could have avoided."
      ],
      bullets:[
        "Include preferred 200-status canonical URLs in the XML sitemap.",
        "Remove redirected, noindex and duplicate variants from active sitemaps.",
        "Link internally to preferred canonical URLs rather than redirects.",
        "Fix templates that generate mixed URL formats.",
        "Re-test the sitemap after migrations or routing changes."
      ]
    },
    {
      id:"google-chose-different",
      title:"8. Diagnose 'Google chose different canonical than user'",
      paragraphs:[
        "This Search Console state means Google selected another URL as the representative of the duplicate cluster. Sometimes Google's choice is reasonable; sometimes conflicting site signals are pushing the wrong version.",
        "Start with URL Inspection, compare the user-declared and Google-selected canonical, then inspect redirects, sitemap membership, internal links, content similarity and the technical state of both URLs."
      ],
      bullets:[
        "Inspect both the declared canonical and Google's selected canonical.",
        "Check whether the preferred URL is internally linked more weakly than the duplicate.",
        "Check whether the preferred page redirects, errors or is less complete.",
        "Make two pages substantially different if both genuinely need to rank separately.",
        "After meaningful fixes, allow time for Google to recrawl and re-evaluate the cluster."
      ],
      links:[
        {label:"Google: Fix canonicalisation issues",href:"https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting"},
        {label:"Why Google may not be indexing your website",href:"/insights/why-google-is-not-indexing-my-website"}
      ]
    },
    {
      id:"javascript",
      title:"9. Keep JavaScript canonical signals stable",
      paragraphs:[
        "On JavaScript-heavy websites, avoid creating one canonical in the original HTML and changing it to a different URL after rendering. Canonicalisation can be evaluated before and after rendering, so inconsistent output makes the preferred URL less clear.",
        "Where possible, emit the correct canonical in the original HTML. If the framework controls metadata dynamically, test both raw HTML and the rendered DOM on the production deployment."
      ],
      bullets:[
        "Check the canonical in server-generated HTML.",
        "Check the canonical again after client rendering.",
        "Avoid multiple canonical elements.",
        "Do not let route state or query parameters rewrite canonicals unexpectedly.",
        "Validate canonical output on real production routes after deployment."
      ]
    },
    {
      id:"validate",
      title:"10. Validate the canonical system after the fix",
      paragraphs:[
        "A canonical cleanup is not finished when the code is merged. Re-crawl the affected URL set, test redirects, inspect canonical output and confirm that sitemaps and internal links now point to the same preferred URLs.",
        "Then use Search Console to monitor Google-selected canonicals over time. Re-evaluation is not instant, so separate technical validation from later search-performance changes."
      ],
      bullets:[
        "Re-crawl the duplicate URL patterns.",
        "Confirm preferred URLs return 200 and duplicates resolve as intended.",
        "Check canonical tags, redirects, sitemaps and internal links together.",
        "Inspect priority URLs in Search Console after recrawl.",
        "Record the release date so later canonical and ranking changes have context."
      ],
      links:[
        {label:"Technical SEO London",href:"/services/technical-seo-london"},
        {label:"Technical SEO audit checklist",href:"/insights/technical-seo-audit-checklist-london"},
        {label:"Why Google may not be indexing your page",href:"/insights/why-google-is-not-indexing-my-website"}
      ]
    }
  ],
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
        {label:"Canonical tags & duplicate URLs",href:"/insights/canonical-tags-duplicate-urls"},
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
      ],
      links:[
        {label:"Core Web Vitals & website speed",href:"/insights/core-web-vitals-website-speed-seo"}
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
        {label:"Why Google may not be indexing your page",href:"/insights/why-google-is-not-indexing-my-website"},
        {label:"SEO & Organic Growth",href:"/services/seo"},
        {label:"Web & Conversion",href:"/services/web-conversion"}
      ]
    }
  ],
  "seo-that-generates-leads":[
    {
      id:"commercial-intent",title:"Start with a service and a definition of a qualified lead",
      paragraphs:[
        "SEO lead generation connects a customer's search to a service the business can deliver, then measures whether the resulting enquiry is worth pursuing. A higher impression count is useful evidence of visibility; it does not establish that the business is receiving suitable work.",
        "Choose one priority service, its actual coverage and the jobs you want more of. Agree qualification criteria with the person answering enquiries before choosing keywords. For a floor-restoration business, these might include the floor material, location, approximate area and whether the customer needs restoration rather than a cleaning product."
      ],
      bullets:["Service fit: can the team deliver the requested work?","Location fit: is the property within the real service area?","Project fit: does the size, timing and scope suit the business?","Sales stage: is this an enquiry, a qualified opportunity, a quote or a won job?"],
      links:[{label:"SEO strategy and services in London",href:"/services/seo"}]
    },
    {
      id:"query-map",title:"Map search intent to a useful destination",
      paragraphs:[
        "Group phrases by the decision the visitor needs to make. A person looking for a polishing contractor, comparing restoration costs and researching a DIY product has different questions. These are illustrative intent groups, not measured search volumes or a keyword forecast.",
        "Give the main commercial intent a clear service page. Use supporting guides to answer specific questions and link to the service when professional help is a relevant next step. Several wording variants can belong to one useful page; a new keyword does not automatically justify another URL."
      ],
      bullets:["Service plus location: explain the work, coverage, suitability and quote process.","Cost or suitability question: explain the factors, limitations and information needed for an estimate.","How-to research: answer the question honestly and distinguish DIY decisions from specialist work.","Project research: show genuine scope, images and delivery details from relevant completed work."],
      links:[{label:"Local SEO for London service businesses",href:"/services/local-seo-london"}]
    },
    {
      id:"page-design",title:"Answer the buying questions before asking for the enquiry",
      paragraphs:[
        "A useful service page explains what the work includes, who it suits, what affects scope and what happens after contact. Show real examples close to the decision they support. A project image is more useful when its caption explains the material, condition or work involved than when it is simply labelled with a keyword.",
        "Use local detail where it reflects delivery: access restrictions, the survey process or the areas genuinely covered. Repeating the same copy across place names adds little help for a customer deciding whom to hire. The London Marble Stone project below is an example of WD Marketing's published project presentation, not a promise of equivalent search results."
      ],
      links:[{label:"London Marble Stone website project",href:"/work/london-marble-stone"},{label:"Web design built around service enquiries",href:"/services/web-conversion"}]
    },
    {
      id:"discovery",title:"Check that the intended page can be discovered",
      paragraphs:[
        "Before rewriting an underperforming page, establish whether Google can access it and which URL Google treats as canonical. Review the live response, indexing directives, internal links and Search Console URL Inspection when access is available. Technical eligibility and actual indexing are separate findings.",
        "Connect guides, relevant projects and service pages using descriptive links. A link should help the reader understand the next destination. Keep it on the final preferred URL and in a section where it answers a natural follow-up question."
      ],
      links:[{label:"Diagnose why Google is not indexing a page",href:"/insights/why-google-is-not-indexing-my-website"},{label:"Google's internal-link guidance",href:"https://developers.google.com/search/docs/crawling-indexing/links-crawlable"}]
    },
    {
      id:"lead-quality",title:"Measure the journey from landing page to qualified opportunity",
      paragraphs:[
        "Record the landing page and acquisition source where attribution and consent allow it. In the CRM, record service fit, qualification status, quote outcome and the reason a lead was declined. Keep customer names, contact details and enquiry messages out of analytics event parameters.",
        "Use consistent definitions: enquiry rate is confirmed enquiries divided by the selected visit measure; qualification rate is qualified enquiries divided by confirmed enquiries. Keep that denominator, date range and channel definition stable. Search Console clicks, analytics sessions and CRM leads measure different parts of the journey and will not match exactly."
      ],
      bullets:["Search Console: queries, landing pages, impressions and clicks.","Analytics: consented landing-page sessions and confirmed enquiry events.","CRM: qualified opportunities, quoted work, won jobs and reasons for loss.","Reporting: separate brand searches from demand for a service where the data supports it."],
      links:[{label:"GA4, GTM and CRM measurement",href:"/services/growth-infrastructure"}]
    },
    {
      id:"priorities",title:"Choose the next fix from the broken step",
      paragraphs:[
        "If a relevant page is not indexed, investigate eligibility and content before judging its conversion rate. If it receives relevant visits but few enquiries, inspect the offer, proof and contact journey. If enquiries arrive but rarely qualify, check the promises, coverage and qualification questions. If qualified leads do not become work, include follow-up and quotations in the review.",
        "Record the release date, the suspected bottleneck and the measure expected to change. Compare equivalent periods and note changes in seasonality, campaigns or capacity. Small samples can be inconclusive; they are a reason to collect more evidence, not to announce a ranking or revenue uplift."
      ],
      links:[{label:"Conversion rate optimisation for lead generation",href:"/services/conversion-rate-optimisation"},{label:"Plan the local-service growth stack",href:"/insights/growth-stack-for-local-services"}]
    }
  ],
  "landing-page-before-more-ad-spend":[
    {
      id:"message-match",title:"Check the search, ad and first screen together",
      paragraphs:[
        "Before increasing Google Ads spend, check whether the landing page gives the intended customer a clear route to a useful enquiry. This checklist helps distinguish page friction from unsuitable traffic, an unclear offer or a measurement problem. It is not an instruction to pause every campaign with a low conversion rate.",
        "Read an actual search term, its ad and the destination together. The service, location, offer and next step should agree. In an illustrative terrazzo-polishing campaign, a visitor needs to recognise floor restoration immediately rather than search a general cleaning homepage. Do not advertise a price, response time or service area the page and business cannot support."
      ],
      bullets:["Does the headline identify the service the visitor requested?","Is the service area clear without implying branches that do not exist?","Is the advertised offer visible and accurate?","Does the primary action explain what happens next?"],
      links:[{label:"Google's ad and landing-page guidance",href:"https://support.google.com/google-ads/answer/6238826?hl=en"},{label:"Google Ads management and paid acquisition",href:"/services/paid-acquisition"}]
    },
    {
      id:"proof-and-scope",title:"Make scope and proof easy to judge",
      paragraphs:[
        "List the buying questions that remain unanswered: what the service includes, what may cost extra, whether the work is suitable, and what information is needed to quote. When a reliable fixed price is not possible, explain the factors that determine it rather than inventing a starting price.",
        "Put relevant project evidence beside the claim it supports. Show the actual type of work and describe its scope. Reviews and credentials should be genuine and attributable; generic badges do not resolve a specific concern about whether a contractor can handle the customer's project."
      ],
      links:[{label:"Website and landing-page design",href:"/services/web-conversion"}]
    },
    {
      id:"inspect-friction",title:"Test the complete mobile enquiry journey",
      paragraphs:[
        "Open the page on a phone and complete an authorised test enquiry. Check the first screen, reading order, buttons, keyboard, field errors and confirmation. Verify that the request reaches the receiving system. A successful-looking screen alone cannot prove the sales team received it.",
        "Ask whether every required field is needed before the first conversation. Keep useful qualification, such as service type or postcode, while postponing details that can be collected later. Test an invalid entry and a controlled failure in a test environment so the visitor can recover without losing their answers."
      ],
      bullets:["Use visible labels and understandable error messages.","Check that a phone link dials the intended business number.","Make the next step and any genuine response commitment clear.","Ensure banners and navigation do not cover the form or call button.","Check slow loading and layout movement on the actual landing page."],
      links:[{label:"Diagnose website speed and Core Web Vitals",href:"/insights/core-web-vitals-website-speed-seo"}]
    },
    {
      id:"qualified-conversions",title:"Separate contact clicks, enquiries and qualified leads",
      paragraphs:[
        "A contact-button click shows intent; a confirmed submission shows an enquiry; a qualified lead meets the business's agreed criteria. Report these separately. Counting all three as equivalent outcomes can make the campaign look productive while concealing poor fit or failed delivery.",
        "Use CRM feedback to explain which requests match the service, area and project requirements. Keep personal details in the appropriate customer system and keep measurement consent-aware. If the source cannot be established reliably, record it as unknown rather than forcing an attribution."
      ],
      links:[{label:"Conversion rate optimisation and enquiry audits",href:"/services/conversion-rate-optimisation"},{label:"Analytics and CRM infrastructure",href:"/services/growth-infrastructure"}]
    },
    {
      id:"unit-economics",title:"Compare cost per qualified lead before scaling",
      paragraphs:[
        "Use this illustrative calculation, not a WD Marketing client result or benchmark: £1,000 in ad spend produces 50 confirmed enquiries, of which 10 qualify. Cost per enquiry is £20; cost per qualified lead is £100. Reporting only the £20 figure hides the sales team's real workload.",
        "If a change produces 40 enquiries and 16 qualified leads on the same spend, the two costs become £25 and £62.50. Fewer submissions could therefore be commercially better. That example does not prove a page caused the difference: compare traffic mix, sales follow-up, attribution and enough observations before reaching a conclusion."
      ],
      bullets:["Cost per enquiry = ad spend / confirmed enquiries.","Cost per qualified lead = ad spend / qualified leads.","Track won work and gross profit when reliable data is available.","For profitability, include management and implementation costs separately from media spend."]
    },
    {
      id:"test-changes",title:"Fix clear faults, then test the uncertain decisions",
      paragraphs:[
        "Repair a broken form, mismatched promise or obscured button directly. For uncertain changes, write one hypothesis: for example, explaining survey requirements beside the form may reduce unsuitable enquiries. Define the primary outcome, guardrails, eligible audience and evaluation method before comparing versions.",
        "Low-volume sites may not support a useful A/B test in a practical period. Combine user-journey checks, sales feedback and a documented before-and-after review, while acknowledging its limitations. Where volume supports a controlled test, avoid declaring a winner from an early fluctuation."
      ],
      links:[{label:"How the WD Marketing CRO process works",href:"/services/conversion-rate-optimisation#cro-process"}]
    },
    {
      id:"scale-decision",title:"Make the next budget decision from the evidence",
      paragraphs:[
        "If the page works but search terms attract the wrong jobs, review targeting and exclusions. If suitable visitors abandon the form, investigate the journey. If good enquiries are not contacted, fix the hand-off. Increasing spend magnifies the existing process, so agree who will handle extra demand before scaling.",
        "Keep a short release log with the page change, campaign changes, dates and lead-quality outcomes. Use it to decide whether to continue, revise or reverse the experiment. A better page can support acquisition, but it cannot guarantee profitable growth independently of the offer and sales process."
      ],
      links:[{label:"Build the follow-up system for a local service business",href:"/insights/growth-stack-for-local-services"}]
    }
  ],
  "growth-stack-for-local-services":[
    {
      id:"offer-and-capacity",title:"Define the work you want before choosing the tools",
      paragraphs:[
        "Lead generation for a local service business needs more than a website and an advertising account. The customer must discover a suitable service, understand the offer, make contact and receive a useful response. This growth stack is a sequence of responsibilities that a small team can operate, not a shopping list of subscriptions.",
        "Start with services, coverage, availability and the jobs you want. For a London contractor, travel, parking, surveys and crew capacity can affect whether an enquiry is commercially suitable. Make those limits visible where customers make decisions and use the same criteria when qualifying leads."
      ],
      bullets:["Choose one priority service and a realistic coverage area.","Name the person responsible for incoming enquiries.","Agree what makes a request qualified and what should be declined.","Set a response commitment only when the team can deliver it."]
    },
    {
      id:"capture-demand",title:"Build the service page and the proof around it",
      paragraphs:[
        "Give each distinct priority service a useful page with scope, suitability, process, project evidence and a clear next step. Connect relevant project pages back to the service. A prospective customer should be able to move from an example of the work to a conversation about their own property.",
        "The MB Legacy Roofing case study is a published example of WD Marketing's approach to a local-service website. Review the structure and delivery details as project evidence; do not treat them as a forecast for another business. Keep unique service pages useful before expanding into location-specific content."
      ],
      links:[{label:"MB Legacy Roofing website case study",href:"/work/mb-legacy-roofing"},{label:"Web design for service businesses",href:"/services/web-conversion"}]
    },
    {
      id:"local-discovery",title:"Connect local search to the website",
      paragraphs:[
        "Keep an eligible Google Business Profile accurate: business details, categories, services, opening hours and genuine project photographs should reflect the operation. Ask customers for honest feedback through the normal review process. A profile and a website should describe the same business.",
        "Google describes local results in terms of relevance, distance and prominence. A service-area setting does not guarantee visibility across every named place. Focus the website on services actually delivered and add local detail when there is useful evidence, rather than creating interchangeable pages for every London postcode."
      ],
      links:[{label:"Local SEO and Google Business Profile support",href:"/services/local-seo-london"},{label:"Google's local ranking guidance",href:"https://support.google.com/business/answer/7091?hl=en"}]
    },
    {
      id:"paid-demand",title:"Add paid search where the offer and capacity support it",
      paragraphs:[
        "Use paid search when the business has a clear service to promote, a suitable destination and the capacity to respond. Review real search terms and lead outcomes together. Product shoppers, job seekers and requests outside the service area may need different treatment from customers seeking a contractor.",
        "Before expanding the budget, check message match, mobile contact actions, form delivery and qualification. Paid and organic visitors can share a page when their needs align. A campaign-specific page should exist for a genuine difference in audience or offer, not because another URL is assumed to improve performance."
      ],
      links:[{label:"Google Ads and paid acquisition",href:"/services/paid-acquisition"},{label:"Google Ads landing-page checklist",href:"/insights/landing-page-before-more-ad-spend"}]
    },
    {
      id:"measurement",title:"Record enough information to make decisions",
      paragraphs:[
        "Start with a reliable enquiry record. Capture the requested service, area, received date, assigned owner and status in the customer system. Record source and landing page when reliably available, with an unknown option where they are not. Avoid making reporting look complete by guessing.",
        "Use analytics for the permitted website events and the CRM for personal details and sales progress. Distinguish a contact click from a confirmed enquiry. Review a sample of records against actual submissions so duplicate events, failed deliveries or duplicate leads do not distort the picture."
      ],
      links:[{label:"GA4, GTM, CRM and automation setup",href:"/services/growth-infrastructure"},{label:"SEO measurement focused on qualified leads",href:"/insights/seo-that-generates-leads"}]
    },
    {
      id:"follow-up",title:"Give every enquiry an owner and a next action",
      paragraphs:[
        "A simple pipeline can move through new, contacted, qualified, survey or quote, and won or lost. Each active enquiry needs a responsible person and a next action. Record why work is declined or lost so repeated problems can change the marketing message or the operating process.",
        "Automate predictable hand-offs, task reminders and acknowledgements only after the manual process is clear. An acknowledgement should state that the request was received; it should not imply a booking or an approved quote. Test duplicate submissions, unavailable staff and failed notifications before relying on automation."
      ],
      bullets:["New: confirm receipt and assign responsibility.","Contacted: record what was learned and whether another attempt is needed.","Qualified: confirm fit and the agreed survey or quotation step.","Quoted: record the next follow-up and any customer questions.","Won or lost: record the outcome and a useful reason."]
    },
    {
      id:"review-the-loop",title:"Use a weekly review to choose the next improvement",
      paragraphs:[
        "Bring traffic, spend, enquiries and sales outcomes into the same review. If demand is low, investigate coverage and discovery. If requests are unsuitable, review intent and promises. If suitable visitors do not enquire, examine the page. If opportunities stall after contact, inspect follow-up and quotes.",
        "Start with a manageable release sequence: first make the service page and receiving process reliable; then connect measurement and source feedback; then improve one acquisition channel. Record the owner, change and expected signal for each step. The appropriate pace depends on the team's capacity and available evidence."
      ],
      links:[{label:"Improve the website's conversion journey",href:"/services/conversion-rate-optimisation"},{label:"Discuss your service-business growth system",href:"/contact"}]
    }
  ]
};
export function readingTime(slug:string){const words=(insightContent[slug]||[]).flatMap(section=>section.paragraphs).join(" ").split(/\s+/).length;return `${Math.max(1,Math.ceil(words/200))} min read`;}
