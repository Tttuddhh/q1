import json
import time
import urllib.request
import urllib.error
from urllib.parse import quote

with open("/workspace/font_details.json", "r", encoding="utf-8") as f:
    results = json.load(f)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; FontFetcher/1.0)",
    "Accept": "application/json"
}

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

def try_fetch_css(pkg, variant):
    # Try multiple URL patterns
    encoded = quote(variant, safe='')
    urls = [
        f"https://cdn.jsdelivr.net/npm/@chinese-fonts/{pkg}@latest/dist/{variant}/result.css",
        f"https://cdn.jsdelivr.net/npm/@chinese-fonts/{pkg}@latest/dist/{encoded}/result.css",
        f"https://cdn.jsdelivr.net/npm/@chinese-fonts/{pkg}@latest/dist/{variant}/result.CSS",
        f"https://cdn.jsdelivr.net/npm/@chinese-fonts/{pkg}@latest/dist/{encoded}/Result.css",
        f"https://unpkg.com/@chinese-fonts/{pkg}@latest/dist/{variant}/result.css",
        f"https://unpkg.com/@chinese-fonts/{pkg}@latest/dist/{encoded}/result.css",
    ]
    for url in urls:
        text = fetch_text(url)
        if text:
            return text, url
    return None, None

for item in results:
    pkg = item["pkg"]
    if item.get("family") is None and item.get("variants"):
        print(f"Retrying {pkg}...")
        for variant in item["variants"]:
            css_text, css_url = try_fetch_css(pkg, variant)
            if css_text:
                family = extract_font_family(css_text)
                item["family"] = family
                item["cssUrl"] = css_url
                print(f"  -> Found family={family} for variant={variant}")
                break
        else:
            print(f"  -> Still failed for all variants")
        time.sleep(0.5)

    # Also fix entries with no variants by trying to find package.json directly
    if not item.get("variants") and item.get("error") == "No variants found":
        print(f"Trying to find variants for {pkg} via raw github...")
        # Try GitHub raw for package.json
        pkg_json_url = f"https://raw.githubusercontent.com/KonghaYao/chinese-free-web-font-storage/branch/packages/{pkg}/package.json"
        try:
            req = urllib.request.Request(pkg_json_url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=30) as resp:
                pkg_json = json.loads(resp.read().decode("utf-8"))
                item["name"] = pkg_json.get("name")
                item["displayName"] = pkg_json.get("description")
        except Exception as e:
            print(f"  Failed to fetch package.json: {e}")

        # Try to list dist directory via GitHub raw (we can try common result.css paths)
        # Since we can't list directories via raw, try to infer from package.json or skip
        time.sleep(0.5)

with open("/workspace/font_details.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("\nDone! Updated /workspace/font_details.json")
