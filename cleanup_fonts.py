import json
import urllib.request
import time

with open("/workspace/font_details.json", "r", encoding="utf-8") as f:
    results = json.load(f)

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

def clean_family(family):
    if not family:
        return family
    # Split at common CSS boundaries to extract just the font name
    for sep in ['";src:local("', '")', ';src:local("', '"),url("']:
        if sep in family:
            family = family.split(sep)[0]
    family = family.strip().strip('"').strip("'")
    return family

# Clean family fields
for item in results:
    if item.get("family"):
        item["family"] = clean_family(item["family"])

# Try to fetch missing packages via raw github for package.json and dist listing
missing_packages = [item["pkg"] for item in results if not item.get("variants")]
print(f"Missing packages: {missing_packages}")

for pkg in missing_packages:
    print(f"Trying to fix {pkg}...")
    # Try package.json from raw github
    pkg_json_url = f"https://raw.githubusercontent.com/KonghaYao/chinese-free-web-font-storage/branch/packages/{pkg}/package.json"
    pkg_json = fetch_json(pkg_json_url)
    if pkg_json:
        for item in results:
            if item["pkg"] == pkg:
                item["name"] = pkg_json.get("name")
                item["displayName"] = pkg_json.get("description")
                break

    # Try to find dist directory via GitHub API (but we are rate limited)
    # Instead, try common patterns for result.css
    # Try to guess from package name or skip
    time.sleep(0.5)

with open("/workspace/font_details.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("\nDone! Cleaned and saved to /workspace/font_details.json")
