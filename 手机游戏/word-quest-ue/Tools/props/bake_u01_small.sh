#!/bin/bash
# Bake D28 unit-1 hero props. Usage: [HERO_RES=2048 HERO_SAMPLES=24] Tools/props/bake_u01_small.sh [kit ...]
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
BLENDER="${BLENDER:-/Applications/Blender.app/Contents/MacOS/Blender}"
KITS="${*:-keyboard headphones wifi_router recipe_book duster chalk_tray sandwich_plate coupon_card qr_sign payment_sign device_box school_bag griddle dish_rack sink brochure_rack queue_rope}"
mkdir -p "$HERE/../../Saved/Textbook/hero-logs"
for kit in $KITS; do
  log="$HERE/../../Saved/Textbook/hero-logs/${kit}.log"
  echo "=== $kit (HERO_RES=${HERO_RES:-2048} SAMPLES=${HERO_SAMPLES:-24}) ==="
  if "$BLENDER" -b -P "$HERE/hero_${kit}.py" >"$log" 2>&1; then
    grep -E "HERO DONE|\[hero\].*slot" "$log" | tail -3
  else
    echo "FAILED $kit"; tail -25 "$log"
  fi
done
