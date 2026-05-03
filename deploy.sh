#!/bin/bash
# Build the Vite workshop app and deploy the static output to the server.
set -e

REMOTE_USER="glenhalton"
REMOTE_HOST="${DEPLOY_HOST:-91.204.209.19}"
REMOTE_PATH="/home/glenhalton/chameleon.glenhalton.com"
BUILD_DIR="dist-app"
ZIP_NAME="chameleon.zip"

# ── 1. Build ──────────────────────────────────────────────────────────────────
echo "Building workshop app..."
pnpm build:app

if [ ! -d "$BUILD_DIR" ]; then
  echo "ERROR: Build failed — $BUILD_DIR directory not found."
  exit 1
fi

# ── 2. Zip ────────────────────────────────────────────────────────────────────
echo "Zipping $BUILD_DIR/..."
cd "$BUILD_DIR"
zip -r "../$ZIP_NAME" . -x "*.DS_Store*"
cd ..

# ── 3. Transfer ───────────────────────────────────────────────────────────────
echo "Transferring $ZIP_NAME to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
scp "$ZIP_NAME" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

# ── 4. Unzip on server ────────────────────────────────────────────────────────
echo "Deploying on remote host..."
ssh "$REMOTE_USER@$REMOTE_HOST" <<SSH_EOF
set -e
mkdir -p "$REMOTE_PATH"
cd "$REMOTE_PATH"
unzip -o $ZIP_NAME
rm -f $ZIP_NAME
echo "Deployment complete!"
SSH_EOF

# ── 5. Cleanup ────────────────────────────────────────────────────────────────
rm -f "$ZIP_NAME"
echo "Done — https://chameleon.glenhalton.com"
