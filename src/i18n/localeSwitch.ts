/**
 * Keeps the visitor's place across a language change.
 *
 * The locale param lives in the root layout, so switching language is a
 * full page load: the page would restart at the top with its animations
 * replayed. Before leaving we note which section is on screen and how far
 * through it the visitor is (a ratio, because the same section has a
 * different height in another language). RESTORE_SCRIPT runs at the end of
 * <body>, after the HTML is parsed and before hydration, so the page paints
 * in the right place, already lit.
 */

const KEY = "st-locale-anchor-v1";
const SELECTOR = "main section, footer";
const NAV_LINE = 100;

export function captureScrollAnchor() {
  try {
    let index = -1;
    let ratio = 0;
    let top: number | null = null;
    if (window.scrollY > 8) {
      const nodes = Array.from(document.querySelectorAll(SELECTOR));
      // A section starting on screen is the best landmark: it goes back to
      // the same spot. Otherwise we are deep inside one, so keep the ratio.
      index = nodes.findIndex((n) => {
        const t = n.getBoundingClientRect().top;
        return t >= 0 && t < window.innerHeight / 2;
      });
      if (index >= 0) {
        top = nodes[index].getBoundingClientRect().top;
      } else {
        index = nodes.findIndex((n) => n.getBoundingClientRect().bottom > NAV_LINE);
        if (index >= 0) {
          const rect = nodes[index].getBoundingClientRect();
          ratio = (NAV_LINE - rect.top) / rect.height;
        }
      }
    }
    window.sessionStorage.setItem(KEY, JSON.stringify({ index, ratio, top }));
  } catch {
    // Storage blocked: the switch still works, it just starts at the top.
  }
}

export const RESTORE_SCRIPT = `(function(){try{
var raw=sessionStorage.getItem(${JSON.stringify(KEY)});if(!raw)return;
sessionStorage.removeItem(${JSON.stringify(KEY)});
var a=JSON.parse(raw),root=document.documentElement;
root.setAttribute("data-locale-switch","");
setTimeout(function(){root.removeAttribute("data-locale-switch")},2500);
if(a.index<0)return;
var last=-1;
function place(){
if(last>=0&&Math.abs(window.scrollY-last)>2)return;
var n=document.querySelectorAll(${JSON.stringify(SELECTOR)})[a.index];if(!n)return;
var r=n.getBoundingClientRect();
var y=a.top===null?r.top+a.ratio*r.height-${NAV_LINE}:r.top-a.top;
window.scrollTo({top:y+window.scrollY,behavior:"instant"});
last=window.scrollY;
}
place();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(place);
window.addEventListener("load",place,{once:true});
}catch(e){}})();`;
