import json
import time
import urllib.request
import urllib.error
from urllib.parse import quote

PACKAGES = [
    "GuanKiapTsingKhai", "LxgwNeoZhiSong", "ToneOZ-Pinyin-Kai", "ToneOZ-Pinyin-WenKai",
    "ToneOZ-RadicalZ-Kai", "ToneOZ-Tsuipita", "XiaoheSimplify", "blbbsxt", "bwckkt",
    "bxzlzt", "cef", "cezkzdbs", "cqscbbt", "crgkk", "cubic", "dyh", "dymh", "dyzgt",
    "fbdzt", "fhst", "hcqyt", "hldqjt", "hlxsjt", "hqzmt", "hwmct", "hyqzp", "jhlst",
    "jnjj", "jpdzt", "jxzk", "jyhpws", "kksjt", "lxgwmanhei", "lxgwwenkai",
    "lxgwwenkaibright", "lywkpmydb", "maple-mono-cn", "mksjh", "mkwtyt", "mkzyt",
    "moon-stars-kai", "mzxst", "pfgzt", "pfljhfyt", "pfljhlyt", "pfmmd", "pmzdxxt",
    "qtbfsxt", "qxs", "rmjzqpybxs", "rzjkxzdmh", "rzjryzzk", "scjssh", "sft", "stdgt",
    "stmdxf", "syftjkt", "sypxzs", "syst", "the-write-right-font", "tjl", "xiaolai",
    "xuandongkaishu", "yfxy", "yidianyan", "yozai", "yqt", "ysbth", "ysbzt", "ysfxt",
    "ysyrxk", "yzgcxst", "yzklct", "zhbtt", "zjmc", "zkxw", "zlmyz", "zqfs", "zqzmxs",
    "zzqxmxht"
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; FontFetcher/1.0)",
    "Accept": "application/json"
}

def fetch_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"  Error fetching JSON {url}: {e}")
        return None

def fetch_text(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode("utf-8")
    except Exception as e:
        print(f"  Error fetching text {url}: {e}")
        return None

def extract_font_family(css_text):
    for line in css_text.splitlines():
        if "font-family" in line:
            parts = line.split("font-family")
            if len(parts) > 1:
                val = parts[1].split(":", 1)[-1].strip().rstrip(";")
                return val.strip().strip('"').strip("'")
    return None

results = []

for idx, pkg in enumerate(PACKAGES):
    print(f"[{idx+1}/{len(PACKAGES)}] Processing {pkg}...", flush=True)

    # 1. Get package.json from unpkg/jsdelivr to get name/description
    pkg_json = None
    for base in [
        f"https://unpkg.com/@chinese-fonts/{pkg}@latest/package.json",
        f"https://cdn.jsdelivr.net/npm/@chinese-fonts/{pkg}@latest/package.json"
    ]:
        pkg_json = fetch_json(base)
        if pkg_json:
            break
        time.sleep(0.3)

    display_name = pkg_json.get("description") if pkg_json else None
    name = pkg_json.get("name") if pkg_json else None

    # 2. Get dist subdirectories via jsdelivr data API
    listing_url = f"https://data.jsdelivr.com/v1/package/npm/@chinese-fonts/{pkg}"
    listing = fetch_json(listing_url)
    versions = listing.get("versions", []) if listing else []
    latest_version = versions[0] if versions else None

    variants = []
    if latest_version:
        files_url = f"https://data.jsdelivr.com/v1/package/npm/@chinese-fonts/{pkg}@{latest_version}/?structure=tree"
        files_tree = fetch_json(files_url)
        if files_tree and "files" in files_tree:
            for f in files_tree["files"]:
                if f.get("name") == "dist" and f.get("type") == "directory":
                    for sub in f.get("files", []):
                        if sub.get("type") == "directory":
                            variants.append(sub["name"])
                    break

    if not variants:
        print(f"  -> No variants found for {pkg}")
        results.append({
            "pkg": pkg,
            "name": name,
            "displayName": display_name,
            "family": None,
            "variants": [],
            "cssUrl": None,
            "error": "No variants found"
        })
        time.sleep(0.5)
        continue

    first_variant = variants[0]
    encoded_variant = quote(first_variant, safe='')
    css_url = f"https://cdn.jsdelivr.net/npm/@chinese-fonts/{pkg}@latest/dist/{encoded_variant}/result.css"
    css_text = fetch_text(css_url)
    family = extract_font_family(css_text) if css_text else None

    results.append({
        "pkg": pkg,
        "name": name,
        "displayName": display_name,
        "family": family,
        "variants": variants,
        "cssUrl": css_url
    })

    print(f"  -> {len(variants)} variants, family={family}, displayName={display_name}", flush=True)
    time.sleep(0.5)

with open("/workspace/font_details.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("\nDone! Saved to /workspace/font_details.json")
