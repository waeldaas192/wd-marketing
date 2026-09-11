// Keep these filenames unchanged. Image replacement is detected by src/lib/media.ts.
export const assets={
 brand:{logo:{src:"/images/brand/wd-marketing-ribbon-mark.png",alt:"",width:720,height:356},mark:{src:"/images/brand/icons/wd-icon-v2-512.png",alt:"WD Marketing",width:512,height:512},og:{src:"/images/brand/wd-marketing-og-cover.jpg",alt:"WD Marketing — Digital Growth Systems",width:1200,height:630}},
 // Reserved optional artwork. The current hero itself is interactive code, not this image.
 hero:{desktop:{src:"/images/hero/wd-marketing-growth-dashboard.webp",alt:"WD Marketing growth system illustration",width:1600,height:1100},mobile:{src:"/images/hero/wd-marketing-growth-dashboard-mobile.webp",alt:"WD Marketing growth system mobile illustration",width:900,height:1100}},
 founder:{portrait:{src:"/images/founder/wael-digital-growth-strategist.webp",alt:"Wael Daas, founder and digital growth strategist at WD Marketing",width:1120,height:1400},portraitWide:{src:"/images/founder/wael-wd-marketing-founder.webp",alt:"Wael Daas reviewing search performance in a London workspace",width:1800,height:1200}}
} as const;
