#!/usr/bin/env bash
# PinMe Deploy: One-click static site deployment to PinMe (IPFS)
# Auto-detects build output, installs pinme CLI if needed

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ========== Parameter Parsing ==========
DIR=""
NAME=""
BUILD_CMD=""

usage() {
    cat <<EOF
Usage: bash deploy.sh [options]

Options:
  --dir <path>       Static site directory (auto-detects dist/build/out/public)
  --name <name>      Project name for display
  --build-cmd <cmd>  Build command to run before deploy (e.g. "npm run build")
  -h, --help         Show help

Examples:
  bash deploy.sh
  bash deploy.sh --dir ./dist
  bash deploy.sh --build-cmd "npm run build" --dir ./dist
  bash deploy.sh --name my-app --dir ./build
EOF
    exit 0
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --dir)       DIR="$2"; shift 2;;
        --name)      NAME="$2"; shift 2;;
        --build-cmd) BUILD_CMD="$2"; shift 2;;
        -h|--help)   usage;;
        *)           echo "Unknown option: $1"; usage;;
    esac
done

# ========== Utility Functions ==========
log_info()  { echo "[INFO]  $*"; }
log_warn()  { echo "[WARN]  $*"; }
log_error() { echo "[ERROR] $*" >&2; }
log_ok()    { echo "[OK]    $*"; }

# ========== Step 1: Run build if specified ==========
run_build() {
    if [[ -n "$BUILD_CMD" ]]; then
        log_info "Running build command: $BUILD_CMD"
        eval "$BUILD_CMD"
        log_ok "Build completed"
    fi
}

# ========== Step 2: Auto-detect build output directory ==========
detect_dir() {
    if [[ -n "$DIR" ]]; then
        log_info "Using specified directory: $DIR"
        return
    fi

    log_info "Auto-detecting build output directory..."

    local candidates=("./dist" "./build" "./out" "./public" "./.output")
    for cand in "${candidates[@]}"; do
        if [[ -d "$cand" && -f "$cand/index.html" ]]; then
            DIR="$cand"
            log_ok "Detected: $DIR"
            return
        fi
    done

    # Check current directory if it has index.html
    if [[ -f "./index.html" ]]; then
        DIR="."
        log_ok "Using current directory (index.html found)"
        return
    fi

    log_error "Could not auto-detect build directory."
    log_warn "Please specify with --dir, or ensure one of these exists:"
    log_warn "  ./dist/index.html, ./build/index.html, ./out/index.html, ./public/index.html"
    exit 1
}

# ========== Step 3: Validate directory ==========
validate_dir() {
    if [[ ! -d "$DIR" ]]; then
        log_error "Directory not found: $DIR"
        exit 1
    fi

    if [[ ! -f "$DIR/index.html" ]]; then
        log_error "index.html not found in $DIR"
        log_warn "The directory must contain an index.html file"
        exit 1
    fi

    local file_count
    file_count=$(find "$DIR" -type f | wc -l)
    local dir_size
    dir_size=$(du -sh "$DIR" 2>/dev/null | cut -f1)
    log_ok "Site valid: $file_count files, $dir_size total"
}

# ========== Step 4: Install pinme CLI ==========
install_pinme() {
    log_info "Checking pinme CLI..."

    if command -v pinme &>/dev/null; then
        log_ok "Found pinme: $(pinme --version 2>&1 || echo 'installed')"
        return
    fi

    log_info "Installing pinme CLI..."
    npm install -g pinme
    log_ok "pinme installed"
}

# ========== Step 5: Deploy ==========
deploy() {
    log_info "Deploying to PinMe..."

    local upload_args=""
    [[ -n "$NAME" ]] && upload_args="$upload_args --name '$NAME'"

    # Run pinme upload
    if [[ -n "$upload_args" ]]; then
        eval "pinme upload '$DIR' $upload_args"
    else
        pinme upload "$DIR"
    fi

    log_ok "Deployment complete!"
    log_info "Your site will be available at a PinMe URL shortly."
    log_warn "Note: IPFS propagation may take 1-3 minutes"
}

# ========== Main ==========
main() {
    echo "========================================"
    echo "  PinMe Deploy - Static Site Deployer"
    echo "========================================"
    echo ""

    run_build
    detect_dir
    validate_dir
    install_pinme
    deploy

    echo ""
    echo "========================================"
    echo "  Done!"
    echo "========================================"
}

main
